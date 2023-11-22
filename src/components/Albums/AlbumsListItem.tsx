import Button from '../Button';
import ExpandablePanel from '../ExpandablePanel';
import { Album } from '../../types/media';
import { GoTrash } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../../store';
import PhotosList from '../Photos/PhotosList';

interface IAlbumsListItemProps {
    album: Album;
}

export default function AlbumsListItem({ album }: IAlbumsListItemProps) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const header = <>
        <Button
          onClick={() => removeAlbum(album)}
          loading={results.isLoading}
          className='mr-2'
        >
          <GoTrash />
        </Button>
        {album.title}
      </>;

  return (
    <ExpandablePanel key={album.id} header={header}>
        <PhotosList album={album} />
    </ExpandablePanel>
  )
}
