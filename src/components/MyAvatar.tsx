// hooks
import { useProfile } from '../hooks/universaldot';
// utils
import createAvatar from '../utils/createAvatar';
// components
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ imageURL, ...other }: AvatarProps) {
  const { profileData } = useProfile();

  // const srcMock =
  //   'https://minimal-assets-api-dev.vercel.app/assets/icons/ic_notification_package.svg';

  return (
    <Avatar
      src={imageURL || undefined}
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
