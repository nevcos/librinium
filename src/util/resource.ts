import Cookies from "js-cookie";

export const localStorageResource = (key: string) => () => {
  return localStorage.getItem(key);
};

export const cookieResource = (key: string) => () => {
  return Cookies.get(key);
};
