import nodemailer from "nodemailer";

// SMTP Transporter configuration
const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("[SMTP] Warning: SMTP credentials are not configured in your .env file. Email notifications will fall back to logging in the dev console.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(port || "587", 10),
    secure: port === "465", // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
};

export async function sendPaymentSuccessEmail(toEmail: string, userName: string, planName: string, amount: number) {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || "2all.ai <no-reply@2all.ai>";
  
  const subject = `Payment Confirmed - Your 2all.ai ${planName} Subscription is Active!`;
  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px border #e2e8f0; border-radius: 16px; color: #1e293b;">
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

      <p style="font-size: 14px; line-height: 1.5; color: #475569;">
        You can now access automated accessibility scanning aligned with WCAG standards and expert remediation options directly from your user dashboard.
      </p>
      
      <div style="margin: 28px 0; text-align: center;">
        <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard" 
           style="background-color: #004bff; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: bold; display: inline-block;">
          Go to Dashboard
        </a>
      </div>

      <hr style="border: 0; border-top: 1px solid #f1f5f9; margin-top: 30px; margin-bottom: 16px;" />
      <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
        &copy; ${new Date().getFullYear()} 2all.ai. All rights reserved.
      </p>
    </div>
  `;

  if (!transporter) {
    console.log(`[SMTP SIMULATOR] Email would be sent to: ${toEmail}\nSubject: ${subject}\nBody: ${htmlContent}`);
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
  } catch (err) {
    console.error("[SMTP] Failed to send payment confirmation email:", err);
  }
}

export async function sendDemoNotificationEmail(
  adminEmail: string,
  leadName: string,
  leadEmail: string,
  leadPhone: string,
  leadWebsite: string
) {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || "2all.ai <no-reply@2all.ai>";
  const subject = `[New Lead] Demo Scheduled - ${leadName}`;
  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b;">
      <h3 style="color: #004bff; margin-top: 0;">2all.ai Lead Alert</h3>
      <p style="font-size: 14px; line-height: 1.5; color: #475569;">
        A new accessibility demo has been scheduled by a prospective client.
      </p>
      
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px; line-height: 1.8;">
        <h4 style="margin: 0 0 10px 0; color: #0f172a; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Client Details</h4>
        <div><strong>Name:</strong> ${leadName}</div>
        <div><strong>Email:</strong> ${leadEmail}</div>
        <div><strong>Phone:</strong> ${leadPhone}</div>
        <div><strong>Website:</strong> <a href="${leadWebsite}" target="_blank" style="color: #004bff;">${leadWebsite}</a></div>
      </div>
      
      <p style="font-size: 12px; color: #94a3b8;">
        This lead is also saved and visible in the Form Builder tab of the Admin Console.
      </p>
    </div>
  `;

  if (!transporter) {
    console.log(`[SMTP SIMULATOR] Admin Lead notification would be sent to: ${adminEmail || "admin@gmail.com"}\nSubject: ${subject}\nBody: ${htmlContent}`);
    return;
  }

    try {
    await transporter.sendMail({
      from,
      to: adminEmail || "aiadmin@gmail.com",
      subject,
      html: htmlContent,
    });
    console.log(`[SMTP] Demo lead alert sent to admin`);
  } catch (err) {
    console.error("[SMTP] Failed to send demo lead alert email:", err);
  }
}

