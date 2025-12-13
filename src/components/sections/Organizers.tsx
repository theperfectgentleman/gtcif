import React from 'react';
import Container from '../ui/Container';
import LogoSlider from '../LogoSlider';

import eximLogo from '@/logos/exim.png';
import fageLogo from '@/logos/fage.png';
import gfzaLogo from '@/logos/gfza.jpg';
import gipcLogo from '@/logos/gipc.png';
import girsalLogo from '@/logos/girsal.png';
import gizLogo from '@/logos/giz.png';
import gpscpiiLogo from '@/logos/GPSCPII.png';
import iloLogo from '@/logos/ilo.png';
import opdagLogo from '@/logos/opdag.jpg';
import proforestLogo from '@/logos/proforest.png';
import worldBankLogo from '@/logos/world_bank.png';

const Organizers = () => {
    return (
        <section id="organizers" className="py-10 bg-gray-100">
            <Container>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-black mb-6">Organizers</h2>
                <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                    The 1st Ghana Tree Crops Investment Fair & Exhibition is organized by a dedicated team committed to promoting the tree crop sector in Ghana.
                </p>

                <LogoSlider
                    className="mb-12"
                    logos={[
                        { src: worldBankLogo, alt: 'World Bank' },
                        { src: iloLogo, alt: 'International Labour Organisation (ILO)' },
                        { src: gipcLogo, alt: 'Ghana Investment Promotion Centre (GIPC)' },
                        { src: gfzaLogo, alt: 'Ghana Free Zones Authority (GFZA)' },
                        { src: gizLogo, alt: 'GIZ' },
                        { src: girsalLogo, alt: 'GIRSAL' },
                        { src: eximLogo, alt: 'Ghana EXIM Bank' },
                        { src: fageLogo, alt: 'FAGE' },
                        { src: gpscpiiLogo, alt: 'GPSCPII' },
                        { src: opdagLogo, alt: 'OPDAG' },
                        { src: proforestLogo, alt: 'Proforest' },
                    ]}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform duration-500 hover:-translate-y-0.5 hover:shadow-xl">
                        <h3 className="text-lg font-semibold text-brand-black">Tree Crops Development Authority (TCDA)</h3>
                        <p className="text-gray-700 mt-2">Leading the initiative to develop and regulate tree crops in Ghana.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform duration-500 hover:-translate-y-0.5 hover:shadow-xl">
                        <h3 className="text-lg font-semibold text-brand-black">World Bank</h3>
                        <p className="text-gray-700 mt-2">Providing financial and technical support for sustainable agricultural practices.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform duration-500 hover:-translate-y-0.5 hover:shadow-xl">
                        <h3 className="text-lg font-semibold text-brand-black">Ghana Export Promotion Authority (GEPA)</h3>
                        <p className="text-gray-700 mt-2">Facilitating the promotion of Ghanaian exports, including tree crops.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform duration-500 hover:-translate-y-0.5 hover:shadow-xl">
                        <h3 className="text-lg font-semibold text-brand-black">Ghana Investment Promotion Centre (GIPC)</h3>
                        <p className="text-gray-700 mt-2">Encouraging and facilitating investments in the tree crop sector.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform duration-500 hover:-translate-y-0.5 hover:shadow-xl">
                        <h3 className="text-lg font-semibold text-brand-black">International Labour Organisation (ILO)</h3>
                        <p className="text-gray-700 mt-2">Promoting decent work and sustainable livelihoods in agriculture.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform duration-500 hover:-translate-y-0.5 hover:shadow-xl">
                        <h3 className="text-lg font-semibold text-brand-black">Private Sector Sponsors</h3>
                        <p className="text-gray-700 mt-2">Supporting the event through sponsorship and collaboration.</p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Organizers;