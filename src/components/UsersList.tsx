import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from './Button';
import { UserState } from "../types/media";
import Skeleton from "./Skeleton";
import useThunk from "../hooks/useThunk";

export default function UsersList() {
  const [ doFetchUsers, isLoadingUsers, loadingUsersError ] = useThunk(fetchUsers);
  const [ doCreateUser, isCreatingUser, creatingUserError ] = useThunk(addUser)
  // Using option 1 to handle fine grained loading

  const { list } = useSelector((state: { users: UserState }) => {
    return state.users;
  })

  useEffect(() => {
    if (typeof doFetchUsers === 'function') doFetchUsers('arg');
    // *** Before extraction to hook *** //
    // setIsLoadingUsers(true);
    // dispatch(fetchUsers())
// Unwrap ensures this promise ^^ follows the conventional rules
      // .unwrap()
      // .catch((err) => setLoadingUsersError(err))
      // Finally will do the above loading state to false, so we dont have to twice (called whether success or failure)
      // .finally(() => setIsLoadingUsers(false));
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    if (typeof doCreateUser === 'function') doCreateUser('arg');
  }

  if (isLoadingUsers) {
    return <Skeleton times={6} className="h-10 w-full" />;
  }

  if (Object.keys(loadingUsersError).length) {
    return <div>Error fetching data</div>
  }

  const renderedUsers = list.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
      );
  })

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        { 
          isCreatingUser
            ? 'Creating User...' : (
              <Button
                onClick={handleUserAdd}
                primary={undefined} 
                secondary={undefined}
                success={undefined}
                warning={undefined}
                danger={undefined}
                outline={undefined}
                rounded={undefined}
              >
                + Add User
              </Button>
          )
        }
        {Object.keys(creatingUserError).length ? 'Error creating user...' : null}
      </div>
      {renderedUsers}
      </div>
  );
};
