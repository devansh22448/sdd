import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Youtube,
  LayoutDashboard,
  FileText,
  Rocket,
  Settings,
  Activity,
} from "lucide-react";

const FOOTER_DATA = {
  contactEmail: "support@smartdevops.com",
  contactPhone: "+1 234 567 890",
  address: "San Francisco, CA",
  description:
    "Smart DevOps Dashboard - Monitor your deployments, logs, metrics, and infrastructure in real-time.",
  socialLinks: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
  quickLinks: [
    { label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
    { label: "Logs", path: "/logs", icon: "FileText" },
    { label: "Deployments", path: "/deployments", icon: "Rocket" },
    { label: "Settings", path: "/settings", icon: "Settings" },
  ],
};

const iconMap = {
  LayoutDashboard,
  FileText,
  Rocket,
  Settings,
};

const Footer = () => {
  const { contactEmail, contactPhone, address, description, socialLinks, quickLinks } = FOOTER_DATA;

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  return (
    <footer className="bg-devops-bg border-t border-devops-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-devops-purple to-devops-purple-light rounded-xl flex items-center justify-center shadow-lg shadow-devops-purple/20">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-devops-text font-bold text-lg">
                Smart DevOps
              </span>
            </div>
            <p className="text-devops-text-secondary text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-devops-text font-semibold text-lg">Contact</h3>
            <ul className="space-y-3">
              {contactEmail && (
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex items-center space-x-2 text-devops-text-secondary hover:text-devops-purple-light transition-colors duration-200 group"
                  >
                    <Mail className="w-4 h-4 text-devops-purple group-hover:text-devops-purple-light" />
                    <span className="text-sm">{contactEmail}</span>
                  </a>
                </li>
              )}
              {contactPhone && (
                <li>
                  <a
                    href={`tel:${contactPhone}`}
                    className="flex items-center space-x-2 text-devops-text-secondary hover:text-devops-purple-light transition-colors duration-200 group"
                  >
                    <Phone className="w-4 h-4 text-devops-purple group-hover:text-devops-purple-light" />
                    <span className="text-sm">{contactPhone}</span>
                  </a>
                </li>
              )}
              {address && (
                <li>
                  <div className="flex items-center space-x-2 text-devops-text-secondary group">
                    <MapPin className="w-4 h-4 text-devops-purple group-hover:text-devops-purple-light" />
                    <span className="text-sm">{address}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-devops-text font-semibold text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="flex items-center space-x-2 text-devops-text-secondary hover:text-devops-purple-light transition-all duration-200 group"
                  >
                    {link.icon && getIcon(link.icon)}
                    <span className="text-sm group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h3 className="text-devops-text font-semibold text-lg">Follow Us</h3>
            <div className="flex space-x-3">
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-devops-card rounded-xl flex items-center justify-center text-devops-text-secondary hover:bg-devops-purple hover:text-white transition-all duration-200 hover:shadow-lg hover:shadow-devops-purple/20"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-devops-card rounded-xl flex items-center justify-center text-devops-text-secondary hover:bg-devops-purple hover:text-white transition-all duration-200 hover:shadow-lg hover:shadow-devops-purple/20"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-devops-card rounded-xl flex items-center justify-center text-devops-text-secondary hover:bg-devops-purple hover:text-white transition-all duration-200 hover:shadow-lg hover:shadow-devops-purple/20"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-devops-card rounded-xl flex items-center justify-center text-devops-text-secondary hover:bg-devops-purple hover:text-white transition-all duration-200 hover:shadow-lg hover:shadow-devops-purple/20"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-devops-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-devops-text-secondary text-sm">
              © {new Date().getFullYear()} Smart DevOps Dashboard. All rights
              reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-devops-success">●</span>
              <span className="text-devops-text-secondary text-sm">System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
