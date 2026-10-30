"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Container,
  Box,
  Grid,
  Typography,
  Chip,
  Rating,
  Stack,
  Divider,
  IconButton,
  Button,
  Card,
  CardContent
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import SparklesIcon from "@mui/icons-material/AutoAwesome";

import { getProductById, PRODUCTS } from "../../../data/products";
import AddToCartButton from "../../../components/AddToCartButton";
import ProductCard from "../../../components/ProductCard";
import { SHETA_COLORS } from "../../../theme/theme";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id;
  const product = getProductById(productId);

  // Local state for bottle quantity selection
  const [quantity, setQuantity] = useState(1);

  // Quantity increment/decrement handlers
  const handleIncrease = () => setQuantity((prev) => Math.min(10, prev + 1));
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));

  // ===========================================================================
  // 1. NOT-FOUND GRACEFUL FALLBACK STATE
  // ===========================================================================
  if (!product) {
    return (
      <Box sx={{ py: 12, px: 3, textAlign: "center", backgroundColor: SHETA_COLORS.alabaster }}>
        <Container maxWidth="sm">
          <Card
            sx={{
              p: 5,
              borderRadius: 4,
              backgroundColor: SHETA_COLORS.pureWhite,
              border: "1px solid rgba(107, 114, 128, 0.2)"
            }}
          >
            <SentimentDissatisfiedOutlinedIcon sx={{ fontSize: 56, color: SHETA_COLORS.mutedSlate, mb: 2 }} />
            <Typography variant="h4" sx={{ fontFamily: "serif", fontWeight: 700, mb: 1.5, color: SHETA_COLORS.obsidian }}>
              Fragrance Not Found
            </Typography>
            <Typography variant="body1" sx={{ color: SHETA_COLORS.mutedSlate, mb: 4, lineHeight: 1.7 }}>
              The requested perfume ID <code>"{productId}"</code> does not exist in our olfactory archive, or may have been retired.
            </Typography>
            <Button
              component={Link}
              href="/products"
              variant="contained"
              startIcon={<ArrowBackIcon />}
              sx={{
                backgroundColor: SHETA_COLORS.obsidian,
                color: SHETA_COLORS.pureWhite,
                px: 3.5,
                py: 1.2,
                "&:hover": { backgroundColor: SHETA_COLORS.royalGold }
              }}
            >
              Back to Catalogue
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  // Related products (same category or alternative blends)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  // If less than 3 in same category, supplement with others
  const finalRelated =
    relatedProducts.length >= 3
      ? relatedProducts
      : [
          ...relatedProducts,
          ...PRODUCTS.filter((p) => p.id !== product.id && !relatedProducts.includes(p))
        ].slice(0, 3);

  return (
    <Box sx={{ backgroundColor: SHETA_COLORS.alabaster, py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Navigation Breadcrumb */}
        <Box sx={{ mb: 4 }}>
          <Button
            component={Link}
            href="/products"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: SHETA_COLORS.obsidian,
              fontWeight: 600,
              fontSize: "0.85rem",
              "&:hover": { color: SHETA_COLORS.royalGold }
            }}
          >
            Back to All Fragrances
          </Button>
        </Box>

        {/* Main Product Presentation */}
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="flex-start">
          {/* Left Column: Bottle Photography Showcase */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingTop: "115%", // Tall luxury flacon aspect ratio
                borderRadius: 4,
                overflow: "hidden",
                backgroundColor: "#f4ede4",
                border: "1px solid rgba(197, 160, 89, 0.3)",
                boxShadow: "0 16px 36px rgba(18, 18, 18, 0.08)"
              }}
            >
              <Image
                src={product.image}
                alt={`Artisanal bottle of ${product.name}`}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 600px"
                style={{ objectFit: "cover" }}
              />

              {/* In Stock Badge */}
              <Box sx={{ position: "absolute", top: 20, right: 20 }}>
                <Chip
                  label={product.available ? "In Stock • Extrait" : "Out of Stock"}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    color: SHETA_COLORS.obsidian,
                    fontWeight: 700,
                    border: `1px solid ${SHETA_COLORS.royalGold}`
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Perfume Story, Notes, and Add to Cart */}
          <Grid item xs={12} md={6}>
            {/* Category and Amharic Title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Chip
                label={product.category}
                size="small"
                sx={{
                  backgroundColor: "rgba(197, 160, 89, 0.15)",
                  color: SHETA_COLORS.obsidian,
                  fontWeight: 700,
                  fontSize: "0.75rem"
                }}
              />
              <Typography variant="body2" sx={{ color: SHETA_COLORS.royalGold, fontWeight: 700 }}>
                {product.amharicName}
              </Typography>
            </Box>

            {/* Perfume Name */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontFamily: "serif",
                fontWeight: 700,
                color: SHETA_COLORS.obsidian,
                fontSize: { xs: "2.2rem", md: "2.8rem" },
                lineHeight: 1.15,
                mb: 1.5
              }}
            >
              {product.name}
            </Typography>

            {/* Price & Flacon Volume */}
            <Stack direction="row" spacing={2} alignItems="baseline" sx={{ mb: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontFamily: "serif",
                  color: SHETA_COLORS.obsidian
                }}
              >
                ${product.price}
              </Typography>
              <Typography variant="body1" sx={{ color: SHETA_COLORS.mutedSlate }}>
                • {product.size} (Extrait de Parfum)
              </Typography>
            </Stack>

            {/* Ratings & Reviews */}
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
              <Rating
                value={product.rating}
                precision={0.1}
                readOnly
                sx={{
                  "& .MuiRating-iconFilled": { color: SHETA_COLORS.royalGold }
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600, color: SHETA_COLORS.obsidian }}>
                {product.rating} / 5.0
              </Typography>
              <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate }}>
                ({product.reviewCount} customer reviews)
              </Typography>
            </Stack>

            {/* Perfumer's Description */}
            <Typography
              variant="body1"
              sx={{
                color: SHETA_COLORS.mutedSlate,
                lineHeight: 1.8,
                fontSize: "1.05rem",
                mb: 4
              }}
            >
              {product.description}
            </Typography>

            {/* Olfactory Pyramid Breakdown */}
            {product.notes && (
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: SHETA_COLORS.pureWhite,
                  border: "1px solid rgba(107, 114, 128, 0.15)",
                  mb: 4
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: "serif",
                    fontWeight: 700,
                    color: SHETA_COLORS.obsidian,
                    mb: 2,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}
                >
                  Olfactory Pyramid
                </Typography>

                <Stack spacing={1.8}>
                  {/* Top Notes */}
                  <Box>
                    <Typography variant="caption" sx={{ color: SHETA_COLORS.royalGold, fontWeight: 700, display: "block", mb: 0.5 }}>
                      TOP NOTES (Opening 15 mins)
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {product.notes.top?.map((note) => (
                        <Chip
                          key={note}
                          label={note}
                          size="small"
                          sx={{ backgroundColor: SHETA_COLORS.alabaster, color: SHETA_COLORS.obsidian, fontWeight: 500 }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Heart Notes */}
                  <Box>
                    <Typography variant="caption" sx={{ color: SHETA_COLORS.royalGold, fontWeight: 700, display: "block", mb: 0.5 }}>
                      HEART NOTES (Core character)
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {product.notes.heart?.map((note) => (
                        <Chip
                          key={note}
                          label={note}
                          size="small"
                          sx={{ backgroundColor: SHETA_COLORS.alabaster, color: SHETA_COLORS.obsidian, fontWeight: 500 }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Base Notes */}
                  <Box>
                    <Typography variant="caption" sx={{ color: SHETA_COLORS.royalGold, fontWeight: 700, display: "block", mb: 0.5 }}>
                      BASE NOTES (Dry-down & Longevity)
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {product.notes.base?.map((note) => (
                        <Chip
                          key={note}
                          label={note}
                          size="small"
                          sx={{ backgroundColor: SHETA_COLORS.alabaster, color: SHETA_COLORS.obsidian, fontWeight: 500 }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            )}

            {/* Quantity Selector and Add to Cart Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: SHETA_COLORS.mutedSlate, display: "block", mb: 1 }}>
                SELECT QUANTITY:
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                {/* Stepper Controls */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: SHETA_COLORS.pureWhite,
                    border: "1px solid rgba(107, 114, 128, 0.25)",
                    borderRadius: 2,
                    p: 0.5,
                    width: { xs: "100%", sm: "auto" },
                    justifyContent: "space-between"
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    sx={{ color: SHETA_COLORS.obsidian }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    sx={{
                      px: 2.5,
                      fontWeight: 700,
                      minWidth: 40,
                      textAlign: "center",
                      color: SHETA_COLORS.obsidian
                    }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={handleIncrease}
                    disabled={quantity >= 10}
                    aria-label="Increase quantity"
                    sx={{ color: SHETA_COLORS.obsidian }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* Add to Cart Button */}
                <AddToCartButton
                  product={product}
                  quantity={quantity}
                  size="large"
                  fullWidth
                  sx={{ flexGrow: 1 }}
                />
              </Stack>
            </Box>

            <Divider sx={{ my: 3.5, borderColor: "rgba(107, 114, 128, 0.15)" }} />

            {/* Value Guarantees */}
            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <SparklesIcon sx={{ fontSize: 20, color: SHETA_COLORS.royalGold }} />
                <Typography variant="body2" sx={{ color: SHETA_COLORS.obsidian }}>
                  <strong>Complimentary Samples:</strong> Includes two 2ml discovery vials with your order.
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <LocalShippingOutlinedIcon sx={{ fontSize: 20, color: SHETA_COLORS.royalGold }} />
                <Typography variant="body2" sx={{ color: SHETA_COLORS.obsidian }}>
                  <strong>Dispatched in 24 Hours:</strong> Safely packed in our custom velvet sleeve.
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <WorkspacePremiumOutlinedIcon sx={{ fontSize: 20, color: SHETA_COLORS.royalGold }} />
                <Typography variant="body2" sx={{ color: SHETA_COLORS.obsidian }}>
                  <strong>100% Guaranteed Extraction:</strong> Distilled from rare highland resins.
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Related Fragrances Section */}
        <Box sx={{ mt: { xs: 10, md: 14 } }}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="overline" sx={{ color: SHETA_COLORS.royalGold, fontWeight: 700, letterSpacing: "0.1em" }}>
              COMPLEMENTARY CREATIONS
            </Typography>
            <Typography variant="h4" sx={{ fontFamily: "serif", fontWeight: 700, color: SHETA_COLORS.obsidian }}>
              You May Also Admire
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {finalRelated.map((rel) => (
              <Grid item xs={12} sm={6} md={4} key={rel.id} sx={{ display: "flex" }}>
                <ProductCard product={rel} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
