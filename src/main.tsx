import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Handle GitHub Pages 404 redirect
// The 404.html redirects to /radiant-play-room/?/route-path
// We need to convert this back to /radiant-play-room/route-path
(function() {
  const { pathname, search } = window.location;
  // Check if we have the query string format from 404.html redirect
  if (search.startsWith("?/")) {
    // Extract the route path from the query string
    const routePath = search.slice(2).split("&")[0].replace(/~and~/g, "&");
    // Reconstruct the proper path with base
    const newPath = "/radiant-play-room" + (routePath ? "/" + routePath : "/");
    // Get remaining query params and hash
    const remainingSearch = search.includes("&") ? "&" + search.split("&").slice(1).join("&").replace(/~and~/g, "&") : "";
    const newUrl = newPath + remainingSearch + window.location.hash;
    window.history.replaceState(null, "", newUrl);
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
