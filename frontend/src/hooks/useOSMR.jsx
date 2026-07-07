import { useEffect, useState } from "react";
import { getRoute } from "../services/osrmService";

export default function useOSRM(routePoints) {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    async function loadRoute() {
      if (routePoints.length < 2) {
        setRoute([]);
        return;
      }

      try {
        const result = await getRoute(routePoints);
        setRoute(result);
      } catch (error) {
        console.error(error);
      }
    }

    loadRoute();
  }, [routePoints]);

  return route;
}
