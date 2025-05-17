import React from "react";
import Link from "next/link";
import { Github, Facebook, Twitter, Linkedin } from "lucide-react";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <Logo size="md" className="flex flex-col items-center justify-center"  />
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-md font-semibold text-foreground">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-foreground transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-md font-semibold text-foreground">Follow Us</h3>
          <div className="flex items-center space-x-4 mt-2">
            <Link
              href="https://github.com"
              target="_blank"
              className="hover:text-foreground"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              className="hover:text-foreground"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-foreground"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-foreground"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border text-center py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Product-management. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
