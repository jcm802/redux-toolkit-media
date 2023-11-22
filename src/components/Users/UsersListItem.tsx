import { User } from '../../types/media';
import { GoTrash } from 'react-icons/go';
import { removeUser } from '../../store';
import useThunk from '../../hooks/useThunk';
import Button from '../Button';
import ExpandablePanel from '../ExpandablePanel';
import AlbumsList from '../Albums/AlbumsList';

interface IUsersListItemProps {
    user: User;
}

export default function UsersListItem({ user }: IUsersListItemProps ) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    if (typeof doRemoveUser === 'function') doRemoveUser(user.id);
  }

  const header = <>
    <Button
      onClick={handleClick}
      loading={isLoading}
      className='mr-3'
    >
      <GoTrash />
    </Button>
    {Object.keys(error).length ? <div>Error deleting user.</div> : null}
    {user.name}
    </>;

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  )
}
