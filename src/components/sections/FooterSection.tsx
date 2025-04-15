import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, FileText, Building2, ExternalLink } from 'lucide-react';
import logo from '../../assets/logo/logo.svg';
import logoHeader from '../../assets/logo/logo-header.svg';

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function ContactItem({ icon, title, children }: ContactItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-12 h-12 bg-beige-400/10 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      {children}
    </motion.div>
  );
}

export function FooterSection() {
  return (
    <footer id="kontakt" className="relative bg-gradient-to-b from-white to-cream-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={logo}
          alt=""
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] opacity-[0.03] -rotate-[15deg] text-beige-200"
        />
      </div>
      <div className="container mx-auto px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-serif text-gray-800 mb-4">Skontaktuj się z nami</h2>
          <div className="w-24 h-1 bg-beige-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Jesteśmy tu, aby wspierać i pomagać. Skontaktuj się z nami,
            aby dowiedzieć się więcej o naszych działaniach lub dołączyć do naszej społeczności.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto mb-20">
          <ContactItem icon={<MapPin className="w-6 h-6 text-beige-400" />} title="Adres">
            <address className="not-italic text-gray-600">
              ul. Filtrowa 27<br />
              85-467 Bydgoszcz
            </address>
          </ContactItem>

          <ContactItem icon={<Mail className="w-6 h-6 text-beige-400" />} title="Email">
            <a
              href="mailto:stowarzyszenie.wytchnienie@gmail.com"
              className="text-gray-600 hover:text-beige-400 transition-colors"
            >
              stowarzyszenie.wytchnienie@gmail.com
            </a>
          </ContactItem>

          <ContactItem icon={<Phone className="w-6 h-6 text-beige-400" />} title="Telefon">
            <a
              href="tel:+48696372212"
              className="text-gray-600 hover:text-beige-400 transition-colors"
            >
              +48 696 372 212
            </a>
          </ContactItem>

          <ContactItem icon={<Clock className="w-6 h-6 text-beige-400" />} title="Godziny otwarcia">
            <div className="text-gray-600">
              Poniedziałek - Piątek<br />
              9:00 - 17:00
            </div>
          </ContactItem>
        </div>

        <div className="border-t border-beige-200/50 pt-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-6">
              <img src={logoHeader} alt="Logo" className="h-16 w-auto" />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-gray-800 font-medium flex items-center gap-2">
                <Building2 className="w-5 h-5 text-beige-400" />
                Dane organizacji
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>NIP: 967-148-22-61</p>
                <p>Stowarzyszenie dla kobiet „Wytchnienie"</p>
                <p>ul. Filtrowa 27, 85-467 Bydgoszcz</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-gray-800 font-medium flex items-center gap-2">
                <FileText className="w-5 h-5 text-beige-400" />
                Dokumenty
              </h3>
              <div className="flex flex-col space-y-2">
                <a
                  href="/images/StatutStowarzyszenia.pdf"
                  download
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-beige-400 transition-colors group"
                >
                  <span>Statut Stowarzyszenia</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="/images/PolitykaPrywatnosci.pdf"
                  download
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-beige-400 transition-colors group"
                >
                  <span>Polityka Prywatności</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-beige-200/30 pt-6 text-center text-sm text-gray-500">
            © 2025 Stowarzyszenie dla kobiet „Wytchnienie". Wszystkie prawa zastrzeżone.
          </div>
        </div>
      </div>
    </footer>
  );
}