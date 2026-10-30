"use client";

/**
 * ==============================================================================
 * SHETA (ሽታ) - MATERIAL UI THEME DEFINITION
 * ==============================================================================
 * Strict 5-Color Luxury Palette:
 * 1. #121212 - Obsidian Onyx (Primary text, dark headers, bold actions)
 * 2. #C5A059 - Royal Gold (Accent essence, ratings, active badges, highlights)
 * 3. #FAF8F5 - Alabaster Cream (Global ambient background canvas)
 * 4. #FFFFFF - Pure White (Card surfaces, inputs, modal containers)
 * 5. #6B7280 - Muted Slate (Secondary text, borders, placeholders, metadata)
 *
 * Performance Optimization (Day 43):
 * - Uses next/font CSS variables (--font-sans, --font-playfair) with display: swap.
 * - Completely avoids Roboto requests to eliminate font-display and render-blocking delays.
 * ==============================================================================
 */

import { createTheme } from "@mui/material/styles";

// Export explicit color tokens so any component can reference the exact 5 colors
export const SHETA_COLORS = {
  obsidian: "#121212",
  royalGold: "#C5A059",
  alabaster: "#FAF8F5",
  pureWhite: "#FFFFFF",
  mutedSlate: "#6B7280"
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: SHETA_COLORS.obsidian,
      contrastText: SHETA_COLORS.pureWhite
    },
    secondary: {
      main: SHETA_COLORS.royalGold,
      contrastText: SHETA_COLORS.obsidian
    },
    background: {
      default: SHETA_COLORS.alabaster,
      paper: SHETA_COLORS.pureWhite
    },
    text: {
      primary: SHETA_COLORS.obsidian,
      secondary: SHETA_COLORS.mutedSlate
    },
    divider: "rgba(107, 114, 128, 0.2)"
  },
  typography: {
    fontFamily: [
      "var(--font-sans)",
      "-apple-system",
      "BlinkMacSystemFont",
      "'Segoe UI'",
      "sans-serif"
    ].join(","),
    h1: {
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: SHETA_COLORS.obsidian
    },
    h2: {
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: SHETA_COLORS.obsidian
    },
    h3: {
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      color: SHETA_COLORS.obsidian
    },
    h4: {
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontWeight: 600,
      color: SHETA_COLORS.obsidian
    },
    h5: {
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontWeight: 600,
      color: SHETA_COLORS.obsidian
    },
    h6: {
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontWeight: 600,
      color: SHETA_COLORS.obsidian
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.03em"
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          transition: "all 0.2s ease-in-out"
        },
        containedPrimary: {
          backgroundColor: SHETA_COLORS.obsidian,
          color: SHETA_COLORS.pureWhite,
          "&:hover": {
            backgroundColor: "#27272a"
          }
        },
        containedSecondary: {
          backgroundColor: SHETA_COLORS.royalGold,
          color: SHETA_COLORS.pureWhite,
          "&:hover": {
            backgroundColor: "#b38f45"
          }
        },
        outlinedPrimary: {
          borderColor: SHETA_COLORS.obsidian,
          color: SHETA_COLORS.obsidian,
          "&:hover": {
            borderColor: SHETA_COLORS.royalGold,
            color: SHETA_COLORS.royalGold,
            backgroundColor: "transparent"
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: SHETA_COLORS.pureWhite,
          borderRadius: 12,
          border: "1px solid rgba(107, 114, 128, 0.15)",
          boxShadow: "0 4px 20px rgba(18, 18, 18, 0.04)",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          "&:hover": {
            boxShadow: "0 12px 32px rgba(18, 18, 18, 0.08)"
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: SHETA_COLORS.pureWhite,
          borderRadius: 8,
          "& fieldset": {
            borderColor: "rgba(107, 114, 128, 0.3)"
          },
          "&:hover fieldset": {
            borderColor: SHETA_COLORS.royalGold
          },
          "&.Mui-focused fieldset": {
            borderColor: SHETA_COLORS.royalGold
          }
        }
      }
    }
  }
});

export default theme;
