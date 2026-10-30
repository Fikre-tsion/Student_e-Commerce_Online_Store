"use client";
import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useCart } from "../context/CartContext";
import { SHETA_COLORS } from "../theme/theme";

export default function AddToCartButton({
  product,
  quantity = 1,
  size = "medium",
  variant = "contained",
  fullWidth = false,
  sx = {}
}) {
  const { addToCart } = useCart();
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success'

  const handleAction = () => {
    if (!product || !product.available) return;

    setStatus("loading");
    setTimeout(() => {
      addToCart(product, quantity);
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
      }, 1500);
    }, 250);
  };

  const isSuccess = status === "success";
  const isLoading = status === "loading";
  const isDisabled = !product?.available || isLoading;

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={isDisabled}
      onClick={handleAction}
      startIcon={
        isLoading ? (
          <CircularProgress size={18} sx={{ color: SHETA_COLORS.pureWhite }} />
        ) : isSuccess ? (
          <CheckCircleOutlineIcon />
        ) : (
          <ShoppingBagOutlinedIcon />
        )
      }
      sx={{
        backgroundColor: isSuccess
          ? SHETA_COLORS.royalGold
          : variant === "contained"
          ? SHETA_COLORS.obsidian
          : "transparent",
        color: variant === "contained" || isSuccess ? SHETA_COLORS.pureWhite : SHETA_COLORS.obsidian,
        borderColor: isSuccess
          ? SHETA_COLORS.royalGold
          : variant === "outlined"
          ? SHETA_COLORS.obsidian
          : "transparent",
        fontWeight: 600,
        letterSpacing: "0.04em",
        py: size === "large" ? 1.5 : 1,
        px: 3,
        transition: "all 0.25s ease",
        "&:hover": {
          backgroundColor: isSuccess
            ? SHETA_COLORS.royalGold
            : SHETA_COLORS.royalGold,
          borderColor: SHETA_COLORS.royalGold,
          color: SHETA_COLORS.pureWhite
        },
        "&.Mui-disabled": {
          backgroundColor: "rgba(107, 114, 128, 0.15)",
          color: SHETA_COLORS.mutedSlate
        },
        ...sx
      }}
    >
      {isLoading
        ? "Adding..."
        : isSuccess
        ? "Added to Scent Bag"
        : !product?.available
        ? "Sold Out"
        : `Add to Cart • $${(product.price * quantity).toFixed(2)}`}
    </Button>
  );
}
