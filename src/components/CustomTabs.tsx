import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"

interface TabProps {
    label: string
    content: React.ReactNode
    showDateSelector?: boolean // Optional flag to conditionally show DateSelector
}

interface CustomTabsProps {
    tabs: TabProps[]
    onMonthYearChange?: (monthAndYear: { month: string; year: string }) => void
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs }) => {
    return (
        <Tabs defaultValue={tabs[0].label}>
            <div className="flex gap-2">
                <TabsList>
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.label} value={tab.label}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            {tabs.map((tab) => (
                <TabsContent key={tab.label} value={tab.label}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default CustomTabs
