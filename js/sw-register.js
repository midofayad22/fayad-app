/*
  Shared service-worker registration for every page.
  Dispatches a "fayad:update-ready" event on window when a new version has been
  installed and is waiting, so the UI can offer a refresh (wired up in the
  design-system milestone). It never reloads the page by itself, so learners
  never lose code they are typing.
*/
(function () {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (registration) {
        function announce(worker) {
          window.dispatchEvent(new CustomEvent("fayad:update-ready", { detail: { worker: worker } }));
        }

        if (registration.waiting && navigator.serviceWorker.controller) {
          announce(registration.waiting);
        }

        registration.addEventListener("updatefound", function () {
          var worker = registration.installing;
          if (!worker) return;
          worker.addEventListener("statechange", function () {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              announce(worker);
            }
          });
        });

        registration.update().catch(function () {});
      })
      .catch(function (error) {
        console.warn("[FAYAD] Service worker registration failed:", error);
      });
  });
})();
