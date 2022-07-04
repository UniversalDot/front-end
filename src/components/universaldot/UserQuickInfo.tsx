import { useUser } from '../../hooks/universaldot';

const UserQuickInfo = () => {
  const { selectedKeyring } = useUser();

  return (
    <div>
      <div>selected keyring: {selectedKeyring.text}</div>
      <div>todo: more info about user: hours worked, this week, position etc...</div>
    </div>
  );
};

UserQuickInfo.displayName = 'UserQuickInfo';

export default UserQuickInfo;
