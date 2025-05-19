import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PayrollGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PayrollGenerationData) => void;
}

export interface PayrollGenerationData {
  month: string;
}

export function PayrollGenerationModal({ isOpen, onClose, onSubmit }: PayrollGenerationModalProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  const [formData, setFormData] = useState<PayrollGenerationData>({
    month: currentMonth.toString(),
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Payroll</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="month">Month</Label>
            <Select
              value={formData.month}
              onValueChange={(value) => setFormData({ ...formData, month: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={month} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Generate Payroll
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 