"use client";

import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InstallPwaPopup() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already running as a standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowPopup(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the native browser install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setShowPopup(false);
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
  };

  if (isStandalone) return null;

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm"
        >
          <div className="bg-foreground text-background p-4 rounded-2xl shadow-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-background/20 flex items-center justify-center shrink-0 text-background">
              <Download className="w-5 h-5" />
            </div>
            <div className="flex-1 pt-0.5">
              <h4 className="font-bold text-sm mb-1">Install Arthakosh</h4>
              <p className="text-xs text-background/80 mb-3">Install the app to your home screen for a faster, full-screen experience.</p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleInstallClick}
                  className="bg-background text-foreground text-xs font-bold px-4 py-2 rounded-lg hover:bg-background/90 transition-colors"
                >
                  Install App
                </button>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="text-xs font-semibold text-background/60 hover:text-background px-3 py-2 transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
            <button 
              onClick={() => setShowPopup(false)}
              className="text-background/40 hover:text-background transition-colors absolute top-3 right-3 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
