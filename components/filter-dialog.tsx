import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { useState } from "react";

interface FilterDialogProps {
  onFilter: (filters: Record<string, string>) => void;
  fields: Array<{
    name: string;
    label: string;
    type?: string;
  }>;
}

export function FilterDialog({ onFilter, fields }: FilterDialogProps) {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilter = () => {
    onFilter(filters);
  };

  const handleClear = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Data</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                type={field.type || "text"}
                value={filters[field.name] || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    [field.name]: e.target.value,
                  }))
                }
              />
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button onClick={handleFilter}>Apply Filters</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 