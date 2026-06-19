import { useState, useEffect } from 'react';
import { FLAVORS, PACKAGING_OPTIONS } from '../data';
import { Sparkles, Info, Trash2, Heart, CheckCircle2, ChevronRight, Package, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomBoxBuilderProps {
  onApplyConfig: (configText: string, calculatedPrice: string) => void;
}

export default function CustomBoxBuilder({ onApplyConfig }: CustomBoxBuilderProps) {
  const [boxSize, setBoxSize] = useState<4 | 9 | 16>(9);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [packagingId, setPackagingId] = useState<string>('royal-velvet');
  const [engravedNote, setEngravedNote] = useState<string>('');
  const [appliedNotification, setAppliedNotification] = useState<boolean>(false);

  // Initialize selected slots based on box size
  useEffect(() => {
    setSelectedSlots(Array(boxSize).fill('Madagascar Dark Ganache'));
    if (activeSlot >= boxSize) {
      setActiveSlot(0);
    }
  }, [boxSize]);

  const selectFlavorForActiveSlot = (flavorName: string) => {
    const updated = [...selectedSlots];
    updated[activeSlot] = flavorName;
    setSelectedSlots(updated);
    // Auto advance to next slot to make user experience delightful
    if (activeSlot < boxSize - 1) {
      setActiveSlot(activeSlot + 1);
    }
  };

  const clearAllSlots = () => {
    setSelectedSlots(Array(boxSize).fill('Empty Slot'));
  };

  const fillAllWith = (flavorName: string) => {
    setSelectedSlots(Array(boxSize).fill(flavorName));
  };

  // Pricing calculations
  const sizePrices = { 4: 1250.00, 9: 2650.00, 16: 4550.00 };
  const basePrice = sizePrices[boxSize];
  const packagingPremium = packagingId === 'royal-velvet' || packagingId === 'festive-holiday' ? 400.00 : 0.00;
  const engravingFee = engravedNote.trim().length > 0 ? 650.00 : 0.00;
  const totalCost = basePrice + packagingPremium + engravingFee;

  const currentPackaging = PACKAGING_OPTIONS.find(p => p.id === packagingId);

  const handleApplyToInquiry = () => {
    const flavorsSummary = selectedSlots.reduce((acc: {[key: string]: number}, f) => {
      acc[f] = (acc[f] || 0) + 1;
      return acc;
    }, {});

    const flavorsText = Object.entries(flavorsSummary)
      .map(([f, count]) => `${count}x ${f}`)
      .join(', ');

    const summary = `Interactive Custom Chocolate Box (${boxSize} Pieces):
- Flavors: ${flavorsText}
- Packaging: ${currentPackaging?.name || packagingId}
- Chocolate Custom Monogram Text: "${engravedNote || 'None'}"
- Live Estimate: ₹${totalCost.toFixed(2)}`;

    onApplyConfig(summary, `₹${totalCost.toFixed(2)}`);
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 4000);

    // Scroll to contact form smoothly
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-choco-beige/35" id="custom-builder">
      {/* Container header */}
      <div className="bg-chocolate-gradient px-8 py-8 text-white relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-24 h-24 text-choco-gold" />
        </div>
        <div className="inline-flex items-center gap-2 bg-choco-gold/20 text-choco-gold-light border border-choco-gold/30 rounded-full px-3 py-1 text-xs uppercase font-mono tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Design Lab
        </div>
        <h3 className="font-serif text-3xl md:text-4xl text-[#FFFDF6]">Custom Box Atelier</h3>
        <p className="text-choco-cream/80 text-sm mt-2 max-w-xl">
          Immerse yourself in our chocolatier simulator. Handpick sizes, customize single-origin truffles in every single compartment, choose elegant silk ribbons, and see your customized estimate live.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">
        {/* Left Interactive Sandbox: 5 Columns */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-mono tracking-wider text-choco-medium uppercase block mb-3">
              Step 1: Choose Box Layout
            </span>
            <div className="grid grid-cols-3 gap-3">
              {([4, 9, 16] as const).map((size) => (
                <button
                  key={size}
                  id={`btn-boxsize-${size}`}
                  onClick={() => setBoxSize(size)}
                  className={`py-3 px-4 rounded-xl font-medium border text-sm transition-all focus:outline-none flex flex-col items-center justify-center gap-1 ${
                    boxSize === size
                      ? 'bg-choco-medium text-white border-choco-medium shadow-md'
                      : 'border-choco-beige text-choco-dark hover:bg-choco-cream'
                  }`}
                >
                  <span className="text-lg font-serif">{size}</span>
                  <span className="text-[10px] font-mono tracking-wider uppercase opacity-80">Slots</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Virtual Box Grid */}
          <div className="my-auto py-6">
            <span className="text-xs font-mono tracking-wider text-choco-medium uppercase block mb-4">
              Step 2: Customize Compartments (Tap a slot below, then select flavor)
            </span>

            <div className="bg-[#FFFDF6] p-6 rounded-2xl border-4 border-[#3D251D] shadow-inner relative max-w-[320px] mx-auto">
              {/* Virtual Box Ribbon Overlay */}
              <div className="absolute inset-y-0 left-1/2 w-4 transform -translate-x-1/2 bg-choco-gold/25 pointer-events-none" />
              <div className="absolute inset-x-0 top-1/2 h-4 transform -translate-y-1/2 bg-choco-gold/25 pointer-events-none" />

              <div
                className={`grid gap-3 mx-auto ${
                  boxSize === 4 ? 'grid-cols-2' : boxSize === 9 ? 'grid-cols-3' : 'grid-cols-4'
                }`}
              >
                {selectedSlots.map((flavorName, idx) => {
                  const matchingFlavor = FLAVORS.find((f) => f.name === flavorName);
                  const isActive = idx === activeSlot;
                  
                  return (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      key={idx}
                      id={`box-slot-${idx}`}
                      onClick={() => setActiveSlot(idx)}
                      className={`aspect-square rounded-xl shadow-md transition-all duration-300 relative flex items-center justify-center border-2 ${
                        isActive
                          ? 'border-choco-gold scale-105 shadow-choco-gold/40'
                          : flavorName === 'Empty Slot'
                          ? 'border-dashed border-choco-beige/80 bg-white'
                          : 'border-transparent hover:border-choco-medium'
                      } cursor-pointer overflow-hidden p-1`}
                      title={`Slot ${idx + 1}: ${flavorName}`}
                    >
                      {/* Truffle representation */}
                      {flavorName !== 'Empty Slot' ? (
                        <div
                          className={`w-full h-full rounded-lg flex items-center justify-center transition-all ${
                            matchingFlavor?.color || 'bg-choco-medium'
                          }`}
                        >
                          {/* Top shining chocolate decoration line */}
                          <div className="absolute top-1 left-1 w-2/3 h-1 bg-white/20 rounded-full blur-[0.5px] transform rotate-12" />
                          <div className="absolute inset-2 border border-white/5 rounded-md pointer-events-none" />
                          
                          {/* Custom visual decoration for special flavors */}
                          {flavorName.includes('Gold') && (
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-choco-gold/50 animate-pulse" />
                          )}
                          {flavorName.includes('Raspberry') && (
                            <div className="w-2 h-2 rounded-full bg-red-400 absolute" />
                          )}
                          {flavorName.includes('Pistachio') && (
                            <div className="w-1.5 h-3 rounded-full bg-green-300/40 transform rotate-45 absolute" />
                          )}
                          {flavorName.includes('Espresso') && (
                            <div className="w-3 h-1 rounded-full bg-[#1b0d0a] transform rotate-12 absolute" />
                          )}

                          <span className="text-[9px] font-mono font-bold text-white/90 drop-shadow-sm bg-black/30 rounded px-1 absolute bottom-1">
                            #{idx + 1}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-choco-warm/50 font-sans font-bold">Ø</span>
                      )}

                      {/* Active slot highlight badge */}
                      {isActive && (
                        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-choco-gold ring-2 ring-white" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4 text-xs">
              <button
                onClick={clearAllSlots}
                className="text-choco-medium hover:text-red-600 transition flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50 focus:outline-none"
              >
                <Trash2 className="w-3.5 h-3.5" /> Reset Box
              </button>
              <span className="text-choco-beige">|</span>
              <span className="text-choco-warm font-medium">
                Designing Slot <strong className="text-choco-gold font-mono">#{activeSlot + 1}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Middle Design Palette: 4 Columns */}
        <div className="lg:col-span-4 border-y lg:border-y-0 lg:border-x border-choco-beige/40 px-0 lg:px-6 py-6 lg:py-0 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-mono tracking-wider text-choco-medium uppercase block mb-3">
              Step 3: Assign Premium Flavors
            </span>
            <div className="space-y-2.5 max-h-[310px] overflow-y-auto pr-1">
              {FLAVORS.map((flavor) => {
                const countInBox = selectedSlots.filter(s => s === flavor.name).length;
                return (
                  <button
                    key={flavor.name}
                    id={`flavor-${flavor.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => selectFlavorForActiveSlot(flavor.name)}
                    className="w-full text-left p-2.5 rounded-xl border border-choco-beige/50 hover:border-choco-medium transition-all hover:bg-[#FFFDF6] flex items-center justify-between group focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-md shadow-inner flex items-center justify-center flex-shrink-0 ${flavor.color}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-choco-dark group-hover:text-choco-medium transition">
                          {flavor.name}
                        </p>
                        <p className="text-[10px] text-choco-warm leading-tight mt-0.5 line-clamp-1">
                          {flavor.desc}
                        </p>
                      </div>
                    </div>
                    {countInBox > 0 ? (
                      <span className="bg-choco-gold text-[#2B1816] font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {countInBox}
                      </span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-choco-beige group-hover:text-choco-medium transition" />
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => fillAllWith(FLAVORS[0].name)}
                className="text-[11px] text-choco-gold hover:text-choco-medium font-medium transition"
              >
                Fill all slots with {FLAVORS[0].name.split(' ')[0]}
              </button>
            </div>
          </div>
          
          <div>
            <span className="text-xs font-mono tracking-wider text-choco-medium uppercase block mb-2.5">
              Step 4: Premium Velvet Wrapper
            </span>
            <div className="space-y-2">
              {PACKAGING_OPTIONS.map((pkg) => (
                <label
                  key={pkg.id}
                  className={`flex items-start gap-2.5 p-2 rounded-xl border cursor-pointer transition ${
                    packagingId === pkg.id
                      ? 'bg-choco-cream border-choco-gold'
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="packaging"
                    checked={packagingId === pkg.id}
                    onChange={() => setPackagingId(pkg.id)}
                    className="mt-1 text-choco-medium focus:ring-choco-gold accent-choco-medium"
                  />
                  <div>
                    <span className="text-xs font-semibold text-choco-dark block">{pkg.name}</span>
                    <span className="text-[10px] text-[#6D4C41] block leading-tight">{pkg.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* Right Pricing Estimator & CTA: 3 Columns */}
        <div className="lg:col-span-3 flex flex-col justify-between bg-choco-cream/50 p-5 rounded-2xl border border-choco-beige/40">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono tracking-wider text-choco-medium uppercase block mb-3">
                Step 5: custom chocolate letter engraving
              </span>
              <input
                type="text"
                maxLength={20}
                placeholder="Initial, Love, Happy Birthday etc..."
                value={engravedNote}
                onChange={(e) => setEngravedNote(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-choco-beige bg-white focus:outline-none focus:ring-1 focus:ring-choco-gold"
              />
              <p className="text-[9px] text-[#6D4C41] mt-1 italic">
                Edible gold-tempered lettering molded on truffles (+₹650.00 setup fee)
              </p>
            </div>

            <div className="border-t border-choco-beige/50 pt-4 space-y-2.5">
              <span className="text-xs font-mono tracking-wider text-choco-medium uppercase block">
                Cost Breakdown
              </span>
              <div className="flex justify-between text-xs text-[#6D4C41]">
                <span>Box Base Cost ({boxSize} pcs):</span>
                <span className="font-mono font-medium">₹{basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#6D4C41]">
                <span>Packaging Premium:</span>
                <span className="font-mono font-medium">₹{packagingPremium.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#6D4C41]">
                <span>Lettering Option:</span>
                <span className="font-mono font-medium">₹{engravingFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-dashed border-choco-beige pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-choco-dark">Estimated Total:</span>
                <span className="text-2xl font-serif font-extrabold text-choco-dark text-right">
                  ₹{totalCost.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button
              onClick={handleApplyToInquiry}
              id="btn-apply-custom-box"
              className="w-full bg-choco-dark hover:bg-choco-medium text-white py-3 px-4 rounded-xl text-xs font-bold transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group focus:outline-none"
            >
              <ShoppingBag className="w-4 h-4 text-choco-gold group-hover:scale-110 transition" />
              Prefill Inquiry Form
            </button>
            
            <AnimatePresence>
              {appliedNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-50 text-green-800 border border-green-200 p-2.5 rounded-xl text-[10px] flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Configuration Applied!</span> Form below has been filled and estimates calculated.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-choco-gold/5 border border-choco-gold/15 p-3 rounded-xl flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-choco-gold mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-choco-medium leading-normal">
                Submitting this inquiry does not require upfront payment. Our master chocolatier will call you within 24 hours to secure designs and finalize delivery options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
