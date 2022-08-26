/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import { useCallback, useState } from 'react';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrateState } from '../../substrate-lib';
// import {} from '../store/slices/daoSlice';
import { useUser } from './useUser';
import { useStatus } from './useStatus';
import { useLoader } from './useLoader';
import {
  statusTypes,
  Pallets,
  toastTypes,
  LoadingTypes,
  DaoCallables,
  ProfileCallables,
} from '../../types';

import {
  setTotalOrganizations,
  setTotalVisions,
  setJoinedOrganizations,
  setSuggestedVisions,
  setVisionName as setVisionNameForAnAction,
  setOrganizationName as setOrganizationNameForAnAction,
  setMemberOrTask as setMemberOrTaskForAnAction,
  setApplicants as setApplicantsToOrg,
  resetState,
  setMembersOfSelectedOrganization,
  setOwnOrganizations,
} from '../../redux/slices/daoSlice';

import { useSelector, useDispatch } from '../../redux/store';

const useDao = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrateState();
  const [unsub, setUnsub] = useState<Function | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { selectedKeyring } = useUser();
  const { setStatus, setStatusMessage } = useStatus();
  const { setLoading } = useLoader();

  const totalOrganizations = useSelector((state) => state.dao.totalOrganizations);
  const totalVisions = useSelector(state => state.dao.totalVisions);
  const joinedOrganizations = useSelector(
    state => state.dao.joinedOrganizations
  );
  const ownOrganizations = useSelector(
    state => state.dao.ownOrganizations
  );
  const suggestedVisions = useSelector(state => state.dao.suggestedVisions);
  const visionNameForAction = useSelector(
    state => state.dao.visionNameForAction
  );
  const organizationNameForAction = useSelector(
    state => state.dao.organizationNameForAction
  );
  const memberOrTaskForAction = useSelector(
    state => state.dao.memberOrTaskForAction
  );
  const allApplicants = useSelector(
    state => state.dao.applicantsToOrganization
  );

  const membersOfTheSelectedOrganization = useSelector(
    state => state.dao.membersOfSelectedOrganization
  );

  const setVisionName = (visionName: any) => {
    dispatch(setVisionNameForAnAction(visionName));
  };

  const setOrganizationName = (orgName: any) => {
    dispatch(setOrganizationNameForAnAction(orgName));
  };

  const setMemberOrTask = (memberOrTaskId: any) => {
    dispatch(setMemberOrTaskForAnAction(memberOrTaskId));
  };

  const resetFields = () => {
    dispatch(resetState());
  };

  const handleQueryResponse = (dataFromResponse: any, daoQueryType: any) => {
    if (!dataFromResponse.isNone) {
      switch (daoQueryType) {
        // TODO: wait for fixed data type from BE, mocked meanwhile:
        case DaoCallables.MEMBER_OF:
          dispatch(
            setJoinedOrganizations([
              'Organization 1',
              'Organization 2',
              'Organization 3',
            ])
          );
          break;
        case DaoCallables.ORGANIZATION_COUNT:
          dispatch(setTotalOrganizations(dataFromResponse.toHuman()));
          break;
        case DaoCallables.VISION_COUNT:
          dispatch(setTotalVisions(dataFromResponse.toHuman()));
          break;
        case DaoCallables.VISION:
          dispatch(setSuggestedVisions(dataFromResponse.toHuman()));
          break;
        case DaoCallables.APPLICANTS_TO_ORGANIZATION:
          dispatch(setApplicantsToOrg(dataFromResponse.toHuman()));
          break;
        default:
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

  const handleMembersOfAnOrganizationResponse = async (membersResponse: any) => {
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
        const filteredObjects = membersAsObjects.filter((item) => item !== 'empty')
        dispatch(
          setMembersOfSelectedOrganization(filteredObjects)
        );
      }
    }
  };

  const getApplicants = useCallback(
    organizationName => {
      const query = async () => {
        const unsub = await api?.query[Pallets.DAO][
          DaoCallables.APPLICANTS_TO_ORGANIZATION
        ](organizationName, (resData: any) =>
          handleQueryResponse(resData, DaoCallables.APPLICANTS_TO_ORGANIZATION)
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api]
  );

  const getMembersOfAnOrganization = useCallback(
    (organizationId) => {
      const query = async () => {
        const unsub = await api?.query[Pallets.DAO][DaoCallables.MEMBERS](
          organizationId,
          (response: any) => handleMembersOfAnOrganizationResponse(response)
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

  const getTotalOrganizations = useCallback(
    daoQueryType => {
      const query = async () => {
        const unsub = await api?.query[Pallets.DAO][
          DaoCallables.ORGANIZATION_COUNT
        ]((resData: any) => handleQueryResponse(resData, daoQueryType));
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api]
  );

  const getTotalVisions = useCallback(
    daoQueryType => {
      const query = async () => {
        const unsub = await api?.query[Pallets.DAO][DaoCallables.VISION_COUNT](
          (resData: any) => handleQueryResponse(resData, daoQueryType)
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api]
  );

  const getSuggestedVisions = useCallback(
    (userKey, daoQueryType) => {
      const query = async () => {
        const unsub = await api?.query[Pallets.DAO][DaoCallables.VISION](
          userKey,
          (resData: any) => handleQueryResponse(resData, daoQueryType)
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api]
  );

  const signedTx = async (actionType: string) => {
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

    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadAddMembers = [
      organizationNameForAction || '',
      memberOrTaskForAction || '',
    ];

    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadAddTasks = [
      organizationNameForAction || '',
      memberOrTaskForAction || '',
    ];

    const transformedPayloadCreateOrg = [organizationNameForAction];
    // TODO: should accept more data (title, desc, etc.) not just visionDocument;
    const transformedPayloadCreateVision = [visionNameForAction];
    // TODO: payload is orgName, but should be refactored to orgId in BE;
    const transformedPayloadDissolveOrg = [organizationNameForAction];
    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadRemoveMembers = [
      organizationNameForAction || '',
      memberOrTaskForAction || '',
    ];
    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadRemoveTasks = [
      organizationNameForAction || '',
      memberOrTaskForAction || '',
    ];
    // TODO: visionDocument should be refactored to visionId in BE;
    const transformedPayloadRemoveVision = [visionNameForAction];
    // TODO: visionDocument should be refactored to visionId in BE;
    const transformedPayloadSignVision = [visionNameForAction];
    // TODO: visionDocument should be refactored to visionId in BE;
    const transformedPayloadUnsignVision = [visionNameForAction];

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

    if (actionType === DaoCallables.CREATE_VISION) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.CREATE_VISION](
        ...transformedPayloadCreateVision
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

    if (actionType === DaoCallables.REMOVE_VISION) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.REMOVE_VISION](
        ...transformedPayloadRemoveVision
      );
    }

    if (actionType === DaoCallables.SIGN_VISION) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.SIGN_VISION](
        ...transformedPayloadSignVision
      );
    }

    if (actionType === DaoCallables.UNSIGN_VISION) {
      txExecute = api.tx[Pallets.DAO][DaoCallables.UNSIGN_VISION](
        ...transformedPayloadUnsignVision
      );
    }

    const transactionResponseHandler = (res: { status: any; }) => {
      const callStatus = res.status;

      if (callStatus?.isFinalized) {
        // TODO: make a call to repopulate state with latest changes from the blockchain;
      }

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
      //   if (actionType === DaoCallables.ADD_MEMBERS) {
      //     toast(
      //       'Member added to organization successfully!',
      //       toastTypes.SUCCESS
      //     );
      //   }

      //   if (actionType === DaoCallables.ADD_TASKS) {
      //     toast('Task added to organization successfully!', toastTypes.SUCCESS);
      //   }

      //   if (actionType === DaoCallables.CREATE_ORGANIZATION) {
      //     toast('Organization created successfully!', toastTypes.SUCCESS);
      //   }

      //   if (actionType === DaoCallables.CREATE_VISION) {
      //     toast('Vision created successfully!', toastTypes.SUCCESS);
      //   }

      //   if (actionType === DaoCallables.DISSOLVE_ORGANIZATION) {
      //     toast('Organization dissolved successfully!', toastTypes.SUCCESS);
      //   }

      //   if (actionType === DaoCallables.REMOVE_MEMBERS) {
      //     toast(
      //       'Member deleted from organization successfully!',
      //       toastTypes.SUCCESS
      //     );
      //   }

      //   if (actionType === DaoCallables.REMOVE_TASKS) {
      //     toast(
      //       'Task deleted from organization successfully!',
      //       toastTypes.SUCCESS
      //     );
      //   }

      //   if (actionType === DaoCallables.REMOVE_VISION) {
      //     toast('Vision deleted successfully!', toastTypes.SUCCESS);
      //   }

      //   if (actionType === DaoCallables.SIGN_VISION) {
      //     toast('Vision signed successfully!', toastTypes.SUCCESS);
      //   }

      //   if (actionType === DaoCallables.UNSIGN_VISION) {
      //     toast('Vision unsigned successfully!', toastTypes.SUCCESS);
      //   }
      // }

      setActionLoading(false);
      setVisionName('');
      setOrganizationName('');
      setMemberOrTask('');
    };

    const transactionErrorHandler = (err: { toString: () => any; }) => {
      setStatus(statusTypes.ERROR);
      setStatusMessage(err.toString());
    };

    const unsub = await txExecute
      .signAndSend(fromAcct, transactionResponseHandler)
      .catch(transactionErrorHandler);

    setUnsub(() => unsub);
  };

  const daoAction = async (actionType: DaoCallables) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    setStatus(statusTypes.INIT);

    // @TODO: transfer to new toast from template;
    // toast('Working on your request...', toastTypes.INFO);

    setActionLoading(true);

    signedTx(actionType);
  };

  return {
    daoAction,
    actionLoading,
    getJoinedOrganizations,
    getTotalOrganizations,
    getTotalVisions,
    getSuggestedVisions,
    totalOrganizations,
    totalVisions,
    joinedOrganizations,
    suggestedVisions,
    setVisionName,
    visionNameForAction,
    organizationNameForAction,
    memberOrTaskForAction,
    setOrganizationName,
    setMemberOrTask,
    allApplicants,
    getApplicants,
    resetFields,
    getMembersOfAnOrganization,
    membersOfTheSelectedOrganization,
    getOwnOrganizations,
    ownOrganizations
  };
};

export { useDao };
