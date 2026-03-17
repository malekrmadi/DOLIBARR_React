import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { CrmButton } from "../components/crm/CrmButton";
import CrmBadge from "../components/crm/CrmBadge";
import CrmModal from "../components/crm/CrmModal";
import { Plus, Search, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 8;

const TiersListPage = () => {
  const { tiers, deleteTier } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

  const handleDelete = () => {
    if (deleteId) {
      deleteTier(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tiers</h1>
        <CrmButton onClick={() => navigate("/tiers/nouveau")}>
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
                      <CrmButton variant="ghost" size="icon" onClick={() => navigate(`/tiers/${tier.id}/modifier`)}>
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

      {/* Delete confirmation */}
      <CrmModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmer la suppression">
        <p className="text-sm text-muted-foreground mb-5">
          Êtes-vous sûr de vouloir supprimer ce tiers ? Cette action est irréversible.
        </p>
        <div className="flex justify-end gap-2">
          <CrmButton variant="outline" onClick={() => setDeleteId(null)}>Annuler</CrmButton>
          <CrmButton variant="destructive" onClick={handleDelete}>Supprimer</CrmButton>
        </div>
      </CrmModal>
    </div>
  );
};

export default TiersListPage;
