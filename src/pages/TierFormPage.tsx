import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import CrmInput from "../components/crm/CrmInput";
import CrmSelect from "../components/crm/CrmSelect";
import { CrmButton } from "../components/crm/CrmButton";
import CrmCard from "../components/crm/CrmCard";
import { ArrowLeft } from "lucide-react";
import { commerciaux } from "../data/fakeData";
import { Tier } from "../data/types";

const TierFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tiers, addTier, updateTier } = useApp();
  const isEdit = id && id !== "nouveau";
  const existing = isEdit ? tiers.find(t => t.id === id) : null;

  const [form, setForm] = useState({
    name: "", type: "client" as "client" | "prospect", email: "", phone: "",
    address: "", city: "", country: "France", assignedTo: commerciaux[0], status: "actif" as "actif" | "inactif",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name, type: existing.type, email: existing.email, phone: existing.phone,
        address: existing.address, city: existing.city, country: existing.country,
        assignedTo: existing.assignedTo, status: existing.status,
      });
    }
  }, [existing]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Le nom est requis";
    if (!form.email.trim()) errs.email = "L'email est requis";
    if (!form.city.trim()) errs.city = "La ville est requise";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const tier: Tier = {
      id: isEdit ? id! : `t${Date.now()}`,
      ...form,
      createdAt: existing?.createdAt || new Date().toISOString().split("T")[0],
    };

    if (isEdit) updateTier(tier);
    else addTier(tier);

    navigate("/tiers");
  };

  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <CrmButton variant="ghost" size="icon" onClick={() => navigate("/tiers")}>
          <ArrowLeft size={18} />
        </CrmButton>
        <h1 className="text-2xl font-bold">{isEdit ? "Modifier le tiers" : "Créer un tiers"}</h1>
      </div>

      <CrmCard>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CrmInput label="Nom" value={form.name} onChange={e => set("name", e.target.value)} error={errors.name} placeholder="Nom de l'entreprise" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CrmSelect label="Type" value={form.type} onChange={e => set("type", e.target.value)}
              options={[{ value: "client", label: "Client" }, { value: "prospect", label: "Prospect" }]} />
            <CrmSelect label="Statut" value={form.status} onChange={e => set("status", e.target.value)}
              options={[{ value: "actif", label: "Actif" }, { value: "inactif", label: "Inactif" }]} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CrmInput label="Email" type="email" value={form.email} onChange={e => set("email", e.target.value)} error={errors.email} placeholder="email@exemple.com" />
            <CrmInput label="Téléphone" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="01 23 45 67 89" />
          </div>

          <CrmInput label="Adresse" value={form.address} onChange={e => set("address", e.target.value)} placeholder="Adresse complète" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CrmInput label="Ville" value={form.city} onChange={e => set("city", e.target.value)} error={errors.city} placeholder="Ville" />
            <CrmInput label="Pays" value={form.country} onChange={e => set("country", e.target.value)} placeholder="Pays" />
          </div>

          <CrmSelect label="Commercial" value={form.assignedTo} onChange={e => set("assignedTo", e.target.value)}
            options={commerciaux.map(c => ({ value: c, label: c }))} />

          <div className="flex justify-end gap-2 pt-2">
            <CrmButton variant="outline" type="button" onClick={() => navigate("/tiers")}>Annuler</CrmButton>
            <CrmButton type="submit">{isEdit ? "Enregistrer" : "Créer"}</CrmButton>
          </div>
        </form>
      </CrmCard>
    </div>
  );
};

export default TierFormPage;
