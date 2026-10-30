"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Box,
  Typography,
  Card,
  Grid,
  Divider,
  Button,
  Stack,
  Chip
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import SparklesIcon from "@mui/icons-material/AutoAwesome";

import { SHETA_COLORS } from "../../theme/theme";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState(null);

  // Retrieve submitted order payload from sessionStorage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("sheta_last_order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Could not retrieve order details from sessionStorage:", err);
    }
  }, []);

  // Safe fallback if user navigates directly without an order session
  const fallbackReference = "SHETA-2026-DEMO";

  const orderReference = order?.orderReference || fallbackReference;
  const customer = order?.customer || {
    fullName: "Valued Fragrance Connoisseur",
    email: "customer@example.com",
    phone: "+251 91 123 4567",
    address: "Bole Medhanealem",
    city: "Addis Ababa"
  };
  const items = order?.items || [];
  const financials = order?.financials || {
    subtotal: 135,
    shipping: 0,
    tax: 6.75,
    grandTotal: 141.75
  };

  return (
    <Box sx={{ backgroundColor: SHETA_COLORS.alabaster, py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Card
          elevation={0}
          sx={{
            p: { xs: 3.5, md: 6 },
            backgroundColor: SHETA_COLORS.pureWhite,
            borderRadius: 4,
            border: "1px solid rgba(107, 114, 128, 0.15)",
            boxShadow: "0 10px 30px rgba(18, 18, 18, 0.04)"
          }}
        >
          {/* Success Checkmark Insignia */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 76,
                height: 76,
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
              <CheckCircleIcon sx={{ fontSize: 44, color: SHETA_COLORS.royalGold }} />
            </Box>

            <Chip
              icon={<SparklesIcon style={{ color: SHETA_COLORS.royalGold, fontSize: 16 }} />}
              label="ORDER CONFIRMED & REGISTERED"
              size="small"
              sx={{
                backgroundColor: "rgba(197, 160, 89, 0.12)",
                color: SHETA_COLORS.obsidian,
                fontWeight: 700,
                letterSpacing: "0.08em",
                mb: 1.5
              }}
            />

            <Typography
              variant="h3"
              sx={{
                fontFamily: "serif",
                fontWeight: 700,
                color: SHETA_COLORS.obsidian,
                mb: 1
              }}
            >
              Thank You, {customer.fullName}
            </Typography>

            <Typography variant="body1" sx={{ color: SHETA_COLORS.mutedSlate, maxWidth: 540, mx: "auto" }}>
              Your artisanal perfume request has been received. Your flacons are now being
              prepared with highland botanical care.
            </Typography>

            <Box
              sx={{
                display: "inline-block",
                mt: 3,
                px: 3,
                py: 1,
                borderRadius: 2,
                backgroundColor: SHETA_COLORS.alabaster,
                border: "1px dashed rgba(197, 160, 89, 0.5)"
              }}
            >
              <Typography variant="caption" sx={{ color: SHETA_COLORS.mutedSlate, display: "block" }}>
                ORDER REFERENCE NUMBER
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: SHETA_COLORS.obsidian
                }}
              >
                {orderReference}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 4, borderColor: "rgba(107, 114, 128, 0.15)" }} />

          {/* Delivery & Contact Details */}
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "serif",
                  fontWeight: 700,
                  color: SHETA_COLORS.obsidian,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 1
                }}
              >
                Delivery Address
              </Typography>
              <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate, lineHeight: 1.7 }}>
                {customer.fullName}
                <br />
                {customer.address}
                <br />
                {customer.city}
                {customer.region ? `, ${customer.region}` : ""}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "serif",
                  fontWeight: 700,
                  color: SHETA_COLORS.obsidian,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 1
                }}
              >
                Contact Details
              </Typography>
              <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate, lineHeight: 1.7 }}>
                Email: {customer.email}
                <br />
                Phone: {customer.phone}
                <br />
                Status: Scheduled for Packaging
              </Typography>
            </Grid>
          </Grid>

          {/* Summary of Items */}
          {items.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "serif",
                  fontWeight: 700,
                  color: SHETA_COLORS.obsidian,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 2
                }}
              >
                Fragrance Summary
              </Typography>

              <Stack spacing={2}>
                {items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: SHETA_COLORS.alabaster
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          position: "relative",
                          width: 44,
                          height: 48,
                          borderRadius: 1.5,
                          overflow: "hidden",
                          flexShrink: 0
                        }}
                      >
                        <Image src={item.image} alt={item.name} fill sizes="44px" style={{ objectFit: "cover" }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: SHETA_COLORS.obsidian }}>
                          {item.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: SHETA_COLORS.mutedSlate }}>
                          Qty: {item.quantity} × ${item.price} • {item.size}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ fontWeight: 700, color: SHETA_COLORS.obsidian }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* Financial Breakdown */}
          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              backgroundColor: SHETA_COLORS.alabaster,
              border: "1px solid rgba(107, 114, 128, 0.15)",
              mb: 4
            }}
          >
            <Stack spacing={1}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
                  Subtotal
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: SHETA_COLORS.obsidian }}>
                  ${financials.subtotal.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
                  Shipping
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: SHETA_COLORS.royalGold }}>
                  {financials.shipping === 0 ? "FREE" : `$${financials.shipping.toFixed(2)}`}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
                  Tax
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: SHETA_COLORS.obsidian }}>
                  ${financials.tax.toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ my: 1, borderColor: "rgba(107, 114, 128, 0.15)" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SHETA_COLORS.obsidian }}>
                  Total Authorized
                </Typography>
                <Typography variant="h5" sx={{ fontFamily: "serif", fontWeight: 800, color: SHETA_COLORS.obsidian }}>
                  ${financials.grandTotal.toFixed(2)}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Next Steps Timeline */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "serif",
                fontWeight: 700,
                color: SHETA_COLORS.obsidian,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                mb: 2
              }}
            >
              Order Journey Ahead
            </Typography>

            <Grid container spacing={2}>
              {[
                {
                  step: "1. Order Queued",
                  desc: "Your order details are logged in the master formulation journal."
                },
                {
                  step: "2. Bottling & Sealing",
                  desc: "Each extrait is checked, hand-numbered, and placed in velvet."
                },
                {
                  step: "3. Direct Dispatch",
                  desc: "Courier coordination with direct delivery to your address."
                }
              ].map((s) => (
                <Grid item xs={12} sm={4} key={s.step}>
                  <Box
                    sx={{
                      p: 2,
                      height: "100%",
                      borderRadius: 2,
                      border: "1px solid rgba(107, 114, 128, 0.15)",
                      backgroundColor: SHETA_COLORS.pureWhite
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: SHETA_COLORS.royalGold, mb: 0.5 }}>
                      {s.step}
                    </Typography>
                    <Typography variant="caption" sx={{ color: SHETA_COLORS.mutedSlate }}>
                      {s.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Action to continue shopping */}
          <Box sx={{ textAlign: "center", pt: 2 }}>
            <Button
              component={Link}
              href="/products"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: SHETA_COLORS.obsidian,
                color: SHETA_COLORS.pureWhite,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: SHETA_COLORS.royalGold,
                  color: SHETA_COLORS.pureWhite
                }
              }}
            >
              Explore More Fragrances
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
