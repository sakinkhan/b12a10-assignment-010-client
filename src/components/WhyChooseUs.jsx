import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { BsBuildings } from "react-icons/bs";
import { TbSquareRoundedPercentage, TbUserStar } from "react-icons/tb";
import bgImage from "../assets/why-us.jpg";

const statsData = [
  {
    icon: <BsBuildings size={50} />,
    value: 1.8,
    suffix: "B+",
    label: "We've successfully sold properties across the globe.",
  },
  {
    icon: <TbSquareRoundedPercentage size={50} />,
    value: 5.2,
    suffix: "%",
    label: "We're pleased to offer affordable loan options.",
  },
  {
    icon: <TbUserStar size={50} />,
    value: 20,
    suffix: "K+",
    label: "We're proud to have over 20,000 satisfied clients.",
  },
];

const WhyChooseUs = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-20 font-secondary text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 font-primary">
          Why Choose Us?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4">
              <div className="text-white">{stat.icon}</div>
              <div className="text-5xl font-bold">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                    suffix={stat.suffix}
                    useEasing={true}
                    separator=","
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <p className="max-w-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
