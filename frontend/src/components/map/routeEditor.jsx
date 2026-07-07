// import { useMapEvents } from "react-leaflet";

// export default function RouteEditor({ onAddPoint }) {
//   useMapEvents({
//     click(e) {
//       onAddPoint({
//         latitude: e.latlng.lat,
//         longitude: e.latlng.lng,
//       });
//     },
//   });

//   return null;
// }

import { useMapEvents } from "react-leaflet";

export default function RouteEditor({ onAddPoint }) {
  useMapEvents({
    click(e) {
      onAddPoint({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
    },
  });

  return null;
}
