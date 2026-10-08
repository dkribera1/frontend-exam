import React from "react";
import { Alert, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useBooking } from "../context/BookingContext";
import SeatMap from "../components/SeatMap";
import { useNavigate } from "react-router-dom";

export default function SeatPage() {
  const {booking,setBooking}=useBooking(); const navigate=useNavigate();
  if(!booking.selectedTrip) return <Container sx={{py:6}}><Alert severity="info">Please select a trip first.</Alert><Button sx={{mt:2}} onClick={()=>navigate("/")}>Back to search</Button></Container>;
  return <Container sx={{py:5}}><Typography variant="h4" sx={{mb:3}}>Select your bus & seats</Typography>
    <Grid container spacing={3}>
      <Grid size={{xs:12,md:7}}><Paper sx={{p:3}}><SeatMap/></Paper></Grid>
      <Grid size={{xs:12,md:5}}><Paper sx={{p:3}}>
        <Typography variant="h6">{booking.selectedRoute.from} → {booking.selectedRoute.to}</Typography>
        <Typography color="text.secondary">{booking.selectedTrip.date} · {booking.selectedTrip.departure} · {booking.selectedBus.name}</Typography>
        <Typography sx={{mt:2}}>Passenger count</Typography>
        <Stack direction="row" spacing={1} sx={{mt:1}}>
          {[1,2,3,4].map(n=><Button key={n} variant={booking.passengerCount===n?"contained":"outlined"} onClick={()=>setBooking(b=>({...b,passengerCount:n,selectedSeats:[]}))}>{n}</Button>)}
        </Stack>
        <Button fullWidth sx={{mt:3}} variant="contained" endIcon={<ArrowForwardIcon/>} disabled={booking.selectedSeats.length!== (booking.passengerCount||1)} onClick={()=>navigate("/booking/passengers")}>Continue</Button>
      </Paper></Grid>
    </Grid>
  </Container>
}