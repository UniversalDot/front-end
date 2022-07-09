// @mui
import { Grid, Stack } from '@mui/material';
// @types
import { MyProfile } from '../../../@types/universaldot';
//
import ProfileAbout from './ProfileAbout';
import ProfileSocialInfo from './ProfileSocialInfo';
// universaldot
import Widget from 'src/components/universaldot/Profile/Widget';
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Widget title="Reputation points" total={myProfile.reputation} icon={<div></div>} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Widget title="Cryptocurrency" total={`₿${myProfile.balance}`} icon={<div></div>} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
