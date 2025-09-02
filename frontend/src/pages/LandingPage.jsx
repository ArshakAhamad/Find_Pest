import React from "react";
import { Link } from "react-router-dom";

// Move AchievementNumber component to the top
function AchievementNumber({ end, suffix = "", label, decimals = 0 }) {
  const [number, setNumber] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = (end - start) / (duration / 16);
    let current = start;
    const step = () => {
      current += increment;
      if (
        (increment > 0 && current >= end) ||
        (increment < 0 && current <= end)
      ) {
        setNumber(end);
        return;
      }
      setNumber(Number(current.toFixed(decimals)));
      requestAnimationFrame(step);
    };
    step();
    // eslint-disable-next-line
  }, [end, decimals]);

  return (
    <div>
      <div className="text-5xl font-bold text-green-400 mb-2">
        {number}
        {suffix}
      </div>
      <div className="text-gray-300">{label}</div>
    </div>
  );
}

const LandingPage = () => {
  return (
    <div className="container mx-auto px-6 py-8 pt-24">
      {/* Hero Section */}
      <main className="space-y-16">
        <section
          className="bg-cover bg-center bg-no-repeat filter brightness-90 contrast-90 rounded-3xl p-20 text-center space-y-6"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-vector/rural-landscape-with-wheat-field-blue-sky-background-vector-illustration_174639-42519.jpg')",
          }}
        >
          <h1 className="text-4xl font-bold italic text-green-800">
            Welcome to Find Pest.. 🌱
          </h1>
          <p className="text-xl text-green-700">
            Your go-to AI platform for identifying and managing agricultural
            pests.
          </p>
          <br />
          <Link
            to={"/Detection#file"}
            className="text-white animate-bounce bg-gradient-to-br from-green-600 to-green-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Detect Pest Now
          </Link>
          <br />
          <br />
          <p className="text-xl font-bold italic text-black">
            Simply capture or upload an image of the pest, and our AI instantly
            analyzes it to identify the species and provide complete management
            guidance - all in your browser, no downloads required.
          </p>
        </section>

        {/* Achievements */}
        <section className="bg-green-800 text-white rounded-xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-white mb-6">Our Impact</h2>
          <br />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <AchievementNumber end={87} suffix="%" label="Detection Accuracy" />
            <AchievementNumber
              end={15}
              suffix="+"
              label="Pest Species Identified"
            />
            <AchievementNumber
              end={2.1}
              decimals={1}
              suffix="s"
              label="Average Response Time"
            />
            <AchievementNumber end={127} suffix="+" label="Active Users" />
          </div>
        </section>

        {/* Educational Preview Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white rounded-xl p-12 text-center">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Learn Beyond Detection
              </h2>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                Get comprehensive pest knowledge including biology, lifecycle,
                damage patterns, and proven management strategies
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Sample Pest Card 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://www.koppert.com/content/_processed_/e/f/csm_cotton_aphid_aphis_gossypii_on_leaf_koppert_00b27b290b.jpg"
                  alt="Aphid identification"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-green-800 mb-2">
                    Cotton Aphid
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Small, soft-bodied insects that cluster on leaves and stems,
                    causing yellowing and stunted growth.
                  </p>
                  <div className="space-y-2 text-sm">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      Biological Control
                    </span>
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      Chemical Treatment
                    </span>
                  </div>
                </div>
              </div>

              {/* Sample Pest Card 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://cesaraustralia.com/wp-content/uploads/2020/11/armyworm-curled-Julia-Severi-Cesar-Australia-675x405.jpg"
                  alt="Caterpillar identification"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-green-800 mb-2">
                    Armyworm
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Destructive caterpillars that feed on leaves, often moving
                    in groups and causing severe defoliation.
                  </p>
                  <div className="space-y-2 text-sm">
                    <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                      Cultural Control
                    </span>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      Prevention
                    </span>
                  </div>
                </div>
              </div>

              {/* Sample Pest Card 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://www.whygoodnature.com/hs-fs/hubfs/Striped%20Cucumber%20Beetle.jpg?width=1280&name=Striped%20Cucumber%20Beetle.jpg"
                  alt="Beetle identification"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-green-800 mb-2">
                    Cucumber Beetle
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Yellow-green beetles that damage leaves and transmit
                    bacterial diseases to cucurbit crops.
                  </p>
                  <div className="space-y-2 text-sm">
                    <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                      Integrated Management
                    </span>
                    <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full">
                      Early Detection
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Resources Preview */}
            <div className="bg-green-700 rounded-xl p-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Complete Learning Resources
              </h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-white">
                    Pest Biology
                  </h4>
                  <p className="text-gray-200 font-bold">
                    Lifecycle stages, behavior patterns, and identification
                    features
                  </p>
                </div>
                <div>
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-white">
                    Management Strategies
                  </h4>
                  <p className="text-gray-200 font-bold">
                    Proven treatment methods and prevention techniques
                  </p>
                </div>
                <div>
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-white">
                    Video Tutorials
                  </h4>
                  <p className="text-gray-200 font-bold">
                    Step-by-step guidance from agricultural experts
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <a
                href="/EducationalResourcesPage"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 inline-block"
              >
                Explore All Educational Resources
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
