import Petitions from '../petitions';
import Endpoints from '../../endpoints/endpoints';

const data_key_conditions = 'calendario-matcom-distribute-restrictions';

export default {
  data: {} | [],
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
  create(token, body) {
    Petitions.clearHeaders();
    Petitions.set_JSONHeaders(null, null, token);

    return Petitions.post(`${Endpoints.distribute_restrictions}/create`, body)
      .then(response => response.json(), response => console.log('Error getting the response.'))
      .then(json => {
        if (json !== null && !json.hasOwnProperty('error')) {
          this.data = json;
          this.saveMinData();
          return true;
        }
        return false;
      });

  },
  getAll(token, filter = {}) {

    Petitions.clearHeaders();
    Petitions.set_JSONHeaders(null, null, token);

    return Petitions.post(`${Endpoints.distribute_restrictions}/all`, {
      'filter': filter,
    })
      .then(response => response.json())
      .then(json => {
        json = json.items;
        this.data = json;
        this.saveMinData();

        return json !== null && !json.hasOwnProperty('error');

      });

  },
  delete(token, id) {
    Petitions.clearHeaders();
    Petitions.set_JSONHeaders(null, null, token);

    return Petitions.delete(`${Endpoints.distribute_restrictions}`, { id: id })
      .then(response => response.json(), response => console.log('Error getting the response.'))
      .then(json => {
        this.data = json;
        this.saveMinData();

        return json !== null && !json.hasOwnProperty('error');

      })
      .catch(err => console.log(err));
  },

};