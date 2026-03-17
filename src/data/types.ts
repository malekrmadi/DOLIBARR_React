export interface Tier {
  id: string;
  name: string;
  type: "client" | "prospect";
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  assignedTo: string;
  status: "actif" | "inactif";
  createdAt: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  tierId: string;
}

export interface User {
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

export type AgentType = "crm" | "emailing" | "produits" | "facturation";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  agent: AgentType;
  timestamp: Date;
}
