import type { ReactNode } from "react";
import { Card, CardHeader } from "./ui/card";

interface ContainerWrapperProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

const ContainerWrapper = ({ title, subtitle, children }: ContainerWrapperProps) => {
  return (
    <div className="drop-shadow-lg h-full min-h-dvh flex items-center justify-center space-y-4  md:p-8 pt-6">
      <Card className="md:min-h-[600px] flex max-h-[700px] bg-card h-[300px]">
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

export default ContainerWrapper;
