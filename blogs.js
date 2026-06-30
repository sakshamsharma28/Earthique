// Earthique Skincare Blog Database
const blogs = [
  {
    id: "1",
    title: "The Ultimate Skincare Routine: Order of Application",
    category: "Skincare Tips",
    excerpt: "Learn how to layer your skincare products correctly to maximize their efficacy and get that glowing skin.",
    content: `Layering skincare products correctly is crucial to ensuring your skin absorbs the full benefits of each ingredient. The golden rule is simple: apply products from thinnest consistency to thickest. 

Here is your step-by-step layering guide:

1. **Cleanse:** Always start with a fresh slate. Use a gentle cleanser like the Earthique Tea Tree Foaming Face Wash to wash away dirt and excess oils.
2. **Tone:** Toners restore pH balance and prepare the skin to absorb active ingredients. Mist the Earthique CoQ10 Revitalizing Toner.
3. **Serum:** Serums are concentrated treatments for specific concerns. Apply your Vitamin C Glow Serum in the morning or Niacinamide Pore Serum at night.
4. **Moisturize:** Seal in the active serums and lock in moisture. Use the Hydrating Gel Moisturizer for a lightweight day finish or the Bakuchiol Overnight Cream for evening repair.
5. **Protect (Day only):** Never skip sunscreen. Finish your morning routine with Earthique SPF 50 Matte Sunscreen to protect against UVA/UVB damage.`,
    author: "Dr. Evelyn Shore",
    authorTitle: "Dermatologist & Brand Consultant",
    date: "June 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-155622847b-180a1387c7fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2",
    title: "Bakuchiol vs. Retinol: The Natural Age Defense Alternative",
    category: "Ingredients Guide",
    excerpt: "Discover Bakuchiol, the plant-based retinol alternative that fights fine lines without irritation.",
    content: `Retinol has long been crowned the gold standard in anti-aging, but it often comes with unwanted side effects: peeling, redness, dryness, and sun sensitivity. Enter Bakuchiol, a plant-derived antioxidant from the Babchi plant.

Here's why Bakuchiol is transforming natural skincare:

- **Retinol Mimicry:** Research shows Bakuchiol stimulates collagen production and increases cell turnover, reducing fine lines just like traditional retinol.
- **Gentle on Skin:** Bakuchiol has natural anti-inflammatory and soothing properties. It doesn't cause dryness or flaking, making it safe for sensitive skin.
- **Day and Night Friendly:** Unlike retinol, which breaks down in sunlight and increases sun sensitivity, Bakuchiol can be safely used in both your AM and PM routines.

Try it yourself in our Earthique Bakuchiol Overnight Cream, formulated to repair skin texture while you sleep.`,
    author: "Sarah Jenkins",
    authorTitle: "Lead Skincare Chemist",
    date: "May 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "3",
    title: "Double Cleansing: Why Your Skin Needs It",
    category: "Beauty Routine",
    excerpt: "Unveil the secret to perfectly clear skin and why one wash isn't enough to remove impurities.",
    content: `If you wear makeup, sunscreen, or spend time in urban environments, double cleansing is a game-changer. The two-step washing process ensures that your pores are thoroughly cleared of oil-based and water-based impurities.

How double cleansing works:

1. **Step 1: Oil-Based Cleanser:** Use a cleansing oil or balm to dissolve makeup, sebum, pollution, and sunscreen. Oil dissolves oil, pulling these stubborn blockages out of your pores.
2. **Step 2: Water-Based Cleanser:** Follow up with a gentle water-based foaming cleanser like our Tea Tree Foaming Face Wash. This cleanses the skin cells, sweat, and dirt.

Benefits of double cleansing include a visible reduction in acne, less congested pores, and a smoother canvas that absorbs subsequent toners and serums far more effectively.`,
    author: "Dr. Evelyn Shore",
    authorTitle: "Dermatologist & Brand Consultant",
    date: "June 2, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "4",
    title: "Mindful Skincare: Stress Relief Through Your Routine",
    category: "Wellness",
    excerpt: "How to transform your daily skincare routine into a therapeutic ritual for your mind and body.",
    content: `Skincare isn't just about cellular repair; it's an opportunity to check in with yourself. Cultivating a mindful skincare routine can lower cortisol levels, reducing stress-induced skin breakouts and promoting overall wellness.

Steps to turn skincare into self-care:

- **Slow Down:** Avoid rushing through your routine. Treat each application as an intentional act of self-care.
- **Incorporate Aromatherapy:** Use products with soothing natural botanicals. Breathe in the earthy sandalwood aroma of our Herbal Body Wash or the calming rose scent of our Toner.
- **Massage Gently:** Massage your moisturizers and oils in upward, circular motions. This relieves facial muscle tension, increases lymphatic drainage, and provides a soothing massage sensation.
- **Express Gratitude:** Take a moment in front of the mirror to appreciate your natural skin, focusing on health and purity rather than perfection.`,
    author: "Marcus Miller",
    authorTitle: "Holistic Health Coach",
    date: "May 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "5",
    title: "Demystifying Niacinamide: Benefits for All Skin Types",
    category: "Ingredients Guide",
    excerpt: "What is Niacinamide and why is this versatile vitamin a must-have in every beauty cabinet?",
    content: `Niacinamide, also known as Vitamin B3, is one of the most versatile and well-tolerated ingredients in modern skincare. Unlike acids or retinol, Niacinamide is gentle and suitable for dry, oily, and sensitive skin types alike.

Key benefits of Niacinamide:

1. **Tightens Pores:** By regulating sebum production, it prevents pores from stretching, keeping them looking tight and small.
2. **Fades Dark Spots:** It blocks the transfer of pigment (melanin) to skin cells, effectively fading acne scars and sunspots.
3. **Calms Inflammation:** Its anti-inflammatory properties soothe redness, irritation, and flare-ups.
4. **Boosts Hydration:** It stimulates the production of ceramides, which lock moisture into the skin barrier.

Incorporate it into your routine with our Niacinamide Pore Serum to refine skin texture and balance sebum.`,
    author: "Sarah Jenkins",
    authorTitle: "Lead Skincare Chemist",
    date: "June 20, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "6",
    title: "Dry vs. Dehydrated Skin: What's the Difference?",
    category: "Product Education",
    excerpt: "Your skin might be thirsty, not dry. Learn how to identify your skin issue and treat it properly.",
    content: `Is your skin dry, or is it dehydrated? While these terms sound similar, they represent two entirely different issues requiring different treatments.

**Dry Skin (Lack of Oil):**
Dry skin is a skin type. Your skin lacks sebum (oil) production. It often feels dry all over the body, looks flaky, and can feel tight. 
*Treatment:* You need rich lipid-replenishing moisturizers containing butter and oils, like our Shea Butter Lip Balm and Bakuchiol Overnight Cream.

**Dehydrated Skin (Lack of Water):**
Dehydrated skin is a temporary skin condition. Your skin lacks water in the stratum corneum, often caused by weather, diet, or stripping products. Dehydrated skin can feel tight but still produce excess oils to compensate for the water loss.
*Treatment:* You need humectants that draw water into the cells, like our Hyaluronic Acid-rich Hydrating Gel Moisturizer.`,
    author: "Dr. Evelyn Shore",
    authorTitle: "Dermatologist & Brand Consultant",
    date: "April 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80"
  }
];
