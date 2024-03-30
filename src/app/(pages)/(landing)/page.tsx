import { About } from "./_components/About";
import { Footer } from "./_components/Footer";
import { Hero } from "./_components/Hero";
import { FeaturesSection } from "./_components/FeaturesSection";
import { Navbar } from "./_components/Navbar";
import { PricingSection } from "./_components/PricingSection";
import { ScrollToTop } from "./_components/ScrollToTop";
import { TeamSection } from "./_components/TeamSection";
import { TestimonialsSection } from "./_components/TestimonialsSection";

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
