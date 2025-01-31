import axios from 'axios';

export default class Youtube {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3/',
      params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    });
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    const response = await this.httpClient.get('search', {
      params: {
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: keyword,
      },
    });
    const items = response.data.items;
    return items.map(item => ({ ...item, id: item.id.channelId }));
  }

  async #mostPopular() {
    const response = await this.httpClient.get('videos', {
      params: {
        part: 'snippet',
        maxResults: 25,
        chart: 'mostPopular',
        regionCode: 'KR',
      },
    });
    return response.data.items;
  }
}