export async function sendInitialWelcomeEmail(toEmail: string, userName: string) {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || "2all.ai <no-reply@2all.ai>";
  const subject = `Welcome to 2all.ai!`;
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
    .hero-graphic { margin-top: 30px; background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%); height: 160px; border-top-left-radius: 12px; border-top-right-radius: 12px; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.2); border-bottom: none; }
    
    .content-white { padding: 40px 40px; color: #0f172a; }
    .content-white h2 { font-size: 22px; font-weight: 800; margin: 0 0 10px 0; color: #0f172a; }
    .content-white p.subtitle { font-size: 14px; color: #475569; margin-bottom: 30px; }
    
    .icon-list-item { display: flex; align-items: flex-start; margin-bottom: 25px; }
    .icon-box { margin-right: 15px; font-size: 20px; line-height: 1; margin-top: 2px; }
    .icon-text h4 { margin: 0 0 5px 0; font-size: 15px; font-weight: 800; color: #0f172a; }
    .icon-text p { margin: 0; font-size: 13px; color: #64748b; line-height: 1.5; }
    
    .btn-dark { background-color: #0a1e3f; color: #ffffff !important; display: inline-block; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 800; text-transform: uppercase; margin-top: 10px; }
    
    .content-beige { background-color: #fdfbf7; padding: 40px 40px; }
    .content-beige h3 { text-align: center; font-size: 16px; font-weight: 800; color: #0f172a; margin: 0 0 30px 0; }
    
    .card { margin-bottom: 20px; display: block; text-decoration: none; color: inherit; }
    .card-title { font-weight: 800; font-size: 14px; margin-bottom: 5px; color: #0f172a; }
    .card-text { font-size: 12px; color: #64748b; line-height: 1.5; }
    
    .card-icon { width: 60px; height: 60px; border-radius: 12px; display: inline-block; }
    .icon-green { background: linear-gradient(135deg, #10b981, #34d399); }
    .icon-blue { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
    .icon-purple { background: linear-gradient(135deg, #8b5cf6, #a78bfa); }
    
    .footer { background-color: #0a1e3f; color: #ffffff; padding: 40px 20px; text-align: center; }
    .footer h2 { margin: 0 0 10px 0; font-size: 20px; font-weight: 900; }
    .footer p { margin: 0; font-size: 11px; color: #94a3b8; }
    .footer-links a { color: #60a5fa; text-decoration: none; font-size: 11px; margin: 0 8px; }
  </style>
</head>
<body>
  <div class="email-container">
    
    <!-- Hero Section -->
    <div class="hero">
      <h1>Welcome to 2all.ai!</h1>
      <a href="${dashboardUrl}" class="btn-white">START FREE TRIAL</a>
      
      <div style="margin-top: 30px;">
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=160&q=80" alt="2all.ai Welcome" style="width: 100%; max-width: 600px; border-radius: 12px; display: block; border: 1px solid rgba(255,255,255,0.2);" />
      </div>
    </div>

    <!-- White Content Section -->
    <div class="content-white">
      <h2>We're so glad you're here.</h2>
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
        <a href="${dashboardUrl}" class="btn-dark">START FREE TRIAL</a>
      </div>
    </div>

    <!-- Beige Content Section -->
    <div class="content-beige">
      <h3>The #1 rated web accessibility solution for ADA compliance</h3>
      
      <div class="card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="80" valign="top">
              <div class="card-icon icon-green"></div>
            </td>
            <td valign="top">
              <div class="card-title">Mitigate legal risk</div>
              <div class="card-text">A U.S. court recognized 2all's role in web accessibility and helping businesses meet legal requirements.</div>
            </td>
          </tr>
        </table>
      </div>
      
      <div class="card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="80" valign="top">
              <div class="card-icon icon-blue"></div>
            </td>
            <td valign="top">
              <div class="card-title">Get uncompromising security and privacy</div>
              <div class="card-text">2all upholds stringent security standards, with regular testing and monitoring as part of SOC2 compliance.</div>
            </td>
          </tr>
        </table>
      </div>
      
      <div class="card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="80" valign="top">
              <div class="card-icon icon-purple"></div>
            </td>
            <td valign="top">
              <div class="card-title">Explore tailored solutions to fit your needs</div>
              <div class="card-text">Automated AI, expert human support, or both&mdash;we tailor accessibility solutions precisely for you, heavy lifting on us.</div>
            </td>
          </tr>
        </table>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${dashboardUrl}" class="btn-dark">START FREE TRIAL</a>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <h2>2all.ai</h2>
      <p style="margin-bottom: 8px;">2all.ai, 123 Accessibility Way, NY 10001</p>
      <div class="footer-links">
        <a href="#">Unsubscribe</a> &bull; <a href="#">Manage preferences</a>
      </div>
    </div>
    
  </div>
</body>
</html>
  `;

  if (!transporter) {
    console.log(`[SMTP SIMULATOR] Initial Welcome Email would be sent to: ${toEmail}\nSubject: ${subject}`);
    return;
  }

  try {
    await transporter.sendMail({
      from,
      to: toEmail,
      subject,
      html: htmlContent,
    });
    console.log(`[SMTP] Initial welcome email sent to ${toEmail}`);
  } catch (err) {
    console.error("[SMTP] Failed to send initial welcome email:", err);
  }
}

export async function sendWelcomeEmail(toEmail: string, userName: string, website: string) {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || "2all.ai <no-reply@2all.ai>";
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
    .hero h1 { color: #0a1e3f; font-size: 28px; font-weight: 800; margin: 0 0 20px 0; letter-spacing: -0.5px; }
    .btn-primary { background-color: #004bff; color: #ffffff !important; display: inline-block; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
    .hero-graphic { margin-top: 30px; background: linear-gradient(90deg, #004bff, #3b82f6); height: 160px; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0, 75, 255, 0.3); position: relative; overflow: hidden; }
    
    .content { padding: 40px 30px; color: #334155; font-size: 14px; line-height: 1.6; }
    .content h2 { color: #0f172a; font-size: 18px; font-weight: 700; margin: 30px 0 10px 0; }
    
    .script-box { background-color: #eef2ff; border-radius: 10px; padding: 20px; margin: 15px 0; font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #3b82f6; word-wrap: break-word; overflow-wrap: break-word; }
    
    .list-item { margin-bottom: 8px; display: flex; align-items: center; }
    .list-item span { color: #004bff; font-weight: bold; margin-right: 10px; font-size: 18px; }
    
    .feature-cards { margin-top: 40px; }
    .feature-cards h3 { color: #0f172a; font-size: 20px; font-weight: 800; margin-bottom: 20px; }
    
    .card { border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 16px; display: block; text-decoration: none; color: inherit; }
    .card-title { font-weight: 800; font-size: 15px; margin-bottom: 8px; color: #0f172a; }
    .card-text { font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 12px; }
    .card-link { color: #004bff; font-size: 13px; font-weight: 700; text-decoration: none; }
    
    .card-icon { width: 48px; height: 48px; border-radius: 12px; margin-bottom: 16px; display: inline-block; }
    .icon-green { background: linear-gradient(135deg, #10b981, #34d399); }
    .icon-blue { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
    .icon-purple { background: linear-gradient(135deg, #8b5cf6, #a78bfa); }
    
    .footer { background-color: #0a1e3f; color: #ffffff; padding: 40px 20px; text-align: center; }
    .footer h2 { margin: 0 0 10px 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; }
    .footer p { margin: 0; font-size: 12px; color: #94a3b8; }
    .footer-links a { color: #60a5fa; text-decoration: none; font-size: 12px; margin: 0 8px; }
  </style>
</head>
<body>
  <div class="email-container">
    
    <!-- Hero Section -->
    <div class="hero">
      <h1>Welcome to 2all.ai</h1>
      <a href="${dashboardUrl}" class="btn-primary">GO TO YOUR ACCOUNT</a>
      
      <div style="margin-top: 30px;">
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=160&q=80" alt="2all.ai Welcome" style="width: 100%; max-width: 600px; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0, 75, 255, 0.3); display: block; border: 1px solid rgba(255,255,255,0.2);" />
      </div>
    </div>

    <!-- Main Content -->
    <div class="content">
      <p style="margin-top: 0;">Hi ${userName},</p>
      
      <p>Welcome aboard. Your 7-day free trial is active &mdash; let's get your site set up on <a href="${siteUrl}" style="color: #004bff; font-weight: 700; text-decoration: none;">${siteUrl}</a> &mdash; this is where the 2all widget will be installed.</p>
      
      <h2>Get started: Install the 2all widget script</h2>
      <p>Copy and paste the script below into your website &mdash; ideally just before the closing <code>&lt;/body&gt;</code> tag, or anywhere in your site's footer:</p>
      
      <div class="script-box">
        ${widgetScript}
      </div>
      
      <h2>Want to check everything's set up correctly?</h2>
      <p>Follow the step-by-step installation guide: <a href="https://2all.ai/docs/installation" style="color: #004bff; text-decoration: none;">https://2all.ai/docs/installation</a></p>
      
      <h2>Customize your widget (optional)</h2>
      <p>You can tailor the 2all widget to match your site and preferences, including:</p>
      
      <div style="margin-top: 15px;">
        <div class="list-item"><span>&#8226;</span> Widget position, size, and color</div>
        <div class="list-item"><span>&#8226;</span> Language and accessibility profiles</div>
        <div class="list-item"><span>&#8226;</span> Branding and visual style</div>
      </div>
      
      <div style="margin-top: 30px;">
        <a href="${dashboardUrl}" class="btn-primary">GO TO YOUR ACCOUNT</a>
      </div>
      
      <!-- Feature Cards Section -->
      <div class="feature-cards">
        <h3>Explore 2all.ai</h3>
        
        <div class="card">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="70" valign="top">
                <div class="card-icon icon-green" style="text-align: center; line-height: 48px;">
                  <img src="https://img.icons8.com/ios-filled/24/ffffff/scales.png" width="24" height="24" alt="Legal" style="vertical-align: middle; display: inline-block;" />
                </div>
              </td>
              <td valign="top">
                <div class="card-title">Mitigate legal risk</div>
                <div class="card-text">2all's role in web accessibility helps businesses identify accessibility gaps and align with WCAG standards.</div>
                <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/solutions/legal" class="card-link">Learn More &rarr;</a>
              </td>
            </tr>
          </table>
        </div>
        
        <div class="card">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="70" valign="top">
                <div class="card-icon icon-blue" style="text-align: center; line-height: 48px;">
                  <img src="https://img.icons8.com/ios-filled/24/ffffff/lock.png" width="24" height="24" alt="Security" style="vertical-align: middle; display: inline-block;" />
                </div>
              </td>
              <td valign="top">
                <div class="card-title">Get uncompromising security and privacy</div>
                <div class="card-text">2all upholds strict security standards, with regular testing and monitoring to ensure total data safety.</div>
                <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/company/security" class="card-link">Learn More &rarr;</a>
              </td>
            </tr>
          </table>
        </div>
        
        <div class="card">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="70" valign="top">
                <div class="card-icon icon-purple" style="text-align: center; line-height: 48px;">
                  <img src="https://img.icons8.com/ios-filled/24/ffffff/services.png" width="24" height="24" alt="Solutions" style="vertical-align: middle; display: inline-block;" />
                </div>
              </td>
              <td valign="top">
                <div class="card-title">Tailored solutions for your needs</div>
                <div class="card-text">From automated AI to expert human support, 2all offers flexible accessibility solutions &mdash; with us handling the heavy lifting.</div>
                <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/solutions" class="card-link">Learn More &rarr;</a>
              </td>
            </tr>
          </table>
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
           <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}" class="btn-primary">EXPLORE 2ALL.AI</a>
        </div>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <h2>2all.ai</h2>
      <p style="margin-bottom: 12px;">123 Accessibility Way, Tech District, NY 10001</p>
      <div class="footer-links">
        <a href="#">Unsubscribe</a> &bull; <a href="#">Manage preferences</a>
      </div>
    </div>
    
  </div>
</body>
</html>
  `;

  if (!transporter) {
    console.log(`[SMTP SIMULATOR] Welcome Email would be sent to: ${toEmail}\nSubject: ${subject}\nBody: ${htmlContent}`);
    return;
  }

  try {
    await transporter.sendMail({
      from,
      to: toEmail,
      subject,
      html: htmlContent,
    });
    console.log(`[SMTP] Welcome email sent to ${toEmail}`);
  } catch (err) {
    console.error("[SMTP] Failed to send welcome email:", err);
  }
}

