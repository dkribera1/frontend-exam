import React from "react";
import { Button, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

export default function ReviewPage(){
 const {booking}=useBooking(); const navigate=useNavigate();
 if(!booking.selectedTrip) return <Container sx={{py:5}}>No booking in progress.</Container>;
 const total=booking.selectedTrip.price*(booking.passengerCount||1);
 return <Container sx={{py:5}}><Typography variant="h4" sx={{mb:3}}>Review booking</Typography>
 <Paper sx={{p:4}}><Grid container spacing={3}>
  <Grid size={{xs:12,md:7}}><Typography variant="h6">Journey</Typography><Typography sx={{mt:1}}>{booking.selectedRoute.from} → {booking.selectedRoute.to}</Typography><Typography color="text.secondary">{booking.selectedTrip.date} · {booking.selectedTrip.departure}–{booking.selectedTrip.arrival}</Typography><Typography sx={{mt:1}}>Bus: {booking.selectedBus.name} ({booking.selectedBus.type})</Typography><Typography>Seats: {booking.selectedSeats.join(", ")}</Typography><Divider sx={{my:3}}/><Typography variant="h6">Passengers</Typography>{booking.passengers.map((p,i)=><Typography key={i}>{i+1}. {p.fullName}</Typography>)}</Grid>
  <Grid size={{xs:12,md:5}}><Paper variant="outlined" sx={{p:3}}><Typography color="text.secondary">Ticket price</Typography><Typography variant="h5">{booking.selectedTrip.price.toLocaleString()} RWF × {booking.passengerCount}</Typography><Divider sx={{my:2}}/><Typography variant="h4">{total.toLocaleString()} RWF</Typography><Button fullWidth sx={{mt:3}} variant="contained" startIcon={<PaymentIcon/>} onClick={()=>navigate("/booking/payment")}>Continue to Payment</Button><Button fullWidth sx={{mt:1}} onClick={()=>navigate("/booking/passengers")}>Modify details</Button></Paper></Grid>
 </Grid></Paper></Container>
}