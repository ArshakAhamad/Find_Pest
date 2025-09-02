import React, { useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col">
      <header>
        <nav className="fixed top-0 left-0 w-full bg-green-800 text-white border-b-4 border-green-900 shadow-lg transition-colors duration-300 z-10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center">
                <svg
                  width="140"
                  height="50"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:w-[180px] lg:h-[60px]"
                >
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
                  <text
                    x="32"
                    y="16"
                    fontFamily="Arial, sans-serif"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#2E7D32"
                  >
                    FIND
                  </text>
                  <text
                    x="32"
                    y="28"
                    fontFamily="Arial, sans-serif"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#4CAF50"
                  >
                    PEST
                  </text>
                </svg>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-4">
                <a
                  href="/homepage"
                  className="font-bold rounded-lg px-4 py-3 text-white bg-green-700 hover:bg-green-800 transition-colors duration-200"
                >
                  Home
                </a>
                <Link
                  to="/EducationalResourcesPage#service"
                  className="font-bold rounded-lg px-4 py-3 text-white bg-green-700 hover:bg-green-800 transition-colors duration-200"
                >
                  Service
                </Link>
                <a
                  href="/AboutUs"
                  className="font-bold rounded-lg px-4 py-3 text-white bg-green-700 hover:bg-green-800 transition-colors duration-200"
                >
                  About Us
                </a>
                <a
                  href="#contact-footer"
                  className="font-bold rounded-lg px-4 py-3 text-white bg-green-700 hover:bg-green-800 transition-colors duration-200"
                >
                  Contact
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-white hover:text-green-300 focus:outline-none focus:text-green-300 transition duration-150 ease-in-out p-2 rounded-md"
                  style={{ backgroundColor: "#3d8c40" }}
                  aria-label="Toggle menu"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                      <path
                        fillRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
              className={`lg:hidden transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "max-h-64 opacity-100 visible"
                  : "max-h-0 opacity-0 invisible"
              } overflow-hidden`}
            >
              <div
                className="px-2 pt-2 pb-4 space-y-2 bg-green-700 rounded-b-lg"
                style={{ backgroundColor: "#3d8c40" }}
              >
                <a
                  href="/homepage"
                  className="block font-bold rounded-lg px-4 py-3 text-white bg-green-600 hover:bg-green-800 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <Link
                  to="/EducationalResourcesPage#service"
                  className="block font-bold rounded-lg px-4 py-3 text-white bg-green-600 hover:bg-green-800 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Service
                </Link>
                <a
                  href="/AboutUs"
                  className="block font-bold rounded-lg px-4 py-3 text-white bg-green-600 hover:bg-green-800 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </a>
                <a
                  href="#contact-footer"
                  className="block font-bold rounded-lg px-4 py-3 text-white bg-green-600 hover:bg-green-800 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Homepage;
