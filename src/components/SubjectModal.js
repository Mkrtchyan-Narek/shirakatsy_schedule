import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export default function ModalDialog({ handleSubmit, open, onClose, selectedPeriod }) {
  const [period, setPeriod] = useState(selectedPeriod);

  const periods = [0, 1, 2, 3, 4, 5];
  const periodLabels = { 0: 'All', 1: '1–2', 2: '3–4', 3: '5–6', 4: '7–8', 5: '9-10' };

  useEffect(() => {
    setPeriod(selectedPeriod);
  }, [open]);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontSize={18}>
          Select a specific period
        </Typography>
      </DialogTitle>

      <DialogContent>
        <FormControl
          fullWidth
          sx={{
            mt: 2,
            mb: 3,
            backgroundColor: '#ffffff',
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
          }}
        >
          <InputLabel>Period</InputLabel>
          <Select value={period} label="Period" onChange={handlePeriodChange}>
            {periods.map((p) => (
              <MenuItem key={p} value={p}>
                {periodLabels[p]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {handleSubmit(period); onClose()}}
          variant="contained"
          sx={{
            backgroundColor: '#26b8b8',
            '&:hover': { backgroundColor: '#1ea0a0' },
          }}
        >
          Save
        </Button>
        <Button onClick={onClose} sx={{ backgroundColor: '#ffffff' }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
