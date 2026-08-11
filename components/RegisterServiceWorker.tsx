"use client";

import { useEffect } from "react";

/**
 * Enregistre public/sw.js côté client. Rendu sans rien afficher
 * (composant purement fonctionnel, monté depuis le layout racine).
 */
export default function RegisterServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.error("Échec de l'enregistrement du service worker :", err);
    });
  }, []);

  return null;
}
