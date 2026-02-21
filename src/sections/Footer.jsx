import { Link } from "react-router-dom";
import {
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  FacebookIcon,
} from "lucide-react";

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
];

const Footer = () => (
  <footer className="bg-foreground text-background py-16">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img
              src="/logo.jpg"
              alt="marketr"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="text-xl font-extrabold">marketr</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Growth-first marketing for ambitious brands. Strategy, creativity,
            and data — all under one roof.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-70">
            {quickLinks.map((l) => (
              <li key={l.label}>
                {l.href.startsWith("/") ? (
                  <Link
                    to={l.href}
                    className="hover:opacity-100 transition-opacity"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    className="hover:opacity-100 transition-opacity"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold mb-4">Services</h4>
          <ul className="space-y-2 text-sm opacity-70">
            {["Social Media", "Branding", "Paid Ads", "SEO", "Content"].map(
              (s) => (
                <li key={s}>{s}</li>
              )
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> marketr.smma@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> +639383194873
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Butuan City, Philippines
            </li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              aria-label="Instagram"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 pt-6 text-center text-sm opacity-50">
        © {new Date().getFullYear()} marketr. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
