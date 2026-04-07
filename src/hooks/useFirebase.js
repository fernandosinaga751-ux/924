// ============================================================
// useFirebase — Custom Hook
// Mengelola semua operasi Firestore (CRUD + real-time listeners)
// ============================================================
import { useState, useEffect } from "react";
import {
  collection, doc,
  onSnapshot, query, orderBy,
  addDoc, updateDoc, deleteDoc,
  setDoc, getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { SEED_CARS, SEED_ARTICLES, SEED_SETTINGS, SEED_SEO } from "../seed";

export function useFirebase() {
  const [cars,     setCars]     = useState([]);
  const [articles, setArticles] = useState([]);
  const [settings, setSettings] = useState(null);
  const [seo,      setSeoState] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [seeded,   setSeeded]   = useState(false);

  // ── seed data jika Firestore masih kosong ────────────────────
  useEffect(() => {
    async function seed() {
      try {
        const settingsSnap = await getDoc(doc(db, "config", "settings"));
        if (!settingsSnap.exists()) {
          // Seed settings & seo
          await setDoc(doc(db, "config", "settings"), SEED_SETTINGS);
          await setDoc(doc(db, "config", "seo"),      SEED_SEO);
          // Seed cars
          for (const car of SEED_CARS) {
            await addDoc(collection(db, "cars"), car);
          }
          // Seed articles
          for (const article of SEED_ARTICLES) {
            await addDoc(collection(db, "articles"), article);
          }
        }
      } catch (err) {
        console.error("Seed error:", err);
      } finally {
        setSeeded(true);
      }
    }
    seed();
  }, []);

  // ── real-time listeners (aktif setelah seed selesai) ────────
  useEffect(() => {
    if (!seeded) return;

    let count = 0;
    const done = () => { count++; if (count >= 4) setLoading(false); };

    const unsubCars = onSnapshot(
      query(collection(db, "cars"), orderBy("order", "asc")),
      (snap) => {
        setCars(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        done();
      },
      (err) => { console.error("cars:", err); done(); }
    );

    const unsubArticles = onSnapshot(
      query(collection(db, "articles"), orderBy("order", "asc")),
      (snap) => {
        setArticles(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        done();
      },
      (err) => { console.error("articles:", err); done(); }
    );

    const unsubSettings = onSnapshot(
      doc(db, "config", "settings"),
      (snap) => {
        if (snap.exists()) setSettings(snap.data());
        done();
      },
      (err) => { console.error("settings:", err); done(); }
    );

    const unsubSeo = onSnapshot(
      doc(db, "config", "seo"),
      (snap) => {
        if (snap.exists()) setSeoState(snap.data());
        done();
      },
      (err) => { console.error("seo:", err); done(); }
    );

    return () => { unsubCars(); unsubArticles(); unsubSettings(); unsubSeo(); };
  }, [seeded]);

  // ── CARS CRUD ────────────────────────────────────────────────
  const addCar = async (data) => {
    const order = cars.length + 1;
    await addDoc(collection(db, "cars"), { ...data, order, createdAt: serverTimestamp() });
  };
  const updateCar = async (id, data) => {
    await updateDoc(doc(db, "cars", id), { ...data, updatedAt: serverTimestamp() });
  };
  const deleteCar = async (id) => {
    await deleteDoc(doc(db, "cars", id));
  };

  // ── ARTICLES CRUD ────────────────────────────────────────────
  const addArticle = async (data) => {
    const order = articles.length + 1;
    await addDoc(collection(db, "articles"), { ...data, order, views: 0, createdAt: serverTimestamp() });
  };
  const updateArticle = async (id, data) => {
    await updateDoc(doc(db, "articles", id), { ...data, updatedAt: serverTimestamp() });
  };
  const deleteArticle = async (id) => {
    await deleteDoc(doc(db, "articles", id));
  };
  const incrementView = async (id) => {
    const snap = await getDoc(doc(db, "articles", id));
    if (snap.exists()) {
      await updateDoc(doc(db, "articles", id), { views: (snap.data().views || 0) + 1 });
    }
  };

  // ── SETTINGS & SEO SAVE ──────────────────────────────────────
  const saveSettings = async (data) => {
    await setDoc(doc(db, "config", "settings"), data, { merge: true });
  };
  const saveSeo = async (data) => {
    await setDoc(doc(db, "config", "seo"), data, { merge: true });
  };

  return {
    cars, articles, settings, seo, loading,
    addCar, updateCar, deleteCar,
    addArticle, updateArticle, deleteArticle, incrementView,
    saveSettings, saveSeo,
  };
}
