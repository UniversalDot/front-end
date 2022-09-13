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
import { Pallets, TaskCallables } from 'src/types';

// ----------------------------------------------------------------------

type RejectTaskFormType = {
  feedback: string;
};

const getInitialValues = (form: RejectTaskFormType | null) => {
  const _form = {
    feedback: '',
  };

  if (form) {
    return merge({}, _form, form);
  }

  return _form;
};

// ----------------------------------------------------------------------

type FormValuesProps = {
  feedback: string;
};

type Props = {
  form: RejectTaskFormType;
  onCancel: VoidFunction;
  taskId: string;
  actionCb: (palletType: Pallets, actionType: TaskCallables, payload: any) => void;
};

export default function RejectTaskForm({ form, onCancel, taskId, actionCb }: Props) {
  const FormSchema = Yup.object().shape({
    feedback: Yup.string().max(255).required('Title is required'),
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
      const payload = [taskId, data.feedback];
      actionCb(Pallets.TASK, TaskCallables.REJECT_TASK, payload);
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
        <RHFTextField name="feedback" label="Feedback" multiline rows={4} />
      </Stack>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Reject and send feedback
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
