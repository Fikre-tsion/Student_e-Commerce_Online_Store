"use client";
import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  Divider,
  CircularProgress
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import SparklesIcon from "@mui/icons-material/AutoAwesome";

import { PRODUCTS, CATEGORIES } from "../../data/products";
import ProductGrid from "../../components/ProductGrid";
import { SHETA_COLORS } from "../../theme/theme";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All Fragrances";
  const initialFilter = searchParams.get("filter") || "";

  // State management for search, category filter, sorting, and in-stock toggle
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialFilter === "featured" ? "featured" : "featured");

  // Keep category in sync if URL query parameter changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && CATEGORIES.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  /**
   * Filter and sort products according to user controls
   */
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category filter
      if (selectedCategory !== "All Fragrances" && product.category !== selectedCategory) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(query);
        const amharicMatch = product.amharicName?.toLowerCase().includes(query);
        const descMatch = product.description.toLowerCase().includes(query);
        const notesMatch = Object.values(product.notes || {})
          .flat()
          .some((note) => note.toLowerCase().includes(query));

        if (!nameMatch && !amharicMatch && !descMatch && !notesMatch) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // 3. Sorting logic
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      // Default: featured first, then rating
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  // Handler to reset all filters to default state
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Fragrances");
    setSortBy("featured");
  };

  return (
    <Box sx={{ backgroundColor: SHETA_COLORS.alabaster, py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header Title & Subtitle */}
        <Box sx={{ textAlign: "center", maxWidth: 700, mx: "auto", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "serif",
              fontWeight: 700,
              color: SHETA_COLORS.obsidian,
              mb: 1.5
            }}
          >
            The Fragrance Catalogue
          </Typography>
          <Typography variant="body1" sx={{ color: SHETA_COLORS.mutedSlate }}>
            Browse our artisanal collection of extraits de parfum. Filter by sacred scent family,
            search for specific botanical notes, or sort by olfactory character.
          </Typography>
        </Box>

        {/* Filter Controls Bar */}
        <Box
          sx={{
            backgroundColor: SHETA_COLORS.pureWhite,
            borderRadius: 3,
            p: { xs: 2.5, md: 3 },
            border: "1px solid rgba(107, 114, 128, 0.15)",
            boxShadow: "0 4px 20px rgba(18, 18, 18, 0.03)",
            mb: 5
          }}
        >
          {/* Search Input & Sort Dropdown */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
            sx={{ mb: 2.5 }}
          >
            <TextField
              placeholder="Search by perfume name, notes (e.g., Frankincense, Rose), or Amharic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: SHETA_COLORS.mutedSlate }} />
                  </InputAdornment>
                )
              }}
              sx={{
                backgroundColor: SHETA_COLORS.alabaster,
                borderRadius: 2
              }}
            />

            <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 220 } }}>
              <InputLabel id="sort-select-label" sx={{ color: SHETA_COLORS.mutedSlate }}>
                Sort Fragrances
              </InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sortBy}
                label="Sort Fragrances"
                onChange={(e) => setSortBy(e.target.value)}
                sx={{
                  backgroundColor: SHETA_COLORS.alabaster,
                  borderRadius: 2
                }}
              >
                <MenuItem value="featured">Featured & Bestsellers</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="name">Alphabetical (A - Z)</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Divider sx={{ my: 2, borderColor: "rgba(107, 114, 128, 0.15)" }} />

          {/* Scent Family Category Filter Pills */}
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mr: 1, color: SHETA_COLORS.mutedSlate }}>
              <TuneIcon sx={{ fontSize: 18 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: "0.05em" }}>
                CATEGORIES:
              </Typography>
            </Box>

            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Chip
                  key={cat}
                  label={cat}
                  clickable
                  onClick={() => setSelectedCategory(cat)}
                  sx={{
                    backgroundColor: isSelected ? SHETA_COLORS.obsidian : SHETA_COLORS.alabaster,
                    color: isSelected ? SHETA_COLORS.pureWhite : SHETA_COLORS.obsidian,
                    fontWeight: isSelected ? 700 : 500,
                    border: isSelected
                      ? `1px solid ${SHETA_COLORS.obsidian}`
                      : "1px solid rgba(107, 114, 128, 0.2)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: isSelected ? SHETA_COLORS.obsidian : "rgba(197, 160, 89, 0.15)",
                      borderColor: SHETA_COLORS.royalGold
                    }
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* Results Metadata Summary */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="body2" sx={{ color: SHETA_COLORS.mutedSlate, fontWeight: 500 }}>
            Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} perfumes
            {selectedCategory !== "All Fragrances" && ` in "${selectedCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </Typography>

          {(selectedCategory !== "All Fragrances" || searchQuery !== "" || sortBy !== "featured") && (
            <Chip
              label="Reset Filters"
              size="small"
              onDelete={handleResetFilters}
              onClick={handleResetFilters}
              sx={{
                backgroundColor: "rgba(197, 160, 89, 0.15)",
                color: SHETA_COLORS.obsidian,
                fontWeight: 600,
                fontSize: "0.75rem"
              }}
            />
          )}
        </Box>

        {/* Product Grid Render */}
        <ProductGrid products={filteredProducts} onResetFilters={handleResetFilters} />
      </Container>
    </Box>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ py: 12, textAlign: "center", backgroundColor: SHETA_COLORS.alabaster }}>
          <CircularProgress sx={{ color: SHETA_COLORS.royalGold }} />
        </Box>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

