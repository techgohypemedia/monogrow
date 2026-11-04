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
        desc: "Only fully ripe cherries are harvested by experienced estate workers, guaranteeing uniform density and zero green astringency.",
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
      { value: "< 0.04%", label: "Moisture Content", sub: "Guaranteed Anti-Caking" },
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
        title: "Under 0.04% Moisture Guarantee",
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
        desc: "Sorted by precision mesh sizing to maintain a strict count of 220 to 240 whole kernels per pound, guaranteeing generous visual presentation.",
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
      "Ethically procured through direct estate agreements with guaranteed farmer living wages",
      "Available as whole roasted bean, custom ground, or green unroasted export lots",
    ],
  },
  {
    id: "royal-cashews",
    categoryKey: "dry-fruits",
    category: "Select Dry Fruits",
    name: "Royal Mixed Dry Fruits",
    kicker: "Curated 4-in-1 Selection · Cashews, Almonds, Walnuts, Pistachios",
    quoteName: "Royal Mixed Dry Fruits",
    tagline: "Cashews, almonds, walnuts and pistachios.",
    description:
      "A royal harvest of selected Whole Dryfruits, California almonds, rich walnuts, and crunchy green pistachios. Sorted to perfection, nitrogen flushed to seal in freshness, and packaged for premium wholesale markets worldwide.",
    originBadge: "Royal 4-in-1 Selection · First Quality Grade",
    packImg: "/assets/monagrow-dryfruits-packaging.png",
    bowlImg: "/assets/hero-center-dryfruit.png",
    bowlAlt: "Full wooden bowl of royal mixed dry fruits",
    packAlt: "Monagrow Royal Mixed Dry Fruits packaging",
    retailSizes: ["1 kg Nitrogen-Flushed Pouch", "2.5 kg Resealable Standup Bag"],
    bulkSizes: ["10 kg Vacuum Tins (2 x 10kg Carton)", "20 kg Export Cartons", "Full Pallet Shipments"],
    specs: [
      { label: "Grade Specification", value: "W240 King Size Whole" },
      { label: "Kernel Density", value: "220 - 240 Kernels / lb" },
      { label: "Quality Grade", value: "First Quality White (Zero Blemish)" },
      { label: "Moisture Threshold", value: "Under 4.5% Butter Crunch" },
      { label: "Gas Packaging", value: "Nitrogen Flushed Oxygen-Free" },
      { label: "Defect Tolerance", value: "Under 0.05% Strict Threshold" },
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
];

export const RICE_ADDITIONAL_PRODUCTS: CommodityProduct[] = [
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
      "SGS certified export grade with guaranteed low broken kernel percentage",
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
      "Cultivated across pristine Himalayan meltwater valleys, Monagrow Jeera Masino Rice is renowned for its delicate slender grain, gentle natural aroma, and rich tender finish. Naturally cured and aged to guarantee non-sticky, separate fluffy grains upon cooking—ideal for traditional everyday dining and specialty festive feasts.",
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

export const SUGAR_ADDITIONAL_PRODUCTS: CommodityProduct[] = [
  {
    id: "natural-brown-sugar",
    categoryKey: "sugar",
    category: "Refined Sugar",
    name: "Brown Sugar",
    kicker: "100% Natural · Unrefined Minerals · Pure & Wholesome",
    quoteName: "Brown Sugar",
    tagline: "Rich molasses flavour for baking.",
    description:
      "Naturally derived from premium freshly harvested sugarcane, Monagrow Brown Sugar retains its wholesome golden molasses goodness, deep aromatic sweetness, and vital trace minerals. Free from artificial bleaching, chemical additives, or preservatives—crafted for coffee, tea, artisan baking, and premium hospitality tables.",
    originBadge: "100% Natural Cane · Retained Molasses Minerals",
    packImg: "/assets/monagrow-brown-sugar-box-cutout.png",
    bowlImg: "/assets/hero-center-brown-sugar.png",
    bowlAlt: "Wooden bowl of golden amber natural brown sugar crystals",
    packAlt: "Monagrow Brown Sugar 350g Retail Dispenser Box",
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

