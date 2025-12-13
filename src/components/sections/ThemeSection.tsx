import React from 'react';
import Container from '../ui/Container';
import FallingLeaves from '../FallingLeaves';

const ThemeSection: React.FC = () => {
    return (
        <section className="relative py-20 bg-white overflow-hidden">
            <FallingLeaves />
            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-green/10 text-brand-green text-sm font-bold uppercase tracking-wider mb-6">
                        Event Theme
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-brand-black leading-tight mb-8">
                        &ldquo;Ghana&apos;s Green Gold&rdquo;
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
                        Showcasing the Value and Potential of Tree Crops as a Significant Contributor to Ghana&apos;s Economy
                    </p>
                </div>
            </Container>
        </section>
    );
};

export default ThemeSection;
