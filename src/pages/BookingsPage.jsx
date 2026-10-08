import React from "react";
import { useMemo, useState } from "react";
import { Button, Chip, Container, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useBooking } from "../context/BookingContext";
import { routes,buses,trips } from "../data/mockData";
import { useNavigate } from "react-router-dom";

export default function BookingsPage(){
 const {bookings}=useBooking(); const navigate=useNavigate(); const [q,setQ]=useState(""); const [status,setStatus]=useState("");
 const rows=useMemo(()=>bookings.filter(b=>{const r=routes.find(x=>x.id===b.routeId); const p=b.passengers?.[0]?.fullName||b.passenger?.fullName||""; return (!q||b.reference.toLowerCase().includes(q.toLowerCase())||p.toLowerCase().includes(q.toLowerCase())||`${r?.from} ${r?.to}`.toLowerCase().includes(q.toLowerCase()))&&(!status||b.bookingStatus===status)}),[bookings,q,status]);
 const cols=[
  {field:"reference",headerName:"Booking",flex:1,minWidth:145},
  {field:"passenger",headerName:"Passenger",flex:1,minWidth:150,valueGetter:(_,r)=>r.passengers?.[0]?.fullName||r.passenger?.fullName||""},
  {field:"route",headerName:"Route",flex:1.2,minWidth:180,valueGetter:(_,r)=>{const x=routes.find(v=>v.id===r.routeId);return x?`${x.from} → ${x.to}`:""}},
  {field:"travelDate",headerName:"Travel date",flex:1,minWidth:120,valueGetter:(_,r)=>trips.find(t=>t.id===r.tripId)?.date||""},
  {field:"seats",headerName:"Seat",flex:.6,valueGetter:(_,r)=>r.seats?.join(", ")||""},
  {field:"total",headerName:"Amount",flex:.8,minWidth:110,valueFormatter:v=>`${Number(v).toLocaleString()} RWF`},
  {field:"bookingStatus",headerName:"Status",flex:.8,renderCell:p=><Chip size="small" label={p.value} color={p.value==="Confirmed"?"success":p.value==="Cancelled"?"error":"default"}/>},
  {field:"actions",headerName:"Action",sortable:false,width:120,renderCell:p=><Button size="small" onClick={()=>navigate(`/bookings/${p.row.reference}`)}>View</Button>}
 ];
 return <Container sx={{py:5}}><Typography variant="h4" sx={{mb:3}}>My bookings</Typography><Paper sx={{p:2}}><Stack direction={{xs:"column",md:"row"}} spacing={2} sx={{mb:2}}><TextField label="Search booking, passenger or route" value={q} onChange={e=>setQ(e.target.value)} fullWidth/><TextField select label="Status" value={status} onChange={e=>setStatus(e.target.value)} sx={{minWidth:180}}><MenuItem value="">All</MenuItem>{["Confirmed","Completed","Pending","Cancelled"].map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</TextField></Stack><DataGrid autoHeight rows={rows} columns={cols} getRowId={r=>r.reference} pageSizeOptions={[5,10]} initialState={{pagination:{paginationModel:{pageSize:10,page:0}}}} /></Paper></Container>
}