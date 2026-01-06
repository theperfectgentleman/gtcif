import React from 'react';
import Hero from '../components/sections/Hero';
import VenueDateTheme from '../components/sections/VenueDateTheme';
import ThemeSection from '../components/sections/ThemeSection';
import Guests from '../components/sections/Guests';
import Background from '../components/sections/Background';
import Audience from '../components/sections/Audience';
import Outcomes from '../components/sections/Outcomes';
import Organizers from '../components/sections/Organizers';
import Programme from '../components/sections/Programme';
import Contact from '../components/sections/Contact';
import { ScrollReveal } from '../components/ui/ScrollReveal';

const HomePage = () => {
    return (
        <div className="overflow-hidden">
            <Hero />
            
            <ScrollReveal width="100%">
                <VenueDateTheme />
            </ScrollReveal>

            <ScrollReveal width="100%">
                <ThemeSection />
            </ScrollReveal>
            
            <ScrollReveal width="100%">
                <Guests />
            </ScrollReveal>
            
            <ScrollReveal width="100%">
                <Background />
            </ScrollReveal>
            
            <ScrollReveal width="100%">
                <Audience />
            </ScrollReveal>
            
            <ScrollReveal width="100%">
                <Outcomes />
            </ScrollReveal>
            
            <ScrollReveal width="100%">
                <Organizers />
            </ScrollReveal>
            
            <ScrollReveal width="100%">
                <Programme />
            </ScrollReveal>
            
            <ScrollReveal width="100%">
                <Contact />
            </ScrollReveal>
        </div>
    );
};

export default HomePage;