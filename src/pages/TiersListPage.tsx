import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { CrmButton } from "../components/crm/CrmButton";
import CrmBadge from "../components/crm/CrmBadge";
import CrmModal from "../components/crm/CrmModal";
import CrmInput from "../components/crm/CrmInput";
import CrmSelect from "../components/crm/CrmSelect";
import { Plus, Search, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Tier } from "../data/types";

const ITEMS_PER_PAGE = 8;

const emptyForm = {
  name: "",
  type: "client" as Tier["type"],
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "France",
  assignedTo: "",
  status: "actif" as Tier["status"],
};

const TiersListPage = () => {
  const { tiers, addTier, updateTier, deleteTier } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTier, setEditTier] = useState<Tier | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return tiers.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.email.toLowerCase().includes(search.toLowerCase()) ||
        t.city.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || t.type === typeFilter;
      const matchStatus = statusFilter === "all" || t.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [tiers, search, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const openCreate = () => {
    setEditTier(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (tier: Tier) => {
    setEditTier(tier);
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
    setModalOpen(true);
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
    if (!validate()) return;
    const tier: Tier = {
      id: editTier?.id || `t${Date.now()}`,
      ...form,
      createdAt: editTier?.createdAt || new Date().toISOString(),
    };
    if (editTier) updateTier(tier);
    else addTier(tier);
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) { deleteTier(deleteId); setDeleteId(null); }
  };

  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tiers</h1>
        <CrmButton onClick={openCreate}>
          <Plus size={16} /> Créer un tiers
        </CrmButton>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border shadow-card mb-4">
        <div className="p-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Rechercher un tiers..."
              className="w-full h-9 pl-9 pr-4 text-sm bg-secondary rounded-lg border-none outline-none focus:ring-2 focus:ring-ring/20 transition-all placeholder:text-muted-foreground"
            />
          </div>
          <select
            value={typeFilter}
            onChange={e => { setTypeFilter(e.target.value); setPage(1); }}
            className="h-9 px-3 text-sm bg-secondary rounded-lg border-none outline-none appearance-none cursor-pointer"
          >
            <option value="all">Tous les types</option>
            <option value="client">Clients</option>
            <option value="prospect">Prospects</option>
          </select>
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="h-9 px-3 text-sm bg-secondary rounded-lg border-none outline-none appearance-none cursor-pointer"
          >
            <option value="all">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-border text-left">
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nom</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Email</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Téléphone</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Ville</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Commercial</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(tier => (
                <tr key={tier.id} className="border-t border-border hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3 font-medium">{tier.name}</td>
                  <td className="px-4 py-3"><CrmBadge variant={tier.type}>{tier.type}</CrmBadge></td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{tier.email}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{tier.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{tier.city}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden xl:table-cell">{tier.assignedTo}</td>
                  <td className="px-4 py-3"><CrmBadge variant={tier.status}>{tier.status}</CrmBadge></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <CrmButton variant="ghost" size="icon" onClick={() => navigate(`/tiers/${tier.id}`)}>
                        <Eye size={15} />
                      </CrmButton>
                      <CrmButton variant="ghost" size="icon" onClick={() => openEdit(tier)}>
                        <Pencil size={15} />
                      </CrmButton>
                      <CrmButton variant="ghost" size="icon" onClick={() => setDeleteId(tier.id)}>
                        <Trash2 size={15} className="text-destructive" />
                      </CrmButton>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">Aucun tiers trouvé</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <span className="text-sm text-muted-foreground">
              {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-1">
              <CrmButton variant="ghost" size="icon" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                <ChevronLeft size={16} />
              </CrmButton>
              {Array.from({ length: totalPages }, (_, i) => (
                <CrmButton
                  key={i}
                  variant={page === i + 1 ? "primary" : "ghost"}
                  size="icon"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </CrmButton>
              ))}
              <CrmButton variant="ghost" size="icon" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                <ChevronRight size={16} />
              </CrmButton>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <CrmModal open={modalOpen} onClose={() => setModalOpen(false)} title={editTier ? "Modifier le tiers" : "Créer un tiers"}>
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
            <CrmButton variant="outline" type="button" onClick={() => setModalOpen(false)}>Annuler</CrmButton>
            <CrmButton type="submit">{editTier ? "Enregistrer" : "Créer"}</CrmButton>
          </div>
        </form>
      </CrmModal>

      {/* Delete confirmation */}
      <CrmModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmer la suppression">
        <p className="text-sm text-muted-foreground mb-6">Êtes-vous sûr de vouloir supprimer ce tiers ? Cette action est irréversible.</p>
        <div className="flex justify-end gap-3 pt-5 mt-2 border-t border-border">
          <CrmButton variant="outline" onClick={() => setDeleteId(null)}>Annuler</CrmButton>
          <CrmButton variant="destructive" onClick={handleDelete}>Supprimer</CrmButton>
        </div>
      </CrmModal>
    </div>
  );
};

export default TiersListPage;
