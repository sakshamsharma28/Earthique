// Earthique Skincare Products Database
const products = [
  {
    id: "1",
    name: "Vitamin C Glow Serum",
    category: "Serum",
    skinConcern: "Pigmentation",
    price: 1299,
    rating: 4.8,
    reviewsCount: 124,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Best Seller",
    shortDescription: "Brighten and revitalize dull skin with stable Vitamin C and orange extract.",
    description: "An advanced, stable Vitamin C formula suspended in rich aloe water, designed to target pigmentation and reveal an even, luminous glow. Powered by plant-based antioxidants to protect against environmental stressors.",
    ingredients: "Ethylated Ascorbic Acid (Vitamin C 15%), Aloe Barbadensis Leaf Juice, Hyaluronic Acid, Orange Peel Extract, Vitamin E, Kakadu Plum Extract.",
    benefits: [
      "Brightens dull complexion and targets dark spots",
      "Reduces hyperpigmentation and uneven skin tone",
      "Boosts collagen synthesis for firmer skin texture"
    ],
    directions: "Apply 3-4 drops to clean, dry face morning and night. Gently press into skin. Follow with SPF during the day.",
    faqs: [
      { q: "Can I use this daily?", a: "Yes, our stable Vitamin C is designed for twice daily use, morning and evening." },
      { q: "Is it suitable for acne-prone skin?", a: "Yes, it is non-comedogenic and helps fade post-acne marks." }
    ],
    featured: true
  },
  {
    id: "2",
    name: "Hydrating Gel Moisturizer",
    category: "Moisturizer",
    skinConcern: "Dry Skin",
    price: 999,
    rating: 4.9,
    reviewsCount: 188,
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "100% Natural",
    shortDescription: "Ultra-lightweight moisturizer that locks in moisture for 72 hours.",
    description: "Formulated with plant-derived Hyaluronic Acid and organic Coconut Water, this refreshing gel-cream instantly quenches dry skin, leaving it plump, dewy, and hydrated without any greasy residue.",
    ingredients: "Organic Coconut Water, Hyaluronic Acid, Aloe Vera Juice, Glycerin, Cucumber Fruit Extract, Green Tea Extract.",
    benefits: [
      "Instantly provides a surge of cooling hydration",
      "Locks in moisture for up to 72 hours",
      "Strengthens the skin's moisture barrier"
    ],
    directions: "Smooth over clean face and neck in upward strokes. Use morning and night after serums.",
    faqs: [
      { q: "Is this sticky?", a: "Not at all. The gel-like texture absorbs completely in seconds, leaving a soft matte-satin finish." },
      { q: "Can I wear it under makeup?", a: "Yes, it acts as an excellent hydrating primer." }
    ],
    featured: true
  },
  {
    id: "3",
    name: "Salicylic Acid Cleanser",
    category: "Cleanser",
    skinConcern: "Acne & Pimples",
    price: 899,
    rating: 4.7,
    reviewsCount: 96,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Active Care",
    shortDescription: "Clarifying gel cleanser targeting active breakouts and excess oil.",
    description: "Deeply cleanse pores and clear away breakout-causing impurities. Our Salicylic Acid Cleanser combines willow bark extract with soothing tea tree oil to gently exfoliate skin, calm redness, and prevent future pimples.",
    ingredients: "Salicylic Acid (2%), Willow Bark Extract, Tea Tree Leaf Oil, Witch Hazel Water, Licorice Root Extract, Aloe Leaf Extract.",
    benefits: [
      "Deep cleanses pores to remove sebum and dirt",
      "Reduces active acne breakouts and inflammation",
      "Exfoliates dead skin cells for a smoother texture"
    ],
    directions: "Massage a small amount onto damp skin. Rinse thoroughly with lukewarm water. Use morning and night.",
    faqs: [
      { q: "Will this dry out my skin?", a: "No, we have balanced the Salicylic Acid with Aloe Vera to ensure skin remains calm and hydrated." },
      { q: "How long until I see results?", a: "Most users notice a reduction in oiliness and breakouts within 1 to 2 weeks." }
    ],
    featured: true
  },
  {
    id: "4",
    name: "SPF 50 Matte Sunscreen",
    category: "Sunscreen",
    skinConcern: "Sensitive Skin",
    price: 1199,
    rating: 4.8,
    reviewsCount: 215,
    images: [
      "assets/sunscreen.png",
      "assets/sunscreen.png"
    ],
    badge: "Cruelty Free",
    shortDescription: "Ultra-lightweight physical sunscreen with zero white cast and matte finish.",
    description: "A premium physical sunscreen featuring Zinc Oxide and Titanium Dioxide. Infused with soothing Aloe Vera and Calendula, it protects against UVA/UVB rays and blue light, leaving a comfortable matte, non-sticky feel.",
    ingredients: "Zinc Oxide (Non-nano), Titanium Dioxide, Calendula Officinalis Extract, Aloe Vera Leaf Extract, Chamomile Oil, Sunflower Seed Oil.",
    benefits: [
      "Broad-spectrum SPF 50 PA+++ protection",
      "Non-greasy, matte finish ideal for oily and sensitive skin",
      "Reef-safe and paraben-free formulation"
    ],
    directions: "Apply generously to face, neck, and exposed skin 15 minutes before sun exposure. Reapply every 2 hours.",
    faqs: [
      { q: "Does this leave a white cast?", a: "No, our micronized mineral formula blends seamlessly into all skin tones with zero white cast." },
      { q: "Is it suitable for eczema-prone skin?", a: "Yes, Calendula and Chamomile soothe irritation, making it safe for eczema." }
    ],
    featured: true
  },
  {
    id: "5",
    name: "Niacinamide Pore Serum",
    category: "Serum",
    skinConcern: "Oily Skin",
    price: 1399,
    rating: 4.7,
    reviewsCount: 142,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Refining",
    shortDescription: "Regulates sebum production, minimizes pores, and strengthens skin barrier.",
    description: "Formulated with 10% pure Niacinamide and 1% Zinc PCA, this powerful serum regulates oil production, visually tightens enlarged pores, and strengthens the skin's moisture barrier for a smooth, refined complexion.",
    ingredients: "Niacinamide (10%), Zinc PCA (1%), Centella Asiatica (Cica) Extract, Hyaluronic Acid, Rosemary Leaf Extract.",
    benefits: [
      "Minimizes the appearance of enlarged pores",
      "Regulates sebum production and reduces shine",
      "Helps fade acne marks and uneven spots"
    ],
    directions: "Apply 2-3 drops to clean face and neck. Press gently. Follow with moisturizer.",
    faqs: [
      { q: "Can I use this with Vitamin C?", a: "Yes, but we recommend using Vitamin C in the morning and Niacinamide in the evening for best results." }
    ],
    featured: true
  },
  {
    id: "6",
    name: "Bakuchiol Overnight Cream",
    category: "Moisturizer",
    skinConcern: "Anti Aging",
    price: 1799,
    rating: 4.9,
    reviewsCount: 110,
    images: [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Age Defense",
    shortDescription: "Natural retinol alternative that targets fine lines and restores youthfulness.",
    description: "An intensive overnight moisturizer powered by Bakuchiol, a plant-based retinol alternative that offers all the anti-aging benefits of retinol without the irritation. Overnight, it boosts skin cell turnover and deeply nourishes.",
    ingredients: "Bakuchiol (Natural Retinol Alternative), Rosehip Seed Oil, Coenzyme Q10, Shea Butter, Sweet Almond Oil, Ceramide NP.",
    benefits: [
      "Reduces fine lines, wrinkles, and signs of aging",
      "Improves skin elasticity and firmness",
      "Deeply regenerates and hydrates during sleep"
    ],
    directions: "Apply a nickel-sized amount onto face and neck as the final step of your evening routine.",
    faqs: [
      { q: "Does it cause peeling like retinol?", a: "No, Bakuchiol is highly stable and soothing, making it safe for nightly use without redness or peeling." }
    ],
    featured: true
  },
  {
    id: "7",
    name: "Tea Tree Foaming Face Wash",
    category: "Face Wash",
    skinConcern: "Acne & Pimples",
    price: 799,
    rating: 4.6,
    reviewsCount: 88,
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Pure & Organic",
    shortDescription: "Gentle foaming face wash infused with tea tree and neem extracts.",
    description: "A purifying foam cleanser designed for oily and acne-prone skin. Tea Tree oil acts as a natural antibacterial agent to wash away bacteria, while Neem extracts soothe irritation and dry up blemishes.",
    ingredients: "Tea Tree Essential Oil, Neem Leaf Extract, Aloe Vera Leaf Juice, Salicylic Acid (0.5%), Tulsi (Holy Basil) Extract, Lavender Oil.",
    benefits: [
      "Soothes inflamed, red, and acne-prone skin",
      "Washes away oil and impurities without stripping moisture",
      "Provides a clean, matte, and refreshed sensation"
    ],
    directions: "Pump foam onto wet hands, massage onto face in circular motions, and rinse with cold water.",
    faqs: [
      { q: "Can sensitive skin use this?", a: "Yes, it contains aloe vera to keep the wash gentle and hydrating." }
    ],
    featured: false
  },
  {
    id: "8",
    name: "Kaolin Clay Purifying Mask",
    category: "Face Mask",
    skinConcern: "Oily Skin",
    price: 1099,
    rating: 4.7,
    reviewsCount: 65,
    images: [
      "https://images.unsplash.com/photo-1567894192231-d22d9c12214d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Detox",
    shortDescription: "Deep-cleaning clay mask that draws out toxins and controls shine.",
    description: "Our clarifying mask blends Kaolin and Bentonite clays with soothing botanical extracts to draw out impurities, absorb excess sebum, and deep-clean pores, leaving skin smooth and refined.",
    ingredients: "Kaolin Clay, Bentonite Clay, Charcoal Powder, Aloe Leaf Extract, Witch Hazel Extract, Tea Tree Oil.",
    benefits: [
      "Deeply detoxifies pores, reducing whiteheads and blackheads",
      "Absorbs excess oils to minimize shininess",
      "Refines and smooths overall skin texture"
    ],
    directions: "Apply an even layer to clean skin. Leave on for 10-15 minutes until dry. Rinse off with warm water. Use 1-2 times a week.",
    faqs: [
      { q: "Will this tighten my pores?", a: "Yes, by removing blockages and absorbing sebum, pores appear visually tighter." }
    ],
    featured: false
  },
  {
    id: "9",
    name: "CoQ10 Revitalizing Toner",
    category: "Toner",
    skinConcern: "Sensitive Skin",
    price: 949,
    rating: 4.8,
    reviewsCount: 78,
    images: [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "pH Balance",
    shortDescription: "Calming toner mist loaded with Coenzyme Q10 and Chamomile.",
    description: "Restore skin's pH balance and provide antioxidant protection. CoQ10 boosts cell regeneration and repairs environmental damage, while Rose Water and Chamomile calm redness instantly.",
    ingredients: "Coenzyme Q10, Organic Rose Water, Chamomile Flower Extract, Witch Hazel, Hyaluronic Acid, Licorice Root Extract.",
    benefits: [
      "Instantly hydrates and balances skin pH level",
      "Reduces redness and calms sensitive skin irritations",
      "Prepares skin for optimal serum absorption"
    ],
    directions: "Spray directly onto face or apply with a cotton pad after cleansing. Pat gently into skin.",
    faqs: [
      { q: "Is it alcohol-free?", a: "Yes, completely alcohol-free and oil-free, making it perfect for sensitive skin." }
    ],
    featured: false
  },
  {
    id: "10",
    name: "Shea Butter Ultra Lip Care",
    category: "Lip Care",
    skinConcern: "Dry Skin",
    price: 499,
    rating: 4.9,
    reviewsCount: 154,
    images: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Nourishing",
    shortDescription: "Rich, buttery lip balm that heals chapped lips and adds subtle sheen.",
    description: "An ultra-nourishing lip balm packed with cold-pressed Shea Butter, Beeswax, and Vitamin E. Heals cracked skin, locks in hydration for soft, plump, and healthy lips all day.",
    ingredients: "Organic Shea Butter, Beeswax, Sweet Almond Oil, Jojoba Oil, Vitamin E, Vanilla Fruit Extract.",
    benefits: [
      "Intensely hydrates and softens dry, chapped lips",
      "Creates a protective moisture barrier",
      "Leaves lips with a natural, healthy sheen"
    ],
    directions: "Apply to lips as needed throughout the day and before bedtime for an overnight treatment.",
    faqs: [
      { q: "Is there a tint?", a: "No, it goes on clear, leaving a soft dewy sheen." }
    ],
    featured: false
  },
  {
    id: "11",
    name: "Rosemary Hair Growth Serum",
    category: "Hair Care",
    skinConcern: "Sensitive Skin",
    price: 1599,
    rating: 4.7,
    reviewsCount: 133,
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "scalp Care",
    shortDescription: "Rosemary and biotin scalp serum to boost circulation and hair density.",
    description: "A lightweight, non-greasy scalp serum formulated with Rosemary leaf oil, Biotin, and Peppermint extract. Activates hair follicles, increases blood circulation, and strengthens roots for thicker, healthier hair.",
    ingredients: "Rosemary Leaf Oil, Biotin (Vitamin B7), Peppermint Oil, Ginseng Extract, Castor Oil, Vitamin E, Pro-vitamin B5.",
    benefits: [
      "Stimulates scalp blood flow to promote hair growth",
      "Reduces hair fall and strengthens hair shafts",
      "Soothes itchy and dry scalp conditions"
    ],
    directions: "Apply a few drops directly to the scalp on dry or damp hair. Massage gently with fingertips. Do not rinse.",
    faqs: [
      { q: "Will this make my scalp oily?", a: "No, the water-based formula absorbs quickly without leaving a greasy build-up." },
      { q: "How often should I use it?", a: "We recommend applying it once daily, ideally at night." }
    ],
    featured: false
  },
  {
    id: "12",
    name: "Herbal Body Wash",
    category: "Body Care",
    skinConcern: "Dry Skin",
    price: 849,
    rating: 4.8,
    reviewsCount: 92,
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Eco-Friendly",
    shortDescription: "Soothing body cleanser with Sandalwood, Aloe, and Jojoba.",
    description: "Wash away the stress of the day with our aromatic, herbal body wash. Formulated with pure Sandalwood oil and Aloe extracts, it cleanses skin gently while restoring hydration and wrapping you in an earthy scent.",
    ingredients: "Sandalwood Essential Oil, Aloe Vera Extract, Jojoba Oil, Vitamin E, Glycerin, Decyl Glucoside (Natural Cleanser).",
    benefits: [
      "Gently cleanses body skin without removing natural moisture",
      "Hydrates dry patches, leaving skin silky smooth",
      "Delivers a calming, luxurious sandalwood aromatherapy experience"
    ],
    directions: "Lather onto damp skin using hands or loofah. Rinse off completely with water.",
    faqs: [
      { q: "Is it sulfate-free?", a: "Yes, it is 100% sulfate-free, using coconut-derived cleansers instead." }
    ],
    featured: false
  }
];
