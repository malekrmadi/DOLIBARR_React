import { Tier, Contact } from "./types";

export const tiers: Tier[] = [
  { id: "t1", name: "Nexora Technologies", type: "client", email: "contact@nexora.fr", phone: "01 42 68 90 12", address: "15 Rue de la Paix", city: "Paris", country: "France", assignedTo: "Marie Dupont", status: "actif", createdAt: "2024-01-15" },
  { id: "t2", name: "Solaris Conseil", type: "prospect", email: "info@solaris-conseil.fr", phone: "04 91 23 45 67", address: "8 Avenue du Prado", city: "Marseille", country: "France", assignedTo: "Thomas Martin", status: "actif", createdAt: "2024-02-20" },
  { id: "t3", name: "Vertex Industries", type: "client", email: "hello@vertex-ind.com", phone: "03 20 45 67 89", address: "42 Boulevard Carnot", city: "Lille", country: "France", assignedTo: "Marie Dupont", status: "actif", createdAt: "2023-11-05" },
  { id: "t4", name: "AquaFlow SAS", type: "client", email: "direction@aquaflow.fr", phone: "05 56 78 90 12", address: "3 Quai des Chartrons", city: "Bordeaux", country: "France", assignedTo: "Lucas Bernard", status: "actif", createdAt: "2024-03-10" },
  { id: "t5", name: "Digital Wave", type: "prospect", email: "contact@digitalwave.io", phone: "02 40 12 34 56", address: "27 Rue Crébillon", city: "Nantes", country: "France", assignedTo: "Sophie Lemaire", status: "actif", createdAt: "2024-06-01" },
  { id: "t6", name: "GreenTech Solutions", type: "client", email: "support@greentech.fr", phone: "04 72 56 78 90", address: "12 Place Bellecour", city: "Lyon", country: "France", assignedTo: "Thomas Martin", status: "actif", createdAt: "2023-09-22" },
  { id: "t7", name: "Lumina Design", type: "prospect", email: "hello@lumina-design.fr", phone: "03 88 23 45 67", address: "5 Rue du Dôme", city: "Strasbourg", country: "France", assignedTo: "Marie Dupont", status: "inactif", createdAt: "2024-04-15" },
  { id: "t8", name: "Horizon Média", type: "client", email: "contact@horizon-media.fr", phone: "01 45 67 89 01", address: "88 Avenue des Champs-Élysées", city: "Paris", country: "France", assignedTo: "Lucas Bernard", status: "actif", createdAt: "2023-07-30" },
  { id: "t9", name: "Proliance Group", type: "client", email: "info@proliance.fr", phone: "04 67 89 01 23", address: "16 Rue Foch", city: "Montpellier", country: "France", assignedTo: "Sophie Lemaire", status: "actif", createdAt: "2024-01-28" },
  { id: "t10", name: "Atelier Numérique", type: "prospect", email: "bonjour@atelier-num.fr", phone: "05 61 23 45 67", address: "9 Place du Capitole", city: "Toulouse", country: "France", assignedTo: "Thomas Martin", status: "actif", createdAt: "2024-05-12" },
  { id: "t11", name: "Corelink Systems", type: "client", email: "sales@corelink.fr", phone: "02 99 34 56 78", address: "21 Rue de la Liberté", city: "Rennes", country: "France", assignedTo: "Marie Dupont", status: "inactif", createdAt: "2023-06-18" },
  { id: "t12", name: "Waveform Audio", type: "prospect", email: "contact@waveform.fr", phone: "01 53 45 67 89", address: "33 Rue Oberkampf", city: "Paris", country: "France", assignedTo: "Lucas Bernard", status: "actif", createdAt: "2024-07-05" },
  { id: "t13", name: "BioVital Santé", type: "client", email: "admin@biovital.fr", phone: "04 78 90 12 34", address: "7 Rue de la République", city: "Lyon", country: "France", assignedTo: "Sophie Lemaire", status: "actif", createdAt: "2024-02-14" },
];

