const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="h-full bg-background overflow-auto">
			<div className="mx-auto h-full w-full">{children}</div>
		</main>
	);
};

export default LandingLayout;
