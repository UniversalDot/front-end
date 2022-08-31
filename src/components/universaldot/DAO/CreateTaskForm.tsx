import * as Yup from 'yup';
import merge from 'lodash/merge';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Button, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from '../../hook-form';
import { useTasks } from 'src/hooks/universaldot';
import { TaskCallables } from 'src/types';

// ----------------------------------------------------------------------

type TaskForm = {
  title: string;
  specification: string;
  budget: string;
  deadline: string;
  attachments: string;
  keywords: string;
};

const getInitialValues = (taskForm: TaskForm | null) => {
  const _taskForm = {
    title: '',
    specification: '',
    budget: '',
    deadline: '',
    attachments: '',
    keywords: '',
  };

  if (taskForm) {
    return merge({}, _taskForm, taskForm);
  }

  return _taskForm;
};

// ----------------------------------------------------------------------

type FormValuesProps = {
  title: string;
  specification: string;
  budget: string;
  deadline: string;
  attachments: string;
  keywords: string;
};

type Props = {
  taskForm: TaskForm;
  taskIdForEdit?: string;
  onCancel: VoidFunction;
};

export default function CreateTaskForm({ taskForm, taskIdForEdit, onCancel }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { taskAction } = useTasks();

  const TaskSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    specification: Yup.string().max(1000),
  });

  const methods = useForm({
    resolver: yupResolver(TaskSchema),
    defaultValues: getInitialValues(taskForm),
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: FormValuesProps) => {
    if (taskIdForEdit) {
      const updatedTask = {
        taskId: taskIdForEdit,
        title: data.title,
        specification: data.specification,
        budget: data.budget,
        deadline: data.deadline,
        attachments: data.attachments,
        keywords: data.keywords,
      };
      taskAction(TaskCallables.UPDATE_TASK, updatedTask, enqueueSnackbar);
    } else {
      const newTask = {
        title: data.title,
        specification: data.specification,
        budget: data.budget,
        deadline: data.deadline,
        attachments: data.attachments,
        keywords: data.keywords,
      };
      enqueueSnackbar('Create success!');
      taskAction(TaskCallables.CREATE_TASK, newTask, enqueueSnackbar);
    }
    onCancel();
    reset();
  };

  // @TODO: see what it is for;
  const values = watch();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="title" label="Title" />

        <RHFTextField name="specification" label="Specification" multiline rows={4} />

        <RHFTextField name="budget" label="Budget" />

        <RHFTextField name="deadline" label="Deadline" />

        <RHFTextField name="attachments" label="Attachments" />

        <RHFTextField name="keywords" label="Keywords" />
      </Stack>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          // loading={isSubmitting}
        >
          {taskIdForEdit ? 'Update' : 'Create'}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
