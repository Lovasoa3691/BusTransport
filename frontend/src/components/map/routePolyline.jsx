// import { Polyline } from "react-leaflet";
// import { useEffect, useState } from "react";

// async function fetchOSRM(points) {
//   if (points.length < 2) return [];

//   const coords = points.map((p) => `${p.longitude},${p.latitude}`).join(";");

//   const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;

//   const res = await fetch(url);
//   const data = await res.json();

//   return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
// }

// export default function RoutePolyline({ routePoints }) {
//   const [route, setRoute] = useState([]);

//   useEffect(() => {
//     const load = async () => {
//       const result = await fetchOSRM(routePoints);
//       setRoute(result);
//     };

//     load();
//   }, [routePoints]);

//   if (!route.length) return null;

//   return (
//     <Polyline
//       positions={route}
//       pathOptions={{
//         color: "#3B3B98",
//         weight: 5,
//       }}
//     />
//   );
// }

import { Polyline } from "react-leaflet";
import { useEffect, useState } from "react";

export default function RoutePolyline({ viaPoints }) {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const loadRoute = async () => {
      if (viaPoints.length < 2) {
        setRoute([]);
        return;
      }

      try {
        const coordinates = viaPoints
          .map((p) => `${p.longitude},${p.latitude}`)
          .join(";");

        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`,
        );

        const data = await response.json();

        if (!data.routes?.length) {
          setRoute([]);
          return;
        }

        const positions = data.routes[0].geometry.coordinates.map(
          ([lng, lat]) => [lat, lng],
        );

        setRoute(positions);
      } catch (error) {
        console.error("Erreur OSRM :", error);
      }
    };

    loadRoute();
  }, [viaPoints]);

  if (!route.length) return null;

  return (
    <Polyline
      positions={route}
      pathOptions={{
        color: "#19193E",
        weight: 5,
      }}
    />
  );
}
