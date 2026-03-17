import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface CrmSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

const CrmSelect = forwardRef<HTMLSelectElement, CrmSelectProps>(
  ({ label, options, error, className, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <select
        ref={ref}
        className={cn(
          "w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none transition-all appearance-none",
          "focus:ring-2 focus:ring-ring/20 focus:border-primary",
          error && "border-destructive",
          className
        )}
        {...props}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
);

CrmSelect.displayName = "CrmSelect";
export default CrmSelect;
