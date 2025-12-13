import React from 'react';
import Container from '../ui/Container';

const Contact: React.FC = () => {
    const year = 2026;
    const monthIndex = 1; // February (0-based)
    const monthLabel = 'February 2026';
    const eventDays = new Set([17, 18, 19, 20]);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDay = new Date(year, monthIndex, 1);
    const firstDow = (firstDay.getDay() + 6) % 7; // Monday=0
    const cells: Array<number | null> = [];

    for (let i = 0; i < firstDow; i += 1) cells.push(null);
    for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    while (cells.length < 42) cells.push(null);

    return (
        <section id="contact" className="relative overflow-hidden py-24">
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-center bg-cover bg-no-repeat bg-fixed"
                style={{ backgroundImage: "url('/images/contact-calendar-parallax.jpg')" }}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-brand-black/75" />

            <Container>
                <div className="relative">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-gold mb-4">Contact Us</h2>
                    <p className="text-center text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                        For inquiries related to the 1st Ghana Tree Crops Investment Fair & Exhibition (GTCIF) 2026,
                        reach out using the details below and save the dates in your calendar.
                    </p>

                    <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                    <div>
                                        <h3 className="text-sm uppercase tracking-widest text-white/60 font-semibold">Email</h3>
                                        <p className="mt-2 text-lg font-medium text-white">info@gtcif2026.com</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm uppercase tracking-widest text-white/60 font-semibold">Phone</h3>
                                        <p className="mt-2 text-lg font-medium text-white">+233 123 456 789</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm uppercase tracking-widest text-white/60 font-semibold">Address</h3>
                                        <p className="mt-2 text-lg font-medium text-white">
                                            Accra International Conference Centre, Accra, Ghana
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-sm uppercase tracking-widest text-white/60 font-semibold text-center mb-4">Follow Us</h3>
                                    <div className="flex justify-center gap-6">
                                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-gold hover:opacity-90">Facebook</a>
                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-gold hover:opacity-90">Twitter</a>
                                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-gold hover:opacity-90">Instagram</a>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-brand-black/40 p-6 md:p-7">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.18em] text-white/60 font-semibold">Calendar</p>
                                        <h3 className="mt-1 text-xl md:text-2xl font-bold text-brand-gold">{monthLabel}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs uppercase tracking-[0.18em] text-white/60 font-semibold">Event Dates</p>
                                        <p className="mt-1 text-sm font-semibold text-white">17–20</p>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-7 gap-2 text-center">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label) => (
                                        <div key={label} className="text-[0.7rem] font-semibold uppercase tracking-widest text-white/55">
                                            {label}
                                        </div>
                                    ))}

                                    {cells.map((day, idx) => {
                                        const isEvent = typeof day === 'number' && eventDays.has(day);

                                        return (
                                            <div
                                                key={`${idx}-${day ?? 'x'}`}
                                                className={
                                                    day === null
                                                        ? 'h-10 rounded-lg'
                                                        : `h-10 rounded-lg border text-sm font-semibold flex items-center justify-center ${
                                                            isEvent
                                                                ? 'border-brand-gold bg-brand-gold/15 text-brand-gold'
                                                                : 'border-white/10 bg-white/5 text-white/80'
                                                        }`
                                                }
                                                aria-label={
                                                    day === null
                                                        ? undefined
                                                        : isEvent
                                                            ? `Event day ${day} ${monthLabel}`
                                                            : `${day} ${monthLabel}`
                                                }
                                            >
                                                {day}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Contact;