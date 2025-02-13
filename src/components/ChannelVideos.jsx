import React from 'react';
import { useYoutubeApi } from '../contexts/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';

export default function ChannelVideos({ id }) {
  const { youtube } = useYoutubeApi();
  const { isPending, data: videos } = useQuery({
    queryKey: ['searchChannel', id],
    queryFn: () => {
      return youtube.searchChannel(id);
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) return 'Loading...';

  return (
    <>
      <ul className=''>
        {videos.map(video => (
          <VideoCard key={video.id} video={video} type='list' />
        ))}
      </ul>
    </>
  );
}
