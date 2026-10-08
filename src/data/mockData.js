const names = [
  "Aline Mukamana","Eric Nshimiyimana","Kevin Habimana","Diane Uwase",
  "Patrick Tuyisenge","Alice Ingabire","Jean Bosco","Grace Uwamahoro",
  "Samuel Ndayisenga","Derrick Murenzi","Clarisse Mukarugwiro","Emmanuel Bizimana",
  "Olivia Irakoze","Fabrice Hakizimana","Sandrine Uwamwezi","Christian Niyonzima",
  "Esther Nyirabazungu","Brian Ishimwe","Mugisha Didier","Yves Twagirayezu"
];

export const locations = [
  "Kigali","Huye","Musanze","Rubavu","Muhanga","Rusizi","Gisenyi","Nyagatare","Kayonza","Karongi"
];

export const buses = Array.from({length:15}, (_,i)=>({
  id:`BUS-${String(i+1).padStart(3,"0")}`,
  name:`RwandaRide ${String(i+1).padStart(2,"0")}`,
  type:i%3===0?"Executive":i%3===1?"Standard":"VIP",
  capacity: i%3===0 ? 24 : 28,
  plate:`RAE ${100+i}A`,
}));

const routePairs = [
  ["Kigali","Huye"],["Kigali","Musanze"],["Kigali","Rubavu"],["Kigali","Muhanga"],
  ["Kigali","Rusizi"],["Huye","Kigali"],["Kigali","Nyagatare"],["Kigali","Kayonza"],
  ["Musanze","Rubavu"],["Muhanga","Karongi"]
];

export const routes = routePairs.map((r,i)=>({
  id:`R-${i+1}`, from:r[0], to:r[1],
  distance: 70 + i*24, basePrice: 4500 + i*700
}));

const futureDate = (offset) => {
  const d = new Date(); d.setDate(d.getDate()+offset);
  return d.toISOString().slice(0,10);
};

export const trips = Array.from({length:30}, (_,i)=>{
  const route = routes[i % routes.length];
  const bus = buses[i % buses.length];
  const hour = 6 + (i%5)*2;
  const departure = `${String(hour).padStart(2,"0")}:${i%2?"30":"00"}`;
  const [h,m] = departure.split(":").map(Number);
  const duration = 90 + (i%5)*30;
  const arr = new Date(2000,0,1,h,m+duration);
  const arrival = `${String(arr.getHours()).padStart(2,"0")}:${String(arr.getMinutes()).padStart(2,"0")}`;
  return {
    id:`TRIP-${String(i+1).padStart(3,"0")}`,
    routeId:route.id, busId:bus.id, date:futureDate(i%10),
    departure, arrival, duration,
    price:route.basePrice + (i%4)*1000,
    status:i%7===0?"Almost full":"Available"
  };
});

export const initialSeats = buses.flatMap((bus, bi) =>
  Array.from({length:bus.capacity}, (_,i)=>({
    id:`${bus.id}-S${String(i+1).padStart(2,"0")}`,
    busId:bus.id, number:i+1,
    status: (i+bi*3)%17===0 ? "reserved" : ((i+bi)%13===0 ? "occupied":"available")
  }))
);

export const mockPassengers = names.map((name,i)=>({
  id:`P-${i+1}`, fullName:name, gender:i%2?"Female":"Male",
  dob:`19${85+i%12}-0${(i%9)+1}-${String((i%27)+1).padStart(2,"0")}`,
  phone:`+250 78${String(100000+i).slice(-6)}`,
  email:`passenger${i+1}@example.com`,
  idNumber:`ID${2026000+i}`
}));

export const mockBookings = Array.from({length:30}, (_,i)=>{
  const trip=trips[i%trips.length], bus=buses.find(b=>b.id===trip.busId), route=routes.find(r=>r.id===trip.routeId);
  const p=mockPassengers[i%mockPassengers.length];
  const status=i%9===0?"Cancelled":i%4===0?"Completed":"Confirmed";
  return {
    id:`BK-2026-${String(i+1).padStart(4,"0")}`,
    reference:`BK-2026-${String(i+1).padStart(4,"0")}`,
    tripId:trip.id, routeId:route.id, busId:bus.id,
    passenger:p, seats:[(i%bus.capacity)+1], passengers:[p],
    total:trip.price, paymentMethod:i%2?"Mobile Money":"Card",
    paymentStatus:status==="Cancelled"?"Cancelled":"Paid",
    bookingStatus:status,
    bookingDate:futureDate(-(i%20))
  };
});