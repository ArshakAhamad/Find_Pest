import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen-10vh">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-25">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-600 rounded-xl text-white py-30">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About Our Find Pest
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Pest Image + Upload = Results
              </p>
            </div>
          </div>
        </section>
        <br />
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-green-900 mb-6">
                Our Story
              </h2>
              <p className="text-2xl text-green-700 mb-4 font-mono font-bold ">
                " Find Pest was founded in 2019 with a radical idea: that
                artificial intelligence should enhance human decision-making
                rather than replace it. Our team of neuroscientists and machine
                learning experts set out to create a new paradigm in AI.
              </p>
              <p className="text-2xl text-green-700 mb-4 font-mono font-bold ">
                Today, we're recognized as pioneers in cognitive computing, with
                our technology powering some of the world's most innovative
                companies across healthcare, finance, and creative industries.
              </p>
              <p className="text-2xl text-green-700 mb-4 font-mono font-bold ">
                Our name reflects our philosophy - we synthesize human-like
                understanding with machine precision to create truly intelligent
                systems."
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://cdn.prod.website-files.com/680a070c3b99253410dd3df5/684d86512575826aacdc2427_67ed56b0af0ccf7219abfcdf_66eab750d81f71f35b9e90c0_66eab6cbe640fd7dcaaec2f3_Pests_Fig%252525203.png"
                alt="AI Neural Network Visualization"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="bg-gradient-to-br from-green-600 to-secondary-800 rounded-xl p-12 mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-green-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl font-bold text-gray-700 mb-8">
              "To create symbiotic intelligence systems that amplify human
              potential while maintaining ethical boundaries and transparency."
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="bg-gray-50 p-6 rounded-xl shadow-lg w-full sm:w-64">
                <div className="text-primary-600 mb-4">
                  <i className="fas fa-lightbulb text-3xl"></i>
                </div>
                <h3 className="font-bold text-dark mb-2">
                  Augmented Intelligence
                </h3>
                <p className="text-gray-600">
                  We build tools that enhance human cognition, not replace it.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-lg w-full sm:w-64">
                <div className="text-primary-600 mb-4">
                  <i className="fas fa-shield-alt text-3xl"></i>
                </div>
                <h3 className="font-bold text-dark mb-2">Ethical Framework</h3>
                <p className="text-gray-600">
                  Every system undergoes rigorous ethical review before
                  deployment.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-lg w-full sm:w-64">
                <div className="text-primary-600 mb-4">
                  <i className="fas fa-project-diagram text-3xl"></i>
                </div>
                <h3 className="font-bold text-dark mb-2">Neural Synthesis</h3>
                <p className="text-gray-600">
                  Our proprietary architecture mimics human neural pathways.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-20 ">
          <h2 className="text-3xl font-bold text-green-900 mb-6">
            Meet Our Leadership
          </h2>
          <div className="grid grid-cols-1  md:grid-cols-3 gap-8 ">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQH0ZLANhxVSOQ/profile-displayphoto-crop_800_800/B4EZfqsvdhGwAI-/0/1751989289781?e=1759363200&v=beta&t=H_tntfzwMprSGFJkE8io6CQJ2zZOJkEDnmMoNP_MHjE"
                alt="CEO"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl text-green-800 mb-1">
                  Arshak Ahamed Sajahan
                </h3>
                <p className="text-green-600 font-medium mb-3">CEO</p>
                <p className="text-gray-600">
                  Author of "Find Pest" and Senior Software Engineer at Find
                  Pest.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E16AQHMT9aLbAjuQQ/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1726473170369?e=1759363200&v=beta&t=B-ofm2SvdumEArOM6OhqvqXpFVp_peEDDdd5bRvt8Mc"
                alt="CTO"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl text-green-800 mb-1">
                  Fathima Jesa Rafeek
                </h3>
                <p className="text-green-600 font-medium mb-3">
                  Chief Technology Officer
                </p>
                <p className="text-gray-600">Software Engineer at Find Pest.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-green-800 text-white rounded-xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-green-300 mb-6">Our Impact</h2>
          <br />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">87%</div>
              <div className="text-gray-300">Detection Accuracy</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">15+</div>
              <div className="text-gray-300">Pest Species Identified</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">2.1s</div>
              <div className="text-gray-300">Average Response Time</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">127+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-green-600 to-secondary-600 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Experience the SynthMind Difference
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join forward-thinking organizations leveraging our cognitive AI
            platform.
          </p>
          <button className="bg-white text-primary-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg">
            Schedule a Demo
          </button>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
