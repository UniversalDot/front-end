import * as Yup from 'yup';
import merge from 'lodash/merge';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../hook-form';
import { Pallets, DaoCallables } from 'src/types';

// ----------------------------------------------------------------------

type FormType = {
  name: string;
  description: string;
  vision: string;
};

const getInitialValues = (form: FormType | null) => {
  const _form = {
    name: '',
    description: '',
    vision: '',
  };

  if (form) {
    return merge({}, _form, form);
  }

  return _form;
};

// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string;
  description: string;
  vision: string;
};

type Props = {
  form: FormType;
  onCancel: VoidFunction;
  organizationId?: string;
  actionCb: (palletType: Pallets, actionType: DaoCallables, payload: any) => void;
};

export default function OrganizationCreateAndUpdateForm({
  form,
  onCancel,
  organizationId,
  actionCb,
}: Props) {
  const FormSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Name is required'),
    description: Yup.string().max(255).required('Description is required'),
    vision: Yup.string().max(255).required('Vision is required'),
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
      if (organizationId) {
        const payload = [organizationId, data.name, data.description, data.vision];
        actionCb(Pallets.DAO, DaoCallables.UPDATE_ORGANIZATION, payload);
      } else {
        const payload = [data.name, data.description, data.vision];
        actionCb(Pallets.DAO, DaoCallables.CREATE_ORGANIZATION, payload);
      }
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
        <RHFTextField name="name" label="Name" />
        <RHFTextField name="description" label="Description" />
        <RHFTextField name="vision" label="Vision" />
      </Stack>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {organizationId ? 'Update organization' : 'Create organization'}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
