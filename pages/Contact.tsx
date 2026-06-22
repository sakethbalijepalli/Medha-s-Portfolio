
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { SOCIAL_LINKS } from '../constants';

const EMAILJS_PUBLIC_KEY          = 'hH3S3b-dWVLUkbNOF';
const EMAILJS_SERVICE_ID          = 'service_ts9oglm';
const EMAILJS_NOTIFICATION_TPL    = 'template_nhez0n9';
const EMAILJS_AUTOREPLY_TPL       = 'template_fd010hk';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

// Cloudflare test key for localhost dev (always passes); real key for production
const TURNSTILE_SITE_KEY = import.meta.env.DEV
  ? '1x00000000000000000000AA'
  : '0x4AAAAAADn5rCTLgaQbZP2x';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const SUBJECTS = [
  'Performance Booking',
  'Workshop / Masterclass',
  'Collaboration',
  'Press Inquiry',
  'Other',
];

const TurnstileWidget: React.FC<{ onToken: (token: string) => void }> = ({ onToken }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef  = useRef<string>('');

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const renderWidget = () => {
      if (containerRef.current && window.turnstile && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: onToken,
          'expired-callback': () => onToken(''),
          'error-callback':   () => onToken(''),
          theme: 'auto',
        });
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      // Poll until the Turnstile script loads (max 10 s)
      let attempts = 0;
      intervalId = setInterval(() => {
        if (window.turnstile) {
          clearInterval(intervalId!);
          intervalId = null;
          renderWidget();
        } else if (++attempts >= 50) {
          clearInterval(intervalId!);
          intervalId = null;
        }
      }, 200);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = '';
      }
    };
  }, []); // onToken is setTurnstileToken — stable across renders

  return <div ref={containerRef} />;
};

const Contact: React.FC = () => {
  const [form, setForm]               = useState<FormData>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [status, setStatus]           = useState<FormStatus>('idle');
  const [errors, setErrors]           = useState<Partial<FormData>>({});
  const [newsletter, setNewsletter]   = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle'|'loading'|'success'>('idle');
  const [newsletterEmail, setNewsletterEmail]   = useState('');

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim())    errs.name    = 'Name is required.';
    if (!form.email.trim())   errs.email   = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.subject)        errs.subject = 'Please select a subject.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!turnstileToken) {
      alert('Please complete the CAPTCHA verification.');
      return;
    }

    setStatus('loading');

    try {
      const templateParams = {
        from_name:  form.name,
        from_email: form.email,
        phone:      form.phone || 'Not provided',
        subject:    form.subject,
        message:    form.message,
        newsletter: newsletter ? 'Yes — please add to list' : 'No',
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_NOTIFICATION_TPL, templateParams, { publicKey: EMAILJS_PUBLIC_KEY });
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_TPL,    templateParams, { publicKey: EMAILJS_PUBLIC_KEY });

      if (newsletter) {
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, name: form.name }),
        });
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setNewsletter(false);
      setTurnstileToken('');
    } catch {
      setStatus('error');
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (!res.ok) throw new Error();
      setNewsletterStatus('success');
    } catch {
      setNewsletterStatus('idle');
    }
  };

  const inputCls = (field: keyof FormData) =>
    `w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? 'border-red-400 focus:ring-red-200 dark:focus:ring-red-900'
        : 'border-gray-200 dark:border-gray-700 focus:border-gold-400 focus:ring-gold-100 dark:focus:ring-gold-900/30'
    }`;

  return (
    <div className="pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">Reach Out</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-gray-900 dark:text-white">
            Get in <span className="italic text-gold-500">touch</span>
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-md mx-auto text-base">
            For bookings, collaborations, press inquiries, or anything else — Medha would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">

          {/* ── Left panel ── */}
          <div className="lg:col-span-2 space-y-10 animate-slide-in-left">
            {/* Email */}
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Email</p>
              <a
                href="mailto:m3dh5.dance@gmail.com"
                className="font-display text-xl text-gray-900 dark:text-white hover:text-gold-500 dark:hover:text-gold-400 transition-colors"
              >
                m3dh5.dance@gmail.com
              </a>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Follow</p>
              <div className="flex gap-5">
                {SOCIAL_LINKS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-500 dark:text-gray-400 ${s.hover} transition-colors duration-300`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Based in */}
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Based in</p>
              <p className="text-gray-700 dark:text-gray-300">United States &amp; India</p>
            </div>

            {/* Available for */}
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">Available for</p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {['Solo Performances', 'Lecture Demonstrations', 'Workshops & Masterclasses', 'Choreography', 'Collaboration & Events', 'Press & Interviews'].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="lg:col-span-3 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-10">
                <div className="w-16 h-16 rounded-full bg-gold-50 dark:bg-gold-900/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl font-light text-gray-900 dark:text-white mb-3">Message sent!</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-xs">
                  Thank you for reaching out. Medha will get back to you soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-sm text-gold-500 hover:underline underline-offset-4 font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 md:p-10 space-y-5"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 mb-1.5">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputCls('name')}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputCls('email')}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 mb-1.5">
                      Phone <span className="text-gray-300">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className={inputCls('phone')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 mb-1.5">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`${inputCls('subject')} appearance-none`}
                    >
                      <option value="">Select a subject</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell Medha about your event, vision, or inquiry…"
                    className={`${inputCls('message')} resize-none`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Newsletter opt-in */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={e => setNewsletter(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-gold-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Subscribe to Medha's newsletter for show announcements and updates.
                  </span>
                </label>

                {/* Cloudflare Turnstile — mounts/unmounts with the form so widget always re-renders */}
                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Verification</p>
                  <div className="turnstile-container">
                    <TurnstileWidget onToken={setTurnstileToken} />
                  </div>
                  {!turnstileToken && (
                    <p className="text-xs text-gray-400 mt-2">
                      Please complete the security check above before sending.
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium tracking-widest uppercase rounded-xl hover:bg-gold-500 dark:hover:bg-gold-400 dark:hover:text-white disabled:opacity-60 transition-colors duration-300"
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </button>

                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">
                    Something went wrong. Please try again or email directly.
                  </p>
                )}

                <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                  Protected by Cloudflare Turnstile. Your information is never shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* ── Newsletter Section ── */}
        <div className="mt-20 max-w-2xl mx-auto bg-gray-950 dark:bg-black rounded-2xl p-8 md:p-10 text-center">
          <p className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-3">Newsletter</p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-2">
            Stay in the loop
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            New shows, rehearsal journals, and dance conversations — straight to your inbox.
          </p>

          {newsletterStatus === 'success' ? (
            <p className="text-gold-400 font-light">You're subscribed — thank you!</p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold-400 transition-colors"
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="flex-shrink-0 px-6 py-3 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-white text-sm font-medium tracking-widest uppercase rounded-full transition-colors duration-300"
              >
                {newsletterStatus === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact;
