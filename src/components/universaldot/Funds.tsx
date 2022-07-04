import { useEffect, useState } from 'react';
import { useUser, useProfile } from '../../hooks/universaldot';
import { useSubstrateState } from '../../substrate-lib';
import { useDispatch } from '../../redux/store';
import { setBalance } from '../../redux/slices/accountSlice';

const Funds = () => {
  const { selectedKeyring, selectedAccountBalance } = useUser();
  const { reputation } = useProfile();
  const { api } = useSubstrateState();
  const dispatch = useDispatch();

  const [unsub, setUnsub] = useState<Function | null>(null);

  useEffect(() => {
    if (selectedKeyring.value && api) {
      selectedKeyring.value &&
        api?.query?.system
          ?.account(selectedKeyring.value, (balance: any) => {
            dispatch(setBalance(balance.data.free.toHuman()));
          })
          .then((unsub: any) => {
            setUnsub(unsub);
          })
          .catch(console.error);
    }

    return () => {
      unsub && unsub();
      setUnsub(null);
    };
  }, [selectedKeyring.value, dispatch, api, unsub]);

  return (
    <div>
      <div>Reputation Points: {reputation}</div>
      <div>Cryptocurrency: ₿{selectedAccountBalance}</div>
    </div>
  );
};

Funds.displayName = 'Funds';

export default Funds;
