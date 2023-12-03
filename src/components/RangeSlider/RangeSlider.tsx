import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

type RangeSliderProps = {
  value: number[];
  onChange: (event: Event, newValue: number | number[]) => void;
  valueLabelDisplay: string;
  getAriaValueText: (value: number) => string;
};
const CustomSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});
function RangeSlider({
  value,
  onChange,
  valueLabelDisplay,
  getAriaValueText,
}: RangeSliderProps) {
  return (
    <div>
      <Box sx={{ width: 300 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          0 KM
          <Slider
            getAriaLabel={() => 'Distance range'}
            value={value}
            onChange={onChange}
            valueLabelDisplay={
              valueLabelDisplay as 'auto' | 'on' | 'off' | undefined
            }
            getAriaValueText={getAriaValueText}
          />
          100 KM
        </Stack>
      </Box>
      <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Distance</Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        0 KM
        <CustomSlider
          valueLabelDisplay="auto"
          getAriaLabel={() => 'Label pour le curseur'}
          defaultValue={20}
          value={value}
          onChange={onChange}
          getAriaValueText={getAriaValueText}
        />
        100 KM
      </Stack>
    </div>
  );
}

export default RangeSlider;
