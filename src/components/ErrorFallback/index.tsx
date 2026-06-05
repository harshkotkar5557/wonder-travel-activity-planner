import type { FallbackProps } from "react-error-boundary";

export function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div
      style={{
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h2>Something went wrong</h2>

      <p>{(error as Error).message}</p>

      <button type="button" onClick={resetErrorBoundary}>
        Try Again
      </button>
    </div>
  );
}
