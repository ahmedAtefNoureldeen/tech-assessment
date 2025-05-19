import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';



export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
    where :{
        isActive : true
    },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(employees);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('Database error:', error);
    } else {
      console.error('Unexpected error:', error);
    }
    return NextResponse.json({ error: `Error fetching employees ${error}`  }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const employee = await prisma.employee.create({
      data: {
        name: data.name,
        joiningDate: new Date(data.joiningDate),
        baseSalary: data.baseSalary,
        isActive: true,
      },
    });
    return NextResponse.json(employee);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('Database error:', error);
    } else {
      console.error('Unexpected error:', error);
    }
    return NextResponse.json({ error: 'Error creating employee' }, { status: 500 });
  }
} 