import { useApp } from "../contexts/AppContext";
import { Building2, Users, UserPlus, TrendingUp } from "lucide-react";
import CrmCard from "../components/crm/CrmCard";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const { tiers } = useApp();

  const totalTiers = tiers.length;
  const clients = tiers.filter(t => t.type === "client").length;
  const prospects = tiers.filter(t => t.type === "prospect").length;
  const thisMonth = tiers.filter(t => {
    const d = new Date(t.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const stats = [
    { label: "Total des tiers", value: totalTiers, icon: Building2, color: "text-primary" },
    { label: "Clients", value: clients, icon: Users, color: "text-accent" },
    { label: "Prospects", value: prospects, icon: UserPlus, color: "text-badge-prospect" },
    { label: "Nouveaux ce mois", value: thisMonth, icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <CrmCard>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-lg bg-secondary ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
            </CrmCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
