import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Simple Error Boundary to catch startup errors
const ErrorFallback = ({ error }: { error: Error }) => (
    <div style={{ padding: '20px', color: 'red' }}>
        <h1>Something went wrong</h1>
        <pre>{error.message}</pre>
    </div>
);

import { Component, ReactNode } from "react";
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return <ErrorFallback error={this.state.error!} />;
        }
        return this.props.children;
    }
}

createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);
