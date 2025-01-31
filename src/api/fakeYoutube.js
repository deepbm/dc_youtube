import axios from 'axios';

export default class FakeYoutube {
  constructor() {}

  async search(keyword) {
    return keyword ? this.#searchByKeyword() : this.#mostPopular();
  }

  async #searchByKeyword() {
    const response = await axios.get('/videos/search.json');
    const items = response.data.items;
    return items.map(item => ({ ...item, id: item.id.channelId }));
  }

  async #mostPopular() {
    const response = await axios.get('/videos/popular.json');
    return response.data.items;
  }
}
