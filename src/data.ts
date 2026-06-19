import { Service, ChoiceFeature, ProductItem, FAQItem, Testimonial, ProcessStep } from './types';

// Let's reference the generated assets accurately:
export const HERO_IMAGE = "/src/assets/images/choco_hero_1781080406588.png";
export const CORPORE_BOX_IMAGE = "/src/assets/images/choco_box_1781080422062.png";
export const CRAFTING_IMAGE = "/src/assets/images/choco_crafting_1781080437254.png";

export const STATISTICS = [
  { id: "stat-1", count: 5000, label: "Happy Customers", suffix: "+" },
  { id: "stat-2", count: 100, label: "Corporate Clients", suffix: "+" },
  { id: "stat-3", count: 50, label: "Chocolate Varieties", suffix: "+" },
  { id: "stat-4", count: 10, label: "Years Experience", suffix: "+" }
];

export const SERVICES: Service[] = [
  {
    id: "srv-custom-gifts",
    title: "Customized Chocolate Gifts",
    description: "Individually personalized chocolates for milestones, birthdays, anniversaries, and personal celebrations. Design your box size, selection, and packaging lettering.",
    iconName: "Gift"
  },
  {
    id: "srv-corp-gifting",
    title: "Corporate Gifting",
    description: "Premium branded chocolate gift boxes aligned with your corporate identity, perfect for clients, employees, and executive partnerships.",
    iconName: "Briefcase"
  },
  {
    id: "srv-wedding-events",
    title: "Wedding & Event Chocolates",
    description: "Elegant custom favor boxes, lavish dessert tables, and unique thematic chocolate sculptures customized for weddings and luxury events.",
    iconName: "Sparkles"
  },
  {
    id: "srv-handmade",
    title: "Handmade Premium Chocolates",
    description: "Flawlessly glossy, single-origin dark chocolate pralines, infused ganaches, and exotic truffles handcrafted meticulously by chocolate chefs.",
    iconName: "Heart"
  },
  {
    id: "srv-seasonal",
    title: "Seasonal Collections",
    description: "Celebrate festive holidays with curation boxes featuring hand-painted designs, fall warming spices, or fresh summer fruit infusions.",
    iconName: "Calendar"
  },
  {
    id: "srv-bulk",
    title: "Bulk Orders",
    description: "Large capacity chocolate creation without compromising our rigorous artisanal quality, fully shipped on strict temperature-controlled timelines.",
    iconName: "Cpu"
  }
];

