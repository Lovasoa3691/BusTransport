export async function getRoute(points) {
  if (points.length < 2) return [];

  const coordinates = points
    .map((p) => `${p.longitude},${p.latitude}`)
    .join(";");

  const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Impossible de récupérer l'itinéraire.");
  }

  const data = await response.json();

  return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
}
