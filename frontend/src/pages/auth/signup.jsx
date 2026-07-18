import {
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

export default function SignUpContent({
  handleSignUpSubmit,
  signUpForm,
  setSignUpForm,
  showPassword,
  setShowPassword,
}) {
  return (
    <>
      <form
        onSubmit={handleSignUpSubmit}
        className="p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-200 max-h-[60vh] overflow-y-auto"
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">
              Prénom
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                required
                value={signUpForm.f_name}
                onChange={(e) =>
                  setSignUpForm({ ...signUpForm, f_name: e.target.value })
                }
                className="w-full bg-[#EAEAEA] pl-9 pr-3 py-2 rounded-lg text-sm outline-none focus:bg-white border border-transparent focus:border-[#3B3B98]"
                placeholder="Jean"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">
              Nom
            </label>
            <input
              type="text"
              required
              value={signUpForm.l_name}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, l_name: e.target.value })
              }
              className="w-full bg-[#EAEAEA] px-3 py-2 rounded-lg text-sm outline-none focus:bg-white border border-transparent focus:border-[#3B3B98]"
              placeholder="Rakoto"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
            Numéro de téléphone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="tel"
              required
              value={signUpForm.phone_number}
              onChange={(e) =>
                setSignUpForm({
                  ...signUpForm,
                  phone_number: e.target.value,
                })
              }
              className="w-full bg-[#EAEAEA] pl-10 pr-4 py-2 rounded-lg text-sm outline-none focus:bg-white border border-transparent focus:border-[#3B3B98]"
              placeholder="034 11 222 33"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
            Adresse Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="email"
              required
              value={signUpForm.email}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, email: e.target.value })
              }
              className="w-full bg-[#EAEAEA] pl-10 pr-4 py-2 rounded-lg text-sm outline-none focus:bg-white border border-transparent focus:border-[#3B3B98]"
              placeholder="nom@exemple.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
            Mot de passe
          </label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="password"
              required
              value={signUpForm.password}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, password: e.target.value })
              }
              className="w-full bg-[#EAEAEA] pl-10 pr-4 py-2 rounded-lg text-sm outline-none focus:bg-white border border-transparent focus:border-[#3B3B98] font-mono"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="password"
              required
              value={signUpForm.confirmPassword}
              onChange={(e) =>
                setSignUpForm({
                  ...signUpForm,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full bg-[#EAEAEA] pl-10 pr-4 py-2 rounded-lg text-sm outline-none focus:bg-white border border-transparent focus:border-[#3B3B98] font-mono"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full hover:bg-[#31694E] bg-[#4d7c65] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md transition-all mt-2"
        >
          Créer mon compte
        </button>
      </form>
    </>
  );
}
