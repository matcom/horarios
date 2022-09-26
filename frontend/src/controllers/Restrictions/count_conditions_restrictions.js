import Petitions from '../petitions';
import Endpoints from '../../endpoints/endpoints';

const data_key_conditions = 'calendario-matcom-count-conditions-restrictions';

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
  create(token, body) {
    Petitions.clearHeaders();
    Petitions.set_JSONHeaders(null, null, token);
    
    return Petitions.post(`${Endpoints.restrictions}/create/count_conditions_restriction`, body)
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
};
