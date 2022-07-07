// hooks
import { useProfile } from '../hooks/universaldot';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const { username } = useProfile();

  return (
    <Avatar
      src="@TODO"
      alt={username}
      // src={user?.photoURL}
      // color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      color="default"
      {...other}
    >
      {createAvatar(username).name}
    </Avatar>
  );
}
