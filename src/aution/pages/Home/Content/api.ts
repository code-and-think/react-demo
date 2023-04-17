import { quest } from '../../../util/quest';
import { BetRecord } from './Detail';

class BetService {
  async query(id: number) {
    return quest.get('/bet/query', {
      params: { id },
    });
  }
  async addBet(params: any) {
    return quest.post('/bet/add', params);
  }
  async result() {
    return quest.post('/bet/result');
  }
}

export const betService = new BetService();
