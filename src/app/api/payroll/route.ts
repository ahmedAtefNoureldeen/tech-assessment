import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Employee {
  id: string;
  baseSalary: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month");

  if (!month) {
    return NextResponse.json({ error: "Month is required" }, { status: 400 });
  }

  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const selectedMonth = parseInt(month);
    
    // Create dates for comparison (first day of each month)
    const selectedDate = new Date(currentDate.getFullYear(), selectedMonth, 1);
    const currentMonthDate = new Date(currentDate.getFullYear(), currentMonth, 1);
    
    // Check if selected month is before current month
    const isPastMonth = selectedDate < currentMonthDate;

    // Get all active employees
    const employees = await prisma.employee.findMany({
      where: { isActive: true },
    });

    // Get existing salaries for the selected month
    const existingSalaries = await prisma.salary.findMany({
      where: {
        month: {
          gte: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
          lt: new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1),
        },
      },
      include: {
        employee: true,
      },
    });

    // For past months, only return data if it exists
    if (isPastMonth) {
      if (existingSalaries.length === 0) {
        return NextResponse.json(
          { error: "No payroll data exists for this month" },
          { status: 404 }
        );
      }
      return NextResponse.json({
        salaries: existingSalaries,
        isEditable: false,
      });
    }

    // For current/future months, create default entries if none exist
    if (existingSalaries.length === 0) {
      const salaries = await Promise.all(
        employees.map((employee: Employee) =>
          prisma.salary.create({
            data: {
              employeeId: employee.id,
              baseSalary: employee.baseSalary,
              bonus: 0,
              deductions: 0,
              payableAmount: employee.baseSalary,
              month: selectedDate,
            },
            include: {
              employee: true,
            },
          })
        )
      );
      return NextResponse.json({ salaries, isEditable: true });
    }

    // Return existing salaries for current/future months
    return NextResponse.json({
      salaries: existingSalaries,
      isEditable: true,
    });
  } catch (error) {
    console.error("Error fetching payroll data:", error);
    return NextResponse.json(
      { error: "Failed to fetch payroll data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { salaryId, bonus, deductions } = body;

    const existingSalary = await prisma.salary.findUnique({
      where: { id: salaryId },
    });

    if (!existingSalary) {
      return NextResponse.json(
        { error: "Salary record not found" },
        { status: 404 }
      );
    }

    const salary = await prisma.salary.update({
      where: { id: salaryId },
      data: {
        bonus,
        deductions,
        payableAmount: existingSalary.baseSalary + bonus - deductions,
      },
      include: {
        employee: true,
      },
    });

    return NextResponse.json(salary);
  } catch (error) {
    console.error("Error updating salary:", error);
    return NextResponse.json(
      { error: "Failed to update salary" },
      { status: 500 }
    );
  }
} 