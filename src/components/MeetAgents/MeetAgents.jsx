import React from "react";
import { useNavigate } from "react-router";
import AgentCard from "./AgentCard";

const MeetAgents = () => {
  const navigate = useNavigate();
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
        "https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg",
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
  const topAgents = [...agentsData]
    .sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0))
    .slice(0, 6);

  return (
    <section
      className="py-16 sm:py-24 bg-linear-to-t from-green-100 via-green-50 to-green-300 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
 text-base-content dark:text-gray-200 transition-colors duration-300 px-4 sm:px-20"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 flex flex-col sm:flex-row justify-center items-center font-primary">
            <span>Meet Our&nbsp;</span>
            <span className="text-[#108251]">Agents</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto font-secondary">
            Discover the Faces Behind Exceptional Service, Expertise, and
            Unmatched Local Knowledge
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4 mb-12 w-50 md:w-full mx-auto">
          {topAgents.map((agent) => (
            <AgentCard key={agent.id} {...agent} />
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate("/our-agents")}
            className="rounded-full text-[16px] font-semibold text-white px-8 py-3 bg-linear-to-r from-[#108251] to-green-500 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg font-primary cursor-pointer"
          >
            Browse More Agents
          </button>
        </div>
      </div>
    </section>
  );
};

export default MeetAgents;
