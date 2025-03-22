import Contact from "@/components/sub-components/Contact";
import MyApps from "@/components/sub-components/MyApps";
import Myself from "@/components/sub-components/Myself";
import Portfolio from "@/components/sub-components/Portfolio";
import Skills from "@/components/sub-components/Skills";
import Timeline from "@/components/sub-components/Timeline";
import React from "react";

const Home = () => {
  return (
    <article className="min-w-[1200px] min-h-screen flex flex-col items-center justify-center gap-14 p-5">
      <div className="w-full max-w-full">
        {" "}
        {/* Constrain content to viewport width */}
        <Myself />
      </div>

      <Timeline />
      <Skills />
      <Portfolio />
      <MyApps />
      <Contact />
    </article>
  );
};

export default Home;
