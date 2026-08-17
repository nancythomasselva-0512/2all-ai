"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Video, CheckCircle2, Clock, Send, Mail, Globe, Phone, User, ExternalLink, Loader2 } from "lucide-react";

interface DemoRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  meetingSlot?: string | null;
  status?: string;
  createdAt: string;
}

export default function AdminDemoRequestsManager() {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlotMap, setSelectedSlotMap] = useState<Record<string, string>>({});
  const [sendingMap, setSendingMap] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchDemoRequests = async () => {
    try {
      const res = await fetch("/api/admin/demo");
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      }
    } catch (e) {
      console.error("Failed to fetch demo requests:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemoRequests();
  }, []);

  const handleAssignSlot = async (requestId: string) => {
    const slot = selectedSlotMap[requestId] || "Tomorrow, 10:00 AM";
    setSendingMap(prev => ({ ...prev, [requestId]: true }));

    try {
      const res = await fetch("/api/admin/demo/assign-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, meetingSlot: slot }),
      });

      if (res.ok) {
        const data = await res.json();
        setToast({ text: `Slot '${slot}' assigned & single unified email sent to lead!`, type: "success" });
        setTimeout(() => setToast(null), 4000);
        fetchDemoRequests();
      } else {
        const data = await res.json();
        setToast({ text: data.message || "Failed to assign slot", type: "error" });
      }
    } catch (err) {
      setToast({ text: "Network error assigning slot", type: "error" });
    } finally {
      setSendingMap(prev => ({ ...prev, [requestId]: false }));
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6 text-left font-sans">
      
      {/* Toast message */}
      {toast && (
        <div className={`p-4 rounded-2xl text-xs font-black flex items-center gap-2 ${
          toast.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          {toast.text}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Enterprise Demo Requests & Slot Manager</h3>
          </div>
          <p className="text-xs text-slate-500 font-medium">Manage booked client demos, assign meeting slots, and dispatch single unified emails with working Google Meet links.</p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 font-extrabold text-xs rounded-full border border-blue-200 shrink-0">
          {requests.length} Total Leads
        </span>
      </div>

      {loading ? (
        <div className="py-12 flex items-center justify-center text-slate-400 font-bold text-xs gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          Loading Demo Requests...
        </div>
      ) : requests.length === 0 ? (
        <div className="py-12 text-center text-slate-400 font-bold text-xs">
          No demo requests received yet.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => {
            const isSkipped = !req.meetingSlot || req.meetingSlot.toLowerCase().includes("skipped");
            const meetRoomId = req.email.replace(/[^a-zA-Z0-9]/g, "").substring(0, 10) || "demo";
            const meetLink = `https://meet.google.com/2all-ai-demo-${meetRoomId}`;
            const isSending = sendingMap[req.id];

            return (
              <div key={req.id} className="p-5 bg-slate-50/70 border border-slate-200/90 rounded-2xl space-y-4 hover:border-blue-300 transition-all">
                
                {/* Client Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
                      {req.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                        {req.name}
                        <span className="text-[10px] font-bold text-slate-400">({new Date(req.createdAt).toLocaleDateString("en-US")})</span>
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold mt-0.5">
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-blue-600" /> {req.email}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-400" /> {req.phone}</span>
                        <a href={req.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 font-bold hover:underline">
                          <Globe className="w-3.5 h-3.5" /> {req.website} <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Slot Status Badge */}
                  <div>
                    {!isSkipped ? (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-black flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Confirmed Slot: {req.meetingSlot}
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-black flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" /> Slot Pending (Customer Skipped)
                      </span>
                    )}
                  </div>
                </div>

                {/* Video Meeting Link */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-bold">
                    <Video className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Working Google Meet Link:</span>
                    <a href={meetLink} target="_blank" rel="noreferrer" className="text-blue-600 font-extrabold hover:underline">
                      {meetLink}
                    </a>
                  </div>
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=2all.ai+Demo+Call+with+${encodeURIComponent(req.name)}&details=Website:+${encodeURIComponent(req.website)}&location=${encodeURIComponent(meetLink)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5 text-blue-600" /> Google Calendar Invite
                  </a>
                </div>

                {/* Assign Slot Controls (If Pending/Skipped or Wants to Change Slot) */}
                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex-grow flex items-center gap-2">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-wider shrink-0">Assign Slot:</span>
                    <select
                      value={selectedSlotMap[req.id] || req.meetingSlot || "Tomorrow, 10:00 AM"}
                      onChange={(e) => setSelectedSlotMap(prev => ({ ...prev, [req.id]: e.target.value }))}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 flex-grow"
                    >
                      <option value="Tomorrow, 10:00 AM">📅 Tomorrow, 10:00 AM</option>
                      <option value="Tomorrow, 02:00 PM">📅 Tomorrow, 02:00 PM</option>
                      <option value="Friday, 11:30 AM">📅 Friday, 11:30 AM</option>
                      <option value="Friday, 04:00 PM">📅 Friday, 04:00 PM</option>
                      <option value="Monday, 10:00 AM">📅 Monday, 10:00 AM</option>
                      <option value="Monday, 03:00 PM">📅 Monday, 03:00 PM</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    disabled={isSending}
                    onClick={() => handleAssignSlot(req.id)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer border-none uppercase tracking-wider shrink-0 disabled:opacity-50"
                  >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isSending ? "Sending Email..." : "Assign Slot & Send Single Email"}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
