import { ReactElement } from 'react';
// @mui
import { Card, Typography, Box, CardProps } from '@mui/material';
// ----------------------------------------------------------------------
import MyAvatar from '../../MyAvatar';
interface Props extends CardProps {
  title: string;
  total: string;
  icon?: ReactElement;
  imageURL?: string;
}

export default function Widget({ title, total, icon, imageURL, sx, ...other }: Props) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        pl: 3,
        ...sx,
      }}
      {...other}
    >
      <Box width="60%">
        <Typography variant="h5" sx={{ wordBreak: 'break-word' }}>
          {total}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
        }}
      >
        {/* {icon} */}
        {imageURL && (
          <MyAvatar sx={{ width: '100%', height: '100%', padding: '1.5rem' }} imageURL={imageURL} />
        )}
      </Box>
    </Card>
  );
}
