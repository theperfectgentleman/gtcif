import React from 'react';
import Container from '../ui/Container';
import FallingLeaves from '../FallingLeaves';
import Button from '../ui/Button';

const ThemeSection: React.FC = () => {
    return (
        <section className="relative py-20 bg-white overflow-hidden">
            <FallingLeaves />
            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-green/10 text-brand-green text-sm font-bold uppercase tracking-wider mb-6">
                        Event Theme
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-brand-black leading-tight mb-8">
                        &ldquo;Sustainable Growth Through Tree Crop Investments&rdquo;
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
                        Resetting and Building Ghana’s Green Economy
                    </p>

                    <div className="mt-10 flex justify-center">
                        <Button
                            href="/register"
                            variant="primary"
                            size="large"
                            className="px-10 py-4 rounded-md font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 no-underline"
                        >
                            Register Now
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ThemeSection;
