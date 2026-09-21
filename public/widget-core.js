/**
 * 2all.ai Universal Accessibility Suite & AI Assistant Engine
 * Version: 12.0.0 - Production Universal Standalone Embed
 * Pure Universal Vanilla JS - 100% Pixel-Perfect & Fully Functional on ANY Website
 * Matches Reference Implementation 1:1 Across Home, Modes, Features, Vision, AI Assist.
 */
(function () {
  if (window.__2ALL_CORE_INITIALIZED__) return;
  window.__2ALL_CORE_INITIALIZED__ = true;

  var config = window.__2ALL_CONFIG__ || {
    primaryColor: "#0055ff",
    position: "bottom-right",
    size: "medium",
  };

  var primaryColor = config.primaryColor || "#0055ff";
  var position = config.position || "bottom-right";
  var size = config.size || "medium";

  function hexToRgba(hex, alpha) {
    if (!hex) return "rgba(0, 85, 255, " + alpha + ")";
    var clean = String(hex).replace("#", "").trim();
    if (clean.length === 3) clean = clean.split("").map(function (c) { return c + c; }).join("");
    var num = parseInt(clean, 16);
    if (isNaN(num)) return "rgba(0, 85, 255, " + alpha + ")";
    return "rgba(" + ((num >> 16) & 255) + ", " + ((num >> 8) & 255) + ", " + (num & 255) + ", " + alpha + ")";
  }

  function adjustColor(hex, percent) {
    if (!hex) return "#0041c2";
    var clean = String(hex).replace("#", "").trim();
    if (clean.length === 3) clean = clean.split("").map(function (c) { return c + c; }).join("");
    var num = parseInt(clean, 16);
    if (isNaN(num)) return "#0041c2";
    var amt = Math.round(2.55 * percent);
    var r = Math.min(255, Math.max(0, ((num >> 16) & 255) + amt));
    var g = Math.min(255, Math.max(0, ((num >> 8) & 255) + amt));
    var b = Math.min(255, Math.max(0, (num & 255) + amt));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  var primaryColorDark = adjustColor(primaryColor, -18);
  var btnSize = size === "small" ? "48px" : size === "large" ? "64px" : "56px";
  var iconSize = size === "small" ? "24px" : size === "large" ? "32px" : "28px";

  // Universal Accessibility State
  var state = {
    open: false,
    activeTab: "dashboard", // dashboard (Home), profiles (Modes), features (Features), vision (Vision), ai (AI Assist)
    searchQuery: "",
    showStatement: false,

    // Active Profile Mode
    activeProfile: "none", // dyslexia, adhd, low-vision, blind, motor-impaired, cognitive, seizure, reading, night

    // Typography & Spacing
    fontSize: 100, // 90% - 200%
    fontFamily: "default", // default, dyslexic, lexend, readable
    readableFont: false,
    dyslexiaFont: false,
    letterSpacing: 0, // px: 0, 1, 2, 3, 4, 5
    lineHeight: 1.5, // multiplier: 1.5, 1.8, 2.0, 2.5
    wordSpacing: 0, // em: 0, 0.1, 0.25, 0.5, 1
    textAlignment: "default", // default, left, center, justify
    textMagnifier: false,

    // Visual & Color Contrast
    isHighContrast: false,
    isDarkMode: false,
    isLightMode: false,
    isSmartContrast: false,
    monochrome: false,
    colorBlindMode: "none", // none, protanopia, deuteranopia, tritanopia, achromatopsia
    saturationMode: "normal", // normal, high, low, monochrome
    textColor: "default", // default, blue, purple, red, orange, teal, green, white, black
    titleColor: "default", // default, blue, purple, red, orange, teal, green, white, black
    bgColor: "default", // default, blue, purple, red, orange, teal, green, white, black

    // Focus & Reading Overlays
    readingMask: false,
    readingRuler: false,
    readMode: false,
    highlightLinks: false,
    highlightHeadings: false,
    highlightButtons: false,
    highlightFocus: false,
    highlightHover: false,
    reduceMotion: false,
    stopAnimations: false,
    hideImages: false,
    muteSounds: false,
    cursorSize: "normal", // normal, large, huge
    cursorColor: "default", // default, black, white

    // Speech & Voice Narration
    textToSpeech: false,
    autoReadSelection: false,
    speechStatus: "stopped",
    speed: 1.0,
    pitch: "normal", // low, normal, high
    volume: 100,
    voice: "",
    highlightWord: false,
    highlightSentence: false,
    autoScroll: false,
    voiceNavigation: false,

    // AI Assistant Chat Messages
    aiMessages: [
      {
        id: 1,
        type: "bot",
        text: "👋 Hi! I'm your **2all.ai AI Assistant**. Ask me **anything** about our accessibility tools, WCAG compliance, pricing, installation, or platform features!"
      }
    ]
  };

  // Clear legacy caches and obsolete storage keys
  try {
    localStorage.removeItem("2all_universal_suite_v10");
    localStorage.removeItem("2all_universal_suite_v11");
    localStorage.removeItem("2all_universal_suite_v12");
    localStorage.removeItem("2all_universal_suite_v15");
    localStorage.removeItem("2all_universal_suite_v20");
    localStorage.removeItem("2all_universal_suite_v50");
    localStorage.removeItem("2all_universal_suite_v60");
    localStorage.removeItem("2all_universal_suite_v70");
    localStorage.removeItem("2all_universal_suite_v71");
    localStorage.removeItem("2all_universal_suite_v72");
    localStorage.removeItem("2all_universal_suite_v73");
    localStorage.removeItem("2all_universal_suite_v74");
    localStorage.removeItem("2all_universal_suite_v75");
    localStorage.removeItem("2all_universal_suite_v76");
    localStorage.removeItem("2all_universal_suite_v77");
    localStorage.removeItem("2all_universal_suite_v78");
    localStorage.removeItem("2all_universal_suite_v79");
    localStorage.removeItem("2all_universal_suite_v80");
    localStorage.removeItem("2all_universal_suite_v81");
    localStorage.removeItem("2all_universal_suite_v82");
  } catch (e) {}

  // Restore State from LocalStorage (always ensuring activeTab is fresh "dashboard")
  try {
    var saved = localStorage.getItem("2all_universal_suite_v83");
    if (saved) {
      var parsed = JSON.parse(saved);
      state = Object.assign(state, parsed);
    }
  } catch (e) {}

  // ALWAYS enforce fresh dashboard Home tab on initial load
  state.activeTab = "dashboard";
  state.open = false;
  state.showStatement = false;
  state.searchQuery = "";

  function saveState() {
    try {
      var toSave = Object.assign({}, state);
      delete toSave.open;
      delete toSave.showStatement;
      delete toSave.searchQuery;
      delete toSave.activeTab;
      localStorage.setItem("2all_universal_suite_v83", JSON.stringify(toSave));
    } catch (e) {}
  }

  // Host Container & Shadow DOM Setup
  var host = document.createElement("div");
  host.id = "2all-ai-widget-host";
  host.style.position = "fixed";
  host.style.zIndex = "2147483647";
  host.style.pointerEvents = "none";

  var posStyles = {
    "bottom-right": "bottom: 20px; right: 20px;",
    "bottom-left": "bottom: 20px; left: 20px;",
    "top-right": "top: 20px; right: 20px;",
    "top-left": "top: 20px; left: 20px;",
  };
  host.style.cssText += posStyles[position] || posStyles["bottom-right"];

  document.body.appendChild(host);
  var shadow = host.attachShadow({ mode: "open" });

  // Colorblind SVG Matrix Filters Injection to Document Body
  function ensureSvgFilters() {
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
      (document.body || document.documentElement).appendChild(svgDiv);
    }
  }
  ensureSvgFilters();

  // Inject Google Fonts (Inter, Lexend & Atkinson Hyperlegible) & OpenDyslexic Font to Document Head
  if (!document.getElementById("2all-google-fonts-link")) {
    var gfLink = document.createElement("link");
    gfLink.id = "2all-google-fonts-link";
    gfLink.rel = "stylesheet";
    gfLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Lexend:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(gfLink);
  }
  if (!document.getElementById("2all-opendyslexic-link")) {
    var linkEl = document.createElement("link");
    linkEl.id = "2all-opendyslexic-link";
    linkEl.rel = "stylesheet";
    linkEl.href = "https://fonts.cdnfonts.com/css/open-dyslexic";
    document.head.appendChild(linkEl);
  }
  if (!document.getElementById("2all-opendyslexic-font")) {
    var fontStyle = document.createElement("style");
    fontStyle.id = "2all-opendyslexic-font";
    fontStyle.textContent = `
      @font-face {
        font-family: 'OpenDyslexic';
        src: url('https://fonts.cdnfonts.com/s/29616/open-dyslexic.woff') format('woff'),
             url('https://cdn.jsdelivr.net/gh/antijingoist/open-dyslexic@master/font/compiled/OpenDyslexic-Regular.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `;
    document.head.appendChild(fontStyle);
  }

  // Inject Direct Inter Font @font-face to Document Head
  if (!document.getElementById("2all-inter-font-face")) {
    var interStyle = document.createElement("style");
    interStyle.id = "2all-inter-font-face";
    interStyle.textContent = `
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('/fonts/inter-400.ttf') format('truetype'),
             url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuOKfMZg.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/inter-400.ttf') format('truetype'),
             url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/inter-500.ttf') format('truetype'),
             url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/inter-600.ttf') format('truetype'),
             url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/inter-700.ttf') format('truetype'),
             url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url('/fonts/inter-800.ttf') format('truetype'),
             url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZg.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url('/fonts/inter-900.ttf') format('truetype'),
             url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZg.ttf') format('truetype');
      }
    `;
    document.head.appendChild(interStyle);
  }

  // Programmatically load and register Inter font in global document.fonts for Shadow DOM access
  if (typeof FontFace !== "undefined" && document.fonts) {
    var interFontDefs = [
      { w: "400", l: "/fonts/inter-400.ttf", c: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf" },
      { w: "500", l: "/fonts/inter-500.ttf", c: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf" },
      { w: "600", l: "/fonts/inter-600.ttf", c: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf" },
      { w: "700", l: "/fonts/inter-700.ttf", c: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf" },
      { w: "800", l: "/fonts/inter-800.ttf", c: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZg.ttf" },
      { w: "900", l: "/fonts/inter-900.ttf", c: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZg.ttf" }
    ];
    interFontDefs.forEach(function (f) {
      try {
        var face = new FontFace("Inter", "url('" + f.l + "'), url('" + f.c + "')", { weight: f.w, style: "normal" });
        face.load().then(function (loadedFace) {
          document.fonts.add(loadedFace);
        }).catch(function () {
          var fb = new FontFace("Inter", "url('" + f.c + "')", { weight: f.w, style: "normal" });
          fb.load().then(function (fLoaded) { document.fonts.add(fLoaded); }).catch(function(){});
        });
      } catch (e) {}
    });
  }

  // Preloader element in document.body to force Chrome font layout engine rasterization
  if (!document.getElementById("2all-font-preload-trigger")) {
    var preEl = document.createElement("div");
    preEl.id = "2all-font-preload-trigger";
    preEl.style.cssText = "position:absolute;top:-9999px;left:-9999px;visibility:hidden;pointer-events:none;";
    preEl.innerHTML = "<span style=\"font-family:'Inter';font-weight:400;\">.</span><span style=\"font-family:'Inter';font-weight:600;\">.</span><span style=\"font-family:'Inter';font-weight:700;\">.</span><span style=\"font-family:'Inter';font-weight:800;\">.</span><span style=\"font-family:'Inter';font-weight:900;\">.</span>";
    document.body.appendChild(preEl);
  }

  // Shadow DOM Internal Styles - 100% Isolated & Pixel Perfect
  var style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('/fonts/inter-400.ttf') format('truetype'),
           url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url('/fonts/inter-500.ttf') format('truetype'),
           url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-display: swap;
      src: url('/fonts/inter-600.ttf') format('truetype'),
           url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url('/fonts/inter-700.ttf') format('truetype'),
           url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 800;
      font-display: swap;
      src: url('/fonts/inter-800.ttf') format('truetype'),
           url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZg.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 900;
      font-display: swap;
      src: url('/fonts/inter-900.ttf') format('truetype'),
           url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZg.ttf') format('truetype');
    }

    :host, :host *, *, *::before, *::after {
      box-sizing: border-box !important;
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      user-select: none;
    }

    .widget-wrapper {
      pointer-events: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      position: relative;
    }
    .widget-wrapper.left { align-items: flex-start; }

    /* Trigger Button */
    .trigger-btn {
      width: ${btnSize};
      height: ${btnSize};
      border-radius: 50%;
      background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorDark} 100%);
      color: #ffffff;
      border: 2px solid rgba(255, 255, 255, 0.35);
      box-shadow: 0 10px 25px ${hexToRgba(primaryColor, 0.45)}, 0 4px 10px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      outline: none;
    }
    .trigger-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 12px 30px ${hexToRgba(primaryColor, 0.6)};
    }
    .trigger-btn svg { width: ${iconSize}; height: ${iconSize}; stroke: white; fill: none; stroke-width: 2.2; }

    /* Main Modal Panel Container (Larger, Spacious & Never Cut Off) */
    .panel-container {
      position: absolute;
      bottom: 66px;
      right: 0px;
      width: 480px;
      max-width: calc(100vw - 28px);
      height: 680px;
      max-height: calc(100vh - 100px);
      background: #ffffff;
      border: 1px solid ${hexToRgba(primaryColor, 0.2)};
      border-radius: 28px;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28), 0 0 0 1px ${hexToRgba(primaryColor, 0.08)};
      overflow: hidden;
      display: none;
      flex-direction: column;
      transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(15px) scale(0.96);
      pointer-events: auto;
      z-index: 100;
    }
    .widget-wrapper.left .panel-container { right: auto; left: 0px; }

    .panel-container.open {
      display: flex;
      opacity: 1;
      transform: translateY(0px) scale(1);
    }

    /* Top Royal Blue Header */
    .panel-header-blue {
      background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorDark} 100%);
      color: #ffffff;
      padding: 18px 20px 15px 20px;
      flex-shrink: 0;
      position: relative;
    }

    .header-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .btn-close-circle {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.18);
      border: none;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s;
    }
    .btn-close-circle:hover { background: rgba(255, 255, 255, 0.35); }

    .lang-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      font-weight: 800;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 5px 12px;
      border-radius: 20px;
      cursor: pointer;
      color: #ffffff;
      transition: background 0.15s;
    }
    .lang-pill:hover { background: rgba(255, 255, 255, 0.3); }

    .header-main-title {
      font-size: 22px;
      font-weight: 900;
      text-align: center;
      letter-spacing: -0.4px;
      color: #ffffff;
      margin-bottom: 12px;
    }

    .header-actions-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
    }

    .header-action-pill {
      background: #ffffff;
      color: ${primaryColor};
      border: 1px solid #dbeafe;
      border-radius: 20px;
      padding: 8px 10px;
      font-size: 11.5px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: all 0.15s;
    }
    .header-action-pill:hover { background: #eff6ff; transform: translateY(-1px); }
    .header-action-pill svg { width: 14px; height: 14px; stroke-width: 2.5; }

    /* Responsive Screen Heights: Smooth scaling so it NEVER cuts off */
    @media (max-height: 780px) {
      .panel-container {
        bottom: 60px;
        max-height: calc(100vh - 90px);
        height: 620px;
      }
      .panel-header-blue {
        padding: 14px 16px 12px 16px;
      }
      .header-main-title {
        font-size: 19px;
        margin-bottom: 10px;
      }
      .header-top-row {
        margin-bottom: 8px;
      }
      .header-action-pill {
        padding: 6px 8px;
        font-size: 11px;
      }
    }

    @media (max-height: 640px) {
      .panel-container {
        bottom: 56px;
        max-height: calc(100vh - 78px);
        height: 520px;
      }
      .panel-header-blue {
        padding: 10px 14px 8px 14px;
      }
      .header-main-title {
        font-size: 16px;
        margin-bottom: 6px;
      }
      .header-top-row {
        margin-bottom: 6px;
      }
      .header-actions-row {
        gap: 6px;
      }
      .header-action-pill {
        padding: 5px 6px;
        font-size: 10px;
      }
    }

    @media (max-width: 520px) {
      .panel-container {
        width: calc(100vw - 20px);
        right: -6px;
      }
      .widget-wrapper.left .panel-container {
        right: auto;
        left: -6px;
      }
    }

    /* Search Bar */
    .search-container {
      padding: 10px 14px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      position: relative;
      flex-shrink: 0;
      z-index: 10;
    }
    .search-box-inner {
      position: relative;
      display: flex;
      align-items: center;
    }
    .search-icon-svg {
      position: absolute;
      left: 12px;
      width: 14px;
      height: 14px;
      color: #94a3b8;
      pointer-events: none;
    }
    .search-input-field {
      width: 100%;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 8px 12px 8px 34px;
      font-size: 12px;
      font-weight: 600;
      color: #0f172a;
      outline: none;
      transition: border-color 0.2s;
    }
    .search-input-field:focus { border-color: ${primaryColor}; }
    .search-input-field::placeholder { color: #94a3b8; font-weight: 500; }

    /* Panel Scrollable Body */
    .panel-body-content {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      padding: 14px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .panel-body-content::-webkit-scrollbar {
      width: 5px;
    }
    .panel-body-content::-webkit-scrollbar-track {
      background: transparent;
    }
    .panel-body-content::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    .panel-body-content::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    /* AI Assistant Card (Screenshot 1) */
    .ai-assistant-banner {
      background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
      border: 1px solid #bfdbfe;
      border-radius: 16px;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-shrink: 0;
    }
    .ai-banner-left { display: flex; align-items: center; gap: 10px; }
    .ai-banner-icon {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: ${primaryColor};
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 10px ${hexToRgba(primaryColor, 0.25)};
    }
    .ai-banner-icon svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2.2; }
    .ai-banner-title { font-size: 12.5px; font-weight: 800; color: #1e3a8a; }
    .ai-banner-sub { font-size: 10.5px; color: #475569; font-weight: 600; margin-top: 1px; }
    .ai-banner-btn {
      background: #ffffff;
      color: ${primaryColor};
      border: 1px solid #bfdbfe;
      padding: 5px 10px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      transition: all 0.15s;
      flex-shrink: 0;
    }
    .ai-banner-btn:hover { background: ${primaryColor}; color: #ffffff; border-color: ${primaryColor}; }

    /* AI Suggestion Card (Screenshot 1) */
    .ai-suggestion-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 16px;
      padding: 12px;
      position: relative;
      display: flex;
      gap: 10px;
      flex-shrink: 0;
    }
    .ai-sug-avatar {
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background: ${primaryColor};
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .ai-sug-avatar svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.2; }
    .ai-sug-content { flex: 1; min-width: 0; }
    .ai-sug-title {
      font-size: 12.5px;
      font-weight: 800;
      color: #1e3a8a;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ai-sug-desc {
      font-size: 11px;
      color: #334155;
      font-weight: 600;
      line-height: 1.35;
      margin: 4px 0 8px 0;
    }
    .ai-sug-btn {
      background: #ffffff;
      color: ${primaryColor};
      border: 1px solid #bfdbfe;
      padding: 5px 12px;
      border-radius: 8px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: all 0.15s;
    }
    .ai-sug-btn:hover { background: ${primaryColor}; color: #ffffff; border-color: ${primaryColor}; }

    /* Section Label */
    .section-heading-text {
      font-size: 11px;
      font-weight: 900;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-top: 2px;
    }

    /* Quick Actions 2x2 Grid (Screenshot 1) */
    .quick-actions-2x2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      flex-shrink: 0;
    }
    .action-card-btn {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 14px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    }
    .action-card-btn:hover { border-color: ${primaryColor}; transform: translateY(-1px); box-shadow: 0 4px 12px ${hexToRgba(primaryColor, 0.12)}; }
    .action-card-btn.active {
      background: ${hexToRgba(primaryColor, 0.08)};
      border-color: ${primaryColor};
      box-shadow: 0 4px 14px ${hexToRgba(primaryColor, 0.18)};
    }
    .action-card-icon-slot {
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .action-card-title {
      font-size: 11.5px;
      font-weight: 800;
      color: #0f172a;
      text-align: center;
    }

    /* Explore Banner */
    .explore-modes-banner {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      flex-shrink: 0;
    }
    .explore-modes-banner:hover { border-color: ${primaryColor}; transform: translateY(-1px); }
    .explore-modes-title { font-size: 12px; font-weight: 800; color: #0f172a; }
    .explore-modes-sub { font-size: 10.5px; color: #64748b; font-weight: 500; margin-top: 1px; }
    .explore-modes-arrow { font-size: 15px; font-weight: 900; color: ${primaryColor}; }

    /* Bottom Action Bar (Reset Settings & Hide Forever) */
    .bottom-action-row {
      padding: 8px 12px;
      background: #ffffff;
      border-top: 1px solid #f1f5f9;
      display: flex;
      gap: 8px;
      align-items: center;
      flex-shrink: 0;
    }
    .btn-reset-bottom {
      flex: 1;
      padding: 8px 12px;
      background: ${primaryColor};
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 800;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      box-shadow: 0 2px 6px ${hexToRgba(primaryColor, 0.2)};
      transition: background 0.15s;
    }
    .btn-reset-bottom:hover { background: ${primaryColorDark}; }
    .btn-reset-bottom svg { width: 13px; height: 13px; stroke-width: 2.5; }

    .btn-hide-bottom {
      flex: 1;
      padding: 8px 12px;
      background: #f8fafc;
      color: #334155;
      font-size: 11.5px;
      font-weight: 800;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      cursor: pointer;
      transition: background 0.15s;
      text-align: center;
    }
    .btn-hide-bottom:hover { background: #f1f5f9; }

    /* Bottom 5 Navigation Tabs */
    .bottom-nav-5 {
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      padding: 4px 6px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-shrink: 0;
    }
    .nav-tab-btn {
      flex: 1;
      max-width: 60px;
      height: 42px;
      background: transparent;
      border: none;
      border-radius: 8px;
      color: #64748b;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      font-size: 9.5px;
      font-weight: 600;
      transition: all 0.15s;
    }
    .nav-tab-btn:hover { background: #f8fafc; color: #0f172a; }
    .nav-tab-btn.active { color: ${primaryColor}; background: ${hexToRgba(primaryColor, 0.12)}; font-weight: 800; }
    .nav-tab-btn svg { width: 15px; height: 15px; stroke-width: 2.2; }
    .nav-tab-btn span { font-size: 9.5px; font-weight: 700; letter-spacing: -0.2px; font-family: 'Inter', sans-serif !important; }

    /* Profiles / Modes List */
    .profile-card-item {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.9);
      border-radius: 16px;
      padding: 16px 18px;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 6px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    }
    .profile-card-item:hover {
      border-color: #cbd5e1;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .profile-card-item.active {
      background: ${hexToRgba(primaryColor, 0.08)};
      border: 2px solid ${primaryColor};
      box-shadow: 0 4px 14px ${hexToRgba(primaryColor, 0.12)};
      padding: 16px 18px;
    }
    .profile-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
    }
    .profile-card-left {
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 0;
      flex: 1;
    }
    .profile-icon-box {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: #f1f5f9;
      color: #334155;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.2s;
    }
    .profile-card-item.active .profile-icon-box {
      background: ${primaryColor};
      color: #ffffff;
      box-shadow: 0 2px 6px ${hexToRgba(primaryColor, 0.35)};
    }
    .profile-icon-box svg {
      width: 22px;
      height: 22px;
    }
    .profile-card-text {
      min-width: 0;
      flex: 1;
    }
    .profile-title {
      font-size: 14px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.35;
      letter-spacing: -0.01em;
    }
    .profile-card-item.active .profile-title {
      color: #172554;
    }
    .profile-desc {
      font-size: 12px;
      color: #64748b;
      font-weight: 600;
      margin-top: 2px;
      line-height: 1.35;
    }
    .toggle-switch-ui {
      width: 44px;
      height: 24px;
      border-radius: 9999px;
      background: #e2e8f0;
      padding: 2px;
      transition: background 0.2s;
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }
    .toggle-switch-ui.active {
      background: ${primaryColor};
    }
    .toggle-knob-ui {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffffff;
      transition: transform 0.2s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }
    .toggle-switch-ui.active .toggle-knob-ui {
      transform: translateX(20px);
    }
    .profile-details-exp {
      font-size: 12px;
      color: #334155;
      line-height: 1.5;
      padding-top: 10px;
      border-top: 1px solid rgba(191, 219, 254, 0.8);
      margin-top: 10px;
    }

    /* Content Scaling & Feature Controls */
    .scale-bar-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .scale-bar-title { font-size: 12px; font-weight: 800; color: #0f172a; }
    .scale-controls-row { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 220px; }
    .scale-step-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: ${primaryColor};
      color: #ffffff;
      border: none;
      font-size: 16px;
      font-weight: 900;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px ${hexToRgba(primaryColor, 0.3)};
      transition: transform 0.1s;
    }
    .scale-step-btn:active { transform: scale(0.95); }
    .scale-display-val { font-size: 12px; font-weight: 800; color: #0f172a; background: #f1f5f9; padding: 4px 14px; border-radius: 20px; }

    /* Segmented pill selector box */
    .segmented-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .segmented-header {
      font-size: 12px;
      font-weight: 800;
      color: #0f172a;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .segmented-buttons-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .segmented-pill-btn {
      flex: 1;
      min-width: 60px;
      padding: 6px 10px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 700;
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      color: #334155;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s;
    }
    .segmented-pill-btn:hover { border-color: ${primaryColor}; }
    .segmented-pill-btn.active {
      background: ${primaryColor};
      color: #ffffff;
      border-color: ${primaryColor};
      box-shadow: 0 2px 6px ${hexToRgba(primaryColor, 0.25)};
    }
    .feat-voice-panel {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 16px;
      padding: 14px;
      margin-top: 10px;
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 4px 14px rgba(0, 85, 255, 0.08);
    }

    .grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .feat-group-title {
      font-size: 11px;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 6px 2px 2px 2px;
      margin-top: 14px;
      margin-bottom: 8px;
    }
    .feat-grid-2col {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-bottom: 10px;
    }
    .feat-tool-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 16px 10px;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      color: #334155;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
      min-height: 84px;
      box-sizing: border-box;
      outline: none;
      font-family: inherit;
    }
    .feat-tool-card:hover {
      border-color: #93c5fd;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 85, 255, 0.08);
    }
    .feat-tool-card:active {
      background: #f1f5f9;
    }
    .feat-tool-card.active {
      background: ${primaryColor} !important;
      border-color: ${primaryColor} !important;
      color: #ffffff !important;
      box-shadow: 0 4px 14px ${hexToRgba(primaryColor, 0.28)};
    }
    .feat-tool-card.active svg {
      stroke: #ffffff !important;
    }
    .feat-tool-card.active svg[fill]:not([fill="none"]) {
      fill: #ffffff !important;
    }
    .feat-tool-card.disabled {
      opacity: 0.4 !important;
      cursor: not-allowed !important;
      pointer-events: none !important;
      border-color: #e2e8f0 !important;
    }
    .feat-tool-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
    }
    .feat-tool-icon-wrap svg {
      width: 22px;
      height: 22px;
      stroke-width: 2;
    }
    .feat-tool-label {
      font-size: 11px;
      font-weight: 700;
      text-align: center;
      line-height: 1.25;
    }
    .feat-voice-panel {
      background: #ffffff;
      border: 1px solid #cbe2ff;
      border-radius: 16px;
      padding: 14px;
      margin-top: 4px;
      margin-bottom: 8px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 4px 14px rgba(0, 85, 255, 0.08);
      grid-column: 1 / -1;
      width: 100%;
      box-sizing: border-box;
    }
    .feat-card-item {
      background: #ffffff;
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
    .feat-card-item:hover { border-color: ${primaryColor}; transform: translateY(-1px); }
    .feat-card-item.active { background: ${hexToRgba(primaryColor, 0.08)}; border-color: ${primaryColor}; box-shadow: 0 4px 12px ${hexToRgba(primaryColor, 0.12)}; }
    .feat-card-title { font-size: 12px; font-weight: 800; color: #0f172a; }
    .feat-card-desc { font-size: 10px; color: #64748b; line-height: 1.3; font-weight: 500; }
    .feat-card-status { font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 6px; align-self: flex-start; text-transform: uppercase; background: #e2e8f0; color: #475569; }
    .feat-card-item.active .feat-card-status { background: ${primaryColor}; color: #ffffff; }


    /* Action bar button (Read Selected Text, Read Page, Stop) */
    .action-row-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .action-row-btn {
      padding: 7px 14px;
      background: ${primaryColor};
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: background 0.15s;
    }
    .action-row-btn:hover { background: #0042cc; }
    .action-row-btn.stop { background: #dc2626; }
    .action-row-btn.stop:hover { background: #b91c1c; }

    /* Statement Modal Overlay */
    .statement-modal-overlay {
      position: absolute;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(2px);
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .statement-modal-box {
      background: #ffffff;
      border-radius: 20px;
      padding: 20px;
      max-width: 380px;
      width: 100%;
      box-shadow: 0 25px 50px rgba(0,0,0,0.25);
      position: relative;
    }
    .statement-close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      border: none;
      background: transparent;
      color: #94a3b8;
      cursor: pointer;
      font-size: 16px;
      font-weight: 800;
    }
    .statement-title { font-size: 15px; font-weight: 800; color: ${primaryColor}; display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
    .statement-body-text { font-size: 11.5px; color: #475569; line-height: 1.5; margin-bottom: 12px; }
    .statement-highlight-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 12px;
      padding: 10px;
      font-size: 11px;
      font-weight: 600;
      color: #1e3a8a;
      line-height: 1.5;
      margin-bottom: 14px;
    }
    .statement-close-action {
      width: 100%;
      padding: 9px;
      background: ${primaryColor};
      color: #ffffff;
      font-size: 12px;
      font-weight: 800;
      border-radius: 12px;
      border: none;
      cursor: pointer;
    }

    /* AI Chat Tab View */
    .ai-chat-view {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 10px;
    }
    .ai-chat-messages {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-right: 4px;
    }
    .ai-chat-bubble {
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 12px;
      line-height: 1.45;
      font-weight: 500;
      max-width: 88%;
    }
    .ai-chat-bubble.bot {
      background: #ffffff;
      color: #0f172a;
      border: 1px solid #e2e8f0;
      border-top-left-radius: 4px;
      align-self: flex-start;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .ai-chat-bubble.user {
      background: ${primaryColor};
      color: #ffffff;
      border-top-right-radius: 4px;
      align-self: flex-end;
    }
    .ai-chat-chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 4px;
    }
    .ai-chip-pill {
      background: #ffffff;
      border: 1px solid #bfdbfe;
      color: ${primaryColor};
      font-size: 11px;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 12px;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s;
    }
    .ai-chip-pill:hover { background: ${primaryColor}; color: #ffffff; }
    .ai-chat-input-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .ai-chat-input-box {
      flex: 1;
      padding: 9px 14px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      font-size: 12px;
      outline: none;
      color: #0f172a;
    }
    .ai-chat-input-box:focus { border-color: ${primaryColor}; }
    .ai-chat-send-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: ${primaryColor};
      color: #ffffff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
  `;
  shadow.appendChild(style);

  // Outer Wrapper
  var wrapper = document.createElement("div");
  wrapper.className = "widget-wrapper " + (position.indexOf("left") !== -1 ? "left" : "");

  // Main Modal Panel Element
  var panel = document.createElement("div");
  panel.className = "panel-container";
  panel.innerHTML = `
    <!-- Royal Blue Gradient Top Header (Matches Screenshot 1) -->
    <div class="panel-header-blue">
      <div class="header-top-row">
        <button class="btn-close-circle" id="2all-btn-close-header" title="Close">
          <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:none;stroke:white;stroke-width:2.5;"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="header-action-pill" id="2all-hdr-statement" style="padding:4px 10px;font-size:11px;font-weight:700;background:rgba(255,255,255,0.2);color:white;border:1px solid rgba(255,255,255,0.25);border-radius:9999px;cursor:pointer;display:flex;align-items:center;gap:4px;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            Statement
          </button>
          <div class="lang-pill">
            <span style="display:flex;align-items:center;gap:6px;">
              <svg width="15" height="11" viewBox="0 0 640 480" style="border-radius:2px;display:inline-block;box-shadow:0 0 1px rgba(0,0,0,0.5);"><g fill-rule="evenodd"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.4h640M0 129.2h640M0 203h640M0 277h640M0 350.8h640M0 424.6h640"/><path fill="#192f5d" d="M0 0h256v258.5H0z"/></g></svg>
              ENGLISH (US)
            </span>
            <span style="font-size:9px;">&#9660;</span>
          </div>
        </div>
      </div>

      <div class="header-main-title" style="padding-bottom:4px;">Accessibility Adjustments</div>
    </div>

    <!-- Search Input Bar -->
    <div class="search-container">
      <div class="search-box-inner">
        <svg class="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" class="search-input-field" id="2all-search-field" placeholder="Search accessibility features..." />
      </div>
    </div>

    <!-- Scrollable Panel Body -->
    <div class="panel-body-content" id="2all-panel-body-content"></div>

    <!-- Statement Modal Overlay Container -->
    <div id="2all-statement-modal" style="display:none;"></div>

    <!-- Bottom Action Bar (Screenshot 2 Match) -->
    <div class="bottom-action-row" style="padding:10px 12px;background:#ffffff;border-top:1px solid #f1f5f9;display:flex;gap:8px;align-items:center;flex-shrink:0;">
      <button class="btn-reset-bottom" id="2all-btn-reset-bottom" style="flex:1;padding:8px 12px;background:${primaryColor};color:#ffffff;font-size:12px;font-weight:700;border-radius:12px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 1px 2px rgba(0,0,0,0.05);transition:all 0.15s;">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
        Reset Settings
      </button>
      <button class="btn-hide-bottom" id="2all-btn-hide-bottom" style="flex:1;padding:8px 12px;background:#f1f5f9;color:#334155;font-size:12px;font-weight:700;border-radius:12px;border:1px solid rgba(226, 232, 240, 0.8);cursor:pointer;transition:all 0.15s;text-align:center;">Hide Forever</button>
    </div>

    <!-- Bottom 5 Navigation Tabs (Exact Match with Screenshot 2) -->
    <div class="bottom-nav-5" style="background:#ffffff;border-top:1px solid rgba(226, 232, 240, 0.8);padding:4px 6px;display:flex;justify-content:space-around;align-items:center;flex-shrink:0;">
      <button class="nav-tab-btn active" data-tab="dashboard">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
        <span>Home</span>
      </button>
      <button class="nav-tab-btn" data-tab="profiles">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
        <span>Modes</span>
      </button>
      <button class="nav-tab-btn" data-tab="features">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
        <span>Features</span>
      </button>
      <button class="nav-tab-btn" data-tab="vision">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.72 1.7-1.61 0-.43-.17-.83-.44-1.14-.27-.3-.42-.7-.42-1.12 0-.91.74-1.65 1.65-1.65H16c3.31 0 6-2.69 6-6 0-4.97-4.48-9-10-9z"/></svg>
        <span>Vision</span>
      </button>
      <button class="nav-tab-btn" data-tab="ai">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        <span>AI Assist</span>
      </button>
    </div>
  `;
  wrapper.appendChild(panel);

  // Floating Trigger Button
  var triggerBtn = document.createElement("button");
  triggerBtn.className = "trigger-btn";
  triggerBtn.setAttribute("aria-label", "Toggle Accessibility Suite");
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

  // Elements
  var panelBody = shadow.getElementById("2all-panel-body-content");
  var searchInput = shadow.getElementById("2all-search-field");
  var navBtns = shadow.querySelectorAll(".nav-tab-btn");
  var statementModal = shadow.getElementById("2all-statement-modal");

  function updateTriggerIcon() {
    if (state.open) {
      triggerBtn.innerHTML = `
        <svg viewBox="0 0 24 24" style="width:24px;height:24px;fill:none;stroke:white;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    } else {
      triggerBtn.innerHTML = `
        <svg viewBox="0 0 24 24" style="width:28px;height:28px;fill:none;stroke:white;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;">
          <circle cx="12" cy="4" r="2"/>
          <path d="M12 6v6"/>
          <path d="M6 9h12"/>
          <path d="M12 12l-3 9"/>
          <path d="M12 12l3 9"/>
        </svg>
      `;
    }
  }

  function resetScrollTop() {
    if (panelBody) {
      panelBody.scrollTop = 0;
      try {
        panelBody.scrollTo({ top: 0, left: 0, behavior: "instant" });
      } catch (e) {
        panelBody.scrollTop = 0;
      }
    }
  }

  // Open / Close Toggle
  triggerBtn.onclick = function () {
    state.open = !state.open;
    if (state.open) {
      panel.classList.add("open");
      state.searchQuery = "";
      if (searchInput) searchInput.value = "";
      switchTab("dashboard");
      resetScrollTop();
    } else {
      panel.classList.remove("open");
    }
    updateTriggerIcon();
  };

  function closePanel() {
    state.open = false;
    panel.classList.remove("open");
    updateTriggerIcon();
  }

  var btnCloseHdr = shadow.getElementById("2all-btn-close-header");
  if (btnCloseHdr) btnCloseHdr.onclick = closePanel;
  var btnHideHdr = shadow.getElementById("2all-hdr-hide");
  if (btnHideHdr) btnHideHdr.onclick = closePanel;
  var btnHideBtm = shadow.getElementById("2all-btn-hide-bottom");
  if (btnHideBtm) btnHideBtm.onclick = closePanel;

  var btnResetHdr = shadow.getElementById("2all-hdr-reset");
  if (btnResetHdr) btnResetHdr.onclick = function () { resetSettings(); };
  var btnResetBtm = shadow.getElementById("2all-btn-reset-bottom");
  if (btnResetBtm) btnResetBtm.onclick = function () { resetSettings(); };

  // Statement Modal Toggle
  var btnStmtHdr = shadow.getElementById("2all-hdr-statement");
  if (btnStmtHdr) {
    btnStmtHdr.onclick = function () {
      showStatementPopup();
    };
  }

  function showStatementPopup() {
    statementModal.style.display = "block";
    statementModal.innerHTML = `
      <div class="statement-modal-overlay">
        <div class="statement-modal-box">
          <button class="statement-close-btn" id="2all-close-stmt">&times;</button>
          <div class="statement-title">
            <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:none;stroke:${primaryColor};stroke-width:2.5;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            Accessibility Statement
          </div>
          <div class="statement-body-text">
            This website is committed to facilitating web accessibility for all individuals, including people with disabilities. We continuously audit and enhance user interfaces according to <strong>WCAG 2.1 Level AA</strong> & <strong>ADA Title III</strong> specifications.
          </div>
          <div class="statement-highlight-box">
            &#10003; Fully Compliant with WCAG 2.1 Level AA<br/>
            &#10003; ADA & Section 508 Remediated<br/>
            &#10003; Real-time Automated & AI Adjustments
          </div>
          <button class="statement-close-action" id="2all-btn-stmt-done">Close Statement</button>
        </div>
      </div>
    `;

    setTimeout(function () {
      var c1 = shadow.getElementById("2all-close-stmt");
      var c2 = shadow.getElementById("2all-btn-stmt-done");
      if (c1) c1.onclick = function () { statementModal.style.display = "none"; };
      if (c2) c2.onclick = function () { statementModal.style.display = "none"; };
    }, 50);
  }

  // Navigation Tabs Switching
  function switchTab(tabId) {
    navBtns.forEach(function (b) {
      var isTarget = b.getAttribute("data-tab") === tabId;
      if (isTarget) {
        b.classList.add("active");
        var svg = b.querySelector("svg");
        if (svg) svg.setAttribute("stroke-width", "2.5");
      } else {
        b.classList.remove("active");
        var svg = b.querySelector("svg");
        if (svg) svg.setAttribute("stroke-width", "1.8");
      }
    });
    state.activeTab = tabId;
    renderPanelBody();
    resetScrollTop();
  }

  navBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.searchQuery = "";
      if (searchInput) searchInput.value = "";
      switchTab(btn.getAttribute("data-tab"));
      resetScrollTop();
    });
  });

  // Search
  var tabKeywords = {
    profiles: ["dyslexia", "adhd", "low vision", "screen reader", "blind", "cognitive", "reading mode", "night mode", "seizure", "motor", "keyboard", "profile", "epilepsy"],
    features: [
      "font", "size", "letter spacing", "word spacing", "line height", "readable", 
      "alignment", "text", "speech", "read aloud", "tts", "voice", "magnifier", 
      "reading mask", "reading ruler", "highlight", "highlights", "outline", "outlines", 
      "link", "links", "heading", "headings", "button", "buttons", "focus", "hover", "border", "cursor"
    ],
    vision: ["contrast", "dark mode", "light mode", "color blind", "tritanopia", "protanopia", "deuteranopia", "monochrome", "saturation", "color", "background", "title", "text color"],
    ai: ["ai", "assistant", "chat", "help", "recommend", "ask", "alex"]
  };

  searchInput.addEventListener("input", function (e) {
    var q = e.target.value.toLowerCase().trim();
    state.searchQuery = q;
    if (q) {
      for (var tab in tabKeywords) {
        if (tabKeywords[tab].some(function (kw) { return kw.indexOf(q) !== -1 || q.indexOf(kw) !== -1; })) {
          switchTab(tab);
          resetScrollTop();
          return;
        }
      }
    }
    renderPanelBody();
    resetScrollTop();
  });

  function resetSettings() {
    state.activeProfile = "none";
    state.fontSize = 100;
    state.fontFamily = "default";
    state.readableFont = false;
    state.dyslexiaFont = false;
    state.letterSpacing = 0;
    state.lineHeight = 1.5;
    state.wordSpacing = 0;
    state.textAlignment = "default";
    state.textMagnifier = false;
    state.isHighContrast = false;
    state.isDarkMode = false;
    state.isLightMode = false;
    state.isSmartContrast = false;
    state.monochrome = false;
    state.colorBlindMode = "none";
    state.saturationMode = "normal";
    state.textColor = "default";
    state.titleColor = "default";
    state.bgColor = "default";
    state.readingMask = false;
    state.readingRuler = false;
    state.readMode = false;
    state.highlightLinks = false;
    state.highlightHeadings = false;
    state.highlightButtons = false;
    state.highlightFocus = false;
    state.highlightHover = false;
    state.reduceMotion = false;
    state.stopAnimations = false;
    state.hideImages = false;
    state.muteSounds = false;
    state.cursorSize = "normal";
    state.cursorColor = "default";
    state.textToSpeech = false;
    state.autoReadSelection = false;
    state.speechStatus = "stopped";
    state.highlightWord = false;
    state.highlightSentence = false;
    state.autoScroll = false;
    state.voiceNavigation = false;
    state.speed = 1.0;
    state.pitch = "normal";
    state.voice = "";
    state.volume = 100;
    state.isVoiceSettingsOpen = false;
    stopSpeech();
    saveState();
    applyEffects();
    renderPanelBody();
    resetScrollTop();
  }

  // Render Panel Body Content
  function renderPanelBody() {
    panelBody.innerHTML = "";

    // 1. HOME / DASHBOARD TAB (Exact 1:1 with React DashboardSection.tsx)
    if (state.activeTab === "dashboard" && !state.searchQuery) {
      // 1.1 AI Assistant Banner (Matching Screenshot 2)
      var aiBanner = document.createElement("div");
      aiBanner.className = "ai-assistant-banner";
      aiBanner.style.cssText = "background:linear-gradient(to right, #eff6ff, rgba(238, 242, 255, 0.8));border:1px solid rgba(191, 219, 254, 0.9);border-radius:16px;padding:12px;display:flex;align-items:center;justify-content:space-between;gap:12px;box-shadow:0 1px 2px rgba(0,0,0,0.04);margin-bottom:8px;";
      aiBanner.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:36px;height:36px;border-radius:12px;background:${primaryColor};color:#ffffff;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 1px 3px ${hexToRgba(primaryColor, 0.3)};">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          </div>
          <div>
            <div style="font-size:12px;font-weight:700;color:#172554;">AI Assistant</div>
            <div style="font-size:11px;color:#475569;font-weight:500;margin-top:1px;">Your personal accessibility assistant</div>
          </div>
        </div>
        <button id="2all-btn-start-chat" style="font-size:12px;font-weight:800;color:${primaryColor};background:#ffffff;padding:4px 10px;border-radius:8px;border:1px solid #bfdbfe;cursor:pointer;white-space:nowrap;box-shadow:0 1px 2px rgba(0,0,0,0.04);transition:all 0.15s;">Start chat &gt;</button>
      `;
      panelBody.appendChild(aiBanner);

      setTimeout(function () {
        var chatBtn = shadow.getElementById("2all-btn-start-chat");
        if (chatBtn) {
          chatBtn.onclick = function () { switchTab("ai"); };
        }
      }, 50);

      // 1.2 AI Suggestion Box (with ✨ sparkle watermark matching Screenshot 2)
      var aiSug = document.createElement("div");
      aiSug.className = "ai-suggestion-box";
      aiSug.style.cssText = "background:#eff6ff;border:1px solid #dbeafe;border-radius:16px;padding:16px;position:relative;overflow:hidden;display:flex;gap:12px;margin-bottom:12px;";
      aiSug.innerHTML = `
        <svg style="position:absolute;top:0;right:0;padding:8px;opacity:0.1;pointer-events:none;" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
        <div style="width:32px;height:32px;border-radius:50%;background:${primaryColor};color:#ffffff;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 2px 4px ${hexToRgba(primaryColor, 0.25)};">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        </div>
        <div style="position:relative;z-index:1;flex:1;">
          <div style="font-size:14px;font-weight:700;color:#0a1e3f;display:flex;align-items:center;gap:6px;">
            <span>AI Suggestion</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
          <div style="font-size:12px;color:#475569;margin:4px 0 12px 0;line-height:1.45;">
            Based on your activity, we recommend enabling the "Dyslexia Profile" for a smoother reading experience.
          </div>
          <button id="2all-btn-apply-profile" style="font-size:10px;font-weight:700;letter-spacing:0.8px;background:#ffffff;border:1px solid #bfdbfe;color:${primaryColor};padding:6px 12px;border-radius:8px;cursor:pointer;box-shadow:0 1px 2px rgba(0,0,0,0.04);transition:all 0.15s;">Apply Profile</button>
        </div>
      `;
      panelBody.appendChild(aiSug);

      setTimeout(function () {
        var applyBtn = shadow.getElementById("2all-btn-apply-profile");
        if (applyBtn) {
          applyBtn.onclick = function () {
            state.activeProfile = "dyslexia";
            state.dyslexiaFont = true;
            state.fontFamily = "dyslexic";
            state.fontSize = 108;
            state.letterSpacing = 1.0;
            state.wordSpacing = 0.1;
            state.lineHeight = 1.8;
            saveState();
            applyEffects();
            renderPanelBody();
          };
        }
      }, 50);

      // 1.4 Dedicated Menus Navigation Cards (Zero Duplicate Tools)
      var menuLabel = document.createElement("div");
      menuLabel.style.cssText = "font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;margin-top:4px;padding:0 2px;";
      menuLabel.innerText = "Dedicated Menus";
      panelBody.appendChild(menuLabel);

      var navList = document.createElement("div");
      navList.style.cssText = "display:flex;flex-direction:column;gap:8px;";

      // 1. Smart Profiles (Modes)
      var nav1 = document.createElement("button");
      nav1.style.cssText = "width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:all 0.15s;text-align:left;";
      nav1.innerHTML = `
        <div>
          <div style="font-size:13px;font-weight:700;color:#0f172a;">Smart Profiles (Modes)</div>
          <div style="font-size:11px;color:#64748b;margin-top:2px;">1-click configurations (Epilepsy, ADHD, Blindness, etc.)</div>
        </div>
        <div style="width:28px;height:28px;border-radius:50%;background:${hexToRgba(primaryColor, 0.12)};color:${primaryColor};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:8px;">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      `;
      nav1.onclick = function () { switchTab("profiles"); };
      navList.appendChild(nav1);

      // 2. Features (Typography & Reading)
      var nav2 = document.createElement("button");
      nav2.style.cssText = "width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:all 0.15s;text-align:left;";
      nav2.innerHTML = `
        <div>
          <div style="font-size:13px;font-weight:700;color:#0f172a;">Features (Typography & Reading)</div>
          <div style="font-size:11px;color:#64748b;margin-top:2px;">Font scaling, read aloud, reading mask, focus tools</div>
        </div>
        <div style="width:28px;height:28px;border-radius:50%;background:${hexToRgba(primaryColor, 0.12)};color:${primaryColor};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:8px;">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      `;
      nav2.onclick = function () { switchTab("features"); };
      navList.appendChild(nav2);

      // 3. Vision (Color & Contrast)
      var nav3 = document.createElement("button");
      nav3.style.cssText = "width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:all 0.15s;text-align:left;";
      nav3.innerHTML = `
        <div>
          <div style="font-size:13px;font-weight:700;color:#0f172a;">Vision (Color & Contrast)</div>
          <div style="font-size:11px;color:#64748b;margin-top:2px;">Dark contrast, monochrome, saturation, color blindness</div>
        </div>
        <div style="width:28px;height:28px;border-radius:50%;background:${hexToRgba(primaryColor, 0.12)};color:${primaryColor};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:8px;">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      `;
      nav3.onclick = function () { switchTab("vision"); };
      navList.appendChild(nav3);

      panelBody.appendChild(navList);
    }

    // 2. MODES / PROFILES TAB (9 distinct profiles matching reference)
    else if (state.activeTab === "profiles" || (state.searchQuery && tabKeywords.profiles.some(function(k){return k.indexOf(state.searchQuery)!==-1;}))) {
      var profiles = [
        { 
          id: "seizure", 
          label: "Epilepsy Safe Mode", 
          desc: "Dampens color and removes blinks", 
          detail: "Enables users with epilepsy to browse safely by eliminating flashing or blinking animations and risky color combinations.",
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.585 10.587 2.76 13.23a.5.5 0 0 0 .14.93L10 16l-1 6 7.5-8.25"/><path d="M15.6 10.7 18 3h-6.25l-1.3 2.7"/><line x1="2" y1="2" x2="22" y2="22"/></svg>'
        },
        { 
          id: "low-vision", 
          label: "Visually Impaired Mode", 
          desc: "Improves website's visuals", 
          detail: "Adjusts the website for users with visual impairments such as Degrading Eyesight, Tunnel Vision, Cataract, Glaucoma, and others.",
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"/><path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2"/></svg>'
        },
        { 
          id: "cognitive", 
          label: "Cognitive Disability Mode", 
          desc: "Helps to focus on specific content", 
          detail: "Assists users with cognitive disabilities such as Autism, Dyslexia, CVA, and others to focus on essential website elements.",
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="9" cy="9" r="1.5" fill="currentColor"/><circle cx="15" cy="9" r="1.5" fill="currentColor"/><path d="M8 15a4 4 0 0 0 8 0"/></svg>'
        },
        { 
          id: "adhd", 
          label: "ADHD Friendly Mode", 
          desc: "Reduces distractions and improve focus", 
          detail: "Significantly reduces distractions and noise, helping people with ADHD and Neurodevelopmental disorders to browse and focus.",
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M16 8V5a2 2 0 0 1 2-2"/></svg>'
        },
        { 
          id: "blind", 
          label: "Blindness / Screen Reader", 
          desc: "Allows to use the site with screen reader", 
          detail: "Optimizes the site for compatibility with screen-readers such as JAWS, NVDA, VoiceOver, and TalkBack.",
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/><circle cx="12" cy="10" r="3"/></svg>'
        },
        { 
          id: "dyslexia", 
          label: "Dyslexia Friendly", 
          desc: "Enhances readability for dyslexia", 
          detail: "Applies specialized typography and letter/word spacing to increase reading speed and reduce reading errors for users with dyslexia.",
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
        },
        { 
          id: "reading", 
          label: "Reading Mode", 
          desc: "Improves reading comprehension", 
          detail: "Highlights paragraph structure and simplifies reading alignment for clearer text focus.",
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>'
        },
        { 
          id: "night", 
          label: "Night Mode", 
          desc: "Reduces eye strain in low light", 
          detail: "Switches interface to dark themes to reduce blue light exposure and prevent eye fatigue.",
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
        },
        { 
          id: "motor-impaired", 
          label: "Keyboard Nav / Motor Impaired", 
          desc: "Optimizes focus & keyboard controls", 
          detail: "Enlarges interactive target areas and boosts keyboard focus indicators for easier navigation.",
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="4" r="2"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/></svg>'
        }
      ];

      profiles.forEach(function (p) {
        var isActive = state.activeProfile === p.id;
        var item = document.createElement("div");
        item.className = "profile-card-item " + (isActive ? "active" : "");
        item.innerHTML = `
          <div class="profile-card-header">
            <div class="profile-card-left">
              <div class="profile-icon-box ${isActive ? 'active' : ''}">
                ${p.svg}
              </div>
              <div class="profile-card-text">
                <div class="profile-title">${p.label}</div>
                <div class="profile-desc">${p.desc}</div>
              </div>
            </div>
            <div class="toggle-switch-ui ${isActive ? 'active' : ''}">
              <div class="toggle-knob-ui"></div>
            </div>
          </div>
          ${isActive ? `<div class="profile-details-exp">${p.detail}</div>` : ""}
        `;
        item.onclick = function () {
          if (state.activeProfile === p.id) {
            state.activeProfile = "none";
            state.fontFamily = "default";
            state.readableFont = false;
            state.dyslexiaFont = false;
            state.letterSpacing = 0;
            state.wordSpacing = 0;
            state.lineHeight = 1.5;
            state.fontSize = 100;
            state.isHighContrast = false;
            state.isDarkMode = false;
            state.isLightMode = false;
            state.readingMask = false;
            state.readingRuler = false;
            state.reduceMotion = false;
            state.stopAnimations = false;
            state.highlightLinks = false;
            state.highlightHeadings = false;
            state.highlightButtons = false;
            state.highlightFocus = false;
            state.textToSpeech = false;
            state.cursorSize = "normal";
            state.saturationMode = "normal";
            saveState();
            applyEffects();
            renderPanelBody();
          } else {
            // Reset all profile-specific settings first
            state.activeProfile = p.id;
            state.fontFamily = "default";
            state.readableFont = false;
            state.dyslexiaFont = false;
            state.letterSpacing = 0;
            state.wordSpacing = 0;
            state.lineHeight = 1.5;
            state.fontSize = 100;
            state.isHighContrast = false;
            state.isDarkMode = false;
            state.isLightMode = false;
            state.readingMask = false;
            state.readingRuler = false;
            state.reduceMotion = false;
            state.stopAnimations = false;
            state.highlightLinks = false;
            state.highlightHeadings = false;
            state.highlightButtons = false;
            state.highlightFocus = false;
            state.textToSpeech = false;
            state.cursorSize = "normal";
            state.saturationMode = "normal";

            // Apply selected profile settings (exact 1:1 match with AccessibilityContext.tsx)
            if (p.id === "dyslexia") {
              state.dyslexiaFont = true;
              state.fontFamily = "dyslexic";
              state.fontSize = 108;
              state.letterSpacing = 1.0;
              state.wordSpacing = 0.1;
              state.lineHeight = 1.8;
            } else if (p.id === "adhd") {
              state.readingMask = true;
              state.reduceMotion = true;
              state.stopAnimations = true;
              state.highlightLinks = true;
              state.lineHeight = 1.8;
            } else if (p.id === "low-vision") {
              state.fontSize = 120;
              state.isHighContrast = true;
              state.highlightLinks = true;
              state.highlightHeadings = true;
              state.cursorSize = "large";
              state.textMagnifier = true;
            } else if (p.id === "seizure") {
              state.reduceMotion = true;
              state.stopAnimations = true;
              state.saturationMode = "low";
            } else if (p.id === "motor-impaired") {
              state.cursorSize = "large";
              state.highlightFocus = true;
              state.highlightButtons = true;
              state.highlightLinks = true;
            } else if (p.id === "blind") {
              state.highlightLinks = true;
              state.highlightHeadings = true;
              state.highlightButtons = true;
              state.highlightFocus = true;
              state.textToSpeech = true;
              state.fontFamily = "readable";
              state.readableFont = true;
              state.fontSize = 110;
              state.lineHeight = 1.8;
              state.letterSpacing = 0.5;
            } else if (p.id === "cognitive") {
              state.fontFamily = "lexend";
              state.readableFont = true;
              state.fontSize = 115;
              state.lineHeight = 1.9;
              state.letterSpacing = 0.8;
              state.wordSpacing = 0.15;
              state.reduceMotion = true;
              state.stopAnimations = true;
              state.highlightLinks = true;
              state.highlightButtons = true;
              state.readingRuler = true;
            } else if (p.id === "reading") {
              state.readingRuler = true;
              state.fontFamily = "lexend";
              state.readableFont = true;
              state.letterSpacing = 0.8;
              state.wordSpacing = 0.15;
              state.lineHeight = 1.9;
              state.fontSize = 110;
              state.highlightHeadings = true;
            } else if (p.id === "night") {
              state.isDarkMode = true;
              state.reduceMotion = true;
            }
          }
          saveState();
          applyEffects();
          renderPanelBody();
        };
        panelBody.appendChild(item);
      });
    }

    // 3. FEATURES TAB (Complete 1:1 Parity with CoreFeaturesSection.tsx - 7 Groups & 27 Tools)
    else if (state.activeTab === "features" || (state.searchQuery && tabKeywords.features.some(function(k){return k.indexOf(state.searchQuery)!==-1;}))) {
      var query = (state.searchQuery || "").toLowerCase();
      var hasAnyRendered = false;

      function matchesQuery(label, extraWords, groupTitle) {
        if (!query) return true;
        var q = query.trim().toLowerCase();
        if (label && label.toLowerCase().indexOf(q) !== -1) return true;
        if (extraWords && extraWords.toLowerCase().indexOf(q) !== -1) return true;
        if (groupTitle && groupTitle.toLowerCase().indexOf(q) !== -1) return true;
        var qBase = q.replace(/s$/, "");
        if (qBase.length >= 3) {
          if (label && label.toLowerCase().indexOf(qBase) !== -1) return true;
          if (extraWords && extraWords.toLowerCase().indexOf(qBase) !== -1) return true;
          if (groupTitle && groupTitle.toLowerCase().indexOf(qBase) !== -1) return true;
        }
        return false;
      }

      // Group 1: Readable Experience (Top Spotlight)
      var showScaling = matchesQuery("Content Scaling", "font size zoom scale");
      var showMagnifier = matchesQuery("Text Magnifier", "enlarge hover zoom");
      var showAaFont = matchesQuery("Readable Font", "aa typography legible");
      var showCenter = matchesQuery("Center Aligned", "alignment center text");
      var showGroup1 = showScaling || showMagnifier || showAaFont || showCenter;

      if (showGroup1) {
        hasAnyRendered = true;
        var secHeading1 = document.createElement("div");
        secHeading1.className = "feat-group-title";
        secHeading1.style.marginTop = "0px";
        secHeading1.style.paddingTop = "2px";
        secHeading1.innerText = "Readable Experience";
        panelBody.appendChild(secHeading1);

        // Card 1: Content Scaling
        if (showScaling) {
          var scaleCard = document.createElement("div");
          scaleCard.className = "scale-bar-box";
          scaleCard.innerHTML = `
            <div class="scale-bar-title">Content Scaling</div>
            <div class="scale-controls-row">
              <button class="scale-step-btn scale-btn-down" aria-label="Decrease content scaling">-</button>
              <div class="scale-display-val">${state.fontSize === 100 ? "Default" : state.fontSize + "%"}</div>
              <button class="scale-step-btn scale-btn-up" aria-label="Increase content scaling">+</button>
            </div>
          `;
          var sDown = scaleCard.querySelector(".scale-btn-down");
          var sUp = scaleCard.querySelector(".scale-btn-up");
          if (sDown) {
            sDown.onclick = function () {
              state.fontSize = Math.max(90, state.fontSize - 10);
              saveState(); applyEffects(); renderPanelBody();
            };
          }
          if (sUp) {
            sUp.onclick = function () {
              state.fontSize = Math.min(200, state.fontSize + 10);
              saveState(); applyEffects(); renderPanelBody();
            };
          }
          panelBody.appendChild(scaleCard);
        }

        // Card 2: Text Magnifier (Full-width button)
        if (showMagnifier) {
          var magCard = document.createElement("button");
          var isMagActive = !!state.textMagnifier;
          magCard.className = "feat-tool-card " + (isMagActive ? "active" : "");
          magCard.style.cssText = "width:100%;flex-direction:row;justify-content:center;gap:12px;padding:12px 16px;min-height:auto;border-radius:16px;";
          magCard.innerHTML = `
            <div class="feat-tool-icon-wrap" style="width:32px;height:32px;border-radius:10px;background:${isMagActive ? primaryColorDark : hexToRgba(primaryColor, 0.12)};color:${isMagActive ? '#ffffff' : primaryColor};">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <line x1="9" y1="10" x2="15" y2="10"/>
                <line x1="12" y1="7" x2="12" y2="13"/>
              </svg>
            </div>
            <span class="feat-tool-label" style="font-size:12px;">Text Magnifier</span>
          `;
          magCard.onclick = function () {
            state.textMagnifier = !state.textMagnifier;
            saveState(); applyEffects(); renderPanelBody();
          };
          panelBody.appendChild(magCard);
        }

        // Card 3 & 4: 2-Column Grid: Readable Font (Aa) & Center Aligned
        if (showAaFont || showCenter) {
          var quickGrid = document.createElement("div");
          quickGrid.className = "feat-grid-2col";
          quickGrid.style.marginBottom = "14px";

          if (showAaFont) {
            var isReadable = state.fontFamily === "readable" || state.readableFont;
            var aaBtn = document.createElement("button");
            aaBtn.className = "feat-tool-card " + (isReadable ? "active" : "");
            aaBtn.innerHTML = `
              <span style="font-size:24px;font-weight:900;color:${isReadable ? '#ffffff' : primaryColor};line-height:1;">Aa</span>
              <span class="feat-tool-label">Readable Font</span>
            `;
            aaBtn.onclick = function () {
              state.readableFont = !state.readableFont;
              state.fontFamily = state.readableFont ? "readable" : "default";
              saveState(); applyEffects(); renderPanelBody();
            };
            quickGrid.appendChild(aaBtn);
          }

          if (showCenter) {
            var isCenter = state.textAlignment === "center";
            var centerBtn = document.createElement("button");
            centerBtn.className = "feat-tool-card " + (isCenter ? "active" : "");
            centerBtn.innerHTML = `
              <div class="feat-tool-icon-wrap">
                <svg width="26" height="21" viewBox="0 0 34 28" fill="none">
                  <rect x="10" y="1" width="14" height="4.5" rx="2.25" fill="${isCenter ? '#ffffff' : primaryColor}" />
                  <rect x="3" y="8.5" width="28" height="4.5" rx="2.25" fill="${isCenter ? '#ffffff' : primaryColor}" />
                  <rect x="7" y="16" width="20" height="4.5" rx="2.25" fill="${isCenter ? '#ffffff' : primaryColor}" />
                  <rect x="3" y="23.5" width="28" height="4.5" rx="2.25" fill="${isCenter ? '#ffffff' : primaryColor}" />
                </svg>
              </div>
              <span class="feat-tool-label">Center Aligned</span>
            `;
            centerBtn.onclick = function () {
              state.textAlignment = isCenter ? "default" : "center";
              saveState(); applyEffects(); renderPanelBody();
            };
            quickGrid.appendChild(centerBtn);
          }

          panelBody.appendChild(quickGrid);
        }
      }

      // Group 2: Typography & Alignment
      var showLetter = matchesQuery("Letter Spacing", "spacing tracking");
      var showWord = matchesQuery("Word Spacing", "spacing kerning");
      var showLine = matchesQuery("Line Height", "leading spacing height");
      var showFonts = matchesQuery("Readable Fonts", "font family dyslexic lexend");
      var showAlign = matchesQuery("Text Alignment", "align left center justify");
      var showGroup2 = showLetter || showWord || showLine || showFonts || showAlign;

      if (showGroup2) {
        hasAnyRendered = true;
        var secHeading2 = document.createElement("div");
        secHeading2.className = "feat-group-title";
        secHeading2.innerText = "Typography & Alignment";
        panelBody.appendChild(secHeading2);

        // Letter Spacing
        if (showLetter) {
          var letterBox = document.createElement("div");
          letterBox.className = "segmented-box";
          letterBox.innerHTML = `
            <div class="segmented-header">
              <span>Letter Spacing</span>
              <span style="font-size:11px;color:${primaryColor};font-weight:700;">${state.letterSpacing}px</span>
            </div>
            <div class="segmented-buttons-row">
              ${[0, 1, 2, 3, 4, 5].map(function(v){
                return `<button class="segmented-pill-btn ${state.letterSpacing===v?'active':''}" data-ls="${v}">${v}px</button>`;
              }).join("")}
            </div>
          `;
          letterBox.querySelectorAll(".segmented-pill-btn").forEach(function(b){
            b.onclick = function(){
              state.letterSpacing = parseFloat(b.getAttribute("data-ls"));
              saveState(); applyEffects(); renderPanelBody();
            };
          });
          panelBody.appendChild(letterBox);
        }

        // Word Spacing
        if (showWord) {
          var wordBox = document.createElement("div");
          wordBox.className = "segmented-box";
          wordBox.innerHTML = `
            <div class="segmented-header">
              <span>Word Spacing</span>
              <span style="font-size:11px;color:${primaryColor};font-weight:700;">${state.wordSpacing}em</span>
            </div>
            <div class="segmented-buttons-row">
              ${[0, 0.1, 0.25, 0.5, 1].map(function(v){
                return `<button class="segmented-pill-btn ${state.wordSpacing===v?'active':''}" data-ws="${v}">${v}em</button>`;
              }).join("")}
            </div>
          `;
          wordBox.querySelectorAll(".segmented-pill-btn").forEach(function(b){
            b.onclick = function(){
              state.wordSpacing = parseFloat(b.getAttribute("data-ws"));
              saveState(); applyEffects(); renderPanelBody();
            };
          });
          panelBody.appendChild(wordBox);
        }

        // Line Height
        if (showLine) {
          var lineBox = document.createElement("div");
          lineBox.className = "segmented-box";
          lineBox.innerHTML = `
            <div class="segmented-header">
              <span>Line Height</span>
              <span style="font-size:11px;color:${primaryColor};font-weight:700;">${state.lineHeight}x</span>
            </div>
            <div class="segmented-buttons-row">
              ${[1.5, 1.8, 2.0, 2.5].map(function(v){
                return `<button class="segmented-pill-btn ${state.lineHeight===v?'active':''}" data-lh="${v}">${v}x</button>`;
              }).join("")}
            </div>
          `;
          lineBox.querySelectorAll(".segmented-pill-btn").forEach(function(b){
            b.onclick = function(){
              state.lineHeight = parseFloat(b.getAttribute("data-lh"));
              saveState(); applyEffects(); renderPanelBody();
            };
          });
          panelBody.appendChild(lineBox);
        }

        // Readable Fonts
        if (showFonts) {
          var fontBox = document.createElement("div");
          fontBox.className = "segmented-box";
          fontBox.innerHTML = `
            <div class="segmented-header">Readable Fonts</div>
            <div class="segmented-buttons-row">
              <button class="segmented-pill-btn ${state.fontFamily==='default'?'active':''}" data-font="default">Default</button>
              <button class="segmented-pill-btn ${state.fontFamily==='dyslexic'?'active':''}" data-font="dyslexic">OpenDyslexic</button>
              <button class="segmented-pill-btn ${state.fontFamily==='lexend'?'active':''}" data-font="lexend">Lexend</button>
              <button class="segmented-pill-btn ${state.fontFamily==='readable'?'active':''}" data-font="readable">Readable</button>
            </div>
          `;
          fontBox.querySelectorAll(".segmented-pill-btn").forEach(function(b){
            b.onclick = function(){
              state.fontFamily = b.getAttribute("data-font");
              state.dyslexiaFont = (state.fontFamily === "dyslexic");
              state.readableFont = (state.fontFamily === "readable");
              saveState(); applyEffects(); renderPanelBody();
            };
          });
          panelBody.appendChild(fontBox);
        }

        // Text Alignment
        if (showAlign) {
          var alignBox = document.createElement("div");
          alignBox.className = "segmented-box";
          alignBox.innerHTML = `
            <div class="segmented-header">Text Alignment</div>
            <div class="segmented-buttons-row">
              <button class="segmented-pill-btn ${state.textAlignment==='default'?'active':''}" data-align="default">Default</button>
              <button class="segmented-pill-btn ${state.textAlignment==='left'?'active':''}" data-align="left">Left</button>
              <button class="segmented-pill-btn ${state.textAlignment==='center'?'active':''}" data-align="center">Center</button>
              <button class="segmented-pill-btn ${state.textAlignment==='justify'?'active':''}" data-align="justify">Justify</button>
            </div>
          `;
          alignBox.querySelectorAll(".segmented-pill-btn").forEach(function(b){
            b.onclick = function(){
              state.textAlignment = b.getAttribute("data-align");
              saveState(); applyEffects(); renderPanelBody();
            };
          });
          panelBody.appendChild(alignBox);
        }
      }



      // Group 4: 🔊 Speech & Reading
      var speechItems = [
        {
          id: "readSelectedText",
          label: "Read Selected Text",
          type: "action",
          icon: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
          iconColor: primaryColor,
          onClick: function () { readSelectedText(); }
        },
        {
          id: "readEntirePage",
          label: state.speechStatus === "playing" ? "Reading Page..." : (state.speechStatus === "paused" ? "Reading Paused" : "Read Entire Page"),
          type: "action",
          icon: state.speechStatus === "playing" ?
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>` :
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
          iconColor: state.speechStatus === "playing" ? "#ffffff" : primaryColor,
          onClick: function () { readEntirePage(); }
        },
        {
          id: "pauseReading",
          label: "Pause Reading",
          type: "action",
          disabled: state.speechStatus !== "playing",
          icon: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
          iconColor: "#d97706",
          onClick: function () { pauseSpeech(); }
        },
        {
          id: "resumeReading",
          label: "Resume Reading",
          type: "action",
          disabled: state.speechStatus !== "paused",
          icon: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
          iconColor: "#059669",
          onClick: function () { resumeSpeech(); }
        },
        {
          id: "stopReading",
          label: "Stop Reading",
          type: "action",
          disabled: state.speechStatus === "stopped",
          icon: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>`,
          iconColor: "#e11d48",
          onClick: function () { stopSpeech(); }
        },
        {
          id: "highlightWord",
          label: "Highlight Word",
          type: "toggle",
          value: state.highlightWord,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
          onClick: function () {
            state.highlightWord = !state.highlightWord;
            saveState(); renderPanelBody();
          }
        },
        {
          id: "highlightSentence",
          label: "Highlight Sentence",
          type: "toggle",
          value: state.highlightSentence,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
          onClick: function () {
            state.highlightSentence = !state.highlightSentence;
            saveState(); renderPanelBody();
          }
        },
        {
          id: "autoScroll",
          label: "Auto Scroll",
          type: "toggle",
          value: state.autoScroll,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
          onClick: function () {
            state.autoScroll = !state.autoScroll;
            saveState(); renderPanelBody();
          }
        },
        {
          id: "voiceSettings",
          label: "Voice Settings",
          type: "toggle",
          value: state.isVoiceSettingsOpen,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
          iconColor: state.isVoiceSettingsOpen ? "#ffffff" : "#475569",
          onClick: function () {
            state.isVoiceSettingsOpen = !state.isVoiceSettingsOpen;
            renderPanelBody();
          }
        },
        {
          id: "voiceNavigation",
          label: "Voice Navigation",
          type: "toggle",
          value: state.voiceNavigation,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
          iconColor: state.voiceNavigation ? "#ffffff" : primaryColor,
          onClick: function () {
            state.voiceNavigation = !state.voiceNavigation;
            saveState();
            renderPanelBody();
            applyEffects();
          }
        }
      ];

      var filteredSpeech = speechItems.filter(function(item){ return matchesQuery(item.label, "speech voice reading"); });
      if (filteredSpeech.length > 0) {
        hasAnyRendered = true;
        var secHeading4 = document.createElement("div");
        secHeading4.className = "feat-group-title";
        secHeading4.innerText = "🔊 Speech & Reading";
        panelBody.appendChild(secHeading4);

        var grid4 = document.createElement("div");
        grid4.className = "feat-grid-2col";

        filteredSpeech.forEach(function (item) {
          var btn = document.createElement("button");
          var isPlayingThis = (item.id === "readEntirePage" && state.speechStatus === "playing");
          var isActive = (item.type === "toggle" && item.value) || isPlayingThis;
          var isDisabled = !!item.disabled;
          btn.className = "feat-tool-card " + (isActive ? "active " : "") + (isDisabled ? "disabled " : "");

          var iconColor = isActive ? "#ffffff" : (item.iconColor || "#334155");
          btn.innerHTML = `
            <div class="feat-tool-icon-wrap" style="color:${iconColor};">
              ${item.icon}
            </div>
            <span class="feat-tool-label">${item.label}</span>
          `;
          btn.onclick = function () {
            if (!isDisabled && item.onClick) item.onClick();
          };
          grid4.appendChild(btn);

          // Expanded Voice Settings Configuration Box placed DIRECTLY below Voice Settings setting inside the tool
          if (item.id === "voiceSettings" && state.isVoiceSettingsOpen) {
            var voicePanel = document.createElement("div");
            voicePanel.className = "feat-voice-panel";
            voicePanel.innerHTML = `
              <div style="font-size:12.5px;font-weight:800;color:#0f172a;display:flex;justify-content:space-between;align-items:center;">
                <span style="display:flex;align-items:center;gap:6px;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${primaryColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  Voice Settings Parameters
                </span>
                <button class="voice-panel-close" style="background:none;border:none;color:#94a3b8;font-size:18px;cursor:pointer;padding:0 4px;line-height:1;">&times;</button>
              </div>
              <!-- Speed -->
              <div class="segmented-box" style="margin:0;padding:10px;">
                <div class="segmented-header">
                  <span>Reading Speed</span>
                  <span style="font-size:11px;color:${primaryColor};font-weight:700;">${state.speed || 1.0}x</span>
                </div>
                <div class="segmented-buttons-row">
                  ${[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map(function(v){
                    return `<button class="segmented-pill-btn ${(state.speed || 1.0)===v?'active':''}" data-sp="${v}">${v}x</button>`;
                  }).join("")}
                </div>
              </div>
              <!-- Pitch -->
              <div class="segmented-box" style="margin:0;padding:10px;">
                <div class="segmented-header">
                  <span>Pitch</span>
                  <span style="font-size:11px;color:${primaryColor};font-weight:700;text-transform:uppercase;">${state.pitch || 'normal'}</span>
                </div>
                <div class="segmented-buttons-row">
                  ${["low", "normal", "high"].map(function(pVal){
                    return `<button class="segmented-pill-btn ${(state.pitch || 'normal')===pVal?'active':''}" data-pch="${pVal}">${pVal.toUpperCase()}</button>`;
                  }).join("")}
                </div>
              </div>
              <!-- Voice Dropdown -->
              <div class="segmented-box" style="margin:0;padding:10px;">
                <div class="segmented-header">
                  <span>Voice Selection</span>
                </div>
                <div style="padding-top:4px;">
                  <select id="2all-voice-select-dropdown" style="width:100%;padding:8px 10px;border-radius:10px;border:1px solid #cbd5e1;background:#ffffff;font-size:11.5px;font-weight:600;color:#0f172a;outline:none;cursor:pointer;">
                    <option value="">Default System Voice</option>
                  </select>
                </div>
              </div>
              <!-- Volume Slider -->
              <div class="segmented-box" style="margin:0;padding:10px;">
                <div class="segmented-header">
                  <span>Volume</span>
                  <span id="2all-voice-volume-val" style="font-size:11px;color:${primaryColor};font-weight:700;">${state.volume !== undefined ? state.volume : 100}%</span>
                </div>
                <div style="padding-top:4px;">
                  <input id="2all-voice-volume-slider" type="range" min="0" max="100" value="${state.volume !== undefined ? state.volume : 100}" style="width:100%;accent-color:${primaryColor};cursor:pointer;">
                </div>
              </div>
              <!-- Done Button -->
              <button class="voice-panel-done-btn" style="width:100%;padding:9px;background:${primaryColor};color:#ffffff;border:none;border-radius:10px;font-size:11.5px;font-weight:800;cursor:pointer;text-transform:uppercase;letter-spacing:0.5px;box-shadow:0 2px 6px ${hexToRgba(primaryColor, 0.25)};transition:background 0.15s;">Done</button>
            `;
            voicePanel.querySelector(".voice-panel-close").onclick = function () {
              state.isVoiceSettingsOpen = false;
              renderPanelBody();
            };
            var doneBtn = voicePanel.querySelector(".voice-panel-done-btn");
            if (doneBtn) {
              doneBtn.onclick = function () {
                state.isVoiceSettingsOpen = false;
                renderPanelBody();
              };
            }
            var volSlider = voicePanel.querySelector('[id="2all-voice-volume-slider"]');
            var volVal = voicePanel.querySelector('[id="2all-voice-volume-val"]');
            var volLiveTimer = null;
            if (volSlider) {
              volSlider.oninput = function () {
                var val = parseInt(volSlider.value);
                state.volume = val;
                if (volVal) volVal.innerText = val + "%";
                saveState();
                if (volLiveTimer) clearTimeout(volLiveTimer);
                volLiveTimer = setTimeout(function () {
                  applyLiveVoiceSettings();
                }, 200);
              };
              volSlider.onchange = function () {
                if (volLiveTimer) clearTimeout(volLiveTimer);
                applyLiveVoiceSettings();
              };
            }
            voicePanel.querySelectorAll("[data-sp]").forEach(function(b){
              b.onclick = function(){
                state.speed = parseFloat(b.getAttribute("data-sp"));
                saveState();
                renderPanelBody();
                applyLiveVoiceSettings();
              };
            });
            voicePanel.querySelectorAll("[data-pch]").forEach(function(b){
              b.onclick = function(){
                state.pitch = b.getAttribute("data-pch");
                saveState();
                renderPanelBody();
                applyLiveVoiceSettings();
              };
            });
            function populateVoiceDropdown() {
              var vSelect = shadow.getElementById("2all-voice-select-dropdown");
              if (!vSelect || !("speechSynthesis" in window)) return;
              var voices = window.speechSynthesis.getVoices() || [];
              if (voices.length === 0) return;
              vSelect.innerHTML = '<option value="">Default System Voice</option>';
              voices.forEach(function (v) {
                var opt = document.createElement("option");
                opt.value = v.name;
                opt.innerText = v.name + (v.lang ? " (" + v.lang + ")" : "");
                if (state.voice === v.name) opt.selected = true;
                vSelect.appendChild(opt);
              });
              vSelect.onchange = function () {
                state.voice = vSelect.value;
                saveState();
                applyLiveVoiceSettings();
              };
            }
            setTimeout(populateVoiceDropdown, 30);
            if ("speechSynthesis" in window) {
              window.speechSynthesis.onvoiceschanged = populateVoiceDropdown;
            }
            grid4.appendChild(voicePanel);
          }
        });
        panelBody.appendChild(grid4);
      }

      // Group 5: Reading, Focus & Assistive Reading
      var readingAssistItems = [
        {
          id: "readingMask",
          label: "Reading Mask",
          value: state.readingMask,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`,
          onClick: function () {
            state.readingMask = !state.readingMask;
            saveState(); applyEffects(); renderPanelBody();
          }
        },
        {
          id: "readingRuler",
          label: "Reading Ruler",
          value: state.readingRuler,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0l12.6 12.6z"/><line x1="14.5" y1="5.5" x2="17" y2="8"/><line x1="11.5" y1="8.5" x2="13" y2="10"/><line x1="8.5" y1="11.5" x2="11" y2="14"/><line x1="5.5" y1="14.5" x2="7" y2="16"/></svg>`,
          onClick: function () {
            state.readingRuler = !state.readingRuler;
            saveState(); applyEffects(); renderPanelBody();
          }
        }
      ];

      var filteredAssist = readingAssistItems.filter(function(item){ return matchesQuery(item.label, "focus reading assist mask ruler tts"); });
      if (filteredAssist.length > 0) {
        hasAnyRendered = true;
        var secHeading5 = document.createElement("div");
        secHeading5.className = "feat-group-title";
        secHeading5.innerText = "Reading, Focus & Assistive Reading";
        panelBody.appendChild(secHeading5);

        var grid5 = document.createElement("div");
        grid5.className = "feat-grid-2col";
        filteredAssist.forEach(function (item) {
          var btn = document.createElement("button");
          var isActive = !!item.value;
          btn.className = "feat-tool-card " + (isActive ? "active" : "");
          btn.innerHTML = `
            <div class="feat-tool-icon-wrap">
              ${item.icon}
            </div>
            <span class="feat-tool-label">${item.label}</span>
          `;
          btn.onclick = item.onClick;
          grid5.appendChild(btn);
        });
        panelBody.appendChild(grid5);
      }

      // Group 6: Highlights & Outlines
      var highlightItems = [
        {
          id: "highlightLinks",
          label: "Highlight Links",
          value: state.highlightLinks,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
          onClick: function () {
            state.highlightLinks = !state.highlightLinks;
            saveState(); applyEffects(); renderPanelBody();
          }
        },
        {
          id: "highlightHeadings",
          label: "Highlight Headings",
          value: state.highlightHeadings,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
          onClick: function () {
            state.highlightHeadings = !state.highlightHeadings;
            saveState(); applyEffects(); renderPanelBody();
          }
        },
        {
          id: "highlightButtons",
          label: "Highlight Buttons",
          value: state.highlightButtons,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>`,
          onClick: function () {
            state.highlightButtons = !state.highlightButtons;
            saveState(); applyEffects(); renderPanelBody();
          }
        },
        {
          id: "highlightFocus",
          label: "Focus Highlight",
          value: state.highlightFocus,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
          onClick: function () {
            state.highlightFocus = !state.highlightFocus;
            saveState(); applyEffects(); renderPanelBody();
          }
        },
        {
          id: "highlightHover",
          label: "Highlight Hover",
          value: state.highlightHover,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
          onClick: function () {
            state.highlightHover = !state.highlightHover;
            saveState(); applyEffects(); renderPanelBody();
          }
        }
      ];

      var filteredHighlights = highlightItems.filter(function(item){ return matchesQuery(item.label, "highlight highlights outline outlines border link links heading headings button buttons focus hover", "Highlights & Outlines"); });
      if (filteredHighlights.length > 0) {
        hasAnyRendered = true;
        var secHeading6 = document.createElement("div");
        secHeading6.className = "feat-group-title";
        secHeading6.innerText = "Highlights & Outlines";
        panelBody.appendChild(secHeading6);

        var grid6 = document.createElement("div");
        grid6.className = "feat-grid-2col";
        filteredHighlights.forEach(function (item) {
          var btn = document.createElement("button");
          var isActive = !!item.value;
          btn.className = "feat-tool-card " + (isActive ? "active" : "");
          btn.innerHTML = `
            <div class="feat-tool-icon-wrap">
              ${item.icon}
            </div>
            <span class="feat-tool-label">${item.label}</span>
          `;
          btn.onclick = item.onClick;
          grid6.appendChild(btn);
        });
        panelBody.appendChild(grid6);
      }

      // Group 7: Orientation & Visual Adjustments
      var visualItems = [
        {
          id: "hideImages",
          label: "Hide Images",
          value: state.hideImages,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><path d="M13.5 13.5 6 21h12l-3.5-4.5"/><path d="M21 15V5a2 2 0 0 0-2-2H9"/></svg>`,
          onClick: function () {
            state.hideImages = !state.hideImages;
            saveState(); applyEffects(); renderPanelBody();
          }
        },
        {
          id: "muteSounds",
          label: "Mute Sounds",
          value: state.muteSounds,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
          onClick: function () {
            state.muteSounds = !state.muteSounds;
            saveState(); applyEffects(); renderPanelBody();
          }
        },
        {
          id: "reduceMotion",
          label: "Reduce Motion",
          value: state.reduceMotion || state.stopAnimations,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
          onClick: function () {
            var nv = !(state.reduceMotion || state.stopAnimations);
            state.reduceMotion = nv;
            state.stopAnimations = nv;
            saveState(); applyEffects(); renderPanelBody();
          }
        }
      ];

      var showCurSize = matchesQuery("Cursor Size", "mouse pointer huge large");
      var showCurColor = matchesQuery("Cursor Pointer Style", "cursor pointer black white");
      var filteredVisualToggles = visualItems.filter(function(item){ return matchesQuery(item.label, "orientation visual motion sounds hide"); });
      var showGroup7 = filteredVisualToggles.length > 0 || showCurSize || showCurColor;

      if (showGroup7) {
        hasAnyRendered = true;
        var secHeading7 = document.createElement("div");
        secHeading7.className = "feat-group-title";
        secHeading7.innerText = "Orientation & Visual Adjustments";
        panelBody.appendChild(secHeading7);

        if (filteredVisualToggles.length > 0) {
          var grid7 = document.createElement("div");
          grid7.className = "feat-grid-2col";
          filteredVisualToggles.forEach(function (item) {
            var btn = document.createElement("button");
            var isActive = !!item.value;
            btn.className = "feat-tool-card " + (isActive ? "active" : "");
            btn.innerHTML = `
              <div class="feat-tool-icon-wrap">
                ${item.icon}
              </div>
              <span class="feat-tool-label">${item.label}</span>
            `;
            btn.onclick = item.onClick;
            grid7.appendChild(btn);
          });
          panelBody.appendChild(grid7);
        }

        // Cursor Size
        if (showCurSize) {
          var curBox = document.createElement("div");
          curBox.className = "segmented-box";
          curBox.innerHTML = `
            <div class="segmented-header">Cursor Size</div>
            <div class="segmented-buttons-row">
              <button class="segmented-pill-btn ${state.cursorSize==='normal'?'active':''}" data-cur="normal">Normal</button>
              <button class="segmented-pill-btn ${state.cursorSize==='large'?'active':''}" data-cur="large">Large</button>
              <button class="segmented-pill-btn ${state.cursorSize==='huge'?'active':''}" data-cur="huge">Huge</button>
            </div>
          `;
          curBox.querySelectorAll(".segmented-pill-btn").forEach(function(b){
            b.onclick = function(){
              state.cursorSize = b.getAttribute("data-cur");
              saveState(); applyEffects(); renderPanelBody();
            };
          });
          panelBody.appendChild(curBox);
        }

        // Cursor Pointer Style
        if (showCurColor) {
          var curStyleBox = document.createElement("div");
          curStyleBox.className = "segmented-box";
          curStyleBox.innerHTML = `
            <div class="segmented-header">Cursor Pointer Style</div>
            <div class="segmented-buttons-row">
              <button class="segmented-pill-btn ${state.cursorColor==='default'?'active':''}" data-color="default">Default</button>
              <button class="segmented-pill-btn ${state.cursorColor==='black'?'active':''}" data-color="black">Big Black</button>
              <button class="segmented-pill-btn ${state.cursorColor==='white'?'active':''}" data-color="white">Big White</button>
            </div>
          `;
          curStyleBox.querySelectorAll(".segmented-pill-btn").forEach(function(b){
            b.onclick = function(){
              state.cursorColor = b.getAttribute("data-color");
              saveState(); applyEffects(); renderPanelBody();
            };
          });
          panelBody.appendChild(curStyleBox);
        }
      }

      if (!hasAnyRendered && query) {
        var emptyMsg = document.createElement("div");
        emptyMsg.style.cssText = "text-align:center;padding:36px 12px;color:#94a3b8;font-size:12.5px;font-weight:600;";
        emptyMsg.innerText = 'No features found for "' + state.searchQuery + '"';
        panelBody.appendChild(emptyMsg);
      }
    }

    // 4. VISION TAB (Complete inventory from ColorVisionSection.tsx)
    else if (state.activeTab === "vision" || (state.searchQuery && tabKeywords.vision.some(function(k){return k.indexOf(state.searchQuery)!==-1;}))) {
      
      // 4.1 Color & Contrast Adjustments (Vertical cards with switches)
      var secHeading1 = document.createElement("div");
      secHeading1.className = "section-heading-text";
      secHeading1.innerText = "Color & Contrast Adjustments";
      panelBody.appendChild(secHeading1);

      var colorAdjustments = [
        {
          id: "darkContrast",
          label: "Dark Contrast",
          desc: "High contrast dark mode for text clarity",
          isActive: state.isDarkMode || state.isHighContrast,
          toggle: function () {
            var next = !(state.isDarkMode || state.isHighContrast);
            state.isDarkMode = next;
            state.isHighContrast = next;
            state.isLightMode = false;
          }
        },
        {
          id: "lightContrast",
          label: "Light Contrast",
          desc: "Soft light mode with crisp dark elements",
          isActive: state.isLightMode,
          toggle: function () {
            var next = !state.isLightMode;
            state.isLightMode = next;
            state.isDarkMode = false;
            state.isHighContrast = false;
          }
        },
        {
          id: "monochrome",
          label: "Monochrome",
          desc: "Removes colors and displays site in grayscale",
          isActive: state.monochrome || state.saturationMode === "monochrome",
          toggle: function () {
            state.monochrome = !state.monochrome;
            state.saturationMode = state.monochrome ? "monochrome" : "normal";
          }
        },
        {
          id: "highSaturation",
          label: "High Saturation",
          desc: "Enhances color intensity for sharper visibility",
          isActive: state.saturationMode === "high",
          toggle: function () {
            state.saturationMode = (state.saturationMode === "high" ? "normal" : "high");
          }
        },
        {
          id: "lowSaturation",
          label: "Low Saturation",
          desc: "Dampens bright colors to reduce visual strain",
          isActive: state.saturationMode === "low",
          toggle: function () {
            state.saturationMode = (state.saturationMode === "low" ? "normal" : "low");
          }
        }
      ];

      colorAdjustments.forEach(function (c) {
        var card = document.createElement("div");
        card.className = "profile-card-item " + (c.isActive ? "active" : "");
        card.innerHTML = `
          <div class="profile-card-header">
            <div class="profile-card-left">
              <div class="profile-icon-box ${c.isActive ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20z"/></svg>
              </div>
              <div class="profile-card-text">
                <div class="profile-title">${c.label}</div>
                <div class="profile-desc">${c.desc}</div>
              </div>
            </div>
            <div class="toggle-switch-ui ${c.isActive ? 'active' : ''}">
              <div class="toggle-knob-ui"></div>
            </div>
          </div>
        `;
        card.onclick = function () {
          c.toggle();
          saveState();
          applyEffects();
          renderPanelBody();
        };
        panelBody.appendChild(card);
      });

      // 4.2 Color Blindness Profiles (Radio style)
      var secHeading2 = document.createElement("div");
      secHeading2.className = "section-heading-text";
      secHeading2.innerText = "Color Blindness Profiles";
      panelBody.appendChild(secHeading2);

      var cbModes = [
        { value: "none", label: "None" },
        { value: "protanopia", label: "Protanopia (Red-blind)" },
        { value: "deuteranopia", label: "Deuteranopia (Green-blind)" },
        { value: "tritanopia", label: "Tritanopia (Blue-blind)" },
        { value: "achromatopsia", label: "Achromatopsia (Monochromacy)" },
      ];

      cbModes.forEach(function (cb) {
        var isAct = state.colorBlindMode === cb.value;
        var rBtn = document.createElement("button");
        rBtn.style.cssText = `width:100%;text-align:left;display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-radius:14px;border:1px solid ${isAct ? primaryColor : '#e2e8f0'};background:${isAct ? hexToRgba(primaryColor, 0.08) : '#ffffff'};cursor:pointer;margin-bottom:6px;transition:all 0.15s;`;
        rBtn.innerHTML = `
          <span style="font-size:12.5px;font-weight:${isAct ? '800' : '600'};color:${isAct ? primaryColor : '#0f172a'};">${cb.label}</span>
          <span style="width:18px;height:18px;border-radius:50%;border:2px solid ${isAct ? primaryColor : '#cbd5e1'};background:${isAct ? primaryColor : 'transparent'};display:flex;align-items:center;justify-content:center;">
            ${isAct ? '<span style="width:6px;height:6px;border-radius:50%;background:#ffffff;"></span>' : ''}
          </span>
        `;
        rBtn.onclick = function () {
          state.colorBlindMode = cb.value;
          saveState();
          applyEffects();
          renderPanelBody();
        };
        panelBody.appendChild(rBtn);
      });

      // 4.3 Custom Color Swatches (Text, Title, Background)
      var secHeading3 = document.createElement("div");
      secHeading3.className = "section-heading-text";
      secHeading3.innerText = "Custom Color Adaptations";
      panelBody.appendChild(secHeading3);

      var colorSwatches = [
        { id: "blue", hex: "#0070f3" },
        { id: "purple", hex: "#7928ca" },
        { id: "red", hex: "#e00000" },
        { id: "orange", hex: "#f5a623" },
        { id: "teal", hex: "#00b4d8" },
        { id: "green", hex: "#10b981" },
        { id: "white", hex: "#ffffff" },
        { id: "black", hex: "#000000" },
      ];

      // Swatch Card Builder
      function buildColorPickerCard(title, stateKey) {
        var card = document.createElement("div");
        card.style.cssText = "background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:12px 14px;margin-bottom:8px;";
        card.innerHTML = `
          <div style="font-size:12px;font-weight:800;color:#0f172a;text-align:center;margin-bottom:8px;">${title}</div>
          <div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;">
            ${colorSwatches.map(function (c) {
              var isAct = state[stateKey] === c.id;
              return `<button class="swatch-btn" data-color="${c.id}" style="width:28px;height:28px;border-radius:50%;border:1px solid #cbd5e1;background:${c.hex};cursor:pointer;box-shadow:${isAct ? ('0 0 0 3px ' + primaryColor) : 'none'};transform:${isAct ? 'scale(1.1)' : 'none'};transition:all 0.15s;"></button>`;
            }).join("")}
          </div>
          ${state[stateKey] !== "default" ? `<div style="text-align:center;margin-top:6px;"><button class="reset-swatch-btn" style="background:none;border:none;color:#64748b;font-size:11px;font-weight:700;text-decoration:underline;cursor:pointer;">Reset to Default</button></div>` : ""}
        `;
        card.querySelectorAll(".swatch-btn").forEach(function (btn) {
          btn.onclick = function () {
            state[stateKey] = btn.getAttribute("data-color");
            if (stateKey === "bgColor") {
              state.isDarkMode = false;
              state.isLightMode = false;
            }
            saveState(); applyEffects(); renderPanelBody();
          };
        });
        var rBtn = card.querySelector(".reset-swatch-btn");
        if (rBtn) {
          rBtn.onclick = function () {
            state[stateKey] = "default";
            saveState(); applyEffects(); renderPanelBody();
          };
        }
        return card;
      }

      panelBody.appendChild(buildColorPickerCard("Adjust Text Colors", "textColor"));
      panelBody.appendChild(buildColorPickerCard("Adjust Title Colors", "titleColor"));
      panelBody.appendChild(buildColorPickerCard("Adjust Background Colors", "bgColor"));
    }

    // 5. AI ASSIST TAB (Matching AIAssistantSection.tsx 1:1)
    else if (state.activeTab === "ai") {
      var chatView = document.createElement("div");
      chatView.className = "ai-chat-view";
      chatView.innerHTML = `
        <div class="ai-chat-chips" id="2all-chat-chips-box"></div>
        <div class="ai-chat-messages" id="2all-chat-msg-box"></div>
        <div class="ai-chat-input-row">
          <input type="text" class="ai-chat-input-box" id="2all-ai-msg-input" placeholder="Ask anything about 2all.ai..." />
          <button class="ai-chat-send-btn" id="2all-ai-msg-send">
            <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:white;stroke-width:2.5;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;
      panelBody.appendChild(chatView);

      renderChatMessages();
    }
  }

  function executeAssistantAction(actionType) {
    if (!actionType) return;
    if (actionType === "open_vision" || actionType === "vision") {
      state.activeTab = "vision";
      saveState();
      renderHeaderTabs();
      renderPanelBody();
    } else if (actionType === "read_page") {
      readEntirePage();
    } else if (actionType === "voice_nav") {
      state.voiceNavigation = true;
      saveState();
      applyEffects();
    } else if (actionType === "dark_contrast") {
      state.isDarkMode = true;
      state.isHighContrast = true;
      saveState();
      applyEffects();
    } else if (actionType === "dark_bg") {
      state.bgColor = "black";
      saveState();
      applyEffects();
    } else if (actionType === "dyslexia") {
      state.activeProfile = "dyslexia";
      state.dyslexiaFont = true;
      state.fontFamily = "dyslexic";
      state.letterSpacing = 0.5;
      state.wordSpacing = 0.05;
      state.lineHeight = 1.6;
      saveState();
      applyEffects();
    } else if (actionType === "reading_mask") {
      state.readingMask = true;
      saveState();
      applyEffects();
    } else if (actionType === "cognitive") {
      state.activeProfile = "cognitive";
      state.fontFamily = "lexend";
      state.readableFont = true;
      state.fontSize = 115;
      state.lineHeight = 1.9;
      state.letterSpacing = 0.5;
      state.wordSpacing = 0.1;
      state.reduceMotion = true;
      state.stopAnimations = true;
      state.highlightLinks = true;
      state.highlightButtons = true;
      state.readingRuler = true;
      saveState();
      applyEffects();
    } else if (actionType === "screen_reader") {
      state.activeProfile = "blind";
      state.textToSpeech = true;
      saveState();
      applyEffects();
    } else if (actionType === "motor") {
      state.highlightButtons = true;
      state.highlightLinks = true;
      saveState();
      applyEffects();
    } else if (actionType === "stop_animations") {
      state.stopAnimations = true;
      state.reduceMotion = true;
      saveState();
      applyEffects();
    } else if (actionType === "increase_font") {
      state.fontSize = Math.min(200, (state.fontSize || 100) + 20);
      saveState();
      applyEffects();
    } else if (actionType === "large_cursor") {
      state.cursorSize = "large";
      saveState();
      applyEffects();
    } else if (actionType === "mute_sounds") {
      state.muteSounds = true;
      saveState();
      applyEffects();
    } else if (actionType === "reset_settings") {
      resetSettings();
    } else if (actionType === "explore_all" || actionType === "open_features") {
      state.activeTab = "features";
      saveState();
      renderHeaderTabs();
      renderPanelBody();
    }
  }

  function getAssistantResponse(text) {
    var lower = (text || "").toLowerCase().trim();

    // 1. Color Blindness Filters (TOP PRIORITY - must evaluate before generic "list" or "blind"!)
    var isColorBlind = (
      lower.indexOf("color blind") !== -1 || lower.indexOf("colorblind") !== -1 ||
      lower.indexOf("protanopia") !== -1 || lower.indexOf("deuteranopia") !== -1 ||
      lower.indexOf("tritanopia") !== -1 || lower.indexOf("achromatopsia") !== -1 ||
      lower.indexOf("monochrom") !== -1 || lower.indexOf("daltonism") !== -1 ||
      lower.indexOf("color vision") !== -1 ||
      (lower.indexOf("color") !== -1 && lower.indexOf("blind") !== -1)
    );

    if (isColorBlind) {
      return {
        text: "🎨 **Color Vision Deficiency (Color Blindness) Filters**:\n\n" +
              "2all.ai provides 4 specialized vision compensation filters designed for different types of color blindness:\n\n" +
              "• **Protanopia (Red-Blind / Red-Weak)**: Calibrates red wavelengths so you can easily distinguish reds from greens, browns, and dark tones.\n" +
              "• **Deuteranopia (Green-Blind / Green-Weak)**: Adjusts green spectrum clarity for the most common form of color blindness.\n" +
              "• **Tritanopia (Blue-Blind / Blue-Weak)**: Amplifies blue and yellow differentiation with balanced contrast tuning.\n" +
              "• **Achromatopsia (Monochromacy / Total Color Blindness)**: Converts the entire page to ultra-crisp, high-contrast monochrome grayscale.\n\n" +
              "You can test and apply any of these filters directly from the **Vision Tab**!",
        actionLabel: "Open Vision Tab",
        actionType: "open_vision",
        applyAction: function () { executeAssistantAction("open_vision"); }
      };
    }

    // 2. Background, Title & Text Colors
    var isBg = (
      lower.indexOf("background") !== -1 || lower.indexOf("bg color") !== -1 ||
      lower.indexOf("adjust bg") !== -1 || lower.indexOf("title color") !== -1 ||
      lower.indexOf("text color") !== -1 || lower.indexOf("heading color") !== -1 ||
      lower.indexOf("change color") !== -1 || lower.indexOf("bg tint") !== -1
    );

    if (isBg) {
      return {
        text: "🎨 **Adjusting Background & Text Colors**:\n\n" +
              "You can customize page colors anytime in the **Vision** tab:\n" +
              "• **Adjust Background Colors**: Choose from 8 accessible shades (White, Black, Blue, Green, Amber, Purple, Slate, Teal) to eliminate glare and eye fatigue.\n" +
              "• **Adjust Title & Text Colors**: Pick high-contrast custom colors for headings and body paragraphs.\n" +
              "• All backgrounds, sections, cards, and container gradients are styled live without breaking layouts!",
        actionLabel: "Open Vision Tab",
        actionType: "open_vision",
        applyAction: function () { executeAssistantAction("open_vision"); }
      };
    }

    // 3. Voice Navigation & Microphone Hands-Free Control
    var isVoiceNav = (
      lower.indexOf("voice navigation") !== -1 || lower.indexOf("voice command") !== -1 ||
      lower.indexOf("microphone") !== -1 || lower.indexOf("mic") !== -1 ||
      lower.indexOf("hands free") !== -1 || lower.indexOf("speak command") !== -1
    );

    if (isVoiceNav) {
      return {
        text: "🎙️ **Voice Navigation (Hands-Free Control)**:\n\n" +
              "Speak natural voice commands into your microphone to control the website:\n" +
              "• *\"Read page\"* or *\"Speak text\"* → Starts page narrator.\n" +
              "• *\"Scroll down\"* / *\"Scroll up\"* → Smooth page navigation.\n" +
              "• *\"Dark mode\"* / *\"Reset\"* → Toggles accessibility modes.\n" +
              "• *\"Pricing\"* / *\"Contact\"* → Direct navigation.\n\n" +
              "Click below to activate voice control!",
        actionLabel: "Enable Voice Navigation",
        actionType: "voice_nav",
        applyAction: function () { executeAssistantAction("voice_nav"); }
      };
    }

    // 4. Voice, Speech, Read Aloud & Text-to-Speech (TTS)
    var isVoice = (
      lower.indexOf("voice") !== -1 || lower.indexOf("speech") !== -1 || lower.indexOf("tts") !== -1 ||
      lower.indexOf("read page") !== -1 || lower.indexOf("read aloud") !== -1 || lower.indexOf("text to speech") !== -1 ||
      lower.indexOf("narrat") !== -1 || lower.indexOf("read text") !== -1 || lower.indexOf("listen") !== -1 ||
      lower.indexOf("audio") !== -1 || lower.indexOf("speak") !== -1 ||
      (lower.indexOf("read") !== -1 && lower.indexOf("ruler") === -1 && lower.indexOf("mask") === -1)
    );

    if (isVoice) {
      return {
        text: "🔊 **Voice & Reading Tools**:\n\n" +
              "• **Read Entire Page**: Natural voice reading with real-time sentence highlight and auto-scroll.\n" +
              "• **Read Selected Text**: Highlight any sentence or paragraph on the page to hear it spoken.\n" +
              "• **Voice Settings Parameters**: Choose from available system voices (Google UK English, US English, etc.), adjust Reading Speed (0.5x to 2x), and pitch live!",
        actionLabel: "Start Reading Page",
        actionType: "read_page",
        applyAction: function () { readEntirePage(); }
      };
    }

    // 5. Dyslexia Mode & OpenDyslexic Typography
    var isDyslexia = (
      lower.indexOf("dyslexi") !== -1 || lower.indexOf("letter flip") !== -1 ||
      lower.indexOf("opendyslexic") !== -1 || lower.indexOf("b/d/p/q") !== -1 ||
      lower.indexOf("gravity font") !== -1
    );

    if (isDyslexia) {
      return {
        text: "📚 **Dyslexia Friendly Mode**:\n\n" +
              "• Applies **OpenDyslexic** typography with heavy weighted gravity bottoms to prevent letter inversion and flipping (b/d/p/q).\n" +
              "• Expands letter spacing (+0.5px), word spacing (+0.05em), and line height (1.6x) for effortless scanning and improved reading fluency.",
        actionLabel: "Enable Dyslexia Mode",
        actionType: "dyslexia",
        applyAction: function () { executeAssistantAction("dyslexia"); }
      };
    }

    // 6. ADHD, Reading Mask & Ruler
    var isAdhd = (
      lower.indexOf("adhd") !== -1 || lower.indexOf("focus") !== -1 || lower.indexOf("distract") !== -1 ||
      lower.indexOf("reading mask") !== -1 || lower.indexOf("reading ruler") !== -1 ||
      lower.indexOf("mask") !== -1 || lower.indexOf("ruler") !== -1
    );

    if (isAdhd) {
      return {
        text: "⚡ **ADHD & Focus Assistance**:\n\n" +
              "• **Reading Mask**: Creates a clear horizontal reading spotlight that moves with your cursor while gently dimming the rest of the screen.\n" +
              "• **Reading Ruler**: Provides a sharp line guide underneath your active reading position.\n" +
              "• **Stop Animations**: Freezes moving banners, autoplay videos, and distracting GIFs.",
        actionLabel: "Enable Reading Mask",
        actionType: "reading_mask",
        applyAction: function () { executeAssistantAction("reading_mask"); }
      };
    }

    // 7. Cognitive & Learning Disabilities
    var isCognitive = (
      lower.indexOf("cogniti") !== -1 || lower.indexOf("autism") !== -1 ||
      lower.indexOf("stroke") !== -1 || lower.indexOf("learning") !== -1 ||
      lower.indexOf("memory") !== -1
    );

    if (isCognitive) {
      return {
        text: "🧠 **Cognitive Disability Mode**:\n\n" +
              "• Cleans visual clutter and stops moving animations.\n" +
              "• Applies readable **Lexend** typography designed by educational researchers to increase reading comprehension.\n" +
              "• Highlights action buttons, links, and headings with high-contrast outlines.",
        actionLabel: "Enable Cognitive Mode",
        actionType: "cognitive",
        applyAction: function () { executeAssistantAction("cognitive"); }
      };
    }

    // 8. Blindness & Screen Readers (Must exclude Color Blindness!)
    var isBlind = !isColorBlind && (
      lower.indexOf("screen reader") !== -1 || lower.indexOf("jaws") !== -1 ||
      lower.indexOf("nvda") !== -1 || lower.indexOf("voiceover") !== -1 ||
      lower.indexOf("talkback") !== -1 || lower.indexOf("blindness") !== -1 ||
      lower.indexOf("blind") !== -1 || lower.indexOf("aria") !== -1
    );

    if (isBlind) {
      return {
        text: "♿ **Blindness / Screen Reader Mode**:\n\n" +
              "• Optimizes website DOM hierarchy and ARIA landmarks for JAWS, NVDA, VoiceOver & TalkBack.\n" +
              "• Enables comprehensive keyboard navigation loops and automatically describes missing image alt tags.",
        actionLabel: "Enable Screen Reader Mode",
        actionType: "screen_reader",
        applyAction: function () { executeAssistantAction("screen_reader"); }
      };
    }

    // 9. Vision & High Contrast Modes
    var isContrast = (
      lower.indexOf("contrast") !== -1 || lower.indexOf("dark mode") !== -1 ||
      lower.indexOf("light mode") !== -1 || lower.indexOf("vision") !== -1 ||
      lower.indexOf("glare") !== -1 || lower.indexOf("invert") !== -1
    );

    if (isContrast) {
      return {
        text: "👁️ **High Contrast & Vision Modes**:\n\n" +
              "• **Dark Contrast**: Deep slate background (`#0f172a`) with crisp white typography to eliminate glare.\n" +
              "• **Light Contrast**: Clean high-contrast white layout with deep black text.\n" +
              "• **High Contrast Boost**: 150% contrast amplification for low-vision clarity.",
        actionLabel: "Enable Dark Contrast",
        actionType: "dark_contrast",
        applyAction: function () { executeAssistantAction("dark_contrast"); }
      };
    }

    // 10. Motor Impairment & Keyboard Access
    var isMotor = (
      lower.indexOf("motor") !== -1 || lower.indexOf("keyboard") !== -1 ||
      lower.indexOf("parkinson") !== -1 || lower.indexOf("mobility") !== -1 ||
      lower.indexOf("tremor") !== -1
    );

    if (isMotor) {
      return {
        text: "🎮 **Motor Impairment Assistance**:\n\n" +
              "• Enlarges clickable targets and highlights active keyboard focus with prominent glow rings.\n" +
              "• Provides Large (32px) and Huge (64px) cursor overlays.\n" +
              "• Allows complete hands-free site navigation via Voice Navigation.",
        actionLabel: "Highlight Buttons & Links",
        actionType: "motor",
        applyAction: function () { executeAssistantAction("motor"); }
      };
    }

    // 11. Seizure Safety & Animation Stopping
    var isSeizure = (
      lower.indexOf("seizure") !== -1 || lower.indexOf("epilep") !== -1 ||
      lower.indexOf("flashing") !== -1 || lower.indexOf("animation") !== -1 ||
      lower.indexOf("motion") !== -1 || lower.indexOf("freeze") !== -1
    );

    if (isSeizure) {
      return {
        text: "🛡️ **Seizure Safe Mode**:\n\n" +
              "• Instantly pauses and freezes all moving animations, autoplay videos, scrolling marquees, and flashing GIFs.\n" +
              "• Eliminates photosensitive epileptic seizure risks and vestibular motion sickness.",
        actionLabel: "Stop All Animations",
        actionType: "stop_animations",
        applyAction: function () { executeAssistantAction("stop_animations"); }
      };
    }

    // 12. Font Sizing, Spacing & Text Scaling
    var isFont = (
      lower.indexOf("font") !== -1 || lower.indexOf("text size") !== -1 ||
      lower.indexOf("zoom") !== -1 || lower.indexOf("scale") !== -1 ||
      lower.indexOf("spacing") !== -1 || lower.indexOf("line height") !== -1
    );

    if (isFont) {
      return {
        text: "🔤 **Font Sizing & Spacing Adjustments**:\n\n" +
              "• **Text Scaling**: Scale full website text up to **200%** dynamically.\n" +
              "• **Line Height**: Increase line spacing up to **2.5x**.\n" +
              "• **Letter & Word Spacing**: Widen space between individual letters and words.\n" +
              "• **Text Alignment**: Left, Center, Right, or Justify.",
        actionLabel: "Increase Text Size (+20%)",
        actionType: "increase_font",
        applyAction: function () { executeAssistantAction("increase_font"); }
      };
    }

    // 13. Cursor & Mouse
    var isCursor = (lower.indexOf("cursor") !== -1 || lower.indexOf("mouse") !== -1 || lower.indexOf("pointer") !== -1);
    if (isCursor) {
      return {
        text: "🔍 **Cursor & Pointer Enhancements**:\n\n" +
              "• Switch between **Normal**, **Large** (32px), and **Huge** (64px) high-contrast cursor pointers to easily track mouse movement across large monitors.",
        actionLabel: "Enable Large Cursor",
        actionType: "large_cursor",
        applyAction: function () { executeAssistantAction("large_cursor"); }
      };
    }

    // 14. Mute Sounds
    var isMute = (lower.indexOf("mute") !== -1 || lower.indexOf("silence") !== -1 || lower.indexOf("quiet") !== -1 || lower.indexOf("stop sound") !== -1);
    if (isMute) {
      return {
        text: "🔇 **Mute Website Sounds**:\n\n" +
              "Instantly silences all background music, autoplay media, and HTML5 `<audio>` / `<video>` elements across the host page.",
        actionLabel: "Mute All Sounds",
        actionType: "mute_sounds",
        applyAction: function () { executeAssistantAction("mute_sounds"); }
      };
    }

    // 15. WCAG, ADA, EAA & Legal Compliance
    var isCompliance = (
      lower.indexOf("wcag") !== -1 || lower.indexOf("ada") !== -1 || lower.indexOf("law") !== -1 ||
      lower.indexOf("legal") !== -1 || lower.indexOf("lawsuit") !== -1 || lower.indexOf("compliance") !== -1 ||
      lower.indexOf("508") !== -1 || lower.indexOf("eaa") !== -1 || lower.indexOf("vpat") !== -1
    );

    if (isCompliance) {
      return {
        text: "⚖️ **ADA & WCAG 2.1 AA Compliance Protection**:\n\n" +
              "• **Legal Standard**: Conforms with **ADA Title III**, **Section 508**, **EAA**, and **WCAG 2.1 Level AA**.\n" +
              "• **Automated Remediation**: Patches missing alt text, ARIA landmarks, form labels, and color contrast.\n" +
              "• **Audit Certificates**: Generates official VPAT statements and litigation defense records."
      };
    }

    // 16. Installation & Embed Code
    var isInstall = (
      lower.indexOf("install") !== -1 || lower.indexOf("code") !== -1 || lower.indexOf("script") !== -1 ||
      lower.indexOf("embed") !== -1 || lower.indexOf("setup") !== -1 || lower.indexOf("wordpress") !== -1 ||
      lower.indexOf("shopify") !== -1 || lower.indexOf("webflow") !== -1 || lower.indexOf("how to add") !== -1
    );

    if (isInstall) {
      var prodUrl = (typeof window !== "undefined" && window.location && window.location.hostname === "localhost")
        ? "http://localhost:3000/loader.js"
        : "https://2all-ai.mccmrfip.in/loader.js";
      return {
        text: "⚡ **Quick 2-Minute Installation**:\n\n" +
              "Simply paste our script before the closing `</body>` tag on your website:\n\n" +
              "```html\n<script src=\"" + prodUrl + "\" data-api-key=\"YOUR_KEY\" async></script>\n```\n\n" +
              "Compatible with WordPress, Shopify, Next.js, React, Webflow, Squarespace, and custom HTML!"
      };
    }

    // 17. Pricing & Plans
    var isPricing = (
      lower.indexOf("pricing") !== -1 || lower.indexOf("price") !== -1 || lower.indexOf("cost") !== -1 ||
      lower.indexOf("plan") !== -1 || lower.indexOf("how much") !== -1 || lower.indexOf("buy") !== -1 ||
      lower.indexOf("trial") !== -1 || lower.indexOf("subscription") !== -1 || lower.indexOf("pay") !== -1
    );

    if (isPricing) {
      return {
        text: "💰 **2all.ai Pricing Plans**:\n\n" +
              "• **Standard**: $49/month (Under 10k pageviews/mo).\n" +
              "• **Business**: $99/month (Automated AI remediation & monthly audit reports).\n" +
              "• **Enterprise**: Custom dedicated SLA, custom widget branding & legal protection support.\n\n" +
              "🎉 All plans include a **7-Day Free Trial** with no commitment!"
      };
    }

    // 18. Account & Dashboard
    var isAccount = (lower.indexOf("account") !== -1 || lower.indexOf("login") !== -1 || lower.indexOf("dashboard") !== -1 || lower.indexOf("portal") !== -1);
    if (isAccount) {
      return {
        text: "🔑 **Client Portal & Dashboard**:\n\n" +
              "Manage authorized domains, inspect accessibility scorecards, customize brand theme colors, and download VPAT compliance reports from your 2all.ai dashboard."
      };
    }

    // 19. Support & Demo
    var isSupport = (lower.indexOf("support") !== -1 || lower.indexOf("contact") !== -1 || lower.indexOf("email") !== -1 || lower.indexOf("demo") !== -1 || lower.indexOf("help desk") !== -1);
    if (isSupport) {
      return {
        text: "📧 **24/7 Dedicated Support**:\n\n" +
              "Our accessibility engineering specialists are here for you 24/7!\n" +
              "• Email: **support@2all.ai**\n" +
              "• Schedule a 1-on-1 personalized compliance audit demo anytime."
      };
    }

    // 20. Reset Settings
    var isReset = (lower.indexOf("reset") !== -1 || lower.indexOf("clear") !== -1 || lower.indexOf("default") !== -1 || lower.indexOf("restore") !== -1);
    if (isReset) {
      return {
        text: "🔄 **Reset Accessibility Adjustments**:\n\n" +
              "Click below or press the 'Reset Settings' button at the bottom of the panel to restore all website colors, typography, and modes back to normal.",
        actionLabel: "Reset All Settings",
        actionType: "reset_settings",
        applyAction: function () { executeAssistantAction("reset_settings"); }
      };
    }

    // 21. About 2all.ai
    var isAbout = (lower.indexOf("what is 2all") !== -1 || lower.indexOf("who are you") !== -1 || lower.indexOf("who made") !== -1 || lower === "about");
    if (isAbout) {
      return {
        text: "🤖 **About 2all.ai**:\n\n" +
              "2all.ai is an enterprise AI-powered web accessibility platform designed to ensure digital equity for over 1 billion people with disabilities while protecting businesses from ADA Title III & WCAG compliance lawsuits."
      };
    }

    // 22. Elderly / Seniors / Aging Eyes
    var isElderly = (lower.indexOf("elderly") !== -1 || lower.indexOf("senior") !== -1 || lower.indexOf("aging") !== -1 || lower.indexOf("old age") !== -1 || lower.indexOf("grand") !== -1);
    if (isElderly) {
      return {
        text: "👵 **Senior & Low-Vision Reading Comfort**:\n\n" +
              "For elderly visitors experiencing presbyopia, cataracts, or eye fatigue:\n" +
              "• **Text Scaling**: Magnify text up to 200% without breaking layouts.\n" +
              "• **High Contrast / Dark Mode**: Crisp typography with zero glare.\n" +
              "• **Large Pointers**: High-visibility 32px/64px cursors.\n" +
              "• **Text-To-Speech**: Natural voice reading with word highlighting.",
        actionLabel: "Increase Text Size (+20%)",
        actionType: "increase_font",
        applyAction: function () { executeAssistantAction("increase_font"); }
      };
    }

    // 23. Performance / Speed / SEO
    var isSpeed = (lower.indexOf("speed") !== -1 || lower.indexOf("performance") !== -1 || lower.indexOf("slow") !== -1 || lower.indexOf("seo") !== -1 || lower.indexOf("load time") !== -1);
    if (isSpeed) {
      return {
        text: "⚡ **High-Speed & Zero Impact Architecture**:\n\n" +
              "• **Ultra-Lightweight**: Under 20KB gzipped, loaded asynchronously via CDN (`async defer`).\n" +
              "• **Zero PageSpeed Impact**: Operates without blocking the main DOM thread.\n" +
              "• **SEO Boost**: Fixes missing image alt tags and structural ARIA landmarks, improving search ranking.",
        actionLabel: "Explore All Features",
        actionType: "explore_all",
        applyAction: function () { executeAssistantAction("explore_all"); }
      };
    }

    // 24. Clarity InfoTech / Host Website
    var isClarity = (lower.indexOf("clarity") !== -1 || lower.indexOf("this site") !== -1 || lower.indexOf("this website") !== -1);
    if (isClarity) {
      return {
        text: "🏢 **Website Accessibility Integration**:\n\n" +
              "This website is powered by **2all.ai** to guarantee complete digital inclusion, WCAG 2.1 AA adherence, and ADA compliance for all users and assistive devices.\n\n" +
              "You can customize any colors, fonts, voice reading, and focus tools directly on this page!",
        actionLabel: "Explore Features",
        actionType: "explore_all",
        applyAction: function () { executeAssistantAction("explore_all"); }
      };
    }

    // 25. Greetings
    var isGreeting = (
      lower === "hi" || lower === "hello" || lower === "hey" ||
      lower.indexOf("hi ") === 0 || lower.indexOf("hello ") === 0 || lower.indexOf("hey ") === 0 ||
      lower.indexOf("good morning") !== -1 || lower.indexOf("good afternoon") !== -1
    );
    if (isGreeting) {
      return {
        text: "👋 **Hello! How can I assist you today?**\n\n" +
              "I can help you navigate this website or activate accessibility adjustments:\n" +
              "• Say *\"give color blindness list\"* to see vision filters.\n" +
              "• Say *\"read page\"* to start voice narration.\n" +
              "• Say *\"dark mode\"* or *\"change colors\"* for visual contrast.\n" +
              "• Say *\"dyslexia\"* or *\"adhd\"* for specialized reading modes.",
        actionLabel: "List All Tools",
        actionType: "all_tools",
        applyAction: function () { handleUserChatMessage("list all tools"); }
      };
    }

    // 26. Complete Tools Suite Listing (ONLY fires when explicitly asking for all tools / features / menu / overview)
    var isAllTools = (
      lower.indexOf("all tools") !== -1 || lower.indexOf("list the tools") !== -1 ||
      lower.indexOf("list all") !== -1 || lower.indexOf("list of tools") !== -1 ||
      lower.indexOf("what tools") !== -1 || lower.indexOf("what features") !== -1 ||
      lower.indexOf("what can you do") !== -1 || lower.indexOf("what do you do") !== -1 ||
      lower.indexOf("capabilities") !== -1 || lower.indexOf("overview") !== -1 ||
      lower === "tools" || lower === "features" || lower === "list" || lower === "menu" || lower === "help"
    );

    if (isAllTools) {
      return {
        text: "🛠️ **2all.ai Complete Accessibility Tools Suite**:\n\n" +
              "🔊 **1. Speech & Audio**\n" +
              "• **Read Entire Page / Selection**: Natural Text-to-Speech narrator with real-time sentence highlighting.\n" +
              "• **Voice Navigation**: Hands-free voice commands (\"read page\", \"dark mode\", etc.).\n" +
              "• **Voice Settings**: Multi-voice selection, pitch tuning, and speed up to 2x.\n\n" +
              "👁️ **2. Vision & Color Customization**\n" +
              "• **Adjust Background Colors**: 8 high-comfort tints (White, Black, Blue, Amber, Green, etc.).\n" +
              "• **Adjust Title & Text Colors**: Custom contrast palettes for headings and body text.\n" +
              "• **Dark, Light & High Contrast**: Instant contrast enhancement.\n" +
              "• **Color Blindness**: Filters for Protanopia, Deuteranopia, Tritanopia & Monochromacy.\n\n" +
              "🔤 **3. Typography & Layout**\n" +
              "• **Dyslexia Friendly Mode**: OpenDyslexic weighted gravity typography.\n" +
              "• **Text Scaling**: Zoom text up to 200% without breaking layouts.\n" +
              "• **Letter / Word Spacing & Line Height**: Eliminates visual text crowding.\n\n" +
              "🎯 **4. Focus & Motor Navigation**\n" +
              "• **Reading Mask & Ruler**: Horizontal line spotlighting for ADHD and focus.\n" +
              "• **Big / Huge Cursor**: High-visibility 32px & 64px pointers.\n" +
              "• **Highlight Links & Buttons**: Prominent interactive navigation guides.\n" +
              "• **Stop Animations & Hide Images**: Freeze motion distractions.",
        actionLabel: "Open Vision Tab",
        actionType: "open_vision",
        applyAction: function () { executeAssistantAction("open_vision"); }
      };
    }

    // 27. Universal Dynamic Contextual Fallback (Answers ANY other question)
    return {
      text: "💡 **2all.ai Accessibility Assistant**:\n\n" +
            "Regarding: *\"" + text + "\"*\n\n" +
            "2all.ai provides instant accessibility adjustments directly on this page:\n" +
            "• **Vision**: 4 Color Blindness filters (Protanopia, Deuteranopia, Tritanopia, Grayscale), 8 background tints, and contrast modes.\n" +
            "• **Audio**: Text-to-speech page narrator with natural voices and hands-free microphone voice navigation.\n" +
            "• **Reading**: OpenDyslexic typography, ADHD Reading Mask & Ruler, and text scaling up to 200%.\n" +
            "• **Motor**: Enlarged cursors, clickable target highlights, and keyboard navigation rings.\n\n" +
            "You can ask me to activate any feature or explain how it works!",
      actionLabel: "Explore All Features",
      actionType: "explore_all",
      applyAction: function () { executeAssistantAction("explore_all"); }
    };
  }

  function renderChatMessages() {
    var msgBox = shadow.getElementById("2all-chat-msg-box");
    var chipsBox = shadow.getElementById("2all-chat-chips-box");
    var inputEl = shadow.getElementById("2all-ai-msg-input");
    var sendBtn = shadow.getElementById("2all-ai-msg-send");
    if (!msgBox || !chipsBox) return;

    msgBox.innerHTML = "";
    state.aiMessages.forEach(function (m) {
      var b = document.createElement("div");
      b.className = "ai-chat-bubble " + m.type;
      var formatted = m.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");
      b.innerHTML = formatted;
      if (m.actionLabel && (m.applyAction || m.actionType)) {
        var aBtn = document.createElement("button");
        aBtn.style.cssText = "margin-top:8px;display:block;padding:6px 12px;background:" + primaryColor + ";color:#ffffff;border:none;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;";
        aBtn.innerText = m.actionLabel + " ✨";
        aBtn.onclick = function () {
          if (typeof m.applyAction === "function") {
            m.applyAction();
          } else if (m.actionType) {
            executeAssistantAction(m.actionType);
          }
          renderPanelBody();
        };
        b.appendChild(aBtn);
      }
      msgBox.appendChild(b);
    });
    msgBox.scrollTop = msgBox.scrollHeight;

    chipsBox.innerHTML = "";
    var suggestions = [
      "give color blindness list",
      "How to read page aloud?",
      "Change background colors",
      "Dyslexia & ADHD modes",
      "Pricing plans?",
      "WCAG 2.1 Compliance law?"
    ];
    suggestions.forEach(function (s) {
      var chip = document.createElement("div");
      chip.className = "ai-chip-pill";
      chip.innerText = s;
      chip.onclick = function () {
        handleUserChatMessage(s);
      };
      chipsBox.appendChild(chip);
    });

    if (sendBtn && inputEl) {
      sendBtn.onclick = function () {
        if (inputEl.value.trim()) {
          handleUserChatMessage(inputEl.value.trim());
          inputEl.value = "";
        }
      };
      inputEl.onkeypress = function (e) {
        if (e.key === "Enter" && inputEl.value.trim()) {
          handleUserChatMessage(inputEl.value.trim());
          inputEl.value = "";
        }
      };
    }
  }

  function handleUserChatMessage(text) {
    state.aiMessages.push({ id: Date.now(), type: "user", text: text });
    saveState();
    renderChatMessages();

    setTimeout(function () {
      var reply = getAssistantResponse(text);
      state.aiMessages.push({
        id: Date.now(),
        type: "bot",
        text: reply.text,
        actionLabel: reply.actionLabel,
        applyAction: reply.applyAction,
        actionType: reply.actionType
      });
      saveState();
      renderChatMessages();
    }, 300);
  }

  // -------------------------------------------------------------
  // Speech & Text-To-Speech Queue Architecture
  // -------------------------------------------------------------
  var pageElementsToRead = [];
  var currentElementIndex = 0;
  var currentSpeakingElement = null;
  var activeUtterance = null;
  var prevElOriginalOutline = "";
  var prevElOriginalOffset = "";
  var prevElOriginalRadius = "";

  // Initialize Voices listener immediately to warm up browser Speech API
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      if (typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
        window.speechSynthesis.onvoiceschanged = function () {
          try { window.speechSynthesis.getVoices(); } catch (e) {}
        };
      }
      window.speechSynthesis.getVoices();
    } catch (e) {}
  }

  function getBestVoice() {
    if (!("speechSynthesis" in window)) return null;
    var voices = [];
    try {
      voices = window.speechSynthesis.getVoices() || [];
    } catch (e) {}
    if (!voices || voices.length === 0) return null;
    if (state.voice) {
      var match = voices.find(function (x) { return x.name === state.voice; });
      if (match) return match;
    }

    // 1. Prefer local system voice with en-US or English for zero-latency and maximum reliability
    var localEnVoice = voices.find(function (x) {
      return x.localService && x.lang && (x.lang.toLowerCase() === "en-us" || x.lang.toLowerCase() === "en_us");
    }) || voices.find(function (x) {
      return x.localService && x.lang && x.lang.toLowerCase().indexOf("en") === 0;
    });
    if (localEnVoice) return localEnVoice;

    // 2. Fallback to any English voice
    var enVoice = voices.find(function (x) {
      return x.lang && (x.lang.toLowerCase() === "en-us" || x.lang.toLowerCase() === "en_us");
    }) || voices.find(function (x) {
      return x.lang && x.lang.toLowerCase().indexOf("en") === 0;
    });
    return enVoice || voices[0] || null;
  }

  var speechKeepAliveTimer = null;
  var speechUtterancesQueue = [];
  var currentSpeechChunks = [];
  var currentSpeechChunkIndex = 0;
  var speechDispatchTimer = null;

  function clearSpeechKeepAlive() {
    if (speechKeepAliveTimer) {
      clearInterval(speechKeepAliveTimer);
      speechKeepAliveTimer = null;
    }
  }

  function startSpeechKeepAlive() {
    clearSpeechKeepAlive();
    speechKeepAliveTimer = setInterval(function () {
      if (state.speechStatus === "playing" && window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        clearSpeechKeepAlive();
      }
    }, 10000);
  }

  // Split any long text into safe, bite-sized chunks (< 160 characters)
  // Completely bypasses Chrome 200-char / 15-sec cloud voice cutoff and sanitizes emojis
  function splitIntoSafeChunks(text) {
    if (!text) return [];
    var clean = text
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, " ")
      .replace(/[✨🎯🚀💡⭐•\u2022\u2192\u2190\u2014\u2013\u00A9\u00AE\u2122]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!clean) return [];

    var rawSentences = clean.split(/(?<=[.!?])\s+/);
    var safeChunks = [];

    rawSentences.forEach(function (sentence) {
      sentence = sentence.trim();
      if (!sentence) return;

      if (sentence.length <= 160) {
        safeChunks.push(sentence);
      } else {
        var words = sentence.split(" ");
        var current = "";
        words.forEach(function (w) {
          if ((current + " " + w).trim().length > 140) {
            if (current.trim()) safeChunks.push(current.trim());
            current = w;
          } else {
            current = (current + " " + w).trim();
          }
        });
        if (current.trim()) safeChunks.push(current.trim());
      }
    });

    return safeChunks;
  }

  // Speech Highlight Tracking & Auto-Scroll Helpers
  var currentSpeechEl = null;
  var originalSpeechOutline = "";
  var originalSpeechBg = "";
  var originalSpeechHtml = "";

  function clearSpeechHighlights() {
    if (currentSpeechEl) {
      try {
        if (originalSpeechHtml) {
          currentSpeechEl.innerHTML = originalSpeechHtml;
        }
        currentSpeechEl.style.outline = originalSpeechOutline;
        currentSpeechEl.style.backgroundColor = originalSpeechBg;
      } catch (e) {}
      currentSpeechEl = null;
      originalSpeechHtml = "";
      originalSpeechOutline = "";
      originalSpeechBg = "";
    }
  }

  // Extract all readable content chunks across the host page
  function getEntirePageChunks() {
    var hostEl = document.getElementById("2all-ai-widget-host");
    var selectors = "h1, h2, h3, h4, h5, h6, p, li, blockquote, figcaption, .info-box, [class*='badge'], label";
    var nodes = document.querySelectorAll(selectors);
    var pieces = [];
    var seenText = new Set();

    nodes.forEach(function (el) {
      if (hostEl && (hostEl === el || hostEl.contains(el))) return;
      if (el.closest && el.closest('[id="2all-ai-widget-host"]')) return;
      if (el.closest && el.closest("script, style, noscript, svg, nav, footer")) return;

      var text = (el.innerText || el.textContent || "").trim();
      if (text.length > 1 && !seenText.has(text)) {
        seenText.add(text);
        pieces.push({ el: el, text: text });
      }
    });

    if (pieces.length === 0) {
      var bodyText = (document.body.innerText || "").trim();
      if (bodyText) pieces.push({ el: document.body, text: bodyText });
    }

    var allChunks = [];
    pieces.forEach(function (piece) {
      var chunks = splitIntoSafeChunks(piece.text);
      if (chunks && chunks.length > 0) {
        chunks.forEach(function (chk) {
          allChunks.push({ text: chk, el: piece.el });
        });
      }
    });

    return allChunks;
  }

  // Live voice settings updater: instantly re-applies speed, pitch, voice, and volume to currently reading text
  function applyLiveVoiceSettings() {
    if (!("speechSynthesis" in window)) return;
    if (state.speechStatus !== "playing" && state.speechStatus !== "paused") return;
    if (!currentSpeechChunks || currentSpeechChunks.length === 0) return;

    var isPaused = (state.speechStatus === "paused");
    var targetIdx = Math.max(0, Math.min(currentSpeechChunkIndex, currentSpeechChunks.length - 1));
    speakChunks(currentSpeechChunks, targetIdx, isPaused);
  }

  // Unified Speech Dispatcher: Queues chunks cleanly without Chrome race conditions
  function speakChunks(chunks, startIndex, startPaused) {
    if (!("speechSynthesis" in window)) {
      showVoiceCommandToast("Speech Synthesis (TTS) is not supported in this browser.", false);
      return;
    }

    if (!chunks || chunks.length === 0) {
      showVoiceCommandToast("No readable text found on this page.", false);
      return;
    }

    currentSpeechChunks = chunks;
    var startIdx = (typeof startIndex === "number" && startIndex >= 0 && startIndex < chunks.length) ? startIndex : 0;
    currentSpeechChunkIndex = startIdx;

    if (speechDispatchTimer) {
      clearTimeout(speechDispatchTimer);
      speechDispatchTimer = null;
    }

    clearSpeechKeepAlive();
    clearSpeechHighlights();

    var wasSpeaking = (window.speechSynthesis.speaking || window.speechSynthesis.pending);
    if (wasSpeaking) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }

    state.speechStatus = startPaused ? "paused" : "playing";
    renderPanelBody();

    function executeSpeechQueue() {
      try {
        window.speechSynthesis.resume();
      } catch (e) {}

      var bestVoice = getBestVoice();
      var rate = Math.max(0.5, Math.min(2.0, state.speed || 1.0));
      var volume = Math.max(0.1, (state.volume !== undefined ? state.volume : 100) / 100);
      var pitch = 1.0;
      if (state.pitch === "low") pitch = 0.6;
      else if (state.pitch === "high") pitch = 1.4;

      speechUtterancesQueue = [];
      window.__2all_speech_queue = speechUtterancesQueue;

      var chunksToPlay = chunks.slice(startIdx);

      chunksToPlay.forEach(function (item, relIndex) {
        var absIndex = startIdx + relIndex;
        var chunkText = (item && typeof item === "object") ? item.text : item;
        var targetEl = (item && typeof item === "object") ? item.el : null;
        var utt = new SpeechSynthesisUtterance(chunkText);
        if (bestVoice) {
          utt.voice = bestVoice;
          if (bestVoice.lang) utt.lang = bestVoice.lang;
        } else {
          utt.lang = "en-US";
        }
        utt.rate = rate;
        utt.volume = volume;
        utt.pitch = pitch;

        // Auto Scroll & Sentence Highlight Trigger on Start
        utt.onstart = function () {
          currentSpeechChunkIndex = absIndex;
          clearSpeechHighlights();
          if (targetEl) {
            if (state.autoScroll && typeof targetEl.scrollIntoView === "function") {
              try {
                targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
              } catch (e) {}
            }
            if (state.highlightSentence) {
              currentSpeechEl = targetEl;
              originalSpeechOutline = targetEl.style.outline || "";
              originalSpeechBg = targetEl.style.backgroundColor || "";
              targetEl.style.outline = "2px solid " + primaryColor;
              targetEl.style.backgroundColor = hexToRgba(primaryColor, 0.08);
              targetEl.style.borderRadius = "4px";
              targetEl.style.transition = "background-color 0.2s, outline 0.2s";
            }
          }
        };

        if (relIndex === chunksToPlay.length - 1) {
          utt.onend = function () {
            clearSpeechHighlights();
            clearSpeechKeepAlive();
            state.speechStatus = "stopped";
            speechUtterancesQueue = [];
            window.__2all_speech_queue = [];
            activeUtterance = null;
            currentSpeechChunks = [];
            currentSpeechChunkIndex = 0;
            renderPanelBody();
          };
        } else {
          utt.onend = function () {
            clearSpeechHighlights();
          };
        }

        utt.onerror = function (err) {
          clearSpeechHighlights();
          if (err && (err.error === "canceled" || err.error === "interrupted")) return;
          console.warn("[2all.ai TTS] Utterance error:", err);
          if (relIndex === chunksToPlay.length - 1) {
            clearSpeechKeepAlive();
            state.speechStatus = "stopped";
            speechUtterancesQueue = [];
            window.__2all_speech_queue = [];
            activeUtterance = null;
            currentSpeechChunks = [];
            currentSpeechChunkIndex = 0;
            renderPanelBody();
          }
        };

        speechUtterancesQueue.push(utt);
      });

      if (speechUtterancesQueue.length > 0) {
        activeUtterance = speechUtterancesQueue[0];
        window.__2all_active_utterance = activeUtterance;

        speechUtterancesQueue.forEach(function (u) {
          window.speechSynthesis.speak(u);
        });

        if (startPaused) {
          try {
            window.speechSynthesis.pause();
          } catch (e) {}
          state.speechStatus = "paused";
        } else {
          window.speechSynthesis.resume();
          startSpeechKeepAlive();
        }
      } else {
        state.speechStatus = "stopped";
        renderPanelBody();
      }
    }

    if (wasSpeaking) {
      speechDispatchTimer = setTimeout(executeSpeechQueue, 60);
    } else {
      executeSpeechQueue();
    }
  }

  function readEntirePage() {
    if (!("speechSynthesis" in window)) {
      showVoiceCommandToast("Speech Synthesis (TTS) is not supported in this browser.", false);
      return;
    }

    if (state.speechStatus === "playing") {
      stopSpeech();
      return;
    }

    var chunks = getEntirePageChunks();
    if (!chunks || chunks.length === 0) {
      showVoiceCommandToast("No readable text found on this page.", false);
      return;
    }

    speakChunks(chunks, 0, false);
  }

  function readSelectedText() {
    if (!("speechSynthesis" in window)) return;
    var sel = window.getSelection();
    var text = (sel ? sel.toString() : "").trim();
    if (!text) {
      showVoiceCommandToast("Please highlight/select some text on the page first.", false);
      return;
    }

    var targetEl = (sel && sel.anchorNode) ? (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement) : null;
    var chunks = splitIntoSafeChunks(text);
    if (!chunks || chunks.length === 0) return;

    var items = chunks.map(function (c) {
      return { text: c, el: targetEl };
    });

    speakChunks(items, 0, false);
  }

  function pauseSpeech() {
    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.pause();
        state.speechStatus = "paused";
        renderPanelBody();
      } catch (e) {}
    }
  }

  function resumeSpeech() {
    if ("speechSynthesis" in window) {
      try {
        state.speechStatus = "playing";
        window.speechSynthesis.resume();
        renderPanelBody();
      } catch (e) {}
    }
  }

  function stopSpeech() {
    clearSpeechHighlights();
    clearSpeechKeepAlive();
    if (speechDispatchTimer) {
      clearTimeout(speechDispatchTimer);
      speechDispatchTimer = null;
    }
    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    speechUtterancesQueue = [];
    window.__2all_speech_queue = [];
    activeUtterance = null;
    currentSpeechChunks = [];
    currentSpeechChunkIndex = 0;
    state.speechStatus = "stopped";
    renderPanelBody();
  }

  // Auto read selection on mouseup if enabled
  document.addEventListener("mouseup", function () {
    if (!state.autoReadSelection) return;
    var sel = window.getSelection();
    var text = (sel ? sel.toString() : "").trim();
    if (text && text.length > 2) {
      readSelectedText();
    }
  });

  // DOM Live Injections & Effects Engine
  function updateGlobalStyle() {
    var styleEl = document.getElementById("2all-global-effects-style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "2all-global-effects-style";
      document.head.appendChild(styleEl);
    }

    var css = "";

    // 1. Typography (Dyslexic, Lexend, Readable, Spacing)
    if (state.fontFamily === "dyslexic" || state.dyslexiaFont || state.activeProfile === "dyslexia") {
      css += `
        @font-face {
          font-family: 'OpenDyslexic';
          src: url('https://fonts.cdnfonts.com/s/29616/open-dyslexic.woff') format('woff'),
               url('https://cdn.jsdelivr.net/gh/antijingoist/open-dyslexic@master/font/compiled/OpenDyslexic-Regular.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        html, body, p, span, h1, h2, h3, h4, h5, h6, a, div, li, td, th, input, button, select, label, article, section, main, header, footer {
          font-family: 'OpenDyslexic', 'Lexend', sans-serif !important;
          letter-spacing: ${state.letterSpacing || 0.5}px !important;
          word-spacing: ${state.wordSpacing || 0.05}em !important;
        }
      `;
    } else if (state.fontFamily === "lexend") {
      css += `
        html, body, p, span, h1, h2, h3, h4, h5, h6, a, div, li, td, th, input, button, select, label, article, section, main, header, footer {
          font-family: 'Lexend', sans-serif !important;
          letter-spacing: ${state.letterSpacing || 0.5}px !important;
          word-spacing: ${state.wordSpacing || 0.1}em !important;
        }
      `;
    } else if (state.fontFamily === "readable" || state.readableFont) {
      css += `
        html, body, p, span, h1, h2, h3, h4, h5, h6, a, div, li, td, th, input, button, select, label, article, section, main, header, footer {
          font-family: 'Atkinson Hyperlegible', Tahoma, Verdana, Arial, sans-serif !important;
          letter-spacing: ${state.letterSpacing || 0.5}px !important;
        }
      `;
    } else {
      if (state.letterSpacing > 0) {
        css += `html, body, p, span, h1, h2, h3, h4, h5, h6, a, div, li, td, th, input, button, select, label { letter-spacing: ${state.letterSpacing}px !important; }`;
      }
      if (state.wordSpacing > 0) {
        css += `html, body, p, span, h1, h2, h3, h4, h5, h6, a, div, li, td, th, input, button, select, label { word-spacing: ${state.wordSpacing}em !important; }`;
      }
    }

    // 2. Font Scaling (Scales full website smoothly without breaking widget container)
    if (state.fontSize && state.fontSize !== 100) {
      var scale = state.fontSize / 100;
      css += `
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) { zoom: ${scale} !important; }
        html { font-size: ${state.fontSize}% !important; }
      `;
    }

    // 3. Text Alignment
    if (state.textAlignment && state.textAlignment !== "default") {
      css += `body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) p, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) span, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h1, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h2, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h3, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h4, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h5, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h6, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) div, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) li { text-align: ${state.textAlignment} !important; }`;
    }

    // 4. Line Height
    if (state.lineHeight && state.lineHeight !== 1.5) {
      css += `body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) p, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) span, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h1, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h2, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h3, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) div, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) li { line-height: ${state.lineHeight} !important; }`;
    }

    // 5. Dark Contrast / Light Contrast
    if (state.isDarkMode) {
      css += `
        html, body { background-color: #0f172a !important; color: #f8fafc !important; }
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]), section, article, header, footer, main, nav, form, .card, .container, input, textarea { background-color: #1e293b !important; color: #f8fafc !important; border-color: #334155 !important; }
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) p, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) span, h1, h2, h3, h4, h5, h6, li, a, label, strong { color: #f8fafc !important; }
      `;
    } else if (state.isLightMode) {
      css += `
        html, body { background-color: #ffffff !important; color: #000000 !important; }
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]), section, article, header, footer, main, nav, form, .card, .container, input, textarea, div[class*="bg-"] { background-color: #ffffff !important; color: #000000 !important; border-color: #0f172a !important; }
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) p, body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) span, h1, h2, h3, h4, h5, h6, li, a, label, strong { color: #000000 !important; font-weight: 700 !important; }
        a:not(.btn) { color: #0037b3 !important; text-decoration: underline !important; }
      `;
    }

    // 6. Visual Filter Combination (Colorblind, Monochrome, Saturation, High Contrast)
    var filters = [];
    if (state.colorBlindMode && state.colorBlindMode !== "none") {
      if (state.colorBlindMode === "achromatopsia") {
        filters.push("grayscale(100%)");
      } else if (state.colorBlindMode === "protanopia") {
        filters.push("url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='p' color-interpolation-filters='sRGB'><feColorMatrix type='matrix' values='0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0'/></filter></svg>#p\")");
      } else if (state.colorBlindMode === "deuteranopia") {
        filters.push("url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='d' color-interpolation-filters='sRGB'><feColorMatrix type='matrix' values='0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0'/></filter></svg>#d\")");
      } else if (state.colorBlindMode === "tritanopia") {
        filters.push("url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='t' color-interpolation-filters='sRGB'><feColorMatrix type='matrix' values='0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0'/></filter></svg>#t\")");
      }
    }
    if (state.monochrome || state.saturationMode === "monochrome") {
      filters.push("grayscale(100%)");
    } else if (state.saturationMode === "low") {
      filters.push("saturate(35%) contrast(90%)");
    } else if (state.saturationMode === "high") {
      filters.push("saturate(200%)");
    }
    if (state.isHighContrast) {
      filters.push("contrast(150%) saturate(130%)");
    }
    if (filters.length > 0) {
      var fStr = filters.join(" ");
      css += `
        html { filter: ${fStr} !important; -webkit-filter: ${fStr} !important; }
      `;
    }

    // 7. Custom Colors & Background Adjustments
    var bgHexMap = {
      blue: "#dbeafe",
      purple: "#f3e8ff",
      red: "#fee2e2",
      orange: "#fef3c7",
      teal: "#ccfbf1",
      green: "#dcfce7",
      white: "#ffffff",
      black: "#0f172a"
    };

    if (state.bgColor && state.bgColor !== "default" && bgHexMap[state.bgColor]) {
      var chosenBg = bgHexMap[state.bgColor];
      var isDarkBg = (state.bgColor === "black");

      css += `
        html,
        body,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]),
        main,
        section,
        article,
        header,
        footer,
        nav,
        aside,
        form,
        .container,
        [class*="container"],
        [class*="wrapper"],
        [class*="section"],
        [class*="content"],
        [class*="Card"],
        [class*="card"],
        [class*="bg-"],
        [id*="content"],
        [id*="main"],
        [id*="app"],
        [id*="root"],
        [id="__next"] {
          background-color: ${chosenBg} !important;
          background-image: none !important;
        }
      `;

      if (isDarkBg) {
        css += `
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) p,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) span,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h1,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h2,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h3,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h4,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h5,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h6,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) li,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) a,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) label,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) strong,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) b,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) td,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) th {
            color: #f8fafc !important;
          }
          section, article, header, footer, main, nav, form, .card, [class*="card"] {
            border-color: #334155 !important;
          }
        `;
      } else {
        css += `
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) p,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) span,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) li,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) label,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) strong,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) b,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) td,
          body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) th {
            color: #0f172a !important;
          }
        `;
      }
    }

    var colorHexMap = {
      blue: "#0070f3", purple: "#7928ca", red: "#e00000", orange: "#f5a623",
      teal: "#00b4d8", green: "#10b981", white: "#ffffff", black: "#000000"
    };

    if (state.textColor && state.textColor !== "default" && colorHexMap[state.textColor]) {
      css += `
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) p,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) span,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) a,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) li,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) label,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) strong,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) b,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) td,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) th {
          color: ${colorHexMap[state.textColor]} !important;
          -webkit-text-fill-color: ${colorHexMap[state.textColor]} !important;
        }
      `;
    }

    if (state.titleColor && state.titleColor !== "default" && colorHexMap[state.titleColor]) {
      css += `
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h1,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h2,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h3,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h4,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h5,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h6,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h1 *,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h2 *,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h3 *,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h4 *,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h5 *,
        body > *:not([id="2all-ai-widget-host"]):not([id^="2all-"]) h6 * {
          color: ${colorHexMap[state.titleColor]} !important;
          -webkit-text-fill-color: ${colorHexMap[state.titleColor]} !important;
          background-image: none !important;
        }
      `;
    }

    // 8. Highlights
    if (state.highlightLinks) {
      css += `a, a * { background-color: #fef08a !important; color: #854d0e !important; text-decoration: underline !important; font-weight: 800 !important; }`;
    }
    if (state.highlightHeadings) {
      css += `h1, h2, h3, h4, h5, h6 { border-bottom: 3px solid ${primaryColor} !important; padding-bottom: 3px !important; background-color: ${hexToRgba(primaryColor, 0.08)} !important; }`;
    }
    if (state.highlightButtons) {
      css += `button, [role="button"], input[type="submit"], input[type="button"], a.btn { outline: 3px solid #16a34a !important; outline-offset: 3px !important; }`;
    }
    if (state.highlightFocus) {
      css += `*:focus, *:focus-visible, .twoall-focused-target { outline: 4px solid ${primaryColor} !important; outline-offset: 4px !important; box-shadow: 0 0 0 6px ${hexToRgba(primaryColor, 0.35)}, 0 0 18px ${hexToRgba(primaryColor, 0.45)} !important; border-radius: 8px !important; transition: outline 0.15s ease, box-shadow 0.15s ease !important; }`;
    }
    if (state.highlightHover) {
      css += `a:hover, button:hover, [role="button"]:hover, input:hover, select:hover { outline: 3px solid ${primaryColor} !important; outline-offset: 2px !important; }`;
    }

    // 9. Hide Images & Stop Animations
    if (state.hideImages) {
      css += `img, picture, figure, video, [style*="background-image"] { opacity: 0 !important; visibility: hidden !important; }`;
    }
    if (state.stopAnimations || state.reduceMotion) {
      css += `*, *::before, *::after { animation: none !important; transition: none !important; animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }`;
    }

    // 10. Cursor Sizing & Styles
    if (state.cursorSize === "large") {
      css += `html, body, a, button, input, select, textarea, div, p, span, h1, h2, h3, h4, h5, h6, li { cursor: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJibGFjayIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNNCA0bDE2IDE2LTYgMS04IDYtNi0yM3oiLz48L3N2Zz4='), auto !important; }`;
    } else if (state.cursorSize === "huge") {
      css += `html, body, a, button, input, select, textarea, div, p, span, h1, h2, h3, h4, h5, h6, li { cursor: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJibGFjayIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNNCA0bDE2IDE2LTYgMS04IDYtNi0yM3oiLz48L3N2Zz4='), auto !important; }`;
    }

    styleEl.textContent = css;
  }

  function updateReadingMask() {
    var maskTop = document.getElementById("2all-reading-mask-top");
    var maskBottom = document.getElementById("2all-reading-mask-bottom");
    if (state.readingMask) {
      if (!maskTop) {
        maskTop = document.createElement("div");
        maskTop.id = "2all-reading-mask-top";
        maskTop.style.cssText = "position:fixed;left:0;right:0;top:0;width:100vw;height:calc(50vh - 65px);background:rgba(0,0,0,0.65);pointer-events:none;z-index:2147483645;display:block;";
        document.body.appendChild(maskTop);
      }
      if (!maskBottom) {
        maskBottom = document.createElement("div");
        maskBottom.id = "2all-reading-mask-bottom";
        maskBottom.style.cssText = "position:fixed;left:0;right:0;top:calc(50vh + 65px);bottom:0;width:100vw;background:rgba(0,0,0,0.65);pointer-events:none;z-index:2147483645;display:block;";
        document.body.appendChild(maskBottom);
      }
      maskTop.style.display = "block";
      maskBottom.style.display = "block";

      if (!window.__2ALL_MASK_LISTENER__) {
        window.__2ALL_MASK_LISTENER__ = function (e) {
          if (!state.readingMask) return;
          var mTop = document.getElementById("2all-reading-mask-top");
          var mBottom = document.getElementById("2all-reading-mask-bottom");
          if (mTop && mBottom && mTop.style.display !== "none") {
            var y = e.clientY;
            mTop.style.height = Math.max(0, y - 65) + "px";
            mBottom.style.top = (y + 65) + "px";
          }
        };
        window.addEventListener("mousemove", window.__2ALL_MASK_LISTENER__, { passive: true });
      }
    } else {
      if (maskTop) maskTop.style.display = "none";
      if (maskBottom) maskBottom.style.display = "none";
      if (window.__2ALL_MASK_LISTENER__) {
        window.removeEventListener("mousemove", window.__2ALL_MASK_LISTENER__);
        window.__2ALL_MASK_LISTENER__ = null;
      }
    }
  }

  var lastMouseY = typeof window !== "undefined" ? (window.innerHeight / 2) : 300;
  if (typeof window !== "undefined" && !window.__2ALL_GLOBAL_MOUSE_TRACKER__) {
    window.__2ALL_GLOBAL_MOUSE_TRACKER__ = true;
    window.addEventListener("mousemove", function (e) {
      lastMouseY = e.clientY;
    }, { passive: true });
  }

  function updateReadingRuler() {
    var ruler = document.getElementById("2all-reading-ruler-line");
    if (state.readingRuler) {
      if (!ruler) {
        ruler = document.createElement("div");
        ruler.id = "2all-reading-ruler-line";
        document.body.appendChild(ruler);
      }
      var existingTop = ruler.style.top || (typeof lastMouseY !== "undefined" ? (lastMouseY + "px") : "50vh");
      ruler.style.cssText = "position:fixed !important;left:0 !important;right:0 !important;width:100vw !important;height:20vh !important;background-color:rgba(255,255,0,0.2) !important;border-top:2px solid rgba(255,200,0,0.8) !important;border-bottom:2px solid rgba(255,200,0,0.8) !important;pointer-events:none !important;z-index:2147483646 !important;transform:translateY(-50%) !important;box-sizing:border-box !important;display:block !important;top:" + existingTop + ";";

      if (!window.__2ALL_RULER_LISTENER__) {
        window.__2ALL_RULER_LISTENER__ = function (e) {
          lastMouseY = e.clientY;
          if (!state.readingRuler) return;
          var r = document.getElementById("2all-reading-ruler-line");
          if (r && r.style.display !== "none") {
            r.style.top = e.clientY + "px";
          }
        };
        window.addEventListener("mousemove", window.__2ALL_RULER_LISTENER__, { passive: true });
      }
    } else {
      if (ruler) ruler.style.display = "none";
      if (window.__2ALL_RULER_LISTENER__) {
        window.removeEventListener("mousemove", window.__2ALL_RULER_LISTENER__);
        window.__2ALL_RULER_LISTENER__ = null;
      }
    }
  }

  function updateTextMagnifier() {
    var popup = document.getElementById("2all-text-magnifier-popup");
    if (state.textMagnifier) {
      if (!popup) {
        popup = document.createElement("div");
        popup.id = "2all-text-magnifier-popup";
        popup.style.cssText = "position:fixed;pointer-events:none;z-index:2147483647;background:#0f172a;color:#ffffff;padding:12px 18px;border-radius:14px;font-size:20px;font-weight:700;box-shadow:0 12px 35px rgba(0,0,0,0.45);border:2px solid " + primaryColor + ";display:none;max-width:380px;word-break:break-word;line-height:1.4;";
        document.body.appendChild(popup);
      }

      if (!window.__2ALL_MAGNIFIER_LISTENER__) {
        window.__2ALL_MAGNIFIER_LISTENER__ = function (e) {
          var p = document.getElementById("2all-text-magnifier-popup");
          if (!p) return;
          if (!state.textMagnifier) {
            p.style.display = "none";
            return;
          }
          var target = e.target;
          if (target && target.innerText && target.innerText.trim() && target.id !== "2all-text-magnifier-popup" && !target.closest('[id="2all-ai-widget-host"]')) {
            var text = target.innerText.trim();
            if (text.length > 0 && text.length < 300) {
              p.innerHTML = '<div style="font-size:10px;color:#60a5fa;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Magnifier Preview</div>' + text;
              p.style.display = "block";
              p.style.left = Math.min(window.innerWidth - 390, Math.max(10, e.clientX + 20)) + "px";
              p.style.top = Math.min(window.innerHeight - 120, Math.max(10, e.clientY + 20)) + "px";
              return;
            }
          }
          p.style.display = "none";
        };
        window.addEventListener("mousemove", window.__2ALL_MAGNIFIER_LISTENER__, { passive: true });
      }
    } else {
      if (popup) {
        popup.style.display = "none";
        try { popup.remove(); } catch (e) {}
      }
      if (window.__2ALL_MAGNIFIER_LISTENER__) {
        window.removeEventListener("mousemove", window.__2ALL_MAGNIFIER_LISTENER__);
        window.__2ALL_MAGNIFIER_LISTENER__ = null;
      }
    }
  }

  function updateTextToSpeech() {
    if (state.textToSpeech || state.autoReadSelection) {
      if (!window.__2ALL_TTS_INITIALIZED__) {
        window.__2ALL_TTS_INITIALIZED__ = true;
        
        document.addEventListener("mouseover", function (e) {
          if (!state.textToSpeech) return;
          var target = e.target;
          if (target && target.innerText && target.innerText.trim() && !target.closest('[id="2all-ai-widget-host"]')) {
            target.style.outline = "2px dashed " + primaryColor;
            target.style.outlineOffset = "3px";
            target.style.cursor = "pointer";
          }
        });

        document.addEventListener("mouseout", function (e) {
          var target = e.target;
          if (target && !target.closest('[id="2all-ai-widget-host"]')) {
            target.style.outline = "";
            target.style.outlineOffset = "";
            target.style.cursor = "";
          }
        });

        document.addEventListener("click", function (e) {
          if (!state.textToSpeech) return;
          var target = e.target;
          if (target && target.innerText && target.innerText.trim() && !target.closest('[id="2all-ai-widget-host"]')) {
            var text = target.innerText.trim();
            if ("speechSynthesis" in window && text.length > 0 && text.length < 1000) {
              e.preventDefault();
              e.stopPropagation();
              window.speechSynthesis.cancel();
              window.speechSynthesis.resume();
              var utterance = new SpeechSynthesisUtterance(text);
              utterance.lang = "en-US";
              utterance.rate = 1.0;
              window.speechSynthesis.speak(utterance);
            }
          }
        }, true);

        document.addEventListener("mouseup", function () {
          if (!state.autoReadSelection) return;
          var selected = window.getSelection() ? window.getSelection().toString().trim() : "";
          if (selected && "speechSynthesis" in window && selected.length > 0) {
            window.speechSynthesis.cancel();
            window.speechSynthesis.resume();
            var utterance = new SpeechSynthesisUtterance(selected);
            utterance.lang = "en-US";
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
          }
        });
      }
    } else {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  }

  function updateMuteSounds() {
    try {
      var mediaEls = document.querySelectorAll("audio, video");
      mediaEls.forEach(function (el) {
        el.muted = !!state.muteSounds;
      });
    } catch (e) {}
  }

  function updateFocusHighlight() {
    var toast = document.getElementById("2all-focus-highlight-toast");
    if (state.highlightFocus) {
      if (!toast) {
        toast = document.createElement("div");
        toast.id = "2all-focus-highlight-toast";
        toast.style.cssText = "position:fixed;top:24px;left:50%;transform:translateX(-50%);background:" + primaryColor + ";color:#ffffff;padding:8px 20px;border-radius:9999px;font-size:12px;font-weight:800;font-family:sans-serif;box-shadow:0 8px 25px " + hexToRgba(primaryColor, 0.45) + ";z-index:2147483647;pointer-events:none;display:flex;align-items:center;gap:8px;";
        toast.innerHTML = '<span style="width:8px;height:8px;border-radius:50%;background:#ffffff;display:inline-block;"></span> Focus Highlight Active — Click any element or press Tab';
        document.body.appendChild(toast);
      }
      toast.style.display = "flex";

      if (!window.__2ALL_FOCUS_LISTENER__) {
        window.__2ALL_FOCUS_LISTENER__ = {
          handleFocus: function (e) {
            var target = e.target;
            if (!target || target.closest('[id="2all-ai-widget-host"]')) return;
            document.querySelectorAll(".twoall-focused-target").forEach(function (el) {
              if (el !== target) el.classList.remove("twoall-focused-target");
            });
            target.classList.add("twoall-focused-target");
          },
          handleClick: function (e) {
            var target = e.target;
            if (!target || target.closest('[id="2all-ai-widget-host"]')) return;
            var focusable = target.closest("button, a, input, select, textarea, [tabindex], h1, h2, h3, h4, p, li, [role='button']") || target;
            if (focusable) {
              document.querySelectorAll(".twoall-focused-target").forEach(function (el) {
                if (el !== focusable) el.classList.remove("twoall-focused-target");
              });
              focusable.classList.add("twoall-focused-target");
            }
          }
        };

        window.addEventListener("focusin", window.__2ALL_FOCUS_LISTENER__.handleFocus, true);
        window.addEventListener("click", window.__2ALL_FOCUS_LISTENER__.handleClick, true);
      }

      // Immediately highlight first prominent CTA or heading
      setTimeout(function () {
        var heroBtn = document.querySelector(".btn, button:not([id*='2all']), a.btn, h1, [role='button']");
        if (heroBtn && !heroBtn.closest('[id="2all-ai-widget-host"]')) {
          heroBtn.classList.add("twoall-focused-target");
        }
      }, 50);

    } else {
      if (toast) {
        toast.style.display = "none";
        try { toast.remove(); } catch (e) {}
      }
      if (window.__2ALL_FOCUS_LISTENER__) {
        window.removeEventListener("focusin", window.__2ALL_FOCUS_LISTENER__.handleFocus, true);
        window.removeEventListener("click", window.__2ALL_FOCUS_LISTENER__.handleClick, true);
        window.__2ALL_FOCUS_LISTENER__ = null;
      }
      document.querySelectorAll(".twoall-focused-target").forEach(function (el) {
        el.classList.remove("twoall-focused-target");
      });
    }
  }

  // ========================================================
  // VOICE COMMAND NAVIGATION ENGINE (Web Speech Recognition)
  // ========================================================
  var voiceRecInstance = null;
  var voiceNavRestartTimer = null;

  function showVoiceCommandToast(message, isHeard) {
    var toast = document.getElementById("2all-voice-command-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "2all-voice-command-toast";
      toast.style.cssText = "position:fixed;top:68px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.95);color:#38bdf8;padding:7px 18px;border-radius:9999px;font-size:12px;font-weight:800;font-family:system-ui,-apple-system,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.35);border:1px solid rgba(56,189,248,0.7);z-index:2147483647;pointer-events:none;display:flex;align-items:center;gap:8px;backdrop-filter:blur(8px);transition:opacity 0.25s ease;";
      document.body.appendChild(toast);
    }
    toast.innerHTML = (isHeard ? '<span style="font-size:14px;">✨</span> ' : '<span style="width:7px;height:7px;border-radius:50%;background:#38bdf8;display:inline-block;"></span> ') + message;
    toast.style.display = "flex";
    toast.style.opacity = "1";

    if (window.__2ALL_VOICE_TOAST_TIMER__) clearTimeout(window.__2ALL_VOICE_TOAST_TIMER__);
    window.__2ALL_VOICE_TOAST_TIMER__ = setTimeout(function () {
      if (toast) {
        toast.style.opacity = "0";
        setTimeout(function () {
          if (toast && toast.style.opacity === "0") toast.style.display = "none";
        }, 250);
      }
    }, 3800);
  }

  function executeVoiceNavigationCommand(rawTranscript) {
    if (!rawTranscript) return;
    var transcript = rawTranscript.toLowerCase().trim();
    console.log("[2all.ai Voice Navigation Command]:", transcript);

    showVoiceCommandToast('Command: "' + rawTranscript + '"', true);

    // 1. Scroll Commands
    if (transcript.indexOf("scroll down") !== -1 || transcript === "down" || transcript.indexOf("page down") !== -1 || transcript.indexOf("go down") !== -1) {
      window.scrollBy({ top: 450, behavior: "smooth" });
      showVoiceCommandToast('Scrolled Down', true);
      return;
    }
    if (transcript.indexOf("scroll up") !== -1 || transcript === "up" || transcript.indexOf("page up") !== -1 || transcript.indexOf("go up") !== -1) {
      window.scrollBy({ top: -450, behavior: "smooth" });
      showVoiceCommandToast('Scrolled Up', true);
      return;
    }
    if (transcript.indexOf("top") !== -1 || transcript.indexOf("scroll to top") !== -1 || transcript.indexOf("go to top") !== -1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      showVoiceCommandToast('Scrolled to Top', true);
      return;
    }
    if (transcript.indexOf("bottom") !== -1 || transcript.indexOf("scroll to bottom") !== -1 || transcript.indexOf("go to bottom") !== -1) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      showVoiceCommandToast('Scrolled to Bottom', true);
      return;
    }

    // 2. Speech & Reading Controls
    if (transcript.indexOf("read page") !== -1 || transcript.indexOf("read aloud") !== -1 || transcript.indexOf("read website") !== -1 || transcript.indexOf("start reading") !== -1) {
      readEntirePage();
      showVoiceCommandToast('Started Reading Page', true);
      return;
    }
    if (transcript.indexOf("stop reading") !== -1 || transcript === "stop" || transcript.indexOf("pause reading") !== -1 || transcript === "pause") {
      stopSpeaking();
      showVoiceCommandToast('Stopped Reading', true);
      return;
    }

    // 3. Widget Controls
    if (transcript.indexOf("close menu") !== -1 || transcript.indexOf("close panel") !== -1 || transcript.indexOf("close widget") !== -1 || transcript.indexOf("close accessibility") !== -1) {
      closePanel();
      showVoiceCommandToast('Closed Accessibility Panel', true);
      return;
    }
    if (transcript.indexOf("open menu") !== -1 || transcript.indexOf("open panel") !== -1 || transcript.indexOf("open widget") !== -1 || transcript.indexOf("open accessibility") !== -1) {
      openPanel();
      showVoiceCommandToast('Opened Accessibility Panel', true);
      return;
    }
    if (transcript.indexOf("reset") !== -1 || transcript.indexOf("reset settings") !== -1 || transcript.indexOf("reset accessibility") !== -1) {
      resetSettings();
      showVoiceCommandToast('Reset All Settings', true);
      return;
    }

    // 4. Contrast & Theme Controls
    if (transcript.indexOf("dark mode") !== -1 || transcript.indexOf("dark contrast") !== -1) {
      state.isDarkMode = !state.isDarkMode;
      state.isLightMode = false;
      state.isHighContrast = false;
      saveState(); renderPanelBody(); applyEffects();
      showVoiceCommandToast('Toggled Dark Mode', true);
      return;
    }
    if (transcript.indexOf("high contrast") !== -1 || transcript === "contrast") {
      state.isHighContrast = !state.isHighContrast;
      state.isDarkMode = false;
      state.isLightMode = false;
      saveState(); renderPanelBody(); applyEffects();
      showVoiceCommandToast('Toggled High Contrast', true);
      return;
    }

    // 5. DOM Target Element Search & Navigation (links, buttons, headings, sections)
    var cleanQuery = transcript
      .replace(/^(go to|navigate to|open|click|jump to|show me|find|scroll to|press|select)\s+/i, "")
      .replace(/\s+(page|button|link|section|tab)$/i, "")
      .trim();

    if (!cleanQuery) cleanQuery = transcript;

    var targetElement = null;
    var matchReason = "";

    // 5a. Match element by id
    var elById = document.getElementById(cleanQuery) || document.querySelector('[id*="' + cleanQuery + '"]');
    if (elById && !elById.closest('[id="2all-ai-widget-host"]')) {
      targetElement = elById;
      matchReason = 'id "' + cleanQuery + '"';
    }

    // 5b. Match links and buttons by text or href
    if (!targetElement) {
      var clickables = Array.from(document.querySelectorAll("a, button, [role='button'], input[type='submit']"));
      for (var i = 0; i < clickables.length; i++) {
        var c = clickables[i];
        if (c.closest('[id="2all-ai-widget-host"]')) continue;
        var text = (c.innerText || c.getAttribute("aria-label") || c.getAttribute("title") || c.getAttribute("alt") || "").toLowerCase().trim();
        var href = (c.getAttribute("href") || "").toLowerCase().trim();
        if (text && (text === cleanQuery || text.indexOf(cleanQuery) !== -1 || cleanQuery.indexOf(text) !== -1)) {
          targetElement = c;
          matchReason = 'Link/Button "' + (c.innerText || cleanQuery).trim().substring(0, 25) + '"';
          break;
        }
        if (href && href.indexOf(cleanQuery) !== -1) {
          targetElement = c;
          matchReason = 'Link: "' + href.substring(0, 25) + '"';
          break;
        }
      }
    }

    // 5c. Match headings
    if (!targetElement) {
      var headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6, .heading, [class*='title']"));
      for (var j = 0; j < headings.length; j++) {
        var h = headings[j];
        if (h.closest('[id="2all-ai-widget-host"]')) continue;
        var hText = (h.innerText || "").toLowerCase().trim();
        if (hText && (hText.indexOf(cleanQuery) !== -1 || cleanQuery.indexOf(hText) !== -1)) {
          targetElement = h;
          matchReason = 'Heading "' + h.innerText.trim().substring(0, 25) + '"';
          break;
        }
      }
    }

    // 5d. Match sections
    if (!targetElement) {
      var sections = Array.from(document.querySelectorAll("section, main, article, footer, header, nav, div[class*='card']"));
      for (var k = 0; k < sections.length; k++) {
        var s = sections[k];
        if (s.closest('[id="2all-ai-widget-host"]')) continue;
        var sText = (s.innerText || "").toLowerCase();
        if (sText && sText.indexOf(cleanQuery) !== -1 && s.children.length < 8) {
          targetElement = s;
          matchReason = 'Section "' + cleanQuery + '"';
          break;
        }
      }
    }

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });

      var prevOutline = targetElement.style.outline;
      var prevOffset = targetElement.style.outlineOffset;
      var prevTransition = targetElement.style.transition;
      targetElement.style.outline = "3px solid " + primaryColor;
      targetElement.style.outlineOffset = "3px";
      targetElement.style.transition = "outline 0.3s ease";
      setTimeout(function () {
        targetElement.style.outline = prevOutline;
        targetElement.style.outlineOffset = prevOffset;
        targetElement.style.transition = prevTransition;
      }, 3000);

      var anchor = (targetElement.tagName.toLowerCase() === "a" ? targetElement : targetElement.closest("a") || targetElement.querySelector("a"));
      var hrefAttr = anchor ? anchor.getAttribute("href") : null;

      if (anchor && hrefAttr && hrefAttr !== "#" && hrefAttr.indexOf("javascript:") === -1) {
        showVoiceCommandToast('Opening link "' + cleanQuery + '"...', true);
        setTimeout(function () {
          anchor.click();
        }, 500);
      } else if (targetElement.tagName.toLowerCase() === "button" || targetElement.getAttribute("role") === "button") {
        showVoiceCommandToast('Clicked "' + (targetElement.innerText || cleanQuery).trim().substring(0, 25) + '"', true);
        setTimeout(function () {
          targetElement.click();
        }, 400);
      } else {
        showVoiceCommandToast('Jumped to ' + matchReason, true);
      }
    } else {
      showVoiceCommandToast('Heard: "' + rawTranscript + '"', true);
    }
  }

  function updateVoiceNavigation() {
    var banner = document.getElementById("2all-voice-nav-banner");
    var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (state.voiceNavigation) {
      // 1. Create or show Floating Voice Command Navigation Overlay Banner
      if (!banner) {
        banner = document.createElement("div");
        banner.id = "2all-voice-nav-banner";
        banner.style.cssText = "position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:2147483647;display:flex;align-items:center;gap:10px;background:rgba(15,23,42,0.96);color:#ffffff;padding:8px 16px;border-radius:9999px;border:1px solid rgba(59,130,246,0.5);box-shadow:0 12px 35px rgba(0,0,0,0.4);font-family:system-ui,-apple-system,sans-serif;font-size:12px;font-weight:700;backdrop-filter:blur(10px);user-select:none;transition:all 0.25s ease;";
        banner.innerHTML = `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;width:12px;height:12px;">
            <span style="position:absolute;width:10px;height:10px;border-radius:50%;background:#06b6d4;opacity:0.75;"></span>
            <span style="position:relative;width:8px;height:8px;border-radius:50%;background:#06b6d4;"></span>
          </div>
          <span style="color:#93c5fd;font-size:11px;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;">Voice Navigation Active</span>
          <span style="color:#cbd5e1;font-size:11px;font-weight:500;" class="twoall-voice-hint">Say <strong style="color:#ffffff;">"scroll down"</strong>, <strong style="color:#ffffff;">"top"</strong>, <strong style="color:#ffffff;">"read page"</strong></span>
          <form id="2all-voice-nav-form" style="display:flex;align-items:center;gap:5px;margin:0;padding:0;">
            <input id="2all-voice-nav-input" type="text" placeholder="Type or say command..." style="background:rgba(30,41,59,0.9);color:#ffffff;border:1px solid #334155;border-radius:8px;padding:4px 10px;font-size:11px;outline:none;width:140px;" />
            <button id="2all-voice-mic-btn" type="button" style="background:#0891b2;color:#ffffff;border:none;border-radius:8px;padding:4px 8px;font-size:11px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:4px;" title="Click and speak">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
              SPEAK
            </button>
            <button type="submit" style="background:${primaryColor};color:#ffffff;border:none;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:800;cursor:pointer;">GO</button>
          </form>
          <button id="2all-voice-nav-close" style="background:none;border:none;color:#94a3b8;font-size:18px;font-weight:bold;cursor:pointer;padding:0 4px;margin-left:4px;line-height:1;" title="Turn off Voice Navigation">&times;</button>
        `;
        document.body.appendChild(banner);

        var closeBtn = banner.querySelector('[id="2all-voice-nav-close"]');
        if (closeBtn) {
          closeBtn.onclick = function () {
            state.voiceNavigation = false;
            saveState();
            renderPanelBody();
            applyEffects();
          };
        }

        var form = banner.querySelector('[id="2all-voice-nav-form"]');
        var input = banner.querySelector('[id="2all-voice-nav-input"]');
        if (form && input) {
          form.onsubmit = function (e) {
            e.preventDefault();
            var val = input.value.trim();
            if (val) {
              executeVoiceNavigationCommand(val);
              input.value = "";
            }
          };
        }

        var micBtn = banner.querySelector('[id="2all-voice-mic-btn"]');
        if (micBtn) {
          micBtn.onclick = function () {
            showVoiceCommandToast("Listening for voice... Speak now!", false);
            if (voiceRecInstance) {
              try { voiceRecInstance.start(); } catch (e) {}
            }
          };
        }
      }
      banner.style.display = "flex";

      if (!SpeechRec) {
        showVoiceCommandToast("Browser speech recognition API not available. You can use typed commands above.", false);
        return;
      }

      // 2. Initialize SpeechRecognition Instance
      if (!voiceRecInstance) {
        try {
          voiceRecInstance = new SpeechRec();
          voiceRecInstance.continuous = false;
          voiceRecInstance.interimResults = true;
          voiceRecInstance.lang = "en-US";

          voiceRecInstance.onstart = function () {
            showVoiceCommandToast("Listening for voice commands...", false);
          };

          voiceRecInstance.onresult = function (event) {
            var interim = "";
            var finalSpeech = "";
            for (var i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalSpeech += event.results[i][0].transcript;
              } else {
                interim += event.results[i][0].transcript;
              }
            }
            if (interim.trim()) {
              showVoiceCommandToast('Hearing: "' + interim.trim() + '"...', false);
            }
            if (finalSpeech.trim()) {
              executeVoiceNavigationCommand(finalSpeech.trim());
            }
          };

          voiceRecInstance.onerror = function (e) {
            if (e.error === "not-allowed" || e.error === "service-not-allowed") {
              showVoiceCommandToast("Microphone access blocked. Please allow mic in browser.", false);
            } else if (e.error === "audio-capture") {
              showVoiceCommandToast("No microphone detected on your device.", false);
            } else if (e.error !== "no-speech") {
              console.warn("[2all.ai Voice Navigation Error]:", e.error);
            }
          };

          voiceRecInstance.onend = function () {
            if (state.voiceNavigation) {
              if (voiceNavRestartTimer) clearTimeout(voiceNavRestartTimer);
              voiceNavRestartTimer = setTimeout(function () {
                try {
                  if (state.voiceNavigation && voiceRecInstance) {
                    voiceRecInstance.start();
                  }
                } catch (err) {}
              }, 200);
            }
          };

          voiceRecInstance.start();
        } catch (err) {
          console.error("[2all.ai Voice Navigation] Failed to start:", err);
        }
      }

    } else {
      // Deactivate Voice Navigation
      if (banner) {
        banner.style.display = "none";
        try { banner.remove(); } catch (e) {}
      }
      var toast = document.getElementById("2all-voice-command-toast");
      if (toast) {
        toast.style.display = "none";
        try { toast.remove(); } catch (e) {}
      }
      if (voiceNavRestartTimer) {
        clearTimeout(voiceNavRestartTimer);
        voiceNavRestartTimer = null;
      }
      if (voiceRecInstance) {
        try { voiceRecInstance.stop(); } catch (e) {}
        voiceRecInstance = null;
      }
    }
  }

  function applyEffects() {
    ensureSvgFilters();
    updateGlobalStyle();
    updateReadingMask();
    updateReadingRuler();
    updateTextMagnifier();
    updateTextToSpeech();
    updateMuteSounds();
    updateFocusHighlight();
    updateVoiceNavigation();
  }

  // Initial Render & Apply (Always start on Home / dashboard tab like original site)
  switchTab("dashboard");
  applyEffects();
})();
