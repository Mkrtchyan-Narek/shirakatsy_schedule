import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Schedule from './components/Schedule.js';
import SubjectModalDialog from './components/SubjectModal.js'

export default function App() {
  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
  const [mode, setMode] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  document.body.style.backgroundColor = mode ? 'white' : "#121212";
  document.body.style.color = mode ? "black" : "#e0e0e0";
  const handleSubmitSchedule = async (period) => {
    setSelectedPeriod(period)
  };
  return (
    <Box
  sx={{
    minHeight: '100vh',
    backgroundImage: `repeating-linear-gradient(
      45deg,
      #f7f9fb,
      #f7f9fb 20px,
      #eef2f6 20px,
      #eef2f6 40px
    )`,
  }}
>
      <AppBar
      onClick={() => setSubjectModalOpen(true)}
  position="static"
  elevation={6}
  sx={{
    background: 'linear-gradient(135deg, #26b8b8, #1ea0a0)',
    borderRadius: 2,
  }}
>
  <Toolbar sx={{ minHeight: 72 }}>
    <Typography
      variant="h5"
      sx={{
        flexGrow: 1,
        textAlign: 'center',
        fontWeight: 700,
        letterSpacing: 2,
      }}
    >
      <Typography
  variant="h8"
  sx={{
    fontWeight: 400,
    letterSpacing: 1,
    textTransform: 'none',
    opacity: 0.9,
  }}
>
  Change Period
</Typography>

    </Typography>
  </Toolbar>
</AppBar>

      <Container sx={{ mt: 4 }}>
        <Schedule mode={mode} selectedPeriod={selectedPeriod}></Schedule>
      </Container>
      <SubjectModalDialog
              open={subjectModalOpen}
              onClose={() => setSubjectModalOpen(false)}
              selectedPeriod={selectedPeriod}
              handleSubmit={handleSubmitSchedule}
            />
    </Box>
  );
}