export const contacts: Contact[] = [
  { id: "c1", firstName: "Jean", lastName: "Moreau", email: "j.moreau@nexora.fr", phone: "06 12 34 56 78", position: "Directeur Général", tierId: "t1" },
  { id: "c2", firstName: "Claire", lastName: "Fontaine", email: "c.fontaine@nexora.fr", phone: "06 23 45 67 89", position: "Responsable Achats", tierId: "t1" },
  { id: "c3", firstName: "Ahmed", lastName: "Benali", email: "a.benali@solaris-conseil.fr", phone: "06 34 56 78 90", position: "Consultant Senior", tierId: "t2" },
  { id: "c4", firstName: "Isabelle", lastName: "Roux", email: "i.roux@vertex-ind.com", phone: "06 45 67 89 01", position: "Directrice Commerciale", tierId: "t3" },
  { id: "c5", firstName: "Pierre", lastName: "Lambert", email: "p.lambert@vertex-ind.com", phone: "06 56 78 90 12", position: "Chef de Projet", tierId: "t3" },
  { id: "c6", firstName: "Nadia", lastName: "Chérif", email: "n.cherif@vertex-ind.com", phone: "06 67 89 01 23", position: "Ingénieure R&D", tierId: "t3" },
  { id: "c7", firstName: "Marc", lastName: "Duval", email: "m.duval@aquaflow.fr", phone: "06 78 90 12 34", position: "PDG", tierId: "t4" },
  { id: "c8", firstName: "Émilie", lastName: "Gauthier", email: "e.gauthier@digitalwave.io", phone: "06 89 01 23 45", position: "Lead Developer", tierId: "t5" },
  { id: "c9", firstName: "Yann", lastName: "Lefèvre", email: "y.lefevre@digitalwave.io", phone: "06 90 12 34 56", position: "CEO", tierId: "t5" },
  { id: "c10", firstName: "Sophie", lastName: "Mercier", email: "s.mercier@greentech.fr", phone: "06 01 23 45 67", position: "Directrice RSE", tierId: "t6" },
  { id: "c11", firstName: "David", lastName: "Petit", email: "d.petit@greentech.fr", phone: "06 11 22 33 44", position: "Responsable Innovation", tierId: "t6" },
  { id: "c12", firstName: "Léa", lastName: "Martin", email: "l.martin@lumina-design.fr", phone: "06 22 33 44 55", position: "Directrice Artistique", tierId: "t7" },
  { id: "c13", firstName: "Hugo", lastName: "Bernard", email: "h.bernard@horizon-media.fr", phone: "06 33 44 55 66", position: "Directeur de Création", tierId: "t8" },
  { id: "c14", firstName: "Camille", lastName: "Robert", email: "c.robert@horizon-media.fr", phone: "06 44 55 66 77", position: "Chef de Publicité", tierId: "t8" },
  { id: "c15", firstName: "Antoine", lastName: "Thomas", email: "a.thomas@proliance.fr", phone: "06 55 66 77 88", position: "DRH", tierId: "t9" },
  { id: "c16", firstName: "Manon", lastName: "Richard", email: "m.richard@atelier-num.fr", phone: "06 66 77 88 99", position: "UX Designer", tierId: "t10" },
  { id: "c17", firstName: "Julien", lastName: "Simon", email: "j.simon@corelink.fr", phone: "06 77 88 99 00", position: "CTO", tierId: "t11" },
  { id: "c18", firstName: "Chloé", lastName: "Laurent", email: "c.laurent@waveform.fr", phone: "06 88 99 00 11", position: "Productrice", tierId: "t12" },
  { id: "c19", firstName: "Nicolas", lastName: "Garcia", email: "n.garcia@biovital.fr", phone: "06 99 00 11 22", position: "Directeur R&D", tierId: "t13" },
  { id: "c20", firstName: "Marine", lastName: "Faure", email: "m.faure@biovital.fr", phone: "06 10 20 30 40", position: "Responsable Qualité", tierId: "t13" },
];

export const commerciaux = ["Marie Dupont", "Thomas Martin", "Lucas Bernard", "Sophie Lemaire"];
