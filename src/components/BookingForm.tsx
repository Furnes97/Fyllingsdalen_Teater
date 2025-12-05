import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Mail, User, MessageSquare, Phone, Ticket, Theater, Clock } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format, parse, isValid } from 'date-fns';
import { nb } from 'date-fns/locale';
import 'react-day-picker/style.css';
import playsData from '../data/plays.json';

// Define the Play interface to strictly type our data
interface PlaySchedule {
  [key: string]: string[]; // "0"=Sun, "1"=Mon, ..., "6"=Sat
}

interface Play {
  id: string;
  name: string;
  start: string;
  end: string;
  schedule?: PlaySchedule;
}

export const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  const plays = playsData.plays as Play[];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    play: plays[0].id,
    isPrivate: false,
    date: '',
    time: '',
    tickets: '1',
    message: ''
  });

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [dateError, setDateError] = useState<string>('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

  useEffect(() => {
    const playParam = searchParams.get('play');
    const playExists = plays.find(p => p.name === playParam || p.id === playParam);
    if (playParam && playExists) {
      setFormData(prev => ({ ...prev, play: playExists.id, date: '', time: '' }));
    }
  }, [searchParams]);

  const selectedPlay = plays.find(p => p.id === formData.play);

  // Reset date/time when play or private mode changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, date: '', time: '' }));
    setAvailableTimes([]);
    setDateError('');
  }, [formData.play, formData.isPrivate]);

  const getDayOfWeek = (date: Date): number => {
    return date.getDay();
  };

  const handleDateSelect = (date: Date | undefined) => {
    setIsCalendarOpen(false);
    if (!date) {
      setFormData(prev => ({ ...prev, date: '', time: '' }));
      return;
    }

    const dateString = format(date, 'yyyy-MM-dd');
    const dayOfWeek = getDayOfWeek(date);
    const schedule = selectedPlay?.schedule;

    if (formData.isPrivate) {
      // Private Viewing Logic
      // Date is already validated by disabled modifiers in DayPicker
      setDateError('');
      setFormData(prev => ({ ...prev, date: dateString }));
    } else {
      // Public Booking Logic
      // Convert dayOfWeek (number) to string key for JSON lookup
      const dayKey = dayOfWeek.toString();
      if (schedule && schedule[dayKey]) {
        setAvailableTimes(schedule[dayKey]);
        setFormData(prev => ({ ...prev, date: dateString, time: '' })); 
        setDateError('');
      } else {
        // Should not happen if disabled logic works, but safety net
        setAvailableTimes([]);
        setFormData(prev => ({ ...prev, date: dateString, time: '' }));
        setDateError('Ingen forestillinger på denne datoen.');
      }
    }
  };

  const isDateDisabled = (date: Date) => {
    if (!selectedPlay) return true;
    
    const start = parse(selectedPlay.start, 'yyyy-MM-dd', new Date());
    const end = parse(selectedPlay.end, 'yyyy-MM-dd', new Date());

    // Check range
    if (date < start || date > end) return true;

    // If private, all dates in range are allowed (unless specifically blocked, which we don't have data for)
    if (formData.isPrivate) return false;

    // Public shows: check if day of week has shows
    if (selectedPlay.schedule) {
      const dayOfWeek = date.getDay().toString();
      return !selectedPlay.schedule[dayOfWeek];
    }

    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (dateError) return;

    // Final validation for private shows time conflict
    if (formData.isPrivate && selectedPlay?.schedule) {
      const date = parse(formData.date, 'yyyy-MM-dd', new Date());
      const dayOfWeek = getDayOfWeek(date).toString();
      const publicTimes = selectedPlay.schedule[dayOfWeek];
      if (publicTimes && publicTimes.includes(formData.time)) {
        alert('Lukkede visninger kan ikke bookes på tidspunkt for offentlige forestillinger.');
        return;
      }
    }

    const subject = `Bestillingsforespørsel: ${formData.play}${formData.isPrivate ? ' (Lukket visning)' : ''}`;
    const body = `
Hei,

Jeg ønsker å bestille billetter til ${formData.play}.
${formData.isPrivate ? 'Dette gjelder en lukket visning.' : ''}

Navn: ${formData.name}
E-post: ${formData.email}
Telefon: ${formData.phone}
Dato: ${formData.date}
Tidspunkt: ${formData.time || 'Ikke spesifisert'}
Antall billetter: ${formData.tickets}

Melding:
${formData.message}
    `.trim();

    window.location.href = `mailto:billett@fyllingsdalenteater.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
      <div className="space-y-6">
        {/* Play Selection */}
        <div className="space-y-2">
          <label htmlFor="play" className="block text-sm font-medium text-theater-accent">
            Velg Forestilling
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Theater className="h-5 w-5 text-theater-muted" />
            </div>
            <select
              id="play"
              name="play"
              value={formData.play}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 bg-theater-primary border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-theater-accent focus:border-transparent text-theater-light appearance-none"
            >
              {plays.map(play => (
                <option key={play.id} value={play.id}>{play.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Private Viewing Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isPrivate"
            name="isPrivate"
            checked={formData.isPrivate}
            onChange={handleChange}
            className="h-5 w-5 rounded border-white/10 bg-theater-primary text-theater-accent focus:ring-theater-accent focus:ring-offset-0"
          />
          <label htmlFor="isPrivate" className="text-sm font-medium text-theater-accent">
            Dette er en forespørsel om lukket visning (hele salen)
          </label>
        </div>

        {/* Name and Email */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-theater-accent">
              Navn
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-theater-muted" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 bg-theater-primary border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-theater-accent focus:border-transparent text-theater-light placeholder-theater-muted"
                placeholder="Ditt navn"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-theater-accent">
              E-post
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-theater-muted" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 bg-theater-primary border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-theater-accent focus:border-transparent text-theater-light placeholder-theater-muted"
                placeholder="din@epost.no"
              />
            </div>
          </div>
        </div>

        {/* Phone and Date */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-theater-accent">
              Telefon
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-theater-muted" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 bg-theater-primary border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-theater-accent focus:border-transparent text-theater-light placeholder-theater-muted"
                placeholder="123 45 678"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-theater-accent">
              {formData.isPrivate ? 'Ønsket dato (hele perioden)' : 'Ønsket dato'}
            </label>
            <div className="relative" ref={calendarRef}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Calendar className="h-5 w-5 text-theater-muted" />
              </div>
              <button
                type="button"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className={`block w-full pl-10 pr-3 py-2 text-left bg-theater-primary border rounded-md focus:outline-none focus:ring-2 focus:ring-theater-accent focus:border-transparent text-theater-light ${
                  dateError ? 'border-red-500' : 'border-white/10'
                }`}
              >
                {formData.date ? (
                  format(parse(formData.date, 'yyyy-MM-dd', new Date()), 'dd:MM:yyyy', { locale: nb })
                ) : (
                  <span className="text-theater-muted">Velg dato</span>
                )}
              </button>
              
              {isCalendarOpen && (
                <div className="absolute z-50 mt-2 p-4 bg-theater-primary border border-white/10 rounded-xl shadow-2xl">
                  <style>{`
                    .rdp {
                      --rdp-cell-size: 40px;
                      --rdp-accent-color: #c0a062;
                      --rdp-background-color: #2a2a2a;
                      margin: 0;
                    }
                    .rdp-day_selected:not([disabled]), .rdp-day_selected:focus:not([disabled]), .rdp-day_selected:active:not([disabled]), .rdp-day_selected:hover:not([disabled]) {
                      background-color: var(--rdp-accent-color);
                      color: #1a1a1a;
                      font-weight: bold;
                    }
                    .rdp-day_today {
                      font-weight: bold;
                      color: #c0a062;
                    }
                    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                      background-color: rgba(255,255,255,0.1);
                    }
                    .rdp-day_disabled {
                      opacity: 0.25;
                      cursor: not-allowed;
                    }
                  `}</style>
                  <DayPicker
                    mode="single"
                    selected={formData.date ? parse(formData.date, 'yyyy-MM-dd', new Date()) : undefined}
                    onSelect={handleDateSelect}
                    disabled={isDateDisabled}
                    defaultMonth={selectedPlay ? parse(selectedPlay.start, 'yyyy-MM-dd', new Date()) : undefined}
                    locale={nb}
                    showOutsideDays
                    styles={{
                      caption: { color: '#f4f4f5' },
                      head_cell: { color: '#a1a1aa' },
                      day: { color: '#f4f4f5' },
                      nav_button: { color: '#c0a062' }
                    }}
                  />
                </div>
              )}
            </div>
            {dateError && <p className="text-xs text-red-500 mt-1">{dateError}</p>}
            {!dateError && formData.isPrivate && (
              <p className="text-xs text-theater-muted mt-1">
                For lukkede visninger kan du foreslå datoer i hele spilleperioden ({selectedPlay ? format(parse(selectedPlay.start, 'yyyy-MM-dd', new Date()), 'dd-MM-yyyy') : ''} til {selectedPlay ? format(parse(selectedPlay.end, 'yyyy-MM-dd', new Date()), 'dd-MM-yyyy') : ''}).
              </p>
            )}
          </div>
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <label htmlFor="time" className="block text-sm font-medium text-theater-accent">
            Tidspunkt
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-theater-muted" />
            </div>
            {!formData.isPrivate && availableTimes.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {availableTimes.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleChange({ target: { name: 'time', value: time } } as any)}
                    className={`flex items-center justify-center px-4 py-3 border rounded-md text-sm font-medium transition-all ${
                      formData.time === time
                        ? 'bg-theater-accent text-theater-primary border-theater-accent ring-2 ring-theater-accent ring-offset-2 ring-offset-theater-primary'
                        : 'bg-theater-primary border-white/10 text-theater-light hover:border-theater-accent/50 hover:bg-white/5'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="text" // Using text for flexible time input on private viewings
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                placeholder={formData.isPrivate ? "Ønsket tidspunkt" : "Velg dato først"}
                disabled={!formData.isPrivate && !formData.date}
                className="block w-full pl-10 pr-3 py-2 bg-theater-primary border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-theater-accent focus:border-transparent text-theater-light placeholder-theater-muted disabled:opacity-50"
              />
            )}
          </div>
          {formData.isPrivate && (
            <p className="text-xs text-theater-muted mt-1">
              OBS: Lukkede visninger kan ikke kollidere med offentlige forestillinger.
            </p>
          )}
        </div>

        {/* Tickets */}
        <div className="space-y-2">
          <label htmlFor="tickets" className="block text-sm font-medium text-theater-accent">
            Antall billetter
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Ticket className="h-5 w-5 text-theater-muted" />
            </div>
            <input
              type="number"
              id="tickets"
              name="tickets"
              min="1"
              required
              value={formData.tickets}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 bg-theater-primary border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-theater-accent focus:border-transparent text-theater-light placeholder-theater-muted"
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-theater-accent">
            Melding (valgfritt)
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
              <MessageSquare className="h-5 w-5 text-theater-muted" />
            </div>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 bg-theater-primary border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-theater-accent focus:border-transparent text-theater-light placeholder-theater-muted"
              placeholder="Andre ønsker eller spørsmål?"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-theater-primary bg-theater-accent hover:bg-[#d4b06c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theater-accent transition-colors"
        >
          Send Bestillingsforespørsel
        </button>
        
        <p className="text-xs text-center text-theater-muted mt-4">
          Dette vil åpne ditt e-postprogram med en ferdig utfylt melding.
        </p>
      </div>
    </form>
  );
};
