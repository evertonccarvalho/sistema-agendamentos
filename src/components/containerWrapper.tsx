import type { ReactNode } from "react";
import { Card, CardHeader } from "./ui/card";

interface ContainerWrapperProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

const ContainerWrapper = ({ title, subtitle, children }: ContainerWrapperProps) => {
  return (
    <div className="h-full min-h-dvh bg-muted/50 flex items-center justify-center space-y-4 md:p-8 pt-6">
      <Card className=" border  flex flex-wrap items-center justify-center p-2  min-h-[31rem] h-full overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-primary">
        <div className="flex flex-col w-full items-center h-full rounded-md max-w-[1200px] md:min-w-[900px]">
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
