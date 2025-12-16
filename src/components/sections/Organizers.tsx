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
                    The 1st Ghana Tree Crops Investment Summit is organized by a dedicated team committed to promoting the tree crop sector in Ghana.
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
            </Container>
        </section>
    );
};

export default Organizers;