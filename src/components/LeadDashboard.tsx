import { InquiryLead } from '../types';
import { Mail, Phone, Calendar, ClipboardList, Trash2, ArrowUpDown, Shield, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface LeadDashboardProps {
  leads: InquiryLead[];
  onDeleteLead: (id: string) => void;
  onClearAll: () => void;
}

export default function LeadDashboard({ leads, onDeleteLead, onClearAll }: LeadDashboardProps) {
  const [filterService, setFilterService] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const services = [
    'all',
    'Customized Chocolate Gifts',
    'Corporate Gifting',
    'Wedding & Event Chocolates',
    'Handmade Premium Chocolates',
    'Seasonal Collections',
    'Bulk Orders'
  ];

  const filteredLeads = leads
    .filter((lead) => {
      if (filterService === 'all') return true;
      return lead.serviceRequired === filterService;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const handleDownloadBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "ChocoRocks_Customer_Leads.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-choco-dark/5 border border-choco-medium/20 rounded-3xl p-6 md:p-8" id="leads-dashboard">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-choco-beige/40 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-choco-gold/15 text-choco-gold border border-choco-gold/30 rounded-full px-2.5 py-0.5 text-xs font-mono mb-2">
            <Shield className="w-3.5 h-3.5" /> Corporate Admin Sandbox
          </div>
          <h4 className="font-serif text-2xl text-choco-dark">Direct Customer Inquiries Dashboard</h4>
          <p className="text-xs text-[#6D4C41] mt-1 max-w-xl">
            Real-time administrative display. Submit a message in the <strong>Contact Section</strong> to watch this lead collector update live without server delays.
          </p>
        </div>

        {leads.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleDownloadBackup}
              className="px-3 py-1.5 bg-white hover:bg-choco-cream border border-choco-beige text-xs font-semibold text-choco-medium rounded-lg transition"
            >
              Export Leads (.JSON)
            </button>
            <button
              onClick={onClearAll}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-lg transition"
            >
              Clear Live Memory
            </button>
          </div>
        )}
      </div>

      {leads.length === 0 ? (
        <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-choco-beige/60">
          <ClipboardList className="w-12 h-12 text-choco-beige mx-auto mb-3" />
          <p className="text-sm font-semibold text-choco-dark">No inquiries submitted yet</p>
          <p className="text-xs text-[#6D4C41] max-w-sm mx-auto mt-1 leading-normal px-4">
            Try custom-crafting a box above or completing the standard inquiry form below. This area will instantly parse, list, and organize your submissions.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-choco-beige/30">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6D4C41] font-medium">Filter Service:</span>
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="text-xs p-1.5 rounded-lg border border-choco-beige bg-choco-cream focus:outline-none"
              >
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s === 'all' ? 'All Inquiries' : s}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="text-xs flex items-center gap-1.5 text-choco-medium hover:text-choco-dark font-medium px-2 py-1"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort: {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
            </button>
          </div>

          {/* List display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                id={`lead-card-${lead.id}`}
                className="bg-white rounded-2xl p-5 border border-choco-beige/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] bg-choco-cream text-choco-medium border border-choco-beige font-mono px-2 py-0.5 rounded-full">
                      {lead.serviceRequired}
                    </span>
                    <button
                      onClick={() => onDeleteLead(lead.id)}
                      className="text-gray-400 hover:text-red-600 transition"
                      title="Remove Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h5 className="font-bold text-sm text-choco-dark">{lead.fullName}</h5>
                  
                  <div className="space-y-1 mt-2.5 text-xs text-[#6D4C41]">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-choco-gold flex-shrink-0" />
                      <span className="truncate">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-choco-gold flex-shrink-0" />
                      <span>{lead.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-choco-gold flex-shrink-0" />
                      <span>{new Date(lead.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {lead.message && (
                    <div className="bg-choco-cream/40 p-3 rounded-xl text-xs text-choco-dark mt-4 border border-choco-beige/20 leading-relaxed italic">
                      "{lead.message}"
                    </div>
                  )}

                  {lead.customBoxConfig && (
                    <div className="border-t border-dashed border-choco-beige mt-4 pt-3.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-choco-gold uppercase font-bold">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" /> ATELIER CONFIGURATION ATTACHED
                      </div>
                      <p className="text-[10px] text-choco-dark font-medium mt-1">
                        Box Size: {lead.customBoxConfig.slotsCount} pieces
                      </p>
                      <p className="text-[10px] text-[#6D4C41] mt-0.5">
                        Packaging Style: {lead.customBoxConfig.packaging}
                      </p>
                      {lead.customBoxConfig.customMessage && (
                        <p className="text-[10px] text-[#6D4C41] mt-0.5 leading-snug">
                          Monogram: "{lead.customBoxConfig.customMessage}"
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-choco-cream flex justify-between items-center text-[10px] text-gray-400 font-mono">
                  <span>ID: ...{lead.id.slice(-6)}</span>
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    ● ACTIVE LEAD
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredLeads.length === 0 && (
            <p className="text-center text-xs text-choco-warm py-4">
              No inquiries found matching the selected service selection.
            </p>
          )}

          <div className="text-right text-[11px] text-choco-warm">
            Showing <strong className="text-choco-gold">{filteredLeads.length}</strong> of {leads.length} customer records
          </div>
        </div>
      )}
    </div>
  );
}
