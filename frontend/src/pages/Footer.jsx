import React from "react";

const Footer = () => {
  return (
    <footer
      id="contact-footer"
      className="bg-green-800 text-white absolute left-0 w-full py-10"
    >
      <div className="w-full px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 mb-8 grid-cols-1 md:grid-cols-3">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <a
                href="/"
                aria-label="Go home"
                title="Find Pest"
                className="inline-flex items-center mb-4"
              >
                <svg
                  width="280"
                  height="100"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Leaf/Plant Icon */}
                  <path
                    d="M8 20c0-8 4-12 8-12s8 4 8 12-4 12-8 12-8-4-8-12z"
                    fill="#4CAF50"
                    opacity="0.8"
                  />
                  <path
                    d="M12 16c2-4 6-6 8-2s0 8-4 8-4-2-4-6z"
                    fill="#2E7D32"
                  />
                  <circle cx="18" cy="20" r="2" fill="#FF6B35" />

                  {/* Text */}
                  <text
                    x="32"
                    y="16"
                    font-family="Arial, sans-serif"
                    font-size="14"
                    font-weight="bold"
                    fill="#2E7D32"
                  >
                    FIND
                  </text>
                  <text
                    x="32"
                    y="28"
                    font-family="Arial, sans-serif"
                    font-size="14"
                    font-weight="bold"
                    fill="#4CAF50"
                  >
                    PEST
                  </text>
                </svg>
              </a>
              <div className="max-w-sm">
                <p className="text-gray-200 leading-relaxed mb-3 text-sm">
                  More than just pest identification – we're your complete
                  agricultural learning companion. Discover pest biology,
                  explore prevention strategies, watch expert tutorials, and
                  build the knowledge needed for successful crop protection.
                  Education and technology, growing together.
                </p>
                <p className="text-xs font-bold text-green-300">
                  🌱 Save Plants & Save Lives
                </p>
              </div>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="text-base font-bold text-white mb-4">Contacts</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400 block">Phone:</span>
                  <a
                    href="tel:+94757110053"
                    className="text-green-300 hover:text-green-200 transition-colors duration-300"
                  >
                    +94-7571-10053
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block">Email:</span>
                  <a
                    href="mailto:info@findpest.com"
                    className="text-green-300 hover:text-green-200 transition-colors duration-300"
                  >
                    info@findpest.com
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block">Address:</span>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-300 hover:text-green-200 transition-colors duration-300"
                  >
                    22/3, Green Field, Kalmunai, Sri Lanka
                  </a>
                </div>
              </div>
            </div>

            {/* Social & Links */}
            <div>
              <h3 className="text-base font-bold text-white mb-4">Follow Us</h3>

              {/* Social Icons */}
              <div className="flex items-center space-x-2 mb-4">
                <a
                  href="#"
                  className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3 w-3 text-white"
                  >
                    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg
                    viewBox="0 0 30 30"
                    fill="currentColor"
                    className="h-3 w-3 text-white"
                  >
                    <circle cx="15" cy="15" r="4"></circle>
                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3 w-3 text-white"
                  >
                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z"></path>
                  </svg>
                </a>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Connect with our growing community of farmers, researchers, and
                agricultural enthusiasts. Follow us for pest alerts, farming
                tips, success stories, and the latest updates in agricultural
                technology.
              </p>

              {/* Footer Links */}
              {/*         <div>
                <h3 className="text-base font-bold text-white mb-3">
                  Quick Links
                </h3>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="/faq"
                      className="text-gray-300 hover:text-green-300 transition-colors duration-300 text-sm"
                    >
                      F.A.Q
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy"
                      className="text-gray-300 hover:text-green-300 transition-colors duration-300 text-sm"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      className="text-gray-300 hover:text-green-300 transition-colors duration-300 text-sm"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-green-700 pt-4 text-center">
            <p className="text-gray-300 text-xs">
              © Copyright 2025 Find Pest. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
