import axios from "axios";

export const endpointResource = (endpoint: string) => async () => {
  console.log("endpointResource()", endpoint);

  const response = await axios
    .get(endpoint)
    .then((response: any) => {
      console.log("endpointResource() success", endpoint, response);
      return response.data.error ? false : response.data;
    })
    .catch((err) => {
      console.error("endpointResource() failed", endpoint, err);
      return false;
    });

  return response;
};

export const localStorageResource = (key: string) => () => {
  return localStorage.getItem(key);
};
