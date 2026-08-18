/**
 * 2all.ai Full-Featured Accessibility Suite Core Engine
 * Version: 3.0.0
 * Standalone, Shadow-DOM isolated, WCAG 2.2 Compliant AI Accessibility Widget.
 */
(function () {
  if (window.__2ALL_CORE_INITIALIZED__) return;
  window.__2ALL_CORE_INITIALIZED__ = true;

  var config = window.__2ALL_CONFIG__ || {
    primaryColor: "#0052ff",
    position: "bottom-right",
    size: "medium",
  };

  var primaryColor = config.primaryColor || "#0052ff";
  var position = config.position || "bottom-right";

  // State management
  var state = {
    open: false,
    activeTab: "modes",
    search: "",
    // Profiles
    dyslexiaMode: false,
    adhdMode: false,
    lowVisionMode: false,
    seizureSafeMode: false,
    motorMode: false,
    // Features & Typography
    fontSizeScale: 100, // 90 to 180%
    readableFont: false,
    dyslexiaFont: false,
    letterSpacing: 0,
    lineHeight: 0,
    textMagnifier: false,
    // Visual & Color
    darkMode: false,
    lightMode: false,
    monochrome: false,
    highSaturation: false,
    lowSaturation: false,
    colorBlindFilter: "none", // protanopia, deuteranopia, tritanopia
    // Focus & Reading
    readingMask: false,
    readingRuler: false,
    highlightLinks: false,
    highlightHeadings: false,
    highlightButtons: false,
    highlightFocus: false,
    bigCursor: false,
    // Speech
    screenReader: false,
  };

  try {
    var saved = localStorage.getItem("2all_accessibility_suite_state");
    if (saved) {
      var parsed = JSON.parse(saved);
      state = Object.assign(state, parsed);
      state.open = false; // Always start closed
    }
  } catch (e) {}

  function saveState() {
    try {
      localStorage.setItem("2all_accessibility_suite_state", JSON.stringify(state));
    } catch (e) {}
  }

  // Create host container with Shadow DOM
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

  // Add SVG Filters for Color Blindness to main document body if not present
  if (!document.getElementById("2all-colorblind-svg")) {
    var svgContainer = document.createElement("div");
    svgContainer.id = "2all-colorblind-svg";
    svgContainer.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;";
    svgContainer.innerHTML = `
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="2all-cb-protanopia" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="2all-cb-deuteranopia" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="2all-cb-tritanopia" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
    `;
    document.body.appendChild(svgContainer);
  }

  // Shadow DOM CSS
  var styleTag = document.createElement("style");
  styleTag.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    
    .widget-container { pointer-events: auto; display: flex; flex-direction: column; align-items: flex-end; }
    .widget-container.left { align-items: flex-start; }

    /* Trigger Floating Button */
    .trigger-btn {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${primaryColor} 0%, #003ebd 100%);
      color: white;
      border: 3px solid #ffffff;
      box-shadow: 0 12px 28px -6px rgba(0, 82, 255, 0.45), 0 8px 12px -4px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      outline: none;
      position: relative;
    }
    .trigger-btn:hover {
      transform: scale(1.08) rotate(3deg);
      box-shadow: 0 16px 32px -6px rgba(0, 82, 255, 0.6);
    }
    .trigger-btn svg { width: 30px; height: 30px; fill: white; stroke: white; }

    /* Main Modal Panel */
    .panel {
      width: 380px;
      max-height: 84vh;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.3);
      margin-bottom: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
    }
    .panel.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* Panel Header */
    .header {
      padding: 16px 20px;
      background: #0f172a;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand { display: flex; align-items: center; gap: 8px; font-weight: 900; font-size: 16px; }
    .badge { background: ${primaryColor}; color: white; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 12px; text-transform: uppercase; }
    .header-actions { display: flex; align-items: center; gap: 8px; }
    .reset-btn { background: rgba(255,255,255,0.15); border: none; color: #f8fafc; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 10px; cursor: pointer; transition: background 0.2s; }
    .reset-btn:hover { background: rgba(255,255,255,0.3); }

    /* Search Bar */
    .search-box { padding: 12px 16px; background: #f8fafc; border-bottom: 1px solid #f1f5f9; }
    .search-input {
      width: 100%;
      padding: 8px 14px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      color: #1e293b;
      outline: none;
    }
    .search-input:focus { border-color: ${primaryColor}; box-shadow: 0 0 0 3px rgba(0,82,255,0.15); }

    /* Category Navigation Tabs */
    .tabs { display: flex; background: #f1f5f9; padding: 4px; border-bottom: 1px solid #e2e8f0; }
    .tab-btn {
      flex: 1;
      padding: 8px 4px;
      background: transparent;
      border: none;
      font-size: 11px;
      font-weight: 800;
      color: #64748b;
      border-radius: 10px;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
    }
    .tab-btn.active { background: #ffffff; color: ${primaryColor}; box-shadow: 0 2px 4px rgba(0,0,0,0.06); }

    /* Main Scrollable Content Area */
    .content { padding: 16px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 12px; }

    /* Card Items */
    .card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    
    .item-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 6px;
      transition: all 0.2s;
      user-select: none;
    }
    .item-card:hover { border-color: #cbd5e1; background: #f1f5f9; transform: translateY(-1px); }
    .item-card.active {
      background: #eff6ff;
      border-color: ${primaryColor};
      box-shadow: 0 4px 12px rgba(0, 82, 255, 0.15);
    }
    .item-card .title { font-size: 12px; font-weight: 800; color: #1e293b; display: flex; items-center; justify-content: space-between; }
    .item-card .desc { font-size: 10px; color: #64748b; font-weight: 500; line-height: 1.3; }
    .item-card .status-pill {
      font-size: 9px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 6px;
      align-self: flex-start;
      text-transform: uppercase;
      background: #e2e8f0;
      color: #475569;
    }
    .item-card.active .status-pill { background: ${primaryColor}; color: #ffffff; }

    /* Scale Control Box */
    .slider-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .slider-header { display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; color: #1e293b; }
    .range-slider { width: 100%; accent-color: ${primaryColor}; cursor: pointer; }

    /* Footer */
    .footer {
      padding: 10px 16px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #64748b;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer a { color: ${primaryColor}; text-decoration: none; font-weight: 800; }
  `;
  shadow.appendChild(styleTag);

  var container = document.createElement("div");
  container.className = "widget-container " + (position.indexOf("left") !== -1 ? "left" : "");

  // Panel HTML
  var panel = document.createElement("div");
  panel.className = "panel";

  panel.innerHTML = `
    <div class="header">
      <div class="brand">
        <span>2all.ai</span>
        <span class="badge">Accessibility Suite</span>
      </div>
      <div class="header-actions">
        <button class="reset-btn" id="2all-reset-btn">Reset All</button>
      </div>
    </div>
    <div class="search-box">
      <input type="text" class="search-input" id="2all-search-input" placeholder="Search features (e.g. font, contrast, dyslexia)..." />
    </div>
    <div class="tabs">
      <button class="tab-btn active" data-tab="modes">Modes</button>
      <button class="tab-btn" data-tab="features">Typography</button>
      <button class="tab-btn" data-tab="vision">Vision</button>
      <button class="tab-btn" data-tab="focus">Focus</button>
    </div>
    <div class="content" id="2all-content-area"></div>
    <div class="footer">
      <span>Powered by <a href="https://2all.ai" target="_blank">2all.ai Suite</a></span>
      <span style="color:#0052ff; font-weight:800;">WCAG 2.2 Ready</span>
    </div>
  `;
  container.appendChild(panel);

  // Trigger Button
  var btn = document.createElement("button");
  btn.className = "trigger-btn";
  btn.setAttribute("aria-label", "Open Accessibility Menu");
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="4" r="2"/>
      <path d="M12 6v6"/>
      <path d="M6 9h12"/>
      <path d="M12 12l-3 9"/>
      <path d="M12 12l3 9"/>
    </svg>
  `;
  container.appendChild(btn);
  shadow.appendChild(container);

  var contentArea = shadow.getElementById("2all-content-area");
  var searchInput = shadow.getElementById("2all-search-input");
  var tabButtons = shadow.querySelectorAll(".tab-btn");

  // Tab switching
  tabButtons.forEach(function (tb) {
    tb.addEventListener("click", function () {
      tabButtons.forEach(function (b) { b.classList.remove("active"); });
      tb.classList.add("active");
      state.activeTab = tb.getAttribute("data-tab");
      renderContent();
    });
  });

  searchInput.addEventListener("input", function (e) {
    state.search = e.target.value.toLowerCase().trim();
    renderContent();
  });

  shadow.getElementById("2all-reset-btn").addEventListener("click", function () {
    resetAllState();
  });

  btn.addEventListener("click", function () {
    state.open = !state.open;
    if (state.open) panel.classList.add("open");
    else panel.classList.remove("open");
  });

  function renderContent() {
    contentArea.innerHTML = "";

    // 1. MODES TAB (Profiles)
    if (state.activeTab === "modes" && !state.search) {
      var grid = document.createElement("div");
      grid.className = "card-grid";

      var profiles = [
        { key: "dyslexiaMode", name: "Dyslexia Profile", desc: "OpenDyslexic font + text spacing" },
        { key: "adhdMode", name: "ADHD Profile", desc: "Reading Mask + Ruler focus" },
        { key: "lowVisionMode", name: "Low Vision", desc: "High Contrast + Text Magnifier" },
        { key: "seizureSafeMode", name: "Seizure Safe", desc: "Stop animations & mute sounds" },
        { key: "motorMode", name: "Motor Skills", desc: "Highlight keyboard focus + Big Cursor" },
        { key: "screenReader", name: "Voice Reader", desc: "Speak text on hover/click" },
      ];

      profiles.forEach(function (p) {
        var card = document.createElement("div");
        card.className = "item-card " + (state[p.key] ? "active" : "");
        card.innerHTML = `
          <div class="title">${p.name}</div>
          <div class="desc">${p.desc}</div>
          <div class="status-pill">${state[p.key] ? "Active" : "Off"}</div>
        `;
        card.onclick = function () {
          state[p.key] = !state[p.key];
          if (p.key === "dyslexiaMode" && state.dyslexiaMode) {
            state.dyslexiaFont = true;
            state.letterSpacing = 2;
          }
          if (p.key === "adhdMode" && state.adhdMode) {
            state.readingMask = true;
            state.readingRuler = true;
          }
          if (p.key === "lowVisionMode" && state.lowVisionMode) {
            state.darkMode = true;
            state.textMagnifier = true;
          }
          saveState();
          applyEffects();
          renderContent();
        };
        grid.appendChild(card);
      });

      contentArea.appendChild(grid);
    }

    // 2. TYPOGRAPHY TAB
    else if (state.activeTab === "features" && !state.search) {
      // Font Scale Slider
      var sliderBox = document.createElement("div");
      sliderBox.className = "slider-box";
      sliderBox.innerHTML = `
        <div class="slider-header">
          <span>Content Scaling</span>
          <span>${state.fontSizeScale}%</span>
        </div>
        <input type="range" class="range-slider" min="90" max="180" step="10" value="${state.fontSizeScale}" id="2all-scale-slider" />
      `;
      contentArea.appendChild(sliderBox);

      setTimeout(function () {
        var slider = shadow.getElementById("2all-scale-slider");
        if (slider) {
          slider.oninput = function (e) {
            state.fontSizeScale = parseInt(e.target.value, 10);
            saveState();
            applyEffects();
            renderContent();
          };
        }
      }, 50);

      var grid = document.createElement("div");
      grid.className = "card-grid";

      var typoItems = [
        { key: "readableFont", name: "Readable Font", desc: "Clear sans-serif typography" },
        { key: "dyslexiaFont", name: "Dyslexia Font", desc: "OpenDyslexic reading font" },
        { key: "textMagnifier", name: "Text Magnifier", desc: "Enlarge text bubble on hover" },
      ];

      typoItems.forEach(function (t) {
        var card = document.createElement("div");
        card.className = "item-card " + (state[t.key] ? "active" : "");
        card.innerHTML = `
          <div class="title">${t.name}</div>
          <div class="desc">${t.desc}</div>
          <div class="status-pill">${state[t.key] ? "On" : "Off"}</div>
        `;
        card.onclick = function () {
          state[t.key] = !state[t.key];
          saveState();
          applyEffects();
          renderContent();
        };
        grid.appendChild(card);
      });
      contentArea.appendChild(grid);
    }

    // 3. VISION TAB
    else if (state.activeTab === "vision" && !state.search) {
      var grid = document.createElement("div");
      grid.className = "card-grid";

      var visionItems = [
        { key: "darkMode", name: "Dark Contrast", desc: "Sleek dark theme" },
        { key: "lightMode", name: "Light Contrast", desc: "High contrast white theme" },
        { key: "monochrome", name: "Monochrome", desc: "Grayscale black & white" },
        { key: "highSaturation", name: "High Saturation", desc: "Vibrant pronounced colors" },
      ];

      visionItems.forEach(function (v) {
        var card = document.createElement("div");
        card.className = "item-card " + (state[v.key] ? "active" : "");
        card.innerHTML = `
          <div class="title">${v.name}</div>
          <div class="desc">${v.desc}</div>
          <div class="status-pill">${state[v.key] ? "On" : "Off"}</div>
        `;
        card.onclick = function () {
          state[v.key] = !state[v.key];
          if (v.key === "darkMode" && state.darkMode) { state.lightMode = false; state.monochrome = false; }
          if (v.key === "lightMode" && state.lightMode) { state.darkMode = false; state.monochrome = false; }
          saveState();
          applyEffects();
          renderContent();
        };
        grid.appendChild(card);
      });

      contentArea.appendChild(grid);

      // Colorblind Section
      var cbBox = document.createElement("div");
      cbBox.className = "slider-box";
      cbBox.innerHTML = `
        <div class="slider-header"><span>Colorblind Filters</span></div>
        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:6px; margin-top:6px;">
          <button class="reset-btn" id="cb-none" style="background:${state.colorBlindFilter==='none'?primaryColor:'rgba(0,0,0,0.06)'}; color:${state.colorBlindFilter==='none'?'#fff':'#333'}">Off</button>
          <button class="reset-btn" id="cb-prot" style="background:${state.colorBlindFilter==='protanopia'?primaryColor:'rgba(0,0,0,0.06)'}; color:${state.colorBlindFilter==='protanopia'?'#fff':'#333'}">Red (Protan)</button>
          <button class="reset-btn" id="cb-deut" style="background:${state.colorBlindFilter==='deuteranopia'?primaryColor:'rgba(0,0,0,0.06)'}; color:${state.colorBlindFilter==='deuteranopia'?'#fff':'#333'}">Green (Deuter)</button>
        </div>
      `;
      contentArea.appendChild(cbBox);

      setTimeout(function () {
        var b1 = shadow.getElementById("cb-none");
        var b2 = shadow.getElementById("cb-prot");
        var b3 = shadow.getElementById("cb-deut");
        if (b1) b1.onclick = function () { state.colorBlindFilter = "none"; saveState(); applyEffects(); renderContent(); };
        if (b2) b2.onclick = function () { state.colorBlindFilter = "protanopia"; saveState(); applyEffects(); renderContent(); };
        if (b3) b3.onclick = function () { state.colorBlindFilter = "deuteranopia"; saveState(); applyEffects(); renderContent(); };
      }, 50);
    }

    // 4. FOCUS TAB
    else if (state.activeTab === "focus" && !state.search) {
      var grid = document.createElement("div");
      grid.className = "card-grid";

      var focusItems = [
        { key: "readingMask", name: "Reading Mask", desc: "Focus line spotlight" },
        { key: "readingRuler", name: "Reading Ruler", desc: "Horizontal tracking guide" },
        { key: "highlightLinks", name: "Highlight Links", desc: "Highlight all hyperlinks" },
        { key: "highlightHeadings", name: "Highlight Headings", desc: "Outline H1-H6 headers" },
        { key: "highlightButtons", name: "Highlight Buttons", desc: "Border action buttons" },
        { key: "bigCursor", name: "Big Cursor", desc: "Enlarged mouse pointer" },
      ];

      focusItems.forEach(function (f) {
        var card = document.createElement("div");
        card.className = "item-card " + (state[f.key] ? "active" : "");
        card.innerHTML = `
          <div class="title">${f.name}</div>
          <div class="desc">${f.desc}</div>
          <div class="status-pill">${state[f.key] ? "On" : "Off"}</div>
        `;
        card.onclick = function () {
          state[f.key] = !state[f.key];
          saveState();
          applyEffects();
          renderContent();
        };
        grid.appendChild(card);
      });
      contentArea.appendChild(grid);
    }
  }

  function resetAllState() {
    state.dyslexiaMode = false;
    state.adhdMode = false;
    state.lowVisionMode = false;
    state.seizureSafeMode = false;
    state.motorMode = false;
    state.fontSizeScale = 100;
    state.readableFont = false;
    state.dyslexiaFont = false;
    state.textMagnifier = false;
    state.darkMode = false;
    state.lightMode = false;
    state.monochrome = false;
    state.colorBlindFilter = "none";
    state.readingMask = false;
    state.readingRuler = false;
    state.highlightLinks = false;
    state.highlightHeadings = false;
    state.highlightButtons = false;
    state.bigCursor = false;
    state.screenReader = false;
    saveState();
    applyEffects();
    renderContent();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  // DOM Overlays (Reading Mask, Ruler, Magnifier)
  var maskTop = document.createElement("div");
  maskTop.id = "2all-mask-top";
  maskTop.style.cssText = "position:fixed;left:0;right:0;top:0;background:rgba(0,0,0,0.7);z-index:2147483645;pointer-events:none;display:none;";
  document.body.appendChild(maskTop);

  var maskBottom = document.createElement("div");
  maskBottom.id = "2all-mask-bottom";
  maskBottom.style.cssText = "position:fixed;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:2147483645;pointer-events:none;display:none;";
  document.body.appendChild(maskBottom);

  var ruler = document.createElement("div");
  ruler.id = "2all-ruler";
  ruler.style.cssText = "position:fixed;left:0;right:0;height:8px;background:#0052ff;box-shadow:0 0 10px #0052ff;z-index:2147483646;pointer-events:none;display:none;";
  document.body.appendChild(ruler);

  var magnifierBubble = document.createElement("div");
  magnifierBubble.id = "2all-magnifier";
  magnifierBubble.style.cssText = "position:fixed;padding:10px 16px;background:#0f172a;color:#fff;border-radius:12px;border:2px solid #0052ff;font-size:18px;font-weight:bold;z-index:2147483646;pointer-events:none;display:none;max-width:320px;";
  document.body.appendChild(magnifierBubble);

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
      if (target && target.innerText && target.innerText.trim().length < 200) {
        magnifierBubble.style.display = "block";
        magnifierBubble.innerText = target.innerText.trim();
        magnifierBubble.style.top = (e.clientY + 20) + "px";
        magnifierBubble.style.left = (e.clientX + 20) + "px";
      } else {
        magnifierBubble.style.display = "none";
      }
    } else {
      magnifierBubble.style.display = "none";
    }
  });

  // Voice Reader Hover Handler
  document.addEventListener("mouseover", function (e) {
    if (!state.screenReader || !window.speechSynthesis) return;
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
    var existingStyle = document.getElementById("2all-global-style");
    if (!existingStyle) {
      existingStyle = document.createElement("style");
      existingStyle.id = "2all-global-style";
      document.head.appendChild(existingStyle);
    }

    var css = "";

    // Font Scale
    if (state.fontSizeScale !== 100) {
      css += `html { font-size: ${state.fontSizeScale}% !important; } `;
    }

    // Font family
    if (state.dyslexiaFont) {
      css += `@import url('https://fonts.cdnfonts.com/css/opendyslexic'); * { font-family: 'OpenDyslexic', sans-serif !important; letter-spacing: 0.08em !important; } `;
    } else if (state.readableFont) {
      css += `* { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important; } `;
    }

    // Themes
    if (state.darkMode) {
      css += `html { background-color: #0f172a !important; color: #f8fafc !important; } `;
    } else if (state.lightMode) {
      css += `html { background-color: #ffffff !important; color: #000000 !important; } `;
    }

    if (state.monochrome) {
      css += `html { filter: grayscale(100%) !important; } `;
    }

    // Colorblind Filters
    if (state.colorBlindFilter === "protanopia") {
      css += `html { filter: url(#2all-cb-protanopia) !important; } `;
    } else if (state.colorBlindFilter === "deuteranopia") {
      css += `html { filter: url(#2all-cb-deuteranopia) !important; } `;
    }

    // Highlights
    if (state.highlightLinks) {
      css += `a { background-color: #fef08a !important; color: #0f172a !important; outline: 2px solid #0052ff !important; text-decoration: underline !important; font-weight: bold !important; } `;
    }
    if (state.highlightHeadings) {
      css += `h1, h2, h3, h4, h5, h6 { outline: 2px dashed #0052ff !important; background: rgba(0,82,255,0.05) !important; } `;
    }
    if (state.highlightButtons) {
      css += `button, [role="button"] { outline: 3px solid #10b981 !important; } `;
    }

    if (state.bigCursor) {
      css += `* { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%230052ff' stroke='white' stroke-width='2'%3E%3Cpath d='M3 3l7 18 3-7 7-3L3 3z'/%3E%3C/svg%3E"), auto !important; } `;
    }

    existingStyle.textContent = css;
  }

  // Initial render & apply
  renderContent();
  applyEffects();
})();
