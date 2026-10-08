import React from "react";
import { Button, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useBooking } from "../context/BookingContext";
import { useNavigate, useParams } from "react-router-dom";
import { routes,buses,trips } from "../data/mockData";

export default function TicketPage(){
 const {booking,bookings,resetBooking}=useBooking(); const {bookingId}=useParams(); const navigate=useNavigate();
 const b=booking.bookingSummary?.reference===bookingId?booking.bookingSummary:bookings.find(x=>x.reference===bookingId);
 if(!b) return <Container sx={{py:5}}>Ticket not found.</Container>;
 const trip=trips.find(x=>x.id===b.tripId), route=routes.find(x=>x.id===b.routeId), bus=buses.find(x=>x.id===b.busId);
 return <Container sx={{py:5}}><Stack direction="row" justifyContent="space-between" sx={{mb:3}}><Typography variant="h4">Digital ticket</Typography><Button className="no-print" startIcon={<PrintIcon/>} onClick={()=>window.print()}>Print</Button></Stack>
 <Paper className="ticket-paper"><Stack direction="row" alignItems="center" spacing={1}><ConfirmationNumberIcon color="primary"/><Typography variant="h5">RwandaRide</Typography></Stack><Divider sx={{my:3}}/>
 <Grid container spacing={3}><Grid size={{xs:12,md:6}}><Typography color="text.secondary">Ticket number</Typography><Typography variant="h6">{b.ticketNumber||`TKT-2026-${b.reference.slice(-4)}`}</Typography><Typography color="text.secondary" sx={{mt:2}}>Booking reference</Typography><Typography variant="h6">{b.reference}</Typography><Typography color="text.secondary" sx={{mt:2}}>Passenger(s)</Typography>{b.passengers.map((p,i)=><Typography key={i}>{p.fullName} · Seat {b.seats[i]}</Typography>)}</Grid>
 <Grid size={{xs:12,md:6}}><Typography color="text.secondary">Route</Typography><Typography variant="h6">{route?.from} → {route?.to}</Typography><Typography sx={{mt:1}}>{trip?.date} · {trip?.departure}–{trip?.arrival}</Typography><Typography sx={{mt:1}}>Bus: {bus?.name} · {bus?.type}</Typography><Typography sx={{mt:1}}>Price: {b.total.toLocaleString()} RWF</Typography><Typography sx={{mt:1}}>Payment: {b.paymentStatus}</Typography><Typography sx={{mt:1}}>Payment reference: {b.paymentReference}</Typography></Grid></Grid>
 <Divider sx={{my:3}}/><Stack direction="row" spacing={1} className="no-print"><Button variant="contained" onClick={()=>{resetBooking();navigate("/bookings")}}>Save & View My Bookings</Button><Button onClick={()=>navigate("/")}>Book another trip</Button></Stack>
 </Paper></Container>
}