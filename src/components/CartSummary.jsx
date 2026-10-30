"use client";
import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
  Stack,
  LinearProgress
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { useCart } from "../context/CartContext";
import { SHETA_COLORS } from "../theme/theme";

export default function CartSummary({ showCheckoutButton = true }) {
  const { subtotal, shipping, tax, grandTotal, cartCount } = useCart();

  // Progress toward complimentary shipping ($150 threshold)
  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountRemaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: SHETA_COLORS.pureWhite,
        border: "1px solid rgba(107, 114, 128, 0.2)",
        borderRadius: 3,
        p: { xs: 2.5, md: 3 }
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "serif",
            fontWeight: 700,
            color: SHETA_COLORS.obsidian,
            mb: 2.5
          }}
        >
          Order Summary ({cartCount} {cartCount === 1 ? "bottle" : "bottles"})
        </Typography>

        {/* Free Shipping Progress Bar */}
        <Box
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2,
            backgroundColor: SHETA_COLORS.alabaster,
            border: "1px solid rgba(107, 114, 128, 0.15)"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <LocalShippingOutlinedIcon sx={{ fontSize: 20, color: SHETA_COLORS.royalGold }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: SHETA_COLORS.obsidian }}>
              {subtotal >= freeShippingThreshold
                ? "Complimentary Luxury Shipping Unlocked!"
                : `Add $${amountRemaining.toFixed(2)} more for Free Shipping`}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "rgba(107, 114, 128, 0.2)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: SHETA_COLORS.royalGold
              }
            }}
          />
        </Box>

        {/* Price Breakdown List */}
        <Stack spacing={1.6} sx={{ mb: 2.5 }}>
          {/* Subtotal */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
              Fragrances Subtotal
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: SHETA_COLORS.obsidian }}>
              ${subtotal.toFixed(2)}
            </Typography>
          </Box>

          {/* Shipping */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
              Estimated Shipping
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: shipping === 0 ? SHETA_COLORS.royalGold : SHETA_COLORS.obsidian
              }}
            >
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </Typography>
          </Box>

          {/* Estimated Tax */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
              Estimated Tax (5%)
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: SHETA_COLORS.obsidian }}>
              ${tax.toFixed(2)}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2.5, borderColor: "rgba(107, 114, 128, 0.2)" }} />

        {/* Grand Total */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SHETA_COLORS.obsidian }}>
            Grand Total
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontFamily: "serif",
              color: SHETA_COLORS.obsidian
            }}
          >
            ${grandTotal.toFixed(2)}
          </Typography>
        </Box>

        {/* Proceed to Checkout Action */}
        {showCheckoutButton && (
          <Button
            component={Link}
            href="/checkout"
            variant="contained"
            fullWidth
            size="large"
            disabled={cartCount === 0}
            sx={{
              backgroundColor: SHETA_COLORS.obsidian,
              color: SHETA_COLORS.pureWhite,
              py: 1.4,
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              "&:hover": {
                backgroundColor: SHETA_COLORS.royalGold,
                color: SHETA_COLORS.pureWhite
              }
            }}
          >
            Proceed to Checkout
          </Button>
        )}

        {/* Guarantees & Notice */}
        <Stack spacing={1} sx={{ mt: 3, pt: 2, borderTop: "1px dashed rgba(107, 114, 128, 0.2)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WorkspacePremiumOutlinedIcon sx={{ fontSize: 18, color: SHETA_COLORS.royalGold }} />
            <Typography variant="caption" sx={{ color: SHETA_COLORS.mutedSlate }}>
              100% Authentic Highland Extracts & Resins
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LockOutlinedIcon sx={{ fontSize: 18, color: SHETA_COLORS.royalGold }} />
            <Typography variant="caption" sx={{ color: SHETA_COLORS.mutedSlate }}>
              Direct Order Demo • No Payment Card Needed
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
