import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { buses, initialSeats, mockBookings, routes, trips } from "../data/mockData";

const BookingContext = createContext(null);
const load = (key, fallback) => {
  try { const v=localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};

export function BookingProvider({children}) {
  const [booking, setBooking] = useState(load("rr_current_booking", {
    selectedRoute:null, selectedTrip:null, selectedBus:null, selectedSeats:[],
    passengers:[], paymentMethod:"", bookingSummary:null, paymentStatus:"Pending"
  }));
  const [bookings, setBookings] = useState(load("rr_bookings", mockBookings));
  const [seatData, setSeatData] = useState(load("rr_seats", initialSeats));

  useEffect(()=>localStorage.setItem("rr_current_booking", JSON.stringify(booking)),[booking]);
  useEffect(()=>localStorage.setItem("rr_bookings", JSON.stringify(bookings)),[bookings]);
  useEffect(()=>localStorage.setItem("rr_seats", JSON.stringify(seatData)),[seatData]);

  const selectTrip = (trip) => {
    const bus=buses.find(b=>b.id===trip.busId);
    const route=routes.find(r=>r.id===trip.routeId);
    setBooking(b=>({...b,selectedTrip:trip,selectedBus:bus,selectedRoute:route,selectedSeats:[],passengers:[]}));
  };
  const toggleSeat = (seatNumber) => {
    const selected=booking.selectedSeats;
    if(selected.includes(seatNumber)) setBooking(b=>({...b,selectedSeats:selected.filter(x=>x!==seatNumber)}));
    else if(selected.length < (booking.passengerCount || 1)) setBooking(b=>({...b,selectedSeats:[...selected,seatNumber]}));
  };
  const addBooking = (newBooking) => {
    setBookings(prev=>[newBooking,...prev]);
    if(newBooking.bookingStatus==="Confirmed") {
      const ids=new Set(newBooking.seats.map(n=>`${newBooking.busId}-S${String(n).padStart(2,"0")}`));
      setSeatData(prev=>prev.map(s=>ids.has(s.id)?{...s,status:"occupied"}:s));
    }
  };
  const resetBooking = () => setBooking({
    selectedRoute:null, selectedTrip:null, selectedBus:null, selectedSeats:[],
    passengers:[], paymentMethod:"", bookingSummary:null, paymentStatus:"Pending"
  });
  const value=useMemo(()=>({booking,setBooking,bookings,setBookings,seatData,setSeatData,selectTrip,toggleSeat,addBooking,resetBooking}),[booking,bookings,seatData]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
export const useBooking=()=>useContext(BookingContext);