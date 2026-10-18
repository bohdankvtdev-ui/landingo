import { HeroIntro } from "@/components/hero-intro";
import { PageLoader } from "@/components/page-loader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <main>
        <HeroIntro />
      </main>
    </>
  );
}
