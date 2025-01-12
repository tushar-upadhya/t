import ContactCard from "@/components/levels/contact-card/ContactCard";
import LevelOne from "@/components/levels/level-1/LevelOne";
import React from "react";
import directoryData from "../../data/directoryData.json";

const HomePage: React.FC = () => {
  return (
    <div className="">
      <LevelOne apiData={directoryData} />
      <ContactCard
        name="John Doe"
        department="Engineering"
        contactNo="123-456-7890"
        designation="Software Engineer"
        roomNo="12A"
        post="Manager"
      />
    </div>
  );
};

export default HomePage;
