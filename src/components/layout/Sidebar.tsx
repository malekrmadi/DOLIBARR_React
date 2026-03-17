import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Building2, Users, Bot } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/tiers", label: "Tiers", icon: Building2 },
  { to: "/contacts", label: "Contacts", icon: Users },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] bg-sidebar flex flex-col z-30">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <span className="text-xl font-bold text-sidebar-primary-foreground tracking-tight">
          Agenist
        </span>
        <span className="ml-1.5 text-[10px] font-medium bg-sidebar-accent text-sidebar-accent-foreground px-1.5 py-0.5 rounded-md uppercase tracking-wider">
          CRM
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname.startsWith(to);
          return (
            <NavLink key={to} to={to}>
              <motion.div
                whileHover={{ x: 2 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                {label}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* AI Link */}
      <div className="px-3 pb-4">
        <NavLink to="/assistant">
          {({ isActive }: { isActive: boolean }) => (
            <motion.div
              whileHover={{ x: 2 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              }`}
            >
              <Bot size={18} strokeWidth={isActive ? 2 : 1.5} />
              Assistant IA
            </motion.div>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