export const WHY_CHOOSE_US: ChoiceFeature[] = [
  {
    id: "why-1",
    title: "Premium Ingredients",
    description: "We source 100% pure single-origin cocoa beans from top cocoa fields in Madagascar and Ecuador, with zero palm oil or additives.",
    iconName: "Gem"
  },
  {
    id: "why-2",
    title: "Handmade Quality",
    description: "Every single piece is tempered, molded, hand-polished, and hand-decorated by expert certified chocolatiers.",
    iconName: "Smile"
  },
  {
    id: "why-3",
    title: "Custom Packaging",
    description: "From luxury velvet boxes to customized metallic foil branding with handwritten card options, we make gifting memorable.",
    iconName: "Package"
  },
  {
    id: "why-4",
    title: "Fast Delivery",
    description: "Operating with cold-chain shipping logistics. We guarantee that your chocolates arrive in solid, fresh state, no matter the weather.",
    iconName: "Truck"
  },
  {
    id: "why-5",
    title: "Affordable Luxury",
    description: "Premium taste shouldn't be inaccessible. We price our luxury chocolate assortments reasonably for corporate or milestone gifting.",
    iconName: "Coins"
  },
  {
    id: "why-6",
    title: "Exceptional Service",
    description: "From rapid graphic-branding mockups to instant consultation on custom boxes, our team leads with supreme hospitality.",
    iconName: "UserCheck"
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    title: "Signatures Truffle Collection",
    category: "Luxury Chocolate Boxes",
    description: "An array of our 16 legendary handcrafted pralines featuring sea-salt caramel, golden hazelnut, raspberry ruby, and grand cru dark ganache.",
    priceEstimate: "₹3,750.00",
    image: "https://files.catbox.moe/hlzaoz.png",
    tags: ["Signature", "Best Seller", "Artisan"]
  },
  {
    id: "prod-2",
    title: "Executive Crest Gift Box",
    category: "Corporate Gift Packs",
    description: "https://files.catbox.moe/bxjlhs.jpg",
    priceEstimate: "₹5,400.00",
    image: CORPORE_BOX_IMAGE,
    tags: ["Corporate", "Custom Logo", "Bespoke"]
  },
  {
    id: "prod-3",
    title: "Amour Pearl Favor Trays",
    category: "Wedding Favors",
    description: "Dainty dual-piece custom drawers wrapped with silk golden ropes, containing rose-infused ivory ganaches customized with couple initials.",
    priceEstimate: "₹540.00 / unit",
    image: "https://files.catbox.moe/0xvz2b.jpg",
    tags: ["Wedding", "Pearls", "Monogram"]
  },
  {
    id: "prod-4",
    title: "Choco Rocks Customized Lettering Blocks",
    category: "Customized Chocolates",
    description: "Spell out names, heartfelt greetings, or corporate motifs in premium solid white, milk, and dark Swiss chocolate blocks.",
    priceEstimate: "₹2,100.00",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=600",
    tags: ["Customized", "Solid Chocolate", "Letters"]
  },
  {
    id: "prod-5",
    title: "Noël Golden Harvest Set",
    category: "Festive Collections",
    description: "Holiday-themed spiced truffles, cinnamon dark logs, and gold-dusted chocolate pinecones in an elegant collector box.",
    priceEstimate: "₹3,150.00",
    image: "https://files.catbox.moe/ljvec9.jpg",
    tags: ["Festive", "Gold Dusted", "Holiday"]
  },
  {
    id: "prod-6",
    title: "Imperia Gourmet Chocolate Hamper",
    category: "Premium Chocolate Hampers",
    description: "The peak of grand gifting: containing 2 full truffle boxes, chocolate dragées, organic hazelnut spread, hot chocolate stirrer sticks, and fine cookies.",
    priceEstimate: "₹9,950.00",
    image: "https://files.catbox.moe/l7l2i2.jpg",
    tags: ["Hamper", "Luxury", "Ultimate Gift"]
  },
  {
  id: "prod-7",
  title: "Handcrafted Geometric Chocolate Slab",
  category: "Artisan Chocolates",
  description: "Beautifully handcrafted artisan chocolate slab featuring an elegant geometric design crafted with rich dark, milk, and white chocolates. Each piece is carefully molded with unique textures and patterns, making it a luxurious gift for weddings, celebrations, and premium hampers.",
  priceEstimate: "₹450.00 / unit",
  image: "https://files.catbox.moe/7zhbut.jpg",
  tags: ["Handcrafted", "Artisan Chocolate", "Luxury Gift", "Premium", "Gourmet"]
  }
];

export const KEY_EXPERTISE = [
  { id: "exp-1", skillName: "Chocolate Craftsmanship", percentage: 98, detail: "Expert chocolatiers creating premium temper-casted products using master techniques." },
  { id: "exp-2", skillName: "Custom Design Solutions", percentage: 95, detail: "Unique 3D designs, precise edible branding, and customized physical mockups tailored to client briefs." },
  { id: "exp-3", skillName: "Corporate Partnerships", percentage: 92, detail: "Pristine wholesale execution, corporate logistics, and scalable automated order processing." },
  { id: "exp-4", skillName: "Quality Assurance", percentage: 100, detail: "Strict inspection standards, premium grade cocoa selection, and state-of-the-art temperature monitoring." }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "tst-1",
    name: "Aishwarya Sen",
    role: "Head of Marketing",
    company: "Apex Global Solutions",
    comment: "The execution of our customized corporate boxes for Diwali left my clients completely mesmerized. The logo printing was sharp, and the chocolate quality was unmatched! Choco Rocks is our eternal gifting partner.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "tst-2",
    name: "Rohan & Rhea Mehta",
    role: "Happy Couple",
    comment: "For our wedding favor drawers, we wanted a unique rose-cardamom truffle. Not only did the Choco Rocks team formulate the recipe instantly, but the gold packaging ribbons matched our invitations perfectly. Simply magnificent!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "tst-3",
    name: "Emily Davenport",
    role: "Artisan Chocolate Collector",
    comment: "The dark cacao pralines are a culinary masterpiece. I can taste the distinct fruity, berry notes from Madagascar cacao. This is real handmade luxury right at home. Best shipping packaging I've ever seen.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
  }
];

