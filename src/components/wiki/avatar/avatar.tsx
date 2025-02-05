"use client";

import { memo } from "react";

import { Avatar as AvatarContainer, AvatarFallback, AvatarImage } from "@/components/_ui/avatar";

type AvatarProps = Readonly<{
  src: string;
  alt: string;
  fallback: string;
}>;

const Avatar = memo<AvatarProps>(({ src, alt, fallback }) => (
  <AvatarContainer>
    <AvatarImage src={src} alt={alt} />
    <AvatarFallback className="bg-foreground text-background">{fallback}</AvatarFallback>
  </AvatarContainer>
));

Avatar.displayName = "Avatar";

export default Avatar;
