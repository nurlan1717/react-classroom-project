export const STORAGE_KEYS = {
  USER_ID: "userId",
  USER_ROLE: "userRole",
};

export const storage = {
  setUserAuth: (userId, role) => {
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  },

  clearUserAuth: () => {
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
  },

  getUserId: () => localStorage.getItem(STORAGE_KEYS.USER_ID),

  getUserRole: () => localStorage.getItem(STORAGE_KEYS.USER_ROLE),

  isAuthenticated: () => !!localStorage.getItem(STORAGE_KEYS.USER_ID),

  getUserData: () => {
    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
    const role = localStorage.getItem(STORAGE_KEYS.USER_ROLE);

    return {
      id: userId || "anonymous",
      name: "Anonymous User",
      role: role || "student",
    };
  },
};
