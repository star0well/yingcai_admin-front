class localCache {
  setCache(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  getCathe(key) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  deleteCatche(key) {
    window.localStorage.removeItem(key);
  }
  clearCathe() {
    window.localStorage.clear();
  }
}
export default new localCache();
