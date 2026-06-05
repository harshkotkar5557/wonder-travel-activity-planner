import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { QueryProvider } from "./providers/QueryProvider";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "./components/ErrorFallback";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => window.location.reload()}
    >
      <QueryProvider>
        <App />
      </QueryProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
