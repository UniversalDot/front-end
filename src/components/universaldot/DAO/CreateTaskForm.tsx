import * as Yup from 'yup';
import merge from 'lodash/merge';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch } from '../../../redux/store';
// import {
//   createTaskForm,
//   updateTaskForm,
//   resetTaskForm,
//   setTaskFormIsLoading,
// } from '../../../redux/slices/daoSlice';
// components
import Iconify from '../../Iconify';
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
  onCancel: VoidFunction;
};

export default function CreateTaskForm({ taskForm, onCancel }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { taskAction } = useTasks();

  const dispatch = useDispatch();

  const isCreating = Object.keys(taskForm).length === 0;

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

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const newTask = {
        title: data.title,
        specification: data.specification,
        budget: data.budget,
        deadline: data.deadline,
        attachments: data.attachments,
        keywords: data.keywords,
      };
      if (taskForm.title) {
        // @TODO: do update later;
        // taskAction(TaskCallables.UPDATE_TASK, newTask, enqueueSnackbar);
        taskAction(TaskCallables.CREATE_TASK, newTask, enqueueSnackbar);
      } else {
        enqueueSnackbar('Create success!');
        taskAction(TaskCallables.CREATE_TASK, newTask, enqueueSnackbar);
      }
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
        <RHFTextField name="title" label="Title" />

        <RHFTextField name="specification" label="Specification" multiline rows={4} />

        <RHFTextField name="budget" label="Budget" />

        <RHFTextField name="deadline" label="Deadline" />

        <RHFTextField name="attachments" label="Attachments" />

        <RHFTextField name="keywords" label="Keywords" />
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
