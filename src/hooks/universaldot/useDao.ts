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
import dayjs from 'dayjs';

const useDao = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrateState();
  const [unsub, setUnsub] = useState<Function | null>(null);

  const { selectedKeyring } = useUser();
  const { setLoading, setLoadingCallable } = useLoader();
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

      if (orgTasks.length > 0) {
        const queryGetOrganizationTasks = async () => {
          const handleGetOrganizationTasksResponse = (results: any) => {
            const resultsAsObjectsArray = results.map((resultOption: any, index: number) => {
              const deadlineWithoutCommas = Number(resultOption.toHuman().deadline.split(',').join(''));
              const deadlineFormatted = dayjs(deadlineWithoutCommas).isValid() ? dayjs(deadlineWithoutCommas).format('DD/MM/YYYY') : deadlineWithoutCommas;
              return {
                id: orgTasks[index],
                organizationId: organizationId,
                ...resultOption.toHuman(),
                deadline: deadlineFormatted,
              }
            })

            createSnackbarMessage(enqueueSnackbar, MessageTiming.FINAL, Pallets.DAO, actionType)
            setLoading({ type: LoadingTypes.DAO, value: false, message: createLoadingMessage(LoadingTypes.DAO, actionType) });
            dispatch(
              setOrganizationTasks(resultsAsObjectsArray)
            );
          }

          const unsub = await api.query[Pallets.TASK][TaskCallables.TASKS].multi(orgTasks, (response: any) => {
            handleGetOrganizationTasksResponse(response)
          });
          const cb = () => unsub;
          cb();
        }
        queryGetOrganizationTasks()
      }

    }
  };


  const handleOrganizationsResponse = (joinedOrganizationsResponse: any, queryType: 'joined' | 'own', userKey: string) => {
    if (!joinedOrganizationsResponse.isNone) {
      const joinedOrgs: any[] = joinedOrganizationsResponse.toHuman();

      if (joinedOrgs.length > 0) {
        const queryGetOrganization = async () => {
          const handleGetOrganizationsResponse = (results: any) => {
            const resultsAsObjectsArray = results.map((resultOption: any, index: number) => ({
              id: joinedOrgs[index],
              ...resultOption.toHuman()
            }))

            if (queryType === 'joined') {
              dispatch(
                setJoinedOrganizations(resultsAsObjectsArray)
              );
            }

            if (queryType === 'own') {
              const ownOrganizationsAsObjects = resultsAsObjectsArray.filter((organization: any) => organization.owner === userKey)
              dispatch(
                setOwnOrganizations(ownOrganizationsAsObjects)
              );
            }
          }

          const unsub = await api.query[Pallets.DAO][DaoCallables.ORGANIZATIONS].multi(joinedOrgs, (response: any) => {
            handleGetOrganizationsResponse(response)
          });
          const cb = () => unsub;
          cb();
        }
        queryGetOrganization()
      }
    };
  }

  const handleMembersOfAnOrganizationResponse = async (membersResponse: any, daoType: DaoCallables.MEMBERS | DaoCallables.APPLICANTS_TO_ORGANIZATION, actionType: ActionType, enqueueSnackbar: Function) => {
    if (!membersResponse.isNone) {
      const membersOfOrganization: any[] = membersResponse.toHuman();

      if (membersOfOrganization) {
        const queryGetMemberProfile = async () => {
          const handleGetProfileResponse = (results: any) => {
            const resultsAsObjectsArray = results.map((resultOption: any) => resultOption.toHuman())

            if (resultsAsObjectsArray) {
              createSnackbarMessage(enqueueSnackbar, MessageTiming.FINAL, Pallets.DAO, actionType)
              setLoading({ type: LoadingTypes.DAO, value: false, message: createLoadingMessage(LoadingTypes.DAO, actionType) });

              if (daoType === DaoCallables.MEMBERS) {
                dispatch(
                  setMembersOfSelectedOrganization(resultsAsObjectsArray)
                );
              }

              if (daoType === DaoCallables.APPLICANTS_TO_ORGANIZATION) {
                dispatch(
                  setApplicantsToOrg(resultsAsObjectsArray)
                );
              }
            }
          }

          const unsub = await api.query[Pallets.PROFILE][ProfileCallables.PROFILES].multi(membersOfOrganization, (response: any) => {
            handleGetProfileResponse(response)
          });
          const cb = () => unsub;
          cb();
        };

        queryGetMemberProfile();
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
        // @TODO: Check this example: in my organizations if I refresh the page without going to Profile page and do some action such as update profile I get some undefined errors, possibly some other places can occur;
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

    if (actionType === DaoCallables.UPDATE_ORGANIZATION) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.UPDATE_ORGANIZATION](
        ...payload
      );
    }

    if (actionType === DaoCallables.TRANSFER_OWNERSHIP) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.TRANSFER_OWNERSHIP](
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

      if (response.status?.isFinalized) {
        // TODO: Maybe do a call to repopulate state with latest changes from the blockchain;
      }

      if (response.dispatchError) {
        const { txFailed: txFailedResult, failureText: failureTextResult } = getErrorInfo(response, api)

        txFailed = txFailedResult;
        failureText = failureTextResult;
      }

      if (response.status?.isInBlock) {
        if (actionType !== DaoCallables.ADD_MEMBERS &&
          actionType !== DaoCallables.ADD_TASKS &&
          actionType !== DaoCallables.CREATE_ORGANIZATION &&
          actionType !== DaoCallables.DISSOLVE_ORGANIZATION &&
          actionType !== DaoCallables.UPDATE_ORGANIZATION &&
          actionType !== DaoCallables.TRANSFER_OWNERSHIP &&
          actionType !== DaoCallables.REMOVE_MEMBERS &&
          actionType !== DaoCallables.REMOVE_TASKS
        ) {
          setLoading({ type: LoadingTypes.DAO, value: false, message: createLoadingMessage() });
        }

        if (actionType === DaoCallables.ADD_MEMBERS ||
          actionType === DaoCallables.ADD_TASKS ||
          actionType === DaoCallables.CREATE_ORGANIZATION ||
          actionType === DaoCallables.DISSOLVE_ORGANIZATION ||
          actionType === DaoCallables.UPDATE_ORGANIZATION ||
          actionType === DaoCallables.TRANSFER_OWNERSHIP ||
          actionType === DaoCallables.REMOVE_MEMBERS ||
          actionType === DaoCallables.REMOVE_TASKS) {
          setLoadingCallable({ type: LoadingTypes.DAO, callableType: actionType, value: false });
        }

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
      payload = [...payload]
    }

    if (actionType === DaoCallables.DISSOLVE_ORGANIZATION) {
      payload = [payload]
    }

    if (actionType === DaoCallables.UPDATE_ORGANIZATION) {
      payload = [...payload]
    }

    if (actionType === DaoCallables.TRANSFER_OWNERSHIP) {
      payload = [...payload]
    }

    if (actionType === DaoCallables.REMOVE_MEMBERS) {
      payload = [...payload]
    }

    if (actionType === DaoCallables.REMOVE_TASKS) {
      payload = [...payload]
    }

    if (actionType !== DaoCallables.ADD_MEMBERS &&
      actionType !== DaoCallables.ADD_TASKS &&
      actionType !== DaoCallables.CREATE_ORGANIZATION &&
      actionType !== DaoCallables.DISSOLVE_ORGANIZATION &&
      actionType !== DaoCallables.UPDATE_ORGANIZATION &&
      actionType !== DaoCallables.TRANSFER_OWNERSHIP &&
      actionType !== DaoCallables.REMOVE_MEMBERS &&
      actionType !== DaoCallables.REMOVE_TASKS
    ) {
      setLoading({ type: LoadingTypes.DAO, value: true, message: createLoadingMessage(LoadingTypes.DAO, actionType) });
    }

    if (actionType === DaoCallables.ADD_MEMBERS ||
      actionType === DaoCallables.ADD_TASKS ||
      actionType === DaoCallables.CREATE_ORGANIZATION ||
      actionType === DaoCallables.DISSOLVE_ORGANIZATION ||
      actionType === DaoCallables.UPDATE_ORGANIZATION ||
      actionType === DaoCallables.TRANSFER_OWNERSHIP ||
      actionType === DaoCallables.REMOVE_MEMBERS ||
      actionType === DaoCallables.REMOVE_TASKS) {
      setLoadingCallable({ type: LoadingTypes.DAO, callableType: actionType, value: true });
    }

    createSnackbarMessage(enqueueSnackbar, MessageTiming.INIT, Pallets.DAO, actionType)

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
