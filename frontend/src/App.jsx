import { useEffect, useState } from "react";
import api from "./hooks/api";

import AppRoutes from "./components/routes/appRoutes";

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          setAuth(true);
        }
      })
      .catch(() => {
        setAuth(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return <AppRoutes user={user} setUser={setUser} setAuth={setAuth} />;
}
