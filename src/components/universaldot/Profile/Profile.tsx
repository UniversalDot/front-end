// @mui
import { Grid, Stack } from '@mui/material';
// @types
import { MyProfile } from '../../../@types/universaldot';
//
import ProfileAbout from './ProfileAbout';
import ProfileSocialInfo from './ProfileSocialInfo';
// universaldot
import Funds from 'src/components/universaldot/Funds';
// ----------------------------------------------------------------------

type Props = {
  myProfile: MyProfile;
};

export default function Profile({ myProfile }: Props) {
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
          <Funds balance={myProfile.balance} reputation={myProfile.reputation} />
        </Stack>
      </Grid>
    </Grid>
  );
}
