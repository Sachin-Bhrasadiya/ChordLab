// Required for: Providing a reusable dropdown menu to let users easily switch between instruments (e.g., Guitar to Ukulele).
import { Guitar } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INSTRUMENTS } from "@/lib/instruments";

interface Props {
  value: string;
  onChange: (id: string) => void;
  label?: string;
  className?: string;
}

// Renders the select dropdown pre-populated with the supported instrument list from the central config
export function InstrumentPicker({ value, onChange, label = "Instrument", className }: Props) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Guitar className="size-4 text-muted-foreground" />
        <span className="text-sm">{label}</span>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="ml-auto w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {INSTRUMENTS.map((i) => (
              <SelectItem key={i.id} value={i.id}>
                {i.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}