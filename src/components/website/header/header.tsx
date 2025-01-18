import Link from "next/link";

export default function Header() {
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Wiki", href: process.env.NEXT_PUBLIC_WIKI_URL! },
  ];

  return (
    <header className="container sticky top-0 mx-auto w-full font-poppins text-white">
      <nav className="flex h-14 items-center">
        <Link href={"/public"}>Selenite</Link>
        <ul className="flex flex-1 items-center justify-end">
          {links.map((link) => {
            const Element = link.href.startsWith("http") ? "a" : Link;

            return (
              <li key={link.href} className="ml-4">
                <Element href={link.href}>{link.label}</Element>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
