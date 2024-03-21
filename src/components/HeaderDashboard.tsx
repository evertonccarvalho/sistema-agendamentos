import { Button } from "./ui/button";
import { UserNav } from "./user-nav";

const HeaderDashboard = () => {
	return (
		<header className="bg-transparent  absolute top-0 left-0 right-0 z-0 flex items-center justify-center w-full h-[72px] py-2 px-0">
			<div className="max-w-screen-2xl  w-full py-0 pr-8 mx-2 flex  items-center justify-end">
				<div className=" flex gap-2 items-center">
					<Button>Convidar</Button>
					<UserNav />
				</div>
			</div>
		</header>
	);
};

export default HeaderDashboard;
