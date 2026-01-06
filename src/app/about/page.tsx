import React from 'react';
import Container from '../../components/ui/Container';
import { ScrollReveal } from '../../components/ui/ScrollReveal';

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="bg-green-900 text-white py-20">
                <Container>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">About GTCIS 2026</h1>
                    <p className="text-xl text-center max-w-3xl mx-auto text-green-100">
                        The 1st Ghana Tree Crops Investment Summit & Exhibition is a landmark event designed to position Ghana as a global powerhouse in the tree crop sector.
                    </p>
                </Container>
            </div>

            <Container className="py-16 space-y-20">
                {/* Introduction & Vision */}
                <ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Resetting Ghana's Agricultural Frontier</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Under the theme <span className="font-semibold text-green-700">"Sustainable Growth Through Tree Crop Investments : Resetting and Building Ghana’s Green Economy,"</span> this summit brings together the highest levels of government, traditional leadership, and global investors.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                In alignment with the Government of Ghana's Resetting Agenda, GTCIS 2026 serves as the premier platform for the Agriculture for Economic Transformation Agenda (AETA). Led by the vision of His Excellency John Dramani Mahama, this summit is a strategic call to modernize agriculture, ensure national food security, and position Ghana as a global leader in high-value tree crop exports.
                            </p>
                        </div>
                        <div className="bg-gray-100 p-8 rounded-2xl border-l-4 border-green-700">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Authority: TCDA Mandate</h3>
                            <p className="text-gray-700 mb-6">
                                The Tree Crops Development Authority (TCDA) was established by an Act of Parliament (Act 1010, 2019) to regulate and develop the production, processing, and trading of six strategic tree crops.
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-green-800">Our Vision</h4>
                                    <p className="text-gray-600">A highly developed, diversified, value-added, globally competitive, and sustainable tree crop sector in Ghana.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-green-800">Our Mission</h4>
                                    <p className="text-gray-600">To facilitate development and well-being through research, capacity building, and excellent services, achieving long-term commercial productivity and sustainability.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-green-800">Our Mandate</h4>
                                    <p className="text-gray-600">To create a conducive environment for the growth of tree and industrial crops with consequential benefits to the national economy.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Objectives */}
                <ScrollReveal>
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Objectives of the Summit</h2>
                        <p className="text-lg text-gray-600">GTCIS 2026 is engineered to be a catalyst for the industry by focusing on four primary pillars:</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Showcasing Achievement", desc: "Announcing TCDA's milestones and the industry's progress to the global public." },
                            { title: "Raising Awareness", desc: "Highlighting the significant untapped potential within the Ghanaian tree crop landscape." },
                            { title: "Promoting Investment", desc: "Strengthening partnerships among stakeholders, financial institutions, development partners, and private sector sponsors." },
                            { title: "Value Chain Spotlighting", desc: "Dedicating focused sessions to showcase specific opportunities within each of the six priority crops." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-bold text-green-700 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* The Opportunity */}
                <ScrollReveal>
                    <div className="bg-green-50 rounded-3xl p-10 md:p-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">The $600 Million Opportunity</h2>
                        <p className="text-xl text-green-800 max-w-3xl mx-auto mb-10">
                            We are bridging the gap between local potential and global capital. The summit targets an ambitious investment of <span className="font-bold">USD 100,000,000 per tree crop</span>, focusing on the six value chains regulated by the TCDA:
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["Cashew", "Shea", "Mango", "Coconut", "Rubber", "Oil Palm"].map((crop) => (
                                <span key={crop} className="px-6 py-3 bg-white text-green-800 font-bold rounded-full shadow-sm border border-green-200">
                                    {crop}
                                </span>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Participants & Outcomes */}
                <ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who You Will Meet</h2>
                            <p className="text-gray-600 mb-6">The summit is expected to host between 6,000 and 10,000 participants, including:</p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-1 text-sm">✓</span>
                                    <div><span className="font-bold text-gray-900">Investors & Financiers:</span> <span className="text-gray-600">Local and foreign investors, banks, and development partners.</span></div>
                                </li>
                                <li className="flex items-start">
                                    <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-1 text-sm">✓</span>
                                    <div><span className="font-bold text-gray-900">Policymakers:</span> <span className="text-gray-600">MDAs including Ministry of Food and Agriculture and Ministry of Finance.</span></div>
                                </li>
                                <li className="flex items-start">
                                    <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-1 text-sm">✓</span>
                                    <div><span className="font-bold text-gray-900">Industry Actors:</span> <span className="text-gray-600">Farmers, value chain associations, and private sector leaders.</span></div>
                                </li>
                                <li className="flex items-start">
                                    <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-1 text-sm">✓</span>
                                    <div><span className="font-bold text-gray-900">Knowledge Partners:</span> <span className="text-gray-600">Universities, research institutions, and CSOs.</span></div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Expected Outcomes</h2>
                            <p className="text-gray-600 mb-6">By participating in GTCIS 2026, stakeholders contribute to:</p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Policy Alignment", desc: "Strengthening collaboration with state actors for a unified sector promotion." },
                                    { title: "Economic Growth", desc: "Attracting substantial funding to boost sub-sector development." },
                                    { title: "Sustainability", desc: "Enhancing partnerships that ensure the long-term viability of the industry." },
                                    { title: "Job Creation", desc: "Driving industrialization that leads to sustainable employment across the value chain." }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <div className="h-2 w-2 rounded-full bg-green-500 mt-2.5 mr-3"></div>
                                        <div><span className="font-bold text-gray-900">{item.title}:</span> <span className="text-gray-600">{item.desc}</span></div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Organizers */}
                <ScrollReveal>
                    <div className="border-t pt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Organizers & Partners</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <h3 className="font-bold text-green-800 mb-3 text-lg">Development Partners</h3>
                                <p className="text-gray-600 leading-relaxed">The World Bank, GPSCP II, ProForest, ILO, GIZ, and the Swiss Embassy.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-green-800 mb-3 text-lg">Strategic Agencies</h3>
                                <p className="text-gray-600 leading-relaxed">GIPC, GFZA, Ghana EximBank, and GIRSAL.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-green-800 mb-3 text-lg">Associations</h3>
                                <p className="text-gray-600 leading-relaxed">FAGE, OPDAG, and the Coconut Federation of Ghana.</p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
        </div>
    );
}
