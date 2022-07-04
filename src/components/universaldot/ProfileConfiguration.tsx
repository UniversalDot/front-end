/* eslint-disable indent */
import { useState, useEffect } from 'react';
import { useProfile, useStatus } from '../../hooks/universaldot';
import { profileCallables, statusTypes } from '../../types';

const ProfileConfiguration = () => {
  const [oneInterest, setOneInterest] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [usernameEditEnabled, setUsernameEditEnabled] = useState(false);

  const {
    profileData,
    profileAction,
    populateFormInterests,
    interests,
    actionLoading,
    setUsername,
    username,
  } = useProfile();
  const { status, setStatus } = useStatus();

  const onPalletCallableParamChange = (e: any) => {
    setOneInterest(e.target.value);
  };

  useEffect(() => {
    if (!profileData) {
      populateFormInterests([]);
      setUsername('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  useEffect(() => {
    if (!!status && status === statusTypes.INIT) {
      setShowLoader(true);
    }

    if (!!status && status === statusTypes.IN_BLOCK) {
      setShowLoader(false);
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }
  }, [status, setStatus]);

  const TxButton = ({ label, color = 'blue', actionType, loading, disabled }: any) => (
    <button
      data-cy="createProfileButton"
      type="submit"
      onClick={() => {
        profileAction(actionType);
        setOneInterest('');
      }}
    >
      {label}
    </button>
  );

  const handleAddInterest = () => {
    if (oneInterest.length > 3) {
      populateFormInterests([...interests, oneInterest]);
      setOneInterest('');
    }
  };

  const onEnter = (e: any) => {
    if (e.keyCode === 13 && oneInterest.length > 3) {
      populateFormInterests([...interests, oneInterest]);
      setOneInterest('');
    }
  };

  const handleRemoveInterest = (interest: any) => {
    populateFormInterests(interests.filter((interestItem: any) => interestItem !== interest));
  };

  return (
    <>
      <div>
        {showLoader && <div>loading...</div>}
        {!showLoader && <div>{profileData ? 'Your profile' : 'Create your profile'}</div>}
        {!showLoader && (
          <div>
            {profileData
              ? 'You can update or remove your profile in this panel'
              : 'To create your profile add some interests first.'}
          </div>
        )}
        {!showLoader && (
          <div>
            <div>inputs here</div>
            {/* {!profileData && (
                    <Input
                      placeholder="For ex. richard123"
                      fluid
                      type="text"
                      label="Enter your username:"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  )}
                  {profileData && (
                    <Input
                      placeholder="For ex. richard123"
                      action={{
                        icon: 'edit',
                        onClick: () => setUsernameEditEnabled(true),
                      }}
                      fluid
                      type="text"
                      label="Your username:"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      readOnly={!usernameEditEnabled}
                    />
                  )} */}

            <div>Interests here:</div>
            <div>
              {' '}
              {interests.map((interest: any, i: number) => (
                <div key={`i${i}`}>{interest}</div>
              ))}
            </div>
          </div>
        )}
        {!showLoader && (
          <div>
            <TxButton
              label={profileData ? 'Update profile' : 'Create profile'}
              color={profileData ? 'green' : 'blue'}
              actionType={
                profileData ? profileCallables.UPDATE_PROFILE : profileCallables.CREATE_PROFILE
              }
              loading={actionLoading}
              disabled={interests.length === 0 || !username}
            />
            {profileData && (
              <TxButton
                label="Remove profile"
                color="red"
                actionType={profileCallables.REMOVE_PROFILE}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

ProfileConfiguration.displayName = 'ProfileConfiguration';

export default ProfileConfiguration;
