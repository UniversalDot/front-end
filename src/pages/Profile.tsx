import { capitalCase } from 'change-case';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// @types
import { MyProfile } from '../@types/universaldot';
// routes
import { PATH_UNIVERSALDOT } from '../routes/paths';
// hooks
import useTabs from '../hooks/useTabs';
import useSettings from '../hooks/useSettings';
// _mock_
import _mock from '../_mock';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import {
  Profile as ProfileView,
  ProfileCover,
  Configuration,
} from '../components/universaldot/Profile';
// universaldot
import { useProfile } from '../hooks/universaldot';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function Profile() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('profile');

  const { profileData } = useProfile();

  // @TODO
  const myProfile: MyProfile = {
    id: _mock.id(1),
    username: profileData?.name || 'N/A',
    balance: profileData?.balance || 'N/A',
    reputation: profileData?.reputation || 'N/A',
    cover: _mock.image.cover(1),
    position: 'UI/UX Designer at DesignerHub',
    quote:
      'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
    country: _mock.address.country(1),
    email: _mock.email(1),
    company: _mock.company(1),
    school: _mock.company(2),
    role: 'UI/UX Designer',
    facebookLink: `https://www.facebook.com/caitlyn.kerluke`,
    instagramLink: `https://www.instagram.com/caitlyn.kerluke`,
    linkedinLink: `https://www.linkedin.com/in/caitlyn.kerluke`,
    twitterLink: `https://www.twitter.com/caitlyn.kerluke`,
  };

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <ProfileView myProfile={myProfile} />,
    },
    {
      value: 'configuration',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <Configuration myProfile={myProfile} />,
    },
  ];

  return (
    <Page title="Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Profile', href: PATH_UNIVERSALDOT.profile.root },
            { name: profileData?.name || 'N/A' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={myProfile} />

          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
