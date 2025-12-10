const storage = {
  getToken: () => localStorage.getItem("auth_token"),
  setToken: (token) => localStorage.setItem("auth_token", token),
  removeToken: () => localStorage.removeItem("auth_token"),

  getUser: () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
  setUser: (user) => localStorage.setItem("user", JSON.stringify(user)),
  removeUser: () => localStorage.removeItem("user"),

  get: (key, fallback = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => localStorage.removeItem(key),
};

export default storage;