export const STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Consultation",
    description: "Discuss gifting desires, tastes, budget criteria, branding themes, and estimated timeline goals.",
    detailedInfo: "We match you with our gifting specialist to understand if you require corporate branding inserts, specific cacao percentages, or wedding ribbon matching."
  },
  {
    step: 2,
    title: "Design Selection",
    description: "Formulate custom chocolate structures, custom boxes, lettering, and ribbon options.",
    detailedInfo: "We send you full physical or digital mockups detailing the layout, text, and flavor descriptions for your approval before casting."
  },
  {
    step: 3,
    title: "Chocolate Crafting",
    description: "Artisanal molding, filling, and slow tempering of chocolate batches under meticulous supervision.",
    detailedInfo: "Our chocolatiers execute the orders using 100% natural, premium ingredients. We take great pride in our slow, accurate artisan method."
  },
  {
    step: 4,
    title: "Packaging",
    description: "Elegantly hand-placed inside premium, temperature-insulated velvet/matte custom boxes.",
    detailedInfo: "Each box is padded, custom wrapped with your greeting notes, and packaged alongside gel ice packs if destined for warmer zones."
  },
  {
    step: 5,
    title: "Delivery",
    description: "Direct door-to-door shipping utilizing secure cold-chain delivery channels.",
    detailedInfo: "Real-time tracker coordinates keep you updated as your sweet bundles arrive at their respective destinations in perfect, crisp shape."
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do you offer custom chocolates?",
    answer: "Absolutely! We specialize in custom designs. We can print edible logos on chocolate, cast custom lettering bricks, build unique boxes, and even custom-formulate chocolate recipes (such as vegan options or regional spice infusions) for our events."
  },
  {
    id: "faq-2",
    question: "What is the minimum order quantity?",
    answer: "For our standard artisan boxes on the portfolio, there is no minimum order quantity—you can order exactly one! For custom molds, logo stamps, or bespoke wedding favor layouts, our corporate and wedding packages start at a minimum of 20 boxes."
  },
  {
    id: "faq-3",
    question: "Do you provide corporate branding?",
    answer: "Yes, corporate gifting is one of our primary services. We can customize the physical boxes with hot gold foil stamping of your company logo, print full-color graphics on high-end sleeves, formulate specific colors, and supply personalized company greeting cards inside."
  },
  {
    id: "faq-4",
    question: "How long does delivery take?",
    answer: "Standard orders ship within 2 to 3 business days. For customized orders, bulk corporate requests, or massive wedding orders, the crafting timeline takes 7 to 14 business days. We always coordinate with clients for targeted event dates."
  },
  {
    id: "faq-5",
    question: "Can you handle bulk orders?",
    answer: "Yes, our luxury laboratory can scale up to thousands of handmade chocolates per week while maintaining rigorous food-safety and tempering standards. Each individual batch is quality-assessed prior to carefully entering the delivery vehicles."
  }
];

export const FLAVORS = [
  { name: "Madagascar Dark Ganache", desc: "Intense, fruity 72% organic dark chocolate fillings", color: "bg-[#251512]" },
  { name: "Salted Caramel Praline", desc: "Slow-cooked butter caramel with Maldon salt flakes", color: "bg-[#8E5E3C]" },
  { name: "Gold Hazelnut Crunch", desc: "Gilded chocolate shell stuffed with roasted hazelnut praline", color: "bg-[#D4AF37]" },
  { name: "Raspberry Ruby Ganache", desc: "Zesty, tart raspberry core dipped in ruby chocolate", color: "bg-[#B03A5B]" },
  { name: "Creamy Pistachio Polish", desc: "Smooth Persian pistachio paste in a white chocolate envelope", color: "bg-[#8FBC8F]" },
  { name: "Vapor-infused Espresso Cacao", desc: "Dark chocolate infused with rich ground Arabica beans", color: "bg-[#3D251D]" }
];

export const PACKAGING_OPTIONS = [
  { id: "royal-velvet", name: "Royal Gold Velvet Box", desc: "High-end cushioned burgundy fabric box with gold script stamping" },
  { id: "midnight-cocoa", name: "Midnight Premium Matte Case", desc: "Minimalist black heavyboard drawer case with gold foil logos" },
  { id: "pastel-romance", name: "Classic Cream Silk Rope Box", desc: "Sophisticated textured off-white casing with beautiful silk ribbons" },
  { id: "festive-holiday", name: "Holiday Festive Star Wrap", desc: "Beautiful crimson gift wrap tied up in sparkling gold metallic bows" }
];
