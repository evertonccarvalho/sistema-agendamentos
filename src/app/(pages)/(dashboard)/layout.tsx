import DashboardSideBar from "@/components/DashboardSideBar"





interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="min-h-dvh flex flex-col">
        {/* <Header /> */}
        <div className="flex flex-1">
          {/* <MainSideBar /> */}
          <DashboardSideBar />
          <div className="mx-auto  h-full w-full max-w-screen-2xl ">
            {children}
          </div>
        </div>
        {/* <Footer /> */}

      </div>
    </>
  )
}
