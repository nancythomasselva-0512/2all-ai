import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Helper to log sent emails to a persistent JSON log for dashboard tracking
const logEmailSent = (type: string, to: string, subject: string, status: "SUCCESS" | "FAILED", details?: string) => {
  try {
    const logFilePath = path.join(process.cwd(), "public", "sent_emails.json");
    let existingLogs: any[] = [];
    if (fs.existsSync(logFilePath)) {
      const content = fs.readFileSync(logFilePath, "utf8");
      try {
        existingLogs = JSON.parse(content);
      } catch (e) {
        existingLogs = [];
      }
    }
    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type,
      to,
      subject,
      status,
      details: details || "Dispatched via Gmail SMTP (aachinancy@gmail.com)",
    };
    existingLogs.unshift(newEntry);
    fs.writeFileSync(logFilePath, JSON.stringify(existingLogs.slice(0, 100), null, 2), "utf8");
  } catch (e) {
    console.error("Failed to log sent email to JSON file:", e);
  }
};

// SMTP Transporter configuration (Optimized for Gmail SMTP & TLS)
const getTransporter = () => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = process.env.SMTP_PORT || "587";
  const user = process.env.SMTP_USER || "aachinancy@gmail.com";
  const pass = process.env.SMTP_PASS || "uzlcibhsmlkcdhuj";

  if (!user || !pass) {
    console.warn("[SMTP] Warning: SMTP credentials are not configured.");
    return null;
  }

  // Gmail SMTP Transport
  if (host.includes("gmail") || user.includes("gmail")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(port, 10),
    secure: port === "465",
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const getFromHeader = () => {
  let email = process.env.SMTP_USER || "aachinancy@gmail.com";
  let name = "2all.ai Team";

  try {
    const configPath = path.join(process.cwd(), "src/data/site-config.json");
    if (fs.existsSync(configPath)) {
      const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      if (configData.smtpFromEmail && typeof configData.smtpFromEmail === "string" && configData.smtpFromEmail.trim()) {
        email = configData.smtpFromEmail.trim();
      }
      if (configData.smtpFromName && typeof configData.smtpFromName === "string" && configData.smtpFromName.trim()) {
        name = configData.smtpFromName.trim();
      }
    }
  } catch (e) {}

  return process.env.SMTP_FROM || `"${name}" <${email}>`;
};

export async function sendPaymentSuccessEmail(toEmail: string, userName: string, planName: string, amount: number) {
  const transporter = getTransporter();
  const from = getFromHeader();
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const templateVars: Record<string, string> = {
    "{{userName}}": userName || "Subscriber",
    "{{userEmail}}": toEmail,
    "{{planName}}": planName.toUpperCase(),
    "{{amount}}": amount.toString(),
    "{{baseUrl}}": baseUrl,
  };

  const customTpl = getCustomEmailTemplate("paymentSuccess");
  const subject = customTpl?.subject
    ? compileTemplate(customTpl.subject, templateVars)
    : `Payment Confirmed - Your 2all.ai ${planName} Subscription is Active!`;

  const htmlContent = customTpl?.body
    ? compileTemplate(customTpl.body, templateVars)
    : `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b;">
      <h2 style="color: #004bff; margin-bottom: 8px;">2all.ai</h2>
      <hr style="border: 0; border-top: 1px solid #f1f5f9; margin-bottom: 20px;" />
      <p style="font-size: 16px; font-weight: bold; margin-top: 0;">Hi ${userName || "Subscriber"},</p>
      <p style="font-size: 14px; line-height: 1.5; color: #475569;">
        We are thrilled to confirm that your payment was successfully processed. Your 2all.ai <strong>${planName.toUpperCase()}</strong> plan is now active!
      </p>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 24px 0; font-size: 13px; line-height: 1.6;">
        <h4 style="margin: 0 0 10px 0; color: #0f172a; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Transaction Details</h4>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: #64748b;">Plan Selected:</span>
          <strong style="color: #0f172a;">${planName.toUpperCase()}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: #64748b;">Amount Paid:</span>
          <strong style="color: #0f172a;">$${amount} (USD)</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #64748b;">Status:</span>
          <strong style="color: #10b981;">SUCCESSFUL</strong>
        </div>
      </div>
      <div style="margin: 28px 0; text-align: center;">
        <a href="${baseUrl}/dashboard" style="background-color: #004bff; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: bold; display: inline-block;">Go to Dashboard</a>
      </div>
    </div>
  `;

  if (!transporter) {
    console.log(`[SMTP SIMULATOR] Email would be sent to: ${toEmail}`);
    logEmailSent("Payment Success", toEmail, subject, "SUCCESS", "Simulated mode");
    return;
  }

  try {
    await transporter.sendMail({
      from,
      to: toEmail,
      subject,
      html: htmlContent,
    });
    console.log(`[SMTP] Payment success receipt sent to ${toEmail}`);
    logEmailSent("Payment Success", toEmail, subject, "SUCCESS");
  } catch (err: any) {
    console.error("[SMTP] Failed to send payment confirmation email:", err);
    logEmailSent("Payment Success", toEmail, subject, "FAILED", err.message);
  }
}

export const getAdminEmail = (): string => {
  try {
    const configPath = path.join(process.cwd(), "src/data/site-config.json");
    if (fs.existsSync(configPath)) {
      const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      if (configData.notificationAdminEmail && typeof configData.notificationAdminEmail === "string" && configData.notificationAdminEmail.trim()) {
        return configData.notificationAdminEmail.trim();
      }
    }
  } catch (e) {
    // Fallback if file read fails
  }
  return process.env.ADMIN_EMAIL || process.env.SMTP_USER || "nancythomasselva@gmail.com";
};

const getCustomEmailTemplate = (key: string) => {
  try {
    const tPath = path.join(process.cwd(), "src/data/email-templates.json");
    if (fs.existsSync(tPath)) {
      const data = JSON.parse(fs.readFileSync(tPath, "utf-8"));
      if (data && data[key]) {
        return data[key];
      }
    }
  } catch (e) {}
  return null;
};

const compileTemplate = (templateStr: string, variables: Record<string, string>) => {
  let result = templateStr;
  Object.keys(variables).forEach(k => {
    const pattern = new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    result = result.replace(pattern, variables[k] || "");
  });
  return result;
};

export async function sendDemoNotificationEmail(
  adminEmail: string,
  leadName: string,
  leadEmail: string,
  leadPhone: string,
  leadWebsite: string,
  meetingSlot?: string,
  requestId?: string
) {
  const transporter = getTransporter();
  const from = getFromHeader();
  const targetAdmin = getAdminEmail();
  const meetRoomId = leadEmail.replace(/[^a-zA-Z0-9]/g, "").substring(0, 10) || "demo";
  const meetLink = `https://meet.google.com/2all-ai-demo-${meetRoomId}`;
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const isSkipped = !meetingSlot || meetingSlot.toLowerCase().includes("skipped");

  const templateVars: Record<string, string> = {
    "{{leadName}}": leadName,
    "{{leadEmail}}": leadEmail,
    "{{leadPhone}}": leadPhone,
    "{{leadWebsite}}": leadWebsite,
    "{{meetingSlot}}": meetingSlot || "",
    "{{meetLink}}": meetLink,
    "{{meetLinkEnc}}": encodeURIComponent(meetLink),
    "{{baseUrl}}": baseUrl,
  };

  if (!isSkipped) {
    // =========================================================================
    // SCENARIO 1: SLOT IS CONFIRMED -> SEND DISTINCT CONFIRMED EMAILS
    // =========================================================================
    const customConfirmed = getCustomEmailTemplate("demoConfirmedCustomer");

    // 1. CONFIRMED EMAIL TO CUSTOMER
    const customerSubject = customConfirmed?.subject
      ? compileTemplate(customConfirmed.subject, templateVars)
      : `[CONFIRMED DEMO] Your 2all.ai Demo is Scheduled for ${meetingSlot}`;

    const customerHtmlContent = customConfirmed?.body
      ? compileTemplate(customConfirmed.body, templateVars)
      : `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b; background-color: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #004bff; margin: 0; font-size: 22px;">2all.ai</h2>
          <span style="font-size: 11px; font-weight: bold; background-color: #dcfce7; color: #15803d; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">Meeting Confirmed</span>
        </div>

        <p style="font-size: 15px; font-weight: bold; color: #0f172a; margin-top: 0;">Hi ${leadName},</p>
        
        <p style="font-size: 14px; line-height: 1.6; color: #475569;">
          Thank you for scheduling a 1-on-1 accessibility demo for <strong><a href="${leadWebsite}" target="_blank" style="color: #004bff;">${leadWebsite}</a></strong>! Your meeting slot is confirmed.
        </p>

        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin: 20px 0; font-size: 13px; line-height: 1.8;">
          <h4 style="margin: 0 0 8px 0; color: #166534; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">📅 Your Confirmed Meeting Details</h4>
          <div style="font-size: 16px; font-weight: 800; color: #15803d; margin-bottom: 12px;">📅 ${meetingSlot}</div>
          <div style="margin-bottom: 12px;">
            <strong>🎥 Google Meet Video Link:</strong><br/>
            <a href="${meetLink}" target="_blank" style="color: #004bff; font-weight: bold; font-size: 14px;">${meetLink}</a>
          </div>
          <div>
            <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=2all.ai+Accessibility+Demo+Session&details=Live+1-on-1+web+accessibility+demo+and+compliance+audit+walkthrough&location=${encodeURIComponent(meetLink)}" 
               target="_blank"
               style="background-color: #004bff; color: white; padding: 10px 20px; border-radius: 8px; font-size: 12px; font-weight: bold; text-decoration: none; display: inline-block;">
              📅 Add to Google Calendar
            </a>
          </div>
        </div>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin: 20px 0; font-size: 12px; color: #64748b;">
          <strong>Need to reschedule?</strong> Contact our support team at <a href="mailto:support@2all.ai" style="color: #004bff;">support@2all.ai</a>.
        </div>

        <hr style="border: 0; border-top: 1px solid #f1f5f9; margin-top: 24px; margin-bottom: 16px;" />
        <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
          &copy; ${new Date().getFullYear()} 2all.ai Inc. All rights reserved.
        </p>
      </div>
    `;

    // 2. CONFIRMED EMAIL TO ADMIN
    const adminSubject = `[CONFIRMED DEMO ALERT] Demo Call with ${leadName} - ${meetingSlot}`;
    const adminHtmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b; background-color: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #004bff; margin: 0; font-size: 22px;">2all.ai Admin</h2>
          <span style="font-size: 11px; font-weight: bold; background-color: #dcfce7; color: #15803d; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">Confirmed Demo</span>
        </div>

        <h3 style="color: #0f172a; margin-top: 0;">Confirmed Demo Booking Alert</h3>
        <p style="font-size: 14px; color: #475569; line-height: 1.5;">
          A client has confirmed a live demo call for <strong><a href="${leadWebsite}" target="_blank" style="color: #004bff;">${leadWebsite}</a></strong>.
        </p>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px; line-height: 1.8;">
          <h4 style="margin: 0 0 10px 0; color: #0f172a; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">📋 Client Details</h4>
          <div><strong>Name:</strong> ${leadName}</div>
          <div><strong>Email:</strong> <a href="mailto:${leadEmail}" style="color: #004bff;">${leadEmail}</a></div>
          <div><strong>Phone:</strong> ${leadPhone}</div>
          <div><strong>Website:</strong> <a href="${leadWebsite}" target="_blank" style="color: #004bff;">${leadWebsite}</a></div>
        </div>

        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px;">
          <div><strong>Confirmed Slot:</strong> <span style="font-weight: bold; color: #15803d;">${meetingSlot}</span></div>
          <div style="margin-top: 8px;"><strong>Join Video Call:</strong> <a href="${meetLink}" target="_blank" style="color: #004bff; font-weight: bold;">${meetLink}</a></div>
        </div>

        <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 24px;">
          &copy; ${new Date().getFullYear()} 2all.ai Inc. All rights reserved.
        </p>
      </div>
    `;

    if (!transporter) {
      logEmailSent("Demo Confirmed Customer", leadEmail, customerSubject, "SUCCESS", "Simulated mode");
      logEmailSent("Demo Confirmed Admin", targetAdmin, adminSubject, "SUCCESS", "Simulated mode");
      return;
    }

    // Send to Customer
    try {
      await transporter.sendMail({ from, to: leadEmail, subject: customerSubject, html: customerHtmlContent });
      logEmailSent("Demo Confirmed Customer", leadEmail, customerSubject, "SUCCESS");
    } catch (err: any) {
      console.error("[SMTP] Failed customer confirmed email:", err);
    }

    // Send to Admin
    try {
      await transporter.sendMail({ from, to: targetAdmin, replyTo: leadEmail, subject: adminSubject, html: adminHtmlContent });
      logEmailSent("Demo Confirmed Admin", targetAdmin, adminSubject, "SUCCESS");
    } catch (err: any) {
      console.error("[SMTP] Failed admin confirmed email:", err);
    }

  } else {
    // =========================================================================
    // SCENARIO 2: SLOT IS SKIPPED -> SEND ADMIN ACTION EMAIL + CUSTOMER PENDING EMAIL
    // =========================================================================
    const reqId = requestId || "demo";
    const availableSlots = [
      "Tomorrow, 10:00 AM",
      "Tomorrow, 02:00 PM",
      "Friday, 11:30 AM",
      "Friday, 04:00 PM"
    ];

    const slotButtonsHtml = availableSlots.map(slot => 
      `<a href="${baseUrl}/api/admin/demo/assign-slot?requestId=${reqId}&meetingSlot=${encodeURIComponent(slot)}" style="display: block; background-color: #ffffff; border: 1px solid #6366f1; color: #4338ca; padding: 12px 18px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: bold; text-align: left; margin-bottom: 8px;">👉 Assign: ${slot} & Auto-Email Customer</a>`
    ).join("");

    templateVars["{{slotButtonsHtml}}"] = slotButtonsHtml;

    const customAdmin = getCustomEmailTemplate("demoAdminAction");
    const customPending = getCustomEmailTemplate("demoPendingCustomer");

    // 1. Email to Admin with 1-Click Interactive Slot Assignment Buttons inside Gmail!
    const adminSubject = customAdmin?.subject
      ? compileTemplate(customAdmin.subject, templateVars)
      : `[ACTION REQUIRED] Demo Request from ${leadName} - Assign Slot`;

    const adminHtmlContent = customAdmin?.body
      ? compileTemplate(customAdmin.body, templateVars)
      : `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b; background-color: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #004bff; margin: 0; font-size: 22px;">2all.ai Admin</h2>
          <span style="font-size: 11px; font-weight: bold; background-color: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">Action Required</span>
        </div>

        <h3 style="color: #0f172a; margin-top: 0;">New Demo Lead (Customer Skipped Time Slot)</h3>
        <p style="font-size: 14px; color: #475569; line-height: 1.5;">
          Customer <strong>${leadName}</strong> submitted a demo request for <strong><a href="${leadWebsite}" target="_blank" style="color: #004bff;">${leadWebsite}</a></strong> and skipped instant slot selection.
        </p>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px; line-height: 1.8;">
          <h4 style="margin: 0 0 10px 0; color: #0f172a; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">📋 Client Details</h4>
          <div><strong>Name:</strong> ${leadName}</div>
          <div><strong>Email:</strong> <a href="mailto:${leadEmail}" style="color: #004bff;">${leadEmail}</a></div>
          <div><strong>Phone:</strong> ${leadPhone}</div>
          <div><strong>Website:</strong> <a href="${leadWebsite}" target="_blank" style="color: #004bff;">${leadWebsite}</a></div>
        </div>

        <div style="background-color: #eef2ff; border: 1px solid #c7d2fe; border-radius: 14px; padding: 18px; margin: 24px 0;">
          <h4 style="margin: 0 0 12px 0; color: #1e1b4b; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em;">⚡ 1-Click Meeting Slot Assignment (Select below to auto-email client)</h4>
          
          <div style="display: block;">
            ${slotButtonsHtml}
          </div>
          
          <div style="margin-top: 14px; text-align: center;">
            <a href="${baseUrl}/admin/dashboard" style="color: #004bff; font-size: 12px; font-weight: bold;">Open Admin Dashboard Console</a>
          </div>
        </div>

        <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 24px;">
          &copy; ${new Date().getFullYear()} 2all.ai Inc. All rights reserved.
        </p>
      </div>
    `;

    // 2. Email to Customer informing them that team will assign meeting slot
    const customerSubject = customPending?.subject
      ? compileTemplate(customPending.subject, templateVars)
      : `2all.ai Demo Request Received - We will assign your meeting slot shortly!`;

    const customerHtmlContent = customPending?.body
      ? compileTemplate(customPending.body, templateVars)
      : `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b; background-color: #ffffff;">
        <h2 style="color: #004bff; margin-top: 0;">2all.ai</h2>
        <p style="font-size: 15px; font-weight: bold; color: #0f172a;">Hi ${leadName},</p>
        <p style="font-size: 14px; line-height: 1.6; color: #475569;">
          Thank you for requesting an enterprise accessibility demonstration for <strong>${leadWebsite}</strong>!
        </p>

        <div style="background-color: #f8fafc; border-left: 4px solid #004bff; padding: 16px; margin: 20px 0; font-size: 13px; color: #1e293b; line-height: 1.6;">
          <strong>Slot Status:</strong> You skipped instant slot selection. Our enterprise team will review your website and email you a confirmed meeting time slot along with your video call join link shortly.
        </div>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin: 20px 0; font-size: 12px; color: #64748b;">
          <strong>Need immediate assistance?</strong> Reach our team directly at <a href="mailto:support@2all.ai" style="color: #004bff;">support@2all.ai</a>.
        </div>

        <p style="font-size: 11px; color: #94a3b8; margin-top: 30px;">
          &copy; ${new Date().getFullYear()} 2all.ai Inc. All rights reserved.
        </p>
      </div>
    `;

    if (!transporter) {
      logEmailSent("Demo Alert Admin Skipped", targetAdmin, adminSubject, "SUCCESS", "Simulated mode");
      logEmailSent("Demo Alert Customer Pending", leadEmail, customerSubject, "SUCCESS", "Simulated mode");
      return;
    }

    // Send Admin Email (To targetAdmin)
    try {
      await transporter.sendMail({
        from,
        to: targetAdmin,
        replyTo: leadEmail,
        subject: adminSubject,
        html: adminHtmlContent,
      });
      console.log(`[SMTP] Action Required email sent to Admin: ${targetAdmin}`);
      logEmailSent("Demo Alert Admin Skipped", targetAdmin, adminSubject, "SUCCESS");
    } catch (err: any) {
      console.error("[SMTP] Failed to send admin skipped email:", err);
      logEmailSent("Demo Alert Admin Skipped", targetAdmin, adminSubject, "FAILED", err.message);
    }

    // Send Customer Pending Email (To leadEmail)
    try {
      await transporter.sendMail({
        from,
        to: leadEmail,
        subject: customerSubject,
        html: customerHtmlContent,
      });
      console.log(`[SMTP] Pending receipt email sent to Customer: ${leadEmail}`);
      logEmailSent("Demo Alert Customer Pending", leadEmail, customerSubject, "SUCCESS");
    } catch (err: any) {
      console.error("[SMTP] Failed to send customer pending email:", err);
      logEmailSent("Demo Alert Customer Pending", leadEmail, customerSubject, "FAILED", err.message);
    }
  }
}

export async function sendInitialWelcomeEmail(toEmail: string, userName: string) {
  const transporter = getTransporter();
  const from = getFromHeader();
  const targetAdmin = getAdminEmail();
  const subject = `Welcome to 2all.ai!`;
  const adminSubject = `[New User Registration] ${userName || toEmail}`;
  const dashboardUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .hero { background-color: #004bff; padding: 40px 20px 0 20px; text-align: center; color: #ffffff; }
    .hero h1 { font-size: 28px; font-weight: 800; margin: 0 0 20px 0; }
    .btn-white { background-color: #ffffff; color: #004bff !important; display: inline-block; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 800; text-transform: uppercase; border: 1px solid #ffffff; }
    .content-white { padding: 40px 40px; color: #0f172a; }
    .content-white h2 { font-size: 22px; font-weight: 800; margin: 0 0 10px 0; color: #0f172a; }
    .content-white p.subtitle { font-size: 14px; color: #475569; margin-bottom: 30px; }
    .icon-list-item { display: flex; align-items: flex-start; margin-bottom: 25px; }
    .icon-box { margin-right: 15px; font-size: 20px; line-height: 1; margin-top: 2px; }
    .icon-text h4 { margin: 0 0 5px 0; font-size: 15px; font-weight: 800; color: #0f172a; }
    .icon-text p { margin: 0; font-size: 13px; color: #64748b; line-height: 1.5; }
    .btn-dark { background-color: #0a1e3f; color: #ffffff !important; display: inline-block; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 800; text-transform: uppercase; margin-top: 10px; }
    .footer { background-color: #0a1e3f; color: #ffffff; padding: 40px 20px; text-align: center; }
    .footer h2 { margin: 0 0 10px 0; font-size: 20px; font-weight: 900; }
    .footer p { margin: 0; font-size: 11px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="hero">
      <h1>Welcome to <span style="color: #ffffff; text-decoration: none;">2all.ai</span>!</h1>
      <a href="${dashboardUrl}" class="btn-white">START FREE TRIAL</a>
    </div>

    <div class="content-white">
      <h2>Hi ${userName || "Customer"}, We're so glad you're here.</h2>
      <p class="subtitle">Start your 7-day free trial immediately&mdash;no pressure, just results:</p>
      
      <div class="icon-list-item">
        <div class="icon-box">🏃</div>
        <div class="icon-text">
          <h4>Quick start with 2all.ai</h4>
          <p>Just enter your website domain, zero tech skills needed</p>
        </div>
      </div>
      
      <div class="icon-list-item">
        <div class="icon-box">⚡</div>
        <div class="icon-text">
          <h4>Easy integration</h4>
          <p>Installation is fast and works with your website builder or CMS</p>
        </div>
      </div>
      
      <div class="icon-list-item">
        <div class="icon-box">🤖</div>
        <div class="icon-text">
          <h4>AI-powered accessibility</h4>
          <p>Our patented technology automatically makes your website more accessible</p>
        </div>
      </div>
      
      <div style="margin-top: 30px;">
        <a href="${dashboardUrl}" class="btn-dark">GO TO DASHBOARD</a>
      </div>
    </div>
    
    <div class="footer">
      <h2>2all.ai</h2>
      <p>2all.ai, 123 Accessibility Way, NY 10001</p>
    </div>
  </div>
</body>
</html>
  `;

  const adminHtmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b;">
      <h3 style="color: #004bff; margin-top: 0;">2all.ai New User Alert</h3>
      <p style="font-size: 14px; line-height: 1.5; color: #475569;">
        A new user has just registered an account on 2all.ai.
      </p>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px; line-height: 1.8;">
        <div><strong>Name:</strong> ${userName || "N/A"}</div>
        <div><strong>Email:</strong> ${toEmail}</div>
        <div><strong>Registered At:</strong> ${new Date().toLocaleString()}</div>
      </div>
    </div>
  `;

  if (!transporter) {
    console.log(`[SMTP SIMULATOR] Initial Welcome Email would be sent to: ${toEmail} and Admin alert to: ${targetAdmin}`);
    logEmailSent("Welcome Signup User", toEmail, subject, "SUCCESS", "Simulated mode");
    logEmailSent("Welcome Signup Admin", targetAdmin, adminSubject, "SUCCESS", "Simulated mode");
    return;
  }

  // 1. Send Welcome Email to User
  try {
    await transporter.sendMail({
      from,
      to: toEmail,
      subject,
      html: htmlContent,
    });
    console.log(`[SMTP] Initial welcome email sent to ${toEmail}`);
    logEmailSent("Welcome Signup User", toEmail, subject, "SUCCESS");
  } catch (err: any) {
    console.error("[SMTP] Failed to send initial welcome email:", err);
    logEmailSent("Welcome Signup User", toEmail, subject, "FAILED", err.message);
  }

  // 2. Send New Registration Alert to Admin
  try {
    await transporter.sendMail({
      from,
      to: targetAdmin,
      subject: adminSubject,
      html: adminHtmlContent,
    });
    console.log(`[SMTP] New user registration alert sent to Admin ${targetAdmin}`);
    logEmailSent("Welcome Signup Admin", targetAdmin, adminSubject, "SUCCESS");
  } catch (err: any) {
    console.error("[SMTP] Failed to send admin registration alert:", err);
    logEmailSent("Welcome Signup Admin", targetAdmin, adminSubject, "FAILED", err.message);
  }
}

export async function sendWelcomeEmail(toEmail: string, userName: string, website: string) {
  const transporter = getTransporter();
  const from = getFromHeader();
  const subject = `Welcome to 2all.ai — your 7-day free trial is active!`;
  
  const siteUrl = website ? (website.startsWith("http") ? website : `https://${website}`) : "your website";
  const widgetScript = `&lt;script&gt;(function(){var s=document.createElement('script');var h=document.querySelector('head')||document.body;s.src='https://2all.ai/widget.js';s.async=true;s.onload=function(){_2allJS.init({t:h.appendChild(s)});})();&lt;/script&gt;`;
  const dashboardUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .hero { background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%); padding: 40px 20px; text-align: center; }
    .hero h1 { color: #0a1e3f; font-size: 28px; font-weight: 800; margin: 0 0 20px 0; }
    .btn-primary { background-color: #004bff; color: #ffffff !important; display: inline-block; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 800; text-transform: uppercase; }
    .content { padding: 40px 30px; color: #334155; font-size: 14px; line-height: 1.6; }
    .content h2 { color: #0f172a; font-size: 18px; font-weight: 700; margin: 30px 0 10px 0; }
    .script-box { background-color: #eef2ff; border-radius: 10px; padding: 20px; margin: 15px 0; font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #3b82f6; word-wrap: break-word; overflow-wrap: break-word; }
    .footer { background-color: #0a1e3f; color: #ffffff; padding: 40px 20px; text-align: center; }
    .footer h2 { margin: 0 0 10px 0; font-size: 24px; font-weight: 900; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="hero">
      <h1>Welcome to <span style="color: #004bff;">2all.ai</span></h1>
      <a href="${dashboardUrl}" class="btn-primary">GO TO YOUR ACCOUNT</a>
    </div>

    <div class="content">
      <p style="margin-top: 0;">Hi ${userName},</p>
      
      <p>Welcome aboard. Your 7-day free trial is active &mdash; let's get your site set up on <a href="${siteUrl}" style="color: #004bff; font-weight: 700; text-decoration: none;">${siteUrl}</a> &mdash; this is where the 2all widget will be installed.</p>
      
      <h2>Get started: Install the 2all widget script</h2>
      <p>Copy and paste the script below into your website &mdash; ideally just before the closing <code>&lt;/body&gt;</code> tag, or anywhere in your site's footer:</p>
      
      <div class="script-box">
        ${widgetScript}
      </div>
      
      <div style="margin-top: 30px;">
        <a href="${dashboardUrl}" class="btn-primary">GO TO YOUR ACCOUNT</a>
      </div>
    </div>
    
    <div class="footer">
      <h2>2all.ai</h2>
      <p>123 Accessibility Way, Tech District, NY 10001</p>
    </div>
  </div>
</body>
</html>
  `;

  if (!transporter) {
    console.log(`[SMTP SIMULATOR] Welcome Email would be sent to: ${toEmail}`);
    logEmailSent("Widget Script Email", toEmail, subject, "SUCCESS", "Simulated mode");
    return;
  }

  try {
    await transporter.sendMail({
      from,
      to: toEmail,
      subject,
      html: htmlContent,
    });
    console.log(`[SMTP] Welcome script email sent to ${toEmail}`);
    logEmailSent("Widget Script Email", toEmail, subject, "SUCCESS");
  } catch (err: any) {
    console.error("[SMTP] Failed to send welcome script email:", err);
    logEmailSent("Widget Script Email", toEmail, subject, "FAILED", err.message);
  }
}

export async function sendLicenseOwnerNotificationEmail(
  ownerName: string,
  ownerEmail: string,
  phone: string
) {
  const transporter = getTransporter();
  const from = getFromHeader();
  const targetAdmin = getAdminEmail();
  const adminSubject = `[License Owner Info Update] ${ownerName} (${ownerEmail})`;
  const userSubject = `2all.ai - License Owner Details Updated`;

  const adminHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b;">
      <h3 style="color: #004bff; margin-top: 0;">License Owner Info Updated</h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px; line-height: 1.8;">
        <div><strong>Owner Name:</strong> ${ownerName}</div>
        <div><strong>Email:</strong> ${ownerEmail}</div>
        <div><strong>Phone:</strong> ${phone || "N/A"}</div>
        <div><strong>Updated At:</strong> ${new Date().toLocaleString()}</div>
      </div>
    </div>
  `;

  const userHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b;">
      <h2 style="color: #004bff; margin-top: 0;">2all.ai</h2>
      <p style="font-size: 15px; font-weight: bold;">Hi ${ownerName},</p>
      <p style="font-size: 14px; color: #475569; line-height: 1.6;">
        Your license owner & organization details have been updated successfully.
      </p>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px;">
        <div><strong>Owner Name:</strong> ${ownerName}</div>
        <div><strong>Email:</strong> ${ownerEmail}</div>
        <div><strong>Phone:</strong> ${phone || "N/A"}</div>
      </div>
    </div>
  `;

  if (!transporter) {
    logEmailSent("License Owner Update Admin", targetAdmin, adminSubject, "SUCCESS", "Simulated");
    logEmailSent("License Owner Update User", ownerEmail, userSubject, "SUCCESS", "Simulated");
    return;
  }

  try {
    await transporter.sendMail({ from, to: targetAdmin, subject: adminSubject, html: adminHtml });
    logEmailSent("License Owner Update Admin", targetAdmin, adminSubject, "SUCCESS");
  } catch (e: any) {
    logEmailSent("License Owner Update Admin", targetAdmin, adminSubject, "FAILED", e.message);
  }

  try {
    await transporter.sendMail({ from, to: ownerEmail, subject: userSubject, html: userHtml });
    logEmailSent("License Owner Update User", ownerEmail, userSubject, "SUCCESS");
  } catch (e: any) {
    logEmailSent("License Owner Update User", ownerEmail, userSubject, "FAILED", e.message);
  }
}

export async function sendApiKeyNotificationEmail(
  userEmail: string,
  userName: string,
  keyName: string,
  apiKey: string,
  domainName?: string
) {
  const transporter = getTransporter();
  const from = getFromHeader();
  const targetAdmin = getAdminEmail();
  const adminSubject = `[API Key Generated] ${keyName} - ${userEmail}`;
  const userSubject = `2all.ai - Your New API Key & Installation Script (${keyName})`;

  const scriptSnippet = `&lt;script&gt;(function(){var s=document.createElement('script');s.src='https://2all.ai/widget.js';s.async=true;s.setAttribute('data-api-key','${apiKey}');(document.head||document.body).appendChild(s);})();&lt;/script&gt;`;

  const adminHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b;">
      <h3 style="color: #004bff; margin-top: 0;">API Key Generated</h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px; line-height: 1.8;">
        <div><strong>User:</strong> ${userName || "User"} (${userEmail})</div>
        <div><strong>Key Name:</strong> ${keyName}</div>
        <div><strong>Generated Key:</strong> <code>${apiKey}</code></div>
        <div><strong>Target Domain:</strong> ${domainName || "All domains"}</div>
        <div><strong>Generated At:</strong> ${new Date().toLocaleString()}</div>
      </div>
    </div>
  `;

  const userHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b;">
      <h2 style="color: #004bff; margin-top: 0;">2all.ai</h2>
      <p style="font-size: 15px; font-weight: bold;">Hi ${userName || "Subscriber"},</p>
      <p style="font-size: 14px; color: #475569; line-height: 1.6;">
        Your API key <strong>${keyName}</strong> has been generated. Use the installation script below on your website to activate accessibility scanning:
      </p>
      <div style="background-color: #0f172a; color: #93c5fd; padding: 16px; border-radius: 12px; font-family: monospace; font-size: 12px; word-break: break-all; margin: 20px 0;">
        ${scriptSnippet}
      </div>
      <p style="font-size: 13px; color: #64748b;">
        <strong>API Key:</strong> <code>${apiKey}</code>
      </p>
    </div>
  `;

  if (!transporter) {
    logEmailSent("API Key Admin", targetAdmin, adminSubject, "SUCCESS", "Simulated");
    logEmailSent("API Key User", userEmail, userSubject, "SUCCESS", "Simulated");
    return;
  }

  try {
    await transporter.sendMail({ from, to: targetAdmin, subject: adminSubject, html: adminHtml });
    logEmailSent("API Key Admin", targetAdmin, adminSubject, "SUCCESS");
  } catch (e: any) {
    logEmailSent("API Key Admin", targetAdmin, adminSubject, "FAILED", e.message);
  }

  try {
    await transporter.sendMail({ from, to: userEmail, subject: userSubject, html: userHtml });
    logEmailSent("API Key User", userEmail, userSubject, "SUCCESS");
  } catch (e: any) {
    logEmailSent("API Key User", userEmail, userSubject, "FAILED", e.message);
  }
}
