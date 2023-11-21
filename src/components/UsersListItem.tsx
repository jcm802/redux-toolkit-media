import React from 'react';
import { User } from '../types/media';
import { GoTrash } from 'react-icons/go';
import { removeUser } from '../store';
import useThunk from '../hooks/useThunk';
import Button from './Button';

interface IUsersListItemProps {
    user: User;
}

export default function UsersListItem({ user }: IUsersListItemProps ) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    if (typeof doRemoveUser === 'function') doRemoveUser(user.id);
  }

  return (
        <div className='mb-2 border rounded'>
          <div className='flex p-2 justify-between items-center cursor-pointer'>
            <div className='flex flex-row items-center justify-between'>
                <Button
                    onClick={handleClick}
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
                    <GoTrash />
                </Button>
                {Object.keys(error).length ? <div>Error deleting user.</div> : null}
                {user.name}
            </div>
          </div>
        </div>
  )
}
