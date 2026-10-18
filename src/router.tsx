// Required for: Configuring TanStack Router and setting up React Query to manage navigation and caching across the app.
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
// Initializes and configures the routing system for navigating the app
export const getRouter = () => {
  // Set up a query client to handle data fetching, caching, and state management
  const queryClient = new QueryClient();
  // Build the router using our auto-generated routes and inject the query client
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
