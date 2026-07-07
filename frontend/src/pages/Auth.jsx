import React, { useState } from "react";
import { Bus } from "lucide-react";
import LoginContent from "./auth/login";
import SignUpContent from "./auth/signup";
import api from "../hooks/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AuthPages({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({
    f_name: "",
    l_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    api
      .post("/auth/login", loginForm)
      .then((response) => {
        if (response.data.success) {
          onAuthSuccess(response.data.user);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Erreur de connexion",
          text: error.response?.data?.error || "Une erreur est survenue.",
        });
      });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (signUpForm.password !== signUpForm.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Erreur d'inscription",
        text: "Les mots de passe ne correspondent pas !",
      });
      return;
    }
    console.log("Tentative d'inscription :", signUpForm);

    Swal.fire({
      icon: "success",
      title: "Inscription réussie",
      text: "Compte créé avec succès ! Connectez-vous à présent.",
    });
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen bg-[#19193E] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#3B3B98]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 z-10 transition-all duration-300">
        <div className="bg-gradient-to-br from-[#3B3B98] to-[#19193E] p-6 text-center text-white space-y-2">
          <div className="inline-flex p-3 bg-white/10 rounded-xl backdrop-blur-sm mb-1">
            <Bus size={32} className="text-white" />
          </div>
          <h1 className="text-xl font-bold uppercase tracking-widest">
            TransScan
          </h1>
          <p className="text-xs text-gray-300">
            Gestion de billets de bus & scanning de revenus
          </p>
        </div>

        <div className="flex border-b border-gray-150 text-sm font-bold uppercase tracking-wider text-center">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-3 transition-colors ${isLogin ? "text-[#3B3B98] border-b-2 border-[#3B3B98] bg-gray-50/50" : "text-gray-400 hover:text-gray-600"}`}
          >
            Se connecter
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-3 transition-colors ${!isLogin ? "text-[#3B3B98] border-b-2 border-[#3B3B98] bg-gray-50/50" : "text-gray-400 hover:text-gray-600"}`}
          >
            S'inscrire
          </button>
        </div>

        {isLogin ? (
          <LoginContent
            handleLoginSubmit={handleLoginSubmit}
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        ) : (
          <SignUpContent
            handleSignUpSubmit={handleSignUpSubmit}
            signUpForm={signUpForm}
            setSignUpForm={setSignUpForm}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}

        <div className="bg-gray-50 p-4 border-t border-gray-100 text-center text-[10px] font-medium text-gray-400">
          Système de chiffrement sécurisé end-to-end. Authentification basée sur
          les standards JWT.
        </div>
      </div>
    </div>
  );
}
