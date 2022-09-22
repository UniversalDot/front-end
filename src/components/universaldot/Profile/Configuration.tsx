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
  LinearProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../Iconify';
// universaldot
import { useProfile, useLoader } from '../../../hooks/universaldot';
import { ProfileCallables } from '../../../types';
import difference from 'lodash/difference';
import { useSnackbar } from 'notistack';
import MyAvatar from '../../MyAvatar';
// ----------------------------------------------------------------------

export default function ConfigurationProfile() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [interest, setInterest] = useState('');
  const [usernameEditEnabled, setUsernameEditEnabled] = useState(false);

  const [localUsername, setLocalUsername] = useState('');
  const [localAvailableHours, setLocalAvailableHours] = useState<string>('');
  const [localOtherInformation, setLocalOtherInformation] = useState<string>('');
  const [localInterests, setLocalInterests] = useState<string[]>([]);

  const { profileData, profileAction } = useProfile();
  const { loadingProfileCreateProfile, loadingProfileUpdateProfile, loadingProfileRemoveProfile } =
    useLoader();

  const loadingProfile = useMemo(
    () => loadingProfileCreateProfile || loadingProfileUpdateProfile || loadingProfileRemoveProfile,
    [loadingProfileCreateProfile, loadingProfileUpdateProfile, loadingProfileRemoveProfile]
  );

  const differencesExist: boolean = useMemo(() => {
    if (
      profileData &&
      profileData.name &&
      profileData.interests &&
      profileData.availableHoursPerWeek &&
      profileData.additionalInformation
    ) {
      const interestsDifferences = difference(localInterests, profileData?.interests);
      if (
        localUsername !== profileData?.name ||
        interestsDifferences.length > 0 ||
        localInterests.length !== profileData?.interests.length ||
        localAvailableHours !== profileData?.availableHoursPerWeek ||
        localOtherInformation !== profileData?.additionalInformation
      ) {
        return true;
      } else return false;
    } else {
      return false;
    }
  }, [profileData, localUsername, localInterests, localAvailableHours, localOtherInformation]);

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
    if (profileData?.availableHoursPerWeek) {
      setLocalAvailableHours(profileData.availableHoursPerWeek);
    }
    if (profileData?.additionalInformation) {
      setLocalOtherInformation(profileData.additionalInformation);
    }

    if (!profileData) {
      resetLocalState();
    }
  }, [profileData]);

  const handleAddInterest = () => {
    if (interest.length > 3) {
      setLocalInterests([...localInterests, interest]);
      setInterest('');
    }
  };

  const onEnter = (e: any) => {
    if (e.keyCode === 13 && interest.length > 3) {
      setLocalInterests([...localInterests, interest]);
      setInterest('');
    }
  };

  const onRemoveInterest = (interest: any) => {
    setLocalInterests(localInterests.filter((interestItem: any) => interestItem !== interest));
  };

  const resetLocalState = () => {
    setInterest('');
    setLocalUsername('');
    setLocalAvailableHours('');
    setLocalOtherInformation('');
    setLocalInterests([]);
  };

  const onActionButtonClick = (actionType: ProfileCallables) => {
    if (
      actionType === ProfileCallables.CREATE_PROFILE ||
      actionType === ProfileCallables.UPDATE_PROFILE
    ) {
      profileAction(
        actionType,
        {
          username: localUsername,
          interests: localInterests,
          availableHoursPerWeek: localAvailableHours,
          otherInformation: localOtherInformation,
        },
        enqueueSnackbar
      );
      resetLocalState();
    }

    if (actionType === ProfileCallables.REMOVE_PROFILE) {
      profileAction(
        actionType,
        {
          username: localUsername,
          interests: localInterests,
          availableHoursPerWeek: localAvailableHours,
          otherInformation: localOtherInformation,
        },
        enqueueSnackbar
      );
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          {loadingProfile && (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress />
            </Stack>
          )}
          {!loadingProfile && (
            <Box>
              <Box>
                {profileData ? (
                  <Typography variant="h4" gutterBottom>
                    Your profile
                  </Typography>
                ) : (
                  <Typography variant="h4" gutterBottom>
                    Create your profile
                  </Typography>
                )}
              </Box>
              <Box>
                {profileData ? (
                  <Typography paragraph gutterBottom>
                    You can update or remove your profile in this panel
                  </Typography>
                ) : (
                  <Typography paragraph gutterBottom>
                    To create your profile add your username and some interests
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          {!loadingProfile && (
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FormControl variant="outlined" sx={{ flex: 1 }}>
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
                      value={interest}
                      onChange={(event) => setInterest(event.target.value)}
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
                          color="primary"
                          label={interest}
                          size="medium"
                          sx={{ m: 0.5 }}
                          // variant="outlined"
                          onDelete={() => onRemoveInterest(interest)}
                          avatar={
                            <MyAvatar imageURL="https://minimal-assets-api-dev.vercel.app/assets/icons/ic_notification_package.svg" />
                          }
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
              loading={loadingProfile}
              disabled={
                (profileData && !differencesExist) ||
                (!profileData && localInterests.length === 0) ||
                !localUsername
              }
              onClick={() =>
                onActionButtonClick(
                  profileData ? ProfileCallables.UPDATE_PROFILE : ProfileCallables.CREATE_PROFILE
                )
              }
            >
              {profileData ? 'Save changes' : 'Create profile'}
            </LoadingButton>
            {profileData && (
              <Button
                variant="contained"
                color="error"
                onClick={() => onActionButtonClick(ProfileCallables.REMOVE_PROFILE)}
                disabled={loadingProfile}
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
