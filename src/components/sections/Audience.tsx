import React from 'react';
import Container from '../ui/Container';

const Audience: React.FC = () => {
    return (
        <section id="audience" className="py-20 bg-background">
            <Container>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-black mb-4">
                    Who You&apos;ll Meet at GTCIS
                </h2>
                <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
                    GTCIS brings together decision-makers, investors, producers, and ecosystem partners
                    shaping the future of Ghana&apos;s tree crops sector.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {/* Policy & public institutions */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-md border border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-brand-green-soft hover:border-brand-green">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/5 ring-1 ring-accent/20 text-accent">
                                <span className="text-2xl" aria-hidden="true">≡</span>
                            </div>
                            <h3 className="text-xl font-semibold text-brand-black">Policy &amp; Public Institutions</h3>
                        </div>
                        <div className="h-0.5 w-14 bg-brand-gold mb-5" />
                        <ul className="space-y-2 text-sm md:text-base text-gray-700">
                            <li>Ministries, Departments &amp; Agencies (MDAs)</li>
                            <li>Development Partners (DPs)</li>
                            <li>Traditional Authorities</li>
                            <li>Security Agencies</li>
                            <li>Labour Unions</li>
                            <li>National Service Authority (NSA)</li>
                        </ul>
                        <span className="mt-5 inline-block text-sm font-semibold text-brand-gold group-hover:translate-x-1 transition-transform">
                            more...
                        </span>
                    </div>

                    {/* Investors & finance */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-md border border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-brand-green-soft hover:border-brand-green">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 ring-1 ring-secondary/30 text-secondary">
                                <span className="text-2xl" aria-hidden="true">₵</span>
                            </div>
                            <h3 className="text-xl font-semibold text-brand-black">Investors &amp; Finance</h3>
                        </div>
                        <div className="h-0.5 w-14 bg-secondary mb-5" />
                        <ul className="space-y-2 text-sm md:text-base text-gray-700">
                            <li>Local and foreign investors</li>
                            <li>Financial institutions (FIs)</li>
                            <li>Private sector leaders &amp; sponsors</li>
                            <li>Impact and ESG-focused funds</li>
                        </ul>
                        <span className="mt-5 inline-block text-sm font-semibold text-secondary group-hover:translate-x-1 transition-transform">
                            more...
                        </span>
                    </div>

                    {/* Producers & value chain actors */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-md border border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-brand-green-soft hover:border-brand-green">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/10 ring-1 ring-brand-green/30 text-brand-green">
                                <span className="text-2xl" aria-hidden="true">⧉</span>
                            </div>
                            <h3 className="text-xl font-semibold text-brand-black">Producers &amp; Value Chain</h3>
                        </div>
                        <div className="h-0.5 w-14 bg-brand-green mb-5" />
                        <ul className="space-y-2 text-sm md:text-base text-gray-700">
                            <li>Stakeholders across the tree crops value chain</li>
                            <li>Farmers &amp; farmer-based organizations</li>
                            <li>Value chain associations</li>
                            <li>Input suppliers, aggregators &amp; processors</li>
                        </ul>
                        <span className="mt-5 inline-block text-sm font-semibold text-brand-green group-hover:translate-x-1 transition-transform">
                            more...
                        </span>
                    </div>

                    {/* Knowledge, media & civil society */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-md border border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-brand-green-soft hover:border-brand-green">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/5 ring-1 ring-accent/20 text-accent">
                                <span className="text-2xl" aria-hidden="true">◎</span>
                            </div>
                            <h3 className="text-xl font-semibold text-brand-black">Knowledge, Media &amp; Society</h3>
                        </div>
                        <div className="h-0.5 w-14 bg-accent mb-5" />
                        <ul className="space-y-2 text-sm md:text-base text-gray-700">
                            <li>Civil society organizations (CSOs) &amp; NGOs</li>
                            <li>Universities, colleges &amp; research institutions</li>
                            <li>The media &amp; communications partners</li>
                            <li>Religious and community-based organizations</li>
                        </ul>
                        <span className="mt-5 inline-block text-sm font-semibold text-accent group-hover:translate-x-1 transition-transform">
                            more...
                        </span>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Audience;