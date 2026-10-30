"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
  Stack
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useCart } from "../context/CartContext";
import { SHETA_COLORS } from "../theme/theme";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Quick action: Add to Cart with feedback animation
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <Card
      component={Link}
      href={`/products/${product.id}`}
      sx={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        borderRadius: 3,
        backgroundColor: SHETA_COLORS.pureWhite,
        border: "1px solid rgba(107, 114, 128, 0.15)",
        transition: "all 0.28s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: SHETA_COLORS.royalGold,
          boxShadow: "0 14px 28px rgba(18, 18, 18, 0.08)"
        }
      }}
    >
      {/* Category Pill Tag */}
      <Box sx={{ position: "absolute", top: 14, left: 14, zIndex: 2 }}>
        <Chip
          label={product.category}
          size="small"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            color: SHETA_COLORS.obsidian,
            fontWeight: 600,
            fontSize: "0.72rem",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(107, 114, 128, 0.2)"
          }}
        />
      </Box>

      {/* Stock Availability Badge */}
      <Box sx={{ position: "absolute", top: 14, right: 14, zIndex: 2 }}>
        <Chip
          label={product.available ? "In Stock" : "Reserved"}
          size="small"
          sx={{
            backgroundColor: product.available
              ? "rgba(197, 160, 89, 0.18)"
              : "rgba(107, 114, 128, 0.18)",
            color: product.available ? SHETA_COLORS.obsidian : SHETA_COLORS.mutedSlate,
            fontWeight: 600,
            fontSize: "0.7rem",
            border: `1px solid ${product.available ? SHETA_COLORS.royalGold : SHETA_COLORS.mutedSlate}`
          }}
        />
      </Box>

      {/* Perfume Bottle Image Container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "105%", // 1:1.05 luxury aspect ratio
          backgroundColor: "#f4ede4",
          overflow: "hidden"
        }}
      >
        <Image
          src={product.image}
          alt={`Bottle of ${product.name} luxury perfume`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            transition: "transform 0.45s ease"
          }}
          className="product-image"
        />
      </Box>

      {/* Product Information Body */}
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Scent Profile summary */}
        <Typography
          variant="caption"
          sx={{
            color: SHETA_COLORS.royalGold,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            mb: 0.5,
            fontSize: "0.72rem"
          }}
        >
          {product.scentProfile || product.category}
        </Typography>

        {/* Perfume Title with Amharic Script */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "serif",
            fontWeight: 700,
            color: SHETA_COLORS.obsidian,
            fontSize: "1.1rem",
            lineHeight: 1.3,
            mb: 0.5
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: SHETA_COLORS.mutedSlate,
            fontFamily: "sans-serif",
            fontSize: "0.82rem",
            mb: 1.5,
            display: "block"
          }}
        >
          {product.amharicName} • {product.size}
        </Typography>

        {/* Rating and Reviews */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.8 }}>
          <Rating
            value={product.rating}
            precision={0.1}
            size="small"
            readOnly
            sx={{
              "& .MuiRating-iconFilled": {
                color: SHETA_COLORS.royalGold
              }
            }}
          />
          <Typography variant="caption" sx={{ color: SHETA_COLORS.mutedSlate, fontWeight: 500 }}>
            {product.rating} ({product.reviewCount})
          </Typography>
        </Stack>

        {/* Footer Row: Price & Action */}
        <Box
          sx={{
            mt: "auto",
            pt: 1.5,
            borderTop: "1px solid rgba(107, 114, 128, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: SHETA_COLORS.mutedSlate, display: "block" }}>
              Price
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: SHETA_COLORS.obsidian,
                fontSize: "1.2rem",
                lineHeight: 1
              }}
            >
              ${product.price}
            </Typography>
          </Box>

          <Button
            variant={isAdded ? "contained" : "outlined"}
            size="small"
            onClick={handleAddToCart}
            startIcon={isAdded ? <CheckIcon /> : <ShoppingBagOutlinedIcon />}
            sx={{
              borderColor: isAdded ? SHETA_COLORS.royalGold : SHETA_COLORS.obsidian,
              backgroundColor: isAdded ? SHETA_COLORS.royalGold : "transparent",
              color: isAdded ? SHETA_COLORS.pureWhite : SHETA_COLORS.obsidian,
              py: 0.8,
              px: 1.8,
              fontSize: "0.8rem",
              "&:hover": {
                backgroundColor: isAdded ? SHETA_COLORS.royalGold : SHETA_COLORS.obsidian,
                color: SHETA_COLORS.pureWhite,
                borderColor: SHETA_COLORS.obsidian
              }
            }}
          >
            {isAdded ? "Added" : "Add"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
