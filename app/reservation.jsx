'use client';

import { useRef, useState } from 'react';
import { DayPicker, TZDate } from '@daypicker/react';
import { enGB, lt } from '@daypicker/react/locale';
import { availabilityMode, blockedDates, includesBlockedNights } from './availability.mjs';
import { kaunasToday, stay } from './stay.mjs';
import { Icon } from './icons';
import '@daypicker/react/style.css';
import './reservation.css';

const copy = {
  lt: {
    title: 'Viešnagės datos', arrival: 'Atvykimas', departure: 'Išvykimas', date: 'Pasirinkti',
    pick: { arrival: 'Pasirinkite atvykimo datą', departure: 'Pasirinkite išvykimo datą' },
    previous: 'Ankstesnis mėnuo', next: 'Kitas mėnuo', today: 'Šiandien', selected: 'Pasirinkta',
    demoBooked: 'Pavyzdinės užimtos datos', blocked: 'Užimta', checkoutOnly: 'Galima tik išvykti',
    guests: 'Svečiai', fewer: 'Sumažinti svečių skaičių', more: 'Padidinti svečių skaičių', submit: 'Peržiūrėti datas',
    note: 'Tai tik peržiūra. Ar datos laisvos, patvirtins šeimininkai.',
    arrivalError: 'Pasirinkite atvykimo datą nuo šiandien, kai galima nakvoti.',
    departureError: 'Pasirinkite išvykimo datą po atvykimo, neįtraukdami užblokuotų naktų.',
    preview: 'Jūsų pasirinkta viešnagė', nights: 'Naktų', guestTotal: 'Svečių', contact: 'Susisiekti', noScript: 'Dėl viešnagės datų susisiekite su šeimininkais.',
  },
  en: {
    title: 'Stay dates', arrival: 'Check-in', departure: 'Check-out', date: 'Choose date',
    pick: { arrival: 'Choose a check-in date', departure: 'Choose a check-out date' },
    previous: 'Previous month', next: 'Next month', today: 'Today', selected: 'Selected',
    demoBooked: 'Demo booked dates', blocked: 'Booked', checkoutOnly: 'Check-out only',
    guests: 'Guests', fewer: 'Remove a guest', more: 'Add a guest', submit: 'Preview dates',
    note: 'This is a preview only. Confirm availability with your host.',
    arrivalError: 'Choose a check-in date from today onward with no blocked night.',
    departureError: 'Choose a later check-out date that does not include a blocked night.',
    preview: 'Your selected stay', nights: 'Nights', guestTotal: 'Guests', contact: 'Contact the host', noScript: 'Contact your host to ask about stay dates.',
  },
};

const dates = Object.fromEntries(['lt', 'en'].map(locale => {
  const format = options => new Intl.DateTimeFormat(locale === 'lt' ? 'lt-LT' : 'en-GB', { timeZone: 'UTC', ...options });
  return [locale, { field: format({ dateStyle: 'medium' }), range: format({ dateStyle: 'long' }) }];
}));

const timeZone = 'Europe/Vilnius';
const calendarDate = day => TZDate.tz(timeZone, `${day}T12:00:00Z`);
// DayPicker returns TZDates, whose ISO string starts with the property's local day.
const dayKey = date => date.toISOString().slice(0, 10);

function addDays(day, count) {
  const date = new Date(day);
  date.setUTCDate(date.getUTCDate() + count);
  return date.toISOString().slice(0, 10);
}

const blockedNight = day => includesBlockedNights(day, addDays(day, 1));

