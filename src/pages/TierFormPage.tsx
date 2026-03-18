// TierFormPage is kept for route compatibility (/tiers/nouveau and /tiers/:id/modifier)
// but forms are now handled via modals in TiersListPage and TierDetailPage.
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TierFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Redirect to the appropriate page where the modal will open
    if (id) {
      navigate(`/tiers/${id}`, { replace: true });
    } else {
      navigate("/tiers", { replace: true });
    }
  }, [id, navigate]);

  return null;
};

export default TierFormPage;
