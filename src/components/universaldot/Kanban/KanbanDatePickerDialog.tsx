// @mui
import { Dialog, DialogTitle, TextField, DialogActions, Button, Stack } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  startTime: Date | null;
  endTime: Date | null;
  onClose: VoidFunction;
  onChangeStartTime: (newValue: Date | null) => void;
  onChangeEndTime: (newValue: Date | null) => void;
};

export default function KanbanDatePickerDialog({
  startTime,
  endTime,
  onChangeStartTime,
  onChangeEndTime,
  open,
  onClose,
}: Props) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle> Choose due date </DialogTitle>

      <Stack spacing={2} sx={{ px: 3, mt: 3 }}>
        <DatePicker
          label="Start date"
          value={startTime}
          onChange={onChangeStartTime}
          renderInput={(params:any) => <TextField {...params} />}
        />

        <DatePicker
          label="End date"
          value={endTime}
          onChange={onChangeEndTime}
          renderInput={(params:any) => <TextField {...params} />}
        />
      </Stack>

      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
