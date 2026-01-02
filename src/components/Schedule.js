import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase.js';

const periodLabels = {
  1: '1–2',
  2: '3–4',
  3: '5–6',
  4: '7–8',
  5: '9-10'
};

const periods = [1, 2, 3, 4, 5];

export default function ScheduleTable({ mode, selectedPeriod, selectedDay }) {
  const periodsToShow = selectedPeriod ? [selectedPeriod] : periods;
  const [data, setData] = useState([[], [], [], [], []]);
    useEffect(() => {
        (async function getData() {
            const querySnapshot = await getDocs(collection(db, 'Schedule'));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(items.map((x) => JSON.parse(x.schedule)));
        })()
    }, [])

    const schedule = Object.values(
    data[selectedDay].reduce((acc, { room, period, class: teacher }) => {
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
    overflow: 'auto',
  }}
>
  <Table size="small" stickyHeader>
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: '#e0f7f7',
        }}
      >
        <TableCell sx={{ fontWeight: 700 }}>Room</TableCell>
        {periodsToShow.map((p) => (
          <TableCell key={p} align="center" sx={{ fontWeight: 700 }}>
            {periodLabels[p]}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

    <TableBody>
      {schedule.map((row, index) => (
        <TableRow
          key={row.room}
          sx={{
            backgroundColor: index % 2 === 0 ? 'action.hover' : 'inherit',
            '&:hover': {
              backgroundColor: 'action.selected',
            },
          }}
        >
          <TableCell sx={{ fontWeight: 600 }}>{row.room}</TableCell>

          {periodsToShow.map((p) => (
            <TableCell key={p} align="center">
              {row.periods[p] || '—'}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

  );
}
