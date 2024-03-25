import { testimonialsList } from "./const/const";
import TestimonialCard, { type Testimonial } from "./TestimonialsCard";

export const TestimonialsSection = () => {
	return (
		<section id="testimonials" className="container py-24 sm:py-32">
			<h2 className="text-3xl md:text-4xl font-bold">
				Por que
				<span className="text-primary">
					{" "}
					as Pessoas Amam{" "}
				</span>
				o AgendaÊ
			</h2>

			<p className="text-xl text-muted-foreground pt-4 pb-8">
				Veja o que nossos usuários têm a dizer sobre sua experiência com nosso
				sistema de agendamento.
			</p>

			<div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
				{testimonialsList.map((testmonial: Testimonial) => (
					<TestimonialCard testmonial={testmonial} />
				))}
			</div>
		</section>
	);
};
