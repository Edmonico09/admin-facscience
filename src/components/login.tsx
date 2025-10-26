import { useAuth } from "../context/auth-context";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginForm() {
  const { login, loading } = useAuth();
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer l'URL de redirection après login
  const from = location.state?.from?.pathname || "/";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ identifiant: identifiant.trim(), password });
      // Redirection vers la page demandée ou le dashboard
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
    }
  };  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-2 text-center text-university-primary">
          Connexion
        </h1>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          Entrez vos identifiants pour continuer
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ... le reste du formulaire reste identique ... */}
          <div>
            <label className="text-sm block mb-1">Identifiant</label>
            <input
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-university-primary transition"
              placeholder="votre identifiant"
              required
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Mot de passe</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-4 py-3 rounded-lg border dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-university-primary transition"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="text-sm text-red-500 text-center">{error}</div>}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto text-white px-5 py-3 rounded-lg font-medium shadow-sm disabled:opacity-60 bg-university-primary hover:brightness-110 transition"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            
          </div>
        </form>
      </div>
    </div>
  );
}