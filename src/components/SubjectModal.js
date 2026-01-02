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
  mb: 2,
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  borderRadius: 2,
  '& .MuiInputLabel-root': {
    color: '#555',
    fontSize: 16,
  },
  '& .MuiSelect-select': {
    padding: '16px 20px',
    fontSize: 16,
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
    fontSize: 28,
  },
};

export default function ModalDialog({ open, onClose, handleSubmit, selectedPeriod, selectedDay }) {
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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3},
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: 18 }}>
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
            {PERIODS.map((p) => (
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

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 3,
            bgcolor: '#26b8b8',
            '&:hover': { bgcolor: '#1ea0a0' },
          }}
        >
          Save
        </Button>
        <Button
          onClick={onClose}
          sx={{ borderRadius: 2, bgcolor: '#ffffff' }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
