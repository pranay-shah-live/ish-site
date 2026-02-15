import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { companyInfo } from '@/data/content';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', message: '',
  });
  const [status, setStatus] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post(`${API}/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section
      ref={ref}
      className="bg-foreground py-16 md:py-24"
      aria-labelledby="contact-heading"
      data-testid="contact-cta-section"
    >
      <div className={`max-w-7xl mx-auto px-4 md:px-8 reveal ${inView ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2
              id="contact-heading"
              className="font-heading text-4xl md:text-5xl font-bold uppercase text-white mb-6"
            >
              Let's Work<br />Together
            </h2>
            <p className="font-body text-lg text-gray-300 mb-10 max-w-md leading-relaxed">
              Need ISL interpretation, accessibility consulting, or want to make your content inclusive? Get in touch.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${companyInfo.email}`}
                className="brutalist-btn bg-white text-black px-6 py-4 text-base w-full sm:w-auto"
                data-testid="contact-email-button"
              >
                <Mail size={20} aria-hidden="true" />
                {companyInfo.email}
              </a>
              <a
                href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                className="brutalist-btn bg-secondary text-black px-6 py-4 text-base w-full sm:w-auto block sm:inline-flex"
                data-testid="contact-phone-button"
              >
                <Phone size={20} aria-hidden="true" />
                {companyInfo.phone}
              </a>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block font-heading text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border-2 border-gray-600 text-white font-body text-base focus:border-accent focus:outline-none transition-colors"
                    placeholder="Your name"
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-heading text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border-2 border-gray-600 text-white font-body text-base focus:border-accent focus:outline-none transition-colors"
                    placeholder="you@company.com"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block font-heading text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border-2 border-gray-600 text-white font-body text-base focus:border-accent focus:outline-none transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                    data-testid="contact-phone-input"
                  />
                </div>
                <div>
                  <label htmlFor="contact-company" className="block font-heading text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Organization
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border-2 border-gray-600 text-white font-body text-base focus:border-accent focus:outline-none transition-colors"
                    placeholder="Your company"
                    data-testid="contact-company-input"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="block font-heading text-xs uppercase tracking-widest text-gray-400 mb-2">
                  Your Requirement *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border-2 border-gray-600 text-white font-body text-base focus:border-accent focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project or requirement..."
                  data-testid="contact-message-input"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="brutalist-btn bg-accent text-black px-8 py-4 text-base w-full sm:w-auto disabled:opacity-50"
                data-testid="contact-submit-button"
              >
                <Send size={18} aria-hidden="true" />
                {status === 'sending' ? 'Sending...' : 'Send Requirement'}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 font-body mt-2" role="alert" data-testid="contact-success-message">
                  <CheckCircle size={20} />
                  <span>Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 font-body mt-2" role="alert" data-testid="contact-error-message">
                  <AlertCircle size={20} />
                  <span>Something went wrong. Please try again or email us directly.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-gray-500">
            &copy; {new Date().getFullYear()} India Signing Hands. All rights reserved.
          </p>
          <a
            href={companyInfo.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            data-testid="footer-youtube-link"
          >
            YouTube / ISH News
          </a>
        </div>
      </div>
    </section>
  );
}
