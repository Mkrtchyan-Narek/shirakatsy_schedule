import { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Schedule from './components/Schedule';
import SubjectModalDialog from './components/SubjectModal';

export default function App() {
  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() - 1);

  const handleSubmitSchedule = (period, day) => {
    setSelectedPeriod(period);
    setSelectedDay(day);
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
        position="static"
        elevation={6}
        onClick={() => setSubjectModalOpen(true)}
        sx={{
          background: 'linear-gradient(135deg, #26b8b8, #1ea0a0)',
          borderRadius: 2,
          cursor: 'pointer',
        }}
      >
        <Toolbar sx={{ minHeight: 72, justifyContent: 'center' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              letterSpacing: 1.5,
              opacity: 0.85,
            }}
          >
            Change Period
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Schedule
          selectedPeriod={selectedPeriod}
          selectedDay={selectedDay}
        />
      </Container>

      <SubjectModalDialog
        open={subjectModalOpen}
        onClose={() => setSubjectModalOpen(false)}
        selectedPeriod={selectedPeriod}
        selectedDay={selectedDay}
        handleSubmit={handleSubmitSchedule}
      />
    </Box>
  );
}
