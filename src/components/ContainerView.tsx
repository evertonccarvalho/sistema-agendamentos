import type { ReactNode } from "react";
import { Card, CardHeader } from "./ui/card";

interface ContainerViewProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

const ContainerView = ({ title, subtitle, children }: ContainerViewProps) => {
  return (
    <div className="drop-shadow-lg h-full min-h-dvh flex items-center justify-center space-y-4  md:p-8 pt-6">
      <Card className="min-h-[700px] max-h-[700px] bg-card h-full">
        <div className="flex flex-col items-center justify-center rounded-md max-w-[1200px] md:min-w-[900px]">
          {(title || subtitle) && (
            <CardHeader>
              <div className="text-center flex gap-2 items-center justify-center flex-col max-w-lg">
                <h1 className="text-xl font-semibold">{title}</h1>
                <p className="text-xs text-wrap">{subtitle}</p>
              </div>
            </CardHeader>
          )}
          {children}
        </div>
      </Card>
    </div>
  );
};

export default ContainerView;
