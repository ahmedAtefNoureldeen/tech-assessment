import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface EmployeeFiltersProps {
  filters: {
    name: string;
    minSalary: string;
    maxSalary: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange: (filters: EmployeeFiltersProps['filters']) => void;
}

export function EmployeeFilters({ filters, onFilterChange }: EmployeeFiltersProps) {
  const handleChange = (field: keyof EmployeeFiltersProps['filters'], value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Search by name"
              value={filters.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minSalary">Min Salary</Label>
            <Input
              id="minSalary"
              type="number"
              placeholder="Min salary"
              value={filters.minSalary}
              onChange={(e) => handleChange('minSalary', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxSalary">Max Salary</Label>
            <Input
              id="maxSalary"
              type="number"
              placeholder="Max salary"
              value={filters.maxSalary}
              onChange={(e) => handleChange('maxSalary', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={filters.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={filters.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 