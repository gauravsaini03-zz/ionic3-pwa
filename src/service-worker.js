 /**
 * Check out https://googlechrome.github.io/sw-toolbox/docs/master/index.html for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */

'use strict';
importScripts('./build/sw-toolbox.js');

var version = 1;

self.toolbox.options.debug = true;

self.toolbox.options.cache = {
  name: 'ionic-cache' + version
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json',
    '/'
  ]
);

self.toolbox.router.get('/(.*)', function(request, values, options) {
  if (!request.url.match("symbols")) {
    console.log("===entire currency list API===");
    return self.toolbox.networkFirst(request, values, options);
  } else {
    console.log("===specific conversion between two currencies===");
    return self.toolbox.cacheFirst(request, values, options);
  }
}, {
  cache: {
    name: 'fixerio',
    maxEntries: 10,
    maxAgeSeconds: 3600
  },
  origin: /\.fixer\.io$/
});

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst, {
  cache: {
    maxAgeSeconds: 3600
  }
});

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

// Deleting old caches
self.addEventListener('activate', function(event) {
  var expectedCacheNames = Object.keys(self.toolbox.options.cache.name).map(function(key) {
    return self.toolbox.options.cache.name[key];
  });
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', (event) => {
  console.log('Received a push message', event);

  const title = 'Forex Price Alert';
  const body = 'US Dollar to INR rates increased';
  const icon = 'assets/logo.png';
  const tag = 'forex';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag
    })
  );
});