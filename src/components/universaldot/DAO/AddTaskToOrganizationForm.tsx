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

type AddTaskToOrgForm = {
  organizationId: string;
  taskId: string;
};

const getInitialValues = (form: AddTaskToOrgForm | null) => {
  const _form = {
    organizationId: '',
    taskId: '',
  };

  if (form) {
    return merge({}, _form, form);
  }

  return _form;
};

// ----------------------------------------------------------------------

type FormValuesProps = {
  organizationId: string;
  taskId: string;
};

type Props = {
  form: AddTaskToOrgForm;
  onCancel: VoidFunction;
  actionCb: (palletType: Pallets, actionType: DaoCallables, payload: any) => void;
};

export default function AddTaskToOrganizationForm({ form, onCancel, actionCb }: Props) {
  const FormSchema = Yup.object().shape({
    organizationId: Yup.string().max(255).required('Title is required'),
    taskId: Yup.string().max(1000).required('Title is required'),
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
      const payload = [data.organizationId, data.taskId];
      actionCb(Pallets.DAO, DaoCallables.ADD_TASKS, payload);
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDelete = async () => {
  //   if (!taskForm.title) return;
  //   try {
  //     onCancel();
  //     dispatch(resetTaskForm());
  //     enqueueSnackbar('Delete success!');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const values = watch();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="organizationId" label="Organization ID" />

        <RHFTextField name="taskId" label="Task ID" />
      </Stack>

      <DialogActions>
        {/* {!isCreating && (
          <Tooltip title="Delete Event">
            <IconButton onClick={handleDelete}>
              <Iconify icon="eva:trash-2-outline" width={20} height={20} />
            </IconButton>
          </Tooltip>
        )} */}
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Add
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
