import React from "react";
import { Button, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { buses, routes } from "../data/mockData";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

export default function TripCard({trip}) {
  const {selectTrip}=useBooking(); const navigate=useNavigate();
  const route=routes.find(r=>r.id===trip.routeId), bus=buses.find(b=>b.id===trip.busId);
  const choose=()=>{selectTrip(trip);navigate("/booking/seats");};
  return <Card className="card-hover" sx={{mb:2}}>
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{xs:12,md:3}}><Typography variant="h6">{route.from} → {route.to}</Typography><Typography color="text.secondary">{trip.date}</Typography></Grid>
        <Grid size={{xs:6,md:2}}><Typography fontWeight={700}>{trip.departure}</Typography><Typography variant="caption">Departure</Typography></Grid>
        <Grid size={{xs:6,md:2}}><Typography fontWeight={700}>{trip.arrival}</Typography><Typography variant="caption">Arrival</Typography></Grid>
        <Grid size={{xs:6,md:2}}><Stack direction="row" spacing={1} alignItems="center"><AccessTimeIcon fontSize="small"/>{trip.duration} min</Stack><Typography variant="caption">{bus.name} · {bus.type}</Typography></Grid>
        <Grid size={{xs:6,md:1}}><Typography variant="h6">{trip.price.toLocaleString()} RWF</Typography><Typography variant="caption">per ticket</Typography></Grid>
        <Grid size={{xs:12,md:2}}><Button fullWidth variant="contained" onClick={choose}>Select Trip</Button><Chip sx={{mt:1}} icon={<EventSeatIcon/>} label={`${bus.capacity} seats`} size="small"/></Grid>
      </Grid>
    </CardContent>
  </Card>
}