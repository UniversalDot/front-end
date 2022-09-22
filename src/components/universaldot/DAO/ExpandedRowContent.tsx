import { useState, useEffect } from 'react';
// @mui
import { Box, Card, Button, Typography, Stack, DialogTitle } from '@mui/material';
import { DaoCallables } from '../../../types';
//hooks
import { useDao } from '../../../hooks/universaldot';
// components
import Iconify from '../../Iconify';
import { DialogAnimate } from '../../animate';
import { Select } from '.';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

type Props = {
  data: {
    organizationId: string;
    description: string;
    vision: string;
    createdAt: string;
    lastUpdatedAt: string;
    daoActions: {
      id: DaoCallables;
      label: string;
      cb: () => void;
    }[];
  };
};

export default function ExpandedRowContent({
  data: { organizationId, description, vision, createdAt, lastUpdatedAt, daoActions },
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedDaoLabel, setSelectedDaoLabel] = useState<string>('');
  const [selectedDaoId, setSelectedDaoId] = useState<DaoCallables | null>(null);

  const { getApplicantsToOrganization, applicantsToOrganization } = useDao();

  const [selectedOption, setSelectedOption] = useState('');
  const [selectOptions, setSelectOptions] = useState<any[]>([]);

  // @TODO: refactor to separate component and call this only when clicking Add Members button in expanded row, and disable modal options and action until data is present;
  // useEffect(() => {
  //   if (organizationId) {
  //     getApplicantsToOrganization(
  //       organizationId,
  //       DaoCallables.APPLICANTS_TO_ORGANIZATION,
  //       enqueueSnackbar
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [organizationId]);

  useEffect(() => {
    if (applicantsToOrganization?.length > 0) {
      const mappedOptions = applicantsToOrganization.map(
        (applicantToOrganization: any) => applicantToOrganization.name
      );
      setSelectOptions(mappedOptions);
    }
  }, [applicantsToOrganization]);

  const onOptionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);

    // const applicantName = applicantsToOrganization.find(
    //   (applicant: any) => applicant.name === event.target.value
    // ).id;
  };

  return (
    <>
      <Box pt="2rem" pb="2rem">
        <Card sx={{ p: 3 }}>
          {/* <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
          Your Plan
        </Typography> */}
          <Box display="flex" maxWidth="80%">
            <Stack spacing={3} flex="1">
              <Box>
                <Typography variant="h6">Description</Typography>
                <Typography>{description}</Typography>
              </Box>
              <Box>
                <Typography variant="h6">Vision</Typography>
                <Typography>{vision}</Typography>
              </Box>
            </Stack>

            <Stack spacing={3} flex="1">
              <Box>
                <Typography variant="h6">Created At</Typography>
                <Typography>{createdAt}</Typography>
              </Box>
              <Box>
                <Typography variant="h6">Last Updated At</Typography>
                <Typography>{lastUpdatedAt}</Typography>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              mt: { xs: 2, sm: 0 },
              position: { sm: 'absolute' },
              top: { sm: 24 },
              right: { sm: 24 },
            }}
          >
            {/* <Button size="small" variant="outlined" sx={{ mr: 1 }}>
            Add Member
          </Button>
          <Button size="small" variant="outlined" sx={{ mr: 1 }}>
            Add vision
          </Button> */}
            {daoActions?.map((daoAction, index) => (
              <Button
                key={daoAction.id}
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'} />}
                sx={{ mr: index < daoActions.length - 1 ? 1 : 0 }}
                onClick={() => {
                  setIsOpenModal(true);
                  setSelectedDaoLabel(daoAction.label);
                  setSelectedDaoId(daoAction.id);
                }}
              >
                {daoAction.label}
              </Button>
            ))}
            {/* <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />} sx={{ mr: 1 }}>
            Add member
          </Button>
          <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />} sx={{ mr: 1 }}>
            Add vision
          </Button>
          <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
            Add task
          </Button> */}
          </Box>
        </Card>
      </Box>
      <DialogAnimate open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <DialogTitle>{selectedDaoLabel}</DialogTitle>
        <Box p="1.5rem">
          {selectedDaoId === DaoCallables.ADD_TASKS && (
            <Box display="flex" alignItems="center" width="100%">
              <Typography> Form goes here..</Typography>
            </Box>
          )}

          {selectedDaoId === DaoCallables.ADD_MEMBERS && (
            <Box display="flex" alignItems="center" width="100%">
              <Select
                options={selectOptions}
                selectedOption={selectedOption}
                onOptionSelect={onOptionSelect}
                disabled={applicantsToOrganization?.length === 0}
              />
              <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'} />}
                disabled={!selectedOption}
              >
                Accept member
              </Button>
            </Box>
          )}
        </Box>
      </DialogAnimate>
    </>
  );
}
