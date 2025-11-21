import React from 'react';
import { motion } from 'framer-motion';
import type { DatesContent } from '../types';
import { Calendar, Clock, Phone, Mail, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface DatesProps {
  content: DatesContent;
}

export const Dates: React.FC<DatesProps> = ({ content }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          label: 'Ledig',
          color: 'text-green-500',
          bg: 'bg-green-500/10',
          icon: CheckCircle
        };
      case 'few_left':
        return {
          label: 'Få billetter',
          color: 'text-amber-500',
          bg: 'bg-amber-500/10',
          icon: AlertCircle
        };
      case 'sold_out':
        return {
          label: 'Utsolgt',
          color: 'text-red-500',
          bg: 'bg-red-500/10',
          icon: XCircle
        };
      default:
        return {
          label: 'Ukjent',
          color: 'text-gray-500',
          bg: 'bg-gray-500/10',
          icon: AlertCircle
        };
    }
  };

  // Format date to Norwegian readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('no-NO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  return (
    <section id="dates" className="bg-theater-primary py-24 px-4 md:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">
            {content.heading}
          </h2>
          <div className="mx-auto h-1 w-24 bg-theater-accent" />
        </motion.div>

        <div className="space-y-4">
          {content.shows.map((show, index) => {
            const status = getStatusConfig(show.status);
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col gap-4 rounded-lg border border-white/5 bg-white/5 p-6 transition-colors hover:border-theater-accent/50 hover:bg-white/10 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-theater-primary border border-white/10 text-theater-accent">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white capitalize">
                      {formatDate(show.date)}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>kl. {show.time}</span>
                    </div>
                  </div>
                </div>

                <div className={`flex items-center gap-2 rounded-full px-4 py-2 ${status.bg} ${status.color}`}>
                  <StatusIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{status.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl bg-theater-accent p-8 text-center text-theater-primary"
        >
          <h3 className="mb-6 font-serif text-2xl font-bold">Kontakt oss for bestilling</h3>
          <p className="mb-8 text-lg opacity-90">
            {content.body}
          </p>
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
            <a 
              href={`tel:${content.contact_phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-xl font-bold hover:scale-105 transition-transform"
            >
              <Phone className="h-6 w-6" />
              {content.contact_phone}
            </a>
            <a 
              href={`mailto:${content.contact_email}`}
              className="flex items-center gap-3 text-xl font-bold hover:scale-105 transition-transform"
            >
              <Mail className="h-6 w-6" />
              {content.contact_email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

