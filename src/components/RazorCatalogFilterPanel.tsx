import { useMemo } from "react";
import { Check, ChevronDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  materialOptions,
  products,
  sortOptions,
  typeOptions,
  useRazorCatalogStore,
  type RazorProduct,
} from "@/stores/razor-catalog-store";

type FilterOption = {
  label: string;
  selected: boolean;
  onToggle: () => void;
};

function FilterCheckbox({ label, selected, onToggle }: FilterOption) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-[18px] w-full items-center gap-[10px] overflow-hidden text-left"
      aria-pressed={selected}
    >
      <span
        className={[
          "flex size-[18px] shrink-0 items-center justify-center rounded-[4px] border-[1.5px]",
          selected
            ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
            : "border-[#e5e5e5] bg-white text-transparent",
        ].join(" ")}
        aria-hidden="true"
      >
        {selected ? <Check className="size-[11px] stroke-[3]" /> : null}
      </span>
      <span className="whitespace-nowrap text-[14px] font-normal leading-[normal] text-[#1a1a1a]">
        {label}
      </span>
    </button>
  );
}

function FilterGroup({
  label,
  options,
}: {
  label: string;
  options: FilterOption[];
}) {
  return (
    <section className="flex w-full flex-col gap-3 overflow-hidden">
      <h3 className="whitespace-nowrap text-[12px] font-semibold uppercase leading-[normal] tracking-[0.72px] text-[#6b7280]">
        {label}
      </h3>
      <div className="flex w-full flex-col gap-3 overflow-hidden">
        {options.map((option) => (
          <FilterCheckbox key={option.label} {...option} />
        ))}
      </div>
    </section>
  );
}

function ActiveFilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="flex shrink-0 items-center gap-[6px] rounded-full bg-[#efefee] px-[10px] py-[6px] text-[13px] font-medium leading-none text-[#1a1a1a]"
      aria-label={`Remove ${label} filter`}
    >
      <span>{label}</span>
      <X className="size-[11px] text-[#6b7280]" />
    </button>
  );
}

