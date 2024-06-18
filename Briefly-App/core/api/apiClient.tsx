import axios from "axios";

const apiClient = axios.create({
  // baseURL: "https://brieflyserver.victoriousflower-f4e0ee8c.westeurope.azurecontainerapps.io",
  // baseURL: "http://ec2-51-17-92-83.il-central-1.compute.amazonaws.com:8080",
  baseURL: "https://briefly-app.com/",
});

// // set delay for each request
// apiClient.interceptors.request.use((config) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(config);
//     }, 3000); // set the desired delay in milliseconds
//   });
// });
export default apiClient;
