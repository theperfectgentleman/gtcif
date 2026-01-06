'use client';

import React from 'react';
import { programme } from '../../data/programme';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';

const Programme: React.FC = () => {
    return (
        <section id="programme" className="py-20 bg-gray-100">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 uppercase tracking-[0.18em]">
                        Event Programme
                    </h2>
                    <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                        A four-day journey across Ghana&apos;s key tree crop value chains -- from opening ceremony to closing gala.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 items-stretch">
                    {programme.map((dayBlock, index) => {
                        const hasMoreActivities = dayBlock.activities.length > 3;
                        const previewActivities = dayBlock.activities.slice(0, 3);

                        return (
                            <ScrollReveal key={dayBlock.day} width="100%" delay={index * 0.08}>
                                <article
                                    className="relative h-full bg-white rounded-[1.9rem] border border-orange-100/80 px-7 py-8 flex flex-col justify-between shadow-[0_18px_55px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out cursor-pointer group hover:-translate-y-2 hover:shadow-[0_26px_70px_rgba(0,0,0,0.12)] hover:border-brand-gold/80"
                                >
                                    <div className="absolute inset-x-0 top-0 h-[6px] bg-brand-gold/0 group-hover:bg-brand-gold transition-colors duration-300" />

                                    <div className="flex flex-col h-full justify-between">
                                        <div>
                                            <div className="flex items-end justify-between mb-3">
                                                <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gray-500">
                                                    {dayBlock.day}
                                                </p>
                                                <span className="text-[0.65rem] font-semibold tracking-[0.24em] uppercase text-gray-400">
                                                    {dayBlock.monthShort || 'FEB'} {dayBlock.date ?? index + 1}
                                                </span>
                                            </div>

                                            <div className="flex items-baseline gap-4">
                                                <span className="text-[4.75rem] md:text-[6rem] font-extrabold leading-none tracking-tight text-brand-gold group-hover:text-brand-green transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                                                    {dayBlock.date ?? index + 1}
                                                </span>
                                            </div>

                                            <div className="mt-4 h-[4px] bg-brand-gold/20 group-hover:bg-brand-gold transition-colors duration-300" />
                                        </div>

                                        <div className="mt-5">
                                            {dayBlock.theme && (
                                                <h3 className="text-lg md:text-xl font-bold text-brand-black leading-snug tracking-[0.12em] uppercase mb-3 group-hover:text-brand-green transition-colors duration-300">
                                                    {dayBlock.theme}
                                                </h3>
                                            )}

                                            <div className="space-y-3">
                                                {previewActivities.map((item, activityIndex) => (
                                                    <div key={`${dayBlock.day}-${activityIndex}`} className="flex gap-3">
                                                        <span className="mt-2 h-[1px] w-8 bg-brand-gold/60 group-hover:bg-brand-green/70 transition-colors duration-300" />
                                                        <div>
                                                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand-gold mb-0.5">
                                                                {item.time}
                                                            </p>
                                                            <p className="text-sm font-medium text-brand-black leading-tight">
                                                                {item.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}

                                                {hasMoreActivities && (
                                                    <p className="pt-2 text-xs text-gray-500 italic">
                                                        + {dayBlock.activities.length - previewActivities.length} more sessions, panels & exhibitions
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </ScrollReveal>
                        );
                    })}
                </div>

                <div className="flex justify-center mt-12">
                    <Button
                        href="/docs/tree-crops-summit-programme.pdf"
                        variant="primary"
                        size="large"
                        target="_blank"
                    >
                        Download Full Programme (PDF)
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default Programme;