import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

// Fetch all users or single user by ID
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          plan: true,
          paymentStatus: true,
          createdAt: true,
        },
      });
      return NextResponse.json(user);
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        plan: true,
        paymentStatus: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Handle Admin Account Creation (Exclusive Super Admin feature)
export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const assignedRole = role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN";

    const newAdmin = await prisma.user.create({
      data: {
        name: name || "Admin Staff",
        email: cleanEmail,
        password: hashedPassword,
        role: assignedRole,
        plan: "PRO",
        paymentStatus: "PAID",
      },
    });

    return NextResponse.json(
      {
        message: `${assignedRole} user created successfully`,
        user: { id: newAdmin.id, name: newAdmin.name, email: newAdmin.email, role: newAdmin.role, createdAt: newAdmin.createdAt },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create admin error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Handle User Details Update (Name, Email, Phone, Plan, Role)
export async function PUT(req: Request) {
  try {
    const { userId, name, email, phone, plan, role } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email.trim().toLowerCase();
    if (phone !== undefined) updateData.phone = phone;
    if (plan !== undefined) updateData.plan = plan;
    if (role !== undefined) updateData.role = role;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        plan: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Handle User Deletion
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("User deletion error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
