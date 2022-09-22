import * as Yup from 'yup';
import merge from 'lodash/merge';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Button, DialogActions, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { FormProvider, RHFTextField } from '../../hook-form';
import { Pallets, TaskCallables } from 'src/types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

// ----------------------------------------------------------------------

type TaskForm = {
  title: string;
  specification: string;
  budget: string;
  deadline: string;
  attachments: string;
  keywords: string;
};

const getInitialValues = (taskForm: TaskForm | FormValuesProps | null) => {
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
  deadline: string | Date;
  attachments: string;
  keywords: string;
};

type Props = {
  taskForm: TaskForm;
  taskIdForEdit?: string;
  onCancel: VoidFunction;
  actionCb: (palletType: Pallets, actionType: TaskCallables, payload: any) => void;
};

export default function CreateUpdateTaskForm({
  taskForm,
  taskIdForEdit,
  onCancel,
  actionCb,
}: Props) {
  const taskFormEdit: FormValuesProps = {
    ...taskForm,
    deadline: dayjs(taskForm.deadline, 'DD-MM-YYYY hh:mm a').toDate(),
  };

  const taskFormInit: FormValuesProps = {
    title: '',
    specification: '',
    budget: '',
    deadline: dayjs().toDate(),
    attachments: '',
    keywords: '',
  };

  const TaskSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    specification: Yup.string().max(1000),
  });

  const methods = useForm({
    resolver: yupResolver(TaskSchema),
    defaultValues: taskIdForEdit ? getInitialValues(taskFormEdit) : getInitialValues(taskFormInit),
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = methods;

  const onSubmit = (data: FormValuesProps) => {
    if (taskIdForEdit) {
      const deadlineDateUnix = dayjs(data.deadline).valueOf();
      const updatedTask = {
        taskId: taskIdForEdit,
        title: data.title,
        specification: data.specification,
        budget: data.budget,
        deadline: deadlineDateUnix,
        attachments: data.attachments,
        keywords: data.keywords,
      };
      actionCb(Pallets.TASK, TaskCallables.UPDATE_TASK, updatedTask);
    } else {
      const deadlineDateUnix = dayjs(data.deadline).valueOf();

      const newTask = {
        title: data.title,
        specification: data.specification,
        budget: data.budget,
        deadline: deadlineDateUnix,
        attachments: data.attachments,
        keywords: data.keywords,
      };
      actionCb(Pallets.TASK, TaskCallables.CREATE_TASK, newTask);
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

        <Controller
          name="deadline"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              label="Deadline"
              inputFormat="dd-MM-yyyy hh:mm a"
              renderInput={(params: any) => <TextField {...params} fullWidth />}
              disablePast
            />
          )}
        />

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
