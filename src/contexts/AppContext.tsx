import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Tier, Contact, User } from "../data/types";
import { tiers as initialTiers, contacts as initialContacts } from "../data/fakeData";

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  tiers: Tier[];
  contacts: Contact[];
  addTier: (tier: Tier) => void;
  updateTier: (tier: Tier) => void;
  deleteTier: (id: string) => void;
  addContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;
  toast: { message: string; visible: boolean };
  showToast: (message: string) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tiers, setTiers] = useState<Tier[]>(initialTiers);
  const [contactsList, setContacts] = useState<Contact[]>(initialContacts);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  }, []);

  const addTier = useCallback((tier: Tier) => {
    setTiers(prev => [tier, ...prev]);
    showToast("Tiers créé avec succès");
  }, [showToast]);

  const updateTier = useCallback((tier: Tier) => {
    setTiers(prev => prev.map(t => t.id === tier.id ? tier : t));
    showToast("Modification enregistrée");
  }, [showToast]);

  const deleteTier = useCallback((id: string) => {
    setTiers(prev => prev.filter(t => t.id !== id));
    setContacts(prev => prev.filter(c => c.tierId !== id));
    showToast("Suppression réussie");
  }, [showToast]);

  const addContact = useCallback((contact: Contact) => {
    setContacts(prev => [contact, ...prev]);
    showToast("Contact créé avec succès");
  }, [showToast]);

  const updateContact = useCallback((contact: Contact) => {
    setContacts(prev => prev.map(c => c.id === contact.id ? contact : c));
    showToast("Modification enregistrée");
  }, [showToast]);

  const deleteContact = useCallback((id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    showToast("Suppression réussie");
  }, [showToast]);

  return (
    <AppContext.Provider value={{
      user, setUser,
      tiers, contacts: contactsList,
      addTier, updateTier, deleteTier,
      addContact, updateContact, deleteContact,
      toast, showToast,
      isMobileMenuOpen, setMobileMenuOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
};
