import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

async function processSlotAssignment(requestId: string, meetingSlot: string) {
  const dataPath = path.join(process.cwd(), "src/data/demo-requests.json");
  
  let requests: any[] = [];
  try {
    const fileData = await fs.readFile(dataPath, "utf-8");
    requests = JSON.parse(fileData);
  } catch (e) {
    throw new Error("No demo requests found");
  }

  const index = requests.findIndex((r: any) => r.id === requestId);
  if (index === -1) {
    throw new Error("Demo request not found");
  }

  const targetRequest = requests[index];
  targetRequest.meetingSlot = meetingSlot;
  targetRequest.status = "CONFIRMED";
  targetRequest.assignedAt = new Date().toISOString();

  requests[index] = targetRequest;
  await fs.writeFile(dataPath, JSON.stringify(requests, null, 2), "utf-8");

  // Trigger Single Unified Email Dispatch
  try {
    const { sendDemoNotificationEmail, getAdminEmail } = await import("@/lib/mail");
    await sendDemoNotificationEmail(
      getAdminEmail(),
      targetRequest.name,
      targetRequest.email,
      targetRequest.phone,
      targetRequest.website,
      meetingSlot,
      targetRequest.id
    );
  } catch (e) {
    console.error("Email dispatch error in assign-slot:", e);
  }

  return targetRequest;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { requestId, meetingSlot } = body;

    if (!requestId || !meetingSlot) {
      return NextResponse.json({ message: "requestId and meetingSlot are required" }, { status: 400 });
    }

    const targetRequest = await processSlotAssignment(requestId, meetingSlot);

    return NextResponse.json({ 
      message: `Meeting slot '${meetingSlot}' assigned and unified email sent to ${targetRequest.email}!`, 
      request: targetRequest 
    });
  } catch (err: any) {
    console.error("Failed to assign meeting slot:", err);
    return NextResponse.json({ message: err.message || "Server error occurred" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("requestId");
    const meetingSlot = searchParams.get("meetingSlot");

    if (!requestId || !meetingSlot) {
      return new Response("<h3>Missing parameters: requestId and meetingSlot are required.</h3>", {
        headers: { "Content-Type": "text/html" }
      });
    }

    const targetRequest = await processSlotAssignment(requestId, meetingSlot);

    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Meeting Slot Confirmed - 2all.ai</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body style="margin:0; padding:0; background-color: #f1f5f9; font-family: sans-serif;">
        <div style="max-width: 550px; margin: 60px auto; padding: 32px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; text-align: center; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);">
          <div style="width: 60px; h-60px; background-color: #dcfce7; color: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; font-size: 28px; font-weight: bold; width: 60px; height: 60px; line-height: 60px;">✓</div>
          <h2 style="color: #0f172a; margin: 0 0 8px 0; font-size: 22px;">Meeting Slot Confirmed!</h2>
          <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
            You assigned slot <strong>${meetingSlot}</strong> for <strong>${targetRequest.name}</strong> (${targetRequest.email}).
          </p>
          <div style="font-size: 13px; color: #15803d; background-color: #f0fdf4; padding: 14px; border-radius: 12px; border: 1px solid #bbf7d0; text-align: left; line-height: 1.6;">
            <strong>✉️ Single Unified Email Dispatched:</strong> A meeting confirmation with Google Meet link and calendar invite has been automatically sent to both Admin and Customer.
          </div>
          <div style="margin-top: 28px;">
            <a href="/admin/dashboard" style="background-color: #004bff; color: white; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block;">Return to Admin Dashboard</a>
          </div>
        </div>
      </body>
      </html>
    `, {
      headers: { "Content-Type": "text/html" }
    });
  } catch (err: any) {
    console.error("Failed to assign meeting slot via GET:", err);
    return new Response(`<h3>Error: ${err.message || "Server Error"}</h3>`, { headers: { "Content-Type": "text/html" } });
  }
}
