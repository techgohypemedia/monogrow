export interface CommodityProduct {
  id: string;
  categoryKey: "rice" | "coffee" | "sugar" | "dry-fruits";
  category: "Grains & Rice" | "Specialty Estate" | "Select Dry Fruits" | "Refined Sugar";
  name: string;
  kicker: string;
  quoteName: string;
  tagline: string;
  description: string;
  originBadge: string;
  packImg: string;
  bowlImg: string;
  bowlAlt: string;
  packAlt: string;
  retailSizes: string[];
  bulkSizes: string[];
  specs: { label: string; value: string }[];
  keyHighlights: string[];
}

export interface CategoryMeta {
  key: "rice" | "coffee" | "sugar" | "dry-fruits";
  slug: string;
  navName: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroMetrics: { value: string; label: string; sub: string }[];
  qualityBullets: { title: string; desc: string }[];
}

export const COMMODITY_CATEGORIES: Record<string, CategoryMeta> = {
  rice: {
    key: "rice",
    slug: "rice",
    navName: "Rice",
    eyebrow: "The Monagrow Grains & Basmati Collection",
    title: "Himalayan Basmati & Heritage Fragrant Rice",
    subtitle:
      "Direct origin mill contracts in fertile meltwater-fed valleys and heritage alluvial belts. Dual-camera laser Sortex cleaned, aged for two full seasons, and certified for moisture and elongation.",
    heroMetrics: [
      { value: "8.9 mm+", label: "Milled Grain Length", sub: "Extra Long Slender" },
      { value: "2 Full Seasons", label: "Aged to Maturity", sub: "Zero Starch Sticking" },
      { value: "100% Sortex", label: "Optical Laser Clean", sub: "Zero Foreign Matter" },
      { value: "Over 2.2x", label: "Cooked Elongation", sub: "Culinary Gold Standard" },
    ],
    qualityBullets: [
      {
        title: "Two-Season Natural Curing",
        desc: "Aged in dry, climate-monitored storage to deplete moisture and cure starch, resulting in exceptional grain elongation without breaking during boiling.",
      },
      {
        title: "Dual-Camera Sortex Laser Sorting",
        desc: "100% optical camera sorting eliminates discolored grains, chalky kernels, and micro-debris to ensure uniform purity in every bag.",
      },
      {
        title: "Digital Lot Traceability",
        desc: "Each production lot is tagged with mill origin coordinates, crop year, and moisture test logs before loading onto ocean-going container vessels.",
      },
      {
        title: "Multi-Ply Woven Moisture Barrier",
        desc: "Packed in multi-ply BOPP and woven polypropylene sacks with inner liners that withstand ocean humidity across long voyages.",
      },
    ],
  },
  coffee: {
    key: "coffee",
    slug: "coffee",
    navName: "Coffee",
    eyebrow: "The Monagrow Specialty Estate Collection",
    title: "High-Altitude Estate Arabica & Artisan Drum Roast",
    subtitle:
      "Cultivated at 1,450 to 1,850 meters MSL under natural rainforest shade canopies. Hand-harvested at peak brix, wet-processed, and roasted in slow artisan drum batches with one-way aroma-lock degassing valves.",
    heroMetrics: [
      { value: "84+ SCA", label: "Specialty Cupping Grade", sub: "Certified Origin Quality" },
      { value: "1,450m+ MSL", label: "Estate Altitude", sub: "Slow-Matured Arabica" },
      { value: "Slow Drum Roast", label: "Artisan Dark Profile", sub: "Cocoa, Pecan & Caramel" },
      { value: "Degassing Valve", label: "One-Way Aroma Lock", sub: "24-Month Peak Freshness" },
    ],
    qualityBullets: [
      {
        title: "Single-Estate High Elevation",
        desc: "Grown between 1,450m and 1,850m above sea level where cool mountain temperatures slow cherry maturation, creating dense beans with deep sweetness.",
      },
      {
        title: "Hand-Selective Selective Picking",
        desc: "Only fully ripe cherries are harvested by experienced estate workers, ensuring uniform density and zero green astringency.",
      },
      {
        title: "Batch Drum Roasting",
        desc: "Roasted in cast-iron batch drums to slowly caramelize natural sugars, producing notes of dark cocoa, toasted pecan, and warm caramel.",
      },
      {
        title: "Hermetic Aroma Foil Packaging",
        desc: "Equipped with one-way degassing valves and multi-layer oxygen-barrier foil to preserve peak aromatic volatiles for wholesale and retail.",
      },
    ],
  },
  sugar: {
    key: "sugar",
    slug: "sugar",
    navName: "Sugar",
    eyebrow: "The Monagrow Refined Sugar Collection",
    title: "Sugar",
    subtitle:
      "Refined from fresh-harvest sugarcane, Monagrow ICUMSA 45 represents the highest purity grade in international commodity trade. Free-flowing, sparkling white crystals with 99.85% minimum polarization.",
    heroMetrics: [
      { value: "ICUMSA 45", label: "Color Index RBU Max", sub: "Sparkling White Purity" },
      { value: "99.85% Min", label: "Sucrose Polarization", sub: "Ultra-High Purity" },
      { value: "< 0.04%", label: "Moisture Content", sub: "Certified Anti-Caking" },
      { value: "100% Instant", label: "Dissolution Rate", sub: "Food-Grade Clean" },
    ],
    qualityBullets: [
      {
        title: "Ultra-Low ICUMSA 45 Rating",
        desc: "Conforms strictly to international ICUMSA 45 standards with sparkling white crystallization, ideal for high-end confectionery and beverage manufacturing.",
      },
      {
        title: "Continuous Lab Polarization Checks",
        desc: "Every outgoing lot is tested with refractometric polarimeters to ensure sucrose concentration consistently exceeds 99.85%.",
      },
      {
        title: "Under 0.04% Moisture Standard",
        desc: "Engineered with ultra-low residual moisture to completely eliminate caking, lump formation, and color discoloration during sea transit.",
      },
      {
        title: "Export Poly-Lined Packaging",
        desc: "Shipped in 25kg multi-wall paper bags, 50kg woven PP bags with heavy-duty PE inner liners, and 1 MT industrial sling bags.",
      },
    ],
  },
  "dry-fruits": {
    key: "dry-fruits",
    slug: "dry-fruits",
    navName: "Dry Fruits",
    eyebrow: "The Monagrow Select Dry Fruits Collection",
    title: "Royal Jumbo Whole Dryfruits W240",
    subtitle:
      "Selected from origin harvests for uniform ivory color, sweet buttery crunch, and king-size count (220 to 240 whole kernels per pound). Sealed in nitrogen-flushed barrier packaging to lock in farmgate freshness.",
    heroMetrics: [
      { value: "W240 King Size", label: "Kernel Density Grade", sub: "220-240 Kernels / lb" },
      { value: "1st Quality White", label: "Color & Cleanliness", sub: "Zero Blemishes or Spots" },
      { value: "< 4.5%", label: "Moisture Content", sub: "Crisp Butter Crunch" },
      { value: "Nitrogen Flush", label: "Oxygen-Free Barrier", sub: "Long-Term Freshness" },
    ],
    qualityBullets: [
      {
        title: "Rigid W240 Size Grading",
        desc: "Sorted by precision mesh sizing to maintain a strict count of 220 to 240 whole kernels per pound, ensuring generous visual presentation.",
      },
      {
        title: "First Quality White Grade (Zero Blemish)",
        desc: "Cashews are hand-inspected under high-lumen inspection tables to eliminate spotted, discolored, or broken kernels.",
      },
      {
        title: "Nitrogen Gas Flushing",
        desc: "Oxygen is completely purged from retail pouches and vacuum tins using high-purity food-grade nitrogen, preventing rancidity and oil oxidation.",
      },
      {
        title: "International Phytosanitary Certification",
        desc: "Full SGS inspection, fumigation certification, and phytosanitary clearance documents provided with every export container.",
      },
    ],
  },
};

