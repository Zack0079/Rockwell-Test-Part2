## What Worked
1. Implemented the component from the Figma design with 1:1 visual fidelity
2. Added handlers for all user interactions (button clicks, checkboxes, item removal)
3. Created a Zustand store to manage state for the new component

## What Didn't Work
1. Could not get the Sort dropdown list working correctly
2. UI is not responsive below ~1120px — the product grid compresses instead of reflowing
3. Only 6 hardcoded products (sourced directly from the Figma) — no dynamic data generation
4. Generated everything in a single component file instead of splitting into a `ui/` folder


## Differently Next Time
1. Decide upfront what constraints matter — viewport responsiveness, min/max window size
2. Write more specific prompts (e.g. "separate UI elements into their own file under
   src/components/ui/", "generate 12 products with different data")
3. Check the prompts again before input