/* eslint-disable indent */
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from '../../redux/store';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrateState } from '../../substrate-lib';

import {
  setProfile,
} from '../../redux/slices/profileSlice';
import { useUser } from './useUser';
import { useStatus } from './useStatus';
import { useLoader } from './useLoader';
import { useUtils } from './useUtils';
import {
  statusTypes,
  pallets,
  profileCallables,
  toastTypes,
  loadingTypes,
} from '../../types';
// import { useToast } from './useToast';
import { ProfileDataSubstrate } from '../../@types/universaldot';

const useProfile = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrateState();
  const [unsub, setUnsub] = useState<Function | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { selectedKeyring } = useUser();
  const { setStatus, setStatusMessage } = useStatus();
  const { setLoading } = useLoader();
  const { transformParams } = useUtils();
  // const { toast } = useToast();

  const profileData = useSelector(state => state.profile.data);

  const queryResponseHandler = useCallback(
    result => {
      setLoading({ type: loadingTypes.PROFILE, value: false });
      setStatusMessage('');

      const setAllData = (profileData: ProfileDataSubstrate) => {
        const modifiedProfileData = {
          ...profileData,
          interests: profileData?.interests?.split(','),
          reputation: profileData?.reputation?.toString() || 'N/A',
          balance: profileData?.balance || 'N/A'
        }
        dispatch(setProfile(modifiedProfileData));
      };

      result.isNone ? dispatch(setProfile(null)) : setAllData(result.toHuman());
    },
    [dispatch, setStatusMessage, setLoading]
  );

  // TODO: figure out how to make it simpler to check when API is availabile so it doesn't crash;
  const getProfile = useCallback(() => {
    setLoading({ type: loadingTypes.PROFILE, value: true });
    setStatusMessage('Loading account / profile...');

    if (
      selectedKeyring.value
      && api?.query?.[pallets.PROFILE]?.[profileCallables.PROFILES]
    ) {
      const query = async () => {
        const unsub = await api.query[pallets.PROFILE][
          profileCallables.PROFILES
        ](selectedKeyring.value, queryResponseHandler);
        const cb = () => unsub;
        cb();
      };

      query();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    api?.query?.[pallets.PROFILE]?.[profileCallables.PROFILES],
    selectedKeyring.value,
    setStatusMessage,
    setLoading,
  ]);

  const signedTransaction = async (actionType: string, payload: { username: string, interests: string[] }) => {
    const accountPair =
      selectedKeyring.value &&
      keyringState === 'READY' &&
      keyring.getPair(selectedKeyring.value);

    const getFromAcct = async () => {
      const {
        address,
        meta: { source, isInjected },
      } = accountPair;
      let fromAcct;

      // signer is from Polkadot-js browser extension
      if (isInjected) {
        const injected = await web3FromSource(source);
        fromAcct = address;
        api.setSigner(injected.signer);
      } else {
        fromAcct = accountPair;
      }

      return fromAcct;
    };

    const transactionResponseHandler = ({ status }: any) => {
      const callStatus = status;

      if (callStatus?.isFinalized) {
        setStatus(statusTypes.FINALIZED);
        setTimeout(() => {
          setStatus('');
        }, 5000);
      }
      if (callStatus?.isInBlock) {
        setStatus(statusTypes.IN_BLOCK);
      }

      // @TODO: transfer to new toast from template;
      // if (callStatus?.isInBlock) {
      //   if (actionType === profileCallables.CREATE_PROFILE) {
      //     toast('Profile created successfully!', toastTypes.SUCCESS);
      //   }

      //   if (actionType === profileCallables.UPDATE_PROFILE) {
      //     toast('Profile updated successfully!', toastTypes.SUCCESS);
      //   }

      //   if (actionType === profileCallables.REMOVE_PROFILE) {
      //     toast('Profile deleted successfully.', toastTypes.SUCCESS);
      //   }
      // }

      setActionLoading(false);
    };

    const transactionErrorHandler = (err: any) => {
      setStatus(statusTypes.ERROR);
      setStatusMessage(err.toString());
    };

    const fromAcct = await getFromAcct();

    // TODO: verify if correct;
    const paramFieldsForTransformed = () => [
      { name: 'username', optional: false, type: 'Bytes' },
      { name: 'interests', optional: false, type: 'Bytes' },
    ];
    const inputParamsForTransformed = () => [
      { type: 'Bytes', value: payload.username },
      { type: 'Bytes', value: payload.interests.join() },
    ];

    const transformed = transformParams(
      paramFieldsForTransformed(),
      inputParamsForTransformed()
    );

    let txExecute;

    if (actionType === profileCallables.CREATE_PROFILE) {
      txExecute = api.tx[pallets.PROFILE][profileCallables.CREATE_PROFILE](
        ...transformed
      );
    }

    if (actionType === profileCallables.REMOVE_PROFILE) {
      txExecute = api.tx[pallets.PROFILE][profileCallables.REMOVE_PROFILE]();
    }

    if (actionType === profileCallables.UPDATE_PROFILE) {
      txExecute = api.tx[pallets.PROFILE][profileCallables.UPDATE_PROFILE](
        ...transformed
      );
    }

    const unsub = await txExecute
      .signAndSend(fromAcct, transactionResponseHandler)
      .catch(transactionErrorHandler);

    setUnsub(() => unsub);
  };

  const profileAction = async (actionType: string, payload: { username: string, interests: string[] }) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    // @TODO: transfer to new toast from template;
    // if (actionType === profileCallables.CREATE_PROFILE) {
    //   toast('Creating profile...', toastTypes.INFO);
    // }

    // if (actionType === profileCallables.UPDATE_PROFILE) {
    //   toast('Updating profile...', toastTypes.INFO);
    // }

    // if (actionType === profileCallables.REMOVE_PROFILE) {
    //   toast('Deleting profile...', toastTypes.INFO);
    // }

    setStatus(statusTypes.INIT);
    setActionLoading(true);
    signedTransaction(actionType, payload);
  };

  return {
    getProfile,
    profileData,
    profileAction,
    actionLoading,
    setActionLoading,
  };
};

export { useProfile };
