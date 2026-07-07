// import { Marker, Tooltip } from "react-leaflet";

// export default function StopMarkers({ lineStops }) {
//   return (
//     <>
//       {lineStops.map((ls) => (
//         <Marker
//           key={ls.stop.id_stop}
//           position={[
//             parseFloat(ls.stop.latitude),
//             parseFloat(ls.stop.longitude),
//           ]}
//         >
//           <Tooltip>{ls.stop.name_stop}</Tooltip>
//         </Marker>
//       ))}
//     </>
//   );
// }

import { Marker, Tooltip } from "react-leaflet";

export default function StopMarkers({ lineStops }) {
  return (
    <>
      {lineStops.map((ls) => (
        <Marker
          key={ls.stop.id_stop}
          position={[
            parseFloat(ls.stop.latitude),
            parseFloat(ls.stop.longitude),
          ]}
        >
          <Tooltip direction="top" permanent={false}>
            {ls.stop.name_stop}
          </Tooltip>
        </Marker>
      ))}
    </>
  );
}
