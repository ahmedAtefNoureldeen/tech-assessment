import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => void;
  employee?: EmployeeFormData;
}

export interface EmployeeFormData {
  id?: string;
  name: string;
  joiningDate: string;
  baseSalary: number;
}

export function EmployeeFormModal({ isOpen, onClose, onSubmit, employee }: EmployeeFormModalProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    joiningDate: new Date().toISOString().split('T')[0],
    baseSalary: 0,
  });

  // Update form data when employee prop changes
  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id,
        name: employee.name,
        joiningDate: employee.joiningDate,
        baseSalary: employee.baseSalary,
      });
    } else {
      // Reset form when creating new employee
      setFormData({
        name: "",
        joiningDate: new Date().toISOString().split('T')[0],
        baseSalary: 0,
      });
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{employee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="joiningDate">Joining Date</Label>
            <Input
              id="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="baseSalary">Base Salary</Label>
            <Input
              id="baseSalary"
              type="number"
              value={formData.baseSalary}
              onChange={(e) => setFormData({ ...formData, baseSalary: Number(e.target.value) })}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {employee ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 