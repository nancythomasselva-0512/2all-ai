import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { sendWelcomeEmail, sendInitialWelcomeEmail } from "@/lib/mail";


export async function POST(req: Request) {
  try {
    const { name, email, password, website } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (website) {
      const siteUrl = website.startsWith("http") ? website : `https://${website}`;
      let cleanDomain = website.trim().toLowerCase();
      cleanDomain = cleanDomain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");

      await prisma.project.create({
        data: {
          userId: user.id,
          url: siteUrl,
          name: cleanDomain || website.replace(/^(https?:\/\/)?(www\.)?/, ""),
        },
      });

      if (cleanDomain) {
        try {
          const verificationToken = `2all-verify-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
          let domainRecord = await prisma.domain.findFirst({
            where: {
              OR: [
                { domain: cleanDomain },
                { canonicalDomain: cleanDomain },
              ],
            },
          });

          if (!domainRecord) {
            domainRecord = await prisma.domain.create({
              data: {
                userId: user.id,
                websiteName: cleanDomain,
                domain: cleanDomain,
                canonicalDomain: cleanDomain,
                environment: "PRODUCTION",
                verificationMethod: "META",
                verificationToken,
                status: "ACTIVE",
                verified: true,
                verifiedAt: new Date(),
              },
            });
          } else {
            domainRecord = await prisma.domain.update({
              where: { id: domainRecord.id },
              data: {
                userId: user.id,
                websiteName: cleanDomain,
                status: "ACTIVE",
                verified: true,
              },
            });
          }

          // Ensure default API key exists for this domain
          const existingKey = await prisma.apiKey.findFirst({
            where: { domainId: domainRecord.id },
          });

          if (!existingKey) {
            const hex1 = Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, "0");
            const hex2 = Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, "0");
            const hex3 = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, "0");
            const generatedKey = `PUB_${hex1}${hex2}${hex3}`;

            await prisma.apiKey.create({
              data: {
                userId: user.id,
                name: `Widget Key for ${cleanDomain}`,
                key: generatedKey,
                status: "ACTIVE",
                domainId: domainRecord.id,
                domainName: cleanDomain,
              },
            });
          } else {
            await prisma.apiKey.update({
              where: { id: existingKey.id },
              data: {
                userId: user.id,
                status: "ACTIVE",
              },
            });
          }
        } catch (domainErr) {
          console.warn("[Register] Domain provisioning error (non-fatal):", domainErr);
        }
      }
    }

    // Send welcome emails — wrapped in try/catch so SMTP errors don't block registration
    try {
      await sendInitialWelcomeEmail(email, name);
    } catch (emailErr) {
      console.warn("[Register] Welcome email failed (non-fatal):", emailErr);
    }

    if (website) {
      try {
        await sendWelcomeEmail(email, name, website);
      } catch (emailErr) {
        console.warn("[Register] Website welcome email failed (non-fatal):", emailErr);
      }
    }

    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
