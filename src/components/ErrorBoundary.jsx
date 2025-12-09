import React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
          <div className="bg-red-100 p-6 rounded-full mb-6">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Qualcosa è andato storto
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Si è verificato un errore imprevisto. Ricarica la pagina per
            riprovare.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-black transition-colors"
          >
            <RefreshCcw size={18} /> Ricarica
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
