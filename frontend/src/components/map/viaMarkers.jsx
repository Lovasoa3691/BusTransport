// import { Marker } from "react-leaflet";
// import L from "leaflet";

// const icon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
//   iconSize: [20, 20],
// });

// export default function ViaMarkers({ viaPoints, setLineForm }) {
//   const update = (index, latlng) => {
//     setLineForm((prev) => ({
//       ...prev,
//       viaPoints: prev.viaPoints.map((p, i) =>
//         i === index ? { latitude: latlng.lat, longitude: latlng.lng } : p,
//       ),
//     }));
//   };

//   const remove = (index) => {
//     setLineForm((prev) => ({
//       ...prev,
//       viaPoints: prev.viaPoints.filter((_, i) => i !== index),
//     }));
//   };

//   return (
//     <>
//       {viaPoints.map((p, i) => (
//         <Marker
//           key={i}
//           position={[p.latitude, p.longitude]}
//           icon={icon}
//           draggable
//           eventHandlers={{
//             dragend: (e) => {
//               const pos = e.target.getLatLng();
//               update(i, pos);
//             },
//             contextmenu: () => remove(i),
//           }}
//         />
//       ))}
//     </>
//   );
// }

import { Marker, Popup } from "react-leaflet";

export default function ViaMarkers({ viaPoints, setLineForm }) {
  const updatePoint = (index, latlng) => {
    setLineForm((prev) => ({
      ...prev,
      viaPoints: prev.viaPoints.map((point, i) =>
        i === index
          ? {
              latitude: latlng.lat,
              longitude: latlng.lng,
            }
          : point,
      ),
    }));
  };

  const removePoint = (index) => {
    setLineForm((prev) => ({
      ...prev,
      viaPoints: prev.viaPoints.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      {viaPoints.map((point, index) => (
        <Marker
          key={index}
          draggable
          position={[point.latitude, point.longitude]}
          eventHandlers={{
            dragend: (e) => {
              updatePoint(index, e.target.getLatLng());
            },
            contextmenu: () => {
              removePoint(index);
            },
          }}
        >
          <Popup>
            <div className="text-xs">
              <p className="font-bold">Point de passage #{index + 1}</p>

              <button
                className="mt-2 text-red-600"
                onClick={() => removePoint(index)}
              >
                Supprimer
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
