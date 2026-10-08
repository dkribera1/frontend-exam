import React from "react";
import { useState } from "react";
import { Alert, Button, Container, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

export default function PaymentPage(){
 const {booking,setBooking,addBooking}=useBooking(); const navigate=useNavigate(); const [method,setMethod]=useState("Mobile Money"); const [processing,setProcessing]=useState(false);
 if(!booking.selectedTrip) return <Container sx={{py:5}}>No booking in progress.</Container>;
 const total=booking.selectedTrip.price*(booking.passengerCount||1);
 const pay=()=>{
  setProcessing(true);
  setTimeout(()=>{
   const seq=Date.now().toString().slice(-6);
   const ref=`PAY-2026-${seq}`;
   const bookingRef=`BK-2026-${seq}`;
   const ticket=`TKT-2026-${seq}`;
   const newBooking={id:bookingRef,reference:bookingRef,ticketNumber:ticket,tripId:booking.selectedTrip.id,routeId:booking.selectedRoute.id,busId:booking.selectedBus.id,seats:booking.selectedSeats,passengers:booking.passengers,total,paymentMethod:method,paymentReference:ref,paymentStatus:"Paid",bookingStatus:"Confirmed",bookingDate:new Date().toISOString().slice(0,10)};
   addBooking(newBooking); setBooking(b=>({...b,paymentMethod:method,paymentStatus:"Paid",bookingSummary:newBooking})); setProcessing(false); navigate(`/ticket/${bookingRef}`);
  },1200);
 };
 return <Container sx={{py:5,maxWidth:"md"}}><Typography variant="h4" sx={{mb:3}}>Simulated payment</Typography><Alert severity="info" sx={{mb:2}}>This is a frontend simulation. No real money is charged.</Alert>
 <Paper sx={{p:4}}><Typography color="text.secondary">Amount to pay</Typography><Typography variant="h3" sx={{mb:3}}>{total.toLocaleString()} RWF</Typography>
 <FormControl><Typography fontWeight={700}>Payment method</Typography><RadioGroup value={method} onChange={e=>setMethod(e.target.value)}>{["Cash","Card","Mobile Money","Bank Transfer"].map(x=><FormControlLabel key={x} value={x} control={<Radio/>} label={x}/>)}</RadioGroup></FormControl>
 <Stack direction="row" justifyContent="flex-end" sx={{mt:3}}><Button variant="contained" disabled={processing} onClick={pay}>{processing?"Processing simulation...":"Pay & Confirm"}</Button></Stack>
 </Paper></Container>
}