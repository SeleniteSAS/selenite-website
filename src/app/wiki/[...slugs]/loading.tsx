import { LoaderIcon } from "lucide-react";

export default function LoadingArticlePage() {
  return (
    <div className="flex h-96 w-full items-center justify-center">
      <LoaderIcon className="size-6 animate-spin" />
    </div>
  );
}
