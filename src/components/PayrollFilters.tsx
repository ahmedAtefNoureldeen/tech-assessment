import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PayrollFiltersProps {
  filters: {
    name: string;
    minBaseSalary: string;
    maxBaseSalary: string;
    minBonus: string;
    maxBonus: string;
    minDeductions: string;
    maxDeductions: string;
    minPayable: string;
    maxPayable: string;
  };
  onFilterChange: (filters: PayrollFiltersProps['filters']) => void;
}

export function PayrollFilters({ filters, onFilterChange }: PayrollFiltersProps) {
  const handleChange = (field: keyof PayrollFiltersProps['filters'], value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      name: '',
      minBaseSalary: '',
      maxBaseSalary: '',
      minBonus: '',
      maxBonus: '',
      minDeductions: '',
      maxDeductions: '',
      minPayable: '',
      maxPayable: '',
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Employee Name</Label>
            <Input
              id="name"
              placeholder="Search by name"
              value={filters.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minBaseSalary">Min Base Salary</Label>
            <Input
              id="minBaseSalary"
              type="number"
              placeholder="Min base salary"
              value={filters.minBaseSalary}
              onChange={(e) => handleChange('minBaseSalary', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxBaseSalary">Max Base Salary</Label>
            <Input
              id="maxBaseSalary"
              type="number"
              placeholder="Max base salary"
              value={filters.maxBaseSalary}
              onChange={(e) => handleChange('maxBaseSalary', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minBonus">Min Bonus</Label>
            <Input
              id="minBonus"
              type="number"
              placeholder="Min bonus"
              value={filters.minBonus}
              onChange={(e) => handleChange('minBonus', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxBonus">Max Bonus</Label>
            <Input
              id="maxBonus"
              type="number"
              placeholder="Max bonus"
              value={filters.maxBonus}
              onChange={(e) => handleChange('maxBonus', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minDeductions">Min Deductions</Label>
            <Input
              id="minDeductions"
              type="number"
              placeholder="Min deductions"
              value={filters.minDeductions}
              onChange={(e) => handleChange('minDeductions', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxDeductions">Max Deductions</Label>
            <Input
              id="maxDeductions"
              type="number"
              placeholder="Max deductions"
              value={filters.maxDeductions}
              onChange={(e) => handleChange('maxDeductions', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minPayable">Min Payable Amount</Label>
            <Input
              id="minPayable"
              type="number"
              placeholder="Min payable"
              value={filters.minPayable}
              onChange={(e) => handleChange('minPayable', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxPayable">Max Payable Amount</Label>
            <Input
              id="maxPayable"
              type="number"
              placeholder="Max payable"
              value={filters.maxPayable}
              onChange={(e) => handleChange('maxPayable', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 