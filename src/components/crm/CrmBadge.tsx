import { cn } from "../../lib/utils";

interface CrmBadgeProps {
  variant: "client" | "prospect" | "actif" | "inactif";
  children: string;
}

const variantClasses: Record<CrmBadgeProps["variant"], string> = {
  client: "bg-badge-client text-badge-client-foreground",
  prospect: "bg-badge-prospect text-badge-prospect-foreground",
  actif: "bg-badge-active text-badge-active-foreground",
  inactif: "bg-badge-inactive text-badge-inactive-foreground",
};

const CrmBadge = ({ variant, children }: CrmBadgeProps) => (
  <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize", variantClasses[variant])}>
    {children}
  </span>
);

export default CrmBadge;
