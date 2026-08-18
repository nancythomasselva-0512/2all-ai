/**
 * 2all.ai Official Accessibility Suite Core Engine
 * Version: 4.0.0
 * Pure Vanilla JS, Shadow-DOM isolated, matches 2all.ai website UI & AI Assistant.
 */
(function () {
  if (window.__2ALL_CORE_INITIALIZED__) return;
  window.__2ALL_CORE_INITIALIZED__ = true;

  var config = window.__2ALL_CONFIG__ || {
    primaryColor: "#004bff",
    position: "bottom-right",
    size: "medium",
  };

  var primaryColor = config.primaryColor || "#004bff";
  var position = config.position || "bottom-right";

  // Full Suite State
  var state = {
    open: false,
    activeTab: "home",
    searchQuery: "",
    showAnalysis: false,
    // Profiles
    activeProfile: "none", // dyslexia, adhd, lowVision, seizure, motor, blind
    // Typography
    fontSize: 100, // 90% - 200%
    fontFamily: "default", // default, readable, dyslexic
    letterSpacing: 0,
    lineHeight: 1.5,
    wordSpacing: 0,
    textAlignment: "default",
    textMagnifier: false,
    // Visual & Color
    isHighContrast: false,
    isDarkMode: false,
    isLightMode: false,
    isSmartContrast: false,
    monochrome: false,
    colorBlindMode: "none", // none, protanopia, deuteranopia, tritanopia
    saturationMode: "normal", // normal, high, low
    textColor: "default",
    // Focus & Reading
    readingMask: false,
    readingRuler: false,
    highlightLinks: false,
    highlightHeadings: false,
    highlightButtons: false,
    highlightFocus: false,
    reduceMotion: false,
    bigCursor: false,
    // Speech
    textToSpeech: false,
    voiceNavigation: false,
    // Chat messages for AI Assistant (Anna)
    chatMessages: [
      {
        id: 1,
        type: "bot",
        text: "👋 Hi! I'm **Anna**, your **2all.ai AI Assistant**. Ask me anything about our accessibility tools, WCAG compliance, pricing, installation, or platform features!",
      },
    ],
  };

  try {
    var saved = localStorage.getItem("2all_accessibility_suite_v4");
    if (saved) {
      var parsed = JSON.parse(saved);
      state = Object.assign(state, parsed);
      state.open = false; // Always closed on start
    }
  } catch (e) {}

  function saveState() {
    try {
      localStorage.setItem("2all_accessibility_suite_v4", JSON.stringify(state));
    } catch (e) {}
  }

  // Host Container & Shadow DOM
  var host = document.createElement("div");
  host.id = "2all-ai-widget-host";
  host.style.position = "fixed";
  host.style.zIndex = "2147483647";
  host.style.pointerEvents = "none";

  var posStyles = {
    "bottom-right": "bottom: 24px; right: 24px;",
    "bottom-left": "bottom: 24px; left: 24px;",
    "top-right": "top: 24px; right: 24px;",
    "top-left": "top: 24px; left: 24px;",
  };
  host.style.cssText += posStyles[position] || posStyles["bottom-right"];

  document.body.appendChild(host);
  var shadow = host.attachShadow({ mode: "open" });

  // Colorblind SVG Filter Injection to main document
  if (!document.getElementById("2all-cb-filters-svg")) {
    var svgDiv = document.createElement("div");
    svgDiv.id = "2all-cb-filters-svg";
    svgDiv.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;";
    svgDiv.innerHTML = `
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="cb-protanopia" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="cb-deuteranopia" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="cb-tritanopia" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
    `;
    document.body.appendChild(svgDiv);
  }

  // Shadow DOM Styles (Matches AccessibilityPanel.tsx 1:1)
  var style = document.createElement("style");
  style.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }

    .widget-wrapper { pointer-events: auto; display: flex; flex-direction: column; align-items: flex-end; }
    .widget-wrapper.left { align-items: flex-start; }

    /* Circular Floating Trigger Button */
    .trigger-button {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #004bff;
      color: #ffffff;
      border: 2px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 0 25px rgba(0, 75, 255, 0.45), 0 10px 20px rgba(0,0,0,0.2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      outline: none;
    }
    .trigger-button:hover {
      transform: scale(1.08);
      background: #003edd;
      box-shadow: 0 0 30px rgba(0, 75, 255, 0.6);
    }
    .trigger-button svg { width: 26px; height: 26px; stroke: white; fill: none; }

    /* Modal Panel Box */
    .panel-box {
      width: 390px;
      height: 600px;
      max-height: 85vh;
      background: #0a1329;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 24px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6);
      margin-bottom: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
    }
    .panel-box.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* Top Brand Header */
    .header-bar {
      padding: 16px 20px;
      background: linear-gradient(135deg, #0a1e3f 0%, #042868 50%, #004bff 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .brand-title { display: flex; align-items: center; gap: 8px; font-weight: 900; font-size: 17px; letter-spacing: -0.5px; }
    .badge-ai { background: linear-gradient(90deg, #00c6ff, #0072ff); color: white; font-size: 10px; font-weight: 900; padding: 2px 8px; border-radius: 12px; text-transform: uppercase; }
    .header-btns { display: flex; align-items: center; gap: 8px; }
    .btn-reset { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: white; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
    .btn-reset:hover { background: rgba(255,255,255,0.3); }
    .btn-close { background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 18px; line-height: 1; padding: 4px; display: flex; align-items: center; justify-content: center; }
    .btn-close:hover { color: white; }

    /* Search Box */
    .search-wrapper { padding: 12px 16px; background: rgba(15, 23, 42, 0.8); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
    .search-field {
      width: 100%;
      padding: 9px 14px;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      color: white;
      outline: none;
    }
    .search-field:focus { border-color: #004bff; background: rgba(255, 255, 255, 0.12); }

    /* Navigation Tabs */
    .nav-tabs { display: flex; background: rgba(15, 23, 42, 0.9); padding: 4px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
    .nav-tab {
      flex: 1;
      padding: 8px 4px;
      background: transparent;
      border: none;
      font-size: 11px;
      font-weight: 800;
      color: #94a3b8;
      border-radius: 10px;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
    }
    .nav-tab.active { background: #004bff; color: white; box-shadow: 0 4px 12px rgba(0,75,255,0.4); }

    /* Scrollable Content Body */
    .body-content { padding: 16px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 14px; }

    /* Score Card in Home Tab */
    .score-card {
      background: linear-gradient(135deg, #0a1e3f 0%, #042868 50%, #004bff 100%);
      border-radius: 18px;
      padding: 16px;
      color: white;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 75, 255, 0.25);
    }
    .score-row { display: flex; align-items: center; gap: 14px; }
    .score-circle {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      border: 3.5px solid rgba(255, 255, 255, 0.3);
      border-top-color: #38bdf8;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 900;
      background: rgba(255, 255, 255, 0.1);
      shrink-0: 0;
    }
    .score-title { font-size: 15px; font-weight: 800; }
    .score-desc { font-size: 11px; color: #93c5fd; margin-top: 2px; }
    .score-analysis-btn {
      margin-top: 12px;
      width: 100%;
      padding: 7px 12px;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      font-size: 11px;
      font-weight: 700;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .score-analysis-btn:hover { background: rgba(255, 255, 255, 0.25); }

    /* Analysis Breakdown list */
    .analysis-list { margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.2); display: flex; flex-direction: column; gap: 6px; font-size: 11px; }
    .analysis-item { display: flex; justify-content: space-between; background: rgba(255,255,255,0.1); padding: 6px 10px; border-radius: 8px; }

    /* Cards Grid */
    .grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    
    .card-item {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 6px;
      transition: all 0.2s;
    }
    .card-item:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.2); transform: translateY(-2px); }
    .card-item.active {
      background: rgba(0, 75, 255, 0.25);
      border-color: #004bff;
      box-shadow: 0 4px 15px rgba(0, 75, 255, 0.3);
    }
    .card-title { font-size: 12px; font-weight: 800; color: #f8fafc; }
    .card-desc { font-size: 10px; color: #94a3b8; line-height: 1.3; }
    .card-pill { font-size: 9px; font-weight: 800; padding: 2px 7px; border-radius: 6px; align-self: flex-start; text-transform: uppercase; background: rgba(255,255,255,0.1); color: #cbd5e1; }
    .card-item.active .card-pill { background: #004bff; color: white; }

    /* Range Sliders */
    .slider-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .slider-top { display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; color: white; }
    .slider-input { width: 100%; accent-color: #004bff; cursor: pointer; }

    /* Anna AI Chat UI */
    .chat-container { display: flex; flex-direction: column; height: 100%; gap: 10px; }
    .chat-messages { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding-right: 4px; }
    .chat-msg { max-width: 85%; padding: 10px 14px; border-radius: 16px; font-size: 12px; line-height: 1.4; }
    .chat-msg.bot { background: rgba(255, 255, 255, 0.08); color: #f1f5f9; border: 1px solid rgba(255,255,255,0.12); align-self: flex-start; border-bottom-left-radius: 4px; }
    .chat-msg.user { background: #004bff; color: white; align-self: flex-end; border-bottom-right-radius: 4px; font-weight: 600; }
    .chat-msg strong { color: #38bdf8; }
    
    .chat-suggestions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
    .chip-btn { background: rgba(0, 75, 255, 0.2); border: 1px solid rgba(0, 75, 255, 0.4); color: #93c5fd; font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
    .chip-btn:hover { background: #004bff; color: white; }

    .chat-input-bar { display: flex; gap: 8px; padding-top: 8px; border-top: 1px solid rgba(255, 255, 255, 0.1); }
    .chat-input { flex: 1; padding: 8px 12px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: white; font-size: 12px; outline: none; }
    .chat-send-btn { background: #004bff; border: none; color: white; font-weight: 700; padding: 8px 14px; border-radius: 10px; cursor: pointer; }
    .chat-send-btn:hover { background: #003edd; }

    /* Footer Bar */
    .footer-bar {
      padding: 10px 16px;
      background: rgba(15, 23, 42, 0.95);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 11px;
      color: #94a3b8;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-bar a { color: #38bdf8; text-decoration: none; font-weight: 800; }
  `;
  shadow.appendChild(style);

  // Outer Wrapper
  var wrapper = document.createElement("div");
  wrapper.className = "widget-wrapper " + (position.indexOf("left") !== -1 ? "left" : "");

  // Panel Box
  var panelBox = document.createElement("div");
  panelBox.className = "panel-box";

  panelBox.innerHTML = `
    <div class="header-bar">
      <div class="brand-title">
        <span>2all.ai</span>
        <span class="badge-ai">AI POWERED</span>
      </div>
      <div class="header-btns">
        <button class="btn-reset" id="2all-reset-btn">Reset All</button>
        <button class="btn-close" id="2all-close-btn">✕</button>
      </div>
    </div>
    <div class="search-wrapper">
      <input type="text" class="search-field" id="2all-search-field" placeholder="Search features (e.g. font, contrast, dyslexia)..." />
    </div>
    <div class="nav-tabs">
      <button class="nav-tab active" data-tab="home">Home</button>
      <button class="nav-tab" data-tab="modes">Modes</button>
      <button class="nav-tab" data-tab="features">Features</button>
      <button class="nav-tab" data-tab="vision">Vision</button>
      <button class="nav-tab" data-tab="ai">AI Assist</button>
    </div>
    <div class="body-content" id="2all-body-content"></div>
    <div class="footer-bar">
      <span>Powered by <a href="https://2all.ai" target="_blank">2all.ai Accessibility</a></span>
      <span style="color:#38bdf8; font-weight:800;">WCAG 2.1 AA Ready</span>
    </div>
  `;
  wrapper.appendChild(panelBox);

  // Circular Trigger Button
  var triggerBtn = document.createElement("button");
  triggerBtn.className = "trigger-button";
  triggerBtn.setAttribute("aria-label", "Toggle 2all.ai Accessibility Center");
  triggerBtn.innerHTML = `
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="4" r="2"/>
      <path d="M12 6v6"/>
      <path d="M6 9h12"/>
      <path d="M12 12l-3 9"/>
      <path d="M12 12l3 9"/>
    </svg>
  `;
  wrapper.appendChild(triggerBtn);
  shadow.appendChild(wrapper);

  var bodyContent = shadow.getElementById("2all-body-content");
  var searchField = shadow.getElementById("2all-search-field");
  var navTabs = shadow.querySelectorAll(".nav-tab");

  // Event Listeners
  navTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      navTabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
      state.activeTab = tab.getAttribute("data-tab");
      renderBody();
    });
  });

  searchField.addEventListener("input", function (e) {
    state.searchQuery = e.target.value.toLowerCase().trim();
    renderBody();
  });

  shadow.getElementById("2all-reset-btn").addEventListener("click", function () {
    resetAll();
  });

  shadow.getElementById("2all-close-btn").addEventListener("click", function () {
    state.open = false;
    panelBox.classList.remove("open");
  });

  triggerBtn.addEventListener("click", function () {
    state.open = !state.open;
    if (state.open) panelBox.classList.add("open");
    else panelBox.classList.remove("open");
  });

  // Calculate Real-time Score
  function calculateScore() {
    var hasProfile = state.activeProfile !== "none";
    var hasTypo = state.fontFamily !== "default" || state.fontSize > 100 || state.letterSpacing > 0;
    var hasContrast = state.isHighContrast || state.isDarkMode || state.isLightMode || state.colorBlindMode !== "none";
    var hasReading = state.readingMask || state.readingRuler || state.textMagnifier || state.textToSpeech || state.highlightLinks;

    var score = 70; // Base score
    if (hasProfile) score += 15;
    if (hasTypo) score += 5;
    if (hasContrast) score += 5;
    if (hasReading) score += 5;
    return Math.min(100, score);
  }

  function renderBody() {
    bodyContent.innerHTML = "";

    // 1. HOME TAB (Dashboard with Score Card)
    if (state.activeTab === "home" && !state.searchQuery) {
      var score = calculateScore();

      var scoreCard = document.createElement("div");
      scoreCard.className = "score-card";
      scoreCard.innerHTML = `
        <div class="score-row">
          <div class="score-circle">${score}</div>
          <div>
            <div class="score-title">Accessibility Score</div>
            <div class="score-desc">${score === 100 ? "100% WCAG 2.1 AA Compliant & fully optimized!" : "Personalized WCAG & UX compliance score."}</div>
          </div>
        </div>
        <button class="score-analysis-btn" id="2all-analysis-btn">
          <span>ℹ️ How is this score analyzed?</span>
          <span>${state.showAnalysis ? "▲" : "▼"}</span>
        </button>
        ${state.showAnalysis ? `
          <div class="analysis-list">
            <div class="analysis-item"><span>WCAG 2.1 AA Baseline</span><span style="color:#4ade80;font-weight:bold;">70 / 70 Pts</span></div>
            <div class="analysis-item"><span>Active Profile</span><span style="color:${state.activeProfile!=='none'?'#4ade80':'#93c5fd'};font-weight:bold;">${state.activeProfile!=='none'?15:0} / 15 Pts</span></div>
            <div class="analysis-item"><span>Typography Optimizations</span><span style="color:#4ade80;font-weight:bold;">5 Pts</span></div>
            <div class="analysis-item"><span>Visual Contrast Engine</span><span style="color:#4ade80;font-weight:bold;">5 Pts</span></div>
            <div class="analysis-item"><span>Reading & Focus Tools</span><span style="color:#4ade80;font-weight:bold;">5 Pts</span></div>
          </div>
        ` : ""}
      `;
      bodyContent.appendChild(scoreCard);

      setTimeout(function () {
        var btn = shadow.getElementById("2all-analysis-btn");
        if (btn) {
          btn.onclick = function () {
            state.showAnalysis = !state.showAnalysis;
            renderBody();
          };
        }
      }, 50);

      // Preset Quick Profiles Header
      var qHeader = document.createElement("div");
      qHeader.style.cssText = "font-size:12px; font-weight:800; color:#f8fafc; margin-top:4px;";
      qHeader.innerText = "Quick Accessibility Profiles";
      bodyContent.appendChild(qHeader);

      renderProfilesGrid();
    }

    // 2. MODES TAB
    else if (state.activeTab === "modes" && !state.searchQuery) {
      renderProfilesGrid();
    }

    // 3. FEATURES / TYPOGRAPHY TAB
    else if (state.activeTab === "features" && !state.searchQuery) {
      // Font Scale Slider
      var sliderCard = document.createElement("div");
      sliderCard.className = "slider-card";
      sliderCard.innerHTML = `
        <div class="slider-top">
          <span>Content Scaling</span>
          <span>${state.fontSize}%</span>
        </div>
        <input type="range" class="slider-input" min="90" max="180" step="10" value="${state.fontSize}" id="2all-font-slider" />
      `;
      bodyContent.appendChild(sliderCard);

      setTimeout(function () {
        var s = shadow.getElementById("2all-font-slider");
        if (s) {
          s.oninput = function (e) {
            state.fontSize = parseInt(e.target.value, 10);
            saveState();
            applyEffects();
            renderBody();
          };
        }
      }, 50);

      var grid = document.createElement("div");
      grid.className = "grid-2col";

      var typoTools = [
        { key: "readableFont", name: "Readable Font", desc: "Clear sans-serif typography" },
        { key: "dyslexiaFont", name: "Dyslexia Font", desc: "OpenDyslexic reading typography" },
        { key: "textMagnifier", name: "Text Magnifier", desc: "Hover magnifier bubble" },
        { key: "readingMask", name: "Reading Mask", desc: "Focus line spotlight" },
        { key: "readingRuler", name: "Reading Ruler", desc: "Horizontal guide ruler" },
        { key: "textToSpeech", name: "Text-to-Speech", desc: "Read text aloud on click/hover" },
      ];

      typoTools.forEach(function (t) {
        var item = document.createElement("div");
        item.className = "card-item " + (state[t.key] ? "active" : "");
        item.innerHTML = `
          <div class="card-title">${t.name}</div>
          <div class="card-desc">${t.desc}</div>
          <div class="card-pill">${state[t.key] ? "ON" : "OFF"}</div>
        `;
        item.onclick = function () {
          state[t.key] = !state[t.key];
          if (t.key === "dyslexiaFont" && state.dyslexiaFont) state.fontFamily = "dyslexic";
          if (t.key === "readableFont" && state.readableFont) state.fontFamily = "readable";
          saveState();
          applyEffects();
          renderBody();
        };
        grid.appendChild(item);
      });

      bodyContent.appendChild(grid);
    }

    // 4. VISION TAB
    else if (state.activeTab === "vision" && !state.searchQuery) {
      var grid = document.createElement("div");
      grid.className = "grid-2col";

      var visionTools = [
        { key: "isDarkMode", name: "Dark Contrast", desc: "Sleek dark theme" },
        { key: "isLightMode", name: "Light Contrast", desc: "High contrast white background" },
        { key: "monochrome", name: "Monochrome Mode", desc: "Grayscale black & white" },
        { key: "highlightLinks", name: "Highlight Links", desc: "Underline & highlight links" },
        { key: "highlightHeadings", name: "Highlight Headings", desc: "Outline section titles H1-H6" },
        { key: "highlightButtons", name: "Highlight Buttons", desc: "Highlight action buttons" },
      ];

      visionTools.forEach(function (v) {
        var item = document.createElement("div");
        item.className = "card-item " + (state[v.key] ? "active" : "");
        item.innerHTML = `
          <div class="card-title">${v.name}</div>
          <div class="card-desc">${v.desc}</div>
          <div class="card-pill">${state[v.key] ? "ON" : "OFF"}</div>
        `;
        item.onclick = function () {
          state[v.key] = !state[v.key];
          if (v.key === "isDarkMode" && state.isDarkMode) { state.isLightMode = false; state.monochrome = false; }
          if (v.key === "isLightMode" && state.isLightMode) { state.isDarkMode = false; state.monochrome = false; }
          saveState();
          applyEffects();
          renderBody();
        };
        grid.appendChild(item);
      });

      bodyContent.appendChild(grid);

      // Colorblind Filter Selector
      var cbBox = document.createElement("div");
      cbBox.className = "slider-card";
      cbBox.innerHTML = `
        <div class="slider-top"><span>Colorblind Filters</span></div>
        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:6px; margin-top:6px;">
          <button class="btn-reset" id="cb-off" style="background:${state.colorBlindMode==='none'?'#004bff':'rgba(255,255,255,0.1)'}">Off</button>
          <button class="btn-reset" id="cb-p" style="background:${state.colorBlindMode==='protanopia'?'#004bff':'rgba(255,255,255,0.1)'}">Red (Protan)</button>
          <button class="btn-reset" id="cb-d" style="background:${state.colorBlindMode==='deuteranopia'?'#004bff':'rgba(255,255,255,0.1)'}">Green (Deuter)</button>
        </div>
      `;
      bodyContent.appendChild(cbBox);

      setTimeout(function () {
        var b1 = shadow.getElementById("cb-off");
        var b2 = shadow.getElementById("cb-p");
        var b3 = shadow.getElementById("cb-d");
        if (b1) b1.onclick = function () { state.colorBlindMode = "none"; saveState(); applyEffects(); renderBody(); };
        if (b2) b2.onclick = function () { state.colorBlindMode = "protanopia"; saveState(); applyEffects(); renderBody(); };
        if (b3) b3.onclick = function () { state.colorBlindMode = "deuteranopia"; saveState(); applyEffects(); renderBody(); };
      }, 50);
    }

    // 5. ANNA AI VIRTUAL ASSISTANT TAB
    else if (state.activeTab === "ai" && !state.searchQuery) {
      renderAIChat();
    }
  }

  function renderProfilesGrid() {
    var grid = document.createElement("div");
    grid.className = "grid-2col";

    var profiles = [
      { id: "dyslexia", name: "Dyslexia Profile", desc: "OpenDyslexic font + letter spacing" },
      { id: "adhd", name: "ADHD Profile", desc: "Reading Mask + Ruler spotlight" },
      { id: "lowVision", name: "Low Vision", desc: "High Contrast + Text Magnifier" },
      { id: "seizure", name: "Seizure Safe", desc: "Stop animations & mute sounds" },
      { id: "motor", name: "Motor Skills", desc: "Highlight keyboard focus + Big Cursor" },
      { id: "blind", name: "Blind / Screen Reader", desc: "Voice Text-to-Speech audio reader" },
    ];

    profiles.forEach(function (p) {
      var active = state.activeProfile === p.id;
      var item = document.createElement("div");
      item.className = "card-item " + (active ? "active" : "");
      item.innerHTML = `
        <div class="card-title">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-pill">${active ? "ACTIVE" : "OFF"}</div>
      `;
      item.onclick = function () {
        if (state.activeProfile === p.id) {
          state.activeProfile = "none";
          resetAll();
        } else {
          state.activeProfile = p.id;
          if (p.id === "dyslexia") { state.dyslexiaFont = true; state.fontFamily = "dyslexic"; state.letterSpacing = 2; }
          if (p.id === "adhd") { state.readingMask = true; state.readingRuler = true; }
          if (p.id === "lowVision") { state.isDarkMode = true; state.textMagnifier = true; }
          if (p.id === "seizure") { state.reduceMotion = true; }
          if (p.id === "motor") { state.highlightFocus = true; state.bigCursor = true; }
          if (p.id === "blind") { state.textToSpeech = true; }
        }
        saveState();
        applyEffects();
        renderBody();
      };
      grid.appendChild(item);
    });

    bodyContent.appendChild(grid);
  }

  // Render Anna AI Chat Tab
  function renderAIChat() {
    var chatBox = document.createElement("div");
    chatBox.className = "chat-container";

    var msgList = document.createElement("div");
    msgList.className = "chat-messages";
    msgList.id = "2all-chat-msgs";

    state.chatMessages.forEach(function (m) {
      var msgDiv = document.createElement("div");
      msgDiv.className = "chat-msg " + m.type;
      msgDiv.innerHTML = m.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      if (m.actionLabel) {
        var actBtn = document.createElement("button");
        actBtn.className = "chip-btn";
        actBtn.style.marginTop = "6px";
        actBtn.innerText = m.actionLabel;
        actBtn.onclick = function () {
          if (m.settingAction) {
            state[m.settingAction.key] = m.settingAction.value;
            saveState();
            applyEffects();
            renderBody();
          }
        };
        msgDiv.appendChild(actBtn);
      }
      msgList.appendChild(msgDiv);
    });

    chatBox.appendChild(msgList);

    // Quick Suggestions Chips
    var chips = document.createElement("div");
    chips.className = "chat-suggestions";
    chips.innerHTML = `
      <button class="chip-btn" data-q="What voice tools are available?">🔊 Voice Reader</button>
      <button class="chip-btn" data-q="How do I install the widget?">⚡ Installation</button>
      <button class="chip-btn" data-q="Explain WCAG & ADA legal compliance">⚖️ Legal Compliance</button>
      <button class="chip-btn" data-q="Show pricing plans">💰 Pricing</button>
    `;
    chatBox.appendChild(chips);

    // Input Bar
    var inputBar = document.createElement("div");
    inputBar.className = "chat-input-bar";
    inputBar.innerHTML = `
      <input type="text" class="chat-input" id="2all-chat-in" placeholder="Ask Anna about tools, WCAG, setup..." />
      <button class="chat-send-btn" id="2all-chat-send">Send</button>
    `;
    chatBox.appendChild(inputBar);

    bodyContent.appendChild(chatBox);

    setTimeout(function () {
      var sendBtn = shadow.getElementById("2all-chat-send");
      var chatIn = shadow.getElementById("2all-chat-in");
      var chipBtns = shadow.querySelectorAll(".chip-btn[data-q]");

      chipBtns.forEach(function (c) {
        c.onclick = function () {
          sendUserMessage(c.getAttribute("data-q"));
        };
      });

      if (sendBtn && chatIn) {
        sendBtn.onclick = function () {
          sendUserMessage(chatIn.value);
        };
        chatIn.onkeypress = function (e) {
          if (e.key === "Enter") sendUserMessage(chatIn.value);
        };
      }
      var mContainer = shadow.getElementById("2all-chat-msgs");
      if (mContainer) mContainer.scrollTop = mContainer.scrollHeight;
    }, 50);
  }

  function sendUserMessage(text) {
    if (!text || !text.trim()) return;
    var userText = text.trim();

    state.chatMessages.push({ id: Date.now(), type: "user", text: userText });
    saveState();
    renderBody();

    setTimeout(function () {
      var lower = userText.toLowerCase();
      var botReply = "";
      var actionLabel = null;
      var settingAction = null;

      if (lower.includes("voice") || lower.includes("speech") || lower.includes("read") || lower.includes("sound") || lower.includes("audio")) {
        botReply = "🔊 **Voice & Speech Tools**:\n\n1️⃣ **Text-to-Speech (Read Aloud)**: Reads selected text or paragraph out loud with natural voice synthesis.\n2️⃣ **Screen Reader Mode**: Audio narration for NVDA, JAWS & VoiceOver.";
        actionLabel = "Enable Text-to-Speech Now";
        settingAction = { key: "textToSpeech", value: true };
      } else if (lower.includes("install") || lower.includes("code") || lower.includes("script")) {
        botReply = "⚡ **2-Minute Installation**:\n\nCopy and paste our script tag before the `</body>` tag on your website:\n```html\n<script src=\"https://2all-ai.mccmrfip.in/loader.js\" data-api-key=\"YOUR_KEY\" async></script>\n```";
      } else if (lower.includes("price") || lower.includes("cost") || lower.includes("plan")) {
        botReply = "💰 **2all.ai Pricing Plans**:\n\n• **Standard Plan**: $49/mo\n• **Business Plan**: $99/mo (includes automated AI remediation & monthly audit reports)\n• **Enterprise Plan**: Custom dedicated SLAs & litigation protection support.";
      } else if (lower.includes("wcag") || lower.includes("ada") || lower.includes("legal") || lower.includes("law")) {
        botReply = "⚖️ **ADA & WCAG 2.1 AA Compliance**:\n\n2all.ai automatically remediates your site's DOM structure, ARIA landmarks, image alt texts, and color contrast ratios to protect your business against ADA Title III lawsuits.";
      } else {
        botReply = "🤖 **I'm Anna, your 2all.ai AI Assistant!** I can help you enable accessibility tools (Voice Reader, Dyslexia Font, High Contrast), answer WCAG compliance questions, or guide you through setup!";
      }

      state.chatMessages.push({ id: Date.now(), type: "bot", text: botReply, actionLabel: actionLabel, settingAction: settingAction });
      saveState();
      renderBody();
    }, 400);
  }

  function resetAll() {
    state.activeProfile = "none";
    state.fontSize = 100;
    state.fontFamily = "default";
    state.letterSpacing = 0;
    state.lineHeight = 1.5;
    state.textMagnifier = false;
    state.isHighContrast = false;
    state.isDarkMode = false;
    state.isLightMode = false;
    state.monochrome = false;
    state.colorBlindMode = "none";
    state.readingMask = false;
    state.readingRuler = false;
    state.highlightLinks = false;
    state.highlightHeadings = false;
    state.highlightButtons = false;
    state.bigCursor = false;
    state.textToSpeech = false;
    saveState();
    applyEffects();
    renderBody();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  // DOM Overlays
  var maskTop = document.createElement("div");
  maskTop.style.cssText = "position:fixed;left:0;right:0;top:0;background:rgba(0,0,0,0.75);z-index:2147483645;pointer-events:none;display:none;";
  document.body.appendChild(maskTop);

  var maskBottom = document.createElement("div");
  maskBottom.style.cssText = "position:fixed;left:0;right:0;bottom:0;background:rgba(0,0,0,0.75);z-index:2147483645;pointer-events:none;display:none;";
  document.body.appendChild(maskBottom);

  var ruler = document.createElement("div");
  ruler.style.cssText = "position:fixed;left:0;right:0;height:8px;background:#004bff;box-shadow:0 0 12px #004bff;z-index:2147483646;pointer-events:none;display:none;";
  document.body.appendChild(ruler);

  var magnifier = document.createElement("div");
  magnifier.style.cssText = "position:fixed;padding:12px 18px;background:#0a1329;color:#fff;border-radius:14px;border:2px solid #004bff;font-size:18px;font-weight:bold;z-index:2147483646;pointer-events:none;display:none;max-width:340px;box-shadow:0 10px 30px rgba(0,0,0,0.5);";
  document.body.appendChild(magnifier);

  document.addEventListener("mousemove", function (e) {
    if (state.readingMask) {
      maskTop.style.display = "block";
      maskBottom.style.display = "block";
      maskTop.style.height = Math.max(0, e.clientY - 45) + "px";
      maskBottom.style.top = (e.clientY + 45) + "px";
    } else {
      maskTop.style.display = "none";
      maskBottom.style.display = "none";
    }

    if (state.readingRuler) {
      ruler.style.display = "block";
      ruler.style.top = e.clientY + "px";
    } else {
      ruler.style.display = "none";
    }

    if (state.textMagnifier) {
      var target = e.target;
      if (target && target.innerText && target.innerText.trim().length > 0 && target.innerText.trim().length < 200) {
        magnifier.style.display = "block";
        magnifier.innerText = target.innerText.trim();
        magnifier.style.top = (e.clientY + 20) + "px";
        magnifier.style.left = (e.clientX + 20) + "px";
      } else {
        magnifier.style.display = "none";
      }
    } else {
      magnifier.style.display = "none";
    }
  });

  // Speech Reader Hover Handler
  document.addEventListener("mouseover", function (e) {
    if (!state.textToSpeech || !window.speechSynthesis) return;
    var target = e.target;
    if (target && (target.tagName === "A" || target.tagName === "BUTTON" || target.tagName === "H1" || target.tagName === "H2" || target.tagName === "H3" || target.tagName === "P" || target.tagName === "SPAN")) {
      var text = target.innerText || target.textContent;
      if (text && text.trim().length > 0 && text.trim().length < 200) {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(text.trim());
        u.rate = 1.0;
        window.speechSynthesis.speak(u);
      }
    }
  });

  function applyEffects() {
    var existingStyle = document.getElementById("2all-global-effects");
    if (!existingStyle) {
      existingStyle = document.createElement("style");
      existingStyle.id = "2all-global-effects";
      document.head.appendChild(existingStyle);
    }

    var css = "";

    if (state.fontSize !== 100) {
      css += `html { font-size: ${state.fontSize}% !important; } `;
    }

    if (state.fontFamily === "dyslexic" || state.dyslexiaFont) {
      css += `@import url('https://fonts.cdnfonts.com/css/opendyslexic'); * { font-family: 'OpenDyslexic', sans-serif !important; letter-spacing: 0.08em !important; } `;
    } else if (state.fontFamily === "readable" || state.readableFont) {
      css += `* { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important; } `;
    }

    if (state.isDarkMode) {
      css += `html { background-color: #0a1329 !important; color: #f8fafc !important; } `;
    } else if (state.isLightMode) {
      css += `html { background-color: #ffffff !important; color: #000000 !important; } `;
    }

    if (state.monochrome) {
      css += `html { filter: grayscale(100%) !important; } `;
    }

    if (state.colorBlindMode === "protanopia") {
      css += `html { filter: url(#cb-protanopia) !important; } `;
    } else if (state.colorBlindMode === "deuteranopia") {
      css += `html { filter: url(#cb-deuteranopia) !important; } `;
    }

    if (state.highlightLinks) {
      css += `a { background-color: #fef08a !important; color: #0f172a !important; outline: 2px solid #004bff !important; text-decoration: underline !important; font-weight: bold !important; } `;
    }
    if (state.highlightHeadings) {
      css += `h1, h2, h3, h4, h5, h6 { outline: 2px dashed #004bff !important; background: rgba(0,75,255,0.08) !important; } `;
    }
    if (state.highlightButtons) {
      css += `button, [role="button"] { outline: 3px solid #10b981 !important; } `;
    }

    if (state.bigCursor) {
      css += `* { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%23004bff' stroke='white' stroke-width='2'%3E%3Cpath d='M3 3l7 18 3-7 7-3L3 3z'/%3E%3C/svg%3E"), auto !important; } `;
    }

    existingStyle.textContent = css;
  }

  // Initial Load
  renderBody();
  applyEffects();
})();
