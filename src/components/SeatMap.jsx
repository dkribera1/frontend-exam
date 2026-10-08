import React from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { useBooking } from "../context/BookingContext";

export default function SeatMap() {
  const {booking,seatData,toggleSeat}=useBooking();
  const bus=booking.selectedBus;
  if(!bus) return null;
  const seats=seatData.filter(s=>s.busId===bus.id);
  const getStatus=(n)=>seats.find(s=>s.number===n)?.status || "available";
  return <Box>
    <Typography variant="h6" sx={{mb:1}}>Choose your seats</Typography>
    <Stack direction="row" spacing={1} sx={{mb:2,flexWrap:"wrap"}}>
      <Chip icon={<EventSeatIcon/>} label="Available" variant="outlined"/>
      <Chip label="Selected" color="primary"/>
      <Chip label="Occupied" color="error"/>
      <Chip label="Reserved" color="warning"/>
    </Stack>
    <Box className="seat-grid">
      {Array.from({length:bus.capacity},(_,i)=>{
        const n=i+1, status=getStatus(n), selected=booking.selectedSeats.includes(n);
        const disabled=status!=="available" || (!selected && booking.selectedSeats.length >= (booking.passengerCount||1));
        return <Button key={n} className="seat" disabled={disabled} onClick={()=>toggleSeat(n)}
          variant={selected?"contained":"outlined"} color={selected?"primary":status==="occupied"?"error":status==="reserved"?"warning":"inherit"}
          title={`${status} seat ${n}`}>{String(n).padStart(2,"0")}</Button>
      })}
    </Box>
    <Typography sx={{mt:2}} color="text.secondary">
      Selected: {booking.selectedSeats.length ? booking.selectedSeats.join(", ") : "None"} · {booking.selectedSeats.length}/{booking.passengerCount||1}
    </Typography>
  </Box>
}