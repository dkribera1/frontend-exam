import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import SeatPage from "./pages/SeatPage.jsx";
import PassengersPage from "./pages/PassengersPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import TicketPage from "./pages/TicketPage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import BookingDetailsPage from "./pages/BookingDetailsPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/booking/seats" element={<SeatPage />} />
        <Route path="/booking/passengers" element={<PassengersPage />} />
        <Route path="/booking/review" element={<ReviewPage />} />
        <Route path="/booking/payment" element={<PaymentPage />} />
        <Route path="/ticket/:bookingId" element={<TicketPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route
          path="/bookings/:bookingId"
          element={<BookingDetailsPage />}
        />
      </Routes>
    </Layout>
  );
}