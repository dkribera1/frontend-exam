import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SecurityIcon from "@mui/icons-material/Security";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExploreIcon from "@mui/icons-material/Explore";
import StarIcon from "@mui/icons-material/Star";

import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const navigate = useNavigate();

  const [departure, setDeparture] = useState("Kigali");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const cities = [
    "Kigali",
    "Huye",
    "Musanze",
    "Rubavu",
    "Muhanga",
    "Rusizi",
    "Nyagatare",
    "Kayonza",
  ];

  const popularRoutes = [
    {
      from: "Kigali",
      to: "Musanze",
      description: "Explore the beautiful Northern Province.",
      icon: "🏔️",
      color: "#eef4ff",
    },
    {
      from: "Kigali",
      to: "Rubavu",
      description: "Travel towards beautiful Lake Kivu.",
      icon: "🌊",
      color: "#ecfeff",
    },
    {
      from: "Kigali",
      to: "Huye",
      description: "Discover the heart of Southern Rwanda.",
      icon: "🌿",
      color: "#ecfdf3",
    },
    {
      from: "Kigali",
      to: "Rusizi",
      description: "Journey towards the southwest.",
      icon: "🌅",
      color: "#fff7ed",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Search",
      description: "Choose your destination.",
      icon: <SearchIcon />,
    },
    {
      number: "02",
      title: "Choose",
      description: "Select your preferred seat.",
      icon: <EventSeatIcon />,
    },
    {
      number: "03",
      title: "Book",
      description: "Enter your passenger details.",
      icon: <ConfirmationNumberIcon />,
    },
    {
      number: "04",
      title: "Travel",
      description: "Get your digital ticket.",
      icon: <DirectionsBusIcon />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((previous) => (previous + 1) % steps.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const handleSwap = () => {
    if (!destination) return;

    const oldDeparture = departure;

    setDeparture(destination);
    setDestination(oldDeparture);
  };

  const handleSearch = () => {
    if (!destination || !travelDate) return;

    navigate("/booking/seats", {
      state: {
        departure,
        destination,
        travelDate,
      },
    });
  };

  const handlePopularRoute = (route) => {
    setDeparture(route.from);
    setDestination(route.to);
    setSelectedRoute(route.to);

    setTimeout(() => {
      document
        .getElementById("booking-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 100);
  };

  const scrollToBooking = () => {
    document
      .getElementById("booking-form")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };

  return (
    <Box className="interactive-search-page">
      {/* ================= HERO ================= */}

      <Box
        className={`premium-hero ${
          scrolled ? "hero-scrolled" : ""
        }`}
      >
        {/* Background effects */}
        <Box className="hero-orb hero-orb-one" />
        <Box className="hero-orb hero-orb-two" />
        <Box className="hero-grid" />

        <Box className="floating-shape shape-one">✦</Box>
        <Box className="floating-shape shape-two">+</Box>
        <Box className="floating-shape shape-three">✦</Box>

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 5,
          }}
        >
          {/* Hero text */}

          <Box className="hero-copy">
            <Chip
              icon={<ExploreIcon />}
              label="EXPLORE RWANDA WITH EASE"
              className="hero-badge"
            />

            <Typography
              component="h1"
              className="premium-title"
            >
              Your journey
              <br />
              <span className="title-gradient">
                starts here.
              </span>
            </Typography>

            <Typography className="premium-description">
              Discover Rwanda one destination at a time.
              Find your bus, choose your seat, and book
              your journey in just a few clicks.
            </Typography>

            {/* Trust */}

            <Stack
              direction="row"
              spacing={2}
              className="trust-row"
            >
              <Box className="trust-item">
                <Box className="trust-icon">
                  <SecurityIcon />
                </Box>

                <Box>
                  <Typography>Secure</Typography>
                  <small>Safe booking</small>
                </Box>
              </Box>

              <Box className="trust-item">
                <Box className="trust-icon">
                  <AccessTimeIcon />
                </Box>

                <Box>
                  <Typography>Simple</Typography>
                  <small>Fast booking</small>
                </Box>
              </Box>

              <Box className="trust-item">
                <Box className="trust-icon">
                  <StarIcon />
                </Box>

                <Box>
                  <Typography>Easy</Typography>
                  <small>Smooth experience</small>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* ================= MOVING BUS ================= */}

          <Box className="road-animation">
            <Box className="mountain mountain-one" />
            <Box className="mountain mountain-two" />

            <Box className="road">
              <Box className="road-line line-one" />
              <Box className="road-line line-two" />
              <Box className="road-line line-three" />

              <Box className="moving-bus">
                <Box className="bus-glow" />

                <DirectionsBusIcon
                  sx={{
                    fontSize: {
                      xs: 65,
                      sm: 85,
                      md: 110,
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* ================= SEARCH CARD ================= */}

          <Paper
            id="booking-form"
            className="premium-search-card"
            elevation={0}
          >
            <Box className="search-card-heading">
              <Box>
                <Typography className="search-card-title">
                  Where are you going?
                </Typography>

                <Typography className="search-card-subtitle">
                  Find your perfect journey across Rwanda.
                </Typography>
              </Box>

              <Box className="search-card-icon">
                <DirectionsBusIcon />
              </Box>
            </Box>

            <Box className="search-fields">
              {/* FROM */}

              <Box className="premium-field">
                <LocationOnIcon />

                <TextField
                  select
                  fullWidth
                  label="From"
                  value={departure}
                  onChange={(event) =>
                    setDeparture(event.target.value)
                  }
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                >
                  {cities.map((city) => (
                    <MenuItem
                      value={city}
                      key={city}
                    >
                      {city}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* SWAP */}

              <IconButton
                onClick={handleSwap}
                className="swap-button"
                aria-label="Swap locations"
              >
                <SwapHorizIcon />
              </IconButton>

              {/* TO */}

              <Box className="premium-field">
                <ExploreIcon />

                <TextField
                  select
                  fullWidth
                  label="To"
                  value={destination}
                  onChange={(event) => {
                    setDestination(event.target.value);
                    setSelectedRoute(event.target.value);
                  }}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                >
                  <MenuItem value="">
                    Select destination
                  </MenuItem>

                  {cities
                    .filter((city) => city !== departure)
                    .map((city) => (
                      <MenuItem
                        value={city}
                        key={city}
                      >
                        {city}
                      </MenuItem>
                    ))}
                </TextField>
              </Box>

              {/* DATE */}

              <Box className="premium-field">
                <CalendarMonthIcon />

                <TextField
                  fullWidth
                  label="Travel date"
                  type="date"
                  value={travelDate}
                  onChange={(event) =>
                    setTravelDate(event.target.value)
                  }
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: today,
                  }}
                />
              </Box>

              {/* SEARCH */}

              <Button
                onClick={handleSearch}
                disabled={!destination || !travelDate}
                className="premium-search-button"
                endIcon={<ArrowForwardIcon />}
              >
                Search Bus
              </Button>
            </Box>

            {selectedRoute && (
              <Box className="route-selected-message">
                <span>✓</span>

                <Typography>
                  Great choice!{" "}
                  <strong>{departure}</strong> →{" "}
                  <strong>{destination}</strong> is ready.
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>

        {/* Scroll indicator */}

        <Box
          className="scroll-indicator"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        >
          <Typography>Discover more</Typography>
          <KeyboardArrowDownIcon />
        </Box>
      </Box>

      {/* ================= POPULAR ROUTES ================= */}

      <Box className="section-white">
        <Container maxWidth="xl">
          <Box className="section-heading">
            <Chip
              label="POPULAR ROUTES"
              className="section-chip"
            />

            <Typography
              component="h2"
              className="section-title"
            >
              Where will you go next?
            </Typography>

            <Typography className="section-description">
              Explore some of Rwanda's most popular
              destinations.
            </Typography>
          </Box>

          <Box className="routes-grid">
            {popularRoutes.map((route, index) => (
              <Paper
                key={route.to}
                className="route-card"
                elevation={0}
                onClick={() => handlePopularRoute(route)}
                sx={{
                  animationDelay: `${index * 120}ms`,
                }}
              >
                <Box
                  className="route-card-top"
                  sx={{
                    backgroundColor: route.color,
                  }}
                >
                  <Typography className="route-emoji">
                    {route.icon}
                  </Typography>

                  <ArrowForwardIcon />
                </Box>

                <Box className="route-card-content">
                  <Typography className="route-from">
                    {route.from}
                  </Typography>

                  <Typography className="route-to">
                    {route.to}
                  </Typography>

                  <Typography className="route-description">
                    {route.description}
                  </Typography>

                  <Button
                    endIcon={<ArrowForwardIcon />}
                    className="route-explore-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handlePopularRoute(route);
                    }}
                  >
                    Explore route
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ================= STATS ================= */}

      <Box className="stats-section">
        <Container maxWidth="xl">
          <Box className="stats-grid">
            <Stat
              number="8+"
              label="Destinations"
              icon={<ExploreIcon />}
            />

            <Stat
              number="24/7"
              label="Booking Access"
              icon={<AccessTimeIcon />}
            />

            <Stat
              number="100%"
              label="Digital Experience"
              icon={<ConfirmationNumberIcon />}
            />

            <Stat
              number="1"
              label="Simple Platform"
              icon={<DirectionsBusIcon />}
            />
          </Box>
        </Container>
      </Box>

      {/* ================= HOW IT WORKS ================= */}

      <Box className="how-section">
        <Container maxWidth="xl">
          <Box className="section-heading centered">
            <Chip
              label="HOW IT WORKS"
              className="section-chip"
            />

            <Typography
              component="h2"
              className="section-title"
            >
              Travel made beautifully simple.
            </Typography>

            <Typography className="section-description">
              Four simple steps between you and your
              next adventure.
            </Typography>
          </Box>

          <Box className="steps-container">
            {steps.map((step, index) => (
              <Box
                key={step.number}
                className={`step-card ${
                  activeStep === index
                    ? "step-active"
                    : ""
                }`}
                onClick={() => setActiveStep(index)}
              >
                <Box className="step-number">
                  {step.number}
                </Box>

                <Box className="step-icon">
                  {step.icon}
                </Box>

                <Typography className="step-title">
                  {step.title}
                </Typography>

                <Typography className="step-description">
                  {step.description}
                </Typography>

                {index < steps.length - 1 && (
                  <Box className="step-connector">
                    <ArrowForwardIcon />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ================= EXPERIENCE ================= */}

      <Box className="experience-section">
        <Container maxWidth="xl">
          <Box className="experience-grid">
            <Box className="experience-visual">
              <Box className="visual-circle circle-one" />
              <Box className="visual-circle circle-two" />

              <Box className="floating-ticket">
                <ConfirmationNumberIcon />

                <Box>
                  <Typography>
                    Digital Ticket
                  </Typography>

                  <small>Ready when you are</small>
                </Box>
              </Box>

              <Box className="big-bus">
                <DirectionsBusIcon />
              </Box>

              <Box className="floating-seat">
                <EventSeatIcon />

                <Box>
                  <Typography>Your Seat</Typography>
                  <small>Selected</small>
                </Box>
              </Box>
            </Box>

            <Box className="experience-content">
              <Chip
                label="YOUR JOURNEY, YOUR WAY"
                className="section-chip"
              />

              <Typography
                component="h2"
                className="experience-title"
              >
                More than booking.
                <br />
                <span>It's your journey.</span>
              </Typography>

              <Typography className="experience-description">
                RwandaRide brings everything together
                so you can focus on what matters —
                enjoying the journey.
              </Typography>

              <Stack spacing={2.5}>
                <Feature
                  icon={<SearchIcon />}
                  title="Find your route"
                  description="Search destinations quickly and easily."
                />

                <Feature
                  icon={<EventSeatIcon />}
                  title="Choose your seat"
                  description="Pick the seat that feels right for you."
                />

                <Feature
                  icon={<ConfirmationNumberIcon />}
                  title="Carry your ticket"
                  description="Access your booking digitally whenever you need it."
                />
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ================= FINAL CTA ================= */}

      <Box className="final-cta">
        <Box className="cta-glow" />

        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <Typography
            component="h2"
            className="cta-title"
          >
            Ready for your next
            <br />
            adventure?
          </Typography>

          <Typography className="cta-description">
            Your next destination is only a few clicks
            away.
          </Typography>

          <Button
            onClick={scrollToBooking}
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            className="cta-button"
          >
            Start Your Journey
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

/* ================= STAT COMPONENT ================= */

function Stat({ number, label, icon }) {
  return (
    <Box className="stat-item">
      <Box className="stat-icon">{icon}</Box>

      <Typography className="stat-number">
        {number}
      </Typography>

      <Typography className="stat-label">
        {label}
      </Typography>
    </Box>
  );
}

/* ================= FEATURE COMPONENT ================= */

function Feature({ icon, title, description }) {
  return (
    <Box className="feature-item">
      <Box className="feature-icon">{icon}</Box>

      <Box>
        <Typography className="feature-title">
          {title}
        </Typography>

        <Typography className="feature-description">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}