export const PRODUCTS: CommodityProduct[] = [
  {
    id: "basmati-rice",
    categoryKey: "rice",
    category: "Grains & Rice",
    name: "1121 Supreme Basmati Rice",
    kicker: "Extra Long Grain · Aged Two Full Seasons",
    quoteName: "Basmati Rice (1121 Supreme Long Grain)",
    tagline: "Unmatched Slender Length & Delicate Himalayan Aroma",
    description:
      "Cultivated in fertile meltwater-fed valleys, Monagrow 1121 Supreme Basmati represents the gold standard of aromatic long grain. Matured for two full seasons to ensure maximum fluffiness, zero starch sticking, and an extraordinary cooked elongation of over 2.2x.",
    originBadge: "Himalayan Meltwater Fed · 100% Sortex Clean",
    packImg: "/assets/monagrow-rice-bag-cutout.png",
    bowlImg: "/assets/hero-center-rice.png",
    bowlAlt: "Full ceramic bowl of long grain Basmati rice",
    packAlt: "Monagrow Basmati Rice 5kg Standup Box Bag",
    retailSizes: ["1 kg Retail Box Pouch", "5 kg Standup Box Bag with Handle"],
    bulkSizes: ["20 kg Woven Poly Sacks", "25 kg / 50 kg Export Jute & PP", "20ft FCL Container Loads"],
    specs: [
      { label: "Grain Length", value: "8.9 mm+" },
      { label: "Cooked Elongation", value: "Over 2.2x" },
      { label: "Purity", value: "100% Sortex" },
    ],
    keyHighlights: [
      "Direct origin mill contracts with zero speculative middlemen",
      "Full digital lot traceability from Himalayan paddy to ocean terminal",
      "SGS certified grain cleanliness and moisture threshold",
    ],
  },
  {
    id: "katarni-rice",
    categoryKey: "rice",
    category: "Grains & Rice",
    name: "Katarni Premium Fragrant Rice",
    kicker: "Heritage Heirloom · Naturally Aromatic",
    quoteName: "Katarni Premium Fragrant Rice",
    tagline: "Traditional Fragrance & Tender Melting Texture",
    description:
      "A prized heritage staple renowned for its natural aroma, tender grain structure, and buttery finish. Non-hybrid and naturally curated, Monagrow Katarni is gently polished to retain its essential nutrients while delivering an unforgettable dining aroma.",
    originBadge: "Heritage Alluvial Belt · Non-Hybrid Cultivar",
    packImg: "/assets/monagrow-katarni-bag-cutout.png",
    bowlImg: "/assets/hero-center-rice.png",
    bowlAlt: "Full ceramic bowl of Katarni aromatic rice",
    packAlt: "Monagrow Katarni Rice 5kg Standup Box Bag",
    retailSizes: ["1 kg Aroma-Lock Pouch", "5 kg Standup Box Bag"],
    bulkSizes: ["25 kg Moisture-Barrier Sacks", "50 kg Woven Export Bags", "Custom Palletized Lots"],
    specs: [
      { label: "Aroma Profile", value: "Naturally Rich" },
      { label: "Grain Type", value: "Medium-Short Kernel" },
      { label: "Sorting Grade", value: "100% Sortex" },
    ],
    keyHighlights: [
      "Authentic heritage cultivar preserved with artisanal cooperatives",
      "Double-cleaned to remove all husk, micro-particulates, and broken grains",
      "Available in nitrogen-sealed barrier packaging for long retail shelf life",
    ],
  },
  {
    id: "sella-basmati-rice",
    categoryKey: "rice",
    category: "Grains & Rice",
    name: "1121 Golden Sella Basmati Rice",
    kicker: "Parboiled Extra Long Grain · Superior Elongation",
    quoteName: "1121 Golden Sella Basmati Rice",
    tagline: "Parboiled Extra Long Grains · High Elongation & Perfect for Biryani",
    description:
      "Parboiled with advanced steam infusion to lock in grain nutrients and minerals. Engineered for maximum cooked elongation without grain breakage, making it the premier choice for banquets, catering, and authentic dum biryani.",
    originBadge: "Parboiled · 100% Optical Clean",
    packImg: "/assets/monagrow-golden-sella-bag-cutout.png",
    bowlImg: "/assets/hero-center-rice.png",
    bowlAlt: "Full ceramic bowl of cooked Golden Sella Basmati rice",
    packAlt: "Monagrow 1121 Golden Sella Basmati Rice Pack",
    retailSizes: ["1 kg Retail Box Pouch", "5 kg Standup Box Bag with Handle"],
    bulkSizes: ["25 kg Moisture-Barrier Bags", "50 kg Woven PP Sacks", "20ft FCL Direct Container Lots"],
    specs: [
      { label: "Grain Length", value: "8.5 mm+ Milled" },
      { label: "Cooked Length", value: "Over 2.2x Elongation" },
      { label: "Processing", value: "Parboiled Golden Steam" },
      { label: "Purity Index", value: "100% Sortex Clean" },
    ],
    keyHighlights: [
      "Steam-infusion hardening ensures grains stay separate and intact during vigorous stirring",
      "Superior plate yield with fluffy, non-sticky presentation for restaurants and hospitality",
      "SGS certified export grade with verified low broken kernel percentage",
    ],
  },
  {
    id: "jeera-masino-rice",
    categoryKey: "rice",
    category: "Grains & Rice",
    name: "Jeera Masino Premium Rice",
    kicker: "Himalayan Fine Grain · 100% Naturally Aged",
    quoteName: "Jeera Masino Rice",
    tagline: "Fine Slender Grain with Traditional Mountain Fragrance",
    description:
      "Cultivated across pristine Himalayan meltwater valleys, Monagrow Jeera Masino Rice is renowned for its delicate slender grain, gentle natural aroma, and rich tender finish. Naturally cured and aged to ensure non-sticky, separate fluffy grains upon cooking—ideal for traditional everyday dining and specialty festive feasts.",
    originBadge: "Himalayan Foothills · 100% Natural Aged",
    packImg: "/assets/monagrow-jeera-masino-bag-cutout.png",
    bowlImg: "/assets/hero-center-rice.png",
    bowlAlt: "Full ceramic bowl of cooked Jeera Masino fine grain rice",
    packAlt: "Monagrow Jeera Masino Rice 20kg Bag",
    retailSizes: ["5 kg Standup Pouch", "10 kg Handle Pack"],
    bulkSizes: ["20 kg Net Weight Bag", "25 kg / 50 kg Moisture-Resistant Sacks", "20ft FCL Direct Container Lots"],
    specs: [
      { label: "Grain Profile", value: "Fine Slender Masino" },
      { label: "Aging Method", value: "Naturally Aged" },
      { label: "Sortex Grade", value: "100% Optical Clean" },
      { label: "Packaging Form", value: "20 KG Net Weight Pack" },
    ],
    keyHighlights: [
      "100% natural and aged to maturity for exceptional non-sticky elongation",
      "Triple-stage Sortex optical sorting ensures zero chalky grains or foreign matter",
      "Heavy-duty 20kg moisture-barrier export-grade packaging",
    ],
  },

  {
    id: "estate-coffee",
    categoryKey: "coffee",
    category: "Specialty Estate",
    name: "Specialty Estate Dark Arabica",
    kicker: "Dark Roast Arabica · High-Elevation Single Estate",
    quoteName: "Specialty Estate Coffee (Arabica Dark Roast)",
    tagline: "Dark roast with cocoa and caramel notes.",
    description:
      "Cultivated at 1,450 to 1,850 meters above sea level under natural shade canopies. Hand-picked at peak ripeness, wet-processed, and slow roasted in artisan batch drums to bring forth rich body, low acidity, and aromatic complexity.",
    originBadge: "1,450m+ MSL Altitude · 84+ Specialty Grade",
    packImg: "/assets/monagrow-coffee-bag-cutout.png",
    bowlImg: "/assets/hero-center-coffee.png",
    bowlAlt: "Full ceramic bowl of roasted dark Arabica coffee beans",
    packAlt: "Monagrow Specialty Estate Dark Arabica 2.5kg Pack",
    retailSizes: ["500g Aroma Pouch with Valve", "2.5 kg Multi-Ply Box Bag with Valve"],
    bulkSizes: ["25 kg GrainPro Hermetic Liners", "60 kg Jute Sacks", "Direct Container Loads"],
    specs: [
      { label: "Specialty Grade", value: "84+ SCA Cupping Score" },
      { label: "Estate Altitude", value: "1,450m - 1,850m MSL" },
      { label: "Roast Profile", value: "Artisan Slow Drum Dark" },
      { label: "Barrier Technology", value: "One-Way Degassing Valve Foil" },
      { label: "Varietal Lineage", value: "100% Arabica Bourbon & Typica" },
      { label: "Flavor Palette", value: "Dark Cocoa, Roasted Pecan, Caramel" },
    ],
    keyHighlights: [
      "Packed with one-way degassing valves locking in freshly roasted aroma for up to 24 months",
      "Ethically procured through direct estate agreements supporting fair farmer living wages",
      "Available as whole roasted bean, custom ground, or green unroasted export lots",
    ],
  },
  {
    id: "medium-roast-arabica",
    categoryKey: "coffee",
    category: "Specialty Estate",
    name: "Monagrow Premium Roasted Coffee Beans",
    kicker: "100% Arabica Beans · Medium Roast · Sustainably Sourced",
    quoteName: "Monagrow Premium Roasted Coffee Beans (Medium Roast)",
    tagline: "Rich aroma, smooth taste & balanced flavor.",
    description:
      "Expertly crafted from 100% sustainably sourced high-elevation Arabica beans, Monagrow Premium Roasted Coffee Beans are slow drum-roasted to a velvety medium roast. Delivers a rich captivating aroma, delicate sweetness, and a remarkably smooth, balanced finish perfect for everyday pour-over, espresso, and french press brewing.",
    originBadge: "100% Arabica · Medium Roast Balanced",
    packImg: "/assets/monagrow-roasted-coffee-beans-cutout.png",
    bowlImg: "/assets/hero-center-coffee.png",
    bowlAlt: "Ceramic bowl of golden roasted medium Arabica beans",
    packAlt: "Monagrow Premium Roasted Coffee Beans 12oz Pouch",
    retailSizes: ["12 oz (340 g) Standup Pouch", "500g Aroma Zip Bag", "1 kg Valve Pack"],
    bulkSizes: ["15 kg Multi-Wall Kraft Bags", "25 kg GrainPro Valve Sacks", "Full Container Direct Lots"],
    specs: [
      { label: "Bean Type", value: "100% Single Origin Arabica" },
      { label: "Roast Profile", value: "Medium Roast Balanced Flavor" },
      { label: "Aroma Profile", value: "Rich Roasted Cocoa & Caramel" },
      { label: "Sourcing", value: "100% Sustainably Sourced Estates" },
      { label: "Packaging", value: "12 oz (340g) Resealable Zip Bag" },
      { label: "Processing", value: "Fully Washed & Natural Sun-Dried" },
    ],
    keyHighlights: [
      "Crafted with 100% hand-picked Arabica beans for rich aroma and zero bitterness",
      "Artisan medium roast engineered for an exceptionally smooth and balanced cup",
      "Resealable moisture-barrier zipper pouch keeping whole beans fresh at peak flavor",
    ],
  },
  {
    id: "monsooned-malabar",
    categoryKey: "coffee",
    category: "Specialty Estate",
    name: "Highland Monsooned Malabar AA",
    kicker: "Monsoon Cured · Ultra-Low Acidity & Dense Crema",
    quoteName: "Highland Monsooned Malabar AA Coffee",
    tagline: "Rich golden cured beans with spicy dark chocolate body.",
    description:
      "Exposed to ocean monsoon winds along coastal curing yards for 12 to 16 weeks, swelling the beans into a pale golden hue and stripping sharp acidity. Produces a velvety, thick crema with notes of cardamom, toasted walnut, and dark bakers chocolate.",
    originBadge: "Monsoon Cured · Grade AA Super Bold",
    packImg: "/assets/monagrow-monsooned-malabar-bag-cutout-v3.png",
    bowlImg: "/assets/hero-center-coffee.png",
    bowlAlt: "Ceramic bowl of golden roasted Monsooned Malabar AA beans",
    packAlt: "Monagrow Monsooned Malabar AA Coffee 12oz Pouch",
    retailSizes: ["12 oz (340g) Valve Pouch", "500g Aroma Zip Bag", "1 kg Valve Pack"],
    bulkSizes: ["15 kg Multi-Wall Bags", "25 kg GrainPro Valve Sacks", "Full Container Direct Lots"],
    specs: [
      { label: "Grade Index", value: "Grade AA Super Bold" },
      { label: "Curing Process", value: "12-16 Weeks Monsoon Winds" },
      { label: "Acidity Profile", value: "Ultra-Low Natural Acidity" },
      { label: "Roast Style", value: "Medium-Dark Espresso" },
    ],
    keyHighlights: [
      "Legendary ocean monsoon curing process creating uniquely mellow, non-acidic extraction",
      "Celebrated worldwide as the supreme secret ingredient for creamy Italian espresso blends",
      "100% sortex sorted to select only uniform super-bold AA golden kernels",
    ],
  },
  {
    id: "himalayan-peaberry",
    categoryKey: "coffee",
    category: "Specialty Estate",
    name: "Himalayan Peaberry Reserve Arabica",
    kicker: "Rare Single Oval Bean · Concentrated Floral Aroma",
    quoteName: "Himalayan Peaberry Reserve Arabica",
    tagline: "Rare oval beans with intense floral and dark honey notes.",
    description:
      "Formed when only a single round seed matures inside the coffee cherry instead of two flat beans, naturally concentrating sugars and volatile aromatic oils. Hand-sieved from less than 5% of our highest elevation Himalayan harvest.",
    originBadge: "Rare Peaberry Reserve · 1,600m MSL",
    packImg: "/assets/monagrow-peaberry-coffee-bag-cutout-v3.png",
    bowlImg: "/assets/hero-center-coffee.png",
    bowlAlt: "Ceramic bowl of roasted round peaberry coffee beans",
    packAlt: "Monagrow Himalayan Peaberry Reserve Arabica 12oz Pouch",
    retailSizes: ["12 oz (340g) Valve Pouch", "500g Aroma Zip Bag", "1 kg Valve Pack"],
    bulkSizes: ["10 kg Vacuum Cartons", "25 kg GrainPro Bags", "Direct Air Cargo Lots"],
    specs: [
      { label: "Bean Morphology", value: "100% Natural Peaberry (Round)" },
      { label: "Harvest Yield", value: "Under 5% of Total Crop" },
      { label: "Aroma Complexity", value: "Intense Floral & Honey" },
      { label: "Roast Profile", value: "City+ Medium Light Roast" },
    ],
    keyHighlights: [
      "Spherical bean structure roasts exceptionally uniformly in artisan drum batches",
      "Rare high-elevation botanical anomaly yielding higher density and flavor concentration",
      "Strictly limited micro-lot production with numbered harvest certificates",
    ],
  },
  {
    id: "royal-cashews",
    categoryKey: "dry-fruits",
    category: "Select Dry Fruits",
    name: "Royal King Cashews W240",
    kicker: "King Size Whole W240 · Butter Crunch Purity",
    quoteName: "Royal King Cashews (W240 Whole)",
    tagline: "Jumbo whole white cashews with sweet buttery crunch.",
    description:
      "Meticulously steam-cracked and hand-graded to the internationally celebrated W240 specification (220-240 whole kernels per pound). Pristine ivory-white kernels with zero scorch marks, high natural oil sweetness, and vacuum nitrogen protection.",
    originBadge: "W240 King Size Whole · 100% Unblemished",
    packImg: "/assets/monagrow-cashews-bag-cutout.png",
    bowlImg: "/assets/hero-center-cashew.png",
    bowlAlt: "Wooden bowl of golden whole curved royal cashews",
    packAlt: "Monagrow Royal King Cashews W240 Standup Bag",
    retailSizes: ["250g Zip Pouch", "500g Standup Aroma Bag", "1 kg Resealable Pouch"],
    bulkSizes: ["10 kg Vacuum Tins (2 x 10kg Export Carton)", "20 kg Hermetic Cartons", "Palletized Air & Sea Lots"],
    specs: [
      { label: "Grade Standard", value: "W240 Jumbo Whole White" },
      { label: "Kernel Count", value: "220 - 240 Kernels / lb" },
      { label: "Moisture Content", value: "Under 4.5% Maximum" },
      { label: "Defect Tolerance", value: "Under 0.05% Strict Threshold" },
      { label: "Color Class", value: "First Quality White (Zero Scorch)" },
      { label: "Preservation", value: "Nitrogen Gas Flushed" },
    ],
    keyHighlights: [
      "Hand-selected whole kernels without broken pieces, splits, or surface freckles",
      "Naturally rich in plant protein, magnesium, and heart-healthy monounsaturated fats",
      "Vacuum nitrogen flush packaging preserves oven-fresh butter crunch across ocean voyages",
    ],
  },
  {
    id: "california-almonds",
    categoryKey: "dry-fruits",
    category: "Select Dry Fruits",
    name: "California Select Royal Almonds",
    kicker: "Whole Nonpareil Kernel · High Vitamin E & Sweet Crunch",
    quoteName: "California Select Royal Almonds",
    tagline: "Plump golden whole kernels with natural sweet snap.",
    description:
      "Harvested from premier orchards, Monagrow California Select Royal Almonds are graded to supreme nonpareil whole kernel standards. Uniform in size with smooth golden skin, rich natural crunch, and high dietary fiber and Vitamin E content.",
    originBadge: "Supreme Nonpareil · Zero Blemish Grade",
    packImg: "/assets/monagrow-almonds-bag-cutout.png",
    bowlImg: "/assets/hero-center-dryfruit.png",
    bowlAlt: "Wooden bowl of whole plump golden almonds",
    packAlt: "Monagrow California Select Royal Almonds 500g Bag",
    retailSizes: ["250g Snack Pouch", "500g Standup Box Pouch", "1 kg Resealable Zip Bag"],
    bulkSizes: ["10 kg Vacuum Cartons", "25 kg Poly-Lined Multi-Wall Bags", "Full Container Direct Ocean Loads"],
    specs: [
      { label: "Variety & Type", value: "California Nonpareil Supreme" },
      { label: "Count per Ounce", value: "23 - 25 Kernels / oz" },
      { label: "Moisture Level", value: "Under 5.0% Crunch" },
      { label: "Purity Index", value: "99.9% Clean Sortex" },
      { label: "Nutrient Profile", value: "High Vitamin E & Plant Protein" },
      { label: "Processing", value: "Raw Natural Whole (Unblanched)" },
    ],
    keyHighlights: [
      "Uniform kernel size and smooth skin ideal for gourmet confectionery and retail snacking",
      "Triple laser sorted to eliminate chipped, scratched, or bitter kernels",
      "Certified phytosanitary compliance for swift customs clearance across all destination ports",
    ],
  },
  {
    id: "kashmiri-walnuts",
    categoryKey: "dry-fruits",
    category: "Select Dry Fruits",
    name: "Kashmiri Snow White Walnuts",
    kicker: "Extra Light Halves · Rich in Omega-3 DHA & Buttery Finish",
    quoteName: "Kashmiri Snow White Walnuts",
    tagline: "Snow white walnut halves with buttery non-bitter finish.",
    description:
      "Cultivated in high-altitude Himalayan valleys, Monagrow Kashmiri Snow White Walnuts are revered for their pristine light-amber to snow-white color and sweet, buttery finish without the astringent bitterness typical of commercial crops.",
    originBadge: "Himalayan Snow White · Extra Light Halves",
    packImg: "/assets/monagrow-walnuts-bag-cutout.png",
    bowlImg: "/assets/hero-center-dryfruit.png",
    bowlAlt: "Wooden bowl of fresh snow white walnut halves",
    packAlt: "Monagrow Kashmiri Snow White Walnuts 500g Pouch",
    retailSizes: ["250g Nitrogen Pouch", "500g Standup Box Bag", "1 kg Aroma Seal Pouch"],
    bulkSizes: ["5 kg Vacuum Box", "10 kg Nitrogen-Flushed Master Carton", "Palletized Air Cargo Lots"],
    specs: [
      { label: "Color Grading", value: "Extra Light Snow White (Top Tier)" },
      { label: "Halves Proportion", value: "Over 85% Whole Halves" },
      { label: "Omega-3 (ALA)", value: "Over 9.0g / 100g" },
      { label: "Processing Method", value: "Hand-Cracked & Cleaned" },
      { label: "Foreign Material", value: "0.0% Shell Free Certified" },
      { label: "Shelf Life", value: "18 Months in Nitrogen Pack" },
    ],
    keyHighlights: [
      "Hand-cracked by artisanal valley cooperatives to preserve intact half-kernel geometry",
      "Naturally rich in plant-based Omega-3 alpha-linolenic acid (ALA) for cardiovascular health",
      "Strict cold-chain storage and oxygen-barrier packaging prevents rancidity",
    ],
  },
  {
    id: "roasted-pistachios",
    categoryKey: "dry-fruits",
    category: "Select Dry Fruits",
    name: "Roasted Salted Jumbo Pistachios",
    kicker: "Naturally Opened Jumbo · Light Himalayan Rock Salt",
    quoteName: "Roasted Salted Jumbo Pistachios",
    tagline: "Jumbo open-shell pistachios with light sea-salt crunch.",
    description:
      "Naturally sun-ripened on the tree until the shells split naturally. Roasted in gentle hot-air artisan drums with a delicate touch of Himalayan pink rock salt, delivering vibrant emerald-green kernels, unmatched crunch, and effortless opening.",
    originBadge: "Naturally Tree-Opened · Jumbo 18/20 Count",
    packImg: "/assets/monagrow-pistachios-bag-cutout.png",
    bowlImg: "/assets/hero-center-dryfruit.png",
    bowlAlt: "Wooden bowl of open-shell roasted salted green pistachios",
    packAlt: "Monagrow Roasted Salted Jumbo Pistachios 500g Pouch",
    retailSizes: ["250g Zip Pouch", "500g Standup Bag", "1 kg Resealable Party Pouch"],
    bulkSizes: ["10 kg Vacuum Boxes", "25 kg Poly Sacks", "Full Container Direct Lots"],
    specs: [
      { label: "Kernel Size", value: "Jumbo 18 - 20 Count / oz" },
      { label: "Opening Status", value: "100% Naturally Tree-Opened" },
      { label: "Closed Shells", value: "Under 0.5% Maximum" },
      { label: "Salt Concentration", value: "Under 1.5% Mild Himalayan Salt" },
      { label: "Roast Method", value: "Convection Hot Air (No Oil)" },
      { label: "Purity Grade", value: "First Grade Select Clean" },
    ],
    keyHighlights: [
      "Naturally split on the bough—zero mechanical cracking for effortless opening",
      "Roasted with dry hot air without frying oils or artificial flavor enhancers",
      "Vibrant purple-green inner skin and emerald kernel signaling maximum freshness and antioxidant potency",
    ],
  },
  {
    id: "golden-raisins",
    categoryKey: "dry-fruits",
    category: "Select Dry Fruits",
    name: "Golden Long Seedless Raisins",
    kicker: "Sun-Cured Afghan Amber · Natural Honey Glaze & High Iron",
    quoteName: "Golden Long Seedless Raisins",
    tagline: "Slender golden raisins with natural honey sweetness.",
    description:
      "Derived from premium seedless green grapes and naturally cured under arid sun conditions. Slender elongated berries with a glowing amber-golden hue, soft chewy bite, and deep natural grape honey sweetness without added sugar or syrups.",
    originBadge: "Long Slender Kernel · Sun-Cured Amber",
    packImg: "/assets/monagrow-raisins-bag-cutout.png",
    bowlImg: "/assets/hero-center-dryfruit.png",
    bowlAlt: "Wooden bowl of glowing long amber seedless raisins",
    packAlt: "Monagrow Golden Long Seedless Raisins 500g Pouch",
    retailSizes: ["250g Zip Pouch", "500g Standup Pouch", "1 kg Resealable Bag"],
    bulkSizes: ["10 kg Export Master Cartons", "12.5 kg Food-Service Boxes", "Direct FCL Shipments"],
    specs: [
      { label: "Berry Length", value: "12 mm - 16 mm Slender Long" },
      { label: "Seed Status", value: "100% Naturally Seedless" },
      { label: "Moisture Range", value: "13.0% - 15.5% Tender Chew" },
      { label: "Added Sugar", value: "0.0% Zero Added Sugar or Syrups" },
      { label: "Color Uniformity", value: "First Grade Golden Amber" },
      { label: "Sulfur Dioxide (SO2)", value: "Strict International Food Safety Limits" },
    ],
    keyHighlights: [
      "Extra-long slender berry geometry preferred by luxury bakeries and festive pilafs",
      "Washed, double-stemmed, and laser sorted to ensure zero grit or foreign debris",
      "Packed in nitrogen-blanketed moisture-barrier bags to preserve tenderness",
    ],
  },
  {
    id: "royal-mixed-dryfruits",
    categoryKey: "dry-fruits",
    category: "Select Dry Fruits",
    name: "Royal Mixed Dry Fruits (4-in-1)",
    kicker: "Curated 4-in-1 Selection · Cashews, Almonds, Walnuts, Pistachios",
    quoteName: "Royal Mixed Dry Fruits 4-in-1",
    tagline: "Cashews, almonds, walnuts and pistachios.",
    description:
      "A royal harvest of selected Whole W240 Cashews, California almonds, rich Kashmiri walnuts, and crunchy green pistachios. Sorted to perfection, nitrogen flushed to seal in freshness, and packaged for premium wholesale markets worldwide.",
    originBadge: "Royal 4-in-1 Selection · First Quality Grade",
    packImg: "/assets/monagrow-dryfruits-packaging.png",
    bowlImg: "/assets/hero-center-dryfruit.png",
    bowlAlt: "Full wooden bowl of royal mixed dry fruits",
    packAlt: "Monagrow Royal Mixed Dry Fruits packaging",
    retailSizes: ["1 kg Nitrogen-Flushed Pouch", "2.5 kg Resealable Standup Bag"],
    bulkSizes: ["10 kg Vacuum Tins (2 x 10kg Carton)", "20 kg Export Cartons", "Full Pallet Shipments"],
    specs: [
      { label: "Blend Composition", value: "25% Cashew · 25% Almond · 25% Walnut · 25% Pistachio" },
      { label: "Quality Grade", value: "First Quality White & Select Whole" },
      { label: "Moisture Threshold", value: "Under 4.5% Butter Crunch" },
      { label: "Gas Packaging", value: "Nitrogen Flushed Oxygen-Free" },
      { label: "Defect Tolerance", value: "Under 0.05% Strict Threshold" },
      { label: "Shelf Life", value: "24 Months Sealed" },
    ],
    keyHighlights: [
      "Rigid vacuum-sealed nitrogen enclosure preventing oxidation and moisture absorption",
      "Zero oil additives, salt preservatives, or artificial blanching agents",
      "Phytosanitary certified and cleared for immediate import at international deepwater ports",
    ],
  },
  {
    id: "cane-sugar",
    categoryKey: "sugar",
    category: "Refined Sugar",
    name: "Sugar",
    kicker: "Refined Sugar · 99.85% Minimum Polarization",
    quoteName: "Pure Refined Sugar (ICUMSA 45)",
    tagline: "Fine white crystals for everyday use.",
    description:
      "Refined from fresh-harvest sugarcane, Monagrow ICUMSA 45 represents the highest purity grade in international commodity trade. Free-flowing, sparkling white crystals with 99.85% minimum polarization, engineered for premium food manufacturing, confectionery, and retail distribution.",
    originBadge: "ICUMSA 45 RBU Max · 99.85% Minimum Pol",
    packImg: "/assets/monagrow-sugar-bag-cutout.png",
    bowlImg: "/assets/hero-center-sugar.png",
    bowlAlt: "Full ceramic bowl of sparkling sugar crystals",
    packAlt: "Monagrow Pure Sugar pouch",
    retailSizes: ["1 kg Retail Pack", "5 kg Heavy-Duty Poly Pouch"],
    bulkSizes: ["25 kg Multi-Wall Paper Bags", "50 kg Woven PP with PE Inner Liner", "1 MT Jumbo Sling Bags"],
    specs: [
      { label: "Color Index", value: "ICUMSA 45 RBU Maximum" },
      { label: "Sucrose Polarization", value: "99.85% Minimum Pure" },
      { label: "Moisture Content", value: "Under 0.04% Dry Crystals" },
      { label: "Dissolution Rate", value: "100% Instant Clean Dissolve" },
      { label: "Granulation", value: "Fine to Medium Uniform" },
      { label: "Conductivity Ash", value: "Under 0.04% Maximum" },
    ],
    keyHighlights: [
      "Ultra-low moisture specification prevents clumping during ocean transit and warehouse storage",
      "Food-grade polyethylene-lined sacks safeguard crystal cleanliness from humidity",
      "Continuous third-party lab inspection verification seals on every outgoing container lot",
    ],
  },
  {
    id: "natural-brown-sugar",
    categoryKey: "sugar",
    category: "Refined Sugar",
    name: "Natural Brown Cane Sugar",
    kicker: "100% Natural · Unrefined Minerals · Pure & Wholesome",
    quoteName: "Natural Brown Sugar",
    tagline: "Naturally Retained Molasses & Rich Golden Aroma",
    description:
      "Naturally derived from premium freshly harvested sugarcane, Monagrow Natural Brown Sugar retains its wholesome golden molasses goodness, deep aromatic sweetness, and vital trace minerals. Free from artificial bleaching, chemical additives, or preservatives—crafted for coffee, tea, artisan baking, and premium hospitality tables.",
    originBadge: "100% Natural Cane · Retained Molasses Minerals",
    packImg: "/assets/monagrow-brown-sugar-box-cutout.png",
    bowlImg: "/assets/hero-center-brown-sugar.png",
    bowlAlt: "Wooden bowl of golden amber natural brown sugar crystals",
    packAlt: "Monagrow Natural Brown Sugar 350g Retail Dispenser Box",
    retailSizes: ["350g Sachet Dispenser Box", "1 kg Standup Zipper Pouch"],
    bulkSizes: ["25 kg Multi-Wall Kraft Paper Bags", "50 kg Woven PP with Food-Grade Inner Liner", "Palletized Export Loads"],
    specs: [
      { label: "Purity & Form", value: "100% Natural Brown Cane" },
      { label: "Molasses Content", value: "Naturally Retained" },
      { label: "Additive Level", value: "Zero Additives & Preservative Free" },
      { label: "Granulation", value: "Golden Sparkling Demerara" },
      { label: "Retail Pack", value: "350g Sachet Dispenser Box" },
      { label: "Certification", value: "Non-GMO & Food Grade Purity" },
    ],
    keyHighlights: [
      "Retains natural sugarcane molasses, rich caramel notes, and essential trace minerals",
      "100% unbleached and additive-free with verified non-GMO food-grade purity",
      "Convenient 350g retail dispenser box with portion-controlled single-serve sachets ideal for premium cafe and hospitality use",
    ],
  },

];

