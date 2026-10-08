# RwandaRide — Bus Ticket Booking System

## Student
SHEMA RIBERA DiDIER

## Description
A professional frontend-only bus ticket booking simulation built with React.js, Vite, JavaScript ES6+, React Router, Material UI, MUI DataGrid, Recharts, HTML5/CSS3 and browser localStorage.

> This project is a simulation. It does not connect to a real transport company, payment provider, external API, or real ticketing system.

## Features
- Route search, filtering and clearing
- Trip and bus selection
- Visual seat map with available, selected, occupied and reserved states
- Prevents occupied/reserved seat selection
- Dynamic passenger forms
- Booking summary and calculated total
- Simulated Cash, Card, Mobile Money and Bank Transfer payment
- Generated payment reference and digital ticket
- Printable ticket
- My Bookings with search, filters and MUI DataGrid
- Booking details and cancellation
- Customer dashboard
- Recharts booking trend and popular route charts
- localStorage persistence
- Responsive desktop/tablet/mobile layout
- 10 routes, 15 buses, 300+ seats, mock passengers and 30 mock bookings

## Installation

Requirements:
- Node.js 18+ recommended
- npm

Install:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Booking workflow
Search Route → Select Trip → Select Bus/Seat → Passenger Details → Review Booking → Simulated Payment → Confirm Booking → Digital Ticket → My Bookings.

## Seat availability logic
A seat can be selected only when its state is `available`. Occupied and reserved seats are disabled. After a confirmed booking, selected seats are changed to `occupied` and saved in localStorage.

## LocalStorage keys
- `rr_current_booking`
- `rr_bookings`
- `rr_seats`

Refreshing the browser keeps simulated bookings and seat changes.

## Payment simulation
No real payment is processed. A simulated payment reference such as `PAY-2026-123456` is generated and the booking is saved with `Paid` status.

## Mock data
All routes, buses, passengers, seats and bookings are fictional.

## Screenshots
Add your final application screenshots here after running the project.

## Future improvements
- Backend/API integration for a real deployment
- Authentication
- Real database
- Real payment gateway
- Admin dashboard
- Email/SMS ticket notifications
- QR-code generation for production use
