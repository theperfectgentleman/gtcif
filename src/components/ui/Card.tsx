import React from 'react';

interface CardProps {
    title: string;
    description: string;
    imageUrl?: string;
    link?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, link }) => {
    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5">
            {imageUrl && (
                <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-brand-black">{title}</h2>
                <p className="text-gray-700 mt-2">{description}</p>
                {link && (
                    <a href={link} className="mt-4 inline-block font-semibold text-brand-green hover:opacity-90">
                        Learn More
                    </a>
                )}
            </div>
        </div>
    );
};

export default Card;