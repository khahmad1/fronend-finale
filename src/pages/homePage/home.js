import React from "react";
import HeroSectionHome from "../../components/heroSection/hero";
import ButtonCategory from "../../components/ButtonCategory/ButtonCategory";
function ParentComponent() {
  const handleChildData = (data) => {
    // Handle the data received from the child component
    console.log(data);
  };

  return (
    <div>
      <ButtonCategory onChildData={handleChildData} />
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <HeroSectionHome />
      <ParentComponent />
    </div>
  );
}

export default HomePage;
