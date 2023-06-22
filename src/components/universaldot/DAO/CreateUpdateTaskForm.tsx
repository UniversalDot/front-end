import { useState, useEffect } from 'react';

import * as Yup from 'yup';
import merge from 'lodash/merge';
import { create } from 'ipfs-http-client';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Button, DialogActions, TextField, LinearProgress, Box } from '@mui/material';

import SvgIconStyle from 'src/components/SvgIconStyle';
import { LoadingButton } from '@mui/lab';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { FormProvider, RHFTextField } from '../../hook-form';
import { Pallets, TaskCallables } from 'src/types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import windowInstance from 'src/window';
import { API_VERSION as vsa } from '../../../config';

// console.log("config_url: ", vsa);

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

const { IPFS_URL } = windowInstance.env;
const VERSION_PATH = "/api/v0";

const ipfs = create({ url: `${IPFS_URL}${VERSION_PATH}` });

export default function CreateUpdateTaskForm({
  taskForm,
  taskIdForEdit,
  onCancel,
  actionCb,
}: Props) {
  // console.log("config_url1: ", vsa);

  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [filePath, setFilePath] = useState<string[]>([]);
  const [file, setFile] = useState<File | undefined>();
  const [fileNames, setFileNames] = useState<string>('');
  const [cids, setCids] = useState<string[]>([]);

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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {

      setFile(event.target.files[0]);
      setIsFileUploading(true);
      const files = Array.from(event.target.files);
      const fileCount = files.length;
      const URLArray: string[] = [];
      const CIDArray: string[] = [];

      let i = 0;
      let filename_string = '';
      for (const file of files) {
        const { cid } = await ipfs.add(file);
        URLArray.push(URL.createObjectURL(file));
        CIDArray.push(cid.toString());
        if(i === fileCount) {
          filename_string += file.name;
        } else {
          filename_string = filename_string + file.name + ', ';
        }
        i++;
      }
      setFileNames(filename_string);
      setFilePath(URLArray);
      setCids(CIDArray);
      setIsFileUploading(false);
      setIsFileUploaded(true);
    }  
  }

  const handleRemoveFile = () => {
    setFilePath([]);
    setIsFileUploaded(false);
    setFile(undefined);
  }

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
        attachments: JSON.stringify(cids),
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

        <RHFTextField
          name="attachments"
          label="Attachments"
          type={!file? "file": "text"}
          
          value={fileNames ?? ""}
          onChange={handleFileChange}
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            multiple: true
          }}
          InputProps={{
            endAdornment: !isFileUploading && isFileUploaded &&
              <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={handleRemoveFile}>
                <SvgIconStyle src={`/assets/icons/ic_close.svg`} sx={{ width: 15, height: 15, cursor: 'pointer'}} />
              </Box>
          }}
        />
        {
          isFileUploading && <LinearProgress />
        }
        {
          
          isFileUploaded && (
            <>
              {
                filePath.map((path: string, index: number) => {
                  return (
                    <iframe src={path} key={index} loading="lazy" />
                  )
                })
              }
            </>
          )
        }

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
