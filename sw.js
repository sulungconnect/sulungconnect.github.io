/**
 * Service worker Sulung Connect (GitHub Pages).
 * - Hanya menyimpan "kulit" aplikasi (index.html, manifest, logo) di GitHub Pages.
 * - Strategi NETWORK-FIRST: selalu ambil versi terbaru dari internet;
 *   cache hanya dipakai kalau HP sedang offline.
 * - Isi aplikasi (Google Apps Script) TIDAK disentuh / tidak di-cache.
 *
 * Kalau suatu saat mengganti file di GitHub dan ingin memaksa semua HP
 * membuang cache lama, cukup naikkan angka versi di CACHE_NAME (v2 -> v3).
 */
const CACHE_NAME = "sulung-connect-shell-v3";
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo-192.png",
  "/logo-512.png",
  "/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Hanya file di GitHub Pages; request ke Google dibiarkan lewat apa adanya.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req, { cache: "no-store" })
      .then((res) => {
        // Simpan salinan terbaru untuk cadangan saat offline
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match("/index.html") : undefined))
      )
  );
});