import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {}

export const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div {...props} className={cn("mx-auto max-w-7xl px-4", className)}>
      {children}
    </div>
  );
};
