import React from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaymentsIcon from "@mui/icons-material/Payments";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LuggageIcon from "@mui/icons-material/Luggage";

import { Link } from "react-router-dom";

import { useBooking } from "../context/BookingContext.jsx";

export default function DashboardPage() {
  const { bookings } = useBooking();

  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (item) => item.status === "Confirmed"
  ).length;

  const today = new Date();

  const upcomingBookings = bookings.filter((item) => {
    if (!item.travelDate) return false;

    return new Date(item.travelDate) >= today;
  });

  const totalSpent = bookings.reduce(
    (total, item) => total + Number(item.total || 0),
    0
  );

  const latestBooking = bookings[0];

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString(
      "en-RW",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-RW").format(
      Number(amount || 0)
    );
  };

  return (
    <Box className="dashboard-page">
      {/* =========================================
          HERO
      ========================================= */}

      <Box
        sx={{
          background:
            "linear-gradient(135deg, #0b5cff 0%, #1746b8 100%)",
          color: "#ffffff",
          py: {
            xs: 4,
            sm: 5,
            md: 6,
          },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                md: "center",
              },
              gap: 3,
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: 14,
                    sm: 15,
                  },
                  fontWeight: 600,
                  opacity: 0.85,
                  mb: 1,
                }}
              >
                Welcome to your dashboard
              </Typography>

              <Typography
                component="h1"
                sx={{
                  fontSize: {
                    xs: 30,
                    sm: 38,
                    md: 46,
                  },
                  lineHeight: 1.1,
                  fontWeight: 900,
                  letterSpacing: "-1.5px",
                  mb: 1.5,
                }}
              >
                Your journeys,
                <br className="mobile-break" />
                managed simply.
              </Typography>

              <Typography
                sx={{
                  maxWidth: 600,
                  fontSize: {
                    xs: 14,
                    sm: 16,
                  },
                  lineHeight: 1.6,
                  opacity: 0.88,
                }}
              >
                Keep track of your bookings,
                upcoming trips and travel
                information in one place.
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                backgroundColor: "#ffffff",
                color: "#0b5cff",
                textTransform: "none",
                fontWeight: 800,
                px: 2.5,
                py: 1.3,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#f2f4f7",
                },
              }}
            >
              Book a New Trip
            </Button>
          </Box>
        </Container>
      </Box>

      {/* =========================================
          DASHBOARD CONTENT
      ========================================= */}

      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 3,
            sm: 4,
            md: 5,
          },
        }}
      >
        {/* =========================================
            STAT CARDS
        ========================================= */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "repeat(4, 1fr)",
            },
            gap: 2,
            mb: 4,
          }}
        >
          {/* TOTAL BOOKINGS */}

          <StatCard
            title="Total Bookings"
            value={totalBookings}
            subtitle="All your bookings"
            icon={<ConfirmationNumberIcon />}
            iconBackground="#eef4ff"
            iconColor="#0b5cff"
          />

          {/* CONFIRMED */}

          <StatCard
            title="Confirmed Trips"
            value={confirmedBookings}
            subtitle="Successfully confirmed"
            icon={<DirectionsBusIcon />}
            iconBackground="#ecfdf3"
            iconColor="#039855"
          />

          {/* UPCOMING */}

          <StatCard
            title="Upcoming Trips"
            value={upcomingBookings.length}
            subtitle="Future journeys"
            icon={<CalendarMonthIcon />}
            iconBackground="#fff7ed"
            iconColor="#f79009"
          />

          {/* SPENDING */}

          <StatCard
            title="Total Spent"
            value={`${formatMoney(totalSpent)} RWF`}
            subtitle="Across all bookings"
            icon={<PaymentsIcon />}
            iconBackground="#fdf2fa"
            iconColor="#c11574"
          />
        </Box>

        {/* =========================================
            MAIN GRID
        ========================================= */}

        <Grid
          container
          spacing={3}
        >
          {/* UPCOMING TRIP */}

          <Grid
            item
            xs={12}
            lg={7}
          >
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                border:
                  "1px solid #eaecf0",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  px: {
                    xs: 2.5,
                    sm: 3,
                  },
                  py: 2.5,
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: 19,
                      color: "#101828",
                    }}
                  >
                    Upcoming Journey
                  </Typography>

                  <Typography
                    sx={{
                      color: "#667085",
                      fontSize: 13,
                      mt: 0.4,
                    }}
                  >
                    Your next scheduled trip
                  </Typography>
                </Box>

                <DirectionsBusIcon
                  sx={{
                    color: "#0b5cff",
                    fontSize: 30,
                  }}
                />
              </Box>

              <Divider />

              {upcomingBookings.length > 0 ? (
                <UpcomingTrip
                  booking={upcomingBookings[0]}
                  formatDate={formatDate}
                  formatMoney={formatMoney}
                />
              ) : (
                <EmptyUpcomingTrip />
              )}
            </Paper>
          </Grid>

          {/* QUICK ACTIONS */}

          <Grid
            item
            xs={12}
            lg={5}
          >
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                border:
                  "1px solid #eaecf0",
                borderRadius: 3,
                p: {
                  xs: 2.5,
                  sm: 3,
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 19,
                  color: "#101828",
                }}
              >
                Quick Actions
              </Typography>

              <Typography
                sx={{
                  color: "#667085",
                  fontSize: 13,
                  mt: 0.4,
                  mb: 2.5,
                }}
              >
                Manage your RwandaRide
                experience
              </Typography>

              <Stack spacing={1.5}>
                <QuickAction
                  icon={<SearchIcon />}
                  title="Search for a Bus"
                  description="Find your next journey"
                  to="/"
                />

                <QuickAction
                  icon={
                    <ConfirmationNumberIcon />
                  }
                  title="View My Bookings"
                  description="Check your reservations"
                  to="/bookings"
                />

                <QuickAction
                  icon={<EventSeatIcon />}
                  title="Choose Your Seat"
                  description="Select your preferred seat"
                  to="/booking/seats"
                />
              </Stack>
            </Paper>
          </Grid>

          {/* RECENT BOOKINGS */}

          <Grid
            item
            xs={12}
            lg={8}
          >
            <Paper
              elevation={0}
              sx={{
                border:
                  "1px solid #eaecf0",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  px: {
                    xs: 2.5,
                    sm: 3,
                  },
                  py: 2.5,
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: 19,
                    }}
                  >
                    Recent Bookings
                  </Typography>

                  <Typography
                    sx={{
                      color: "#667085",
                      fontSize: 13,
                      mt: 0.4,
                    }}
                  >
                    Your latest RwandaRide
                    reservations
                  </Typography>
                </Box>

                <Button
                  component={Link}
                  to="/bookings"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    color: "#0b5cff",
                  }}
                >
                  View All
                </Button>
              </Box>

              <Divider />

              {bookings.length > 0 ? (
                <Box>
                  {bookings
                    .slice(0, 5)
                    .map((item) => (
                      <RecentBooking
                        key={item.id}
                        booking={item}
                        formatDate={formatDate}
                        formatMoney={formatMoney}
                      />
                    ))}
                </Box>
              ) : (
                <EmptyBookings />
              )}
            </Paper>
          </Grid>

          {/* TRAVEL TIPS */}

          <Grid
            item
            xs={12}
            lg={4}
          >
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                border:
                  "1px solid #eaecf0",
                borderRadius: 3,
                p: {
                  xs: 2.5,
                  sm: 3,
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  backgroundColor: "#eef4ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <LuggageIcon
                  sx={{
                    color: "#0b5cff",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 19,
                  mb: 1,
                }}
              >
                Travel Smart
              </Typography>

              <Typography
                sx={{
                  color: "#667085",
                  fontSize: 14,
                  lineHeight: 1.7,
                  mb: 2.5,
                }}
              >
                Make your journey easier by
                arriving early and keeping your
                digital ticket ready.
              </Typography>

              <Stack spacing={1.5}>
                <Tip text="Arrive early at the bus station" />

                <Tip text="Keep your booking ID safe" />

                <Tip text="Check your travel date before departure" />
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* =========================================
            POPULAR DESTINATIONS
        ========================================= */}

        <Box sx={{ mt: 5 }}>
          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: 22,
                  sm: 26,
                },
              }}
            >
              Explore Rwanda
            </Typography>

            <Typography
              sx={{
                color: "#667085",
                fontSize: 14,
                mt: 0.5,
              }}
            >
              Popular destinations you can
              travel to with RwandaRide.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            <DestinationCard
              city="Musanze"
              description="Northern Rwanda"
              emoji="🏔️"
            />

            <DestinationCard
              city="Rubavu"
              description="Lake Kivu"
              emoji="🌊"
            />

            <DestinationCard
              city="Huye"
              description="Southern Rwanda"
              emoji="🌿"
            />

            <DestinationCard
              city="Rusizi"
              description="Southwest Rwanda"
              emoji="🚌"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* =========================================
   STAT CARD
