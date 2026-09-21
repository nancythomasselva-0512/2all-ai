/**
 * 2all.ai Accessibility Widget Loader
 * Version: 2.1.0
 * Lightweight asynchronous bootstrap snippet for dynamic accessibility widget injection.
 * Works universally across any 3rd party website (Shopify, WordPress, Webflow, React, PHP, HTML, etc.)
 */
(function () {
  if (window.__2ALL_WIDGET_LOADED__) return;
  window.__2ALL_WIDGET_LOADED__ = true;

  var currentScript =
    document.currentScript ||
    (function () {
      var scripts = document.getElementsByTagName("script");
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src && (scripts[i].src.indexOf("loader.js") !== -1 || scripts[i].getAttribute("data-api-key"))) {
          return scripts[i];
        }
      }
      return scripts[scripts.length - 1];
    })();

  var apiKey = currentScript ? (currentScript.getAttribute("data-api-key") || currentScript.getAttribute("data-key") || currentScript.getAttribute("apiKey")) : "";
  var domain = currentScript ? (currentScript.getAttribute("data-domain") || window.location.hostname) : window.location.hostname;
  var apiUrl = currentScript ? currentScript.getAttribute("data-api-url") : "";

  // Extract API key from script src query parameters e.g. loader.js?key=PUB_xxx or loader.js?apiKey=PUB_xxx
  if (!apiKey && currentScript && currentScript.src) {
    var keyMatch = currentScript.src.match(/[?&](key|apiKey)=([^&]+)/);
    if (keyMatch && keyMatch[2]) {
      apiKey = decodeURIComponent(keyMatch[2]);
    }
  }

  // Infer apiUrl from script src origin e.g. http://localhost:3000/loader.js
  if (!apiUrl && currentScript && currentScript.src) {
    if (currentScript.src.indexOf("http") === 0) {
      try {
        var parsedUrl = new URL(currentScript.src);
        apiUrl = parsedUrl.origin;
      } catch (e) {
        var urlParts = currentScript.src.split("/");
        apiUrl = urlParts[0] + "//" + urlParts[2];
      }
    }
  }
  if (!apiUrl) {
    if (typeof window !== "undefined" && window.location && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
      apiUrl = window.location.port === "3000" ? window.location.origin : "http://localhost:3000";
    } else {
      apiUrl = "https://2all-ai.mccmrfip.in";
    }
  }
  apiUrl = (apiUrl || "").replace(/\/+$/, "");

  var bootstrapUrl =
    (apiUrl || "") +
    "/api/widget/bootstrap?apiKey=" +
    encodeURIComponent(apiKey || "demo") +
    "&domain=" +
    encodeURIComponent(domain || window.location.hostname) +
    "&url=" +
    encodeURIComponent(window.location.href) +
    "&_t=" +
    new Date().getTime();

  function loadCore(scriptPath) {
    if (window.__2ALL_CORE_INJECTED__) return;
    window.__2ALL_CORE_INJECTED__ = true;
    var fullScriptUrl = scriptPath.indexOf("http") === 0 ? scriptPath : ((apiUrl || "") + scriptPath);
    var cacheBustUrl = fullScriptUrl + (fullScriptUrl.indexOf("?") >= 0 ? "&" : "?") + "_v=" + (new Date().getTime());
    var coreScript = document.createElement("script");
    coreScript.src = cacheBustUrl;
    coreScript.async = true;
    coreScript.onerror = function () {
      console.error("[2all.ai] Failed to load widget core bundle from: " + cacheBustUrl);
    };
    (document.head || document.body).appendChild(coreScript);
  }

  var xhr = new XMLHttpRequest();
  xhr.open("GET", bootstrapUrl, true);
  xhr.timeout = 5000;
  xhr.ontimeout = function () {
    console.warn("[2all.ai] Bootstrap timed out, loading standalone widget.");
    loadCore("/widget-core.js");
  };
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          var res = JSON.parse(xhr.responseText);
          if (res.success) {
            window.__2ALL_CONFIG__ = res.config || {};
            window.__2ALL_TENANT__ = res.tenantId;
            window.__2ALL_DOMAIN__ = res.domain;
            loadCore(res.scriptUrl || "/widget-core.js");
          } else {
            console.warn("[2all.ai]", res.message || res.error);
            loadCore("/widget-core.js");
          }
        } catch (e) {
          loadCore("/widget-core.js");
        }
      } else {
        console.warn("[2all.ai] Bootstrap returned " + xhr.status + ", loading standalone widget.");
        loadCore("/widget-core.js");
      }
    }
  };
  try {
    xhr.send();
  } catch (err) {
    loadCore("/widget-core.js");
  }
})();
