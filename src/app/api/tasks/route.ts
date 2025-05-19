import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, priority, status, employeeId, projectId } = body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        employeeId: employeeId || null,
        projectId,
      },
      include: {
        assignedTo: true,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
} 