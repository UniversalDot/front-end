import { Stack, TextField, MenuItem } from '@mui/material';
// components
// ----------------------------------------------------------------------

type Props = {
  options: string[];
  selectedOption: string;
  onOptionSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Select({ selectedOption, onOptionSelect, options }: Props) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        select
        label="Select"
        value={selectedOption}
        onChange={onOptionSelect}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