function ProductCard({
  name,
  material,
  price,
  selected,
  onSelect,
}: Pick<RazorProduct, "name" | "material" | "price"> & {
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card className="min-w-0 flex-1 overflow-hidden rounded-[12px] border-[#e5e5e5] bg-white shadow-none">
      <div className="h-[150px] w-full bg-[#ececeb]" />
      <div className="flex w-full flex-col gap-[6px] overflow-hidden p-[14px]">
        <h3 className="whitespace-nowrap text-[15px] font-semibold leading-[normal] text-[#1a1a1a]">
          {name}
        </h3>
        <p className="whitespace-nowrap text-[13px] font-normal leading-[normal] text-[#6b7280]">
          {material}
        </p>
        <div className="flex w-full items-center justify-between overflow-hidden pt-1">
          <p className="whitespace-nowrap text-[16px] font-semibold leading-[normal] text-[#1a1a1a]">
            {price}
          </p>
          <Button
            type="button"
            variant={selected ? "default" : "outline"}
            onClick={onSelect}
            className={[
              "h-8 rounded-[8px] px-3 py-2 text-[13px] font-medium shadow-none",
              selected
                ? "bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]"
                : "border-[#e5e5e5] bg-white text-[#1a1a1a] hover:bg-white hover:text-[#1a1a1a]",
            ].join(" ")}
          >
            {selected ? (
              <>
                <Check className="size-[13px]" />
                Selected
              </>
            ) : (
              "Select"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function RazorCatalogFilterPanel() {
  const selectedMaterials = useRazorCatalogStore(
    (state) => state.selectedMaterials,
  );
  const selectedTypes = useRazorCatalogStore((state) => state.selectedTypes);
  const inStockOnly = useRazorCatalogStore((state) => state.inStockOnly);
  const searchQuery = useRazorCatalogStore((state) => state.searchQuery);
  const sortOption = useRazorCatalogStore((state) => state.sortOption);
  const selectedProductId = useRazorCatalogStore(
    (state) => state.selectedProductId,
  );
  const toggleMaterial = useRazorCatalogStore((state) => state.toggleMaterial);
  const toggleType = useRazorCatalogStore((state) => state.toggleType);
  const toggleInStockOnly = useRazorCatalogStore(
    (state) => state.toggleInStockOnly,
  );
  const setSearchQuery = useRazorCatalogStore((state) => state.setSearchQuery);
  const setSortOption = useRazorCatalogStore((state) => state.setSortOption);
  const selectProduct = useRazorCatalogStore((state) => state.selectProduct);
  const removeFilter = useRazorCatalogStore((state) => state.removeFilter);
  const clearFilters = useRazorCatalogStore((state) => state.clearFilters);

  const activeFilters = [
    ...selectedMaterials,
    ...selectedTypes,
    ...(inStockOnly ? ["In stock"] : []),
  ];

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const visibleProducts = products.filter((product) => {
      const matchesMaterial =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(product.finish);
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(product.type);
      const matchesStock = !inStockOnly || product.inStock;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [product.name, product.material, product.finish, product.type]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesMaterial && matchesType && matchesStock && matchesSearch;
    });

    if (sortOption === "Price: Low to high") {
      return [...visibleProducts].sort((a, b) => a.priceValue - b.priceValue);
    }

    if (sortOption === "Price: High to low") {
      return [...visibleProducts].sort((a, b) => b.priceValue - a.priceValue);
    }

    return visibleProducts;
  }, [inStockOnly, searchQuery, selectedMaterials, selectedTypes, sortOption]);

  const nextSortOption =
    sortOptions[(sortOptions.indexOf(sortOption) + 1) % sortOptions.length];

  return (
    <main className="min-h-screen bg-white p-8 text-[#1a1a1a]">
      <section className="mx-auto flex w-full max-w-[1120px] flex-col gap-6 overflow-hidden rounded-[16px] bg-[#f5f5f4] p-8">
        <header className="flex w-full flex-col gap-[6px] overflow-hidden">
          <h1 className="whitespace-nowrap text-[22px] font-semibold leading-7 text-[#1a1a1a]">
            Shop Razors
          </h1>
          <p className="whitespace-nowrap text-[14px] font-normal leading-5 text-[#6b7280]">
            Precision-engineered safety razors. Filter to find your setting.
          </p>
        </header>

        <div className="flex w-full items-start gap-8 overflow-hidden">
          <Card className="flex w-[280px] shrink-0 flex-col gap-6 overflow-hidden rounded-[12px] border-[#e5e5e5] bg-white p-5 shadow-none">
            <div className="flex w-full items-center justify-between overflow-hidden">
              <h2 className="whitespace-nowrap text-[16px] font-semibold leading-[normal] text-[#1a1a1a]">
                Filters
              </h2>
              <button
                type="button"
                onClick={clearFilters}
                className="whitespace-nowrap text-[13px] font-medium leading-[normal] text-[#6b7280]"
              >
                Clear all
              </button>
            </div>

            <label className="sr-only" htmlFor="razor-search">
              Search razors
            </label>
            <input
              id="razor-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search razors"
              className="flex w-full items-center overflow-hidden rounded-[8px] border border-[#e5e5e5] bg-[#f9f9f8] px-3 py-[10px] text-[14px] font-normal leading-[normal] text-[#1a1a1a] outline-none placeholder:text-[#6b7280]"
            />

            <FilterGroup
              label="Material"
              options={materialOptions.map((material) => ({
                label: material,
                selected: selectedMaterials.includes(material),
                onToggle: () => toggleMaterial(material),
              }))}
            />
            <FilterGroup
              label="Type"
              options={typeOptions.map((type) => ({
                label: type,
                selected: selectedTypes.includes(type),
                onToggle: () => toggleType(type),
              }))}
            />

            <div className="flex w-full items-center justify-between overflow-hidden">
              <span className="whitespace-nowrap text-[14px] font-normal leading-[normal] text-[#1a1a1a]">
                In stock only
              </span>
              <button
                type="button"
                onClick={toggleInStockOnly}
                className={[
                  "relative h-[22px] w-[38px] shrink-0 rounded-full",
                  inStockOnly ? "bg-[#1a1a1a]" : "bg-[#d6d6d4]",
                ].join(" ")}
                aria-label="In stock only"
                aria-pressed={inStockOnly}
              >
                <span
                  className={[
                    "absolute top-[3px] size-4 rounded-full bg-white",
                    inStockOnly ? "right-[2px]" : "left-[2px]",
                  ].join(" ")}
                />
              </button>
            </div>
          </Card>

          <section className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden">
            <div className="flex w-full items-center justify-between overflow-hidden">
              <p className="whitespace-nowrap text-[15px] font-semibold leading-[normal] text-[#1a1a1a]">
                {filteredProducts.length} razors
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setSortOption(nextSortOption)}
                className="h-8 gap-2 rounded-[8px] border-[#e5e5e5] bg-white px-3 py-2 text-[13px] font-medium text-[#1a1a1a] shadow-none hover:bg-white hover:text-[#1a1a1a]"
              >
                Sort: {sortOption}
                <ChevronDown className="size-3 text-[#6b7280]" />
              </Button>
            </div>

            <div className="flex w-full flex-wrap items-start gap-2 overflow-hidden">
              {activeFilters.map((filter) => (
                <ActiveFilterChip
                  key={filter}
                  label={filter}
                  onRemove={() => removeFilter(filter)}
                />
              ))}
            </div>

            <div className="flex w-full flex-col gap-4 overflow-hidden">
              {filteredProducts.length > 0 ? (
                <div className="grid w-full grid-cols-2 gap-4 overflow-hidden">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      selected={selectedProductId === product.id}
                      onSelect={() => selectProduct(product.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-[12px] border border-[#e5e5e5] bg-white p-6 text-[14px] text-[#6b7280]">
                  No razors match the selected filters.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
