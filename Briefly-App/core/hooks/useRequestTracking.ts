// import { useEffect } from "react";
// import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

// export function useRequestTracking() {
//     useEffect(() => {
//       const requestTracking = async () => {
//         const { status } = await requestTrackingPermissionsAsync();
//         if (status === "granted") {
//           await Settings.setAdvertiserTrackingEnabled(true);
//         }
//       };
//       requestTracking();
//     }, []);
// }
