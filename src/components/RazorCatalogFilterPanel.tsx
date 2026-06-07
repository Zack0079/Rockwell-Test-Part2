import { Check, ChevronDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type FilterOption = {
  label: string;
  selected: boolean;
};

type Product = {
  name: string;
  material: string;
  price: string;
  selected?: boolean;
};

const materialOptions: FilterOption[] = [
  { label: "Chrome", selected: true },
  { label: "Gunmetal", selected: true },
  { label: "White Chrome", selected: false },
  { label: "Rose Gold", selected: false },
];

const typeOptions: FilterOption[] = [
  { label: "Adjustable", selected: true },
  { label: "Fixed", selected: false },
];

const activeFilters = ["Chrome", "Gunmetal", "Adjustable", "In stock"];

const products: Product[] = [
  {
    name: "Rockwell 6S Adjustable",
    material: "Stainless Steel",
    price: "$120",
    selected: true,
  },
  { name: "Rockwell 6C", material: "Chrome", price: "$80" },
  { name: "Rockwell T2", material: "Gunmetal", price: "$50" },
  { name: "Rockwell R1", material: "White Chrome", price: "$40" },
  { name: "Rockwell Model T", material: "Matte Black", price: "$150" },
  { name: "Rockwell 2C", material: "Chrome", price: "$30" },
];

function FilterCheckbox({ label, selected }: FilterOption) {
  return (
    <div className="flex h-[18px] w-full items-center gap-[10px] overflow-hidden">
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
    </div>
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

function ActiveFilterChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex shrink-0 items-center gap-[6px] rounded-full bg-[#efefee] px-[10px] py-[6px] text-[13px] font-medium leading-none text-[#1a1a1a]"
    >
      <span>{label}</span>
      <X className="size-[11px] text-[#6b7280]" />
    </button>
  );
}

function ProductCard({ name, material, price, selected = false }: Product) {
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
                className="whitespace-nowrap text-[13px] font-medium leading-[normal] text-[#6b7280]"
              >
                Clear all
              </button>
            </div>

            <div className="flex w-full items-center overflow-hidden rounded-[8px] border border-[#e5e5e5] bg-[#f9f9f8] px-3 py-[10px]">
              <span className="whitespace-nowrap text-[14px] font-normal leading-[normal] text-[#6b7280]">
                Search razors
              </span>
            </div>

            <FilterGroup label="Material" options={materialOptions} />
            <FilterGroup label="Type" options={typeOptions} />

            <div className="flex w-full items-center justify-between overflow-hidden">
              <span className="whitespace-nowrap text-[14px] font-normal leading-[normal] text-[#1a1a1a]">
                In stock only
              </span>
              <button
                type="button"
                className="relative h-[22px] w-[38px] shrink-0 rounded-full bg-[#1a1a1a]"
                aria-label="In stock only"
              >
                <span className="absolute right-[2px] top-[3px] size-4 rounded-full bg-white" />
              </button>
            </div>
          </Card>

          <section className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden">
            <div className="flex w-full items-center justify-between overflow-hidden">
              <p className="whitespace-nowrap text-[15px] font-semibold leading-[normal] text-[#1a1a1a]">
                12 razors
              </p>
              <Button
                type="button"
                variant="outline"
                className="h-8 gap-2 rounded-[8px] border-[#e5e5e5] bg-white px-3 py-2 text-[13px] font-medium text-[#1a1a1a] shadow-none hover:bg-white hover:text-[#1a1a1a]"
              >
                Sort: Featured
                <ChevronDown className="size-3 text-[#6b7280]" />
              </Button>
            </div>

            <div className="flex w-full flex-wrap items-start gap-2 overflow-hidden">
              {activeFilters.map((filter) => (
                <ActiveFilterChip key={filter} label={filter} />
              ))}
            </div>

            <div className="flex w-full flex-col gap-4 overflow-hidden">
              {[0, 2, 4].map((startIndex) => (
                <div
                  key={startIndex}
                  className="flex w-full items-start gap-4 overflow-hidden"
                >
                  {products.slice(startIndex, startIndex + 2).map((product) => (
                    <ProductCard key={product.name} {...product} />
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
