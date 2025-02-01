import React from 'react';
import { useYoutubeApi } from '../contexts/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';

export default function ChannelVideos({ id }) {
  const { youtube } = useYoutubeApi();
  const {
    isPending,
    error,
    data: videos,
  } = useQuery({
    queryKey: ['searchChannel', id],
    queryFn: () => {
      return youtube.searchChannel(id);
    },
  });

  if (isPending) return 'Loading...';

  return (
    <>
      <ul className=''>
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </ul>
    </>
  );
}
