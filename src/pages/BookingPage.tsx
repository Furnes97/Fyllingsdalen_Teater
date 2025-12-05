import React from 'react';
import { BookingForm } from '../components/BookingForm';

export const BookingPage: React.FC = () => {
  return (
    <main className="bg-theater-primary min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-theater-accent mb-4">
            Bestill Billetter
          </h1>
          <p className="text-lg text-theater-light/80 max-w-2xl mx-auto">
            Fyll ut skjemaet nedenfor for å sende en forespørsel om billetter. 
            Vi vil kontakte deg for å bekrefte bestillingen.
          </p>
        </div>
        
        <BookingForm />
      </div>
    </main>
  );
};

