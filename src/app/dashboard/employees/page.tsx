"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EmployeeFormModal, EmployeeFormData } from "@/components/EmployeeFormModal";
import { format } from "date-fns";

interface Employee {
  id: string;
  name: string;
  joiningDate: Date;
  baseSalary: number;
  isActive: boolean;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeFormData | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreateEmployee = async (data: EmployeeFormData) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        await fetchEmployees();
      }
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const handleUpdateEmployee = async (data: EmployeeFormData) => {
    try {
      const response = await fetch(`/api/employees/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        await fetchEmployees();
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchEmployees();
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee({
      id: employee.id,
      name: employee.name,
      joiningDate: format(employee.joiningDate, 'yyyy-MM-dd'),
      baseSalary: employee.baseSalary,
    });
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div className="container p-6">Loading...</div>;
  }

  return (
    <div className="container p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Button onClick={() => {
          setSelectedEmployee(undefined);
          setIsModalOpen(true);
        }}>
          Add Employee
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>Manage your organization&apos;s employees</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{format(new Date(employee.joiningDate), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>${employee.baseSalary.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(employee)}
                      >
                        Edit
                      </Button>
                      {employee.isActive && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EmployeeFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmployee(undefined);
        }}
        onSubmit={selectedEmployee ? handleUpdateEmployee : handleCreateEmployee}
        employee={selectedEmployee}
      />
    </div>
  );
} 