========================================= */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBackground,
  iconColor,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        border:
          "1px solid #eaecf0",
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 2.2,
            sm: 2.5,
          },
          "&:last-child": {
            pb: {
              xs: 2.2,
              sm: 2.5,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#667085",
                fontSize: 13,
                fontWeight: 600,
                mb: 0.8,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontWeight: 900,
                fontSize: {
                  xs: 25,
                  sm: 29,
                },
                color: "#101828",
                lineHeight: 1.1,
              }}
            >
              {value}
            </Typography>

            <Typography
              sx={{
                color: "#98a2b3",
                fontSize: 12,
                mt: 0.8,
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2,
              backgroundColor: iconBackground,
              color: iconColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

/* =========================================
   UPCOMING TRIP
========================================= */

function UpcomingTrip({
  booking,
  formatDate,
  formatMoney,
}) {
  return (
    <Box
      sx={{
        p: {
          xs: 2.5,
          sm: 3,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2.5,
        }}
      >
        <Chip
          label={booking.status || "Confirmed"}
          size="small"
          sx={{
            backgroundColor: "#ecfdf3",
            color: "#027a48",
            fontWeight: 700,
          }}
        />

        {booking.id && (
          <Typography
            sx={{
              color: "#98a2b3",
              fontSize: 12,
            }}
          >
            #{booking.id}
          </Typography>
        )}
      </Box>

      {/* ROUTE */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: {
            xs: 1.5,
            sm: 3,
          },
          mb: 3,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: {
                xs: 21,
                sm: 25,
              },
            }}
          >
            {booking.departure || "Kigali"}
          </Typography>

          <Typography
            sx={{
              color: "#667085",
              fontSize: 12,
            }}
          >
            Departure
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            height: 1,
            backgroundColor: "#d0d5dd",
            position: "relative",
          }}
        >
          <DirectionsBusIcon
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform:
                "translate(-50%, -50%)",
              backgroundColor: "#ffffff",
              color: "#0b5cff",
              px: 0.5,
              fontSize: 28,
            }}
          />
        </Box>

        <Box
          sx={{
            textAlign: "right",
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: {
                xs: 21,
                sm: 25,
              },
            }}
          >
            {booking.destination || "Destination"}
          </Typography>

          <Typography
            sx={{
              color: "#667085",
              fontSize: 12,
            }}
          >
            Arrival
          </Typography>
        </Box>
      </Box>

      {/* DETAILS */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        <TripDetail
          icon={<CalendarMonthIcon />}
          label="Travel Date"
          value={formatDate(
            booking.travelDate
          )}
        />

        <TripDetail
          icon={<EventSeatIcon />}
          label="Seats"
          value={
            booking.selectedSeats?.length
              ? booking.selectedSeats.join(", ")
              : "Not selected"
          }
        />

        <TripDetail
          icon={<PaymentsIcon />}
          label="Total"
          value={`${formatMoney(
            booking.total
          )} RWF`}
        />
      </Box>

      <Button
        component={Link}
        to={
          booking.id
            ? `/bookings/${booking.id}`
            : "/bookings"
        }
        endIcon={<ArrowForwardIcon />}
        sx={{
          mt: 3,
          textTransform: "none",
          fontWeight: 800,
          color: "#0b5cff",
        }}
      >
        View Booking Details
      </Button>
    </Box>
  );
}

