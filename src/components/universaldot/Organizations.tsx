/* eslint-disable multiline-ternary */
import { useEffect, useState, useCallback, SetStateAction } from 'react';
import { useUser, useDao, useStatus } from '../../hooks/universaldot';
import { daoCallables, statusTypes } from '../../types';

const Organizations = ({ type }: any) => {
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const [modalTitle, setModalTitle] = useState('');
  const [daoType, setDaoType] = useState('');
  const [isActionButtonDisabled, setIsActionButtonDisabled] = useState(false);

  const { status, setStatus } = useStatus();

  const { selectedKeyring } = useUser();
  const {
    getJoinedOrganizations,
    getTotalOrganizations,
    getTotalVisions,
    getSuggestedVisions,
    totalOrganizations,
    totalVisions,
    joinedOrganizations,
    suggestedVisions,
    actionLoading,
    daoAction,
    setVisionName,
    visionNameForAction,
    organizationNameForAction,
    memberOrTaskForAction,
    setOrganizationName,
    setMemberOrTask,
    getApplicants,
    allApplicants,
    resetFields,
  } = useDao();

  const [searchOrg, setSearchOrg] = useState('');

  const visionNameTypes = [
    daoCallables.SIGN_VISION,
    daoCallables.UNSIGN_VISION,
    daoCallables.CREATE_VISION,
    daoCallables.REMOVE_VISION,
  ];
  const orgNameTypes = [
    daoCallables.CREATE_ORGANIZATION,
    daoCallables.DISSOLVE_ORGANIZATION,
    daoCallables.ADD_MEMBERS,
    daoCallables.REMOVE_MEMBERS,
    daoCallables.ADD_TASKS,
    daoCallables.REMOVE_TASKS,
  ];
  const memberAndTaskTypes = [
    daoCallables.ADD_MEMBERS,
    daoCallables.REMOVE_MEMBERS,
    daoCallables.ADD_TASKS,
    daoCallables.REMOVE_TASKS,
  ];
  const taskTypes = [daoCallables.ADD_TASKS, daoCallables.REMOVE_TASKS];

  useEffect(() => {
    if (actionType) {
      let title = '';
      let daoType = '';
      let isButtonDisabled = false;
      switch (actionType) {
        case 'joined_sign':
          title = 'Sign vision';
          daoType = daoCallables.SIGN_VISION;

          if (!visionNameForAction) {
            isButtonDisabled = true;
          }

          break;
        case 'joined_unsign':
          title = 'Unsign vision';
          daoType = daoCallables.UNSIGN_VISION;

          if (!visionNameForAction) {
            isButtonDisabled = true;
          }

          break;
        case 'own_createVision':
          title = 'Create vision';
          daoType = daoCallables.CREATE_VISION;

          if (!visionNameForAction) {
            isButtonDisabled = true;
          }

          break;
        case 'own_createOrganization':
          title = 'Create organization';
          daoType = daoCallables.CREATE_ORGANIZATION;

          if (!organizationNameForAction) {
            isButtonDisabled = true;
          }

          break;
        case 'own_addMember':
          title = 'Add member';
          daoType = daoCallables.ADD_MEMBERS;

          if (!organizationNameForAction || !memberOrTaskForAction) {
            isButtonDisabled = true;
          }

          break;
        case 'own_addTask':
          title = 'Add task';
          daoType = daoCallables.ADD_TASKS;

          if (!organizationNameForAction || !memberOrTaskForAction) {
            isButtonDisabled = true;
          }

          break;
        case 'own_removeVision':
          title = 'Remove vision';
          daoType = daoCallables.REMOVE_VISION;

          if (!visionNameForAction) {
            isButtonDisabled = true;
          }

          break;
        case 'own_dissolveOrganization':
          title = 'Dissolve organization';
          daoType = daoCallables.DISSOLVE_ORGANIZATION;

          if (!organizationNameForAction) {
            isButtonDisabled = true;
          }

          break;
        case 'own_removeMembers':
          title = 'Remove members';
          daoType = daoCallables.REMOVE_MEMBERS;

          if (!organizationNameForAction || !memberOrTaskForAction) {
            isButtonDisabled = true;
          }

          break;
        case 'own_removeTask':
          title = 'Remove task';
          daoType = daoCallables.REMOVE_TASKS;

          if (!organizationNameForAction || !memberOrTaskForAction) {
            isButtonDisabled = true;
          }

          break;
        default:
      }
      setModalTitle(title);
      setDaoType(daoType);
      setIsActionButtonDisabled(isButtonDisabled);
    }
  }, [actionType, memberOrTaskForAction, visionNameForAction, organizationNameForAction]);

  useEffect(() => {
    if (selectedKeyring.value) {
      getJoinedOrganizations(selectedKeyring.value, daoCallables.MEMBER_OF);
      getTotalOrganizations(daoCallables.ORGANIZATION_COUNT);
      getTotalVisions(daoCallables.VISION_COUNT);
      getSuggestedVisions(selectedKeyring.value, daoCallables.VISION);
    }
  }, [
    selectedKeyring.value,
    getJoinedOrganizations,
    getTotalOrganizations,
    getTotalVisions,
    getSuggestedVisions,
  ]);

  const handleClose = useCallback(() => setOpen(false), []);

  const handleTopInputOnChange = useCallback(
    (inputType, value) => {
      switch (inputType) {
        case daoCallables.SIGN_VISION:
        case daoCallables.UNSIGN_VISION:
        case daoCallables.CREATE_VISION:
        case daoCallables.REMOVE_VISION:
          setVisionName(value);
          break;
        case daoCallables.CREATE_ORGANIZATION:
        case daoCallables.DISSOLVE_ORGANIZATION:
        case daoCallables.ADD_MEMBERS:
        case daoCallables.ADD_TASKS:
        case daoCallables.REMOVE_MEMBERS:
        case daoCallables.REMOVE_TASKS:
          setOrganizationName(value);
          break;
        case 'memberOrTask':
          setMemberOrTask(value);
          break;
        default:
      }
    },
    [setMemberOrTask, setVisionName, setOrganizationName]
  );

  const handleBottomInputOnChange = useCallback(
    (inputType, value) => {
      switch (inputType) {
        case daoCallables.CREATE_ORGANIZATION:
        case daoCallables.DISSOLVE_ORGANIZATION:
        case daoCallables.ADD_MEMBERS:
        case daoCallables.ADD_TASKS:
        case daoCallables.REMOVE_MEMBERS:
        case daoCallables.REMOVE_TASKS:
          setMemberOrTask(value);
          break;
        default:
      }
    },
    [setMemberOrTask]
  );

  const buttonClick = useCallback(
    (actionType) => {
      setActionType(actionType);
      resetFields();
      setOpen(true);
    },
    [resetFields]
  );

  useEffect(() => {
    if (!!status && status === statusTypes.INIT) {
      setShowLoader(true);
    }

    if (!!status && status === statusTypes.IN_BLOCK) {
      setShowLoader(false);
      handleClose();
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }
  }, [status, setStatus, handleClose]);

  const searchOrganization = () => {
    getApplicants(searchOrg);
  };

  const handleOnSearchOrg = (val: any) => {
    setSearchOrg(val);
  };

  return (
    <div>
      {type === 'joined' && (
        <>
          <div>Total orgs: {totalOrganizations}</div>
          <div>Total visions: {totalVisions}</div>
          <div>Joined orgs:</div>
          <div>
            {joinedOrganizations.map((org: any) => (
              <div key={org}>
                <div>title: {org?.title || 'Project: UniversalDot'}</div>
                <div>desc: {org?.description || 'xasCaWH151cx2145Cxwkqp2345pWpqz'}</div>
              </div>
            ))}
          </div>
          <div>Suggested visions:</div>
          <div>
            {suggestedVisions.map((suggVis: any) => (
              <div key={suggVis}>
                <div>title: {suggVis?.title || 'Project: UniversalDot'}</div>
                <div>desc: {suggVis?.description || 'xasCaWH151cx2145Cxwkqp2345pWpqz'}</div>
              </div>
            ))}
          </div>
        </>
      )}
      <div>
        todo: when refactoring new DAO look at old project for ideas.. this is irrelevant now from
        porting
      </div>
    </div>
  );
};

Organizations.displayName = 'Organizations';

export default Organizations;
