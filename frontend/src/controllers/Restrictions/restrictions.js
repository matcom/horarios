const data_key_conditions = 'calendario-matcom-restrictions-conditions';

export default {
  data: {},
  saveMinData() {
    localStorage.setItem(data_key_conditions, JSON.stringify(this.data));
  },
  loadMinData() {
    let stored = localStorage.getItem(data_key_conditions);
    if (stored !== null) {
      this.data = JSON.parse(stored);
    }
  },
  removeMinData() {
    localStorage.removeItem(data_key_conditions);
  },
  updateDataValue(data, key) {
    this.data[key] = data;

    this.saveMinData();
  },
};
