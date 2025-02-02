# mock data와 real api 스위칭

클래스별로 만들어서 스위칭

```js
// src/api/fakeYoutube.js
import axios from axios;

export default class FakeYoutube {
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword() {
    const response = await axios.get('/videos/search.json');
    const items = response.data.items;
    return items.map(item => ({...item, id: item.id.channelId}))
  }

  async #mostPopular() {
    const response = await axios.get('/videos/popular.json');
    return items.response.data.items;
  }
}
```

```js
// src/api/youtube.js
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
    const response = await axios.get('search', {
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
    const response = await axios.get('videos', {
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
```

```jsx
// src/pages/Videos.jsx
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import Youtube from '../api/youtube';
import VideoCard from '../components/VideoCard';

export default function Videos() {
  const { keyword } = useParams();
  const {
    isPending,
    error,
    data: videos,
  } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: () => {
      const youtube = new Youtube(); // 매번 인스턴스를 생성하는 문제가 있어서 context로 만들어줘야 한다.
      return youtube.search(keyword);
    },
    staleTime: 1000 * 60 * 1,
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <ul>
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </ul>
    </div>
  );
}
```
