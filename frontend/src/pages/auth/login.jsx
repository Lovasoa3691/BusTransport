import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginContent({
  handleLoginSubmit,
  loginForm,
  setLoginForm,
  showPassword,
  setShowPassword,
}) {
  return (
    <>
      <form
        onSubmit={handleLoginSubmit}
        className="p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-200"
      >
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
            Adresse Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="email"
              required
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              className="w-full bg-[#EAEAEA] border border-transparent pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none focus:bg-white focus:border-[#3B3B98] transition-all font-medium"
              placeholder="nom@exemple.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
            Mot de passe
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              className="w-full bg-[#EAEAEA] border border-transparent pl-10 pr-10 py-2.5 rounded-lg text-sm outline-none focus:bg-white focus:border-[#3B3B98] transition-all font-mono"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="text-right">
          <a
            href="#forgot"
            onClick={(e) => e.preventDefault()}
            className="text-xs font-bold text-gray-500 hover:underline"
          >
            Mot de passe oublié ?
          </a>
        </div>

        <button
          type="submit"
          className="w-full hover:bg-[#31694E] bg-[#4d7c65] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md transition-all mt-2"
        >
          Accéder au Dashboard
        </button>
      </form>
    </>
  );
}
