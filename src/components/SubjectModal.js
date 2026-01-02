import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const PERIODS = [0, 1, 2, 3, 4, 5];

const PERIOD_LABELS = {
  0: 'All',
  1: '1–2',
  2: '3–4',
  3: '5–6',
  4: '7–8',
  5: '9–10',
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const selectStyles = {
  mt: 2,
  mb: 3,
  backgroundColor: '#fff',
  boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
  '& .MuiInputLabel-root': {
    color: '#555',
    fontSize: 18,
  },
  '& .MuiSelect-select': {
    padding: '18px 24px',
    fontSize: 18,
    fontWeight: 500,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#b2dfdb',
    borderWidth: 2,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#26b8b8',
  },
  '& .MuiSelect-icon': {
    color: '#26b8b8',
    fontSize: 32,
  },
};

export default function ModalDialog({
  open,
  onClose,
  handleSubmit,
  selectedPeriod,
  selectedDay,
}) {
  const [period, setPeriod] = useState(selectedPeriod);
  const [day, setDay] = useState(selectedDay);

  useEffect(() => {
    if (open) {
      setPeriod(selectedPeriod);
      setDay(selectedDay);
    }
  }, [open, selectedPeriod, selectedDay]);

  const handleSave = () => {
    handleSubmit(period, day);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: 18 }}>
        Select period and day
      </DialogTitle>

      <DialogContent>
        <FormControl fullWidth sx={selectStyles}>
          <InputLabel>Period</InputLabel>
          <Select
            value={period}
            label="Period"
            onChange={(e) => setPeriod(e.target.value)}
          >
            {PERIODS.map(p => (
              <MenuItem key={p} value={p}>
                {PERIOD_LABELS[p]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={selectStyles}>
          <InputLabel>Day</InputLabel>
          <Select
            value={day}
            label="Day"
            onChange={(e) => setDay(e.target.value)}
          >
            {DAYS.map((label, index) => (
              <MenuItem key={label} value={index}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: '#26b8b8',
            '&:hover': { backgroundColor: '#1ea0a0' },
          }}
        >
          Save
        </Button>

        <Button onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
