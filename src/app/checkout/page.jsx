"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  Stack,
  Alert,
  CircularProgress
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SecurityIcon from "@mui/icons-material/Security";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import { useCart } from "../../context/CartContext";
import { SHETA_COLORS } from "../../theme/theme";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartCount, subtotal, shipping, tax, grandTotal, clearCart, isLoaded } = useCart();

  // Form input state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
    notes: ""
  });

  // Validation errors state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, prevent access and direct back to catalogue
  useEffect(() => {
    if (isLoaded && cartCount === 0) {
      router.replace("/products");
    }
  }, [isLoaded, cartCount, router]);

  // Form field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field being edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /**
   * Validate required delivery and contact fields
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full legal name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required for dispatch updates.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g., name@domain.com).";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required for courier delivery coordination.";
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = "Please enter a complete contact phone number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please provide your street or residential delivery address.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City / Municipality is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle order submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty. Please select a fragrance before submitting.");
      return;
    }

    setIsSubmitting(true);

    // Generate unique order reference (e.g. SHETA-2026-8492)
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const orderReference = `SHETA-2026-${randomCode}`;

    // Assemble submitted order record
    const completedOrder = {
      orderReference,
      createdAt: new Date().toISOString(),
      customer: { ...formData },
      items: cart,
      financials: {
        subtotal,
        shipping,
        tax,
        grandTotal
      }
    };

    // Store order in sessionStorage for /order-success page rendering
    try {
      sessionStorage.setItem("sheta_last_order", JSON.stringify(completedOrder));
    } catch (err) {
      console.error("Failed to store order reference in sessionStorage:", err);
    }

    // Clear active shopping cart state
    clearCart();

    // Small delay to simulate pleasant processing feedback
    setTimeout(() => {
      router.push("/order-success");
    }, 600);
  };

  if (!isLoaded || cartCount === 0) {
    return (
      <Box sx={{ py: 12, textAlign: "center", backgroundColor: SHETA_COLORS.alabaster }}>
        <CircularProgress sx={{ color: SHETA_COLORS.royalGold }} />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: SHETA_COLORS.alabaster, py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Back Link & Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            component={Link}
            href="/cart"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: SHETA_COLORS.obsidian,
              fontWeight: 600,
              mb: 1.5,
              "&:hover": { color: SHETA_COLORS.royalGold }
            }}
          >
            Return to Scent Bag
          </Button>

          <Typography
            variant="h3"
            sx={{
              fontFamily: "serif",
              fontWeight: 700,
              color: SHETA_COLORS.obsidian,
              mb: 0.5
            }}
          >
            Delivery & Customer Details
          </Typography>
          <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
            Complete your delivery information below. 
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Left Column: Delivery Form */}
          <Grid item xs={12} md={7}>
            <Card
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                backgroundColor: SHETA_COLORS.pureWhite,
                border: "1px solid rgba(107, 114, 128, 0.15)"
              }}
            >

              <Box component="form" onSubmit={handleSubmit} noValidate>
                {/* 1. Contact Information */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "serif",
                    fontWeight: 700,
                    color: SHETA_COLORS.obsidian,
                    mb: 2.5
                  }}
                >
                  1. Contact Information
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Full Legal Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      error={Boolean(errors.fullName)}
                      helperText={errors.fullName}
                      placeholder="e.g., Abebe Bikila"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      type="email"
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      placeholder="name@example.com"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Contact Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={Boolean(errors.phone)}
                      helperText={errors.phone}
                      placeholder="+251 91 123 4567"
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: "rgba(107, 114, 128, 0.15)" }} />

                {/* 2. Delivery Address */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "serif",
                    fontWeight: 700,
                    color: SHETA_COLORS.obsidian,
                    mb: 2.5
                  }}
                >
                  2. Destination Delivery Address
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Street Address / House / Building"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      error={Boolean(errors.address)}
                      helperText={errors.address}
                      placeholder="e.g., Bole Medhanealem, House #402"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="City / Subcity"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      error={Boolean(errors.city)}
                      helperText={errors.city}
                      placeholder="e.g., Addis Ababa"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Region / State / Postal Code"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      placeholder="e.g., Shewa / 1000"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Special Instructions / Fragrance Gift Note (Optional)"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g., Please ring doorbell or package as a gift."
                    />
                  </Grid>
                </Grid>

                {/* Submit Action Button */}
                <Box sx={{ mt: 5 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isSubmitting}
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} sx={{ color: SHETA_COLORS.pureWhite }} />
                      ) : (
                        <CheckCircleOutlineIcon />
                      )
                    }
                    sx={{
                      backgroundColor: SHETA_COLORS.obsidian,
                      color: SHETA_COLORS.pureWhite,
                      py: 1.6,
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      "&:hover": {
                        backgroundColor: SHETA_COLORS.royalGold,
                        color: SHETA_COLORS.pureWhite
                      }
                    }}
                  >
                    {isSubmitting ? "Confirming Order..." : `Place Fragrance Order • $${grandTotal.toFixed(2)}`}
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Right Column: Order Summary Preview */}
          <Grid item xs={12} md={5}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: SHETA_COLORS.pureWhite,
                border: "1px solid rgba(107, 114, 128, 0.15)"
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "serif",
                  fontWeight: 700,
                  color: SHETA_COLORS.obsidian,
                  mb: 2
                }}
              >
                Order Summary ({cartCount} {cartCount === 1 ? "bottle" : "bottles"})
              </Typography>

              {/* Items List */}
              <Stack spacing={2} sx={{ mb: 3 }}>
                {cart.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        sx={{
                          position: "relative",
                          width: 48,
                          height: 52,
                          borderRadius: 1.5,
                          overflow: "hidden",
                          backgroundColor: "#f4ede4",
                          flexShrink: 0
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="48px"
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: SHETA_COLORS.obsidian, lineHeight: 1.2 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: SHETA_COLORS.mutedSlate }}>
                          Qty: {item.quantity} × ${item.price}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ fontWeight: 700, color: SHETA_COLORS.obsidian }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 2, borderColor: "rgba(107, 114, 128, 0.15)" }} />

              {/* Cost Calculations */}
              <Stack spacing={1.2} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
                    Subtotal
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: SHETA_COLORS.obsidian }}>
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
                    Shipping
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: SHETA_COLORS.royalGold }}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
                    Estimated Tax
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: SHETA_COLORS.obsidian }}>
                    ${tax.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2, borderColor: "rgba(107, 114, 128, 0.15)" }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SHETA_COLORS.obsidian }}>
                  Total to Authorize
                </Typography>
                <Typography variant="h5" sx={{ fontFamily: "serif", fontWeight: 800, color: SHETA_COLORS.obsidian }}>
                  ${grandTotal.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: SHETA_COLORS.alabaster }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalShippingOutlinedIcon sx={{ fontSize: 18, color: SHETA_COLORS.royalGold }} />
                  <Typography variant="caption" sx={{ color: SHETA_COLORS.obsidian, fontWeight: 600 }}>
                    Includes 2 Complimentary Scent Vials
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
