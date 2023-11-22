import React from 'react';
import { User } from '../types/media';
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import { Album } from '../types/media';
import AlbumsListItem from './AlbumsListItem';

interface IAlbumsListProps {
    user: User;
}

export default function AlbumsList({ user }: IAlbumsListProps) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [ addAlbum, results ] = useAddAlbumMutation();

  let content;
  if (isLoading) {
    content = <Skeleton times={3} className='h-10 w-full' />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data.map((album: Album) => {
      return <AlbumsListItem key={album.id} album={album} />
    })
  }

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Albums for {user.name}</h3>
        <Button
          onClick={() => addAlbum(user)}
          loading={results.isLoading}
        >
          + Add Album
        </Button>
      </div>
      <div>
        {content}
      </div>
    </div>
  )
}
