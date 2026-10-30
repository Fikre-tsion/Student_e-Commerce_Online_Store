"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

import { getFeaturedProducts } from "../data/products";
import ProductGrid from "../components/ProductGrid";
import { SHETA_COLORS } from "../theme/theme";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <Box sx={{ backgroundColor: SHETA_COLORS.alabaster }}>
      {/* =======================================================================
          1. HERO SECTION
          ======================================================================= */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: SHETA_COLORS.pureWhite,
          borderBottom: "1px solid rgba(107, 114, 128, 0.15)",
          pt: { xs: 8, md: 12 },
          pb: { xs: 9, md: 14 }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            {/* Left Column: Headline and Call-to-actions */}
            <Grid item xs={12} md={7}> 
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "serif",
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.2rem" },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: SHETA_COLORS.obsidian,
                  mb: 2
                }}
              >
                Where Ancient Highlands Meet Rare Extraits.
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontFamily: "serif",
                  fontStyle: "italic",
                  color: SHETA_COLORS.royalGold,
                  fontWeight: 500,
                  mb: 2.5
                }}
              >
                Sheta | ሽታ - The sacred poetry of scent and memory.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: SHETA_COLORS.mutedSlate,
                  fontSize: { xs: "1rem", md: "1.12rem" },
                  lineHeight: 1.8,
                  maxWidth: 580,
                  mb: 4
                }}
              >
                Discover artisanal extraits de parfum crafted from wild Bale highland frankincense,
                mountain Semien cedar, royal Damascene rose, and sun-drenched Harar vanilla. Each bottle
                is aged in small numbered batches.
              </Typography>

              {/* Action Buttons */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
                    py: 1.6,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor: SHETA_COLORS.royalGold,
                      color: SHETA_COLORS.pureWhite
                    }
                  }}
                >
                  Browse Fragrances
                </Button>

                <Button
                  component={Link}
                  href="/products?filter=featured"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: SHETA_COLORS.obsidian,
                    color: SHETA_COLORS.obsidian,
                    px: 3.5,
                    py: 1.6,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: SHETA_COLORS.royalGold,
                      color: SHETA_COLORS.royalGold,
                      backgroundColor: "transparent"
                    }
                  }}
                >
                  Featured Blends
                </Button>
              </Stack>
            </Grid>

            {/* Right Column: Hero Perfume Visual Frame */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 360, sm: 460, md: 520 },
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(18, 18, 18, 0.12)",
                  border: "1px solid rgba(197, 160, 89, 0.3)"
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85"
                  alt="Bottle of Sheta Bale Wild Frankincense artisan perfume"
                  fill
                  priority
                  sizes="(max-width: 960px) 100vw, 500px"
                  style={{ objectFit: "cover" }}
                />

                {/* Overlaid Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 24,
                    left: 24,
                    right: 24,
                    backgroundColor: "rgba(255, 255, 255, 0.94)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 2.5,
                    p: 2,
                    border: "1px solid rgba(107, 114, 128, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={{ color: SHETA_COLORS.royalGold, fontWeight: 700, letterSpacing: "0.08em" }}>
                      FEATURED HARVEST
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontFamily: "serif", fontWeight: 700, color: SHETA_COLORS.obsidian }}>
                      Bale Wild Frankincense (የባሌ ዕጣን)
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SHETA_COLORS.obsidian }}>
                    $135
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* =======================================================================
          2. SCENT FAMILIES PREVIEW
          ======================================================================= */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Box sx={{ textAlign: "center", maxWidth: 640, mx: "auto", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: SHETA_COLORS.royalGold,
              letterSpacing: "0.15em",
              fontWeight: 700,
              fontSize: "0.8rem"
            }}
          >
            DISCOVER YOUR SIGNATURE
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "serif",
              fontWeight: 700,
              color: SHETA_COLORS.obsidian,
              mt: 1,
              mb: 1.5
            }}
          >
            Curated Scent Families
          </Typography>
          <Typography variant="body1" sx={{ color: SHETA_COLORS.mutedSlate }}>
            From high-altitude smoky sacred resins to intoxicating nectar florals and warm spiced vanillas.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            {
              title: "Woody & Resinous",
              amharic: "ዕጣን እና ፅድ",
              desc: "Sacred Bale Frankincense resin, aged cedarwood & mountain juniper.",
              link: "/products?category=Woody+%26+Resinous"
            },
            {
              title: "Floral Oriental",
              amharic: "ጽጌረዳ እና ሳፍሮን",
              desc: "Damascene crimson roses steeped in royal oud and pure saffron.",
              link: "/products?category=Floral+Oriental"
            },
            {
              title: "Gourmand & Warm",
              amharic: "ቡና እና ቫኒላ",
              desc: "Roasted Harar Arabica coffee, bittersweet cocoa & Bourbon vanilla.",
              link: "/products?category=Gourmand+%26+Warm"
            }
          ].map((family) => (
            <Grid item xs={12} md={4} key={family.title}>
              <Card
                component={Link}
                href={family.link}
                sx={{
                  textDecoration: "none",
                  display: "block",
                  p: 3.5,
                  borderRadius: 3,
                  backgroundColor: SHETA_COLORS.pureWhite,
                  border: "1px solid rgba(107, 114, 128, 0.15)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: SHETA_COLORS.royalGold,
                    boxShadow: "0 12px 24px rgba(18, 18, 18, 0.08)"
                  }
                }}
              >
                <Typography variant="caption" sx={{ color: SHETA_COLORS.royalGold, fontWeight: 700 }}>
                  {family.amharic}
                </Typography>
                <Typography variant="h5" sx={{ fontFamily: "serif", fontWeight: 700, color: SHETA_COLORS.obsidian, my: 1 }}>
                  {family.title}
                </Typography>
                <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate, mb: 2 }}>
                  {family.desc}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: SHETA_COLORS.obsidian, fontWeight: 600, fontSize: "0.85rem" }}>
                  <span>Explore family</span>
                  <ArrowForwardIcon sx={{ fontSize: 16 }} />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* =======================================================================
          3. FEATURED PRODUCTS SHOWCASE
          ======================================================================= */}
      <Box
        sx={{
          backgroundColor: SHETA_COLORS.pureWhite,
          py: { xs: 8, md: 11 },
          borderTop: "1px solid rgba(107, 114, 128, 0.12)",
          borderBottom: "1px solid rgba(107, 114, 128, 0.12)"
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "flex-end" },
              mb: 5,
              gap: 2
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: SHETA_COLORS.royalGold,
                  letterSpacing: "0.15em",
                  fontWeight: 700,
                  fontSize: "0.8rem"
                }}
              >
                MASTER PARFUMEUR SELECTION
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "serif",
                  fontWeight: 700,
                  color: SHETA_COLORS.obsidian,
                  mt: 0.5
                }}
              >
                Featured Fragrances
              </Typography>
            </Box>

            <Button
              component={Link}
              href="/products"
              endIcon={<ArrowForwardIcon />}
              sx={{
                color: SHETA_COLORS.obsidian,
                fontWeight: 700,
                "&:hover": { color: SHETA_COLORS.royalGold }
              }}
            >
              View Full Collection
            </Button>
          </Box>

          {/* Render Featured Perfumes */}
          <ProductGrid products={featuredProducts} />
        </Container>
      </Box>

      {/* =======================================================================
          4. HERITAGE & CRAFTSMANSHIP PILLARS
          ======================================================================= */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", maxWidth: 640, mx: "auto", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: SHETA_COLORS.royalGold,
              letterSpacing: "0.15em",
              fontWeight: 700,
              fontSize: "0.8rem"
            }}
          >
            ARTISANAL STANDARDS
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "serif",
              fontWeight: 700,
              color: SHETA_COLORS.obsidian,
              mt: 1,
              mb: 2
            }}
          >
            The Soul of Sheta
          </Typography>
          <Typography variant="body1" sx={{ color: SHETA_COLORS.mutedSlate }}>
            We blend classical French haute perfumery methods with centuries-old botanical wisdom
            from Ethiopia's sacred mountains and incense trade routes.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              icon: <DiamondOutlinedIcon sx={{ fontSize: 32, color: SHETA_COLORS.royalGold }} />,
              title: "Extrait de Parfum (25%+)",
              desc: "Highest concentration of pure fragrance oils ensuring extraordinary longevity of over 14 hours on skin."
            },
            {
              icon: <SpaOutlinedIcon sx={{ fontSize: 32, color: SHETA_COLORS.royalGold }} />,
              title: "Ethically Harvested Resins",
              desc: "Boswellia tears foraged in partnership with local highland community guardians in Bale and Semien."
            },
            {
              icon: <HourglassEmptyOutlinedIcon sx={{ fontSize: 32, color: SHETA_COLORS.royalGold }} />,
              title: "Slow 90-Day Maceration",
              desc: "Each formulation rests in dark glass vessels for three full moons before cold filtration and hand-bottling."
            },
            {
              icon: <VerifiedOutlinedIcon sx={{ fontSize: 32, color: SHETA_COLORS.royalGold }} />,
              title: "Hand-Numbered Bottles",
              desc: "Every flacon is individually checked, numbered, and sealed in our signature protective cloth pouch."
            }
          ].map((pillar) => (
            <Grid item xs={12} sm={6} md={3} key={pillar.title}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  p: 3,
                  backgroundColor: SHETA_COLORS.pureWhite,
                  borderRadius: 3,
                  border: "1px solid rgba(107, 114, 128, 0.15)",
                  textAlign: "center"
                }}
              >
                <Box sx={{ mb: 2 }}>{pillar.icon}</Box>
                <Typography variant="h6" sx={{ fontFamily: "serif", fontWeight: 700, color: SHETA_COLORS.obsidian, mb: 1 }}>
                  {pillar.title}
                </Typography>
                <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate, lineHeight: 1.6 }}>
                  {pillar.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
