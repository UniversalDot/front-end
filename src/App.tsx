import { useEffect } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import LoadingScreen from './components/LoadingScreen';

// universaldot imports
import { useProfile, useUser, useLoader } from './hooks/universaldot';
import { useSubstrateState } from './substrate-lib';
// ----------------------------------------------------------------------

export default function App() {
  const { getProfile } = useProfile();
  const { keyring } = useSubstrateState();
  const { setKeyringOptions } = useUser();

  const { loadingProfile, message } = useLoader();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  // @TODO: this should go in component where we choose an account and on click we set it as currently selected account;
  useEffect(() => {
    // Get the list of accounts we possess the private key for.
    if (keyring) {
      const keyringOptions = keyring?.getPairs()?.map((account: any) => ({
        key: account.address,
        value: account.address,
        text: account.meta.name.toUpperCase(),
      }));
      setKeyringOptions(keyringOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyring]);

  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <NotistackProvider>
            <ProgressBarStyle />
            <ScrollToTop />
            <LoadingScreen show={loadingProfile} message={message} />
            <Router />
          </NotistackProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
