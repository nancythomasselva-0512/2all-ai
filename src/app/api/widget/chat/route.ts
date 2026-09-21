import { NextResponse } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = (body.message || "").trim();
    const lower = message.toLowerCase();

    if (!message) {
      return NextResponse.json(
        { text: "Please provide a question or message!" },
        { headers: CORS_HEADERS }
      );
    }

    // 1. Color Blindness
    if (
      lower.includes("color blind") || lower.includes("colorblind") ||
      lower.includes("protanopia") || lower.includes("deuteranopia") ||
      lower.includes("tritanopia") || lower.includes("achromatopsia") ||
      lower.includes("monochrom") || lower.includes("daltonism") ||
      lower.includes("color vision") || (lower.includes("color") && lower.includes("blind"))
    ) {
      return NextResponse.json({
        text: "🎨 **Color Vision Deficiency (Color Blindness) Filters**:\n\n" +
              "2all.ai provides 4 specialized vision compensation filters designed for different types of color blindness:\n\n" +
              "• **Protanopia (Red-Blind / Red-Weak)**: Calibrates red wavelengths so you can easily distinguish reds from greens, browns, and dark tones.\n" +
              "• **Deuteranopia (Green-Blind / Green-Weak)**: Adjusts green spectrum clarity for the most common form of color blindness.\n" +
              "• **Tritanopia (Blue-Blind / Blue-Weak)**: Amplifies blue and yellow differentiation with balanced contrast tuning.\n" +
              "• **Achromatopsia (Monochromacy / Total Color Blindness)**: Converts the entire page to ultra-crisp, high-contrast monochrome grayscale.\n\n" +
              "You can test and apply any of these filters directly from the **Vision Tab**!",
        actionLabel: "Open Vision Tab",
        actionType: "open_vision"
      }, { headers: CORS_HEADERS });
    }

    // 2. Background & Text Colors
    if (
      lower.includes("background") || lower.includes("bg color") ||
      lower.includes("adjust bg") || lower.includes("title color") ||
      lower.includes("text color") || lower.includes("heading color") ||
      lower.includes("change color") || lower.includes("bg tint")
    ) {
      return NextResponse.json({
        text: "🎨 **Adjusting Background & Text Colors**:\n\n" +
              "You can customize page colors anytime in the **Vision** tab:\n" +
              "• **Adjust Background Colors**: Choose from 8 accessible shades (White, Black, Blue, Green, Amber, Purple, Slate, Teal) to eliminate glare and eye fatigue.\n" +
              "• **Adjust Title & Text Colors**: Pick high-contrast custom colors for headings and body paragraphs.\n" +
              "• All backgrounds, sections, cards, and container gradients are styled live without breaking layouts!",
        actionLabel: "Open Vision Tab",
        actionType: "open_vision"
      }, { headers: CORS_HEADERS });
    }

    // 3. Voice Navigation
    if (
      lower.includes("voice navigation") || lower.includes("voice command") ||
      lower.includes("microphone") || lower.includes("mic") ||
      lower.includes("hands free") || lower.includes("speak command")
    ) {
      return NextResponse.json({
        text: "🎙️ **Voice Navigation (Hands-Free Control)**:\n\n" +
              "Speak natural voice commands into your microphone to control the website:\n" +
              "• *\"Read page\"* or *\"Speak text\"* → Starts page narrator.\n" +
              "• *\"Scroll down\"* / *\"Scroll up\"* → Smooth page navigation.\n" +
              "• *\"Dark mode\"* / *\"Reset\"* → Toggles accessibility modes.\n" +
              "• *\"Pricing\"* / *\"Contact\"* → Direct navigation.\n\n" +
              "Click below to activate voice control!",
        actionLabel: "Enable Voice Navigation",
        actionType: "voice_nav"
      }, { headers: CORS_HEADERS });
    }

    // 4. Voice / Speech / Read Aloud / TTS
    if (
      lower.includes("voice") || lower.includes("speech") || lower.includes("tts") ||
      lower.includes("read page") || lower.includes("read aloud") || lower.includes("text to speech") ||
      lower.includes("narrat") || lower.includes("read text") || lower.includes("listen") ||
      lower.includes("audio") || lower.includes("speak") ||
      (lower.includes("read") && !lower.includes("ruler") && !lower.includes("mask"))
    ) {
      return NextResponse.json({
        text: "🔊 **Voice & Reading Tools**:\n\n" +
              "• **Read Entire Page**: Natural voice reading with real-time sentence highlight and auto-scroll.\n" +
              "• **Read Selected Text**: Highlight any sentence or paragraph on the page to hear it spoken.\n" +
              "• **Voice Settings Parameters**: Choose from available system voices (Google UK English, US English, etc.), adjust Reading Speed (0.5x to 2x), and pitch live!",
        actionLabel: "Start Reading Page",
        actionType: "read_page"
      }, { headers: CORS_HEADERS });
    }

    // 5. Dyslexia Mode
    if (
      lower.includes("dyslexi") || lower.includes("letter flip") ||
      lower.includes("opendyslexic") || lower.includes("b/d/p/q") ||
      lower.includes("gravity font")
    ) {
      return NextResponse.json({
        text: "📚 **Dyslexia Friendly Mode**:\n\n" +
              "• Applies **OpenDyslexic** typography with heavy weighted gravity bottoms to prevent letter inversion and flipping (b/d/p/q).\n" +
              "• Expands letter spacing (+0.5px), word spacing (+0.05em), and line height (1.6x) for effortless scanning and improved reading fluency.",
        actionLabel: "Enable Dyslexia Mode",
        actionType: "dyslexia"
      }, { headers: CORS_HEADERS });
    }

    // 6. ADHD Mode
    if (
      lower.includes("adhd") || lower.includes("focus") || lower.includes("distract") ||
      lower.includes("reading mask") || lower.includes("reading ruler") ||
      lower.includes("mask") || lower.includes("ruler")
    ) {
      return NextResponse.json({
        text: "⚡ **ADHD & Focus Assistance**:\n\n" +
              "• **Reading Mask**: Creates a clear horizontal reading spotlight that moves with your cursor while gently dimming the rest of the screen.\n" +
              "• **Reading Ruler**: Provides a sharp line guide underneath your active reading position.\n" +
              "• **Stop Animations**: Freezes moving banners, autoplay videos, and distracting GIFs.",
        actionLabel: "Enable Reading Mask",
        actionType: "reading_mask"
      }, { headers: CORS_HEADERS });
    }

    // 7. Pricing
    if (
      lower.includes("pricing") || lower.includes("price") || lower.includes("cost") ||
      lower.includes("plan") || lower.includes("how much") || lower.includes("buy") ||
      lower.includes("trial") || lower.includes("subscription") || lower.includes("pay")
    ) {
      return NextResponse.json({
        text: "💰 **2all.ai Pricing Plans**:\n\n" +
              "• **Standard**: $49/month (Under 10k pageviews/mo).\n" +
              "• **Business**: $99/month (Automated AI remediation & monthly audit reports).\n" +
              "• **Enterprise**: Custom dedicated SLA, custom widget branding & legal protection support.\n\n" +
              "🎉 All plans include a **7-Day Free Trial** with no commitment!",
        actionLabel: "View Pricing",
        actionType: "pricing"
      }, { headers: CORS_HEADERS });
    }

    // 8. Installation & Embed Code
    if (
      lower.includes("install") || lower.includes("embed") || lower.includes("script") ||
      lower.includes("code") || lower.includes("wordpress") || lower.includes("shopify") ||
      lower.includes("setup") || lower.includes("how to add")
    ) {
      const host = req.headers.get("host") || "";
      const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
      const prodUrl = isLocal ? "http://localhost:3000/loader.js" : "https://2all-ai.mccmrfip.in/loader.js";
      return NextResponse.json({
        text: "⚡ **Quick 2-Minute Installation**:\n\n" +
              "Simply paste our script before the closing `</body>` tag on your website:\n\n" +
              `\`\`\`html\n<script src="${prodUrl}" data-api-key="YOUR_KEY" async></script>\n\`\`\`\n\n` +
              "Compatible with WordPress, Shopify, Next.js, React, Webflow, Squarespace, and custom HTML!",
        actionLabel: "Get Embed Code",
        actionType: "install"
      }, { headers: CORS_HEADERS });
    }

    // 9. General Tools Inquiry (ONLY when explicitly asking for all tools or menu)
    if (
      lower.includes("all tools") || lower.includes("list the tools") ||
      lower.includes("list all") || lower.includes("list of tools") ||
      lower.includes("what tools") || lower.includes("what features") ||
      lower.includes("what can you do") || lower.includes("what do you do") ||
      lower.includes("capabilities") || lower.includes("overview") ||
      lower === "tools" || lower === "features" || lower === "list" || lower === "menu" || lower === "help"
    ) {
      return NextResponse.json({
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
        actionType: "open_vision"
      }, { headers: CORS_HEADERS });
    }

    // 9. Intelligent Universal Fallback (Custom context-driven response)
    return NextResponse.json({
      text: "💡 **2all.ai Accessibility Assistant**:\n\n" +
            "Regarding: *\"" + message + "\"*\n\n" +
            "2all.ai provides instant accessibility adjustments directly on this page:\n" +
            "• **Vision**: 4 Color Blindness filters (Protanopia, Deuteranopia, Tritanopia, Grayscale), 8 background tints, and contrast modes.\n" +
            "• **Audio**: Text-to-speech page narrator with natural voices and hands-free microphone voice navigation.\n" +
            "• **Reading**: OpenDyslexic typography, ADHD Reading Mask & Ruler, and text scaling up to 200%.\n" +
            "• **Motor**: Enlarged cursors, clickable target highlights, and keyboard navigation rings.\n\n" +
            "You can ask me to activate any feature or explain how it works!",
      actionLabel: "Explore All Features",
      actionType: "explore_all"
    }, { headers: CORS_HEADERS });

  } catch (error: any) {
    return NextResponse.json(
      { text: "I encountered an error processing your question. Please try again!" },
      { headers: CORS_HEADERS, status: 500 }
    );
  }
}
