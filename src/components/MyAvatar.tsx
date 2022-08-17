// hooks
import { useProfile } from '../hooks/universaldot';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const { profileData } = useProfile();

  return (
    <Avatar
      src="@TODO"
      alt={profileData?.name || 'N/A'}
      // src={user?.photoURL}
      // color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      color="default"
      {...other}
    >
      {createAvatar(profileData?.name || 'N/A').name}
    </Avatar>
  );
}
