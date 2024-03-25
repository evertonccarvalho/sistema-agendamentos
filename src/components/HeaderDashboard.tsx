import { UserNav } from "./user-nav";

const HeaderDashboard = () => {
	return (
		<header className="bg-white dark:border-b-slate-700 dark:bg-background  border-b-[1px] absolute top-0 left-0 right-0 z-0 flex items-center justify-center w-full h-[72px] py-2 px-0">
			<div className="container h-14 px-4 w-screen flex   py-0 pr-8 mx-2   items-center justify-end">
				<UserNav />
			</div>
		</header>
	);
};

export default HeaderDashboard;
