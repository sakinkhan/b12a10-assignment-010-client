import React from "react";
import AgentCard from "./AgentCard";

const MeetAgents = () => {
  const agentsData = [
    {
      id: 1,
      name: "Alex Bolton",
      role: "Property Manager",
      imageUrl:
        "https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
      ringColor: "border-yellow-400",
    },
    {
      id: 2,
      name: "Edwina Martins",
      role: "Property Advisor",
      imageUrl:
        "https://images.unsplash.com/photo-1712174766230-cb7304feaafe?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
      ringColor: "border-sky-400",
    },
    {
      id: 3,
      name: "Wade Xin",
      role: "Property Manager",
      imageUrl:
        "https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
      ringColor: "border-purple-600",
    },
    {
      id: 4,
      name: "Sophie Moore",
      role: "Property Consultant",
      imageUrl:
        "https://media.istockphoto.com/id/938709362/photo/portrait-of-a-girl.webp?a=1&b=1&s=612x612&w=0&k=20&c=WNAd2QlsKBev4QdNoX7aumAZ--5uC7zJFAGKkSSOltQ=",
      ringColor: "border-slate-300",
    },
    {
      id: 5,
      name: "John Carter ",
      role: "Property Consultant",
      imageUrl:
        "https://images.unsplash.com/photo-1691335053993-c9ba8cfd65e7?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
      ringColor: "border-cyan-600",
    },
    {
      id: 6,
      name: "Naeem Khan",
      role: "Property Consultant",
      imageUrl:
        "https://images.unsplash.com/photo-1724435811349-32d27f4d5806?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
      ringColor: "border-slate-400",
    },
  ];

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
          {agentsData.map((agent) => (
            <AgentCard key={agent.id} {...agent} />
          ))}
        </div>
        <div className="text-center">
          <button className="rounded-full text-[16px] font-semibold text-white px-8 py-3 bg-gradient-to-r from-[#108251] to-green-500 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg font-primary">
            Browse More Agents
          </button>
        </div>
      </div>
    </section>
  );
};

export default MeetAgents;
