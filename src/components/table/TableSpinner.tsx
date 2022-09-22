// @mui
import { Box, CircularProgress } from '@mui/material';

// ----------------------------------------------------------------------

export default function TableSpinner() {
  return (
    <Box
      sx={{
        position: 'absolute',
        background: '#ffffffa1',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
