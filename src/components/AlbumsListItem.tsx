import React from 'react';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { Album } from '../types/media';
import { GoTrash } from 'react-icons/go';

interface IAlbumsListItemProps {
    album: Album;
}

export default function AlbumsListItem({ album }: IAlbumsListItemProps) {
    const header = <div>
        <Button
          onClick={() => null}
          loading={false}
        ><GoTrash /></Button>
        {album.title}
        </div>;
  return (
    <ExpandablePanel key={album.id} header={header}>
        <>List of photos in the album</>
    </ExpandablePanel>
  )
}
