/* eslint-disable indent */
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from '../../redux/store';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrateState } from '../../substrate-lib';

import {
  setProfile,
} from '../../redux/slices/profileSlice';
import { useUser } from './useUser';
import { useLoader } from './useLoader';
import { useUtils } from './useUtils';
import {
  Pallets,
  ProfileCallables,
  LoadingTypes,
  MessageTiming,
  ActionType,
  ProfilePayload,
  ProfileDataSubstrate
} from '../../types';
import createSnackbarMessage from '../../utils/createSnackbarMessage';
import createLoadingMessage from '../../utils/createLoadingMessage';

const useProfile = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrateState();
  const [unsub, setUnsub] = useState<Function | null>(null);

  const { selectedKeyring } = useUser();
  const { setLoading } = useLoader();
  const { transformParams } = useUtils();

  const profileData = useSelector(state => state.profile.data);

  const queryResponseHandler = useCallback(
    result => {
      setLoading({ type: LoadingTypes.PROFILE, value: false, message: createLoadingMessage() });

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
    [dispatch, setLoading]
  );

  // @TODO: figure out how to make it simpler to check when API is availabile so it doesn't crash;
  const getProfile = useCallback(() => {
    setLoading({ type: LoadingTypes.PROFILE, value: true, message: createLoadingMessage(LoadingTypes.PROFILE) });

    if (
      selectedKeyring.value
      && api?.query?.[Pallets.PROFILE]?.[ProfileCallables.PROFILES]
    ) {
      const query = async () => {
        const unsub = await api.query[Pallets.PROFILE][
          ProfileCallables.PROFILES
        ](selectedKeyring.value, queryResponseHandler);
        const cb = () => unsub;
        cb();
      };

      query();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    api?.query?.[Pallets.PROFILE]?.[ProfileCallables.PROFILES],
    selectedKeyring.value,
    setLoading,
  ]);

  const signedTransaction = async (actionType: ActionType, payload: ProfilePayload, enqueueSnackbar: Function) => {
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
      if (status?.isInBlock) {
        setLoading({ type: LoadingTypes.PROFILE, value: false, message: createLoadingMessage() });
        createSnackbarMessage(enqueueSnackbar, MessageTiming.FINAL, Pallets.PROFILE, actionType)
      }
    };

    const transactionErrorHandler = (err: any) => {
      // @TODO
      console.log('Error handler message', err);
    };

    const fromAcct = await getFromAcct();

    // @TODO: verify how to do it correctly; use util or similar to this;
    const paramFieldsForTransformed = () => [
      { name: 'username', optional: false, type: 'Bytes' },
      { name: 'interests', optional: false, type: 'Bytes' },
      { name: 'available_hours_per_week', optional: false, type: 'Bytes' },
      { name: 'additional_information', optional: false, type: 'Bytes' },
    ];
    const inputParamsForTransformed = () => [
      { type: 'Bytes', value: payload.username },
      { type: 'Bytes', value: payload.interests.join() },
      { type: 'Bytes', value: payload.availableHoursPerWeek },
      { type: 'Bytes', value: payload.otherInformation },
    ];

    const transformed = transformParams(
      paramFieldsForTransformed(),
      inputParamsForTransformed()
    );

    let txExecute;

    if (actionType === ProfileCallables.CREATE_PROFILE) {
      txExecute = api.tx[Pallets.PROFILE][ProfileCallables.CREATE_PROFILE](
        ...transformed
      );
    }

    if (actionType === ProfileCallables.REMOVE_PROFILE) {
      txExecute = api.tx[Pallets.PROFILE][ProfileCallables.REMOVE_PROFILE]();
    }

    if (actionType === ProfileCallables.UPDATE_PROFILE) {
      txExecute = api.tx[Pallets.PROFILE][ProfileCallables.UPDATE_PROFILE](
        ...transformed
      );
    }

    const unsub = await txExecute
      .signAndSend(fromAcct, transactionResponseHandler)
      .catch(transactionErrorHandler);

    setUnsub(() => unsub);
  };

  const profileAction = async (actionType: ActionType, payload: ProfilePayload, enqueueSnackbar: Function) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    createSnackbarMessage(enqueueSnackbar, MessageTiming.INIT, Pallets.PROFILE, actionType)

    setLoading({ type: LoadingTypes.PROFILE, value: true, message: createLoadingMessage(LoadingTypes.PROFILE, actionType) });
    signedTransaction(actionType, payload, enqueueSnackbar);
  };

  return {
    getProfile,
    profileData,
    profileAction,
  };
};

export { useProfile };
