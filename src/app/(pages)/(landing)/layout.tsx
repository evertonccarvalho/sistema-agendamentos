const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="h-full bg-background overflow-x-clip overflow-y-auto">
			<div >{children}</div>
		</main>
	);
};

export default LandingLayout;
