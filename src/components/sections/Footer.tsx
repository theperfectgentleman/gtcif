import React from 'react';
import Container from '../ui/Container';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <Container className="text-center">
                <p className="mb-2">© 2026 Tree Crops Development Authority. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                    <a href="#audience" className="hover:underline">Audience</a>
                    <a href="#background" className="hover:underline">Background</a>
                    <a href="#contact" className="hover:underline">Contact</a>
                    <a href="#programme" className="hover:underline">Programme</a>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;