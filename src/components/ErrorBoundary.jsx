import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#fffbf0] text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-red-100/50 animate-pulse">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-gray-900 mb-4">
            Qualcosa è andato storto in cucina
          </h1>

          <p className="text-lg text-gray-500 max-w-md mb-10 leading-relaxed">
            Ci scusiamo, sembra che ci sia stato un piccolo incidente ai
            fornelli. Nessun problema, possiamo riprovare!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.reload()}
              className="btn-primary px-8 shadow-orange-500/20"
            >
              <RefreshCw className="w-5 h-5 mr-2" /> Ricarica Pagina
            </button>

            <a
              href="/"
              className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-orange-200 hover:text-orange-600 transition-all flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" /> Torna alla Home
            </a>
          </div>

          {/* Dettagli tecnici (opzionale, nascosto o piccolo) */}
          <div className="mt-12 p-4 bg-gray-100 rounded-xl max-w-2xl w-full text-left overflow-hidden">
            <p className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-widest">
              Dettaglio Errore:
            </p>
            <code className="text-xs text-red-400 font-mono break-all">
              {this.state.error && this.state.error.toString()}
            </code>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
