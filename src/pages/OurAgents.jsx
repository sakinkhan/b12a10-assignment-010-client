import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from "react-icons/fa";

const OurAgents = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);

  const agentsData = [
    {
      id: 1,
      name: "Alex Bolton",
      role: "Property Manager",
      imageUrl:
        "https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
      ringColor: "border-yellow-400",
      email: "alex.bolton@homenest.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      specialization: "Residential Properties",
      yearsOfExperience: 8,
      propertiesSold: 156,
      rating: 4.8,
      bio: "Passionate about connecting families with their dream homes. Specializes in residential properties across all price ranges.",
    },
    {
      id: 2,
      name: "Edwina Martins",
      role: "Property Advisor",
      imageUrl:
        "https://images.unsplash.com/photo-1712174766230-cb7304feaafe?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
      ringColor: "border-sky-400",
      email: "edwina.martins@homenest.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, CA",
      specialization: "Luxury Apartments",
      yearsOfExperience: 12,
      propertiesSold: 248,
      rating: 4.9,
      bio: "Expert in luxury residential market with extensive knowledge of premium properties and high-end clientele.",
    },
    {
      id: 3,
      name: "Wade Xin",
      role: "Property Manager",
      imageUrl:
        "https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-professional-profile-picture-of-a-smiling-female-in-white-business-attire-with-her-back-to-the-blurred-forest-view-by-Fotor.jpg",
      ringColor: "border-purple-600",
      email: "wade.xin@homenest.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      specialization: "Commercial Real Estate",
      yearsOfExperience: 10,
      propertiesSold: 189,
      rating: 4.7,
      bio: "Focused on commercial property management and investment opportunities for business clients.",
    },
    {
      id: 4,
      name: "Sophie Moore",
      role: "Property Consultant",
      imageUrl:
        "https://media.istockphoto.com/id/938709362/photo/portrait-of-a-girl.webp?a=1&b=1&s=612x612&w=0&k=20&c=WNAd2QlsKBev4QdNoX7aumAZ--5uC7zJFAGKkSSOltQ=",
      ringColor: "border-slate-300",
      email: "sophie.moore@homenest.com",
      phone: "+1 (555) 456-7890",
      location: "Houston, TX",
      specialization: "Family Homes",
      yearsOfExperience: 7,
      propertiesSold: 134,
      rating: 4.6,
      bio: "Dedicated to helping families find the perfect home. Known for excellent customer service and personalized attention.",
    },
    {
      id: 5,
      name: "John Carter",
      role: "Property Consultant",
      imageUrl:
        "https://images.unsplash.com/photo-1691335053993-c9ba8cfd65e7?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
      ringColor: "border-cyan-600",
      email: "john.carter@homenest.com",
      phone: "+1 (555) 567-8901",
      location: "Phoenix, AZ",
      specialization: "Investment Properties",
      yearsOfExperience: 15,
      propertiesSold: 312,
      rating: 4.9,
      bio: "Seasoned professional in investment property analysis and portfolio development for serious investors.",
    },
    {
      id: 6,
      name: "Naeem Khan",
      role: "Property Consultant",
      imageUrl:
        "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-309.jpg",
      ringColor: "border-slate-400",
      email: "naeem.khan@homenest.com",
      phone: "+1 (555) 678-9012",
      location: "Miami, FL",
      specialization: "Beachfront Properties",
      yearsOfExperience: 11,
      propertiesSold: 201,
      rating: 4.8,
      bio: "Specialist in beachfront and waterfront properties with expertise in coastal real estate market trends.",
    },
    {
      id: 7,
      name: "Maria Rodriguez",
      role: "Property Manager",
      imageUrl:
        "https://image.galaxy.ai/_next/image?url=https%3A%2F%2Fassets.galaxy.ai%2Fgalaxymainsiteexamples%2Fimage%2Fai-profile-picture-generator%2Fexample-1.jpg&w=3840&q=75",
      ringColor: "border-red-400",
      email: "maria.rodriguez@homenest.com",
      phone: "+1 (555) 789-0123",
      location: "Seattle, WA",
      specialization: "Urban Condos",
      yearsOfExperience: 9,
      propertiesSold: 167,
      rating: 4.7,
      bio: "Expert in urban condominium market with strong focus on downtown and city center properties.",
    },
    {
      id: 8,
      name: "David Thompson",
      role: "Property Advisor",
      imageUrl:
        "https://cdn.getmerlin.in/cms/Screenshot_2024_04_05_130256_473f8428ec.png",
      ringColor: "border-green-400",
      email: "david.thompson@homenest.com",
      phone: "+1 (555) 890-1234",
      location: "Denver, CO",
      specialization: "Mountain Properties",
      yearsOfExperience: 13,
      propertiesSold: 225,
      rating: 4.8,
      bio: "Specialized knowledge of mountain and mountain-view properties across multiple states.",
    },
    {
      id: 9,
      name: "Jennifer Lee",
      role: "Property Consultant",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
      ringColor: "border-pink-400",
      email: "jennifer.lee@homenest.com",
      phone: "+1 (555) 901-2345",
      location: "Boston, MA",
      specialization: "Historic Properties",
      yearsOfExperience: 14,
      propertiesSold: 289,
      rating: 4.9,
      bio: "Passionate about historic properties and restoration projects with extensive renovation expertise.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-gray-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300 py-12">
      {/* Header Section */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 font-primary">
            <span className="text-[#108251] dark:text-green-400">Meet Our</span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              Professional Agents
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-secondary text-lg">
            Our team of experienced real estate professionals is committed to
            helping you find the perfect property or achieve your real estate
            investment goals.
          </p>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agentsData.map((agent) => (
            <div
              key={agent.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              onClick={() =>
                setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)
              }
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-64 bg-gray-200 dark:bg-gray-700">
                <img
                  src={agent.imageUrl}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 shadow-md">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" size={14} />
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {agent.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1 font-primary">
                  {agent.name}
                </h3>
                <p className="text-[#108251] dark:text-green-400 font-semibold mb-4 font-secondary">
                  {agent.role}
                </p>

                {/* Quick Info */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaMapMarkerAlt className="text-[#108251] dark:text-green-400" />
                    <span>{agent.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaEnvelope className="text-[#108251] dark:text-green-400" />
                    <span className="truncate">{agent.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaPhone className="text-[#108251] dark:text-green-400" />
                    <span>{agent.phone}</span>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-200 dark:border-gray-700 mb-4 text-center text-sm">
                  <div>
                    <p className="font-bold text-[#108251] dark:text-green-400">
                      {agent.yearsOfExperience}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      Years Exp.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-600 dark:text-blue-400">
                      {agent.propertiesSold}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      Sold
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-yellow-600 dark:text-yellow-400">
                      {agent.specialization.split(" ")[0]}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      Specialty
                    </p>
                  </div>
                </div>

                {/* Specialization */}
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider">
                  Specialization
                </p>
                <p className="text-sm font-semibold text-white px-3 py-1 rounded-full bg-[#108251] dark:bg-green-600 inline-block">
                  {agent.specialization}
                </p>

                {/* Expandable Bio */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {agent.bio}
                  </p>
                  <button className="w-full bg-[#108251] hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-linear-to-r from-[#108251] to-green-600 dark:from-green-600 dark:to-green-700 rounded-lg shadow-lg p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-primary">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto font-secondary text-lg">
            Connect with one of our experienced agents today and start your real
            estate journey
          </p>
          <button className="bg-white text-[#108251] hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            Get in Touch Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurAgents;
