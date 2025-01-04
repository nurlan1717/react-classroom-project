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
    return (
      JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || {
        id: "anonymous",
        name: "Anonymous User",
        role: "student",
      }
    );
  },
};
