import React from "react";
import PropertyCard from "./PropertyCard";

const AllProperties = () => {
  const properties = [
    {
      id: 1,
      propertyName: "Maple Ridge Apartments",
      location: "382 Blue Sky Boulevard, Oakwood Residences, CO 80202",
      price: "$85,000",
      beds: 5,
      baths: 4,
      area: "1600 Sqft",
      image:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Sale",
      category: "Apartment",
      shortDescription:
        "Spacious apartments with modern amenities in a prime location.",
    },
    {
      id: 2,
      propertyName: "Lakeside Manor",
      location: "4345 Maplewood Drive, Evergreen Estates, CA 90210",
      price: "$50,000",
      beds: 3,
      baths: 3,
      area: "1200 Sqft",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
      tag: "For Sale",
      category: "House",
      shortDescription:
        "Charming lakeside home offering peaceful surroundings and comfort.",
    },
    {
      id: 3,
      propertyName: "Golden Meadows",
      location: "4345 Maplewood Drive, Evergreen Estates, CA 90210",
      price: "$50,000",
      beds: 3,
      baths: 3,
      area: "1200 Sqft",
      image:
        "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2070&auto=format&fit=crop",
      tag: "For Sale",
      category: "Unit",
      shortDescription:
        "Elegant property surrounded by lush greenery and serene views.",
    },
    {
      id: 4,
      propertyName: "Villa In Oglesby Ave",
      location: "1035 Oglesby Ave, Chicago, IL 60617",
      price: "$130,000 /month",
      beds: 4,
      baths: 3,
      area: "800 sq ft",
      image:
        "https://images.unsplash.com/photo-1605146768851-eda79da39897?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Rent",
      category: "House",
      shortDescription:
        "Modern villa with stylish interiors and convenient city access.",
    },
    {
      id: 5,
      propertyName: "Modern Loft",
      location: "42 Wallaby Way, Sydney, NSW 2000",
      price: "$5,000 /month",
      beds: 2,
      baths: 2,
      area: "900 sq ft",
      image:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Rent",
      category: "Apartment",
      shortDescription:
        "Contemporary loft with open spaces and city skyline views.",
    },
    {
      id: 6,
      propertyName: "Urban Retreat",
      location: "55 King Street, Melbourne, VIC 3000",
      price: "$8,000 /month",
      beds: 3,
      baths: 2,
      area: "1100 sq ft",
      image:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Rent",
      category: "Unit",
      shortDescription:
        "Cozy urban home located near cafes, parks, and transport.",
    },
    {
      id: 7,
      propertyName: "Sunset Villas",
      location: "12 Palm Drive, Gold Coast, QLD 4217",
      price: "$50,000 /month",
      beds: 4,
      baths: 3,
      area: "1300 sq ft",
      image:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Rent",
      category: "House",
      shortDescription:
        "Stylish villa with spacious interiors and sunset views.",
    },
    {
      id: 8,
      propertyName: "Cozy Cottage",
      location: "99 Willow Lane, Hobart, TAS 7000",
      price: "$7,000 /month",
      beds: 2,
      baths: 1,
      area: "700 sq ft",
      image:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Rent",
      category: "Land",
      shortDescription:
        "Charming cottage perfect for small families or couples.",
    },
    {
      id: 9,
      propertyName: "Seaside Escape",
      location: "88 Ocean Drive, Byron Bay, NSW 2481",
      price: "$1,000 /month",
      beds: 5,
      baths: 4,
      area: "2000 sq ft",
      image:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Rent",
      category: "Apartment",
      shortDescription: "Luxury beachfront property with stunning ocean views.",
    },
  ];
  return (
    <div>
      <title>HomeNest - All Properties</title>
      <section className="py-12 bg-green-100 dark:bg-gray-900 text-base-content px-15">
        <div className="container mx-auto px-4">
          {/* Placeholder for optional title/filters above the list */}
          <h1 className="text-3xl font-bold mb-8 text-center hidden">
            Available Listings
          </h1>

          {/* Map over the properties data */}
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllProperties;
