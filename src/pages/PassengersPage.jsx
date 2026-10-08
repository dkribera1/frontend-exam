import React from "react";
import { useEffect } from "react";
import { Button, Container, Grid, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

const blank={fullName:"",gender:"",dob:"",phone:"",email:"",idNumber:""};
export default function PassengersPage(){
  const {booking,setBooking}=useBooking(); const navigate=useNavigate();
  const count=booking.passengerCount||1;
  useEffect(()=>{setBooking(b=>({...b,passengers:Array.from({length:count},(_,i)=>b.passengers[i]||{...blank})}))},[count]);
  if(!booking.selectedTrip) return <Container sx={{py:5}}>Select a trip first.</Container>;
  const update=(i,key,value)=>setBooking(b=>({...b,passengers:b.passengers.map((p,j)=>j===i?{...p,[key]:value}:p)}));
  const valid=booking.passengers.length===count && booking.passengers.every(p=>p.fullName&&p.gender&&p.dob&&p.phone&&p.email&&p.idNumber);
  return <Container sx={{py:5}}><Typography variant="h4" sx={{mb:3}}>Passenger details</Typography>
    {Array.from({length:count},(_,i)=><Paper key={i} sx={{p:3,mb:2}}><Typography variant="h6" sx={{mb:2}}>Passenger {i+1} · Seat {booking.selectedSeats[i]}</Typography>
      <Grid container spacing={2}>
        <Grid size={{xs:12,md:6}}><TextField fullWidth required label="Full name" value={booking.passengers[i]?.fullName||""} onChange={e=>update(i,"fullName",e.target.value)}/></Grid>
        <Grid size={{xs:12,md:3}}><TextField select fullWidth required label="Gender" value={booking.passengers[i]?.gender||""} onChange={e=>update(i,"gender",e.target.value)}><MenuItem value="Male">Male</MenuItem><MenuItem value="Female">Female</MenuItem><MenuItem value="Other">Other</MenuItem></TextField></Grid>
        <Grid size={{xs:12,md:3}}><TextField fullWidth required type="date" label="Date of birth" InputLabelProps={{shrink:true}} value={booking.passengers[i]?.dob||""} onChange={e=>update(i,"dob",e.target.value)}/></Grid>
        <Grid size={{xs:12,md:6}}><TextField fullWidth required label="Phone" value={booking.passengers[i]?.phone||""} onChange={e=>update(i,"phone",e.target.value)}/></Grid>
        <Grid size={{xs:12,md:6}}><TextField fullWidth required type="email" label="Email" value={booking.passengers[i]?.email||""} onChange={e=>update(i,"email",e.target.value)}/></Grid>
        <Grid size={{xs:12}}><TextField fullWidth required label="ID / reference number" value={booking.passengers[i]?.idNumber||""} onChange={e=>update(i,"idNumber",e.target.value)}/></Grid>
      </Grid>
    </Paper>)}
    <Stack direction="row" justifyContent="flex-end"><Button variant="contained" disabled={!valid} endIcon={<ArrowForwardIcon/>} onClick={()=>navigate("/booking/review")}>Review Booking</Button></Stack>
  </Container>
}