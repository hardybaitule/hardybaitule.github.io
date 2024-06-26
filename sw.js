// 1. Save the files to the user's device
// The "install" event is called when the ServiceWorker starts up.
// All ServiceWorker code must be inside events.
self.addEventListener('install', function(e) {
  console.log('install');

  // waitUntil tells the browser that the install event is not finished until we have
  // cached all of our files
  e.waitUntil(
    // Here we call our cache "myonsenuipwa", but you can name it anything unique
    caches.open('myonsenuipwa').then(cache => {
      // If the request for any of these resources fails, _none_ of the resources will be
      // added to the cache.
      return cache.addAll([
        '/',
        '/index.html',
        '/db.html',
        '/edit.html',
        '/calc.html',
        '/add.html',
        '/js/jquery.min.js',
        '/js/bootstrap.min.js',
        '/js/localstoragedb.min.js',
        '/js/datetime.js',
        '/js/DataTables/datatables.min.js',
        '/js/dateuk.js',
        '/js/DataTables/datatables.min.css',
        '/css/bootstrap.min.css',
        '/icon.png',
        '/manifest.json'
      ]);
    })
  );
});

// 2. Intercept requests and return the cached version instead
self.addEventListener('fetch', function(e) {
  e.respondWith(
    // check if this file exists in the cache
    caches.match(e.request)
      // Return the cached file, or else try to get it from the server
      .then(response => response || fetch(e.request))
  );
});
