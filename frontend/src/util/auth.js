export const saveToken = (token) => {
  window.localStorage.setItem("token", token);
};

export const getToken = () => {
  const token = window.localStorage.getItem("token");
  return token;
};

export const deleteToken = () => {
  window.localStorage.removeItem("token");
};

export const tokenLoader = () => {
  const token = getToken();
  return token;
};
