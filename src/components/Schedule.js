import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const PERIOD_LABELS = {
  1: '1–2',
  2: '3–4',
  3: '5–6',
  4: '7–8',
  5: '9–10',
};

const ALL_PERIODS = [1, 2, 3, 4, 5];

export default function ScheduleTable({ selectedPeriod, selectedDay }) {
  const [data, setData] = useState([[], [], [], [], []]);

  const periodsToShow = selectedPeriod
    ? [selectedPeriod]
    : ALL_PERIODS;

  useEffect(() => {
    const fetchSchedule = async () => {
      const snapshot = await getDocs(collection(db, 'Schedule'));
      const parsed = snapshot.docs.map(doc =>
        JSON.parse(doc.data().schedule)
      );
      setData(parsed);
    };

    fetchSchedule();
  }, []);

  const schedule = Object.values(
    (data[selectedDay] || []).reduce((acc, { room, period, class: teacher }) => {
      if (!acc[room]) {
        acc[room] = { room, periods: {} };
      }
      acc[room].periods[period] = teacher;
      return acc;
    }, {})
  );

  return (
    <TableContainer
      component={Paper}
      elevation={4}
      sx={{
        mt: 3,
        borderRadius: 3,
        maxHeight: '70vh',
        overflow: 'auto',
      }}
    >
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#e0f7f7' }}>
            <TableCell sx={{ fontWeight: 700 }}>
              Room
            </TableCell>

            {periodsToShow.map(period => (
              <TableCell
                key={period}
                align="center"
                sx={{ fontWeight: 700 }}
              >
                {PERIOD_LABELS[period]}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {schedule.map((row, index) => (
            <TableRow
              key={row.room}
              sx={{
                backgroundColor:
                  index % 2 === 0 ? 'action.hover' : 'inherit',
                '&:hover': {
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <TableCell sx={{ fontWeight: 600 }}>
                {row.room}
              </TableCell>

              {periodsToShow.map(period => (
                <TableCell key={period} align="center">
                  {row.periods[period] || '—'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
