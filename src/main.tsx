// Required for: Bootstrapping the React application and injecting our router into the HTML DOM.
import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
// Grab the main HTML div where the application will be rendered. This is the entry point for the React application.
import { getRouter } from "./router";
import "./styles.css";

//Initialize React and inject our application router into the DOM
const root = document.getElementById("root");
if (!root) throw new Error("Missing application root element");

createRoot(root).render(<RouterProvider router={getRouter()} />);
