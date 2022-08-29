/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import { useCallback, useState } from 'react';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrateState } from '../../substrate-lib';
// import {} from '../store/slices/daoSlice';
import { useUser } from './useUser';
import { useLoader } from './useLoader';
import {
  Pallets,
  LoadingTypes,
  DaoCallables,
  ProfileCallables,
  MessageTiming,
  ActionType,
  TaskCallables,
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

  const handleOrganizationTasksResponse = async (organizationsTasks: any, actionType: ActionType, enqueueSnackbar: Function) => {
    if (!organizationsTasks.isNone) {

      const orgTasks: any[] = organizationsTasks.toHuman();

      const query = async (taskId: string) => {
        let returnValue = undefined;

        const unsub = await api?.query[Pallets.TASK][TaskCallables.TASKS](
          taskId,
          (response: any) => {
            returnValue = { id: taskId, ...response.toHuman() };
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
    [api]
  );

  const getOrganizationTasks = useCallback(
    (organizationId, actionType: ActionType, enqueueSnackbar: Function) => {
      createSnackbarMessage(enqueueSnackbar, MessageTiming.INIT, Pallets.DAO, actionType)
      setLoading({ type: LoadingTypes.DAO, value: true, message: createLoadingMessage(LoadingTypes.DAO, actionType) });
      const query = async () => {
        const unsub = await api?.query[Pallets.DAO][
          DaoCallables.ORGANIZATION_TASKS
        ](organizationId, (response: any) => handleOrganizationTasksResponse(response, actionType, enqueueSnackbar));
        const cb = () => unsub;
        cb();
      };

      query();
    },
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
    [api]
  );

  // const handleAddTaskToOrganizationResponse = async (taskForOrganization: any) => {
  //   if (!taskForOrganization.isNone) {

  //     console.log('organizationsTasks', taskForOrganization)
  //     console.log('organizationsTasks human', taskForOrganization.toHuman())

  //   }
  // };


  // const addTaskToOrganization = useCallback(
  //   (organizationId, taskId) => {
  //     const query = async () => {
  //       // @TODO: confirm if payload is formatted well;
  //       const payload = [organizationId, taskId]
  //       const unsub = await api?.query[Pallets.DAO][DaoCallables.ADD_TASKS](
  //         payload,
  //         (response: any) => handleAddTaskToOrganizationResponse(response)
  //       );
  //       const cb = () => unsub;
  //       cb();
  //     };

  //     query();
  //   },
  //   [api]
  // );

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

    // TODO: orgName should be refactored to orgId in BE; add from argument payload down below;
    const transformedPayloadAddMembers = ['@TODO'];

    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadAddTasks = [...payload]

    const transformedPayloadCreateOrg = ['@TODO'];
    // TODO: should accept more data (title, desc, etc.) not just visionDocument;

    const transformedPayloadDissolveOrg = ['@TODO'];
    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadRemoveMembers = ['@TODO'];
    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadRemoveTasks = ['@TODO'];

    let txExecute;

    if (actionType === DaoCallables.ADD_MEMBERS) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.ADD_MEMBERS](
        ...transformedPayloadAddMembers
      );
    }

    if (actionType === DaoCallables.ADD_TASKS) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.ADD_TASKS](
        ...transformedPayloadAddTasks
      );
    }

    if (actionType === DaoCallables.CREATE_ORGANIZATION) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.CREATE_ORGANIZATION](
        ...transformedPayloadCreateOrg
      );
    }

    if (actionType === DaoCallables.DISSOLVE_ORGANIZATION) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.DISSOLVE_ORGANIZATION](
        ...transformedPayloadDissolveOrg
      );
    }

    if (actionType === DaoCallables.REMOVE_MEMBERS) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.REMOVE_MEMBERS](
        ...transformedPayloadRemoveMembers
      );
    }

    if (actionType === DaoCallables.REMOVE_TASKS) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.REMOVE_TASKS](
        ...transformedPayloadRemoveTasks
      );
    }

    const transactionResponseHandler = (res: any) => {
      const callStatus = res.status;

      if (callStatus?.isFinalized) {
        // TODO: make a call to repopulate state with latest changes from the blockchain;
      }

      if (callStatus?.isInBlock) {
        setLoading({ type: LoadingTypes.DAO, value: false, message: createLoadingMessage() });
        createSnackbarMessage(enqueueSnackbar, MessageTiming.FINAL, Pallets.DAO, actionType)
      }
    };

    const transactionErrorHandler = (err: any) => {
      // @TODO
      console.log('Error handler message', err);
    };

    const unsub = await txExecute
      .signAndSend(fromAcct, transactionResponseHandler)
      .catch(transactionErrorHandler);

    setUnsub(() => unsub);
  };

  const daoAction = async (actionType: ActionType, payload: any, enqueueSnackbar: Function) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
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
    // addTaskToOrganization
  };
};

export { useDao };
