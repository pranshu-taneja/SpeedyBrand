import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ToneSelect() {
  const [Tone, setTone] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTone(event.target.value as string);
  };

  return (
    <Box sx={{ maxWidth: 300, minwidth:100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tone</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Tone}
          label="Tone"
          onChange={handleChange}
        >
          <MenuItem value={10}>Smooth</MenuItem>
          <MenuItem value={20}>Quirky</MenuItem>
          <MenuItem value={30}>Crazy</MenuItem>
          <MenuItem value={30}>Scary</MenuItem>
          <MenuItem value={30}>Angry</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}