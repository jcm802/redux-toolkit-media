import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from './Button';
import { UserState } from "../types/media";
import Skeleton from "./Skeleton";
import useThunk from "../hooks/useThunk";
import UsersListItem from "./UsersListItem";

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

  let content: JSX.Element | Array<JSX.Element>;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (Object.keys(loadingUsersError).length) {
    content = <div>Error fetching data</div>
  } else {
    content = list.map((user) => {
      return <UsersListItem key={user.id} user={user} />
    })
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3 items-center">
        <h1 className="m-2 text-xl">Users</h1>
              <Button
                onClick={handleUserAdd}
                loading={isCreatingUser}
              >
                + Add User
              </Button>
              {Object.keys(creatingUserError).length ? 'Error creating user...' : null}
      </div>
      {content}
      </div>
  );
};
