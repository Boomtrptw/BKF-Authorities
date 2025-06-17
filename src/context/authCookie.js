import Cookies from "js-cookie";

const COOKIE_KEY = "auth_user";

export const apiAdUrl = `https://api.bkf.co.th/API_GatewayUMS_Global/ADAuthentication`;

export const setAuthUser = (user) => {
  Cookies.set(COOKIE_KEY, JSON.stringify(user), { expires: 7 }); // 7 วัน
};

export const getAuthUser = () => {
  const user = Cookies.get(COOKIE_KEY);
  return user ? JSON.parse(user) : null;
};

export const removeAuthUser = () => {
  Cookies.remove(COOKIE_KEY);
};
