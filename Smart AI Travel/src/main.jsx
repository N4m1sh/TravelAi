import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { LogInContextProvider } from "./Context/LogInContext/Login.jsx";
import ErrorBoundary from "./components/constants/Error.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Context/DarkMode/ThemeProvider.jsx";
import { RefProvider } from "./Context/RefContext/RefContext.jsx";

// Use environment variables for sensitive credentials
const domain = import.meta.env.VITE_DOMAIN_NAME;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
console.log(domain)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RefProvider>
          <LogInContextProvider>
            <ErrorBoundary>
              <Toaster />
              <App />
            </ErrorBoundary>
          </LogInContextProvider>
        </RefProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Auth0Provider>
);
