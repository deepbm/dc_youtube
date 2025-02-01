export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async channelImageURL(id) {
    const response = await this.apiClient.channels({
      params: {
        part: 'snippet',
        id,
      },
    });
    return response.data.items[0].snippet.thumbnails.default.url;
  }

  async searchChannel(id) {
    const response = await this.apiClient.search({
      params: {
        part: 'snippet',
        channelId: id,
        maxResults: 25,
        type: 'video',
      },
    });
    const items = response.data.items;
    return items.map(item => ({ ...item, id: item.id.videoId }));
  }

  async #searchByKeyword(keyword) {
    const response = await this.apiClient.search({
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
    const response = await this.apiClient.videos({
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
