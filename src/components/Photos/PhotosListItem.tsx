import { GoTrash } from "react-icons/go";
import { Photo } from "../../types/media";
import { useRemovePhotoMutation } from "../../store";

interface IPhotosListItemProps {
    photo: Photo;
}

export default function PhotosListItem({ photo }: IPhotosListItemProps) {
  const [ removePhoto ] = useRemovePhotoMutation();
  return (
    <div className='relative cursor-pointer m-2' onClick={() => removePhoto(photo)}>
        <img className='h-40 w-40' src={photo.url} alt='random' />
        <div className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80'>
            <GoTrash className='text-3xl' />
        </div>
    </div>
  )
}
