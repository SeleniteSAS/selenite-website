import { redirect } from "next/navigation";

export default function AuthDefaultPage() {
  return redirect("/login");
}