export default function Reservation({ locale = 'lt' }) {
  const text = copy[locale];
  const format = dates[locale];
  const [calendar, setCalendar] = useState(null);
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState(2);
  const [issue, setIssue] = useState(null);
  const [preview, setPreview] = useState(null);
  const fields = useRef({});

  function show(field, day, today) {
    setCalendar({ field, day: day < today ? today : day, today });
  }

  function close(field) {
    setCalendar(null);
    fields.current[field]?.focus();
  }

  function open(field) {
    if (calendar?.field === field) return close(field);
    const today = kaunasToday();
    if (field === 'arrival' || arrival < today) return show('arrival', arrival || today, today);
    show(field, departure || addDays(arrival, 1), today);
  }

  function unavailable(day, today) {
    if (day < today) return true;
    if (calendar.field === 'arrival') return blockedNight(day);
    // Check-out may fall on a blocked night if none of the preceding nights are blocked.
    return arrival < today || day <= arrival || includesBlockedNights(arrival, day);
  }

  function pick(_, date) {
    const day = dayKey(date);
    const today = kaunasToday();
    if (unavailable(day, today)) {
      if (calendar.today !== today) show('arrival', arrival || today, today);
      return;
    }
    setIssue(null);
    if (calendar.field === 'arrival') {
      if (day !== arrival) {
        setArrival(day);
        setDeparture('');
        setPreview(null);
      }
      show('departure', day === arrival && departure ? departure : addDays(day, 1), today);
    } else {
      if (day !== departure) {
        setDeparture(day);
        setPreview(null);
      }
      close('departure');
    }
  }

  function submit(event) {
    event.preventDefault();
    const today = kaunasToday();
    const result = stay(arrival, departure, guests, today);
    if (!result) {
      const field = arrival < today || blockedNight(arrival) ? 'arrival' : 'departure';
      setPreview(null);
      setIssue(field);
      close(field);
      return;
    }
    setIssue(null);
    setCalendar(null);
    // shortcut: only a local preview; replace this step when a provider is connected.
    setPreview(result);
  }


  return <section className="reservation frame" id="rezervacija" aria-labelledby="booking-title">
    <h2 id="booking-title" className="reservation-title">{text.title}</h2>
    <noscript>
      <style>{'.reservation-form, #booking-note { display: none; }'}</style>
      <p>{text.noScript} <a href="#kontaktai">{text.contact}</a></p>
    </noscript>
    <form className="reservation-form" onSubmit={submit} aria-describedby="booking-note">
      <div className="reservation-dates" onKeyDown={event => {
        if (calendar && event.key === 'Escape') {
          event.preventDefault();
          close(calendar.field);
        }
      }}>
        {[['arrival', arrival], ['departure', departure]].map(([field, day]) =>
          <button key={field} type="button" className="reservation-field" ref={node => { fields.current[field] = node; }}
            onClick={() => open(field)} aria-expanded={calendar?.field === field} aria-controls="booking-calendar"
            aria-invalid={issue === field || undefined} aria-describedby={issue === field ? 'booking-error' : undefined}>
            <span>{text[field]}</span>
            <span>{day ? format.field.format(new Date(day)) : text.date}</span>
            <Icon name="chevron" />
          </button>
        )}
        <div className="reservation-calendar" id="booking-calendar" role="group" aria-labelledby="booking-instruction"
          aria-describedby={calendar && blockedDates.length > 0 ? 'booking-availability' : undefined} hidden={!calendar}>
          {calendar && <>
            <p id="booking-instruction">{text.pick[calendar.field]}</p>
            <DayPicker key={`${calendar.field}-${calendar.today}`} mode="range" onSelect={pick}
              locale={locale === 'lt' ? lt : enGB} timeZone={timeZone} autoFocus navLayout="around"
              today={calendarDate(calendar.today)} startMonth={calendarDate(calendar.today)} defaultMonth={calendarDate(calendar.day)}
              selected={arrival ? { from: calendarDate(arrival), to: departure ? calendarDate(departure) : undefined } : undefined}
              disabled={date => unavailable(dayKey(date), calendar.today)}
              modifiers={{ blocked: date => {
                const day = dayKey(date);
                return day >= calendar.today && blockedNight(day);
              } }} modifiersClassNames={{ blocked: 'reservation-blocked' }}
              labels={{
                labelPrevious: () => text.previous,
                labelNext: () => text.next,
                labelDayButton: (date, modifiers, options, dateLib) => {
                  const day = dayKey(date);
                  const endpoint = day === arrival ? text.arrival : day === departure ? text.departure : null;
                  return [dateLib.format(date, 'PPPP'), modifiers.today && text.today, endpoint,
                    modifiers.selected && text.selected, modifiers.blocked && (modifiers.disabled ? text.blocked : text.checkoutOnly),
                  ].filter(Boolean).join(', ');
                },
              }}
            />
            {blockedDates.length > 0 && <div className="reservation-legend" id="booking-availability">
              {availabilityMode === 'demo' && <p>{text.demoBooked}</p>}
              <span><span className="reservation-booked-sample" aria-hidden="true">12</span> {text.blocked}</span>
              <span className="reservation-checkout-key">{text.checkoutOnly}</span>
            </div>}
          </>}
        </div>
      </div>
      <div className="reservation-guests" role="group" aria-labelledby="booking-guests">
        <span id="booking-guests">{text.guests}</span>
        <div>{[-1, 0, 1].map(delta => delta === 0 ? <output key={delta} aria-label={text.guests}>{guests}</output> :
          <button key={delta} type="button" aria-label={delta < 0 ? text.fewer : text.more} aria-disabled={guests + delta < 1 || guests + delta > 8}
            onClick={() => {
              if (guests + delta < 1 || guests + delta > 8) return;
              setGuests(guests + delta);
              setPreview(null);
            }}>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d={delta === 1 ? 'M6 12h12m-6-6v12' : 'M6 12h12'} />
            </svg>
          </button>
        )}</div>
      </div>
      <button className="button button-dark reservation-submit" type="submit">{text.submit} <Icon name="arrow" /></button>
    </form>
    <p className="booking-note" id="booking-note">{text.note}</p>
    {issue && <p className="booking-error" id="booking-error" role="alert">{text[`${issue}Error`]}</p>}
    <div aria-live="polite">
      {preview && <div className="booking-result">
        <div><h3>{text.preview}</h3><p>{format.range.formatRange(new Date(preview.arrival), new Date(preview.departure))} · {text.nights}: {preview.nights} · {text.guestTotal}: {preview.guests}</p></div>
        <a className="text-link" href="#kontaktai">{text.contact} <Icon name="arrow" /></a>
      </div>}
    </div>
  </section>;
}
