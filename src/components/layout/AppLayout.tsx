import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useApp } from "../../contexts/AppContext";
import { AnimatePresence, motion } from "framer-motion";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { toast } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[240px]">
        <Topbar />
        <main className="p-6 animate-fade-in">{children}</main>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 40, x: "-50%" }}
            className="fixed bottom-6 left-1/2 bg-foreground text-background px-5 py-3 rounded-lg shadow-elevated text-sm font-medium z-50"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppLayout;
