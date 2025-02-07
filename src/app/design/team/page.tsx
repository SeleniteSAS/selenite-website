/* eslint-disable @next/next/no-img-element */
import { Fragment, type JSX } from "react";

import { Marquee } from "@/components/_animate/marquee";
import { BadgeGroup, BadgeGroupItem } from "@/components/_ui/badge-group";
import Hero from "@/components/wiki/hero/hero";

type TeamMember = {
  name: string;
  roles: string[];
  gif: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Pierre G.",
    roles: ["Main web developer", "Merge Request Pro", "MORE COMMITS"],
    gif: "https://media1.tenor.com/m/6QCq9E-0LiwAAAAd/star.gif",
  },
  {
    name: "Clément O.",
    roles: ["Game Developer", "Web developer", "Designer"],
    gif: "https://media1.tenor.com/m/eR10o_UXu-wAAAAd/more-feature-more-sales-sales.gif",
  },
  {
    name: "Liam M.",
    roles: ["Game Developer", "3d Artist"],
    gif: "https://media1.tenor.com/m/qexsOqLd1s4AAAAC/poo-p.gif",
  },
  {
    name: "Antonin L.",
    roles: ["3d Artist", "Game Developer"],
    gif: "https://media1.tenor.com/m/XgIaTGrp5lQAAAAd/relax-chill.gif",
  },
  {
    name: "Titouan L.",
    roles: ["Story Writer", "Game Developer"],
    gif: "https://media1.tenor.com/m/JersoHA6I7EAAAAC/les-visteurs-film-fran%C3%A7ais.gif",
  },
  {
    name: "Alison G.",
    roles: ["Graphist", "Web Designer"],
    gif: "https://media1.tenor.com/m/a5w95V3HdVcAAAAC/nileseyy-niles-peace-out.gif",
  },
];

export default function TeamPage() {
  const elements: JSX.Element[] = teamMembers
    .sort(() => Math.random() - 0.5)
    .map((member, index) => (
      <div key={index} className="flex flex-col items-center gap-4 rounded-md border border-input p-4 md:flex-row">
        <div>
          <h3 className="mb-8 text-center text-2xl">{member.name}</h3>
          <BadgeGroup type="single" className="flex-col">
            {member.roles.map((role, index) => (
              <BadgeGroupItem key={index} value={role} className="justify-center">
                {role}
              </BadgeGroupItem>
            ))}
          </BadgeGroup>
        </div>
        <img src={member.gif} alt={member.name} className="h-32 rounded-sm" />
      </div>
    ));

  return (
    <Fragment>
      <Hero
        title="Team"
        subtitle="Good teams create great work. Behind every idea, every design, every line of code, there's a collective effort—a balance of skill, passion, and vision. Strength comes from collaboration, innovation thrives on diversity, and success is built on trust."
        description="These are the people who shape our brand. Together, we turn ambition into reality."
      />
      <section className="flex min-h-screen w-full flex-col items-center justify-center font-poppins text-foreground overflow-hidden">
        <Marquee pauseOnHover={true} reverse={false}>
          {elements}
        </Marquee>
        <Marquee reverse={true} pauseOnHover={true}>
          {elements}
        </Marquee>
        <Marquee pauseOnHover={true} reverse={false}>
          {elements}
        </Marquee>
      </section>
    </Fragment>
  );
}
