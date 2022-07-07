// @mui
import { Grid, Stack } from '@mui/material';
// @types
import { MyProfile } from '../../../@types/universaldot';
// universaldot
// ----------------------------------------------------------------------

type Props = {
  myProfile: MyProfile;
};

export default function ConfigurationProfile({ myProfile }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        {/* <Stack spacing={3}>
          <ProfileAbout profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
        </Stack> */}
        Inputs here....
      </Grid>

      <Grid item xs={12} md={8}>
        {/* <Stack spacing={3}>
          <Funds balance={myProfile.balance} reputation={myProfile.reputation} />
        </Stack> */}
        Interests here...
      </Grid>

      <Grid item xs={12} md={8}>
        {/* <Stack spacing={3}>
          <Funds balance={myProfile.balance} reputation={myProfile.reputation} />
        </Stack> */}
        Buttons here...
      </Grid>
    </Grid>
  );
}
