'use client';

import React, { useState } from 'react';
import { programme } from '../../data/programme';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  TrendingUp,
  Activity,
  CalendarDays,
  ChevronRight,
  Award
} from 'lucide-react';

const Programme: React.FC = () => {
    const [activeDay, setActiveDay] = useState(1);

    // Event status tracking
    const eventStatus = {
        percentComplete: 0, // Update this based on current progress
        currentDay: 1,
        currentSession: "Registration and Networking",
        nextSession: "Show of Documentaries & Videos",
        venue: "AICC, Accra",
    };

    return (
        <section id="programme" className="py-20 bg-gray-50">
            <Container>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                            <Activity size={12} className="animate-pulse" />
                            <span>GTCIS 2026</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-black leading-none">
                            Event Programme
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            A four-day journey across Ghana&apos;s key tree crop value chains
                        </p>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">AICC, Accra</p>
                        <p className="text-sm font-bold text-brand-black">February 17-20, 2026</p>
                    </div>
                </div>

                {/* Progress Card */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm relative overflow-hidden mb-8">
                    <TrendingUp className="absolute -right-8 -top-8 w-48 h-48 text-gray-50 opacity-10 rotate-12" />
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="bg-brand-black p-3 rounded-2xl shadow-lg">
                                    <Activity className="text-brand-gold" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black uppercase tracking-tight text-brand-black">Summit Overview</h3>
                                    <p className="text-sm font-bold text-brand-green">4 Days of Collaboration</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-black text-brand-black">{eventStatus.percentComplete}%</span>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Complete</p>
                            </div>
                        </div>

                        <div className="w-full h-3 bg-gray-100 rounded-full mb-8 overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-brand-green to-brand-gold transition-all duration-1000 ease-out"
                                style={{ width: `${eventStatus.percentComplete}%` }}
                            ></div>
                        </div>

                        <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-5 flex items-start space-x-4 max-w-2xl">
                            <div className="bg-brand-green p-2 rounded-lg text-white">
                                <CalendarDays size={16} />
                            </div>
                            <div className="flex-1">
                                <span className="text-[10px] font-black text-brand-green uppercase tracking-widest block mb-1">Featured Session</span>
                                <h4 className="font-bold text-brand-black leading-tight mb-2">{eventStatus.currentSession}</h4>
                                <div className="flex items-center text-xs text-brand-green font-medium">
                                    <MapPin size={12} className="mr-1.5" />
                                    {eventStatus.venue}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabbed Navigation */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-1 bg-gray-50 border-b border-gray-200 flex flex-wrap">
                        {programme.map((dayBlock, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setActiveDay(index + 1)}
                                className={`flex-1 min-w-[120px] py-4 px-6 text-sm font-bold transition-all relative ${
                                    activeDay === index + 1
                                    ? "text-brand-green bg-white shadow-sm" 
                                    : "text-gray-400 hover:text-gray-600"
                                }`}
                            >
                                <div className="flex flex-col items-center">
                                    <span className="uppercase tracking-tighter">Day {index + 1}</span>
                                    <span className="text-[10px] opacity-60 font-black">{dayBlock.monthShort} {dayBlock.date}</span>
                                </div>
                                {activeDay === index + 1 && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-green"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                                <div className="bg-brand-green text-white p-2.5 rounded-xl">
                                    <CalendarDays size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-brand-black tracking-tight uppercase">
                                        {programme[activeDay - 1].theme}
                                    </h3>
                                    <p className="text-sm font-medium text-gray-400">{programme[activeDay - 1].day}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase">
                                <Clock size={14} />
                                <span>{programme[activeDay - 1].activities.length} Sessions</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {programme[activeDay - 1].activities.map((session, index) => {
                                // Determine session status (you can make this dynamic based on actual event time)
                                const getStatus = (): 'completed' | 'active' | 'upcoming' => {
                                    // TODO: Make this dynamic based on actual event time
                                    return 'upcoming';
                                };
                                const status = getStatus();
                                
                                return (
                                    <div 
                                        key={index} 
                                        className={`group p-4 md:p-6 rounded-2xl border transition-all flex items-stretch gap-4 md:gap-6 ${
                                            status === 'active' 
                                            ? 'bg-brand-green/5 border-brand-green/30 ring-2 ring-brand-green/10 ring-offset-2' 
                                            : status === 'completed'
                                            ? 'bg-gray-50 border-gray-100 opacity-60'
                                            : 'bg-white border-gray-200 hover:border-brand-green hover:shadow-lg hover:-translate-y-1'
                                        }`}
                                    >
                                        {/* Time Column - Uniform width and centered vertically/horizontally */}
                                        <div className="hidden md:flex flex-none w-[130px] flex-col justify-center">
                                            <div className={`flex flex-col items-center justify-center p-3 rounded-xl text-center h-full w-full border ${
                                                status === 'active' 
                                                ? 'bg-brand-green text-white border-brand-green' 
                                                : 'bg-gray-50 text-gray-600 border-gray-100 group-hover:bg-gray-100 transition-colors'
                                            }`}>
                                                {session.time.includes(' - ') ? (
                                                    <>
                                                        <span className="text-xs font-black uppercase tracking-tight block leading-none mb-1.5">
                                                            {session.time.split(' - ')[0]}
                                                        </span>
                                                        <div className={`h-px w-4 my-1 opacity-30 ${status === 'active' ? 'bg-white' : 'bg-gray-400'}`}></div>
                                                        <span className="text-xs font-black uppercase tracking-tight block leading-none mt-1.5 opacity-90">
                                                            {session.time.split(' - ')[1]}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-xs font-black uppercase tracking-tight block leading-tight">
                                                        {session.time}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Mobile Time (simpler version) */}
                                        <div className="md:hidden flex-none pt-1">
                                             <span className={`text-[10px] font-black uppercase tracking-tight px-2 py-1 rounded block text-center ${
                                                status === 'active' ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                {session.time.split(' - ')[0]}
                                            </span>
                                        </div>
                                        
                                        <div className="flex-grow py-1 flex flex-col justify-center">
                                            <div className="flex flex-wrap items-start gap-2 mb-2">
                                                <h5 className={`font-medium text-lg leading-snug max-w-2xl ${
                                                    status === 'active' ? 'text-brand-green' : 'text-brand-black'
                                                }`}>
                                                    {session.title}
                                                </h5>
                                                <div className="flex items-center mt-1 space-x-1">
                                                    {status === 'completed' && <CheckCircle2 size={16} className="text-brand-green" />}
                                                    {session.title.toLowerCase().includes('award') && <Award size={16} className="text-brand-gold" />}
                                                </div>
                                            </div>
                                            {session.description && (
                                                <p className={`text-sm leading-relaxed max-w-3xl ${
                                                    status === 'active' ? 'text-brand-green/80' : 'text-gray-500'
                                                }`}>
                                                    {session.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="hidden md:flex items-center text-gray-300 group-hover:text-brand-green transition-colors pl-4 border-l border-gray-50 group-hover:border-gray-100">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center pt-8 mt-8">
                    <Button
                        href="/docs/tree-crops-summit-programme.pdf"
                        variant="primary"
                        size="large"
                        target="_blank"
                    >
                        <span className="flex items-center space-x-2">
                            <span>View Full Programme</span>
                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default Programme;