/* =========================================
   TRIP DETAIL
========================================= */

function TripDetail({
  icon,
  label,
  value,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.2,
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          color: "#0b5cff",
          mt: 0.2,
        }}
      >
        {React.cloneElement(icon, {
          sx: {
            fontSize: 19,
          },
        })}
      </Box>

      <Box>
        <Typography
          sx={{
            color: "#98a2b3",
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            color: "#344054",
            fontWeight: 700,
            fontSize: 13,
            mt: 0.2,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

/* =========================================
   EMPTY UPCOMING TRIP
========================================= */

function EmptyUpcomingTrip() {
  return (
    <Box
      sx={{
        p: {
          xs: 3,
          sm: 4,
        },
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 65,
          height: 65,
          borderRadius: "50%",
          backgroundColor: "#f2f4f7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 2,
        }}
      >
        <DirectionsBusIcon
          sx={{
            color: "#98a2b3",
            fontSize: 32,
          }}
        />
      </Box>

      <Typography
        sx={{
          fontWeight: 800,
          fontSize: 17,
          mb: 0.7,
        }}
      >
        No upcoming trips
      </Typography>

      <Typography
        sx={{
          color: "#667085",
          fontSize: 13,
          mb: 2.5,
        }}
      >
        You don't have a future journey
        booked yet.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{
          textTransform: "none",
          fontWeight: 700,
          boxShadow: "none",
        }}
      >
        Find a Bus
      </Button>
    </Box>
  );
}

/* =========================================
   QUICK ACTION
========================================= */

function QuickAction({
  icon,
  title,
  description,
  to,
}) {
  return (
    <Button
      component={Link}
      to={to}
      sx={{
        width: "100%",
        textTransform: "none",
        color: "inherit",
        justifyContent: "flex-start",
        textAlign: "left",
        p: 1.2,
        borderRadius: 2,
        border: "1px solid #eaecf0",
        "&:hover": {
          backgroundColor: "#f8faff",
          borderColor: "#c7d7fe",
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 1.5,
          backgroundColor: "#eef4ff",
          color: "#0b5cff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 1.5,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 13,
            color: "#101828",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 11,
            color: "#667085",
            mt: 0.2,
          }}
        >
          {description}
        </Typography>
      </Box>

      <ArrowForwardIcon
        sx={{
          color: "#98a2b3",
          fontSize: 19,
        }}
      />
    </Button>
  );
}

/* =========================================
   RECENT BOOKING
========================================= */

function RecentBooking({
  booking,
  formatDate,
  formatMoney,
}) {
  return (
    <Box
      component={Link}
      to={
        booking.id
          ? `/bookings/${booking.id}`
          : "/bookings"
      }
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: {
          xs: 2.5,
          sm: 3,
        },
        py: 2,
        textDecoration: "none",
        color: "inherit",
        borderBottom:
          "1px solid #f2f4f7",
        transition: "background 0.2s",
        "&:hover": {
          backgroundColor: "#f8faff",
        },
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: 2,
          backgroundColor: "#eef4ff",
          color: "#0b5cff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <DirectionsBusIcon
          sx={{
            fontSize: 22,
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 14,
            color: "#101828",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {booking.departure || "Kigali"} →{" "}
          {booking.destination || "Destination"}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: "#667085",
            mt: 0.4,
          }}
        >
          {formatDate(booking.travelDate)}
        </Typography>
      </Box>

      <Box
        sx={{
          textAlign: "right",
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 13,
          }}
        >
          {formatMoney(booking.total)} RWF
        </Typography>

        <Chip
          label={booking.status || "Pending"}
          size="small"
          sx={{
            mt: 0.5,
            height: 22,
            fontSize: 10,
            fontWeight: 700,
            backgroundColor:
              booking.status === "Confirmed"
                ? "#ecfdf3"
                : "#fff7ed",
            color:
              booking.status === "Confirmed"
                ? "#027a48"
                : "#b54708",
          }}
        />
      </Box>

      <ArrowForwardIcon
        sx={{
          color: "#98a2b3",
          fontSize: 20,
        }}
      />
    </Box>
  );
}

/* =========================================
   EMPTY BOOKINGS
========================================= */

function EmptyBookings() {
  return (
    <Box
      sx={{
        p: 4,
        textAlign: "center",
      }}
    >
      <ConfirmationNumberIcon
        sx={{
          fontSize: 45,
          color: "#d0d5dd",
          mb: 1,
        }}
      />

      <Typography
        sx={{
          fontWeight: 800,
          mb: 0.5,
        }}
      >
        No bookings yet
      </Typography>

      <Typography
        sx={{
          color: "#667085",
          fontSize: 13,
          mb: 2,
        }}
      >
        Your bookings will appear here.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="outlined"
        sx={{
          textTransform: "none",
          fontWeight: 700,
        }}
      >
        Search for a Bus
      </Button>
    </Box>
  );
}

/* =========================================
   TRAVEL TIP
========================================= */

function Tip({ text }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.2,
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#0b5cff",
          flexShrink: 0,
        }}
      />

      <Typography
        sx={{
          fontSize: 13,
          color: "#475467",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

/* =========================================
   DESTINATION CARD
========================================= */

function DestinationCard({
  city,
  description,
  emoji,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 1.8,
          sm: 2.3,
        },
        border:
          "1px solid #eaecf0",
        borderRadius: 3,
        transition: "all 0.2s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: "#c7d7fe",
          boxShadow:
            "0 8px 24px rgba(16,24,40,0.08)",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: 27,
            sm: 32,
          },
          mb: 1,
        }}
      >
        {emoji}
      </Typography>

      <Typography
        sx={{
          fontWeight: 800,
          fontSize: {
            xs: 14,
            sm: 16,
          },
        }}
      >
        {city}
      </Typography>

      <Typography
        sx={{
          color: "#667085",
          fontSize: 11,
          mt: 0.4,
        }}
      >
        {description}
      </Typography>
    </Paper>
  );
}