import React from "react";

const SimpleSteps = () => {
  const stepsData = [
    {
      step: 1,
      title: "Choose a category",
      description:
        "Pick the type of property you’re interested in — house, apartment, or land. Start by narrowing down what fits your lifestyle.",
      imageUrl:
        "https://images.unsplash.com/photo-1545262841-5283004cef19?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hvb3NlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
    },
    {
      step: 2,
      title: "Find real estate",
      description:
        "Explore listings that match your budget and location. Compare options and discover places that feel like home.",
      imageUrl:
        "https://images.unsplash.com/photo-1561380851-39b27c4f1626?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluZHxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=500",
    },
    {
      step: 3,
      title: "Take the keys",
      description:
        "Schedule a visit, meet with an agent, and finalize the deal. We’ll help you through every step of the process.",
      imageUrl:
        "https://images.unsplash.com/photo-1722487631997-cf1e0f92c2c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2UlMjBLZXlzfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
    },
    {
      step: 4,
      title: "Live happy",
      description:
        "Move into your new space and start your next chapter — comfortable, confident, and right where you belong.",
      imageUrl:
        "https://images.unsplash.com/photo-1740679953679-23433eaf3156?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFwcHklMjBmYW1pbHklMjBhdCUyMGhvbWV8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&q=60&w=500",
    },
  ];

  return (
    <section className="py-20 bg-green-900 dark:bg-green-950 text-white px-15">
      <h1 className="text-center text-5xl pb-15 font-bold font-primary">
        Simple Steps
      </h1>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative">
          <div className="hidden lg:block absolute top-25 left-[10%] right-[10%] h-1 bg-base-content/40 z-0"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-12 lg:gap-x-4">
            {stepsData.map(({ step, title, description, imageUrl }) => (
              <div
                key={step}
                className="flex flex-col items-center text-center p-4 z-10 relative hover:scale-110 transform duration-300"
              >
                <div className="relative mb-6">
                  <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-green-500">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2.5 -right-2.5 sm:top-[-15px] sm:right-[-15px] w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-base-100 font-bold shadow-md z-20">
                    {step}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2 font-primary">
                  {title}
                </h3>
                <p className="text-sm text-white/70 max-w-[200px] font-secondary">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleSteps;
