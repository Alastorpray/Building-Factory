const CACHE_PREFIX = 'v3d-app-cache';
const CACHE_HASH = '06d1eaa037';
const CACHE_VERSION = 'v1';

const ASSETS = [
    'Building_Color.png',
    'circulos v2.png',
    'index.html',
    '.DS_Store',
    'opentype.js',
    'basis_transcoder.wasm',
    'Building Factory.gltf',
    'v3d_exported_image_ao_keyboards.png',
    'visual_logic.js',
    'Building Factory.js',
    'future is now.webp',
    'AO_Base1.png',
    'brown_photostudio_03_2k.hdr',
    'ammo.wasm.wasm',
    'v3d_exported_image_building_color.png',
    'Building Factory.css',
    'ammo.wasm.js',
    'v3d.js',
    'Building Factory.bin',
    '.git',
    'environment.hdr',
    'v3d_exported_image_second_floor_basecolor.png',
    'basis_transcoder.js',
    '.git/hooks/commit-msg.sample',
    '.git/hooks/pre-rebase.sample',
    '.git/hooks/pre-commit.sample',
    '.git/hooks/applypatch-msg.sample',
    '.git/hooks/fsmonitor-watchman.sample',
    '.git/hooks/pre-receive.sample',
    '.git/hooks/prepare-commit-msg.sample',
    '.git/hooks/post-update.sample',
    '.git/hooks/pre-merge-commit.sample',
    '.git/hooks/pre-applypatch.sample',
    '.git/hooks/pre-push.sample',
    '.git/hooks/update.sample',
    '.git/hooks/push-to-checkout.sample',
    'media/favicon-16x16.png',
    'media/safari-pinned-tab.svg',
    'media/android-chrome-192x192.png',
    'media/apple-touch-icon.png',
    'media/SCR-20240507-bvso.png',
    'media/robertech.svg',
    'media/favicon-48x48.png',
    'media/android-chrome-512x512.png',
    'media/manifest.json',
    'media/fullscreen_open.svg',
    'media/fullscreen_close.svg',
    'media/favicon-32x32.png',
];

const cacheName = () => {
    return `${CACHE_PREFIX}-${CACHE_HASH}-${CACHE_VERSION}`;
}

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName()).then(cache => {
        return cache.addAll(ASSETS);
    }));
});

const deleteCache = async (key) => {
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    const cacheKeepList = [cacheName()];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => {
        return (key.includes(CACHE_HASH) && !cacheKeepList.includes(key));
    });
    await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener('activate', (event) => {
    event.waitUntil(deleteOldCaches());
});

const handleCached = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache)
        return responseFromCache;
    return fetch(request);
};

self.addEventListener('fetch', (event) => {
    event.respondWith(handleCached(event.request));
});
