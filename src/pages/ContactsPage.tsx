import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import CrmCard from "../components/crm/CrmCard";
import { CrmButton } from "../components/crm/CrmButton";
import CrmInput from "../components/crm/CrmInput";
import CrmSelect from "../components/crm/CrmSelect";
import CrmModal from "../components/crm/CrmModal";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Contact } from "../data/types";

const ContactsPage = () => {
  const { contacts, tiers, addContact, updateContact, deleteContact } = useApp();
  const [searchParams] = useSearchParams();
  const tierFilter = searchParams.get("tier") || "all";
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", position: "", tierId: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return contacts.filter(c => {
      const matchSearch = `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchTier = tierFilter === "all" || c.tierId === tierFilter;
      return matchSearch && matchTier;
    });
  }, [contacts, search, tierFilter]);

  const getTierName = (tierId: string) => tiers.find(t => t.id === tierId)?.name || "—";

  const openCreate = () => {
    setEditContact(null);
    setForm({ firstName: "", lastName: "", email: "", phone: "", position: "", tierId: tiers[0]?.id || "" });
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (c: Contact) => {
    setEditContact(c);
    setForm({ firstName: c.firstName, lastName: c.lastName, email: c.email, phone: c.phone, position: c.position, tierId: c.tierId });
    setErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Requis";
    if (!form.lastName.trim()) errs.lastName = "Requis";
    if (!form.email.trim()) errs.email = "Requis";
    if (!form.tierId) errs.tierId = "Requis";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const contact: Contact = { id: editContact?.id || `c${Date.now()}`, ...form };
    if (editContact) updateContact(contact);
    else addContact(contact);
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) { deleteContact(deleteId); setDeleteId(null); }
  };

  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <CrmButton onClick={openCreate}><Plus size={16} /> Créer un contact</CrmButton>
      </div>

      <CrmCard>
        <div className="mb-4">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un contact..."
              className="w-full h-9 pl-9 pr-4 text-sm bg-secondary rounded-lg border-none outline-none focus:ring-2 focus:ring-ring/20 transition-all placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left border-b border-border">
                <th className="px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nom</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Poste</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Email</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Téléphone</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tiers</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-4 font-medium">{c.firstName} {c.lastName}</td>
                  <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{c.position}</td>
                  <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{c.email}</td>
                  <td className="px-5 py-4 text-muted-foreground hidden lg:table-cell">{c.phone}</td>
                  <td className="px-5 py-4 text-muted-foreground">{getTierName(c.tierId)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <CrmButton variant="ghost" size="icon" onClick={() => openEdit(c)}><Pencil size={15} /></CrmButton>
                      <CrmButton variant="ghost" size="icon" onClick={() => setDeleteId(c.id)}><Trash2 size={15} className="text-destructive" /></CrmButton>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">Aucun contact trouvé</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </CrmCard>

      {/* Create/Edit Modal */}
      <CrmModal open={modalOpen} onClose={() => setModalOpen(false)} title={editContact ? "Modifier le contact" : "Créer un contact"}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <CrmInput label="Prénom" value={form.firstName} onChange={e => set("firstName", e.target.value)} error={errors.firstName} />
            <CrmInput label="Nom" value={form.lastName} onChange={e => set("lastName", e.target.value)} error={errors.lastName} />
          </div>
          <CrmInput label="Email" type="email" value={form.email} onChange={e => set("email", e.target.value)} error={errors.email} />
          <CrmInput label="Téléphone" value={form.phone} onChange={e => set("phone", e.target.value)} />
          <CrmInput label="Poste" value={form.position} onChange={e => set("position", e.target.value)} />
          <CrmSelect label="Tiers" value={form.tierId} onChange={e => set("tierId", e.target.value)} error={errors.tierId}
            options={tiers.map(t => ({ value: t.id, label: t.name }))} />
          <div className="flex justify-end gap-3 pt-5 mt-2 border-t border-border">
            <CrmButton variant="outline" type="button" onClick={() => setModalOpen(false)}>Annuler</CrmButton>
            <CrmButton type="submit">{editContact ? "Enregistrer" : "Créer"}</CrmButton>
          </div>
        </form>
      </CrmModal>

      {/* Delete confirmation */}
      <CrmModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmer la suppression">
        <p className="text-sm text-muted-foreground mb-6">Êtes-vous sûr de vouloir supprimer ce contact ? Cette action est irréversible.</p>
        <div className="flex justify-end gap-3 pt-5 mt-2 border-t border-border">
          <CrmButton variant="outline" onClick={() => setDeleteId(null)}>Annuler</CrmButton>
          <CrmButton variant="destructive" onClick={handleDelete}>Supprimer</CrmButton>
        </div>
      </CrmModal>
    </div>
  );
};

export default ContactsPage;
