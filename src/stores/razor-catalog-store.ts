import { create } from "zustand";

export type RazorMaterial = "Chrome" | "Gunmetal" | "White Chrome" | "Rose Gold";
export type RazorType = "Adjustable" | "Fixed";
export type RazorSortOption =
  | "Featured"
  | "Price: Low to high"
  | "Price: High to low";

export type RazorProduct = {
  id: string;
  name: string;
  material: string;
  finish: RazorMaterial;
  type: RazorType;
  price: string;
  priceValue: number;
  inStock: boolean;
};

type RazorCatalogState = {
  selectedMaterials: RazorMaterial[];
  selectedTypes: RazorType[];
  inStockOnly: boolean;
  searchQuery: string;
  sortOption: RazorSortOption;
  selectedProductId: string;
  toggleMaterial: (material: RazorMaterial) => void;
  toggleType: (type: RazorType) => void;
  toggleInStockOnly: () => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: RazorSortOption) => void;
  selectProduct: (productId: string) => void;
  removeFilter: (filter: string) => void;
  clearFilters: () => void;
};

const defaultFilters = {
  selectedMaterials: ["Chrome", "Gunmetal"] as RazorMaterial[],
  selectedTypes: ["Adjustable"] as RazorType[],
  inStockOnly: true,
};

export const materialOptions: RazorMaterial[] = [
  "Chrome",
  "Gunmetal",
  "White Chrome",
  "Rose Gold",
];

export const typeOptions: RazorType[] = ["Adjustable", "Fixed"];

export const sortOptions: RazorSortOption[] = [
  "Featured",
  "Price: Low to high",
  "Price: High to low",
];

export const products: RazorProduct[] = [
  {
    id: "rockwell-6s",
    name: "Rockwell 6S Adjustable",
    material: "Stainless Steel",
    finish: "Chrome",
    type: "Adjustable",
    price: "$120",
    priceValue: 120,
    inStock: true,
  },
  {
    id: "rockwell-6c",
    name: "Rockwell 6C",
    material: "Chrome",
    finish: "Chrome",
    type: "Fixed",
    price: "$80",
    priceValue: 80,
    inStock: true,
  },
  {
    id: "rockwell-t2",
    name: "Rockwell T2",
    material: "Gunmetal",
    finish: "Gunmetal",
    type: "Adjustable",
    price: "$50",
    priceValue: 50,
    inStock: true,
  },
  {
    id: "rockwell-r1",
    name: "Rockwell R1",
    material: "White Chrome",
    finish: "White Chrome",
    type: "Fixed",
    price: "$40",
    priceValue: 40,
    inStock: false,
  },
  {
    id: "rockwell-model-t",
    name: "Rockwell Model T",
    material: "Matte Black",
    finish: "Rose Gold",
    type: "Adjustable",
    price: "$150",
    priceValue: 150,
    inStock: false,
  },
  {
    id: "rockwell-2c",
    name: "Rockwell 2C",
    material: "Chrome",
    finish: "Chrome",
    type: "Fixed",
    price: "$30",
    priceValue: 30,
    inStock: true,
  },
];

function toggleValue<T>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export const useRazorCatalogStore = create<RazorCatalogState>((set) => ({
  ...defaultFilters,
  searchQuery: "",
  sortOption: "Featured",
  selectedProductId: "rockwell-6s",
  toggleMaterial: (material) =>
    set((state) => ({
      selectedMaterials: toggleValue(state.selectedMaterials, material),
    })),
  toggleType: (type) =>
    set((state) => ({ selectedTypes: toggleValue(state.selectedTypes, type) })),
  toggleInStockOnly: () =>
    set((state) => ({ inStockOnly: !state.inStockOnly })),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortOption: (sortOption) => set({ sortOption }),
  selectProduct: (selectedProductId) => set({ selectedProductId }),
  removeFilter: (filter) =>
    set((state) => ({
      selectedMaterials: state.selectedMaterials.filter(
        (item) => item !== filter,
      ),
      selectedTypes: state.selectedTypes.filter((item) => item !== filter),
      inStockOnly: filter === "In stock" ? false : state.inStockOnly,
    })),
  clearFilters: () =>
    set({
      selectedMaterials: [],
      selectedTypes: [],
      inStockOnly: false,
      searchQuery: "",
    }),
}));
