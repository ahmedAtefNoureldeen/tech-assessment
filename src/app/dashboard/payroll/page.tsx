"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PayrollGenerationModal, PayrollGenerationData } from "@/components/PayrollGenerationModal";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Salary {
  id: string;
  employeeId: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  payableAmount: number;
  month: string;
  employee: {
    id: string;
    name: string;
    joiningDate: string;
  };
}

interface PayrollData {
  salaries: Salary[];
  isEditable: boolean;
}

export default function PayrollPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payrollData, setPayrollData] = useState<PayrollData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSalary, setEditingSalary] = useState<{ id: string; bonus: number; deductions: number } | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const handleGeneratePayroll = async (data: PayrollGenerationData) => {
    setIsLoading(true);
    setSelectedMonth(data.month);
    try {
      const response = await fetch(`/api/payroll?month=${data.month}`);
      if (!response.ok) {
        const error = await response.json();
        if (response.status === 404) {
          setPayrollData(null);
          toast.error(error.error);
          return;
        }
        throw new Error(error.error);
      }
      const payrollData = await response.json();
      setPayrollData(payrollData);
    } catch (error) {
      toast.error("Failed to generate payroll");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSalary = async (salaryId: string, bonus: number, deductions: number) => {
    try {
      const response = await fetch("/api/payroll", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ salaryId, bonus, deductions }),
      });

      if (!response.ok) {
        throw new Error("Failed to update salary");
      }

      const updatedSalary = await response.json();
      setPayrollData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          salaries: prev.salaries.map((s) =>
            s.id === updatedSalary.id ? updatedSalary : s
          ),
        };
      });
      setEditingSalary(null);
      toast.success("Salary updated successfully");
    } catch (error) {
      toast.error("Failed to update salary");
      console.error(error);
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getMonthDisplay = () => {
    if (!selectedMonth) return "";
    return `${months[parseInt(selectedMonth)]} ${new Date().getFullYear()}`;
  };

  return (
    <div className="container p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Payroll Management</h1>
        <Button onClick={() => setIsModalOpen(true)} disabled={isLoading}>
          {isLoading ? "Loading..." : "Generate Payroll"}
        </Button>
      </div>
      
      {payrollData ? (
        <Card>
          <CardHeader>
            <CardTitle>
              Payroll for {getMonthDisplay()}
            </CardTitle>
            <CardDescription>
              {payrollData.isEditable 
                ? "Edit employee salary information" 
                : "View employee salary information (past month)"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Joining Date</TableHead>
                  <TableHead>Basic Salary</TableHead>
                  <TableHead>Bonus</TableHead>
                  <TableHead>Deductible</TableHead>
                  <TableHead>Payable Amount</TableHead>
                  {payrollData.isEditable && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollData.salaries.map((salary) => (
                  <TableRow key={salary.id}>
                    <TableCell>{salary.employee.name}</TableCell>
                    <TableCell>{new Date(salary.employee.joiningDate).toLocaleDateString()}</TableCell>
                    <TableCell>${salary.baseSalary.toLocaleString()}</TableCell>
                    <TableCell>
                      {editingSalary?.id === salary.id ? (
                        <Input
                          type="number"
                          value={editingSalary.bonus}
                          onChange={(e) => setEditingSalary({
                            ...editingSalary,
                            bonus: parseFloat(e.target.value) || 0
                          })}
                          className="w-24"
                        />
                      ) : (
                        `$${salary.bonus.toLocaleString()}`
                      )}
                    </TableCell>
                    <TableCell>
                      {editingSalary?.id === salary.id ? (
                        <Input
                          type="number"
                          value={editingSalary.deductions}
                          onChange={(e) => setEditingSalary({
                            ...editingSalary,
                            deductions: parseFloat(e.target.value) || 0
                          })}
                          className="w-24"
                        />
                      ) : (
                        `$${salary.deductions.toLocaleString()}`
                      )}
                    </TableCell>
                    <TableCell>${salary.payableAmount.toLocaleString()}</TableCell>
                    {payrollData.isEditable && (
                      <TableCell>
                        <div className="flex space-x-2">
                          {editingSalary?.id === salary.id ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateSalary(
                                  salary.id,
                                  editingSalary.bonus,
                                  editingSalary.deductions
                                )}
                              >
                                Save
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingSalary(null)}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingSalary({
                                id: salary.id,
                                bonus: salary.bonus,
                                deductions: salary.deductions
                              })}
                            >
                              Edit
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Payroll Selected</CardTitle>
            <CardDescription>
              {selectedMonth 
                ? `No payroll data exists for ${months[parseInt(selectedMonth)]} ${new Date().getFullYear()}`
                : "Generate a new payroll or select an existing one"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {selectedMonth 
                ? "This month's payroll data is not available. Please select a different month."
                : "Click the \"Generate Payroll\" button to create a new payroll or select an existing one from the list."}
            </p>
          </CardContent>
        </Card>
      )}

      <PayrollGenerationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleGeneratePayroll}
      />
    </div>
  );
} 