export const RICE_ADDITIONAL_PRODUCTS: CommodityProduct[] = [
  {
    id: "basmati-brown-rice",
    categoryKey: "rice",
    category: "Grains & Rice",
    name: "Premium Basmati Brown Rice",
    kicker: "100% Whole Grain · Naturally Aged · Nutrient Dense",
    quoteName: "Premium Basmati Brown Rice",
    tagline: "Wholesome Unpolished Whole Grain with Nutty Aroma",
    description:
      "Monagrow Premium Basmati Brown Rice retains 100% of its nutritious outer bran layer and germ, delivering an authentic nutty fragrance, delightful al dente texture, and wholesome nutrition. Naturally aged and rich in essential dietary fiber, manganese, and minerals while offering the celebrated long-slender elegance of genuine Basmati.",
    originBadge: "100% Whole Grain · Naturally Aged",
    packImg: "/assets/monagrow-brown-rice-bag-cutout.png",
    bowlImg: "/assets/hero-center-rice.png",
    bowlAlt: "Full ceramic bowl of wholesome Basmati brown rice",
    packAlt: "Monagrow Premium Basmati Brown Rice 5kg Standup Box Bag",
    retailSizes: ["1 kg Aroma-Lock Pouch", "5 kg Standup Box Bag with Handle"],
    bulkSizes: ["10 kg Vacuum Cartons", "25 kg Multi-Ply Moisture Bags", "Custom Palletized Lots"],
    specs: [
      { label: "Grain Form", value: "100% Whole Grain Brown" },
      { label: "Milling Type", value: "Unpolished (Bran Retained)" },
      { label: "Aroma Profile", value: "Naturally Aged Nutty Aroma" },
      { label: "Packaging Form", value: "5 KG Net Weight Pack" },
    ],
    keyHighlights: [
      "Preserves 100% of the nutrient-dense outer bran and germ for clean energy and wellness",
      "Naturally aged to produce fluffy, separate long-slender grains with zero mushiness",
      "Hermetically sealed in 5kg oxygen-barrier box bags with built-in handle for lasting freshness",
    ],
  },
  {
    id: "traditional-basmati-rice",
    categoryKey: "rice",
    category: "Grains & Rice",
    name: "Royal Reserve Traditional Basmati",
    kicker: "Heritage Himalayan Harvest · Aged 2 Full Years",
    quoteName: "Royal Reserve Traditional Basmati Rice",
    tagline: "Heritage Himalayan Harvest · Aged 2 Years for Silky Texture & Exquisite Aroma",
    description:
      "Harvested from the foothills of the Himalayas and aged naturally for up to two full harvest cycles. Celebrated for its slender needle-like kernel, exquisite floral aroma, and delicate sweet flavour profile.",
    originBadge: "Himalayan Reserve · 2 Years Aged",
    packImg: "/assets/monagrow-traditional-basmati-bag-cutout.png",
    bowlImg: "/assets/hero-center-rice.png",
    bowlAlt: "Full ceramic bowl of Royal Reserve Traditional Basmati rice",
    packAlt: "Monagrow Royal Reserve Traditional Basmati Rice Pack",
    retailSizes: ["1 kg Vacuum Box Pouch", "5 kg Standup Bag with Handle"],
    bulkSizes: ["10 kg Jute Bag with Handle", "25 kg / 50 kg Moisture Poly Sacks", "Custom Palletized Lots"],
    specs: [
      { label: "Aging Method", value: "2 Full Years Natural Aging" },
      { label: "Aroma Profile", value: "Intense Floral Basmati" },
      { label: "Grain Structure", value: "Slender Pearl Kernel" },
      { label: "Purity Grade", value: "100% Sortex Pure" },
    ],
    keyHighlights: [
      "Authentic non-GMO traditional Basmati lineage preserving deep culinary heritage",
      "Long natural aging reduces moisture content to optimal levels for effortless cooking",
      "Double-polished to eliminate surface bran dust while keeping kernel integrity pristine",
    ],
  },

];

export const RICE_PAGE_PRODUCTS: CommodityProduct[] = [
  ...PRODUCTS.filter((p) => p.categoryKey === "rice"),
  ...RICE_ADDITIONAL_PRODUCTS,
];

export function getRicePageProducts(): CommodityProduct[] {
  return RICE_PAGE_PRODUCTS;
}

export const SUGAR_ADDITIONAL_PRODUCTS: CommodityProduct[] = [];
export const SUGAR_PAGE_PRODUCTS: CommodityProduct[] = [
  ...PRODUCTS.filter((p) => p.categoryKey === "sugar"),
  ...SUGAR_ADDITIONAL_PRODUCTS,
];

export function getSugarPageProducts(): CommodityProduct[] {
  return SUGAR_PAGE_PRODUCTS;
}

export function getProductsByCategory(categoryKey: string): CommodityProduct[] {
  return PRODUCTS.filter((p) => p.categoryKey === categoryKey);
}

export function getProductById(id: string): CommodityProduct | undefined {
  return (
    SUGAR_PAGE_PRODUCTS.find((p) => p.id === id) ||
    RICE_PAGE_PRODUCTS.find((p) => p.id === id) ||
    PRODUCTS.find((p) => p.id === id)
  );
}

