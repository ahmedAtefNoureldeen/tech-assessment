import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const employee = await prisma.employee.update({
      where: { id: params.id },
      data: {
        name: data.name,
        joiningDate: new Date(data.joiningDate),
        baseSalary: data.baseSalary,
      },
    });
    return NextResponse.json(employee);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('Database error:', error);
    } else {
      console.error('Unexpected error:', error);
    }
    return NextResponse.json({ error: 'Error updating employee' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await prisma.employee.update({
      where: { id: params.id },
      data: { isActive: false },
    });
    return NextResponse.json(employee);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('Database error:', error);
    } else {
      console.error('Unexpected error:', error);
    }
    return NextResponse.json({ error: 'Error deleting employee' }, { status: 500 });
  }
} 