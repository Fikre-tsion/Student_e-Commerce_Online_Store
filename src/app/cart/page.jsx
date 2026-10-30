"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  IconButton,
  Button,
  Divider,
  Stack,
  Tooltip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SparklesIcon from "@mui/icons-material/AutoAwesome";

import { useCart } from "../../context/CartContext";
import CartSummary from "../../components/CartSummary";
import { SHETA_COLORS } from "../../theme/theme";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartCount } = useCart();

  // ===========================================================================
  // 1. EMPTY CART STATE
  // ===========================================================================
  if (cartCount === 0) {
    return (
      <Box sx={{ backgroundColor: SHETA_COLORS.alabaster, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="sm">
          <Card
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: "center",
              backgroundColor: SHETA_COLORS.pureWhite,
              borderRadius: 4,
              border: "1px solid rgba(107, 114, 128, 0.18)"
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "rgba(197, 160, 89, 0.15)",
                color: SHETA_COLORS.royalGold,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2.5
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 36 }} />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontFamily: "serif",
                fontWeight: 700,
                color: SHETA_COLORS.obsidian,
                mb: 1.5
              }}
            >
              Your Scent Bag is Empty
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: SHETA_COLORS.mutedSlate,
                maxWidth: 420,
                mx: "auto",
                mb: 4,
                lineHeight: 1.7
              }}
            >
              You haven't selected any artisanal extraits yet. Explore our highland resins,
              Damascene rose, and vanilla blends to find your signature fragrance.
            </Typography>

            <Button
              component={Link}
              href="/products"
              variant="contained"
              size="large"
              startIcon={<SparklesIcon />}
              sx={{
                backgroundColor: SHETA_COLORS.obsidian,
                color: SHETA_COLORS.pureWhite,
                px: 4,
                py: 1.4,
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: SHETA_COLORS.royalGold,
                  color: SHETA_COLORS.pureWhite
                }
              }}
            >
              Explore Collection
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  // ===========================================================================
  // 2. ACTIVE CART WITH ITEMS
  // ===========================================================================
  return (
    <Box sx={{ backgroundColor: SHETA_COLORS.alabaster, py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Page Title & Back Button */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "serif",
                fontWeight: 700,
                color: SHETA_COLORS.obsidian,
                mb: 0.5
              }}
            >
              Your Scent Selection
            </Typography>
            <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
              Review your selected bottles before moving to the delivery details.
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/products"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: SHETA_COLORS.obsidian,
              fontWeight: 600,
              "&:hover": { color: SHETA_COLORS.royalGold }
            }}
          >
            Continue Browsing
          </Button>
        </Box>

        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* Left Column: Cart Items List */}
          <Grid item xs={12} md={8}>
            <Card
              elevation={0}
              sx={{
                backgroundColor: SHETA_COLORS.pureWhite,
                borderRadius: 3,
                border: "1px solid rgba(107, 114, 128, 0.15)",
                p: { xs: 2.5, md: 3 }
              }}
            >
              {/* Header row (Desktop) */}
              <Box
                sx={{
                  display: { xs: "none", sm: "grid" },
                  gridTemplateColumns: "3fr 1fr 1.5fr 1fr 40px",
                  pb: 1.5,
                  borderBottom: "1px solid rgba(107, 114, 128, 0.15)",
                  color: SHETA_COLORS.mutedSlate
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
                  Fragrance
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", textAlign: "right" }}>
                  Unit Price
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", textAlign: "center" }}>
                  Quantity
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", textAlign: "right" }}>
                  Line Total
                </Typography>
                <Box />
              </Box>

              {/* Items List */}
              <Stack spacing={2.5} sx={{ mt: 2 }}>
                {cart.map((item) => {
                  const lineTotal = item.price * item.quantity;

                  return (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        py: 2,
                        borderBottom: "1px solid rgba(107, 114, 128, 0.1)",
                        gap: 2
                      }}
                    >
                      {/* Product Thumbnail & Details */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, minWidth: { sm: 260 } }}>
                        <Box
                          sx={{
                            position: "relative",
                            width: 72,
                            height: 80,
                            borderRadius: 2,
                            overflow: "hidden",
                            backgroundColor: "#f4ede4",
                            flexShrink: 0
                          }}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="72px"
                            style={{ objectFit: "cover" }}
                          />
                        </Box>

                        <Box>
                          <Typography
                            variant="subtitle1"
                            component={Link}
                            href={`/products/${item.id}`}
                            sx={{
                              fontFamily: "serif",
                              fontWeight: 700,
                              color: SHETA_COLORS.obsidian,
                              textDecoration: "none",
                              lineHeight: 1.2,
                              display: "block",
                              "&:hover": { color: SHETA_COLORS.royalGold }
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: SHETA_COLORS.royalGold, fontWeight: 600 }}>
                            {item.amharicName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: SHETA_COLORS.mutedSlate, display: "block" }}>
                            {item.category} • {item.size}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Unit Price */}
                      <Box sx={{ display: { xs: "none", sm: "block" }, textAlign: "right", minWidth: 70 }}>
                        <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
                          ${item.price}
                        </Typography>
                      </Box>

                      {/* Quantity Controls */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: SHETA_COLORS.alabaster,
                          border: "1px solid rgba(107, 114, 128, 0.2)",
                          borderRadius: 2,
                          p: 0.3
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          sx={{ color: SHETA_COLORS.obsidian }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography
                          variant="body2"
                          sx={{
                            px: 1.5,
                            fontWeight: 700,
                            minWidth: 28,
                            textAlign: "center",
                            color: SHETA_COLORS.obsidian
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          sx={{ color: SHETA_COLORS.obsidian }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      {/* Line Total */}
                      <Box sx={{ textAlign: "right", minWidth: 80 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SHETA_COLORS.obsidian }}>
                          ${lineTotal.toFixed(2)}
                        </Typography>
                      </Box>

                      {/* Remove Button */}
                      <Tooltip title="Remove perfume from cart">
                        <IconButton
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          sx={{
                            color: SHETA_COLORS.mutedSlate,
                            "&:hover": { color: "#d32f2f" }
                          }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  );
                })}
              </Stack>

              {/* Clear Cart Action Button */}
              <Box sx={{ pt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  onClick={clearCart}
                  size="small"
                  sx={{
                    color: SHETA_COLORS.mutedSlate,
                    textTransform: "none",
                    "&:hover": { color: SHETA_COLORS.obsidian }
                  }}
                >
                  Clear Scent Bag
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Right Column: Order Summary & Checkout Button */}
          <Grid item xs={12} md={4}>
            <CartSummary showCheckoutButton={true} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
