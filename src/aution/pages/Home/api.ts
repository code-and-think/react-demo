import { pick, pickBy } from 'lodash';
import { quest } from '../../util/quest';
import { ITableRow } from './Content';

class ListService {
  async query(params: ITableRow) {
    return quest.get('/list/query', {
      params: pickBy(params, value => value && value !== ''),
    });
  }
  async addItem(params: ITableRow) {
    return quest.post('/list/add', params);
  }
  async deleteItem(id: number) {
    return quest.post('/list/delete', { id });
  }
  async modifyItem(params: ITableRow) {
    return quest.post('/list/modify', params);
  }
}

export const listService = new ListService();
