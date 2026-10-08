import React from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { useParams,useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
export default function BookingDetailsPage(){
 const {bookingId}=useParams(); const {bookings,setBookings}=useBooking(); const navigate=useNavigate();
 const b=bookings.find(x=>x.reference===bookingId);
 if(!b) return <Container sx={{py:5}}>Booking not found.</Container>;
 const cancel=()=>setBookings(prev=>prev.map(x=>x.reference===bookingId?{...x,bookingStatus:"Cancelled",paymentStatus:"Cancelled"}:x));
 return <Container sx={{py:5}}><Paper sx={{p:4}}><Typography variant="h4">{b.reference}</Typography><Typography sx={{mt:2}}>Passenger: {b.passengers?.map(p=>p.fullName).join(", ")}</Typography><Typography>Seats: {b.seats?.join(", ")}</Typography><Typography>Amount: {b.total?.toLocaleString()} RWF</Typography><Typography>Payment: {b.paymentStatus}</Typography><Typography>Booking status: {b.bookingStatus}</Typography><Button sx={{mt:3,mr:1}} variant="contained" onClick={()=>navigate(`/ticket/${b.reference}`)}>View Ticket</Button>{b.bookingStatus==="Confirmed"&&<Button sx={{mt:3}} color="error" onClick={cancel}>Cancel booking</Button>}</Paper></Container>
}