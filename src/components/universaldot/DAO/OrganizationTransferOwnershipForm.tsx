import * as Yup from 'yup';
import merge from 'lodash/merge';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../hook-form';
import { useDao } from 'src/hooks/universaldot';
import { DaoCallables } from 'src/types';

// ----------------------------------------------------------------------

type FormType = {
  newOwnerId: string;
};

const getInitialValues = (form: FormType | null) => {
  const _form = {
    newOwnerId: '',
  };

  if (form) {
    return merge({}, _form, form);
  }

  return _form;
};

// ----------------------------------------------------------------------

type FormValuesProps = {
  newOwnerId: string;
};

type Props = {
  form: FormType;
  onCancel: VoidFunction;
  organizationId: string;
};

export default function OrganizationTransferOwnershipForm({
  form,
  onCancel,
  organizationId,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { daoAction } = useDao();

  const FormSchema = Yup.object().shape({
    newOwnerId: Yup.string().max(255).required('Title is required'),
  });

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: getInitialValues(form),
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const payload = [organizationId, data.newOwnerId];

      daoAction(DaoCallables.TRANSFER_OWNERSHIP, payload, enqueueSnackbar);
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const values = watch();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="newOwnerId" label="New Owner ID" />
      </Stack>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Transfer ownership
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
