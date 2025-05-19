import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    // Await the params object before destructuring
    const params = await context.params;
    const { id } = params;
    
    const tasks = await prisma.task.findMany({
      where: {
        projectId: id,
      },
      include: {
        assignedTo: true,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}