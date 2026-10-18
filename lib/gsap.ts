"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, CustomEase);
  CustomEase.create("arrive", "0.33,1,0.68,1");
  gsap.defaults({ ease: "arrive", duration: 0.3 });
}

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText, useGSAP };
