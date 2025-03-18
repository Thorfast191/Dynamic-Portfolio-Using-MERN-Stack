import React from "react";
// import { ThemeProvider } from "@/components/theme-provider";
import Myself from "@/components/sub-components/Myself";
import Timeline from "@/components/sub-components/Timeline";
import About from "@/components/sub-components/About";
import Skills from "@/components/sub-components/Skills";
import Portfolio from "@/components/sub-components/Portfolio";
import MyApps from "@/components/sub-components/MyApps";
import Contact from "@/components/sub-components/Contact";

const Home = () => {
  return (
    <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
      <Myself />
      <Timeline />
      <About />
      <Skills />
      <Portfolio />
      <MyApps />
      <Contact />
    </article>
  );
};

export default Home;
