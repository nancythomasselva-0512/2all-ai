/**
 * 2all.ai Universal Accessibility Suite & Alex AI Assistant Engine
 * Version: 10.0.0
 * Pure Universal Vanilla JS - Works on ANY website (WordPress, Shopify, React, HTML, PHP, Angular, Webflow, etc.)
 * 1:1 Pixel-Perfect Replica of 2all.ai Website Accessibility Toolbar (DashboardSection & AccessibilityPanel).
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

  // Universal Accessibility & Alex Chat State
  var state = {
    open: false, // Accessibility Suite open state
    alexOpen: false, // Alex Chat open state
    alexShowBubble: true, // Alex Popover prompt visibility
    activeTab: "dashboard", // dashboard, profiles, features, vision, ai
    searchQuery: "",
    showAnalysis: false,
    
    // Active Profile Mode
    activeProfile: "none", // dyslexia, adhd, low-vision, blind, motor-impaired, cognitive, seizure, reading, night

    // Typography & Spacing
    fontSize: 100, // 90% - 200%
    fontFamily: "default", // default, readable, dyslexic
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

    // Focus & Reading Overlays
    readingMask: false,
    readingRuler: false,
    highlightLinks: false,
    highlightHeadings: false,
    highlightButtons: false,
    highlightFocus: false,
    reduceMotion: false,
    stopAnimations: false,
    cursorSize: "normal", // normal, large, huge

    // Speech & Voice Narration
    textToSpeech: false,
    voiceNavigation: false,
    autoReadSelection: false,

    // Alex AI Virtual Assistant Conversation Messages
    alexMessages: [
      {
        from: "alex",
        text: "Hi! I'm Alex, your 2all.ai virtual assistant. How can I help make your website accessible today?",
      },
    ],
  };

  // Restore State from LocalStorage
  try {
    var saved = localStorage.getItem("2all_universal_suite_v10");
    if (saved) {
      var parsed = JSON.parse(saved);
      state = Object.assign(state, parsed);
      state.open = false;
      state.alexOpen = false;
    }
  } catch (e) {}

  function saveState() {
    try {
      localStorage.setItem("2all_universal_suite_v10", JSON.stringify(state));
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
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
    `;
    document.body.appendChild(svgDiv);
  }

  // Inject OpenDyslexic Font to Document Head
  if (!document.getElementById("2all-opendyslexic-font")) {
    var fontStyle = document.createElement("style");
    fontStyle.id = "2all-opendyslexic-font";
    fontStyle.textContent = `
      @font-face {
        font-family: 'OpenDyslexic';
        src: url('https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/fonts/OpenDyslexic-Regular.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    document.head.appendChild(fontStyle);
  }

  // Shadow DOM Internal Styles (Matches AccessibilityPanel.tsx 1:1)
  var style = document.createElement("style");
  style.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; user-select: none; }

    .widget-wrapper {
      pointer-events: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      position: relative;
    }
    .widget-wrapper.left { align-items: flex-start; }

    /* Trigger Buttons Row (Side-by-side: Alex Chat + Accessibility) */
    .trigger-buttons-row {
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
    }

    /* Floating Blue Accessibility Trigger Button */
    .trigger-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: ${primaryColor};
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

    /* Alex Chat Button (Dark Navy #000033) */
    .alex-trigger-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #000033;
      color: #ffffff;
      border: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 25px rgba(0, 0, 51, 0.45), 0 8px 16px rgba(0,0,0,0.15);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      outline: none;
    }
    .alex-trigger-btn:hover {
      transform: scale(1.08);
      background: #000055;
      box-shadow: 0 0 30px rgba(0, 0, 51, 0.6);
    }
    .alex-trigger-btn svg { width: 24px; height: 24px; fill: none; stroke: white; stroke-width: 2.5; }

    /* Alex Popover Bubble Prompt (1:1 with AlexChatWidget.tsx) */
    .alex-popover-bubble {
      position: absolute;
      bottom: 70px;
      right: 0px;
      width: 235px;
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.9);
      border-radius: 18px;
      padding: 10px 12px;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.18);
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 10;
    }
    .alex-popover-bubble:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22); }
    .alex-popover-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #000033;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px solid #1e293b;
      shrink-0: 0;
    }
    .alex-popover-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .alex-popover-title { font-size: 10px; font-weight: 900; color: #000033; letter-spacing: 0.5px; text-transform: uppercase; }
    .alex-popover-text { font-size: 11px; font-weight: 600; color: #334155; line-height: 1.3; margin-top: 2px; }
    .alex-popover-close {
      font-size: 14px;
      font-weight: 700;
      color: #94a3b8;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 2px;
      line-height: 1;
    }
    .alex-popover-close:hover { color: #0f172a; }

    /* Accessibility Suite Modal Panel Container (Absolute Floating 1:1) */
    .panel-container {
      position: absolute;
      bottom: 70px;
      right: 0px;
      width: 375px;
      height: 530px;
      max-height: calc(100vh - 6rem);
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.9);
      border-radius: 24px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.22);
      overflow: hidden;
      display: none;
      flex-direction: column;
      transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(15px) scale(0.96);
      pointer-events: none;
      z-index: 100;
    }
    .widget-wrapper.left .panel-container { right: auto; left: 0px; }

    .panel-container.open {
      display: flex;
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* Alex AI Chat Panel Container (Absolute Floating) */
    .alex-panel-container {
      position: absolute;
      bottom: 70px;
      right: 0px;
      width: 375px;
      height: 540px;
      max-height: calc(100vh - 6rem);
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.9);
      border-radius: 24px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      display: none;
      flex-direction: column;
      transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(15px) scale(0.96);
      pointer-events: none;
      z-index: 100;
    }
    .widget-wrapper.left .alex-panel-container { right: auto; left: 0px; }

    .alex-panel-container.open {
      display: flex;
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* Header Bar (1:1 with AccessibilityPanel.tsx) */
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
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
    }
    .dot-ping { width: 7px; height: 7px; border-radius: 50%; background: #2563eb; }

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

    /* Search Row */
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
    .search-input:focus { border-color: ${primaryColor}; background: #ffffff; }

    /* Content Area */
    .panel-body { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 14px; background: #ffffff; }

    /* Light Blue AI Suggestion Card (1:1 with DashboardSection.tsx) */
    .ai-suggestion-card {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 16px;
      padding: 14px;
      display: flex;
      gap: 12px;
      position: relative;
      overflow: hidden;
    }
    .ai-avatar-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #004bff;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      shrink-0: 0;
      box-shadow: 0 2px 6px rgba(0,75,255,0.3);
    }
    .ai-suggestion-title { font-size: 13px; font-weight: 800; color: #0a1e3f; display: flex; align-items: center; gap: 4px; }
    .ai-suggestion-desc { font-size: 11px; color: #475569; margin-top: 3px; margin-bottom: 10px; line-height: 1.4; }
    .btn-apply-profile {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: #ffffff;
      border: 1px solid #93c5fd;
      color: #004bff;
      padding: 6px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .btn-apply-profile:hover { background: #004bff; color: #ffffff; border-color: #004bff; }

    /* Quick Actions Grid Header */
    .section-label { font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }

    /* Quick Action 2x2 Cards Grid (1:1 with DashboardSection.tsx) */
    .quick-actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    
    .action-card {
      background: #ffffff;
      border: 2px solid #cbe2ff;
      border-radius: 16px;
      padding: 14px 10px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .action-card:hover { border-color: #0091ff; box-shadow: 0 4px 12px rgba(0,145,255,0.1); }
    .action-card.active {
      background: #f0f9ff;
      border-color: #0091ff;
      box-shadow: 0 4px 14px rgba(0, 145, 255, 0.18);
    }
    .action-card-icon { font-size: 22px; font-weight: 900; color: #0091ff; height: 26px; display: flex; align-items: center; justify-content: center; }
    .action-card-label { font-size: 11px; font-weight: 800; color: #262626; text-align: center; }

    /* Explore Profiles Banner (1:1 with DashboardSection.tsx) */
    .explore-banner {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: background 0.15s;
    }
    .explore-banner:hover { background: #f1f5f9; }
    .explore-title { font-size: 13px; font-weight: 800; color: #0a1e3f; }
    .explore-sub { font-size: 11px; color: #64748b; margin-top: 2px; }
    .explore-arrow { width: 28px; height: 28px; border-radius: 50%; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center; color: #004bff; font-weight: 900; font-size: 14px; }

    /* Profile List Items (1:1 with ProfilesSection.tsx) */
    .profile-list-container { display: flex; flex-direction: column; gap: 8px; }
    .profile-list-item {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 14px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 6px;
      transition: all 0.2s;
    }
    .profile-list-item:hover { border-color: #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .profile-list-item.active {
      background: #eff6ff;
      border: 2px solid ${primaryColor};
      box-shadow: 0 4px 14px rgba(0, 75, 255, 0.15);
    }
    .profile-item-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .profile-item-title { font-size: 13px; font-weight: 800; color: #0f172a; }
    .profile-item-desc { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 2px; }

    /* Toggle Switch (w-11 h-6) */
    .toggle-switch {
      width: 44px;
      height: 24px;
      border-radius: 12px;
      background: #e2e8f0;
      padding: 2px;
      transition: background 0.2s;
      shrink-0: 0;
      display: flex;
      align-items: center;
    }
    .toggle-switch.active { background: ${primaryColor}; }
    .toggle-knob {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffffff;
      transition: transform 0.2s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }
    .toggle-switch.active .toggle-knob { transform: translateX(20px); }

    .profile-detail-box {
      font-size: 11px;
      color: #334155;
      line-height: 1.45;
      padding-top: 8px;
      border-top: 1px solid #bfdbfe;
      margin-top: 4px;
    }

    /* Cards Grid */
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
      border-color: ${primaryColor};
      box-shadow: 0 4px 12px rgba(0, 75, 255, 0.15);
    }
    .card-box-title { font-size: 12px; font-weight: 800; color: #0f172a; }
    .card-box-desc { font-size: 10px; color: #64748b; line-height: 1.3; font-weight: 500; }
    .card-box-pill { font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 6px; align-self: flex-start; text-transform: uppercase; background: #e2e8f0; color: #475569; }
    .card-box.active .card-box-pill { background: ${primaryColor}; color: #ffffff; }

    /* Content Scaling Bar */
    .scale-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    .scale-title { font-size: 12px; font-weight: 800; color: #0f172a; }
    .scale-controls { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 220px; }
    .scale-btn {
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
      box-shadow: 0 2px 6px rgba(0,75,255,0.3);
      transition: transform 0.15s;
    }
    .scale-btn:active { transform: scale(0.92); }
    .scale-val { font-size: 12px; font-weight: 800; color: #0f172a; background: #f1f5f9; padding: 4px 12px; border-radius: 20px; }

    /* Option Cards */
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
    .range-input { width: 100%; accent-color: ${primaryColor}; cursor: pointer; }

    /* Alex AI Chat Panel Styling (1:1 with AlexChatWidget.tsx) */
    .alex-header {
      background: #000033;
      padding: 14px 16px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .alex-header-user { display: flex; align-items: center; gap: 10px; }
    .alex-header-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #004bff;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px solid #3b82f6;
      shrink-0: 0;
    }
    .alex-header-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .alex-header-title { font-size: 13px; font-weight: 900; color: #ffffff; }
    .alex-header-sub { font-size: 10px; color: #34d399; font-weight: 700; display: flex; align-items: center; gap: 4px; margin-top: 1px; }

    .alex-privacy-banner {
      background: #f8fafc;
      padding: 6px 12px;
      font-size: 10px;
      color: #64748b;
      text-align: center;
      border-bottom: 1px solid #e2e8f0;
    }

    .alex-body { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 10px; background: #f8fafc; }
    .alex-msg-item { display: flex; flex-direction: column; max-width: 88%; gap: 3px; }
    .alex-msg-item.alex { align-self: flex-start; }
    .alex-msg-item.user { align-self: flex-end; }
    
    .alex-msg-bubble {
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 12px;
      line-height: 1.45;
      font-weight: 500;
      white-space: pre-wrap;
    }
    .alex-msg-item.alex .alex-msg-bubble {
      background: #ffffff;
      color: #0f172a;
      border: 1px solid #e2e8f0;
      border-top-left-radius: 4px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
    }
    .alex-msg-item.user .alex-msg-bubble {
      background: #004bff;
      color: #ffffff;
      border-top-right-radius: 4px;
    }

    .alex-chips-list { display: flex; flex-direction: column; gap: 6px; margin-top: 6px; }
    .alex-chip-item {
      background: #ffffff;
      border: 1px solid #bfdbfe;
      color: #004bff;
      font-size: 11px;
      font-weight: 700;
      padding: 8px 12px;
      border-radius: 12px;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s;
      box-shadow: 0 2px 5px rgba(0,75,255,0.06);
    }
    .alex-chip-item:hover { background: #004bff; color: #ffffff; border-color: #004bff; }

    .alex-input-footer { padding: 10px 12px; background: #ffffff; border-top: 1px solid #f1f5f9; display: flex; gap: 8px; align-items: center; }
    .alex-input-field {
      flex: 1;
      padding: 9px 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      font-size: 12px;
      outline: none;
      color: #0f172a;
    }
    .alex-input-field:focus { border-color: #004bff; background: #ffffff; }
    .alex-send-button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #004bff;
      color: #ffffff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      shrink-0: 0;
      transition: background 0.15s;
    }
    .alex-send-button:hover { background: #003edd; }

    /* Action Bar & Brand Footer (1:1 with Screenshot 1) */
    .action-bar {
      padding: 10px 12px 6px 12px;
      background: #ffffff;
      border-top: 1px solid #f1f5f9;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .btn-reset-main {
      flex: 1;
      padding: 9px 12px;
      background: ${primaryColor};
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      border-radius: 12px;
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
      padding: 9px 12px;
      background: #f1f5f9;
      color: #334155;
      font-size: 12px;
      font-weight: 700;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      cursor: pointer;
      text-align: center;
      transition: background 0.15s;
    }
    .btn-hide-main:hover { background: #e2e8f0; }

    .brand-footer {
      background: #ffffff;
      padding: 4px 12px 8px 12px;
      text-align: center;
      font-size: 10px;
      font-weight: 700;
      color: #64748b;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    /* Bottom 5 Icon Navigation Tabs (1:1 with Screenshot 1) */
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
    .nav-btn.active { color: ${primaryColor}; background: #eff6ff; font-weight: 800; }
    .nav-btn svg { width: 16px; height: 16px; margin-bottom: 2px; }
    .nav-btn span { font-size: 9.5px; tracking-tight: -0.2px; }
  `;
  shadow.appendChild(style);

  // Outer Wrapper
  var wrapper = document.createElement("div");
  wrapper.className = "widget-wrapper " + (position.indexOf("left") !== -1 ? "left" : "");

  // 1. Accessibility Suite Modal Panel Container
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
            <span id="2all-score-text">Score: 70/100</span>
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
    <div class="brand-footer">
      <span>Powered by</span>
      <span style="color:${primaryColor};font-weight:900;">2all.ai</span>
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

  // 2. Alex AI Assistant Panel Container
  var alexPanel = document.createElement("div");
  alexPanel.className = "alex-panel-container";
  alexPanel.innerHTML = `
    <div class="alex-header">
      <div class="alex-header-user">
        <div class="alex-header-avatar">
          <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex" alt="Alex" />
        </div>
        <div>
          <div class="alex-header-title">Alex (2all.ai AI Assistant)</div>
          <div class="alex-header-sub">
            <span style="width:6px;height:6px;border-radius:50%;background:#34d399;"></span>
            Online 24/7
          </div>
        </div>
      </div>
      <button class="btn-close" id="alex-close-btn" style="background:rgba(255,255,255,0.1);color:#fff;border:none;">✕</button>
    </div>
    <div class="alex-privacy-banner">
      Conversations are monitored for quality. 2all.ai Accessibility Suite.
    </div>
    <div class="alex-body" id="alex-chat-body"></div>
    <div class="alex-input-footer">
      <input type="text" class="alex-input-field" id="alex-chat-input" placeholder="Ask Alex a question..." />
      <button class="alex-send-button" id="alex-chat-send">
        <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:white;stroke-width:2.5;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  `;
  wrapper.appendChild(alexPanel);

  // 3. Side-by-side Trigger Buttons Row (Alex Chat + Accessibility Button + Popover Prompt)
  var triggerRow = document.createElement("div");
  triggerRow.className = "trigger-buttons-row";

  // Alex Popover Bubble Prompt
  var alexPopover = document.createElement("div");
  alexPopover.className = "alex-popover-bubble";
  alexPopover.id = "alex-popover-bubble";
  alexPopover.innerHTML = `
    <div class="alex-popover-avatar">
      <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex" alt="Alex" />
    </div>
    <div style="flex:1;min-width:0;">
      <div class="alex-popover-title">Alex</div>
      <div class="alex-popover-text">Hi, I'm Alex! Need help with web accessibility?</div>
    </div>
    <button class="alex-popover-close" id="alex-popover-close">✕</button>
  `;
  triggerRow.appendChild(alexPopover);

  // Alex Chat Trigger Button (Dark Navy #000033)
  var alexBtn = document.createElement("button");
  alexBtn.className = "alex-trigger-btn";
  alexBtn.setAttribute("aria-label", "Toggle Alex AI Chat Assistant");
  alexBtn.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  `;
  triggerRow.appendChild(alexBtn);

  // Blue Accessibility Trigger Button (#004bff)
  var triggerBtn = document.createElement("button");
  triggerBtn.className = "trigger-btn";
  triggerBtn.setAttribute("aria-label", "Toggle Accessibility Suite Panel");
  triggerBtn.innerHTML = `
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="4" r="2"/>
      <path d="M12 6v6"/>
      <path d="M6 9h12"/>
      <path d="M12 12l-3 9"/>
      <path d="M12 12l3 9"/>
    </svg>
  `;
  triggerRow.appendChild(triggerBtn);

  wrapper.appendChild(triggerRow);
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

  // Toggle Accessibility Panel
  triggerBtn.onclick = function () {
    state.open = !state.open;
    if (state.open) {
      panel.classList.add("open");
      state.alexOpen = false;
      alexPanel.classList.remove("open");
    } else {
      panel.classList.remove("open");
    }
  };

  // Toggle Alex Chat Panel
  function toggleAlexChat() {
    state.alexOpen = !state.alexOpen;
    alexPopover.style.display = "none";
    if (state.alexOpen) {
      alexPanel.classList.add("open");
      state.open = false;
      panel.classList.remove("open");
      renderAlexChatMessages();
    } else {
      alexPanel.classList.remove("open");
    }
  }

  alexBtn.onclick = toggleAlexChat;
  alexPopover.onclick = function (e) {
    if (e.target && e.target.id === "alex-popover-close") return;
    toggleAlexChat();
  };

  shadow.getElementById("alex-popover-close").onclick = function (e) {
    e.stopPropagation();
    alexPopover.style.display = "none";
  };
  shadow.getElementById("alex-close-btn").onclick = function () {
    state.alexOpen = false;
    alexPanel.classList.remove("open");
  };

  function calculateScore() {
    var hasProfile = state.activeProfile !== "none";
    var hasTypo = state.fontFamily !== "default" || state.fontSize > 100 || state.letterSpacing > 0;
    var hasContrast = state.isHighContrast || state.isDarkMode || state.isLightMode || state.colorBlindMode !== "none";
    var hasReading = state.readingMask || state.readingRuler || state.textMagnifier || state.textToSpeech || state.highlightLinks;

    var score = 70;
    if (hasProfile) score += 15;
    if (hasTypo) score += 5;
    if (hasContrast) score += 5;
    if (hasReading) score += 5;
    return Math.min(100, score);
  }

  function resetSettings() {
    state.activeProfile = "none";
    state.fontSize = 100;
    state.fontFamily = "default";
    state.dyslexiaFont = false;
    state.readableFont = false;
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
    state.textToSpeech = false;
    saveState();
    applyEffects();
    renderPanelBody();
  }

  function renderPanelBody() {
    panelBody.innerHTML = "";

    var score = calculateScore();
    shadow.getElementById("2all-score-text").innerText = "Score: " + score + "/100";

    // 1. DASHBOARD (HOME TAB) - EXACT 1:1 REPLICA OF DASHBOARDSECTION.TSX (SCREENSHOT 1)
    if (state.activeTab === "dashboard" && !state.searchQuery) {
      // Light Blue AI Suggestion Card
      var suggestionCard = document.createElement("div");
      suggestionCard.className = "ai-suggestion-card";
      suggestionCard.innerHTML = `
        <div class="ai-avatar-icon">
          <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:white;stroke-width:2;"><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M12 8V4H8"/><path d="M2 14h2"/><path d="M20 14h2"/></svg>
        </div>
        <div>
          <div class="ai-suggestion-title">
            <span>AI Suggestion</span>
            <span style="color:#f59e0b;">✨</span>
          </div>
          <div class="ai-suggestion-desc">Based on your activity, we recommend enabling the "Dyslexia Profile" for a smoother reading experience.</div>
          <button class="btn-apply-profile" id="2all-apply-dyslexia-btn">Apply Profile</button>
        </div>
      `;
      panelBody.appendChild(suggestionCard);

      setTimeout(function () {
        var btn = shadow.getElementById("2all-apply-dyslexia-btn");
        if (btn) {
          btn.onclick = function () {
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

      // Section Label
      var sectionLabel = document.createElement("div");
      sectionLabel.className = "section-label";
      sectionLabel.innerText = "Quick Actions";
      panelBody.appendChild(sectionLabel);

      // Quick Actions 2x2 Grid (1:1 with Screenshot 1)
      var quickGrid = document.createElement("div");
      quickGrid.className = "quick-actions-grid";

      // 1. Readable Font Card
      var isReadable = state.fontFamily === "readable" || state.readableFont;
      var card1 = document.createElement("div");
      card1.className = "action-card " + (isReadable ? "active" : "");
      card1.innerHTML = `
        <div class="action-card-icon">Aa</div>
        <div class="action-card-label">Readable Font</div>
      `;
      card1.onclick = function () {
        state.readableFont = !state.readableFont;
        state.fontFamily = state.readableFont ? "readable" : "default";
        saveState(); applyEffects(); renderPanelBody();
      };
      quickGrid.appendChild(card1);

      // 2. Center Aligned Card
      var isCenter = state.textAlignment === "center";
      var card2 = document.createElement("div");
      card2.className = "action-card " + (isCenter ? "active" : "");
      card2.innerHTML = `
        <div class="action-card-icon">
          <svg width="24" height="20" viewBox="0 0 34 28" fill="none">
            <rect x="10" y="1" width="14" height="4.5" rx="2.25" fill="#0091ff" />
            <rect x="3" y="8.5" width="28" height="4.5" rx="2.25" fill="#0091ff" />
            <rect x="7" y="16" width="20" height="4.5" rx="2.25" fill="#0091ff" />
            <rect x="3" y="23.5" width="28" height="4.5" rx="2.25" fill="#0091ff" />
          </svg>
        </div>
        <div class="action-card-label">Center Aligned</div>
      `;
      card2.onclick = function () {
        state.textAlignment = isCenter ? "default" : "center";
        saveState(); applyEffects(); renderPanelBody();
      };
      quickGrid.appendChild(card2);

      // 3. High Contrast Card
      var isHigh = state.isHighContrast;
      var card3 = document.createElement("div");
      card3.className = "action-card " + (isHigh ? "active" : "");
      card3.innerHTML = `
        <div class="action-card-icon">
          <svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:none;stroke:#0091ff;stroke-width:2;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="action-card-label">High Contrast</div>
      `;
      card3.onclick = function () {
        state.isHighContrast = !state.isHighContrast;
        saveState(); applyEffects(); renderPanelBody();
      };
      quickGrid.appendChild(card3);

      // 4. Reading Mask Card
      var isMask = state.readingMask;
      var card4 = document.createElement("div");
      card4.className = "action-card " + (isMask ? "active" : "");
      card4.innerHTML = `
        <div class="action-card-icon">
          <svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:none;stroke:#0091ff;stroke-width:2;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <div class="action-card-label">Reading Mask</div>
      `;
      card4.onclick = function () {
        state.readingMask = !state.readingMask;
        saveState(); applyEffects(); renderPanelBody();
      };
      quickGrid.appendChild(card4);

      panelBody.appendChild(quickGrid);

      // Explore Smart Profiles Banner
      var exploreCard = document.createElement("div");
      exploreCard.className = "explore-banner";
      exploreCard.innerHTML = `
        <div>
          <div class="explore-title">Explore Smart Profiles</div>
          <div class="explore-sub">1-click accessibility configurations</div>
        </div>
        <div class="explore-arrow">→</div>
      `;
      exploreCard.onclick = function () {
        navBtns.forEach(function (b) { b.classList.remove("active"); });
        var pBtn = shadow.querySelector('[data-tab="profiles"]');
        if (pBtn) pBtn.classList.add("active");
        state.activeTab = "profiles";
        renderPanelBody();
      };
      panelBody.appendChild(exploreCard);
    }

    // 2. PROFILES (MODES TAB)
    else if (state.activeTab === "profiles" && !state.searchQuery) {
      renderProfilesGrid();
    }

    // 3. FEATURES (TYPOGRAPHY TAB)
    else if (state.activeTab === "features" && !state.searchQuery) {
      var scaleCard = document.createElement("div");
      scaleCard.className = "scale-card";
      scaleCard.innerHTML = `
        <div class="scale-title">Content Scaling</div>
        <div class="scale-controls">
          <button class="scale-btn" id="scale-minus">-</button>
          <div class="scale-val">${state.fontSize === 100 ? "Default" : state.fontSize + "%"}</div>
          <button class="scale-btn" id="scale-plus">+</button>
        </div>
      `;
      panelBody.appendChild(scaleCard);

      setTimeout(function () {
        var btnMinus = shadow.getElementById("scale-minus");
        var btnPlus = shadow.getElementById("scale-plus");
        if (btnMinus) btnMinus.onclick = function () {
          state.fontSize = Math.max(90, state.fontSize - 10);
          saveState(); applyEffects(); renderPanelBody();
        };
        if (btnPlus) btnPlus.onclick = function () {
          state.fontSize = Math.min(200, state.fontSize + 10);
          saveState(); applyEffects(); renderPanelBody();
        };
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
        var isAct = !!state[t.key];
        var box = document.createElement("div");
        box.className = "card-box " + (isAct ? "active" : "");
        box.innerHTML = `
          <div class="card-box-title">${t.name}</div>
          <div class="card-box-desc">${t.desc}</div>
          <div class="card-box-pill">${isAct ? "ON" : "OFF"}</div>
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
        { key: "highlightFocus", name: "Highlight Focus", desc: "Bright cyan outline on focus" },
        { key: "stopAnimations", name: "Stop Animations", desc: "Disable all site motion" },
      ];

      visionFeatures.forEach(function (v) {
        var isAct = !!state[v.key];
        var box = document.createElement("div");
        box.className = "card-box " + (isAct ? "active" : "");
        box.innerHTML = `
          <div class="card-box-title">${v.name}</div>
          <div class="card-box-desc">${v.desc}</div>
          <div class="card-box-pill">${isAct ? "ON" : "OFF"}</div>
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
          <button class="btn-hide-main" id="cb-none" style="padding:6px; font-size:11px; background:${state.colorBlindMode==='none'?'#004bff':'#f1f5f9'}; color:${state.colorBlindMode==='none'?'#fff':'#334155'}">Off</button>
          <button class="btn-hide-main" id="cb-prot" style="padding:6px; font-size:11px; background:${state.colorBlindMode==='protanopia'?'#004bff':'#f1f5f9'}; color:${state.colorBlindMode==='protanopia'?'#fff':'#334155'}">Red (Protan)</button>
          <button class="btn-hide-main" id="cb-deut" style="padding:6px; font-size:11px; background:${state.colorBlindMode==='deuteranopia'?'#004bff':'#f1f5f9'}; color:${state.colorBlindMode==='deuteranopia'?'#fff':'#334155'}">Green (Deuter)</button>
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
    var container = document.createElement("div");
    container.className = "profile-list-container";

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
      item.className = "profile-list-item " + (isActive ? "active" : "");
      item.innerHTML = `
        <div class="profile-item-row">
          <div>
            <div class="profile-item-title">${p.label}</div>
            <div class="profile-item-desc">${p.desc}</div>
          </div>
          <div class="toggle-switch ${isActive ? 'active' : ''}">
            <div class="toggle-knob"></div>
          </div>
        </div>
        ${isActive ? `<div class="profile-detail-box">${p.detail}</div>` : ""}
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
      container.appendChild(item);
    });

    panelBody.appendChild(container);
  }

  // Alex AI Assistant Chat Logic
  function getAlexReply(text) {
    var q = text.toLowerCase().trim();
    if (q.indexOf("more accessible") !== -1 || q.indexOf("make my website accessible") !== -1 || q.indexOf("get accessible") !== -1) {
      return "Awesome! 🚀 2all.ai makes web accessibility effortless:\n\n1️⃣ **Instant 2-Minute Installation**: Add our single-line JS script to your site.\n2️⃣ **Automated AI Remediation**: Automatically fixes missing alt-tags, ARIA attributes & contrast ratios in real time.\n3️⃣ **ADA & WCAG 2.1 AA Compliance**: Protects your business from legal risk while welcoming 20%+ more web visitors.\n\nWould you like to **Start a 7-day free trial** or **Book a live demo**?";
    }
    if (q.indexOf("account") !== -1 || q.indexOf("login") !== -1 || q.indexOf("sign in") !== -1) {
      return "Welcome back! 👋 You can sign in to your dashboard anytime at **2all.ai/login** to manage your domains and view real-time compliance reports!";
    }
    if (q.indexOf("hi") === 0 || q.indexOf("hello") === 0 || q.indexOf("hey") === 0) {
      return "Hi there! 👋 I'm Alex, your 2all.ai AI Assistant. I can help you with WCAG compliance, widget installation, pricing, or booking a live demo. What would you like to explore?";
    }
    if (q.indexOf("how") !== -1 && (q.indexOf("work") !== -1 || q.indexOf("it work") !== -1)) {
      return "2all.ai operates seamlessly in 3 simple steps:\n1️⃣ **Embed Snippet**: Copy our lightweight JavaScript snippet into your website footer.\n2️⃣ **Automated AI Scan**: Our AI engine scans your DOM for WCAG 2.1 AA violations.\n3️⃣ **Real-time Remediation**: The widget automatically adjusts screen reader tags, contrast, and fonts!";
    }
    if (q.indexOf("price") !== -1 || q.indexOf("cost") !== -1 || q.indexOf("plan") !== -1 || q.indexOf("trial") !== -1) {
      return "We offer simple, transparent pricing starting from **$49/month** with a 7-Day Risk-Free Trial! 💳 Visit **2all.ai/pricing** to pick a plan!";
    }
    if (q.indexOf("install") !== -1 || q.indexOf("script") !== -1 || q.indexOf("code") !== -1) {
      return "Installing 2all.ai takes under 2 minutes! ⚡ Sign up for a free trial at **2all.ai/register**, add your domain, and copy the script tag into your website's `</body>` tag.";
    }
    if (q.indexOf("ada") !== -1 || q.indexOf("wcag") !== -1 || q.indexOf("compliance") !== -1 || q.indexOf("legal") !== -1) {
      return "2all.ai provides comprehensive compliance coverage for **WCAG 2.1 & 2.2 Level AA**, **ADA Title III**, and **Section 508** guidelines! 🛡️";
    }
    if (q.indexOf("demo") !== -1 || q.indexOf("book") !== -1 || q.indexOf("call") !== -1) {
      return "I'd love to schedule a live demo for you! 📅 Visit **2all.ai/demo** to pick a time slot with our accessibility experts.";
    }
    if (q.indexOf("thank") !== -1 || q.indexOf("great") !== -1 || q.indexOf("ok") !== -1) {
      return "You're very welcome! 😊 Is there anything else I can help you with regarding web accessibility?";
    }
    return "Thank you for reaching out! 2all.ai helps businesses make their websites fully WCAG 2.1 AA & ADA compliant. Visit 2all.ai/register to start a free trial or email support@2all.ai!";
  }

  function renderAlexChatMessages() {
    var chatBody = shadow.getElementById("alex-chat-body");
    if (!chatBody) return;
    chatBody.innerHTML = "";

    state.alexMessages.forEach(function (m) {
      var item = document.createElement("div");
      item.className = "alex-msg-item " + m.from;
      
      var bubble = document.createElement("div");
      bubble.className = "alex-msg-bubble";
      bubble.innerHTML = m.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      item.appendChild(bubble);

      chatBody.appendChild(item);
    });

    var chipsContainer = document.createElement("div");
    chipsContainer.className = "alex-chips-list";
    var options = [
      "I want my website more accessible",
      "I have a 2all.ai account",
      "How to install widget code",
      "Is 2all.ai ADA & WCAG compliant?",
      "Book a live demo",
    ];

    options.forEach(function (opt) {
      var chip = document.createElement("div");
      chip.className = "alex-chip-item";
      chip.innerText = opt;
      chip.onclick = function () {
        sendAlexUserMessage(opt);
      };
      chipsContainer.appendChild(chip);
    });
    chatBody.appendChild(chipsContainer);

    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function sendAlexUserMessage(text) {
    state.alexMessages.push({ from: "user", text: text });
    saveState();
    renderAlexChatMessages();

    setTimeout(function () {
      var reply = getAlexReply(text);
      state.alexMessages.push({ from: "alex", text: reply });
      saveState();
      renderAlexChatMessages();
    }, 350);
  }

  setTimeout(function () {
    var alexInput = shadow.getElementById("alex-chat-input");
    var alexSend = shadow.getElementById("alex-chat-send");
    if (alexSend && alexInput) {
      alexSend.onclick = function () {
        if (alexInput.value.trim()) {
          sendAlexUserMessage(alexInput.value.trim());
          alexInput.value = "";
        }
      };
      alexInput.onkeypress = function (e) {
        if (e.key === "Enter" && alexInput.value.trim()) {
          sendAlexUserMessage(alexInput.value.trim());
          alexInput.value = "";
        }
      };
    }
  }, 100);

  function renderAIChatUI() {
    renderAlexChatMessages();
  }

  // Complete Live Effects & High-Priority !Important Overlays Engine
  function updateGlobalStyle() {
    var styleEl = document.getElementById("2all-global-effects-style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "2all-global-effects-style";
      document.head.appendChild(styleEl);
    }

    var css = "";

    // OpenDyslexic / Readable Font Override (Excludes Widget Host)
    if (state.fontFamily === "dyslexic" || state.dyslexiaFont) {
      css += `
        body, body *:not(#2all-ai-widget-host *):not(script):not(style) {
          font-family: 'OpenDyslexic', 'OpenDyslexic3', 'Comic Sans MS', sans-serif !important;
          letter-spacing: ${state.letterSpacing || 2}px !important;
          word-spacing: ${state.wordSpacing || 0.4}em !important;
        }
      `;
    } else if (state.fontFamily === "readable" || state.readableFont) {
      css += `
        body, body *:not(#2all-ai-widget-host *):not(script):not(style) {
          font-family: Verdana, Arial, Helvetica, sans-serif !important;
        }
      `;
    } else {
      if (state.letterSpacing > 0) {
        css += `
          body, body *:not(#2all-ai-widget-host *):not(script):not(style) {
            letter-spacing: ${state.letterSpacing}px !important;
          }
        `;
      }
      if (state.wordSpacing > 0) {
        css += `
          body, body *:not(#2all-ai-widget-host *):not(script):not(style) {
            word-spacing: ${state.wordSpacing}em !important;
          }
        `;
      }
    }

    // Text Alignment
    if (state.textAlignment === "center") {
      css += `
        body, body *:not(#2all-ai-widget-host *):not(script):not(style) {
          text-align: center !important;
        }
      `;
    }

    // Line Height
    if (state.lineHeight !== 1.5) {
      css += `
        body, body *:not(#2all-ai-widget-host *):not(script):not(style) {
          line-height: ${state.lineHeight} !important;
        }
      `;
    }

    // Dark Mode Contrast
    if (state.isDarkMode || state.isHighContrast) {
      css += `
        html, body {
          background-color: #0f172a !important;
          color: #f8fafc !important;
        }
        body *:not(#2all-ai-widget-host *):not(script):not(style) {
          background-color: transparent !important;
          color: #f8fafc !important;
        }
        div, section, article, header, footer, main, nav, card {
          background-color: rgba(15, 23, 42, 0.95) !important;
          border-color: #334155 !important;
        }
        p, span, h1, h2, h3, h4, h5, h6, li, a, label, strong {
          color: #f8fafc !important;
        }
      `;
    }

    // Light Mode High Contrast
    if (state.isLightMode) {
      css += `
        html, body {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        p, span, h1, h2, h3, h4, h5, h6, li, a, label, strong {
          color: #000000 !important;
          font-weight: 700 !important;
        }
      `;
    }

    // Monochrome
    if (state.monochrome) {
      css += `
        html {
          filter: grayscale(100%) !important;
        }
      `;
    }

    // Highlight Links
    if (state.highlightLinks) {
      css += `
        a, a * {
          background-color: #fef08a !important;
          color: #854d0e !important;
          text-decoration: underline !important;
          font-weight: 800 !important;
        }
      `;
    }

    // Highlight Headings
    if (state.highlightHeadings) {
      css += `
        h1, h2, h3, h4, h5, h6 {
          outline: 3px solid #004bff !important;
          outline-offset: 3px !important;
          background-color: rgba(0, 75, 255, 0.08) !important;
        }
      `;
    }

    // Highlight Buttons
    if (state.highlightButtons) {
      css += `
        button, [role="button"], input[type="submit"], input[type="button"], a.btn {
          outline: 3px solid #16a34a !important;
          outline-offset: 3px !important;
        }
      `;
    }

    // Highlight Focus
    if (state.highlightFocus) {
      css += `
        *:focus, *:focus-visible {
          outline: 4px solid #004bff !important;
          outline-offset: 4px !important;
          box-shadow: 0 0 15px rgba(0, 75, 255, 0.9) !important;
        }
      `;
    }

    // Large Custom Cursor
    if (state.cursorSize === "large" || state.cursorSize === "huge") {
      css += `
        body, body *:not(#2all-ai-widget-host *) {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='%23004bff' stroke='%23ffffff' stroke-width='2'%3E%3Cpath d='M3 3l7 18 3-7 7-3L3 3z'/%3E%3C/svg%3E"), auto !important;
        }
      `;
    }

    // Stop Animations / Reduce Motion
    if (state.stopAnimations || state.reduceMotion) {
      css += `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
      `;
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
        ruler.style.cssText = "position:fixed;left:0;width:100vw;height:6px;background:#004bff;box-shadow:0 0 10px rgba(0,75,255,0.8);pointer-events:none;z-index:2147483646;display:none;top:0px;";
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
        popup.style.cssText = "position:fixed;pointer-events:none;z-index:2147483646;background:#0f172a;color:#ffffff;padding:8px 16px;border-radius:12px;font-size:20px;font-weight:800;box-shadow:0 10px 30px rgba(0,0,0,0.3);border:2px solid #004bff;display:none;max-width:400px;word-break:break-word;";
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

  // Universal Effect Applicator
  function applyEffects() {
    var doc = document.documentElement;

    // Typography & Font Scale
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

    // Live Overlays & High-Priority !Important Global Effects Engine
    updateGlobalStyle();
    updateReadingMask();
    updateReadingRuler();
    updateTextMagnifier();
    updateTextToSpeech();
  }

  // Initial Panel Render
  renderPanelBody();
  applyEffects();
})();
