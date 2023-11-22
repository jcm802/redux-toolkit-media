import React from 'react';
import { User } from '../types/media';
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import { Album } from '../types/media';

interface IAlbumsListProps {
    user: User;
}

export default function AlbumsList({ user }: IAlbumsListProps) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [ addAlbum, results ] = useAddAlbumMutation();

  let content;
  if (isLoading) {
    content = <Skeleton times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data.map((album: Album) => {
      const header = <div>{album.title}</div>;
      return <ExpandablePanel key={album.id} header={header}>
        <>List of photos in the album</>
      </ExpandablePanel>
    })
  }

  return (
    <div>
      <div>
        Albums for {user.name}
        <Button
          onClick={() => addAlbum(user)}
          loading={isLoading}
          primary={undefined} 
          secondary={undefined}
          success={undefined}
          warning={undefined}
          danger={undefined}
          outline={undefined}
          rounded={undefined}
          className='mr-3'
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
