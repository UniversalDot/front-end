import { useCallback, useState } from 'react';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrateState } from '../../substrate-lib';
import { useUser } from './useUser';
import { useLoader } from './useLoader';
import { useUtils } from './useUtils';
import {
  Pallets,
  LoadingTypes,
  DaoCallables,
  ProfileCallables,
  MessageTiming,
  ActionType,
  TaskCallables,
  TransactionStatus
} from '../../types';

import {
  setJoinedOrganizations,
  setApplicants as setApplicantsToOrg,
  setMembersOfSelectedOrganization,
  setOwnOrganizations,
  setOrganizationTasks
} from '../../redux/slices/daoSlice';

import { useSelector, useDispatch } from '../../redux/store';

import createSnackbarMessage from '../../utils/createSnackbarMessage';
import createLoadingMessage from '../../utils/createLoadingMessage';

const useDao = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrateState();
  const [unsub, setUnsub] = useState<Function | null>(null);

  const { selectedKeyring } = useUser();
  const { setLoading } = useLoader();
  const { getErrorInfo } = useUtils();

  const joinedOrganizations = useSelector(
    state => state.dao.joinedOrganizations
  );
  const ownOrganizations = useSelector(
    state => state.dao.ownOrganizations
  );

  const applicantsToOrganization = useSelector(
    state => state.dao.applicantsToOrganization
  );

  const membersOfTheSelectedOrganization = useSelector(
    state => state.dao.membersOfSelectedOrganization
  );

  const organizationTasks = useSelector(
    state => state.dao.organizationTasks
  );

  const handleOrganizationTasksResponse = async (organizationsTasks: any, actionType: ActionType, enqueueSnackbar: Function, organizationId: string) => {
    if (!organizationsTasks.isNone) {

      const orgTasks: any[] = organizationsTasks.toHuman();

      const query = async (taskId: string) => {
        let returnValue = undefined;

        const unsub = await api?.query[Pallets.TASK][TaskCallables.TASKS](
          taskId,
          (response: any) => {
            returnValue = { id: taskId, organizationId: organizationId, ...response.toHuman() };
          }
        );

        const cb = () => unsub;
        cb();

        while (true) {
          await new Promise(r => setTimeout(r, 50));
          if (returnValue) break;
        }

        return returnValue;
      };

      const tasksAsObjects = await Promise.all(orgTasks.map(taskId => query(taskId)));

      if (tasksAsObjects) {
        createSnackbarMessage(enqueueSnackbar, MessageTiming.FINAL, Pallets.DAO, actionType)
        setLoading({ type: LoadingTypes.DAO, value: false, message: createLoadingMessage(LoadingTypes.DAO, actionType) });
        dispatch(
          setOrganizationTasks(tasksAsObjects)
        );
      }
    }
  };


  const handleOrganizationsResponse = async (joinedOrganizationsResponse: any, queryType: 'joined' | 'own', userKey: string) => {
    if (!joinedOrganizationsResponse.isNone) {
      const joinedOrgs: any[] = joinedOrganizationsResponse.toHuman();

      const query = async (organizationId: string) => {
        let returnValue = undefined;

        const unsub = await api?.query[Pallets.DAO][DaoCallables.ORGANIZATIONS](
          organizationId,
          (response: any) => {
            returnValue = { id: organizationId, ...response.toHuman() };
          }
        );

        const cb = () => unsub;
        cb();

        while (true) {
          await new Promise(r => setTimeout(r, 50));
          if (returnValue) break;
        }

        return returnValue;
      };

      const organizationsAsObjects = await Promise.all(joinedOrgs.map(organizationId => query(organizationId)));

      if (organizationsAsObjects) {
        if (queryType === 'joined') {
          dispatch(
            setJoinedOrganizations(organizationsAsObjects)
          );
        }

        if (queryType === 'own') {
          const ownOrganizationsAsObjects = organizationsAsObjects.filter((organization: any) => organization.owner === userKey)
          dispatch(
            setOwnOrganizations(ownOrganizationsAsObjects)
          );
        }

      }
    }
  };

  const handleMembersOfAnOrganizationResponse = async (membersResponse: any, daoType: DaoCallables.MEMBERS | DaoCallables.APPLICANTS_TO_ORGANIZATION, actionType: ActionType, enqueueSnackbar: Function) => {
    if (!membersResponse.isNone) {
      const membersOfOrganization: any[] = membersResponse.toHuman();

      const query = async (memberProfileId: string) => {
        let returnValue = undefined;

        const unsub = await api?.query[Pallets.PROFILE][ProfileCallables.PROFILES](
          memberProfileId,
          (response: any) => {
            if (response.toString().length > 0) {
              returnValue = response.toHuman();
            } else {
              returnValue = 'empty'
            }
          }
        );

        const cb = () => unsub;
        cb();

        while (true) {
          await new Promise(r => setTimeout(r, 50));
          if (returnValue) break;
        }

        return returnValue;
      };

      const membersAsObjects = await Promise.all(membersOfOrganization.map(memberProfileIdForQuery => query(memberProfileIdForQuery)));

      if (membersAsObjects) {
        createSnackbarMessage(enqueueSnackbar, MessageTiming.FINAL, Pallets.DAO, actionType)
        setLoading({ type: LoadingTypes.DAO, value: false, message: createLoadingMessage(LoadingTypes.DAO, actionType) });

        const filteredObjects = membersAsObjects.filter((item) => item !== 'empty')

        if (daoType === DaoCallables.MEMBERS) {
          dispatch(
            setMembersOfSelectedOrganization(filteredObjects)
          );
        }

        if (daoType === DaoCallables.APPLICANTS_TO_ORGANIZATION) {
          dispatch(
            setApplicantsToOrg(filteredObjects)
          );
        }
      }
    }
  };

  const getMembersOfAnOrganization = useCallback(
    (organizationId, actionType: ActionType, enqueueSnackbar: Function) => {
      createSnackbarMessage(enqueueSnackbar, MessageTiming.INIT, Pallets.DAO, actionType)
      setLoading({ type: LoadingTypes.DAO, value: true, message: createLoadingMessage(LoadingTypes.DAO, actionType) });
      const query = async () => {
        const unsub = await api?.query[Pallets.DAO][DaoCallables.MEMBERS](
          organizationId,
          (response: any) => handleMembersOfAnOrganizationResponse(response, DaoCallables.MEMBERS, actionType, enqueueSnackbar)
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api]
  );

  const getJoinedOrganizations = useCallback(
    (userKey) => {
      const query = async () => {
        const unsub = await api?.query[Pallets.DAO][DaoCallables.MEMBER_OF](
          userKey,
          (response: any) => handleOrganizationsResponse(response, 'joined', userKey)
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api]
  );

  const getOwnOrganizations = useCallback(
    (userKey) => {
      const query = async () => {
        const unsub = await api?.query[Pallets.DAO][DaoCallables.MEMBER_OF](
          userKey,
          (response: any) => handleOrganizationsResponse(response, 'own', userKey)
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api]
  );

  const getOrganizationTasks = useCallback(
    (organizationId, actionType: ActionType, enqueueSnackbar: Function) => {
      createSnackbarMessage(enqueueSnackbar, MessageTiming.INIT, Pallets.DAO, actionType)
      setLoading({ type: LoadingTypes.DAO, value: true, message: createLoadingMessage(LoadingTypes.DAO, actionType) });
      const query = async () => {
        const unsub = await api?.query[Pallets.DAO][
          DaoCallables.ORGANIZATION_TASKS
        ](organizationId, (response: any) => handleOrganizationTasksResponse(response, actionType, enqueueSnackbar, organizationId));
        const cb = () => unsub;
        cb();
      };

      query();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api]
  );

  const getApplicantsToOrganization = useCallback(
    (organizationId, actionType: ActionType, enqueueSnackbar: Function) => {
      createSnackbarMessage(enqueueSnackbar, MessageTiming.INIT, Pallets.DAO, actionType)
      setLoading({ type: LoadingTypes.DAO, value: true, message: createLoadingMessage(LoadingTypes.DAO, actionType) });

      const query = async () => {
        const unsub = await api?.query[Pallets.DAO][DaoCallables.APPLICANTS_TO_ORGANIZATION](
          organizationId,
          (response: any) => handleMembersOfAnOrganizationResponse(response, DaoCallables.APPLICANTS_TO_ORGANIZATION, actionType, enqueueSnackbar)
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api]
  );

  const signedTx = async (actionType: ActionType, payload: any, enqueueSnackbar: Function) => {
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

    const fromAcct = await getFromAcct();

    let txExecute;

    if (actionType === DaoCallables.ADD_MEMBERS) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.ADD_MEMBERS](
        ...payload
      );
    }

    if (actionType === DaoCallables.ADD_TASKS) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.ADD_TASKS](
        ...payload
      );
    }

    if (actionType === DaoCallables.CREATE_ORGANIZATION) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.CREATE_ORGANIZATION](
        ...payload
      );
    }

    if (actionType === DaoCallables.DISSOLVE_ORGANIZATION) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.DISSOLVE_ORGANIZATION](
        ...payload
      );
    }

    if (actionType === DaoCallables.REMOVE_MEMBERS) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.REMOVE_MEMBERS](
        ...payload
      );
    }

    if (actionType === DaoCallables.REMOVE_TASKS) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.REMOVE_TASKS](
        ...payload
      );
    }

    const transactionResponseHandler = (response: any) => {
      let txFailed = false;
      let failureText: string = '';

      console.log('response', response)

      if (response.status?.isFinalized) {
        // TODO: Maybe do a call to repopulate state with latest changes from the blockchain;
      }

      if (response.dispatchError) {
        console.log('response.dispatchError', response.dispatchError)

        const { txFailed: txFailedResult, failureText: failureTextResult } = getErrorInfo(response, api)

        txFailed = txFailedResult;
        failureText = failureTextResult;
      }

      if (response.status?.isInBlock) {
        setLoading({ type: LoadingTypes.DAO, value: false, message: createLoadingMessage() });
        createSnackbarMessage(enqueueSnackbar, MessageTiming.FINAL, Pallets.DAO, actionType, txFailed ? TransactionStatus.FAIL : TransactionStatus.SUCCESS, failureText)
      }

    };

    const unsub = await txExecute.signAndSend(fromAcct, transactionResponseHandler);
    setUnsub(() => unsub);
  };

  const daoAction = async (actionType: ActionType, payload: any, enqueueSnackbar: Function) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    if (actionType === DaoCallables.ADD_MEMBERS) {
      payload = ['@TODO']
    }

    if (actionType === DaoCallables.ADD_TASKS) {
      payload = [...payload]
    }

    if (actionType === DaoCallables.CREATE_ORGANIZATION) {
      payload = ['@TODO']
    }

    if (actionType === DaoCallables.DISSOLVE_ORGANIZATION) {
      payload = ['@TODO']
    }

    if (actionType === DaoCallables.UPDATE_ORGANIZATION) {
      payload = ['@TODO']
    }

    if (actionType === DaoCallables.TRANSFER_OWNERSHIP) {
      payload = ['@TODO']
    }

    if (actionType === DaoCallables.REMOVE_MEMBERS) {
      payload = ['@TODO']
    }

    if (actionType === DaoCallables.REMOVE_TASKS) {
      payload = [...payload]
    }

    createSnackbarMessage(enqueueSnackbar, MessageTiming.INIT, Pallets.DAO, actionType)

    setLoading({ type: LoadingTypes.DAO, value: true, message: createLoadingMessage(LoadingTypes.DAO, actionType) });

    signedTx(actionType, payload, enqueueSnackbar);
  };

  return {
    daoAction,
    getJoinedOrganizations,
    joinedOrganizations,
    applicantsToOrganization,
    getMembersOfAnOrganization,
    membersOfTheSelectedOrganization,
    getOwnOrganizations,
    ownOrganizations,
    getApplicantsToOrganization,
    getOrganizationTasks,
    organizationTasks,
  };
};

export { useDao };
