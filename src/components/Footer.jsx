"use client";
import React from "react";
import Link from "next/link";
import { Box, Container, Grid, Typography, Divider, Stack } from "@mui/material";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
import { SHETA_COLORS } from "../theme/theme";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: SHETA_COLORS.obsidian,
        color: SHETA_COLORS.pureWhite,
        pt: { xs: 8, md: 10 },
        pb: 5,
        mt: "auto",
        borderTop: `1px solid rgba(197, 160, 89, 0.2)`
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand & Manifesto Column */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "rgba(197, 160, 89, 0.15)",
                  color: SHETA_COLORS.royalGold,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <SparklesIcon sx={{ fontSize: 18 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "serif",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: SHETA_COLORS.pureWhite
                }}
              >
                SHETA{" "}
                <span style={{ color: SHETA_COLORS.royalGold, fontWeight: 500 }}>
                 | ሽታ
                </span>
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: SHETA_COLORS.mutedSlate,
                maxWidth: 420,
                lineHeight: 1.8,
                mb: 3
              }}
            >
              Sheta | ሽታ signifies the sublime presence of fragrance and aroma in
              Amharic. We craft artisanal extraits de parfum, marrying wild high-altitude
              Bale frankincense, Semien cedarwood, and Damascene rose with modern perfumery elegance.
            </Typography>
            <Typography variant="caption" sx={{ color: SHETA_COLORS.royalGold, letterSpacing: "0.08em" }}>
              CRAFTED WITH INTENTION • ADDIS ABABA & WORLDWIDE
            </Typography>
          </Grid>

          {/* Quick Links Column */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: SHETA_COLORS.royalGold,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                mb: 2
              }}
            >
              Fragrances
            </Typography>
            <Stack spacing={1.2}>
              <Link href="/products" style={{ color: SHETA_COLORS.mutedSlate, textDecoration: "none", fontSize: "0.875rem" }}>
                All Fragrances
              </Link>
              <Link href="/products?category=Woody+%26+Resinous" style={{ color: SHETA_COLORS.mutedSlate, textDecoration: "none", fontSize: "0.875rem" }}>
                Woody & Resinous
              </Link>
              <Link href="/products?category=Floral+Oriental" style={{ color: SHETA_COLORS.mutedSlate, textDecoration: "none", fontSize: "0.875rem" }}>
                Floral Oriental
              </Link>
              <Link href="/products?category=Gourmand+%26+Warm" style={{ color: SHETA_COLORS.mutedSlate, textDecoration: "none", fontSize: "0.875rem" }}>
                Gourmand & Warm
              </Link>
            </Stack>
          </Grid>


        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(107, 114, 128, 0.2)" }} />

        {/* Sub-footer copyright */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2
          }}
        >
          <Typography variant="caption" sx={{ color: SHETA_COLORS.mutedSlate }}>
            © {new Date().getFullYear()} Sheta Perfumes | ሽታ. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: SHETA_COLORS.mutedSlate }}>
            Bole • Addis Abeba • Ethiopia
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
