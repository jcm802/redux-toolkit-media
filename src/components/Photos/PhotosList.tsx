import { Album, Photo } from "../../types/media";
import { useFetchPhotosQuery, useAddPhotoMutation } from "../../store";
import Button from "../Button";
import Skeleton from "../Skeleton";
import PhotosListItem from "./PhotosListItem";

interface IPhotosListProps {
    album: Album;
}

export default function PhotosList({ album }: IPhotosListProps) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [ addPhoto, results ] = useAddPhotoMutation();

  let content;
  if (isFetching) {
    content = <Skeleton className='h-8 w-8' times={4} />;
  } else if (error) {
    content = <div>Error fetching photos...</div>;
  } else {
    content = data.map((photo: Photo) => {
        return <PhotosListItem key={photo.id} photo={photo} />
    })
  }

  return (
    <div>
        <div className='m-2 flex flex-row items-center justify-between'>
            <h3 className='text-lg font-bold'>Photos in {album.title}</h3>
            <Button
                onClick={() => addPhoto(album)}
                loading={results.isLoading}
            >
                <>+ Add Photo</>
            </Button>
        </div>
        <div className='mx-8 flex flex-row flex-wrap justify-center'>
            {content}
        </div>
    </div>
  )
}
