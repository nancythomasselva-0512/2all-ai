import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { plan, billing = "yearly" } = body;

    if (!plan) {
      return NextResponse.json({ message: "Plan is required" }, { status: 400 });
    }

    // Map plan to USD Price dynamically from plans-config.json
    let usdPrice = 0;
    const planName = plan.toLowerCase();

    try {
      const configPath = path.join(process.cwd(), "src/data/plans-config.json");
      const data = await fs.readFile(configPath, "utf-8");
      const config = JSON.parse(data);
      const foundPlan = config.plans?.find(
        (p: any) => p.id.toLowerCase() === planName || p.name.toLowerCase() === planName
      );
      if (foundPlan) {
        const rawStr = billing === "yearly" ? foundPlan.yearlyPrice : foundPlan.monthlyPrice;
        const numeric = parseFloat(rawStr.replace(/[^0-9.]/g, ""));
        if (!isNaN(numeric) && numeric > 0) {
          usdPrice = numeric;
        }
      }
    } catch (e) {
      console.warn("Could not read plans-config.json for order price, using fallback mapping");
    }

    // Fallback price mapping if plans-config.json numeric parse is not found
    if (!usdPrice) {
      if (planName === "micro") {
        usdPrice = billing === "yearly" ? 490 : 49;
      } else if (planName === "growth" || planName === "business") {
        usdPrice = billing === "yearly" ? 1490 : 149;
      } else if (planName === "scale" || planName === "advanced") {
        usdPrice = billing === "yearly" ? 3990 : 399;
      } else if (planName === "enterprise") {
        usdPrice = billing === "yearly" ? 9990 : 999;
      } else {
        // Fallback default price for any custom plan so payment NEVER fails with 400!
        usdPrice = billing === "yearly" ? 490 : 49;
      }
    }

    // Convert USD to INR (approx 85 INR per USD) for Razorpay native currency support
    const exchangeRate = 85;
    const inrAmount = usdPrice * exchangeRate;
    const amountInPaise = Math.round(inrAmount * 100);

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if keys are configured
    if (!keyId || !keySecret) {
      console.warn("[Razorpay] Warning: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not configured. Falling back to sandbox order generation.");
      
      // Return a simulated/mock order structure
      return NextResponse.json({
        mock: true,
        orderId: `order_mock_${Math.random().toString(36).substring(2, 9)}`,
        amount: amountInPaise,
        currency: "INR",
        plan,
        usdPrice
      });
    }

    // Initialize Razorpay
    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    });

    return NextResponse.json({
      mock: false,
      keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      plan,
      usdPrice
    });

  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return NextResponse.json({ message: "Failed to initialize payment order" }, { status: 500 });
  }
}
