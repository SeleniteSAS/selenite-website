import { LoaderIcon } from "lucide-react";

export default function LoadingArticlePage() {
  return <div
    className="w-full flex items-center justify-center h-96"
  > 
    <LoaderIcon className="size-6 animate-spin" />
  </div>
}
