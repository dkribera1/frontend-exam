import React, { useEffect, useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  Link,
  useLocation,
} from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      label: "Search Bus",
      path: "/",
      icon: <SearchIcon />,
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "My Bookings",
      path: "/bookings",
      icon: <ConfirmationNumberIcon />,
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const handleMobileMenu = () => {
    setMobileOpen((previous) => !previous);
  };

  const handleBookNow = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box className="app-shell">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <AppBar
        position="fixed"
        elevation={0}
        className={`premium-navbar ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            className="navbar-toolbar"
          >

            {/* ================= LOGO ================= */}

            <Box
              component={Link}
              to="/"
              className="navbar-logo"
            >
              <Box className="navbar-logo-icon">
                <DirectionsBusIcon />
              </Box>

              <Box className="navbar-logo-text">
                <Typography className="navbar-brand">
                  RwandaRide
                </Typography>

                <Typography className="navbar-tagline">
                  Travel smarter
                </Typography>
              </Box>
            </Box>

            {/* ================= DESKTOP NAV ================= */}

            <Box className="desktop-nav">

              {navItems.map((item) => (
                <Box
                  key={item.path}
                  component={Link}
                  to={item.path}
                  className={`nav-link ${
                    isActive(item.path)
                      ? "nav-link-active"
                      : ""
                  }`}
                >
                  <Box className="nav-link-icon">
                    {item.icon}
                  </Box>

                  <span>{item.label}</span>

                  {isActive(item.path) && (
                    <Box className="nav-active-dot" />
                  )}
                </Box>
              ))}

            </Box>

            {/* ================= DESKTOP CTA ================= */}

            <Box className="navbar-actions">

              <Button
                component={Link}
                to="/"
                onClick={handleBookNow}
                className="navbar-book-button"
                endIcon={<ArrowForwardIcon />}
              >
                Book Now
              </Button>

            </Box>

            {/* ================= MOBILE MENU ================= */}

            <IconButton
              onClick={handleMobileMenu}
              className={`mobile-menu-button ${
                mobileOpen
                  ? "mobile-menu-open"
                  : ""
              }`}
              aria-label="Open navigation"
            >
              {mobileOpen ? (
                <CloseIcon />
              ) : (
                <MenuIcon />
              )}
            </IconButton>

          </Toolbar>
        </Container>
      </AppBar>

      {/* =================================================
          MOBILE DRAWER
      ================================================= */}

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        className="premium-mobile-drawer"
        PaperProps={{
          className: "mobile-drawer-paper",
        }}
      >

        <Box className="mobile-drawer-header">

          <Box className="navbar-logo">
            <Box className="navbar-logo-icon">
              <DirectionsBusIcon />
            </Box>

            <Box className="navbar-logo-text">
              <Typography className="navbar-brand">
                RwandaRide
              </Typography>

              <Typography className="navbar-tagline">
                Travel smarter
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={() => setMobileOpen(false)}
            className="mobile-close-button"
          >
            <CloseIcon />
          </IconButton>

        </Box>

        <Divider />

        <List className="mobile-nav-list">

          {navItems.map((item, index) => (
            <ListItem
              key={item.path}
              disablePadding
              className="mobile-nav-item"
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >

              <ListItemButton
                component={Link}
                to={item.path}
                className={`mobile-nav-link ${
                  isActive(item.path)
                    ? "mobile-nav-link-active"
                    : ""
                }`}
              >

                <ListItemIcon className="mobile-nav-icon">
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                />

                <ArrowForwardIcon className="mobile-nav-arrow" />

              </ListItemButton>

            </ListItem>
          ))}

        </List>

        <Box className="mobile-drawer-bottom">

          <Button
            component={Link}
            to="/"
            onClick={() => {
              setMobileOpen(false);
              handleBookNow();
            }}
            fullWidth
            endIcon={<ArrowForwardIcon />}
            className="mobile-book-button"
          >
            Start Your Journey
          </Button>

          <Typography className="mobile-drawer-caption">
            Your journey across Rwanda starts here.
          </Typography>

        </Box>

      </Drawer>

      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      <Box className="page-content">
        {children}
      </Box>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Box className="site-footer">

        <Container maxWidth="xl">

          <Box className="footer-grid">

            <Box className="footer-brand">

              <Box className="footer-logo">
                <Box className="footer-logo-icon">
                  <DirectionsBusIcon />
                </Box>

                <Typography>
                  RwandaRide
                </Typography>
              </Box>

              <Typography className="footer-description">
                A simple and modern way to discover
                destinations across Rwanda.
              </Typography>

            </Box>

            <Box>
              <Typography className="footer-heading">
                Quick Links
              </Typography>

              <Box className="footer-links">
                <Link to="/">Search Bus</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/bookings">
                  My Bookings
                </Link>
              </Box>
            </Box>

            <Box>
              <Typography className="footer-heading">
                Services
              </Typography>

              <Box className="footer-links">
                <span>Bus Search</span>
                <span>Seat Selection</span>
                <span>Digital Tickets</span>
                <span>Booking Management</span>
              </Box>
            </Box>

            <Box>
              <Typography className="footer-heading">
                Contact
              </Typography>

              <Box className="footer-links">
                <span>Kigali, Rwanda</span>
                <span>support@rwandaride.com</span>
                <span>+250 783 752 541</span>
              </Box>
            </Box>

          </Box>

          <Divider className="footer-divider" />

          <Box className="footer-bottom">

            <Typography>
              © 2026 RwandaRide. All rights reserved.
            </Typography>

            <Typography>
              Developed by{" "}
              <strong>DS RIBERA</strong>
            </Typography>

          </Box>

        </Container>

      </Box>

    </Box>
  );
}