/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Gift, Briefcase, Sparkles, Heart, Calendar, Cpu,
  Gem, Smile, Package, Truck, Coins, UserCheck,
  MapPin, Mail, Phone, Clock, ArrowRight, Search, 
  Star, ChevronLeft, ChevronRight, X, Send, 
  ArrowUp, Check, CheckCircle2, Filter, Compass, 
  HelpCircle, ExternalLink, MessageSquare, Moon, Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data imports
import { 
  SERVICES, WHY_CHOOSE_US, PRODUCTS, KEY_EXPERTISE,
  TESTIMONIALS, STEPS, FAQS, STATISTICS, CRAFTING_IMAGE
} from './data';
import { InquiryLead, ThemeMode, ProductItem } from './types';

// Component imports
import CustomBoxBuilder from './components/CustomBoxBuilder';
import LeadDashboard from './components/LeadDashboard';

// Custom Icon renderer helper to cleanly support data-driven icons
const renderLIcon = (name: string, className = "w-6 h-6 text-choco-gold") => {
  switch (name) {
    case 'Gift': return <Gift className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Gem': return <Gem className={className} />;
    case 'Smile': return <Smile className={className} />;
    case 'Package': return <Package className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'UserCheck': return <UserCheck className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export default function Bhagi() {
  // Website States
  const [loading, setLoading] = useState<boolean>(true);
  const [themeMode, setThemeMode] = useState<ThemeMode>('classic-cream');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  // Custom State Database for Inquiries
  const [leads, setLeads] = useState<InquiryLead[]>([]);
  
  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  
  // Testimonial State
  const [testimonialIndex, setTestimonialIndex] = useState<number>(0);

  // Stats Counters
  const [stats, setStats] = useState({
    customers: 0,
    clients: 0,
    varieties: 0,
    experience: 0
  });

  // Lightbox & Modal States
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [whatsappActive, setWhatsappActive] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // Form States
  const [fullName, setFullName] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [serviceOption, setServiceOption] = useState<string>('Customized Chocolate Gifts');
  const [customerMessage, setCustomerMessage] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  // Simulation parameters for Interactive Maps locator
  const [userZipcode, setUserZipcode] = useState<string>('');
  const [routeInfo, setRouteInfo] = useState<{
    computed: boolean;
    distance: string;
    duration: string;
    fee: string;
    deliveryMethod: string;
  } | null>(null);
  const [isComputingRoute, setIsComputingRoute] = useState<boolean>(false);

  // Load leads from localStorage and manage splash screen
  useEffect(() => {
    // 1. Splash screen load delay
    const splashTimer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    // 2. Load Customer Leads
    const savedLeads = localStorage.getItem('choco_rocks_leads');
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (err) {
        console.error('Failed to parse leads data', err);
      }
    }

    // 3. Register scroll listener for back to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(splashTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Stats incremental count effect
  useEffect(() => {
    if (!loading) {
      const duration = 2000; // 2 seconds animation
      const steps = 50;
      const stepDuration = duration / steps;
      let stepCounter = 0;

      const interval = setInterval(() => {
        stepCounter++;
        setStats({
          customers: Math.round((5000 / steps) * stepCounter),
          clients: Math.round((100 / steps) * stepCounter),
          varieties: Math.round((50 / steps) * stepCounter),
          experience: Math.round((10 / steps) * stepCounter)
        });

        if (stepCounter >= steps) {
          setStats({
            customers: 5000,
            clients: 100,
            varieties: 50,
            experience: 10
          });
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [loading]);

  // Lead Operations
  const handleAddInquiry = (leadData: Omit<InquiryLead, 'id' | 'createdAt'>, customBox?: any) => {
    const newInquiry: InquiryLead = {
      ...leadData,
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
      customBoxConfig: customBox
    };

    const updated = [newInquiry, ...leads];
    setLeads(updated);
    localStorage.setItem('choco_rocks_leads', JSON.stringify(updated));
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    localStorage.setItem('choco_rocks_leads', JSON.stringify(updated));
  };

  const handleClearAllLeads = () => {
    if (confirm("Are you sure you want to clear the administrator leads dashboard simulation?")) {
      setLeads([]);
      localStorage.removeItem('choco_rocks_leads');
    }
  };

  // Submit Contact Form Handler
  const validateAndSubmitInquiry = (e: FormEvent) => {
    e.preventDefault();
    const errors: {[key: string]: string} = {};

    if (fullName.trim().length < 2) {
      errors.fullName = "Full Name must be at least 2 characters long.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      errors.emailAddress = "Please enter a valid email address.";
    }

    if (phoneNumber.trim().length < 8) {
      errors.phoneNumber = "Please provide an active phone number.";
    }

    if (customerMessage.trim().length < 5) {
      errors.customerMessage = "Please write a brief inquiry message (at least 5 characters).";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    
    // Check if customerMessage describes a custom box setup
    let attachedBoxConfig = undefined;
    if (customerMessage.includes("Interactive Custom Chocolate Box")) {
      const matchSize = customerMessage.match(/(\d+)\s+Pieces/);
      const sizeParsed = matchSize ? parseInt(matchSize[1]) : 9;
      attachedBoxConfig = {
        slotsCount: sizeParsed,
        flavors: ["Artisan customized pieces"],
        packaging: "Assorted Custom Premium Wrapper",
        customMessage: "Edible Lettering applied"
      };
    }

    handleAddInquiry({
      fullName,
      email: emailAddress,
      phone: phoneNumber,
      serviceRequired: serviceOption,
      message: customerMessage
    }, attachedBoxConfig);

    setContactSuccess(true);
    setFullName('');
    setEmailAddress('');
    setPhoneNumber('');
    setCustomerMessage('');

    // Clear success after 5 seconds
    setTimeout(() => {
      setContactSuccess(false);
    }, 6000);
  };

  // Helper: Pre-fill message from interactive custom chocolate box atelier
  const handleApplyConfigToForm = (configSummaryText: string, calculatedPrice: string) => {
    setServiceOption('Customized Chocolate Gifts');
    setCustomerMessage(configSummaryText);
  };

  // Helper: Pre-fill from catalog item inquiry action
  const handleQuickInquiryForProduct = (item: ProductItem) => {
    setServiceOption(
      item.category === 'Corporate Gift Packs' ? 'Corporate Gifting' :
      item.category === 'Wedding Favors' ? 'Wedding & Event Chocolates' :
      item.category === 'Premium Chocolate Hampers' ? 'Bulk Orders' : 'Handmade Premium Chocolates'
    );
    setCustomerMessage(`Hello Choco Rocks team, I am interested in placing an inquiry for the standard collection item: "${item.title}". Please send pricing for 50+ units and delivery schedules.`);
    setSelectedProduct(null); // close zoom modal
    
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter Product Items
  const categoriesList = ['all', 'Luxury Chocolate Boxes', 'Corporate Gift Packs', 'Wedding Favors', 'Customized Chocolates', 'Festive Collections', 'Premium Chocolate Hampers'];
  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  // Dynamic Carousel controls (Signature Showcase)
  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev === 0 ? PRODUCTS.length - 1 : prev - 1));
  };
  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev === PRODUCTS.length - 1 ? 0 : prev + 1));
  };

  // Testimonial Controls
  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };
  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Interactive Maps Distance computation simulator
  const handleComputeRoute = (e: FormEvent) => {
    e.preventDefault();
    if (!userZipcode.trim()) return;

    setIsComputingRoute(true);
    setTimeout(() => {
      setIsComputingRoute(false);
      // Generate some dummy consistent directions matching location inputs
      const parsed = parseInt(userZipcode.replace(/\D/g, '')) || 400001;
      const distanceSim = (parsed % 22 + 2.5).toFixed(1);
      const minsSim = Math.round(parseFloat(distanceSim) * 2.2 + 8);
      const deliveryMethod = parseFloat(distanceSim) < 15 ? 'Bespoke Chilled Courier' : 'Refrigerated Cargo Logistics';
      const freeShipping = parseFloat(distanceSim) < 25 ? 'FREE Shipping Promo Applied' : '₹1,000.00 Courier Surcharge';

      setRouteInfo({
        computed: true,
        distance: `${distanceSim} km`,
        duration: `${minsSim} mins`,
        fee: freeShipping,
        deliveryMethod
      });
    }, 1200);
  };

  // Handle newsletter sign-up
  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  const currentThemeBg = themeMode === 'classic-cream' 
    ? 'bg-[#FFFDF6] bg-cream-grid text-[#2B1816]' 
    : 'bg-[#1C100E] bg-dark-grid text-[#FFFDF6]';

  const cardThemeBg = themeMode === 'classic-cream'
    ? 'bg-white border border-choco-beige/35 shadow-sm hover:shadow-lg'
    : 'bg-[#2D1B19] border border-choco-gold/15 shadow-inner hover:border-choco-gold/30';

  const secondaryText = themeMode === 'classic-cream' ? 'text-choco-medium' : 'text-choco-beige/80';
  const labelText = themeMode === 'classic-cream' ? 'text-[#6D4C41]' : 'text-choco-beige/70';

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${currentThemeBg}`}>
      
      {/* 1. LUXURY INITIAL LOADING SPLASH */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            id="splash-loader"
            className="fixed inset-0 z-50 bg-[#2B1816] flex flex-col items-center justify-center text-center p-6"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Spinning stylized chocolate truffles vector wrapper */}
              <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-t-2 border-b-2 border-choco-gold border-dashed"
                />
                <Sparkles className="w-10 h-10 text-choco-gold animate-bounce" />
              </div>

              <div>
                <h1 className="font-serif text-5xl tracking-widest text-[#FFFDF6] uppercase">Choco Rocks</h1>
                <p className="font-mono text-xs text-choco-gold tracking-[0.3em] uppercase mt-3">Crafting Sweet Experiences</p>
                <div className="h-[2px] w-24 bg-choco-gold mx-auto mt-6 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="h-full bg-white w-1/2"
                  />
                </div>
                <p className="text-[10px] text-choco-beige/40 mt-6 font-mono">ESTD 2016 • TEMPERING PRECISION</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
      {/* 2. PERSISTENT FLOATING WHATSAPP & BACK TO TOP CTAs */}
      {/* Floating WhatsApp indicator */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {whatsappActive && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="bg-white text-choco-dark p-3 rounded-2xl shadow-xl border border-choco-beige/30 text-xs max-w-xs flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 border-b pb-2">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                <span className="font-bold">Choco Rocks Atelier Concierge</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#6D4C41]">
                Bonjour! Tap below to start an interactive WhatsApp consultation with our head confectioner for customized packages.
              </p>
              <a
                href="https://wa.me/919999999999?text=Hello%20Choco%20Rocks%20I%20am%20interested%20in%20customized%20chocolates"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded-lg text-center font-sans tracking-wide transition flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Start Chat
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setWhatsappActive(!whatsappActive)}
          id="btn-whatsapp-floating"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 relative focus:outline-none ring-4 ring-green-100"
          title="Contact on WhatsApp"
        >
          <MessageSquare className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">
            1
          </span>
        </button>

        {/* Back To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              id="btn-back-to-top"
              className="p-3.5 bg-choco-dark hover:bg-choco-medium text-choco-gold rounded-full shadow-md border border-choco-gold/30 transition focus:outline-none"
              title="Return to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>


      {/* 3. PREMIUM SMART STICKY NAVIGATION BAR */}
      <header className={`sticky top-0 z-30 transition-all duration-300 border-b ${
        themeMode === 'classic-cream' 
          ? 'bg-white/80 backdrop-blur-md border-choco-beige/25 shadow-sm' 
          : 'bg-[#211311]/95 backdrop-blur-md border-choco-gold/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#3D251D] border-2 border-choco-gold rounded-xl flex items-center justify-center shadow-md transform group-hover:rotate-12 transition duration-300">
              <Sparkles className="w-5 h-5 text-choco-gold" />
            </div>
            <div>
              <span className="font-serif text-2xl lg:text-3xl font-black tracking-wider uppercase group-hover:text-choco-gold transition duration-300">
                Choco Rocks
              </span>
              <span className="block text-[8px] tracking-[0.22em] font-mono text-choco-gold uppercase font-bold">
                Master Confectioners
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold uppercase tracking-wider">
            <a href="#about-section" className="hover:text-choco-gold transition">About Us</a>
            <a href="#services-section" className="hover:text-choco-gold transition">Our Atelier</a>
            <a href="#custom-builder" className="hover:text-choco-gold transition bg-choco-gold/10 text-choco-gold px-3 py-1 rounded-full border border-choco-gold/20">Customizer</a>
            <a href="#portfolio-section" className="hover:text-choco-gold transition">Collections</a>
            <a href="#process-section" className="hover:text-choco-gold transition">Our Process</a>
            <a href="#faq-section" className="hover:text-choco-gold transition">FAQs</a>
            <a href="#contact-section" className="hover:text-choco-gold transition">Contact</a>
          </nav>

          {/* Right Controls: Light/Dark Switch & Admin Link */}
          <div className="flex items-center gap-3.5">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setThemeMode(themeMode === 'classic-cream' ? 'midnight-cocoa' : 'classic-cream')}
              id="theme-toggler"
              className={`p-2.5 rounded-xl border transition ${
                themeMode === 'classic-cream'
                  ? 'border-choco-beige text-choco-medium hover:bg-gray-100'
                  : 'border-choco-gold/20 text-choco-gold hover:bg-[#2C1816]'
              }`}
              title={themeMode === 'classic-cream' ? 'Switch to Luxurious Dark Mode' : 'Switch to Silky Cream Mode'}
            >
              {themeMode === 'classic-cream' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>

            {leads.length > 0 && (
              <a
                href="#leads-dashboard"
                className="hidden lg:flex items-center gap-1 bg-choco-gold text-[#2B1816] px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-sm hover:scale-105 transition"
              >
                Admin Panel ({leads.length})
              </a>
            )}

            <a
              href="#contact-section"
              className="bg-choco-dark hover:bg-choco-medium text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition hover:shadow-md"
            >
              Order Now
            </a>
          </div>
        </div>
      </header>


      {/* 4. MAIN BODY WRAPPER */}
      <main className="space-y-20 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        
        {/* ================= SECTION 1: HERO SECTION ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8">
          {/* Text panel: 5 columns */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-choco-gold/15 text-choco-gold border border-choco-gold/30 rounded-full px-4 py-1 text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Handcrafted Authenticity
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Crafting <span className="text-choco-gold">Sweet</span> Experiences
            </h1>
            
            <p className="font-serif text-xl sm:text-2xl text-choco-gold font-medium italic mt-2">
              "Handcrafted Premium Chocolates for Every Occasion"
            </p>
            
            <p className={`text-sm md:text-base leading-relaxed ${labelText}`}>
              Indulge in Choco Rocks—where Madagascar single-origin cacao meets extreme artisanal precision. We hand-temper every truffle, customize corporate corporate arrays, and construct memorable gifting boxes designed to captivated senses.
            </p>

            <div className="flex flex-wrap gap-4 pt-3">
              <a
                href="#custom-builder"
                className="bg-choco-dark hover:bg-[#3E2723] text-white hover:text-choco-gold font-bold px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition duration-300 shadow-md flex items-center gap-2 group"
              >
                Explore Atelier Builder <ArrowRight className="w-4 h-4 text-choco-gold group-hover:translate-x-1 transition" />
              </a>
              <a
                href="#portfolio-section"
                className={`border border-choco-beige font-bold px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition duration-300 ${
                  themeMode === 'classic-cream' ? 'bg-white hover:bg-choco-cream text-choco-dark' : 'hover:bg-white/10 text-white'
                }`}
              >
                View Collections
              </a>
            </div>

            {/* Quick trust stamps */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-choco-beige/30">
              <div>
                <span className="block text-xl font-bold text-choco-gold">100%</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Pure Butter Cocoa</span>
              </div>
              <div className="border-x border-choco-beige/30 px-4">
                <span className="block text-xl font-bold text-choco-gold">Zero</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Additive Palm Oil</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-choco-gold">Insulated</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Cold-Chain Prep</span>
              </div>
            </div>
          </div>

          {/* Visual Hero Panel: 7 columns */}
          <div className="lg:col-span-7 relative">
            {/* Ambient Background decoration disks */}
            <div className="absolute -top-10 -left-10 w-44 h-44 bg-choco-gold/5 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-choco-medium/10 blur-3xl rounded-full" />

            <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-[#3D251D] shadow-2xl skew-y-1 transform hover:skew-y-0 transition-transform duration-700">
              <img 
                src={PRODUCTS[0].image}
                alt="Choco Rocks signatures artisan chocolate arrangement"
                className="w-full h-[400px] sm:h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Overlay Glass caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 text-white">
                <p className="text-choco-gold font-mono text-xs uppercase tracking-widest font-bold">Featured Artisan Creation</p>
                <h3 className="font-serif text-2xl font-bold mt-1">Signatures Truffle Assortment</h3>
                <p className="text-sm opacity-85 mt-2 line-clamp-2">
                  Luxurious organic shell castings filled with sea-salt butter caramel, golden toasted hazelnut paste, and single-estate dark ganaches. Hand-polished to supreme brilliance.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ================= SECTION 2: ABOUT US & METRICS ================= */}
        <section id="about-section" className="scroll-mt-24 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Collage Section: 6 Columns */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-[#3D251D] rounded-[2rem] transform -rotate-3 scale-95 opacity-5" />
              <img 
                src={SERVICES[3].id ? SERVICES[3].id === 'srv-handmade' ? CRAFTING_IMAGE : "https://images.unsplash.com/photo-1548907040-4d42b52125e0" : CRAFTING_IMAGE}
                alt="Master chocolatier tempering liquid cocoa"
                className="w-full h-[350px] object-cover rounded-[2rem] border-2 border-choco-beige shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-choco-dark border border-choco-gold/30 text-white p-6 rounded-2xl shadow-xl hidden sm:flex items-center gap-4">
                <Heart className="w-10 h-10 text-choco-gold animate-pulse" />
                <div>
                  <p className="text-xl font-bold font-serif text-[#FFFDF6]">Handcrafted</p>
                  <p className="text-xs text-choco-beige/80">With Chef Passion since 2016</p>
                </div>
              </div>
            </div>

            {/* Content: 6 Columns */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono tracking-widest uppercase text-choco-gold font-bold block">
                Our Story & Legacy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold">
                Dedicated to the Sublime Art of Tempering
              </h2>
              <p className={`text-sm md:text-base leading-relaxed ${labelText}`}>
                Choco Rocks was birthed from a simple, burning vision: to elevate everyday confectionery into a luxury sensory ritual. We start by respecting the origin of the plant. Sourcing exclusively from ethical, fair-trade cacao estates, we craft individual products in temperature-restricted small batches.
              </p>
              <p className={`text-sm leading-relaxed ${labelText}`}>
                Under expert oversight, our master chocolatiers integrate global French confectionery molding techniques with contemporary custom printing services. The result is chocolate that doesn't just taste sublime—it leaves a lasting corporate, romantic, or celebratory signature.
              </p>

              {/* Mission Statement block */}
              <div className="bg-choco-gold/5 border-l-4 border-choco-gold p-4 rounded-r-2xl">
                <strong className="text-xs uppercase tracking-widest font-mono text-choco-gold font-black block mb-1">
                  Our Sacred Mission
                </strong>
                <p className="font-serif italic text-base">
                  "Deliver high-quality handcrafted chocolates that create memorable experiences for individuals, businesses, and special occasions."
                </p>
              </div>
            </div>
          </div>

          {/* STATISTICS ANIMATED CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {STATISTICS.map((item) => {
              // Read current simulated state for animated look
              const val = item.id === 'stat-1' ? stats.customers : 
                          item.id === 'stat-2' ? stats.clients :
                          item.id === 'stat-3' ? stats.varieties : stats.experience;
              return (
                <div 
                  key={item.id} 
                  className={`p-6 rounded-2xl text-center flex flex-col justify-center items-center ${cardThemeBg}`}
                >
                  <span className="text-3xl sm:text-4xl font-black font-serif text-choco-gold block tracking-tight">
                    {val.toLocaleString()}{item.suffix}
                  </span>
                  <span className="text-[11px] text-gray-400 uppercase font-mono tracking-widest mt-1.5 font-semibold block">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>


        {/* ================= SECTION 3: SERVICES ATELIER ================= */}
        <section id="services-section" className="scroll-mt-24 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-choco-gold uppercase font-bold block">
              Artisan Confectionery Services
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
              A Symphony of Cacao Services
            </h2>
            <div className="h-[2px] w-12 bg-choco-gold mx-auto" />
            <p className={`text-xs sm:text-sm ${labelText}`}>
              From bespoke micro-engravings matching your color palettes to bulk shipments handled in temperature-stable cold logistics, we make planning sweet affairs simplified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv) => (
              <div 
                key={srv.id}
                className={`p-6 md:p-8 rounded-2xl flex flex-col justify-between transition duration-300 transform hover:-translate-y-1 ${cardThemeBg}`}
              >
                <div>
                  <div className="w-12 h-12 bg-choco-gold/10 border border-choco-gold/30 rounded-xl flex items-center justify-center mb-6">
                    {renderLIcon(srv.iconName, "w-6 h-6 text-choco-gold")}
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">{srv.title}</h3>
                  <p className={`text-xs leading-relaxed ${labelText}`}>
                    {srv.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-choco-cream/80 flex items-center justify-between">
                  <a 
                    href="#contact-section" 
                    onClick={() => {
                      setServiceOption(srv.title);
                      setCustomerMessage(`Hello, I'm writing to request details and a customized brochure for your "${srv.title}" services, please.`);
                    }}
                    className="text-xs font-bold text-choco-gold hover:text-[#3D251D] flex items-center gap-1 group/btn"
                  >
                    Send Inquiries <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition" />
                  </a>
                  <span className="text-[9px] text-gray-400 font-mono">ESTD ATELIER</span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ================= SECTION 4: WHY CHOOSE CHOCO ROCKS ================= */}
        <section className="space-y-12 bg-choco-dark/5 p-8 rounded-3xl border border-choco-medium/5">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-choco-gold uppercase font-bold block">
              Our Unwavering Quality Pillar
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
              Why Discerning Brands Choose Choco Rocks
            </h2>
            <div className="h-[2px] w-12 bg-choco-gold mx-auto" />
            <p className="text-xs sm:text-sm text-[#6D4C41]">
              We merge the rigid operational excellence required by large enterprises with the passionate warmth of an artisanal laboratory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((why) => (
              <div 
                key={why.id}
                className="bg-white rounded-2xl p-6 border border-choco-beige/35 flex gap-4 transition duration-300 hover:shadow-md"
              >
                <div className="w-10 h-10 bg-[#3D251D] text-choco-gold rounded-lg flex items-center justify-center flex-shrink-0">
                  {renderLIcon(why.iconName, "w-5 h-5 text-choco-gold")}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-choco-dark uppercase tracking-wider">{why.title}</h4>
                  <p className="text-xs text-[#6D4C41] leading-relaxed">
                    {why.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ================= SECTION 5: INTERACTIVE SPECIAL CUSTOM BOX CUSTOMIZER atelier ================= */}
        <section className="scroll-mt-24 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-choco-gold uppercase font-bold block">
              Co-Creation Workspace
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
              Configure Your Personalized Assortment Box
            </h3>
            <p className={`text-xs sm:text-sm ${labelText}`}>
              Click below to custom sculpt an assortment. Choose box configurations, fill chocolates dynamically, and write personalized monogram lettering.
            </p>
          </div>

          <CustomBoxBuilder onApplyConfig={handleApplyConfigToForm} />
        </section>


        {/* ================= SECTION 6: THE PRODUCT SHOWCASE CAROUSEL ================= */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest text-choco-gold uppercase font-bold block">
                Artisan Creations Carousel
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold">
                Signature Confectionery Showcase
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrevCarousel}
                className="p-3 bg-choco-dark text-choco-gold rounded-xl hover:bg-choco-medium hover:text-white transition focus:outline-none"
                title="Previous Signature"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextCarousel}
                className="p-3 bg-choco-dark text-choco-gold rounded-xl hover:bg-choco-medium hover:text-white transition focus:outline-none"
                title="Next Signature"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Product Showcase slide container */}
          <div className="bg-chocolate-gradient rounded-[2rem] text-white overflow-hidden shadow-xl border border-choco-gold/10 relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Compass className="w-44 h-44 text-choco-gold" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Product Info: 5 Columns */}
              <div className="lg:col-span-5 p-8 md:p-12 space-y-6">
                <div>
                  <span className="bg-choco-gold text-[#2B1816] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {PRODUCTS[carouselIndex].category}
                  </span>
                </div>
                
                <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#FFFDF6]">
                  {PRODUCTS[carouselIndex].title}
                </h3>
                
                <p className="text-sm text-choco-cream/80 leading-relaxed">
                  {PRODUCTS[carouselIndex].description}
                </p>

                <div className="flex items-center gap-2">
                  {PRODUCTS[carouselIndex].tags.map(t => (
                    <span key={t} className="text-[10px] bg-white/10 text-choco-gold px-2 py-0.5 rounded border border-white/5 font-mono">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <div>
                    <span className="block text-xs uppercase text-choco-cream/40 font-mono tracking-wider">Estimated Price</span>
                    <span className="text-3xl font-serif font-black text-choco-gold inline-block mt-0.5">
                      {PRODUCTS[carouselIndex].priceEstimate}
                    </span>
                  </div>

                  <button
                    onClick={() => handleQuickInquiryForProduct(PRODUCTS[carouselIndex])}
                    className="bg-choco-gold hover:bg-white text-[#2B1816] font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition"
                  >
                    Quick Inquiry
                  </button>
                </div>
              </div>

              {/* Product Visual: 7 Columns */}
              <div className="lg:col-span-7 h-[300px] sm:h-[420px] relative">
                <img 
                  src={PRODUCTS[carouselIndex].image}
                  alt={PRODUCTS[carouselIndex].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>


        {/* ================= SECTION 7: MASONRY PORTFOLIO GALLERY ================= */}
        <section id="portfolio-section" className="scroll-mt-24 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-choco-beige/25 pb-6">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-widest text-choco-gold uppercase font-bold block">
                Product Catalog & Visual Portfolio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
                Inspect Our Handcrafted Collections
              </h2>
            </div>

            {/* Category Filter Pills scroll container */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition uppercase tracking-wider focus:outline-none ${
                    activeCategory === cat
                      ? 'bg-choco-dark text-[#FFFDF6] shadow-sm'
                      : 'border border-choco-beige text-gray-400 hover:bg-choco-cream'
                  }`}
                >
                  {cat === 'all' ? 'All Collections' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-like Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => {
              return (
                <div 
                  key={p.id}
                  className={`rounded-2xl overflow-hidden group border border-transparent shadow-sm hover:shadow-xl transition-all duration-300 transform flex flex-col justify-between ${cardThemeBg}`}
                >
                  <div>
                    {/* Image thumb */}
                    <div className="h-56 relative overflow-hidden bg-choco-medium/10">
                      <img 
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 bg-[#2B1816]/75 backdrop-blur-md text-choco-gold font-mono text-[10px] uppercase font-extrabold px-3 py-1 rounded-full border border-choco-gold/30">
                        {p.category}
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="p-6 space-y-3">
                      <h3 className="font-serif text-xl font-bold line-clamp-1 group-hover:text-choco-gold transition">
                        {p.title}
                      </h3>
                      <p className={`text-xs leading-relaxed line-clamp-2 ${labelText}`}>
                        {p.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {p.tags.map(t => (
                          <span key={t} className="text-[9px] bg-choco-cream text-choco-medium px-2 py-0.5 rounded border border-choco-beige/40 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-choco-cream/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-mono block">Custom Est:</span>
                      <span className="text-base font-serif font-black text-choco-dark">{p.priceEstimate}</span>
                    </div>

                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="px-3 py-2 bg-choco-dark text-white rounded-lg text-xs font-bold uppercase transition hover:bg-choco-medium focus:outline-none"
                    >
                      Inspect Item
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-12">
              No signature creations cataloged under this category filter.
            </p>
          )}
        </section>


        {/* ================= SECTION 8: LIGHTBOX MODAL PREVIEW ================= */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div 
              id="product-lightbox"
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-[#FFFDF6] text-[#2B1816] rounded-3xl overflow-hidden max-w-4xl w-full max-h-[85vh] overflow-y-auto border border-choco-beige relative flex flex-col lg:flex-row shadow-2xl"
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
              >
                {/* Close Button top right */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-[#2B1816]/75 hover:bg-red-700 text-white rounded-full transition focus:outline-none"
                  title="Close Zoom"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Zoom Visual: 6 Columns equivalent */}
                <div className="lg:w-1/2 h-[250px] lg:h-auto min-h-[300px] relative bg-choco-dark">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 bg-choco-gold text-[#2B1816] font-mono text-[10px] uppercase font-bold px-3 py-1 rounded">
                    {selectedProduct.category}
                  </div>
                </div>

                {/* Right Specifications: 6 Columns equivalent */}
                <div className="p-6 sm:p-8 lg:w-1/2 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                        {selectedProduct.title}
                      </h4>
                      <p className="font-mono text-xs text-choco-gold mt-1.5 uppercase tracking-widest font-black">
                        Artisan Product #ST-{selectedProduct.id.slice(-4).toUpperCase()}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#6D4C41] leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    <div className="space-y-2 border-y border-choco-beige/40 py-4">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-choco-medium block font-bold">
                        Production Checklist & Specifications
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#6D4C41]">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-green-600" /> Premium Tempered
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-green-600" /> Preservative-Free
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-green-600" /> Premium Cocoa Butter
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-green-600" /> Thermo-Safe Packed
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-mono block">Estimated Cost:</span>
                      <span className="text-3xl font-serif font-black text-choco-dark">{selectedProduct.priceEstimate}</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-choco-beige/35 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="border border-choco-beige text-choco-dark hover:bg-choco-cream/40 font-bold py-2.5 rounded-xl text-xs uppercase transition text-center"
                    >
                      Close View
                    </button>
                    <button
                      onClick={() => handleQuickInquiryForProduct(selectedProduct)}
                      id="lightbox-btn-inquire"
                      className="bg-choco-dark hover:bg-[#3E2723] text-white hover:text-choco-gold font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition text-center"
                    >
                      Send Inquiries
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* ================= SECTION 9: EXPERTISE METRICS ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Content: 5 Columns */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono tracking-widest text-choco-gold uppercase font-bold block">
              The Choco Rocks Edge
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
              Rigorous Handcrafted Confectionery Competence
            </h2>
            <div className="h-[2px] w-12 bg-choco-gold" />
            <p className={`text-sm md:text-base leading-relaxed ${labelText}`}>
              Our leadership team is composed of certified pastry masters and corporate accounts managers. We combine luxury, sensory-pleasing flavor profiles with highly competent scheduling and food security processes.
            </p>
            <p className={`text-xs sm:text-sm leading-relaxed ${labelText}`}>
              We work directly with major enterprise organizations, local luxury planning ateliers, and brides/grooms to structure gorgeous customized arrays that leave people starry-eyed.
            </p>
          </div>

          {/* Indicators: 7 Columns */}
          <div className="lg:col-span-7 space-y-6 bg-[#3C2422]/5 p-8 rounded-3xl border border-choco-beige/25">
            {KEY_EXPERTISE.map((e) => (
              <div key={e.id} className="space-y-1.5" id={`expertise-metric-${e.id}`}>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-extrabold text-choco-dark uppercase tracking-wider">{e.skillName}</span>
                  <span className="text-sm font-mono font-bold text-choco-gold">{e.percentage}%</span>
                </div>
                
                {/* Custom animated progress gauge bar */}
                <div className="h-2 bg-choco-beige/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-choco-medium rounded-full" 
                    style={{ width: `${e.percentage}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#6D4C41] leading-relaxed">
                  {e.detail}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* ================= SECTION 10: CUSTOMER TESTIMONIALS SLIDER ================= */}
        <section className="space-y-12 bg-choco-cream/40 px-6 sm:px-12 py-12 rounded-[2.5rem] border border-choco-beige/30">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-choco-gold uppercase font-bold block">
              Customer Love & Reviews
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold">
              Whose Days We Made Sweeter
            </h2>
          </div>

          {/* Sizable review block */}
          <div className="max-w-3xl mx-auto relative px-4">
            <div className="absolute -top-10 left-0 text-9xl text-choco-beige/20 font-serif leading-none pointer-events-none">
              “
            </div>
            
            <div className="space-y-6 text-center">
              {/* Rating stars */}
              <div className="flex justify-center gap-1 text-choco-gold">
                {Array(TESTIMONIALS[testimonialIndex].rating).fill(0).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="font-serif text-lg sm:text-xl lg:text-2xl text-choco-dark italic leading-relaxed">
                "{TESTIMONIALS[testimonialIndex].comment}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-center gap-3 pt-4">
                <img 
                  src={TESTIMONIALS[testimonialIndex].image}
                  alt={TESTIMONIALS[testimonialIndex].name}
                  className="w-12 h-12 rounded-full object-cover border border-choco-gold shadow"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <h4 className="text-sm font-extrabold text-choco-dark">{TESTIMONIALS[testimonialIndex].name}</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-mono tracking-wider">
                    {TESTIMONIALS[testimonialIndex].role} 
                    {TESTIMONIALS[testimonialIndex].company ? ` at ${TESTIMONIALS[testimonialIndex].company}` : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonials Controls */}
            <div className="flex justify-center gap-3 pt-8">
              <button
                onClick={handlePrevTestimonial}
                className="p-2 border border-choco-beige text-choco-medium rounded-full hover:bg-white transition focus:outline-none"
                title="Previous Testimony"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="p-2 border border-choco-beige text-choco-medium rounded-full hover:bg-white transition focus:outline-none"
                title="Next Testimony"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>


        {/* ================= SECTION 11: STEPS / PROCESS TIMELINE ================= */}
        <section id="process-section" className="scroll-mt-24 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-choco-gold uppercase font-bold block">
              The Creative Pipeline
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold">
              How We Sculpt Sweet Journeys
            </h2>
            <p className={`text-xs sm:text-sm ${labelText}`}>
              Artisan creations deserve a meticulous, error-free operational trajectory to ensure complete user satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {STEPS.map((s, idx) => (
              <div 
                key={s.step} 
                className={`p-6 rounded-2xl relative text-left group transition duration-300 ${cardThemeBg}`}
                id={`process-step-${s.step}`}
              >
                <div className="absolute top-4 right-4 text-4xl font-serif font-black text-choco-gold/20 select-none">
                  {s.step}
                </div>
                
                <span className="inline-block bg-[#3D251D] text-choco-gold text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md mb-4">
                  Phase 0{s.step}
                </span>

                <h3 className="font-serif text-lg font-extrabold text-choco-dark mb-2">
                  {s.title}
                </h3>
                
                <p className={`text-[11px] leading-relaxed mb-4 ${labelText}`}>
                  {s.description}
                </p>

                <p className="text-[10px] text-gray-400 border-t border-choco-beige/25 pt-3 leading-snug">
                  {s.detailedInfo}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* ================= SECTION 12: FAQ ACCORDION SECTION ================= */}
        <section id="faq-section" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FAQ Intro: 4 Columns */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-mono tracking-widest text-choco-gold uppercase font-bold block">
              Curious Minds Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold leading-tight">
              Frequently Clarified Curations
            </h2>
            <div className="h-[2px] w-12 bg-choco-gold" />
            <p className={`text-xs sm:text-sm ${labelText}`}>
              Have lingering questions about our single-origin cacao, custom physical stamps, scheduling options, or temperature stability? Find immediate clarifications on the right.
            </p>
            <div className="bg-choco-gold/5 border border-choco-gold/10 p-4 rounded-2xl text-xs flex gap-2">
              <HelpCircle className="w-5 h-5 text-choco-gold flex-shrink-0" />
              <p className="text-[#6D4C41]">
                Can't find your answer? Complete our inquiry form or contact our atelier directly—our master chocolatier team responds in a flash.
              </p>
            </div>
          </div>

          {/* Accordion List: 8 Columns */}
          <div className="lg:col-span-8 space-y-3">
            {FAQS.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="bg-white rounded-2xl border border-choco-beige/45 overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 sm:p-6 font-bold font-serif text-sm sm:text-base text-choco-dark hover:text-choco-medium transition flex items-center justify-between focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <span className={`text-choco-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#6D4C41] border-t border-choco-cream leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>


        {/* ================= SECTION 13: CONTACT INQUIRY FORM & ADMINISTRATIVE VIEW ================= */}
        <section id="contact-section" className="scroll-mt-24 space-y-12">
          
          {/* Main contact area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Contact Specs Card: 5 Columns */}
            <div className="lg:col-span-5 bg-chocolate-gradient text-white p-8 sm:p-10 rounded-3xl border border-choco-gold/15 space-y-6 relative overflow-hidden shadow-xl">
              <div className="absolute bottom-0 right-0 p-8 opacity-5 pointer-events-none">
                <Mail className="w-44 h-44 text-choco-gold" />
              </div>

              <div>
                <span className="text-xs font-mono tracking-widest text-choco-gold uppercase font-bold block mb-1">
                  Connect & Consultant
                </span>
                <h3 className="font-serif text-3xl font-extrabold text-[#FFFDF6]">
                  Let's Formulate Sweetness
                </h3>
                <p className="text-xs text-choco-cream/70 mt-1 max-w-sm">
                  We invite corporate event designers, wedding curators, and chocolate enthusiasts to inquire.
                </p>
              </div>

              {/* Direct meta items */}
              <div className="space-y-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-choco-cream/90">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-choco-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider text-[10px] font-mono">Location Atelier</h5>
                    <p className="mt-1 leading-snug">Choco Rocks Studio, 15, Galleria Premium Boulangerie Road, Bandra West, Mumbai, Maharashtra, India - 400050</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-choco-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider text-[10px] font-mono">Phone Helpline</h5>
                    <p className="mt-1 font-mono tracking-wide">+91 91234 56789</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-choco-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider text-[10px] font-mono">Direct Email</h5>
                    <p className="mt-1 font-mono">info@chocorocks.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-choco-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider text-[10px] font-mono">Operating Hours</h5>
                    <p className="mt-1">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                    <p className="text-[10px] text-choco-cream/45 italic mt-0.5">Closed on Sunday & National Holidays</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form Wrapper: 7 Columns */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-choco-beige/40 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-choco-dark mb-1">
                Establish Your Luxury Order Request
              </h3>
              <p className="text-xs text-[#6D4C41] mb-6">
                Fill the validation form below and click submit. The details sync instantly with our on-page sandbox system.
              </p>

              <form onSubmit={validateAndSubmitInquiry} className="space-y-4" id="inquiry-form">
                
                {/* 1. Full name input */}
                <div>
                  <label className="text-xs font-bold text-choco-dark uppercase block mb-1.5">* Full Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="e.g. Priyesh Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full text-xs p-3.5 rounded-xl border bg-choco-cream/30 focus:outline-none focus:ring-1 ${
                      formErrors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-choco-beige focus:ring-choco-gold'
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="text-[10px] text-red-500 mt-1 font-mono">{formErrors.fullName}</p>
                  )}
                </div>

                {/* 2. Grid for Email / Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-choco-dark uppercase block mb-1.5">* Email Address</label>
                    <input
                      type="email"
                      id="contact-email"
                      placeholder="e.g. priyesh@corp.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className={`w-full text-xs p-3.5 rounded-xl border bg-choco-cream/30 focus:outline-none focus:ring-1 ${
                        formErrors.emailAddress ? 'border-red-500 focus:ring-red-500' : 'border-choco-beige focus:ring-choco-gold'
                      }`}
                    />
                    {formErrors.emailAddress && (
                      <p className="text-[10px] text-red-500 mt-1 font-mono">{formErrors.emailAddress}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-choco-dark uppercase block mb-1.5">* Phone Number</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      placeholder="e.g. +91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`w-full text-xs p-3.5 rounded-xl border bg-choco-cream/30 focus:outline-none focus:ring-1 ${
                        formErrors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-choco-beige focus:ring-choco-gold'
                      }`}
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-[10px] text-red-500 mt-1 font-mono">{formErrors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                {/* 3. Service required dropdown */}
                <div>
                  <label className="text-xs font-bold text-choco-dark uppercase block mb-1.5">Desired Service Required</label>
                  <select
                    id="contact-service"
                    value={serviceOption}
                    onChange={(e) => setServiceOption(e.target.value)}
                    className="w-full text-xs p-3.5 rounded-xl border border-choco-beige bg-white focus:outline-none focus:ring-1 focus:ring-choco-gold"
                  >
                    <option value="Customized Chocolate Gifts">Customized Chocolate Gifts</option>
                    <option value="Corporate Gifting">Corporate Gifting</option>
                    <option value="Wedding & Event Chocolates">Wedding & Event Chocolates</option>
                    <option value="Handmade Premium Chocolates">Handmade Premium Chocolates</option>
                    <option value="Seasonal Collections">Seasonal Collections</option>
                    <option value="Bulk Orders">Bulk Orders</option>
                  </select>
                </div>

                {/* 4. Message block */}
                <div>
                  <label className="text-xs font-bold text-choco-dark uppercase block mb-1.5">* Message & Specifications</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Tell us about timelines, branding inserts, favorite tastes..."
                    value={customerMessage}
                    onChange={(e) => setCustomerMessage(e.target.value)}
                    className={`w-full text-xs p-3.5 rounded-xl border bg-choco-cream/30 focus:outline-none focus:ring-1 ${
                      formErrors.customerMessage ? 'border-red-500 focus:ring-red-500' : 'border-choco-beige focus:ring-choco-gold'
                    }`}
                  />
                  {formErrors.customerMessage && (
                    <p className="text-[10px] text-red-500 mt-1 font-mono">{formErrors.customerMessage}</p>
                  )}
                </div>

                <button
                  type="submit"
                  id="btn-submit-inquiry"
                  className="w-full bg-choco-dark hover:bg-choco-medium text-white hover:text-choco-gold font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition duration-300 shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Inquiry Form
                </button>

                {contactSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 text-green-800 border border-green-200 p-4 rounded-xl text-xs flex items-start gap-2 mt-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold block">Inquiry Submitted Successfully!</span>
                      <p className="mt-0.5 leading-relaxed">
                        We have logged your custom lead in our local system. An artisan coordinator will reach out to you within 24 working hours. Feel free to inspect your submitted lead in the <strong>inquiries dashboard simulation panel</strong> below!
                      </p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </div>

          {/* REAL TIME LOGGED INQUIRIES VIEW (SANDBOX ADMINISTRATIVE PANEL) */}
          <LeadDashboard 
            leads={leads} 
            onDeleteLead={handleDeleteLead} 
            onClearAll={handleClearAllLeads} 
          />
        </section>


        {/* ================= SECTION 14: INTERACTIVE GOOGLE MAPS INTEGRATION & DISTANCE ROUTING SIMULATOR ================= */}
        <section className="scroll-mt-24 space-y-8" id="maps-section">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-choco-gold uppercase font-bold block">
              Directions & Interactive Locator
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold">
              Our Premium Location Atelier & Delivery Router
            </h2>
            <p className={`text-xs sm:text-sm ${labelText}`}>
              Want your chocolates shipped cold-chain? Calculate your estimated distance from our Bandra, Mumbai headquarters below to evaluate cargo parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Interactive Vector Map: 8 Columns */}
            <div className="lg:col-span-8 bg-chocolate-gradient rounded-3xl p-6 sm:p-8 min-h-[350px] relative overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                {/* Embedded dynamic luxury gold coordinates coordinate diagram */}
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="text-choco-gold fill-current">
                  <circle cx="20%" cy="30%" r="5" className="animate-pulse" />
                  <circle cx="50%" cy="60%" r="8" className="animate-ping" />
                  <circle cx="50%" cy="60%" r="4" />
                  <circle cx="80%" cy="40%" r="5" />
                  <line x1="20%" y1="30%" x2="50%" y2="60%" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
                  <line x1="50%" y1="60%" x2="80%" y2="40%" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
                  <text x="52%" y="58%" fill="white" fontSize="10" className="font-mono">CHOCO ROCKS HQ</text>
                  <text x="21%" y="28%" fill="white" fontSize="8" className="font-mono">Bandra Station West</text>
                  <text x="81%" y="38%" fill="white" fontSize="8" className="font-mono">B Boulangerie Outlet</text>
                </svg>
              </div>

              {/* Float Card Address Info */}
              <div className="bg-[#2B1816]/90 backdrop-blur-md text-white p-5 rounded-2xl border border-choco-gold/30 max-w-sm sm:max-w-md shadow-md z-10 self-start">
                <span className="text-[10px] bg-choco-gold text-[#2B1816] px-2 py-0.5 rounded font-mono uppercase font-bold block w-fit mb-2">
                  Live Flagship Studio
                </span>
                <h4 className="font-serif text-lg font-bold">Choco Rocks Flagship Atelier</h4>
                <p className="text-xs text-choco-cream/80 mt-1.5 leading-snug">
                  15, Galleria Premium Boulangerie Road, Bandra West, Mumbai, Maharashtra, India - 400050
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-choco-gold font-mono uppercase">
                  <MapPin className="w-3.5 h-3.5 animate-bounce" /> Coordinates: 19.0596° N, 72.8295° E
                </div>
              </div>

              {/* Status footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 z-10 mt-6 bg-[#2B1816]/70 p-3.5 rounded-xl border border-white/5">
                <span className="text-white text-xs font-serif italic">
                  "Ready to receive guests for consultations and custom packaging previews with Chef."
                </span>
                <span className="text-[9px] bg-green-900 border border-green-500 text-green-300 font-mono tracking-widest uppercase rounded px-2 py-0.5">
                  ● ATELIER OPEN
                </span>
              </div>
            </div>

            {/* Simulated Router: 4 Columns */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-choco-beige/40 shadow-sm flex flex-col justify-between">
              <div>
                <div className="bg-choco-cream p-4 rounded-2xl border border-choco-beige/25 mb-4">
                  <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-choco-medium flex items-center gap-1.5 mb-2">
                    <Compass className="w-4 h-4 text-choco-gold" /> Estimated Delivery Router
                  </h4>
                  <p className="text-[10px] text-[#6D4C41] leading-relaxed">
                    Instantly simulate calculated courier travel times, specialized cold packaging requirements, and dispatch surcharges for our Mumbai metropolitan zones.
                  </p>
                </div>

                <form onSubmit={handleComputeRoute} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-choco-dark uppercase block mb-1">
                      Enter Shipping City Pincode or Zone (e.g. 400050)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 400050"
                        value={userZipcode}
                        onChange={(e) => {
                          setUserZipcode(e.target.value);
                          if (routeInfo) setRouteInfo(null);
                        }}
                        className="w-full text-xs p-3 rounded-lg border border-choco-beige focus:outline-none focus:ring-1 focus:ring-choco-gold bg-choco-cream/30"
                      />
                      <button
                        type="submit"
                        disabled={isComputingRoute || !userZipcode.trim()}
                        className="bg-choco-dark text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition hover:bg-choco-medium disabled:opacity-50"
                      >
                        {isComputingRoute ? '...' : 'Route'}
                      </button>
                    </div>
                  </div>
                </form>

                <AnimatePresence>
                  {routeInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-dashed border-choco-beige space-y-2 text-xs"
                    >
                      <div className="flex justify-between">
                        <span className="text-gray-400">Estimate Distance:</span>
                        <strong className="text-choco-dark font-mono">{routeInfo.distance}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Travel Duration:</span>
                        <strong className="text-choco-dark font-mono">{routeInfo.duration}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Logistics Transport:</span>
                        <strong className="text-choco-gold font-mono">{routeInfo.deliveryMethod}</strong>
                      </div>
                      <div className="flex justify-between border-t border-dashed border-choco-beige pt-2 mt-2">
                        <span className="text-choco-medium font-bold">Estimated Cost:</span>
                        <span className="text-green-700 font-bold font-mono">{routeInfo.fee}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-[10px] text-gray-400 leading-normal mt-6">
                Choco Rocks coordinates closely with national third party cargo partners for locations outside Maharashtra, assuring ice stability for up to 48 hours.
              </div>
            </div>
          </div>
        </section>

      </main>


      {/* ================= SECTION 15: PREMIUM CORPORATE FOOTER ================= */}
      <footer className="bg-[#1F100E] text-choco-cream mt-24 border-t-4 border-choco-gold/80 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Logo Brand Segment: 4 Columns */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-choco-gold text-[#2B1816] rounded-lg flex items-center justify-center font-bold">
                C
              </div>
              <div>
                <span className="font-serif text-2xl font-black uppercase tracking-wider text-white">Choco Rocks</span>
                <span className="block text-[8px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold font-mono">Master Confectioners</span>
              </div>
            </div>
            
            <p className="text-xs text-choco-cream/70 leading-relaxed max-w-sm">
              We source and slow-temper premium Madagascar single-origin cacao shells designed to craft sweet experiences, one chocolate at a time.
            </p>

            <p className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-[0.1em] pt-2">
              ESTABLISHED 2016 • ATELIER COOPERATION
            </p>
          </div>

          {/* Quick links: 2 Columns */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-black">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-choco-cream/80 font-medium">
              <a href="#" className="hover:text-[#D4AF37] transition">Home Atelier</a>
              <a href="#about-section" className="hover:text-[#D4AF37] transition">Our Story</a>
              <a href="#services-section" className="hover:text-[#D4AF37] transition">Services List</a>
              <a href="#custom-builder" className="hover:text-[#D4AF37] transition">Box Customizer</a>
              <a href="#portfolio-section" className="hover:text-[#D4AF37] transition">Product Gallery</a>
              <a href="#contact-section" className="hover:text-[#D4AF37] transition">Get in Touch</a>
            </div>
          </div>

          {/* Services Links: 2 Columns */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-black">
              Confections
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-choco-cream/80 font-medium">
              <a href="#services-section" className="hover:text-[#D4AF37] transition">Customised Gifts</a>
              <a href="#services-section" className="hover:text-[#D4AF37] transition">Corporate Packs</a>
              <a href="#services-section" className="hover:text-[#D4AF37] transition">Wedding Favors</a>
              <a href="#services-section" className="hover:text-[#D4AF37] transition">Artisan Truffles</a>
              <a href="#services-section" className="hover:text-[#D4AF37] transition">Holiday Seasonal</a>
              <a href="#services-section" className="hover:text-[#D4AF37] transition">Bulk Production</a>
            </div>
          </div>

          {/* Newsletter subscription: 4 Columns */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-black">
              Atelier Newsletter
            </h4>
            <p className="text-xs text-choco-cream/70 leading-relaxed">
              Subscribe to unlock early access holiday releases, corporate brochure versions, and secret pricing.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-white/10 text-white placeholder-choco-cream/40 border border-white/15 focus:outline-none focus:ring-1 focus:ring-choco-gold focus:bg-white/15"
                />
                <button
                  type="submit"
                  className="bg-choco-gold text-[#2B1816] px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition hover:bg-[#F3CD57] focus:outline-none"
                >
                  Join
                </button>
              </div>

              {newsletterSuccess && (
                <p className="text-[10px] text-green-400 font-bold font-mono">
                  ✓ Success! You have been subscribed to Choco Rocks Atelier updates.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-choco-cream/55">
          <p>© 2026 Choco Rocks. All Rights Reserved. Crafted with passion by Master Chocolatiers.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition">Sitemap</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

