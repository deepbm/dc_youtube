import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import VideoCard from '../components/VideoCard';
import FakeYoutube from '../api/fakeYoutube';
// import Youtube from '../api/youtube';

export default function Videos() {
  const { keyword } = useParams();
  const {
    isPending,
    error,
    data: videos,
  } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: () => {
      const youtube = new FakeYoutube();
      // const youtube = new Youtube();
      return youtube.search(keyword);
    },
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
