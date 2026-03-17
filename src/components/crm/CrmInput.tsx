import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface CrmInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const CrmInput = forwardRef<HTMLInputElement, CrmInputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none transition-all",
          "focus:ring-2 focus:ring-ring/20 focus:border-primary",
          "placeholder:text-muted-foreground",
          error && "border-destructive focus:ring-destructive/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
);

CrmInput.displayName = "CrmInput";
export default CrmInput;
