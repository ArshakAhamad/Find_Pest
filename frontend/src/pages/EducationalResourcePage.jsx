import React, { useState } from "react";

const EducationalResources = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Resources", count: 45 },
    { id: "identification", name: "Pest ID Guides", count: 12 },
    { id: "management", name: "Management Strategies", count: 15 },
    { id: "videos", name: "Video Tutorials", count: 8 },
    { id: "downloads", name: "Downloadable PDFs", count: 6 },
    { id: "guides", name: "Online Guides", count: 4 },
  ];

  const resources = [
    {
      id: 1,
      title: "Complete Insect Identification Guide",
      type: "identification",
      format: "Visual Guide",
      duration: "15 min read",
      description:
        "Comprehensive guide to identifying different insect species, lifecycle stages, and damage patterns.",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
      LearnMore:
        "https://www.gardeningknowhow.com/plant-problems/pests/insects",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Integrated Pest Management for Tomatoes",
      type: "management",
      format: "Strategy Guide",
      duration: "25 min read",
      description:
        "Step-by-step IPM approach for common tomato pests including prevention and treatment protocols.",
      image:
        "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=300&h=200&fit=crop",
      downloadUrl:
        "https://hgic.clemson.edu/factsheet/tomato-diseases-disorders/",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Pest Detection Camera Techniques",
      type: "videos",
      format: "Video Tutorial",
      duration: "12 minutes",
      description:
        "Learn optimal lighting, angles, and distance for accurate pest photos using smartphone cameras.",
      image:
        "https://media.licdn.com/dms/image/v2/D5612AQFYzm0TRLev0g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1707276051157?e=2147483647&v=beta&t=nK9P3N4gn69Ox29wcY8mb83uG2PVTEX5ng1Vea-Cvlw",
      videoUrl: "https://www.youtube.com/watch?v=PZfegk3iBow&t=285s",
      difficulty: "Beginner",
    },

    {
      id: 5,
      title: "Seasonal Pest Calendar Template",
      type: "downloads",
      format: "PDF Template",
      duration: "Instant download",
      description:
        "Customizable calendar template for tracking seasonal pest activity in your region.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      downloadUrl:
        "https://safoam.org.in/admin/assets/upload/products/61601.Pest%20Weather%20Calendars-new%20(1).pdf",
      difficulty: "All Levels",
    },
    {
      id: 6,
      title: "Biological Control Methods Handbook",
      type: "management",
      format: "Research Guide",
      duration: "45 min read",
      description:
        "Evidence-based biological pest control methods with application guidelines and effectiveness data.",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2024/8/446290437/JP/IH/BD/82188936/biological-pest-control.jpg",
      downloadUrl: "https://www.fao.org/3/y5110e/y5110e00.htm",
      difficulty: "Advanced",
    },
  ];

  const filteredResources =
    activeCategory === "all"
      ? resources
      : resources.filter((resource) => resource.type === activeCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 pt-24">
      {/* Hero Section */}
      <section
        id="service"
        className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Educational Resources
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive learning materials to enhance your pest identification
            and management skills
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-green-700 to-green-500 text-white"
                    : "bg-white  hover:bg-green-50"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      resource.difficulty
                    )}`}
                  >
                    {resource.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">
                    {resource.format}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {resource.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-green-600 font-medium">
                    {resource.duration}
                  </span>
                </div>

                <div className="flex gap-3">
                  {resource.LearnMore && (
                    <a
                      href={resource.LearnMore}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded text-center text-sm font-medium hover:bg-green-700 transition duration-300"
                    >
                      LearnMore
                    </a>
                  )}

                  {resource.downloadUrl && (
                    <a
                      href={resource.downloadUrl}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded text-center text-sm font-medium hover:bg-green-700 transition duration-300"
                    >
                      Download
                    </a>
                  )}
                  {resource.videoUrl && (
                    <a
                      href={resource.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded text-center text-sm font-medium hover:bg-red-700 transition duration-300"
                    >
                      Watch Video
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources Section */}
        <section className="mt-16 bg-gradient-to-br from-green-600 to-secondary-600 text-white rounded-4xl p-12 text-center h-100 w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Additional Learning Opportunities
          </h2>

          <div className="grid md: text-center">
            {/* <div className="text-center">
             <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Research Papers</h3>
              <p className="text-gray-600 mb-4">
                Access peer-reviewed research on pest management and
                agricultural best practices.
              </p>
              <a
                href="/research-papers"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Browse Research →
              </a>
            </div> */}

            {/*   <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Webinars</h3>
              <p className="text-gray-600 mb-4">
                Join live sessions with agricultural experts and pest management
                specialists.
              </p>
              <a
                href="/webinars"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Schedule →
              </a>
            </div> */}

            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Community Forum</h3>
              <p className="text-gray-600 font-xl font-bold mb-4">
                Connect with other users, share experiences, and get help from
                the community.
              </p>
              <a
                href="https://talk.newagtalk.com/category-view.asp"
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Join Discussion →
              </a>
            </div>
          </div>
        </section>

        {/* Contact for More Resources */}
        <section className="bg-gradient-to-br from-green-600 to-secondary-600 text-white rounded-xl p-12 text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Need Specific Resources?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl font-bold mx-auto">
            Can't find what you're looking for? Contact our agricultural experts
            for customized learning materials and guidance.
          </p>
          <a
            href="mailto:about@agrihub.wyb.ac.lk"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 inline-block"
          >
            Contact Our Experts
          </a>
        </section>
      </div>
    </div>
  );
};

export default EducationalResources;
