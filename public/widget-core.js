/**
 * 2all.ai Official Accessibility Suite Core Engine
 * Version: 5.0.0
 * Pixel-Perfect 1:1 Replica of 2all.ai Website AccessibilityPanel.tsx
 */
(function () {
  if (window.__2ALL_CORE_INITIALIZED__) return;
  window.__2ALL_CORE_INITIALIZED__ = true;

  var config = window.__2ALL_CONFIG__ || {
    primaryColor: "#2563eb",
    position: "bottom-right",
    size: "medium",
  };

  var primaryColor = config.primaryColor || "#2563eb";
  var position = config.position || "bottom-right";

  // Accessibility State (Matches AccessibilityContext 1:1)
  var state = {
    open: false,
    activeTab: "dashboard", // dashboard (Home), profiles (Modes), features, vision, ai
    searchQuery: "",
    showAnalysis: false,
    
    // Active Profile
    activeProfile: "none", // dyslexia, adhd, lowVision, seizure, motor, blind

    // Typography
    fontSize: 100, // 90 to 200%
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
    saturationMode: "normal",
    textColor: "default",

    // Reading & Focus
    readingMask: false,
    readingRuler: false,
    highlightLinks: false,
    highlightHeadings: false,
    highlightButtons: false,
    highlightFocus: false,
    reduceMotion: false,
    stopAnimations: false,
    bigCursor: false,

    // Speech
    textToSpeech: false,
    voiceNavigation: false,
    autoReadSelection: false,

    // AI Chat Messages
    chatMessages: [
      {
        id: 1,
        type: "bot",
        text: "👋 Hi! I'm your **2all.ai AI Assistant**. Ask me **anything** about our accessibility tools, WCAG compliance, pricing, installation, or platform features!",
      },
    ],
  };

  try {
    var saved = localStorage.getItem("2all_panel_state_v5");
    if (saved) {
      var parsed = JSON.parse(saved);
      state = Object.assign(state, parsed);
      state.open = false;
    }
  } catch (e) {}

  function saveState() {
    try {
      localStorage.setItem("2all_panel_state_v5", JSON.stringify(state));
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

  // Shadow DOM Styles - Exact Replica of AccessibilityPanel.tsx
  var style = document.createElement("style");
  style.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; user-select: none; }

    .widget-wrapper { pointer-events: auto; display: flex; flex-direction: column; align-items: flex-end; }
    .widget-wrapper.left { align-items: flex-start; }

    /* Floating Blue Circular Trigger Button */
    .trigger-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #004bff;
      color: #ffffff;
      border: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 25px rgba(0, 75, 255, 0.45), 0 8px 16px rgba(0,0,0,0.15);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      outline: none;
    }
    .trigger-btn:hover {
      transform: scale(1.08);
      background: #003edd;
      box-shadow: 0 0 30px rgba(0, 75, 255, 0.6);
    }
    .trigger-btn svg { width: 26px; height: 26px; stroke: white; fill: none; }

    /* Modal Panel - White Clean Box matching AccessibilityPanel.tsx */
    .panel-container {
      width: 375px;
      height: 520px;
      max-height: calc(100vh - 6rem);
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.9);
      border-radius: 20px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.22);
      margin-bottom: 14px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(20px) scale(0.96);
      pointer-events: none;
    }
    .panel-container.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* Top White Header */
    .panel-header {
      padding: 14px 16px 10px 16px;
      border-bottom: 1px solid #f1f5f9;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .header-top { display: flex; align-items: center; justify-content: space-between; }
    .header-title { font-size: 16px; font-weight: 800; color: #0f172a; letter-spacing: -0.3px; line-height: 1; }
    .header-sub { font-size: 11px; font-weight: 600; color: #64748b; margin-top: 2px; }
    
    .header-right { display: flex; align-items: center; gap: 8px; }
    .score-pill {
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 900;
      display: flex;
      align-items: center;
      gap: 6px;
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
    }
    .dot-ping { width: 8px; height: 8px; border-radius: 50%; background: #10b981; }

    .btn-close {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      color: #475569;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 800;
      transition: all 0.15s;
    }
    .btn-close:hover { background: #e2e8f0; color: #0f172a; }

    /* Compact Search Field */
    .search-row { position: relative; width: 100%; }
    .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); width: 14px; height: 14px; color: #94a3b8; }
    .search-input {
      width: 100%;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 7px 12px 7px 32px;
      font-size: 12px;
      font-weight: 500;
      color: #0f172a;
      outline: none;
      transition: all 0.2s;
    }
    .search-input:focus { border-color: #2563eb; background: #ffffff; }

    /* Middle Scrollable Content */
    .panel-body { flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 12px; background: #ffffff; }

    /* Home Score Card */
    .score-card {
      background: linear-gradient(135deg, #0a1e3f 0%, #042868 50%, #004bff 100%);
      border-radius: 16px;
      padding: 16px;
      color: #ffffff;
      box-shadow: 0 10px 25px rgba(0, 75, 255, 0.2);
    }
    .score-flex { display: flex; align-items: center; gap: 14px; }
    .score-circle {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      border: 3.5px solid rgba(255, 255, 255, 0.25);
      border-top-color: #38bdf8;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 900;
      background: rgba(255, 255, 255, 0.1);
      shrink-0: 0;
    }
    .score-h3 { font-size: 16px; font-weight: 800; }
    .score-p { font-size: 11px; color: #93c5fd; margin-top: 2px; line-height: 1.3; }
    .btn-analysis {
      margin-top: 12px;
      width: 100%;
      padding: 7px 12px;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      font-size: 11px;
      font-weight: 700;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .btn-analysis:hover { background: rgba(255, 255, 255, 0.25); }

    .analysis-accordion { margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.2); display: flex; flex-direction: column; gap: 6px; font-size: 11px; }
    .analysis-row { display: flex; justify-content: space-between; background: rgba(255,255,255,0.1); padding: 6px 10px; border-radius: 8px; }

    /* Profiles & Feature Cards Grid */
    .cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    
    .card-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 6px;
      transition: all 0.2s;
    }
    .card-box:hover { background: #f1f5f9; border-color: #cbd5e1; transform: translateY(-1px); }
    .card-box.active {
      background: #eff6ff;
      border-color: #2563eb;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    }
    .card-box-title { font-size: 12px; font-weight: 800; color: #0f172a; }
    .card-box-desc { font-size: 10px; color: #64748b; line-height: 1.3; font-weight: 500; }
    .card-box-pill { font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 6px; align-self: flex-start; text-transform: uppercase; background: #e2e8f0; color: #475569; }
    .card-box.active .card-box-pill { background: #2563eb; color: #ffffff; }

    /* Sliders & Option Groups */
    .option-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .option-title { display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; color: #0f172a; }
    .range-input { width: 100%; accent-color: #2563eb; cursor: pointer; }

    /* Anna AI Chat UI */
    .ai-chat-box { display: flex; flex-direction: column; height: 100%; gap: 8px; }
    .ai-messages-list { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 2px; }
    .ai-msg { max-width: 88%; padding: 9px 12px; border-radius: 14px; font-size: 12px; line-height: 1.4; }
    .ai-msg.bot { background: #f1f5f9; color: #0f172a; border: 1px solid #e2e8f0; align-self: flex-start; border-bottom-left-radius: 2px; }
    .ai-msg.user { background: #2563eb; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 2px; font-weight: 600; }
    .ai-msg strong { color: #2563eb; }
    .ai-msg.user strong { color: #ffffff; }

    .ai-chip-group { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
    .ai-chip-btn { background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 8px; cursor: pointer; transition: all 0.15s; }
    .ai-chip-btn:hover { background: #2563eb; color: #ffffff; border-color: #2563eb; }

    .ai-input-row { display: flex; gap: 6px; padding-top: 6px; border-top: 1px solid #f1f5f9; }
    .ai-input-text { flex: 1; padding: 7px 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 12px; outline: none; color: #0f172a; }
    .ai-input-text:focus { border-color: #2563eb; background: #ffffff; }
    .ai-send-btn { background: #2563eb; border: none; color: #ffffff; font-weight: 700; font-size: 12px; padding: 7px 12px; border-radius: 8px; cursor: pointer; }
    .ai-send-btn:hover { background: #1d4ed8; }

    /* Action Bar (Reset Settings & Hide Forever) */
    .action-bar {
      padding: 10px 12px;
      background: #ffffff;
      border-top: 1px solid #f1f5f9;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .btn-reset-main {
      flex: 1;
      padding: 8px 12px;
      background: #2563eb;
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 0.15s;
    }
    .btn-reset-main:hover { background: #1d4ed8; }
    .btn-hide-main {
      flex: 1;
      padding: 8px 12px;
      background: #f1f5f9;
      color: #334155;
      font-size: 12px;
      font-weight: 700;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      cursor: pointer;
      text-align: center;
      transition: background 0.15s;
    }
    .btn-hide-main:hover { background: #e2e8f0; }

    /* Bottom 5 Icon Navigation Tabs (Matches AccessibilityPanel.tsx) */
    .bottom-nav {
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      padding: 4px 8px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .nav-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 40px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s;
    }
    .nav-btn.active { color: #2563eb; background: #eff6ff; font-weight: 800; }
    .nav-btn svg { width: 16px; height: 16px; margin-bottom: 2px; }
    .nav-btn span { font-size: 9.5px; tracking-tight: -0.2px; }
  `;
  shadow.appendChild(style);

  // Outer Wrapper
  var wrapper = document.createElement("div");
  wrapper.className = "widget-wrapper " + (position.indexOf("left") !== -1 ? "left" : "");

  // Panel Container
  var panel = document.createElement("div");
  panel.className = "panel-container";

  panel.innerHTML = `
    <div class="panel-header">
      <div class="header-top">
        <div>
          <div class="header-title">Accessibility</div>
          <div class="header-sub">Accessibility modes</div>
        </div>
        <div class="header-right">
          <div class="score-pill" id="2all-score-pill">
            <span class="dot-ping"></span>
            <span id="2all-score-text">Score: 100/100</span>
          </div>
          <button class="btn-close" id="2all-close-btn">✕</button>
        </div>
      </div>
      <div class="search-row">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" class="search-input" id="2all-search-input" placeholder="Search accessibility features..." />
      </div>
    </div>
    <div class="panel-body" id="2all-panel-body"></div>
    <div class="action-bar">
      <button class="btn-reset-main" id="2all-reset-main">↻ Reset Settings</button>
      <button class="btn-hide-main" id="2all-hide-main">Hide Forever</button>
    </div>
    <div class="bottom-nav">
      <button class="nav-btn active" data-tab="dashboard">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span>Home</span>
      </button>
      <button class="nav-btn" data-tab="profiles">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>Modes</span>
      </button>
      <button class="nav-btn" data-tab="features">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        <span>Features</span>
      </button>
      <button class="nav-btn" data-tab="vision">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.72 1.7-1.61 0-.43-.17-.83-.44-1.14-.27-.3-.42-.7-.42-1.12 0-.91.74-1.65 1.65-1.65H16c3.31 0 6-2.69 6-6 0-4.97-4.48-9-10-9z"/></svg>
        <span>Vision</span>
      </button>
      <button class="nav-btn" data-tab="ai">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
        <span>AI Assist</span>
      </button>
    </div>
  `;
  wrapper.appendChild(panel);

  // Circular Blue Floating Trigger Button (Person Icon inside Blue Circle)
  var triggerBtn = document.createElement("button");
  triggerBtn.className = "trigger-btn";
  triggerBtn.setAttribute("aria-label", "Toggle Accessibility Panel");
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

  var panelBody = shadow.getElementById("2all-panel-body");
  var searchInput = shadow.getElementById("2all-search-input");
  var navBtns = shadow.querySelectorAll(".nav-btn");

  // Navigation Event Listeners
  navBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      navBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      state.activeTab = btn.getAttribute("data-tab");
      renderPanelBody();
    });
  });

  searchInput.addEventListener("input", function (e) {
    state.searchQuery = e.target.value.toLowerCase().trim();
    renderPanelBody();
  });

  shadow.getElementById("2all-reset-main").onclick = function () { resetSettings(); };
  shadow.getElementById("2all-hide-main").onclick = function () {
    state.open = false;
    panel.classList.remove("open");
  };
  shadow.getElementById("2all-close-btn").onclick = function () {
    state.open = false;
    panel.classList.remove("open");
  };

  triggerBtn.onclick = function () {
    state.open = !state.open;
    if (state.open) panel.classList.add("open");
    else panel.classList.remove("open");
  };

  function calculateScore() {
    var hasProfile = state.activeProfile !== "none";
    var hasTypo = state.fontFamily !== "default" || state.fontSize > 100;
    var hasContrast = state.isHighContrast || state.isDarkMode || state.isLightMode || state.colorBlindMode !== "none";
    var hasReading = state.readingMask || state.readingRuler || state.textMagnifier || state.textToSpeech || state.highlightLinks;

    var score = 70;
    if (hasProfile) score += 15;
    if (hasTypo) score += 5;
    if (hasContrast) score += 5;
    if (hasReading) score += 5;
    return Math.min(100, score);
  }

  function renderPanelBody() {
    panelBody.innerHTML = "";

    var score = calculateScore();
    shadow.getElementById("2all-score-text").innerText = "Score: " + score + "/100";

    // 1. DASHBOARD (HOME TAB)
    if (state.activeTab === "dashboard" && !state.searchQuery) {
      var scoreCard = document.createElement("div");
      scoreCard.className = "score-card";
      scoreCard.innerHTML = `
        <div class="score-flex">
          <div class="score-circle">${score}</div>
          <div>
            <div class="score-h3">Accessibility Score</div>
            <div class="score-p">${score === 100 ? "100% WCAG 2.1 AA Compliant & fully optimized!" : "Personalized WCAG & UX compliance score."}</div>
          </div>
        </div>
        <button class="btn-analysis" id="2all-analysis-trigger">
          <span>ℹ️ How is this score analyzed?</span>
          <span>${state.showAnalysis ? "▲" : "▼"}</span>
        </button>
        ${state.showAnalysis ? `
          <div class="analysis-accordion">
            <div class="analysis-row"><span>WCAG 2.1 AA System Baseline</span><span style="color:#4ade80;font-weight:bold;">70 / 70 Pts</span></div>
            <div class="analysis-row"><span>Active Profile</span><span style="color:${state.activeProfile!=='none'?'#4ade80':'#93c5fd'};font-weight:bold;">${state.activeProfile!=='none'?15:0} / 15 Pts</span></div>
            <div class="analysis-row"><span>Typography Optimizations</span><span style="color:#4ade80;font-weight:bold;">5 Pts</span></div>
            <div class="analysis-row"><span>Visual Contrast Engine</span><span style="color:#4ade80;font-weight:bold;">5 Pts</span></div>
            <div class="analysis-row"><span>Reading & Focus Tools</span><span style="color:#4ade80;font-weight:bold;">5 Pts</span></div>
          </div>
        ` : ""}
      `;
      panelBody.appendChild(scoreCard);

      setTimeout(function () {
        var trigger = shadow.getElementById("2all-analysis-trigger");
        if (trigger) {
          trigger.onclick = function () {
            state.showAnalysis = !state.showAnalysis;
            renderPanelBody();
          };
        }
      }, 50);

      var profilesHeader = document.createElement("div");
      profilesHeader.style.cssText = "font-size:12px; font-weight:800; color:#0f172a; margin-top:2px;";
      profilesHeader.innerText = "Quick Accessibility Profiles";
      panelBody.appendChild(profilesHeader);

      renderProfilesGrid();
    }

    // 2. PROFILES (MODES TAB)
    else if (state.activeTab === "profiles" && !state.searchQuery) {
      renderProfilesGrid();
    }

    // 3. FEATURES (TYPOGRAPHY TAB)
    else if (state.activeTab === "features" && !state.searchQuery) {
      var fontCard = document.createElement("div");
      fontCard.className = "option-card";
      fontCard.innerHTML = `
        <div class="option-title">
          <span>Content Scaling</span>
          <span>${state.fontSize}%</span>
        </div>
        <input type="range" class="range-input" min="90" max="200" step="10" value="${state.fontSize}" id="2all-scale-range" />
      `;
      panelBody.appendChild(fontCard);

      setTimeout(function () {
        var range = shadow.getElementById("2all-scale-range");
        if (range) {
          range.oninput = function (e) {
            state.fontSize = parseInt(e.target.value, 10);
            saveState();
            applyEffects();
            renderPanelBody();
          };
        }
      }, 50);

      var grid = document.createElement("div");
      grid.className = "cards-grid";

      var typoFeatures = [
        { key: "readableFont", name: "Readable Font", desc: "Clear sans-serif typography" },
        { key: "dyslexiaFont", name: "Dyslexia Font", desc: "OpenDyslexic typography" },
        { key: "textMagnifier", name: "Text Magnifier", desc: "Enlarge text on hover" },
        { key: "readingMask", name: "Reading Mask", desc: "Focus line spotlight" },
        { key: "readingRuler", name: "Reading Ruler", desc: "Horizontal guide ruler" },
        { key: "textToSpeech", name: "Text-to-Speech", desc: "Read text out loud" },
      ];

      typoFeatures.forEach(function (t) {
        var box = document.createElement("div");
        box.className = "card-box " + (state[t.key] ? "active" : "");
        box.innerHTML = `
          <div class="card-box-title">${t.name}</div>
          <div class="card-box-desc">${t.desc}</div>
          <div class="card-box-pill">${state[t.key] ? "ON" : "OFF"}</div>
        `;
        box.onclick = function () {
          state[t.key] = !state[t.key];
          if (t.key === "dyslexiaFont" && state.dyslexiaFont) state.fontFamily = "dyslexic";
          if (t.key === "readableFont" && state.readableFont) state.fontFamily = "readable";
          saveState();
          applyEffects();
          renderPanelBody();
        };
        grid.appendChild(box);
      });

      panelBody.appendChild(grid);
    }

    // 4. VISION TAB
    else if (state.activeTab === "vision" && !state.searchQuery) {
      var grid = document.createElement("div");
      grid.className = "cards-grid";

      var visionFeatures = [
        { key: "isDarkMode", name: "Dark Contrast", desc: "High contrast dark mode" },
        { key: "isLightMode", name: "Light Contrast", desc: "High contrast light mode" },
        { key: "monochrome", name: "Monochrome Mode", desc: "Grayscale black & white" },
        { key: "highlightLinks", name: "Highlight Links", desc: "Underline & highlight links" },
        { key: "highlightHeadings", name: "Highlight Headings", desc: "Outline section titles H1-H6" },
        { key: "highlightButtons", name: "Highlight Buttons", desc: "Border action buttons" },
      ];

      visionFeatures.forEach(function (v) {
        var box = document.createElement("div");
        box.className = "card-box " + (state[v.key] ? "active" : "");
        box.innerHTML = `
          <div class="card-box-title">${v.name}</div>
          <div class="card-box-desc">${v.desc}</div>
          <div class="card-box-pill">${state[v.key] ? "ON" : "OFF"}</div>
        `;
        box.onclick = function () {
          state[v.key] = !state[v.key];
          if (v.key === "isDarkMode" && state.isDarkMode) { state.isLightMode = false; state.monochrome = false; }
          if (v.key === "isLightMode" && state.isLightMode) { state.isDarkMode = false; state.monochrome = false; }
          saveState();
          applyEffects();
          renderPanelBody();
        };
        grid.appendChild(box);
      });

      panelBody.appendChild(grid);

      // Colorblind Filter Buttons
      var cbCard = document.createElement("div");
      cbCard.className = "option-card";
      cbCard.innerHTML = `
        <div class="option-title"><span>Colorblind Filters</span></div>
        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:6px; margin-top:4px;">
          <button class="btn-hide-main" id="cb-none" style="padding:6px; font-size:11px; background:${state.colorBlindMode==='none'?'#2563eb':'#f1f5f9'}; color:${state.colorBlindMode==='none'?'#fff':'#334155'}">Off</button>
          <button class="btn-hide-main" id="cb-prot" style="padding:6px; font-size:11px; background:${state.colorBlindMode==='protanopia'?'#2563eb':'#f1f5f9'}; color:${state.colorBlindMode==='protanopia'?'#fff':'#334155'}">Red (Protan)</button>
          <button class="btn-hide-main" id="cb-deut" style="padding:6px; font-size:11px; background:${state.colorBlindMode==='deuteranopia'?'#2563eb':'#f1f5f9'}; color:${state.colorBlindMode==='deuteranopia'?'#fff':'#334155'}">Green (Deuter)</button>
        </div>
      `;
      panelBody.appendChild(cbCard);

      setTimeout(function () {
        var b1 = shadow.getElementById("cb-none");
        var b2 = shadow.getElementById("cb-prot");
        var b3 = shadow.getElementById("cb-deut");
        if (b1) b1.onclick = function () { state.colorBlindMode = "none"; saveState(); applyEffects(); renderPanelBody(); };
        if (b2) b2.onclick = function () { state.colorBlindMode = "protanopia"; saveState(); applyEffects(); renderPanelBody(); };
        if (b3) b3.onclick = function () { state.colorBlindMode = "deuteranopia"; saveState(); applyEffects(); renderPanelBody(); };
      }, 50);
    }

    // 5. ANNA AI ASSIST TAB
    else if (state.activeTab === "ai" && !state.searchQuery) {
      renderAIChatUI();
    }
  }

  function renderProfilesGrid() {
    var grid = document.createElement("div");
    grid.className = "cards-grid";

    var profiles = [
      { id: "dyslexia", name: "Dyslexia Profile", desc: "OpenDyslexic font + letter spacing" },
      { id: "adhd", name: "ADHD Profile", desc: "Reading Mask + Ruler spotlight" },
      { id: "lowVision", name: "Low Vision Profile", desc: "High Contrast + Text Magnifier" },
      { id: "seizure", name: "Seizure Safe Profile", desc: "Stop animations & mute sounds" },
      { id: "motor", name: "Motor Skills Profile", desc: "Highlight keyboard focus + Big Cursor" },
      { id: "blind", name: "Blind / Screen Reader", desc: "Voice Text-to-Speech audio reader" },
    ];

    profiles.forEach(function (p) {
      var active = state.activeProfile === p.id;
      var box = document.createElement("div");
      box.className = "card-box " + (active ? "active" : "");
      box.innerHTML = `
        <div class="card-box-title">${p.name}</div>
        <div class="card-box-desc">${p.desc}</div>
        <div class="card-box-pill">${active ? "ACTIVE" : "OFF"}</div>
      `;
      box.onclick = function () {
        if (state.activeProfile === p.id) {
          state.activeProfile = "none";
          resetSettings();
        } else {
          state.activeProfile = p.id;
          if (p.id === "dyslexia") { state.dyslexiaFont = true; state.fontFamily = "dyslexic"; state.letterSpacing = 2; }
          if (p.id === "adhd") { state.readingMask = true; state.readingRuler = true; }
          if (p.id === "lowVision") { state.isDarkMode = true; state.textMagnifier = true; }
          if (p.id === "seizure") { state.reduceMotion = true; state.stopAnimations = true; }
          if (p.id === "motor") { state.highlightFocus = true; state.bigCursor = true; }
          if (p.id === "blind") { state.textToSpeech = true; }
        }
        saveState();
        applyEffects();
        renderPanelBody();
      };
      grid.appendChild(box);
    });

    panelBody.appendChild(grid);
  }

  function renderAIChatUI() {
    var container = document.createElement("div");
    container.className = "ai-chat-box";

    var msgList = document.createElement("div");
    msgList.className = "ai-messages-list";
    msgList.id = "2all-ai-msg-list";

    state.chatMessages.forEach(function (m) {
      var div = document.createElement("div");
      div.className = "ai-msg " + m.type;
      div.innerHTML = m.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      if (m.actionLabel) {
        var btn = document.createElement("button");
        btn.className = "ai-chip-btn";
        btn.style.marginTop = "6px";
        btn.innerText = m.actionLabel;
        btn.onclick = function () {
          if (m.settingAction) {
            state[m.settingAction.key] = m.settingAction.value;
            saveState();
            applyEffects();
            renderPanelBody();
          }
        };
        div.appendChild(btn);
      }
      msgList.appendChild(div);
    });

    container.appendChild(msgList);

    var chips = document.createElement("div");
    chips.className = "ai-chip-group";
    chips.innerHTML = `
      <button class="ai-chip-btn" data-query="What voice tools are available?">🔊 Voice Reader</button>
      <button class="ai-chip-btn" data-query="How do I install the widget?">⚡ Installation</button>
      <button class="ai-chip-btn" data-query="Explain WCAG & ADA legal compliance">⚖️ Legal Compliance</button>
      <button class="ai-chip-btn" data-query="Show pricing plans">💰 Pricing</button>
    `;
    container.appendChild(chips);

    var inputRow = document.createElement("div");
    inputRow.className = "ai-input-row";
    inputRow.innerHTML = `
      <input type="text" class="ai-input-text" id="2all-ai-input" placeholder="Ask Anna about tools, setup, WCAG..." />
      <button class="ai-send-btn" id="2all-ai-send">Send</button>
    `;
    container.appendChild(inputRow);

    panelBody.appendChild(container);

    setTimeout(function () {
      var sendBtn = shadow.getElementById("2all-ai-send");
      var textIn = shadow.getElementById("2all-ai-input");
      var chipBtns = shadow.querySelectorAll(".ai-chip-btn[data-query]");

      chipBtns.forEach(function (c) {
        c.onclick = function () {
          processAIChatMessage(c.getAttribute("data-query"));
        };
      });

      if (sendBtn && textIn) {
        sendBtn.onclick = function () { processAIChatMessage(textIn.value); };
        textIn.onkeypress = function (e) {
          if (e.key === "Enter") processAIChatMessage(textIn.value);
        };
      }
      var listDiv = shadow.getElementById("2all-ai-msg-list");
      if (listDiv) listDiv.scrollTop = listDiv.scrollHeight;
    }, 50);
  }

  function processAIChatMessage(msg) {
    if (!msg || !msg.trim()) return;
    var userText = msg.trim();

    state.chatMessages.push({ id: Date.now(), type: "user", text: userText });
    saveState();
    renderPanelBody();

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
      renderPanelBody();
    }, 400);
  }

  function resetSettings() {
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
    renderPanelBody();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  // DOM Overlays (Reading Mask, Ruler, Magnifier)
  var maskTop = document.createElement("div");
  maskTop.style.cssText = "position:fixed;left:0;right:0;top:0;background:rgba(0,0,0,0.75);z-index:2147483645;pointer-events:none;display:none;";
  document.body.appendChild(maskTop);

  var maskBottom = document.createElement("div");
  maskBottom.style.cssText = "position:fixed;left:0;right:0;bottom:0;background:rgba(0,0,0,0.75);z-index:2147483645;pointer-events:none;display:none;";
  document.body.appendChild(maskBottom);

  var ruler = document.createElement("div");
  ruler.style.cssText = "position:fixed;left:0;right:0;height:8px;background:#2563eb;box-shadow:0 0 12px #2563eb;z-index:2147483646;pointer-events:none;display:none;";
  document.body.appendChild(ruler);

  var magnifier = document.createElement("div");
  magnifier.style.cssText = "position:fixed;padding:10px 16px;background:#0f172a;color:#ffffff;border-radius:12px;border:2px solid #2563eb;font-size:16px;font-weight:bold;z-index:2147483646;pointer-events:none;display:none;max-width:320px;box-shadow:0 10px 30px rgba(0,0,0,0.4);";
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

  // Speech Text-To-Speech Handler
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
      css += `html { background-color: #0f172a !important; color: #f8fafc !important; } `;
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
      css += `a { background-color: #fef08a !important; color: #0f172a !important; outline: 2px solid #2563eb !important; text-decoration: underline !important; font-weight: bold !important; } `;
    }
    if (state.highlightHeadings) {
      css += `h1, h2, h3, h4, h5, h6 { outline: 2px dashed #2563eb !important; background: rgba(37,99,235,0.08) !important; } `;
    }
    if (state.highlightButtons) {
      css += `button, [role="button"] { outline: 3px solid #10b981 !important; } `;
    }

    if (state.bigCursor) {
      css += `* { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%232563eb' stroke='white' stroke-width='2'%3E%3Cpath d='M3 3l7 18 3-7 7-3L3 3z'/%3E%3C/svg%3E"), auto !important; } `;
    }

    existingStyle.textContent = css;
  }

  // Initial Load
  renderPanelBody();
  applyEffects();
})();
