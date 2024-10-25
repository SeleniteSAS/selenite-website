import dynamic from "next/dynamic";
import { memo } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends LucideProps {
  name: string;
}

const Icon = memo(({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name as keyof typeof dynamicIconImports]);

  return <LucideIcon {...props} />;
});

Icon.displayName = "Icon";

export default Icon;
