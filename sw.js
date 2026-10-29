const VER = "fh-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-192-maskable.png",
  "./icon-512-maskable.png",
  "./icon-180.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(VER)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== VER).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

function sameOrigin(url) {
  try {
    return new URL(url, self.location.href).origin === self.location.origin;
  } catch (err) {
    return false;
  }
}

function isShell(req) {
  if (req.mode === "navigate") return true;
  let path = "";
  try {
    path = new URL(req.url, self.location.href).pathname;
  } catch (err) {
    return false;
  }
  if (path.endsWith("/")) return true;
  if (path.endsWith("/index.html") || path.endsWith("index.html")) return true;
  if (
    path.endsWith("/manifest.webmanifest") ||
    path.endsWith("manifest.webmanifest")
  )
    return true;
  return false;
}

function putOk(req, res) {
  if (!res || !res.ok) return res;
  if (!sameOrigin(req.url)) return res;
  const copy = res.clone();
  caches.open(VER).then((c) => c.put(req, copy));
  return res;
}

function networkFirst(req) {
  return fetch(req)
    .then((res) => putOk(req, res))
    .catch(() =>
      caches.match(req).then((hit) => hit || caches.match("./index.html")),
    );
}

function staleWhileRevalidate(req) {
  return caches.match(req).then((hit) => {
    const fetching = fetch(req)
      .then((res) => putOk(req, res))
      .catch(() => hit);
    return hit || fetching;
  });
}

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  if (!sameOrigin(e.request.url)) return;
  e.respondWith(
    isShell(e.request)
      ? networkFirst(e.request)
      : staleWhileRevalidate(e.request),
  );
});
