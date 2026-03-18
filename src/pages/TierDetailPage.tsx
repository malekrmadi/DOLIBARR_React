import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import CrmCard from "../components/crm/CrmCard";
import CrmBadge from "../components/crm/CrmBadge";
import CrmModal from "../components/crm/CrmModal";
import CrmInput from "../components/crm/CrmInput";
import CrmSelect from "../components/crm/CrmSelect";
import { CrmButton } from "../components/crm/CrmButton";
import { ArrowLeft, Pencil, Mail, Phone, MapPin, User } from "lucide-react";
import { motion } from "framer-motion";
import { Tier } from "../data/types";

const TierDetailPage = () => {
  const { id } = useParams();
  const { tiers, contacts, updateTier } = useApp();
  const navigate = useNavigate();

  const tier = tiers.find(t => t.id === id);
  const tierContacts = contacts.filter(c => c.tierId === id);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form, setForm] = useState<Omit<Tier, "id" | "createdAt">>({
    name: "", type: "client", email: "", phone: "",
    address: "", city: "", country: "", assignedTo: "", status: "actif",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const openEdit = () => {
    if (!tier) return;
    setForm({
      name: tier.name,
      type: tier.type,
      email: tier.email,
      phone: tier.phone,
      address: tier.address,
      city: tier.city,
      country: tier.country,
      assignedTo: tier.assignedTo,
      status: tier.status,
    });
    setErrors({});
    setEditModalOpen(true);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Requis";
    if (!form.email.trim()) errs.email = "Requis";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !tier) return;
    updateTier({ id: tier.id, createdAt: tier.createdAt, ...form });
    setEditModalOpen(false);
  };

  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

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
        <CrmButton variant="outline" onClick={openEdit}>
          <Pencil size={15} /> Modifier
        </CrmButton>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <CrmCard>
            <h2 className="text-lg font-semibold mb-4">Informations générales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Mail, label: "Email", value: tier.email },
                { icon: Phone, label: "Téléphone", value: tier.phone },
                { icon: MapPin, label: "Adresse", value: `${tier.address}, ${tier.city}` },
                { icon: MapPin, label: "Pays", value: tier.country },
                { icon: User, label: "Commercial", value: tier.assignedTo },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-secondary/50">
                    <item.icon size={16} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CrmCard>
        </motion.div>
      </div>

      {/* Contacts */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4">
        <CrmCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Contacts liés ({tierContacts.length})</h2>
            <CrmButton variant="outline" size="sm" onClick={() => navigate(`/contacts?tier=${tier.id}`)}>
              Gérer les contacts
            </CrmButton>
          </div>
          {tierContacts.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="text-left border-b border-border">
                    <th className="px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nom</th>
                    <th className="px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Poste</th>
                    <th className="px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Email</th>
                    <th className="px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Téléphone</th>
                  </tr>
                </thead>
                <tbody>
                  {tierContacts.map(c => (
                    <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="px-5 py-4 font-medium">{c.firstName} {c.lastName}</td>
                      <td className="px-5 py-4 text-muted-foreground">{c.position}</td>
                      <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{c.email}</td>
                      <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{c.phone}</td>
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

      {/* Edit Modal */}
      <CrmModal open={editModalOpen} onClose={() => setEditModalOpen(false)} title="Modifier le tiers">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <CrmInput label="Nom du tiers" value={form.name} onChange={e => set("name", e.target.value)} error={errors.name} />
            </div>
            <CrmSelect
              label="Type"
              value={form.type}
              onChange={e => set("type", e.target.value)}
              options={[{ value: "client", label: "Client" }, { value: "prospect", label: "Prospect" }]}
            />
            <CrmSelect
              label="Statut"
              value={form.status}
              onChange={e => set("status", e.target.value)}
              options={[{ value: "actif", label: "Actif" }, { value: "inactif", label: "Inactif" }]}
            />
            <CrmInput label="Email" type="email" value={form.email} onChange={e => set("email", e.target.value)} error={errors.email} />
            <CrmInput label="Téléphone" value={form.phone} onChange={e => set("phone", e.target.value)} />
            <CrmInput label="Adresse" value={form.address} onChange={e => set("address", e.target.value)} />
            <CrmInput label="Ville" value={form.city} onChange={e => set("city", e.target.value)} />
            <CrmInput label="Pays" value={form.country} onChange={e => set("country", e.target.value)} />
            <CrmInput label="Commercial assigné" value={form.assignedTo} onChange={e => set("assignedTo", e.target.value)} />
          </div>
          <div className="flex justify-end gap-3 pt-5 mt-2 border-t border-border">
            <CrmButton variant="outline" type="button" onClick={() => setEditModalOpen(false)}>Annuler</CrmButton>
            <CrmButton type="submit">Enregistrer</CrmButton>
          </div>
        </form>
      </CrmModal>
    </div>
  );
};

export default TierDetailPage;
