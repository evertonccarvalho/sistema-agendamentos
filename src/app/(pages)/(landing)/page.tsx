import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { FeaturesSection } from "./components/FeaturesSection";
import { Navbar } from "./components/Navbar";
import { PricingSection } from "./components/PricingSection";
import { ScrollToTop } from "./components/ScrollToTop";
import { TeamSection } from "./components/TeamSection";
import { TestimonialsSection } from "./components/TestimonialsSection";

const LandingPage = () => {
	return (
		<>
			<Navbar />
			<Hero />
			<About />
			<FeaturesSection />
			<TestimonialsSection />
			<TeamSection />
			<PricingSection />
			<Footer />
			<ScrollToTop />
		</>
	);
};

export default LandingPage;
