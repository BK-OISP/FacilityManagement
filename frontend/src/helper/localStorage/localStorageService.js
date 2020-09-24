const localStorageService = {
  setUserData(tokenObj) {
    localStorage.setItem("acToken", tokenObj.acToken);
    localStorage.setItem("rfToken", tokenObj.rfToken);
    localStorage.setItem("username", tokenObj.username);
    localStorage.setItem("role", tokenObj.role);
    localStorage.setItem("userId", tokenObj.userId);
  },

  getUserData() {
    return {
      acToken: this.getAccessToken(),
      rfToken: this.getRefreshToken(),
      username: this.getUserName(),
      role: this.getRole(),
      userId: this.getUserId(),
    };
  },

  getAccessToken() {
    return localStorage.getItem("acToken");
  },

  setAccessToken(acToken) {
    return localStorage.setItem("acToken", acToken);
  },

  getRefreshToken() {
    return localStorage.getItem("rfToken");
  },

  getUserName() {
    return localStorage.getItem("username");
  },

  getRole() {
    return localStorage.getItem("role");
  },

  getUserId() {
    return localStorage.getItem("userId");
  },

  clearAll() {
    return localStorage.clear();
  },
};

export default localStorageService;
