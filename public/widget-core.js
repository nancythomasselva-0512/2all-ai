/**
 * 2all.ai Universal Accessibility Suite & AI Assistant Engine
 * Version: 11.0.0
 * Pure Universal Vanilla JS - Works on ANY website (WordPress, Shopify, React, HTML, PHP, Angular, Webflow, etc.)
 * 1:1 Pixel-Perfect Replica of 2all.ai Website Accessibility Toolbar (DashboardSection & AccessibilityPanel).
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
    fontFamily: "default", // default, readable, dyslexic
    readableFont: false,
    dyslexiaFont: false,
    letterSpacing: 0, // px
    lineHeight: 1.5, // multiplier
    wordSpacing: 0, // em
    textAlignment: "default", // default, left, center, right, justify
    textMagnifier: false,

    // Visual & Color Contrast
    isHighContrast: false,
    isDarkMode: false,
    isLightMode: false,
    isSmartContrast: false,
    monochrome: false,
    colorBlindMode: "none", // none, protanopia, deuteranopia, tritanopia
    saturationMode: "normal", // normal, high, low, monochrome
    textColor: "default",
    titleColor: "default",
    bgColor: "default",

    // Focus & Reading Overlays
    readingMask: false,
    readingRuler: false,
    highlightLinks: false,
    highlightHeadings: false,
    highlightButtons: false,
    highlightFocus: false,
    highlightHover: false,
    reduceMotion: false,
    stopAnimations: false,
    cursorSize: "normal", // normal, large, huge
    cursorColor: "default", // default, black, white

    // Speech & Voice Narration
    textToSpeech: false,

    // AI Assistant Chat Messages
    aiMessages: [
      {
        from: "alex",
        text: "Hi! I'm your 2all.ai accessibility assistant. How can I help make this website accessible for you today?",
      },
    ],
  };

  // Restore State from LocalStorage
  try {
    var saved = localStorage.getItem("2all_universal_suite_v11");
    if (saved) {
      var parsed = JSON.parse(saved);
      state = Object.assign(state, parsed);
      state.open = false;
      state.showStatement = false;
    }
  } catch (e) {}

  function saveState() {
    try {
      localStorage.setItem("2all_universal_suite_v11", JSON.stringify(state));
    } catch (e) {}
  }

  // Host Container & Shadow DOM Setup
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

  // Colorblind SVG Matrix Filters Injection to Document Body
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
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
    `;
    document.body.appendChild(svgDiv);
  }

  // Inject OpenDyslexic Font Stylesheet and @font-face to Document Head
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

  // Shadow DOM Internal Styles - 100% Matching Screenshot UI
  var style = document.createElement("style");
  style.textContent = `
    :host, :host *, *, *::before, *::after {
      box-sizing: border-box !important;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
      -webkit-font-smoothing: antialiased;
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
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0055ff 0%, #003edb 100%);
      color: #ffffff;
      border: 2px solid rgba(255, 255, 255, 0.35);
      box-shadow: 0 10px 25px rgba(0, 85, 255, 0.45), 0 4px 10px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      outline: none;
    }
    .trigger-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 12px 30px rgba(0, 85, 255, 0.6);
    }
    .trigger-btn svg { width: 28px; height: 28px; stroke: white; fill: none; stroke-width: 2.2; }

    /* Main Modal Panel Container (Screenshot 1 Exact Layout) */
    .panel-container {
      position: absolute;
      bottom: 68px;
      right: 0px;
      width: 440px;
      height: 620px;
      max-height: calc(100vh - 4.5rem);
      background: #ffffff;
      border: 1px solid rgba(0, 85, 255, 0.2);
      border-radius: 28px;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 85, 255, 0.08);
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

    /* Top Royal Blue Header (Matching Screenshot) */
    .panel-header-blue {
      background: linear-gradient(135deg, #0055ff 0%, #0041c2 100%);
      color: #ffffff;
      padding: 16px 16px 14px 16px;
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
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.15);
      border: none;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s;
    }
    .btn-close-circle:hover { background: rgba(255, 255, 255, 0.3); }

    .lang-pill {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 800;
      background: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 4px 10px;
      border-radius: 20px;
      cursor: pointer;
      color: #ffffff;
    }

    .header-main-title {
      font-size: 20px;
      font-weight: 900;
      text-align: center;
      letter-spacing: -0.3px;
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
      color: #0055ff;
      border: 1px solid #dbeafe;
      border-radius: 20px;
      padding: 7px 8px;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: all 0.15s;
    }
    .header-action-pill:hover { background: #eff6ff; transform: translateY(-1px); }
    .header-action-pill svg { width: 13px; height: 13px; stroke-width: 2.5; }

    /* Search Bar */
    .search-container {
      padding: 10px 14px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      position: relative;
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
    .search-input-field:focus { border-color: #0055ff; }
    .search-input-field::placeholder { color: #94a3b8; font-weight: 500; }

    /* Panel Scrollable Body */
    .panel-body-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 14px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* AI Assistant Card (Screenshot 1) */
    .ai-assistant-banner {
      background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
      border: 1px solid #bfdbfe;
      border-radius: 18px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .ai-banner-left { display: flex; align-items: center; gap: 12px; }
    .ai-banner-icon {
      width: 36px;
      height: 36px;
      border-radius: 12px;
      background: #0055ff;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(0, 85, 255, 0.25);
    }
    .ai-banner-icon svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.2; }
    .ai-banner-title { font-size: 13px; font-weight: 800; color: #1e3a8a; }
    .ai-banner-sub { font-size: 11px; color: #475569; font-weight: 600; margin-top: 2px; }
    .ai-banner-btn {
      background: #ffffff;
      color: #0055ff;
      border: 1px solid #bfdbfe;
      padding: 6px 12px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      transition: all 0.15s;
    }
    .ai-banner-btn:hover { background: #0055ff; color: #ffffff; border-color: #0055ff; }

    /* AI Suggestion Card (Screenshot 1) */
    .ai-suggestion-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 18px;
      padding: 14px;
      position: relative;
      display: flex;
      gap: 12px;
    }
    .ai-sug-avatar {
      width: 36px;
      height: 36px;
      border-radius: 12px;
      background: #0055ff;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .ai-sug-avatar svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2.2; }
    .ai-sug-content { flex: 1; }
    .ai-sug-title {
      font-size: 13px;
      font-weight: 800;
      color: #1e3a8a;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ai-sug-desc {
      font-size: 11.5px;
      color: #334155;
      font-weight: 600;
      line-height: 1.4;
      margin: 6px 0 10px 0;
    }
    .ai-sug-btn {
      background: #ffffff;
      color: #0055ff;
      border: 1px solid #bfdbfe;
      padding: 6px 16px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: all 0.15s;
    }
    .ai-sug-btn:hover { background: #0055ff; color: #ffffff; border-color: #0055ff; }

    /* Section Label */
    .section-heading-text {
      font-size: 11px;
      font-weight: 900;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-top: 4px;
    }

    /* Quick Actions 2x2 Grid (Screenshot 1) */
    .quick-actions-2x2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .action-card-btn {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      padding: 16px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
    }
    .action-card-btn:hover { border-color: #0055ff; transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0, 85, 255, 0.12); }
    .action-card-btn.active {
      background: #eff6ff;
      border-color: #0055ff;
      box-shadow: 0 4px 14px rgba(0, 85, 255, 0.18);
    }
    .action-card-icon-slot {
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .action-card-title {
      font-size: 12px;
      font-weight: 800;
      color: #0f172a;
      text-align: center;
    }

    /* Explore Banner */
    .explore-modes-banner {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
    }
    .explore-modes-banner:hover { border-color: #0055ff; transform: translateY(-1px); }
    .explore-modes-title { font-size: 12.5px; font-weight: 800; color: #0f172a; }
    .explore-modes-sub { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 1px; }
    .explore-modes-arrow { font-size: 16px; font-weight: 900; color: #0055ff; }

    /* Bottom Action Bar (Reset Settings & Hide Forever) */
    .bottom-action-row {
      padding: 10px 14px;
      background: #ffffff;
      border-top: 1px solid #f1f5f9;
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .btn-reset-bottom {
      flex: 1;
      padding: 10px 14px;
      background: #0055ff;
      color: #ffffff;
      font-size: 12px;
      font-weight: 800;
      border-radius: 14px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-shadow: 0 2px 8px rgba(0, 85, 255, 0.25);
      transition: background 0.15s;
    }
    .btn-reset-bottom:hover { background: #0045d6; }
    .btn-reset-bottom svg { width: 14px; height: 14px; stroke-width: 2.5; }

    .btn-hide-bottom {
      flex: 1;
      padding: 10px 14px;
      background: #f8fafc;
      color: #334155;
      font-size: 12px;
      font-weight: 800;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
      cursor: pointer;
      text-align: center;
      transition: background 0.15s;
    }
    .btn-hide-bottom:hover { background: #f1f5f9; }

    /* Bottom 5 Icon Navigation Tabs (Screenshot 1) */
    .bottom-nav-5 {
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      padding: 4px 8px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .nav-tab-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 58px;
      height: 42px;
      border-radius: 10px;
      border: none;
      background: transparent;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s;
    }
    .nav-tab-btn.active { color: #0055ff; background: #eff6ff; font-weight: 800; }
    .nav-tab-btn svg { width: 17px; height: 17px; margin-bottom: 2px; }
    .nav-tab-btn span { font-size: 9.5px; font-weight: 700; letter-spacing: -0.2px; }

    /* Profiles / Modes List */
    .profile-card-item {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 12px 14px;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 8px;
    }
    .profile-card-item.active {
      background: #eff6ff;
      border-color: #0055ff;
      box-shadow: 0 4px 12px rgba(0, 85, 255, 0.12);
    }
    .profile-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .profile-title { font-size: 13px; font-weight: 800; color: #0f172a; }
    .profile-desc { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 2px; }
    .toggle-switch-ui {
      width: 42px;
      height: 24px;
      border-radius: 12px;
      background: #e2e8f0;
      padding: 2px;
      transition: background 0.2s;
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }
    .toggle-switch-ui.active { background: #0055ff; }
    .toggle-knob-ui {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffffff;
      transition: transform 0.2s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }
    .toggle-switch-ui.active .toggle-knob-ui { transform: translateX(18px); }
    .profile-details-exp {
      font-size: 11px;
      color: #334155;
      line-height: 1.45;
      padding-top: 8px;
      border-top: 1px solid #bfdbfe;
      margin-top: 8px;
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
      margin-bottom: 10px;
    }
    .scale-bar-title { font-size: 12px; font-weight: 800; color: #0f172a; }
    .scale-controls-row { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 220px; }
    .scale-step-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #0055ff;
      color: #ffffff;
      border: none;
      font-size: 16px;
      font-weight: 900;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .scale-display-val { font-size: 12px; font-weight: 800; color: #0f172a; background: #f1f5f9; padding: 4px 14px; border-radius: 20px; }

    .grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
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
    .feat-card-item:hover { border-color: #0055ff; transform: translateY(-1px); }
    .feat-card-item.active { background: #eff6ff; border-color: #0055ff; box-shadow: 0 4px 12px rgba(0, 85, 255, 0.12); }
    .feat-card-title { font-size: 12px; font-weight: 800; color: #0f172a; }
    .feat-card-desc { font-size: 10px; color: #64748b; line-height: 1.3; font-weight: 500; }
    .feat-card-status { font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 6px; align-self: flex-start; text-transform: uppercase; background: #e2e8f0; color: #475569; }
    .feat-card-item.active .feat-card-status { background: #0055ff; color: #ffffff; }

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
    .statement-title { font-size: 15px; font-weight: 800; color: #0055ff; display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
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
      background: #0055ff;
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
    .ai-chat-bubble.alex {
      background: #ffffff;
      color: #0f172a;
      border: 1px solid #e2e8f0;
      border-top-left-radius: 4px;
      align-self: flex-start;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .ai-chat-bubble.user {
      background: #0055ff;
      color: #ffffff;
      border-top-right-radius: 4px;
      align-self: flex-end;
    }
    .ai-chat-chips {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .ai-chip-pill {
      background: #ffffff;
      border: 1px solid #bfdbfe;
      color: #0055ff;
      font-size: 11px;
      font-weight: 700;
      padding: 7px 12px;
      border-radius: 12px;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s;
    }
    .ai-chip-pill:hover { background: #0055ff; color: #ffffff; }
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
    .ai-chat-input-box:focus { border-color: #0055ff; }
    .ai-chat-send-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #0055ff;
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
        <div class="lang-pill">
          <span>🇺🇸 ENGLISH (US)</span>
          <span style="font-size:9px;">▼</span>
        </div>
      </div>

      <div class="header-main-title">Accessibility Adjustments</div>

      <div class="header-actions-row">
        <button class="header-action-pill" id="2all-hdr-reset">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Reset Settings
        </button>
        <button class="header-action-pill" id="2all-hdr-statement">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          Statement
        </button>
        <button class="header-action-pill" id="2all-hdr-hide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          Hide Interface
        </button>
      </div>
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

    <!-- Bottom Action Bar -->
    <div class="bottom-action-row">
      <button class="btn-reset-bottom" id="2all-btn-reset-bottom">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        Reset Settings
      </button>
      <button class="btn-hide-bottom" id="2all-btn-hide-bottom">Hide Forever</button>
    </div>

    <!-- Bottom 5 Navigation Tabs (Screenshot 1) -->
    <div class="bottom-nav-5">
      <button class="nav-tab-btn active" data-tab="dashboard">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span>Home</span>
      </button>
      <button class="nav-tab-btn" data-tab="profiles">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>Modes</span>
      </button>
      <button class="nav-tab-btn" data-tab="features">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        <span>Features</span>
      </button>
      <button class="nav-tab-btn" data-tab="vision">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.72 1.7-1.61 0-.43-.17-.83-.44-1.14-.27-.3-.42-.7-.42-1.12 0-.91.74-1.65 1.65-1.65H16c3.31 0 6-2.69 6-6 0-4.97-4.48-9-10-9z"/></svg>
        <span>Vision</span>
      </button>
      <button class="nav-tab-btn" data-tab="ai">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
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

  // Open / Close Toggle
  triggerBtn.onclick = function () {
    state.open = !state.open;
    if (state.open) {
      panel.classList.add("open");
    } else {
      panel.classList.remove("open");
    }
  };

  shadow.getElementById("2all-btn-close-header").onclick = function () {
    state.open = false;
    panel.classList.remove("open");
  };

  shadow.getElementById("2all-hdr-hide").onclick = function () {
    state.open = false;
    panel.classList.remove("open");
  };

  shadow.getElementById("2all-btn-hide-bottom").onclick = function () {
    state.open = false;
    panel.classList.remove("open");
  };

  shadow.getElementById("2all-hdr-reset").onclick = function () { resetSettings(); };
  shadow.getElementById("2all-btn-reset-bottom").onclick = function () { resetSettings(); };

  // Statement Modal Toggle
  shadow.getElementById("2all-hdr-statement").onclick = function () {
    showStatementPopup();
  };

  function showStatementPopup() {
    statementModal.style.display = "block";
    statementModal.innerHTML = `
      <div class="statement-modal-overlay">
        <div class="statement-modal-box">
          <button class="statement-close-btn" id="2all-close-stmt">✕</button>
          <div class="statement-title">
            <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:none;stroke:#0055ff;stroke-width:2.5;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            Accessibility Statement
          </div>
          <div class="statement-body-text">
            This website is committed to facilitating web accessibility for all individuals, including people with disabilities. We continuously audit and enhance user interfaces according to <strong>WCAG 2.1 Level AA</strong> & <strong>ADA Title III</strong> specifications.
          </div>
          <div class="statement-highlight-box">
            ✅ Fully Compliant with WCAG 2.1 Level AA<br/>
            🛡️ ADA & Section 508 Remediated<br/>
            ⚡ Real-time Automated & AI Adjustments
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
      if (b.getAttribute("data-tab") === tabId) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });
    state.activeTab = tabId;
    renderPanelBody();
  }

  navBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchTab(btn.getAttribute("data-tab"));
    });
  });

  // Search
  var tabKeywords = {
    profiles: ["dyslexia", "adhd", "low vision", "screen reader", "blind", "cognitive", "reading mode", "night mode", "seizure", "motor", "keyboard", "profile", "epilepsy"],
    features: ["font", "size", "letter spacing", "word spacing", "line height", "readable", "alignment", "text", "speech", "read aloud", "tts", "voice", "magnifier", "reading mask", "reading ruler", "highlight"],
    vision: ["contrast", "dark mode", "light mode", "color blind", "tritanopia", "protanopia", "deuteranopia", "monochrome", "saturation", "headings", "buttons", "focus", "animation"],
    ai: ["ai", "assistant", "chat", "help", "recommend", "ask", "alex"]
  };

  searchInput.addEventListener("input", function (e) {
    var q = e.target.value.toLowerCase().trim();
    state.searchQuery = q;
    if (q) {
      for (var tab in tabKeywords) {
        if (tabKeywords[tab].some(function (kw) { return kw.indexOf(q) !== -1 || q.indexOf(kw) !== -1; })) {
          switchTab(tab);
          return;
        }
      }
    }
    renderPanelBody();
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
    state.readingMask = false;
    state.readingRuler = false;
    state.highlightLinks = false;
    state.highlightHeadings = false;
    state.highlightButtons = false;
    state.highlightFocus = false;
    state.reduceMotion = false;
    state.stopAnimations = false;
    state.cursorSize = "normal";
    state.cursorColor = "default";
    state.textToSpeech = false;
    saveState();
    applyEffects();
    renderPanelBody();
  }

  // Render Panel Body Content
  function renderPanelBody() {
    panelBody.innerHTML = "";

    // 1. HOME / DASHBOARD TAB (Exact 1:1 with Screenshot 1)
    if (state.activeTab === "dashboard" && !state.searchQuery) {
      // 1.1 AI Assistant Banner
      var aiBanner = document.createElement("div");
      aiBanner.className = "ai-assistant-banner";
      aiBanner.innerHTML = `
        <div class="ai-banner-left">
          <div class="ai-banner-icon">
            <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
          </div>
          <div>
            <div class="ai-banner-title">AI Assistant</div>
            <div class="ai-banner-sub">Your personal accessibility assistant</div>
          </div>
        </div>
        <button class="ai-banner-btn" id="2all-btn-start-chat">Start chat &gt;</button>
      `;
      panelBody.appendChild(aiBanner);

      setTimeout(function () {
        var chatBtn = shadow.getElementById("2all-btn-start-chat");
        if (chatBtn) {
          chatBtn.onclick = function () { switchTab("ai"); };
        }
      }, 50);

      // 1.2 AI Suggestion Box (with ✨ sparkle)
      var aiSug = document.createElement("div");
      aiSug.className = "ai-suggestion-box";
      aiSug.innerHTML = `
        <div class="ai-sug-avatar">
          <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
        </div>
        <div class="ai-sug-content">
          <div class="ai-sug-title">
            <span>AI Suggestion</span>
            <span style="color:#f59e0b;">✨</span>
          </div>
          <div class="ai-sug-desc">
            Based on your activity, we recommend enabling the "Dyslexia Profile" for a smoother reading experience.
          </div>
          <button class="ai-sug-btn" id="2all-btn-apply-profile">Apply Profile</button>
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
            state.letterSpacing = 2;
            state.wordSpacing = 0.4;
            saveState();
            applyEffects();
            renderPanelBody();
          };
        }
      }, 50);

      // 1.3 QUICK ACTIONS Label
      var label = document.createElement("div");
      label.className = "section-heading-text";
      label.innerText = "QUICK ACTIONS";
      panelBody.appendChild(label);

      // 1.4 Quick Actions 2x2 Grid (Screenshot 1)
      var grid2x2 = document.createElement("div");
      grid2x2.className = "quick-actions-2x2";

      // 1. Aa Readable Font
      var isReadable = state.fontFamily === "readable" || state.readableFont;
      var c1 = document.createElement("div");
      c1.className = "action-card-btn " + (isReadable ? "active" : "");
      c1.innerHTML = `
        <div class="action-card-icon-slot">
          <span style="font-size:24px;font-weight:900;color:#0055ff;">Aa</span>
        </div>
        <div class="action-card-title">Readable Font</div>
      `;
      c1.onclick = function () {
        state.readableFont = !state.readableFont;
        state.fontFamily = state.readableFont ? "readable" : "default";
        saveState(); applyEffects(); renderPanelBody();
      };
      grid2x2.appendChild(c1);

      // 2. Center Aligned
      var isCenter = state.textAlignment === "center";
      var c2 = document.createElement("div");
      c2.className = "action-card-btn " + (isCenter ? "active" : "");
      c2.innerHTML = `
        <div class="action-card-icon-slot">
          <svg width="28" height="22" viewBox="0 0 34 28" fill="none">
            <rect x="10" y="1" width="14" height="4.5" rx="2.25" fill="#0055ff" />
            <rect x="3" y="8.5" width="28" height="4.5" rx="2.25" fill="#0055ff" />
            <rect x="7" y="16" width="20" height="4.5" rx="2.25" fill="#0055ff" />
            <rect x="3" y="23.5" width="28" height="4.5" rx="2.25" fill="#0055ff" />
          </svg>
        </div>
        <div class="action-card-title">Center Aligned</div>
      `;
      c2.onclick = function () {
        state.textAlignment = isCenter ? "default" : "center";
        saveState(); applyEffects(); renderPanelBody();
      };
      grid2x2.appendChild(c2);

      // 3. High Contrast
      var isHigh = state.isHighContrast;
      var c3 = document.createElement("div");
      c3.className = "action-card-btn " + (isHigh ? "active" : "");
      c3.innerHTML = `
        <div class="action-card-icon-slot">
          <svg viewBox="0 0 24 24" style="width:24px;height:24px;fill:none;stroke:#0055ff;stroke-width:2.2;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="action-card-title">High Contrast</div>
      `;
      c3.onclick = function () {
        state.isHighContrast = !state.isHighContrast;
        saveState(); applyEffects(); renderPanelBody();
      };
      grid2x2.appendChild(c3);

      // 4. Reading Mask
      var isMask = state.readingMask;
      var c4 = document.createElement("div");
      c4.className = "action-card-btn " + (isMask ? "active" : "");
      c4.innerHTML = `
        <div class="action-card-icon-slot">
          <svg viewBox="0 0 24 24" style="width:24px;height:24px;fill:none;stroke:#0055ff;stroke-width:2.2;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <div class="action-card-title">Reading Mask</div>
      `;
      c4.onclick = function () {
        state.readingMask = !state.readingMask;
        saveState(); applyEffects(); renderPanelBody();
      };
      grid2x2.appendChild(c4);

      panelBody.appendChild(grid2x2);

      // 1.5 Explore Smart Profiles Banner
      var expBanner = document.createElement("div");
      expBanner.className = "explore-modes-banner";
      expBanner.innerHTML = `
        <div>
          <div class="explore-modes-title">Explore Smart Profiles</div>
          <div class="explore-modes-sub">1-click accessibility configurations</div>
        </div>
        <div class="explore-modes-arrow">→</div>
      `;
      expBanner.onclick = function () { switchTab("profiles"); };
      panelBody.appendChild(expBanner);
    }

    // 2. MODES / PROFILES TAB
    else if (state.activeTab === "profiles" || (state.searchQuery && tabKeywords.profiles.some(function(k){return k.indexOf(state.searchQuery)!==-1;}))) {
      var profiles = [
        { id: "seizure", label: "Epilepsy Safe Mode", desc: "Dampens color and removes blinks", detail: "Enables users with epilepsy to browse safely by eliminating flashing or blinking animations and risky color combinations." },
        { id: "low-vision", label: "Visually Impaired Mode", desc: "Improves website's visuals", detail: "Adjusts the website for users with visual impairments such as Degrading Eyesight, Tunnel Vision, Cataract, Glaucoma, and others." },
        { id: "cognitive", label: "Cognitive Disability Mode", desc: "Helps to focus on specific content", detail: "Assists users with cognitive disabilities such as Autism, Dyslexia, CVA, and others to focus on essential website elements." },
        { id: "adhd", label: "ADHD Friendly Mode", desc: "Reduces distractions and improve focus", detail: "Significantly reduces distractions and noise, helping people with ADHD and Neurodevelopmental disorders to browse and focus." },
        { id: "blind", label: "Blindness / Screen Reader", desc: "Allows to use the site with screen reader", detail: "Optimizes the site for compatibility with screen-readers such as JAWS, NVDA, VoiceOver, and TalkBack." },
        { id: "dyslexia", label: "Dyslexia Friendly", desc: "Enhances readability for dyslexia", detail: "Applies specialized typography and letter/word spacing to increase reading speed and reduce reading errors for users with dyslexia." },
        { id: "reading", label: "Reading Mode", desc: "Improves reading comprehension", detail: "Highlights paragraph structure and simplifies reading alignment for clearer text focus." },
        { id: "night", label: "Night Mode", desc: "Reduces eye strain in low light", detail: "Switches interface to dark themes to reduce blue light exposure and prevent eye fatigue." },
        { id: "motor-impaired", label: "Keyboard Nav / Motor Impaired", desc: "Optimizes focus & keyboard controls", detail: "Enlarges interactive target areas and boosts keyboard focus indicators for easier navigation." }
      ];

      profiles.forEach(function (p) {
        var isActive = state.activeProfile === p.id;
        var item = document.createElement("div");
        item.className = "profile-card-item " + (isActive ? "active" : "");
        item.innerHTML = `
          <div class="profile-card-header">
            <div>
              <div class="profile-title">${p.label}</div>
              <div class="profile-desc">${p.desc}</div>
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
            resetSettings();
          } else {
            state.activeProfile = p.id;
            if (p.id === "dyslexia") { state.dyslexiaFont = true; state.fontFamily = "dyslexic"; state.letterSpacing = 2; state.wordSpacing = 0.4; }
            if (p.id === "adhd") { state.readingMask = true; state.readingRuler = true; }
            if (p.id === "low-vision") { state.isDarkMode = true; state.textMagnifier = true; }
            if (p.id === "seizure") { state.reduceMotion = true; state.stopAnimations = true; }
            if (p.id === "motor-impaired") { state.highlightFocus = true; state.cursorSize = "large"; }
            if (p.id === "blind") { state.textToSpeech = true; }
            if (p.id === "cognitive") { state.readableFont = true; state.fontFamily = "readable"; state.highlightHeadings = true; }
            if (p.id === "reading") { state.lineHeight = 1.8; state.wordSpacing = 0.5; }
            if (p.id === "night") { state.isDarkMode = true; }
          }
          saveState();
          applyEffects();
          renderPanelBody();
        };
        panelBody.appendChild(item);
      });
    }

    // 3. FEATURES TAB (Typography, Scaling, Guides)
    else if (state.activeTab === "features" || (state.searchQuery && tabKeywords.features.some(function(k){return k.indexOf(state.searchQuery)!==-1;}))) {
      var scaleBar = document.createElement("div");
      scaleBar.className = "scale-bar-box";
      scaleBar.innerHTML = `
        <div class="scale-bar-title">Content Scaling</div>
        <div class="scale-controls-row">
          <button class="scale-step-btn" id="2all-scale-down">-</button>
          <div class="scale-display-val">${state.fontSize === 100 ? "Default (100%)" : state.fontSize + "%"}</div>
          <button class="scale-step-btn" id="2all-scale-up">+</button>
        </div>
      `;
      panelBody.appendChild(scaleBar);

      setTimeout(function () {
        var sDown = shadow.getElementById("2all-scale-down");
        var sUp = shadow.getElementById("2all-scale-up");
        if (sDown) sDown.onclick = function () {
          state.fontSize = Math.max(90, state.fontSize - 10);
          saveState(); applyEffects(); renderPanelBody();
        };
        if (sUp) sUp.onclick = function () {
          state.fontSize = Math.min(200, state.fontSize + 10);
          saveState(); applyEffects(); renderPanelBody();
        };
      }, 50);

      var featGrid = document.createElement("div");
      featGrid.className = "grid-2col";

      var typoItems = [
        { key: "readableFont", name: "Readable Font", desc: "Clear sans-serif typography" },
        { key: "dyslexiaFont", name: "Dyslexia Font", desc: "OpenDyslexic typography" },
        { key: "textMagnifier", name: "Text Magnifier", desc: "Enlarge text on hover" },
        { key: "readingMask", name: "Reading Mask", desc: "Focus line spotlight" },
        { key: "readingRuler", name: "Reading Ruler", desc: "Horizontal guide ruler" },
        { key: "textToSpeech", name: "Text-to-Speech", desc: "Read text out loud" },
      ];

      typoItems.forEach(function (t) {
        var isAct = !!state[t.key];
        var box = document.createElement("div");
        box.className = "feat-card-item " + (isAct ? "active" : "");
        box.innerHTML = `
          <div class="feat-card-title">${t.name}</div>
          <div class="feat-card-desc">${t.desc}</div>
          <div class="feat-card-status">${isAct ? "ON" : "OFF"}</div>
        `;
        box.onclick = function () {
          state[t.key] = !state[t.key];
          if (t.key === "dyslexiaFont") {
            state.fontFamily = state.dyslexiaFont ? "dyslexic" : "default";
            state.letterSpacing = state.dyslexiaFont ? 2 : 0;
            state.wordSpacing = state.dyslexiaFont ? 0.4 : 0;
          }
          if (t.key === "readableFont") {
            state.fontFamily = state.readableFont ? "readable" : "default";
          }
          saveState();
          applyEffects();
          renderPanelBody();
        };
        featGrid.appendChild(box);
      });

      panelBody.appendChild(featGrid);
    }

    // 4. VISION TAB
    else if (state.activeTab === "vision" || (state.searchQuery && tabKeywords.vision.some(function(k){return k.indexOf(state.searchQuery)!==-1;}))) {
      var visGrid = document.createElement("div");
      visGrid.className = "grid-2col";

      var visionItems = [
        { key: "isDarkMode", name: "Dark Contrast", desc: "High contrast dark mode" },
        { key: "isLightMode", name: "Light Contrast", desc: "High contrast light mode" },
        { key: "monochrome", name: "Monochrome Mode", desc: "Grayscale black & white" },
        { key: "highlightLinks", name: "Highlight Links", desc: "Underline & highlight links" },
        { key: "highlightHeadings", name: "Highlight Headings", desc: "Outline section titles H1-H6" },
        { key: "highlightButtons", name: "Highlight Buttons", desc: "Border action buttons" },
        { key: "highlightFocus", name: "Highlight Focus", desc: "Glowing blue outline on focus" },
        { key: "stopAnimations", name: "Stop Animations", desc: "Disable all site motion" },
      ];

      visionItems.forEach(function (v) {
        var isAct = !!state[v.key];
        var box = document.createElement("div");
        box.className = "feat-card-item " + (isAct ? "active" : "");
        box.innerHTML = `
          <div class="feat-card-title">${v.name}</div>
          <div class="feat-card-desc">${v.desc}</div>
          <div class="feat-card-status">${isAct ? "ON" : "OFF"}</div>
        `;
        box.onclick = function () {
          state[v.key] = !state[v.key];
          if (v.key === "isDarkMode" && state.isDarkMode) { state.isLightMode = false; state.monochrome = false; }
          if (v.key === "isLightMode" && state.isLightMode) { state.isDarkMode = false; state.monochrome = false; }
          saveState();
          applyEffects();
          renderPanelBody();
        };
        visGrid.appendChild(box);
      });

      panelBody.appendChild(visGrid);

      // Colorblind Filter Buttons
      var cbBox = document.createElement("div");
      cbBox.style.cssText = "background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:12px;margin-top:4px;";
      cbBox.innerHTML = `
        <div style="font-size:12px;font-weight:800;color:#0f172a;margin-bottom:8px;">Colorblind Filters</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;">
          <button id="cb-btn-off" style="padding:7px;border-radius:10px;font-size:11px;font-weight:800;border:1px solid #e2e8f0;cursor:pointer;background:${state.colorBlindMode==='none'?'#0055ff':'#f8fafc'};color:${state.colorBlindMode==='none'?'#fff':'#334155'}">Off</button>
          <button id="cb-btn-prot" style="padding:7px;border-radius:10px;font-size:11px;font-weight:800;border:1px solid #e2e8f0;cursor:pointer;background:${state.colorBlindMode==='protanopia'?'#0055ff':'#f8fafc'};color:${state.colorBlindMode==='protanopia'?'#fff':'#334155'}">Protan</button>
          <button id="cb-btn-deut" style="padding:7px;border-radius:10px;font-size:11px;font-weight:800;border:1px solid #e2e8f0;cursor:pointer;background:${state.colorBlindMode==='deuteranopia'?'#0055ff':'#f8fafc'};color:${state.colorBlindMode==='deuteranopia'?'#fff':'#334155'}">Deuter</button>
          <button id="cb-btn-trit" style="padding:7px;border-radius:10px;font-size:11px;font-weight:800;border:1px solid #e2e8f0;cursor:pointer;background:${state.colorBlindMode==='tritanopia'?'#0055ff':'#f8fafc'};color:${state.colorBlindMode==='tritanopia'?'#fff':'#334155'}">Tritan</button>
        </div>
      `;
      panelBody.appendChild(cbBox);

      setTimeout(function () {
        var bOff = shadow.getElementById("cb-btn-off");
        var bProt = shadow.getElementById("cb-btn-prot");
        var bDeut = shadow.getElementById("cb-btn-deut");
        var bTrit = shadow.getElementById("cb-btn-trit");
        if (bOff) bOff.onclick = function () { state.colorBlindMode = "none"; saveState(); applyEffects(); renderPanelBody(); };
        if (bProt) bProt.onclick = function () { state.colorBlindMode = "protanopia"; saveState(); applyEffects(); renderPanelBody(); };
        if (bDeut) bDeut.onclick = function () { state.colorBlindMode = "deuteranopia"; saveState(); applyEffects(); renderPanelBody(); };
        if (bTrit) bTrit.onclick = function () { state.colorBlindMode = "tritanopia"; saveState(); applyEffects(); renderPanelBody(); };
      }, 50);
    }

    // 5. AI ASSIST TAB
    else if (state.activeTab === "ai") {
      var chatView = document.createElement("div");
      chatView.className = "ai-chat-view";
      chatView.innerHTML = `
        <div class="ai-chat-messages" id="2all-chat-msg-box"></div>
        <div class="ai-chat-chips" id="2all-chat-chips-box"></div>
        <div class="ai-chat-input-row">
          <input type="text" class="ai-chat-input-box" id="2all-ai-msg-input" placeholder="Ask AI assistant a question..." />
          <button class="ai-chat-send-btn" id="2all-ai-msg-send">
            <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:white;stroke-width:2.5;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;
      panelBody.appendChild(chatView);

      renderChatMessages();
    }
  }

  function getAssistantResponse(text) {
    var q = text.toLowerCase().trim();
    if (q.indexOf("dyslexia") !== -1 || q.indexOf("font") !== -1 || q.indexOf("reading") !== -1) {
      return "For dyslexia and reading ease, we recommend enabling our **Dyslexia Friendly** profile or turning on the **Readable Font** and **Reading Ruler**!";
    }
    if (q.indexOf("contrast") !== -1 || q.indexOf("dark") !== -1 || q.indexOf("vision") !== -1) {
      return "You can use our **Dark Contrast**, **Light Contrast**, or **Colorblind Filters** under the Vision tab to enhance visual clarity!";
    }
    if (q.indexOf("compliance") !== -1 || q.indexOf("wcag") !== -1 || q.indexOf("ada") !== -1) {
      return "2all.ai provides automated remediation adhering to **WCAG 2.1 & 2.2 Level AA** and **ADA Title III** specifications! 🛡️";
    }
    if (q.indexOf("hi") === 0 || q.indexOf("hello") === 0 || q.indexOf("hey") === 0) {
      return "Hello! 👋 I'm your AI accessibility assistant. How can I adjust this website to best suit your needs?";
    }
    return "I can help configure accessibility modes like Dyslexia, ADHD, High Contrast, Screen Reading, and more. What adjustments would you like to make?";
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
      b.className = "ai-chat-bubble " + m.from;
      b.innerHTML = m.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      msgBox.appendChild(b);
    });
    msgBox.scrollTop = msgBox.scrollHeight;

    chipsBox.innerHTML = "";
    var suggestions = [
      "Enable Dyslexia Friendly Mode",
      "Switch to Dark High Contrast",
      "Turn on Reading Ruler guide",
      "Is this site WCAG 2.1 AA compliant?"
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
    state.aiMessages.push({ from: "user", text: text });
    saveState();
    renderChatMessages();

    // Auto-apply if requested
    if (text.toLowerCase().indexOf("dyslexia") !== -1) {
      state.activeProfile = "dyslexia";
      state.dyslexiaFont = true;
      state.fontFamily = "dyslexic";
      applyEffects();
    }
    if (text.toLowerCase().indexOf("dark") !== -1 || text.toLowerCase().indexOf("contrast") !== -1) {
      state.isDarkMode = true;
      applyEffects();
    }
    if (text.toLowerCase().indexOf("ruler") !== -1) {
      state.readingRuler = true;
      applyEffects();
    }

    setTimeout(function () {
      var reply = getAssistantResponse(text);
      state.aiMessages.push({ from: "alex", text: reply });
      saveState();
      renderChatMessages();
    }, 350);
  }

  // DOM Live Injections & Effects Engine
  function updateGlobalStyle() {
    var styleEl = document.getElementById("2all-global-effects-style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "2all-global-effects-style";
      document.head.appendChild(styleEl);
    }

    var css = "";

    // OpenDyslexic / Readable Font Override
    if (state.fontFamily === "dyslexic" || state.dyslexiaFont || state.activeProfile === "dyslexia") {
      if (!document.getElementById("2all-dyslexic-font-link")) {
        var link = document.createElement("link");
        link.id = "2all-dyslexic-font-link";
        link.rel = "stylesheet";
        link.href = "https://fonts.cdnfonts.com/css/open-dyslexic";
        document.head.appendChild(link);
      }
      css += `
        @import url('https://fonts.cdnfonts.com/css/open-dyslexic');
        html, body, p, span, h1, h2, h3, h4, h5, h6, a, div, li, td, th, input, button, select, label, article, section, main, header, footer,
        body *:not(#2all-ai-widget-host *):not(script):not(style) {
          font-family: 'OpenDyslexic', 'OpenDyslexic3', 'Comic Sans MS', sans-serif !important;
          letter-spacing: ${state.letterSpacing || 1}px !important;
          word-spacing: ${state.wordSpacing || 0.2}em !important;
        }
      `;
    } else if (state.fontFamily === "readable" || state.readableFont) {
      css += `
        html, body, p, span, h1, h2, h3, h4, h5, h6, a, div, li, td, th, input, button, select, label, article, section, main, header, footer,
        body *:not(#2all-ai-widget-host *):not(script):not(style) {
          font-family: Verdana, Arial, Helvetica, sans-serif !important;
        }
      `;
    } else {
      if (state.letterSpacing > 0) {
        css += `body *:not(#2all-ai-widget-host *):not(script):not(style) { letter-spacing: ${state.letterSpacing}px !important; }`;
      }
      if (state.wordSpacing > 0) {
        css += `body *:not(#2all-ai-widget-host *):not(script):not(style) { word-spacing: ${state.wordSpacing}em !important; }`;
      }
    }

    // Font Scaling
    if (state.fontSize && state.fontSize !== 100) {
      css += `html { font-size: ${state.fontSize}% !important; }`;
    }

    // Text Alignment
    if (state.textAlignment && state.textAlignment !== "default") {
      css += `body *:not(#2all-ai-widget-host *):not(script):not(style) { text-align: ${state.textAlignment} !important; }`;
    }

    // Line Height
    if (state.lineHeight && state.lineHeight !== 1.5) {
      css += `body *:not(#2all-ai-widget-host *):not(script):not(style) { line-height: ${state.lineHeight} !important; }`;
    }

    // Dark Contrast
    if (state.isDarkMode || state.isHighContrast) {
      css += `
        html, body { background-color: #0f172a !important; color: #f8fafc !important; }
        body *:not(#2all-ai-widget-host *):not(script):not(style) { background-color: transparent !important; color: #f8fafc !important; }
        div, section, article, header, footer, main, nav { background-color: rgba(15, 23, 42, 0.95) !important; border-color: #334155 !important; }
        p, span, h1, h2, h3, h4, h5, h6, li, a, label, strong { color: #f8fafc !important; }
      `;
    } else if (state.isLightMode) {
      css += `
        html, body { background-color: #ffffff !important; color: #000000 !important; }
        p, span, h1, h2, h3, h4, h5, h6, li, a, label, strong { color: #000000 !important; font-weight: 700 !important; }
      `;
    }

    // Saturation
    if (state.monochrome || state.saturationMode === "monochrome") {
      css += `html { filter: grayscale(100%) !important; }`;
    }

    // Highlight Links
    if (state.highlightLinks) {
      css += `a, a * { background-color: #fef08a !important; color: #854d0e !important; text-decoration: underline !important; font-weight: 800 !important; }`;
    }

    // Highlight Headings
    if (state.highlightHeadings) {
      css += `h1, h2, h3, h4, h5, h6 { outline: 3px solid #0055ff !important; outline-offset: 3px !important; background-color: rgba(0, 85, 255, 0.08) !important; }`;
    }

    // Highlight Buttons
    if (state.highlightButtons) {
      css += `button, [role="button"], input[type="submit"], input[type="button"], a.btn { outline: 3px solid #16a34a !important; outline-offset: 3px !important; }`;
    }

    // Highlight Focus
    if (state.highlightFocus) {
      css += `*:focus, *:focus-visible { outline: 4px solid #0055ff !important; outline-offset: 4px !important; box-shadow: 0 0 15px rgba(0, 85, 255, 0.9) !important; }`;
    }

    // Stop Animations
    if (state.stopAnimations || state.reduceMotion) {
      css += `*, *::before, *::after { animation: none !important; transition: none !important; }`;
    }

    styleEl.textContent = css;
  }

  function updateReadingMask() {
    var mask = document.getElementById("2all-reading-mask-overlay");
    if (state.readingMask) {
      if (!mask) {
        mask = document.createElement("div");
        mask.id = "2all-reading-mask-overlay";
        mask.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;background:rgba(0,0,0,0.65);clip-path:polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);";
        document.body.appendChild(mask);
      }
      mask.style.display = "block";
      
      if (!window.__2ALL_MASK_LISTENER__) {
        window.__2ALL_MASK_LISTENER__ = function (e) {
          var m = document.getElementById("2all-reading-mask-overlay");
          if (m && m.style.display !== "none") {
            var y = e.clientY;
            var h = 60;
            m.style.clipPath = `polygon(0% 0%, 100% 0%, 100% ${y - h/2}px, 0% ${y - h/2}px, 0% ${y + h/2}px, 100% ${y + h/2}px, 100% 100%, 0% 100%)`;
          }
        };
        window.addEventListener("mousemove", window.__2ALL_MASK_LISTENER__);
      }
    } else {
      if (mask) mask.style.display = "none";
    }
  }

  function updateReadingRuler() {
    var ruler = document.getElementById("2all-reading-ruler-line");
    if (state.readingRuler) {
      if (!ruler) {
        ruler = document.createElement("div");
        ruler.id = "2all-reading-ruler-line";
        ruler.style.cssText = "position:fixed;left:0;width:100vw;height:6px;background:#0055ff;box-shadow:0 0 10px rgba(0,85,255,0.8);pointer-events:none;z-index:2147483646;display:none;top:0px;";
        document.body.appendChild(ruler);
      }
      ruler.style.display = "block";

      if (!window.__2ALL_RULER_LISTENER__) {
        window.__2ALL_RULER_LISTENER__ = function (e) {
          var r = document.getElementById("2all-reading-ruler-line");
          if (r && r.style.display !== "none") {
            r.style.top = (e.clientY - 3) + "px";
          }
        };
        window.addEventListener("mousemove", window.__2ALL_RULER_LISTENER__);
      }
    } else {
      if (ruler) ruler.style.display = "none";
    }
  }

  function updateTextMagnifier() {
    var popup = document.getElementById("2all-text-magnifier-popup");
    if (state.textMagnifier) {
      if (!popup) {
        popup = document.createElement("div");
        popup.id = "2all-text-magnifier-popup";
        popup.style.cssText = "position:fixed;pointer-events:none;z-index:2147483646;background:#0f172a;color:#ffffff;padding:8px 16px;border-radius:12px;font-size:20px;font-weight:800;box-shadow:0 10px 30px rgba(0,0,0,0.3);border:2px solid #0055ff;display:none;max-width:400px;word-break:break-word;";
        document.body.appendChild(popup);
      }

      if (!window.__2ALL_MAGNIFIER_LISTENER__) {
        window.__2ALL_MAGNIFIER_LISTENER__ = function (e) {
          var p = document.getElementById("2all-text-magnifier-popup");
          if (!p) return;
          var target = e.target;
          if (target && target.innerText && target.innerText.trim() && target.id !== "2all-text-magnifier-popup") {
            var text = target.innerText.trim();
            if (text.length < 120) {
              p.innerText = text;
              p.style.display = "block";
              p.style.left = Math.min(window.innerWidth - 300, e.clientX + 15) + "px";
              p.style.top = (e.clientY + 20) + "px";
              return;
            }
          }
          p.style.display = "none";
        };
        window.addEventListener("mousemove", window.__2ALL_MAGNIFIER_LISTENER__);
      }
    } else {
      if (popup) popup.style.display = "none";
    }
  }

  function updateTextToSpeech() {
    if (state.textToSpeech) {
      if (!window.__2ALL_TTS_LISTENER__) {
        window.__2ALL_TTS_LISTENER__ = function (e) {
          if (!state.textToSpeech) return;
          var target = e.target;
          if (target && target.innerText && target.innerText.trim()) {
            var text = target.innerText.trim();
            if ("speechSynthesis" in window && text.length < 200) {
              window.speechSynthesis.cancel();
              var utterance = new SpeechSynthesisUtterance(text);
              utterance.rate = 1.0;
              window.speechSynthesis.speak(utterance);
            }
          }
        };
        document.addEventListener("click", window.__2ALL_TTS_LISTENER__);
      }
    } else {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    }
  }

  function applyEffects() {
    var doc = document.documentElement;

    // Font Scale
    if (state.fontSize !== 100) {
      doc.style.fontSize = state.fontSize + "%";
    } else {
      doc.style.fontSize = "";
    }

    // Colorblind Filter
    if (state.colorBlindMode !== "none") {
      doc.style.filter = "url('#cb-" + state.colorBlindMode + "')";
    } else {
      doc.style.filter = "";
    }

    // Overlays
    updateGlobalStyle();
    updateReadingMask();
    updateReadingRuler();
    updateTextMagnifier();
    updateTextToSpeech();
  }

  // Initial Render & Apply
  renderPanelBody();
  applyEffects();
})();
