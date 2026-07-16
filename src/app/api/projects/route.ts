import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;

  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { scans: { take: 1, orderBy: { createdAt: "desc" } } },
  });

  return NextResponse.json(projects);
}

import { sendWelcomeEmail } from "@/lib/mail";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;
  const userEmail = session.user?.email || "";
  const userName = session.user?.name || "Customer";

  try {
    const { name, url } = await req.json();

    if (!name || !url) {
      return NextResponse.json({ message: "Name and URL are required." }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: { name, url, userId },
    });
    
    // Dispatch script email for the new project
    if (userEmail) {
      try {
        await sendWelcomeEmail(userEmail, userName, url);
      } catch (mailError) {
        console.error("Failed to send script email for new project:", mailError);
      }
    }

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
