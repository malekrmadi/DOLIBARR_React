import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface CrmCardProps {
  children: ReactNode;
  className?: string;
}

const CrmCard = ({ children, className }: CrmCardProps) => (
  <div className={cn("bg-card rounded-xl border border-border shadow-card p-5", className)}>
    {children}
  </div>
);

export default CrmCard;
