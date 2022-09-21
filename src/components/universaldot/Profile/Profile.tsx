// @mui
import { Grid, Stack } from '@mui/material';
// @types
import { MyProfile } from '../../../types';
// universaldot
import ProfileAbout from './ProfileAbout';
import ProfileSocialInfo from './ProfileSocialInfo';
import { useProfile } from '../../../hooks/universaldot';
import Widget from 'src/components/universaldot/Profile/Widget';
import { Configuration } from 'src/components/universaldot/Profile';
// ----------------------------------------------------------------------

type Props = {
  myProfile: MyProfile;
};

export default function Profile({ myProfile }: Props) {
  const { profileData } = useProfile();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileAbout profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Widget
                title="Reputation points"
                total={profileData?.reputation || 'N/A'}
                imageURL={
                  'https://minimal-assets-api-dev.vercel.app/assets/icons/ic_notification_package.svg'
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Widget
                title="Cryptocurrency"
                total={`₿${profileData?.balance || 'N/A'}`}
                imageURL={
                  'https://minimal-assets-api-dev.vercel.app/assets/icons/ic_notification_package.svg'
                }
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Configuration />
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
}
