"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
import { useCart } from "../context/CartContext";
import { SHETA_COLORS } from "../theme/theme";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "All Perfumes", href: "/products" },
  { label: "Bestsellers", href: "/products?filter=featured" }
];

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle mobile navigation drawer
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: SHETA_COLORS.pureWhite,
        borderBottom: `1px solid rgba(107, 114, 128, 0.15)`,
        zIndex: 1100
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 80 } }}>
          {/* Mobile Hamburger Button */}
          <IconButton
            color="inherit"
            aria-label="open navigation drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 1,
              display: { md: "none" },
              color: SHETA_COLORS.obsidian
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Brand Logo & Amharic Title */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: { xs: 1, md: 0 }, mr: { md: 5 } }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  backgroundColor: SHETA_COLORS.obsidian,
                  color: SHETA_COLORS.royalGold,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(18,18,18,0.2)"
                }}
              >
                <SparklesIcon sx={{ fontSize: 20 }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontFamily: "serif",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    lineHeight: 1.1,
                    color: SHETA_COLORS.obsidian,
                    textTransform: "uppercase"
                  }}
                >
                  SHETA
                  <Box
                    component="span"
                    sx={{
                      fontSize: "0.85em",
                      fontWeight: 500,
                      color: SHETA_COLORS.royalGold,
                      ml: 0.8
                    }}
                  >
                   | ሽታ
                  </Box>
                </Typography>
              </Box>
            </Link>
          </Box>

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: isActive ? SHETA_COLORS.royalGold : SHETA_COLORS.obsidian,
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.95rem",
                    letterSpacing: "0.03em",
                    position: "relative",
                    "&:after": isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: 4,
                          left: "20%",
                          right: "20%",
                          height: 2,
                          backgroundColor: SHETA_COLORS.royalGold,
                          borderRadius: 2
                        }
                      : {}
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* Right Action Icons: Cart & Call to Action */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton
              component={Link}
              href="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              sx={{
                color: SHETA_COLORS.obsidian,
                backgroundColor: "rgba(107, 114, 128, 0.08)",
                "&:hover": {
                  backgroundColor: "rgba(197, 160, 89, 0.15)",
                  color: SHETA_COLORS.royalGold
                }
              }}
            >
              <Badge
                badgeContent={cartCount}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: SHETA_COLORS.royalGold,
                    color: SHETA_COLORS.pureWhite,
                    fontWeight: 700,
                    fontSize: "0.75rem"
                  }
                }}
              >
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>

            <Button
              component={Link}
              href="/products"
              variant="contained"
              size="small"
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                backgroundColor: SHETA_COLORS.obsidian,
                color: SHETA_COLORS.pureWhite,
                fontSize: "0.85rem",
                px: 2.2,
                py: 0.8,
                "&:hover": {
                  backgroundColor: SHETA_COLORS.royalGold,
                  color: SHETA_COLORS.pureWhite
                }
              }}
            >
              Explore Scent
            </Button>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer Navigation */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            backgroundColor: SHETA_COLORS.pureWhite,
            p: 2.5
          }
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: "serif", fontWeight: 700, color: SHETA_COLORS.obsidian }}>
            SHETA <span style={{ color: SHETA_COLORS.royalGold }}>(ሽታ)</span>
          </Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ color: SHETA_COLORS.obsidian }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "rgba(107, 114, 128, 0.2)" }} />
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={handleDrawerToggle}
                selected={pathname === item.href}
                sx={{
                  borderRadius: 1.5,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(197, 160, 89, 0.12)",
                    color: SHETA_COLORS.royalGold,
                    fontWeight: 700
                  }
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 1 }}>
            <ListItemButton
              component={Link}
              href="/cart"
              onClick={handleDrawerToggle}
              sx={{ borderRadius: 1.5 }}
            >
              <ListItemText primary={`Shopping Cart (${cartCount})`} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
