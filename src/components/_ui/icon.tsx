import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { ReactNode, memo } from "react";

import dynamic from "next/dynamic";

interface IconProps extends LucideProps {
  name: string;
}

const Icon = memo(({ name, ...props }: IconProps): ReactNode | null => {
  const LucideIcon = dynamic(dynamicIconImports[name as keyof typeof dynamicIconImports]);

  return <LucideIcon {...props} />;
});

Icon.displayName = "Icon";

export default Icon;
