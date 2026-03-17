import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import CrmCard from "../components/crm/CrmCard";
import CrmBadge from "../components/crm/CrmBadge";
import { CrmButton } from "../components/crm/CrmButton";
import { ArrowLeft, Pencil, Mail, Phone, MapPin, User } from "lucide-react";
import { motion } from "framer-motion";

const TierDetailPage = () => {
  const { id } = useParams();
  const { tiers, contacts } = useApp();
  const navigate = useNavigate();

  const tier = tiers.find(t => t.id === id);
  const tierContacts = contacts.filter(c => c.tierId === id);

  if (!tier) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Tiers introuvable</p>
        <CrmButton variant="outline" className="mt-4" onClick={() => navigate("/tiers")}>Retour</CrmButton>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <CrmButton variant="ghost" size="icon" onClick={() => navigate("/tiers")}>
          <ArrowLeft size={18} />
        </CrmButton>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{tier.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <CrmBadge variant={tier.type}>{tier.type}</CrmBadge>
            <CrmBadge variant={tier.status}>{tier.status}</CrmBadge>
          </div>
        </div>
        <CrmButton variant="outline" onClick={() => navigate(`/tiers/${tier.id}/modifier`)}>
          <Pencil size={15} /> Modifier
        </CrmButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <CrmCard>
            <h2 className="text-lg font-semibold mb-4">Informations générales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Mail, label: "Email", value: tier.email },
                { icon: Phone, label: "Téléphone", value: tier.phone },
                { icon: MapPin, label: "Adresse", value: `${tier.address}, ${tier.city}` },
                { icon: MapPin, label: "Pays", value: tier.country },
                { icon: User, label: "Commercial", value: tier.assignedTo },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <item.icon size={15} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CrmCard>
        </motion.div>

        {/* Quick actions */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <CrmCard>
            <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
            <div className="space-y-2">
              <CrmButton variant="outline" className="w-full justify-start" onClick={() => navigate(`/tiers/${tier.id}/modifier`)}>
                <Pencil size={15} /> Modifier le tiers
              </CrmButton>
              <CrmButton variant="outline" className="w-full justify-start" onClick={() => navigate(`/contacts?tier=${tier.id}`)}>
                <User size={15} /> Voir les contacts
              </CrmButton>
            </div>
          </CrmCard>
        </motion.div>
      </div>

      {/* Contacts */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4">
        <CrmCard>
          <h2 className="text-lg font-semibold mb-4">Contacts liés ({tierContacts.length})</h2>
          {tierContacts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-border">
                    <th className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">Nom</th>
                    <th className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">Poste</th>
                    <th className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Email</th>
                    <th className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Téléphone</th>
                  </tr>
                </thead>
                <tbody>
                  {tierContacts.map(c => (
                    <tr key={c.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-medium">{c.firstName} {c.lastName}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.position}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{c.email}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{c.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Aucun contact lié</p>
          )}
        </CrmCard>
      </motion.div>
    </div>
  );
};

export default TierDetailPage;
