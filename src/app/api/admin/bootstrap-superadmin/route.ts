import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const cleanEmail = (email || "superadmin@gmail.com").trim().toLowerCase();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password || "superadmin123", 12);
      await prisma.user.create({
        data: {
          name: "Super Admin Master",
          email: cleanEmail,
          password: hashedPassword,
          role: "SUPER_ADMIN",
          plan: "ENTERPRISE",
          paymentStatus: "PAID",
        },
      });
      return NextResponse.json({ message: "Super Admin user created successfully" });
    }

    // Ensure role is SUPER_ADMIN
    if (existingUser.role !== "SUPER_ADMIN") {
      await prisma.user.update({
        where: { email: cleanEmail },
        data: { role: "SUPER_ADMIN" },
      });
    }

    return NextResponse.json({ message: "Super Admin ready" });
  } catch (error) {
    console.error("Super Admin bootstrap error:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
