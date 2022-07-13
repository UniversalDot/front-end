import React, { useState, useEffect, useMemo } from 'react';
// @mui
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  Chip,
  Paper,
  CardActions,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Tooltip,
  IconButton,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../Iconify';
// @types
import { MyProfile } from '../../../@types/universaldot';
// universaldot
import { useProfile, useStatus, useLoader } from '../../../hooks/universaldot';
import { profileCallables, statusTypes } from '../../../types';
import difference from 'lodash/difference';
import LoadingScreen from '../../LoadingScreen';
// ----------------------------------------------------------------------

type Props = {
  myProfile: MyProfile;
};

export default function ConfigurationProfile({ myProfile }: Props) {
  const theme = useTheme();

  const [oneInterest, setOneInterest] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [usernameEditEnabled, setUsernameEditEnabled] = useState(false);

  const [localUsername, setLocalUsername] = useState('');
  const [localAvailableHours, setLocalAvailableHours] = useState<string>('');
  const [localOtherInformation, setLocalOtherInformation] = useState<string>('');
  const [localInterests, setLocalInterests] = useState<string[]>([]);

  const { profileData, profileAction, actionLoading } = useProfile();
  const { status, setStatus } = useStatus();
  const { loadingProfile } = useLoader();

  const differencesExist: boolean = useMemo(() => {
    if (profileData && profileData.name && profileData.interests) {
      const differences = difference(localInterests, profileData?.interests);
      if (
        profileData?.name !== localUsername ||
        differences.length > 0 ||
        localInterests.length !== profileData?.interests.length
      ) {
        return true;
      } else return false;
    } else {
      return false;
    }
  }, [profileData, localUsername, localInterests]);

  const onUsernameChange = (username: string) => {
    setLocalUsername(username);
  };

  const onAvailableHoursChange = (hours: string) => {
    const ok = new RegExp(/^[1-9]\d*$/g);
    if (ok.test(hours)) {
      setLocalAvailableHours(hours);
    }
  };

  const onAvailableHoursBackspace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Backspace' && localAvailableHours.length === 1) {
      setLocalAvailableHours('');
    }
  };

  const onOtherInformationChange = (text: string) => {
    setLocalOtherInformation(text);
  };

  useEffect(() => {
    if (profileData?.name || profileData?.name === '') {
      setLocalUsername(profileData.name);
    }
    if (profileData?.interests) {
      setLocalInterests(profileData.interests);
    }
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

  const handleAddInterest = () => {
    if (oneInterest.length > 3) {
      setLocalInterests([...localInterests, oneInterest]);
      setOneInterest('');
    }
  };

  const onEnter = (e: any) => {
    if (e.keyCode === 13 && oneInterest.length > 3) {
      setLocalInterests([...localInterests, oneInterest]);
      setOneInterest('');
    }
  };

  const onRemoveInterest = (interest: any) => {
    setLocalInterests(localInterests.filter((interestItem: any) => interestItem !== interest));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        {showLoader && <LoadingScreen />}
        <Card sx={{ p: 3 }}>
          {showLoader && <div>Loading... todo...</div>}
          {!showLoader && (
            <div>
              {profileData ? (
                <Typography variant="h4" gutterBottom>
                  Your profile
                </Typography>
              ) : (
                <Typography variant="h4" gutterBottom>
                  Create your profile
                </Typography>
              )}
            </div>
          )}
          {!showLoader && (
            <div>
              {profileData ? (
                <Typography paragraph gutterBottom>
                  You can update or remove your profile in this panel
                </Typography>
              ) : (
                <Typography paragraph gutterBottom>
                  To create your profile add your username and some interests
                </Typography>
              )}
            </div>
          )}
          {(!showLoader || !loadingProfile) && (
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Box>
                <Typography
                  paragraph
                  variant="overline"
                  sx={{ color: 'text.disabled' }}
                  gutterBottom
                >
                  Details
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                    }}
                  >
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-username"
                        type={'text'}
                        value={localUsername}
                        onChange={(event) => onUsernameChange(event.target.value)}
                        // endAdornment={
                        //   profileData ? (
                        //     <Tooltip title="Edit username" placement="top">
                        //       <InputAdornment
                        //         position="end"
                        //         sx={{ cursor: 'pointer', color: '#637381' }}
                        //       >
                        //         <Iconify
                        //           icon="akar-icons:edit"
                        //           width={20}
                        //           height={20}
                        //           onClick={() => setUsernameEditEnabled(true)}
                        //         />
                        //       </InputAdornment>
                        //     </Tooltip>
                        //   ) : (
                        //     <></>
                        //   )
                        // }
                        label="Username"
                        onBlur={() => setUsernameEditEnabled(false)}
                        readOnly={!usernameEditEnabled && Boolean(profileData)}
                      />
                    </FormControl>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-available-hours">
                        Available hours per week
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-available-hours"
                        type={'text'}
                        value={localAvailableHours}
                        onChange={(event) => onAvailableHoursChange(event.target.value)}
                        onKeyDown={onAvailableHoursBackspace}
                        label="Available hours per week"
                      />
                    </FormControl>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-other-info">Other information</InputLabel>
                      <OutlinedInput
                        id="outlined-other-info"
                        type={'text'}
                        value={localOtherInformation}
                        onChange={(event) => onOtherInformationChange(event.target.value)}
                        label="Other information"
                      />
                    </FormControl>
                  </Box>
                  {profileData && (
                    <Box>
                      <Tooltip title="Enable editing" placement="top">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => setUsernameEditEnabled(true)}
                          sx={{ marginLeft: theme.spacing(1) }}
                          disabled={usernameEditEnabled}
                        >
                          <Iconify icon="akar-icons:edit" width={20} height={20} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box>
                <Typography
                  paragraph
                  variant="overline"
                  sx={{ color: 'text.disabled' }}
                  gutterBottom
                >
                  Interests
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                  }}
                >
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-interest">Add interest</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-interest"
                      type={'text'}
                      value={oneInterest}
                      onChange={(event) => setOneInterest(event.target.value)}
                      endAdornment={
                        <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                          <Iconify
                            icon="ant-design:plus-outlined"
                            width={20}
                            height={20}
                            onClick={() => handleAddInterest()}
                          />
                        </InputAdornment>
                      }
                      label="Username"
                      onKeyDown={onEnter}
                    />
                  </FormControl>
                  <Paper sx={{ p: 2 }} variant="outlined">
                    <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
                      {localInterests.map((interest: string, i: number) => (
                        <Chip
                          key={`${interest}-${i}`}
                          label={interest}
                          size="small"
                          sx={{ m: 0.5 }}
                          variant="outlined"
                          onDelete={() => onRemoveInterest(interest)}
                        />
                      ))}
                    </Stack>
                    {localInterests.length === 0 && (
                      <Typography paragraph>Added interests will show up here...</Typography>
                    )}
                  </Paper>
                </Box>
              </Box>
            </Box>
          )}

          <CardActions sx={{ padding: '24px 0 0 0' }}>
            <LoadingButton
              variant="contained"
              loading={actionLoading || showLoader}
              disabled={
                (profileData && !differencesExist) ||
                (!profileData && localInterests.length === 0) ||
                !localUsername
              }
              onClick={() => {
                profileAction(
                  profileData ? profileCallables.UPDATE_PROFILE : profileCallables.CREATE_PROFILE,
                  {
                    username: localUsername,
                    interests: localInterests,
                    availableHoursPerWeek: localAvailableHours,
                    otherInformation: localOtherInformation,
                  }
                );
                setOneInterest('');
                setLocalUsername('');
                setLocalAvailableHours('');
                setLocalOtherInformation('');
                setLocalInterests([]);
              }}
            >
              {profileData ? 'Save changes' : 'Create profile'}
            </LoadingButton>
            {profileData && (
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  profileAction(profileCallables.REMOVE_PROFILE, {
                    username: localUsername,
                    interests: localInterests,
                    availableHoursPerWeek: localAvailableHours,
                    otherInformation: localOtherInformation,
                  })
                }
              >
                Delete profile
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
