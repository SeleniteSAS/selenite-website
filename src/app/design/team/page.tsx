/* eslint-disable @next/next/no-img-element */
import { Fragment, type JSX } from "react";

import { Marquee } from "@/components/_animate/marquee";
import { BadgeGroup, BadgeGroupItem } from "@/components/_ui/badge-group";
import Hero from "@/components/wiki/hero/hero";
import { AnchorIcon, GithubIcon, LinkedinIcon, LinkIcon } from "lucide-react";
import { buttonVariants } from "@/components/_ui/button";

type TeamMember = {
  name: string;
  roles: string[];
  gif: string;
  links?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
};

const teamMembers: TeamMember[] = [
  {
    name: "Pierre G.",
    roles: ["Main web developer", "Merge Request Pro", "MORE COMMITS"],
    gif: "https://media1.tenor.com/m/6QCq9E-0LiwAAAAd/star.gif",
    links: {
      portfolio: "https://pierregueroult.dev",
      github: "https://github.com/pierregueroult",
      linkedin: "https://fr.linkedin.com/in/pierregueroult",
    },
  },
  {
    name: "Clément O.",
    roles: ["Game Developer", "Web developer", "Designer"],
    gif: "https://media1.tenor.com/m/eR10o_UXu-wAAAAd/more-feature-more-sales-sales.gif",
    links: {
      portfolio: "https://www.clementomnes.dev/",
      linkedin: "https://fr.linkedin.com/in/clement-omnes",
      github: "https://github.com/Clementmns",
    },
  },
  {
    name: "Liam M.",
    roles: ["Game Developer", "3d Artist"],
    gif: "https://media1.tenor.com/m/qexsOqLd1s4AAAAC/poo-p.gif",
    links: {
      linkedin: "https://fr.linkedin.com/in/liam-make",
    },
  },
  {
    name: "Antonin L.",
    roles: ["3d Artist", "Game Developer"],
    gif: "https://media1.tenor.com/m/XgIaTGrp5lQAAAAd/relax-chill.gif",
    links: {
      linkedin: "https://www.linkedin.com/in/antonin-leroux-1b0527272/",
    },
  },
  {
    name: "Titouan L.",
    roles: ["Story Writer", "Game Developer"],
    gif: "https://media1.tenor.com/m/JersoHA6I7EAAAAC/les-visteurs-film-fran%C3%A7ais.gif",
    links: {
      linkedin: "https://www.linkedin.com/in/titouan-lahchiouach/",
    },
  },
  {
    name: "Alison G.",
    roles: ["Graphist", "Web Designer"],
    gif: "https://media1.tenor.com/m/a5w95V3HdVcAAAAC/nileseyy-niles-peace-out.gif",
    links: {
      linkedin: "https://www.linkedin.com/in/alison-guillor%C3%A9-04411b272/",
    },
  },
];

export default function TeamPage() {
  const elements: JSX.Element[] = teamMembers
    .sort(() => Math.random() - 0.5)
    .map((member, index) => (
      <div key={index} className="flex flex-col items-center gap-4 rounded-md border border-input p-4 md:flex-row">
        <div>
          <h3 className="mb-4 text-center text-2xl">{member.name}</h3>
          <ul className="flex items-center justify-center gap-2 mb-4">
            {member.links?.portfolio && (
              <li>
                <a href={member.links.portfolio} target="_blank" rel="noreferrer"
                  className={buttonVariants({ variant: "default", size: "icon"})}
                >
                  <LinkIcon />
                </a>
              </li>
            )}
            {member.links?.github && (
              <li>
                <a href={member.links.github} target="_blank" rel="noreferrer"
                  className={buttonVariants({ variant: "default", size: "icon"})}
                >
                  <GithubIcon />
                </a>
              </li>
            )}
            {member.links?.linkedin && (
              <li>
                <a href={member.links.linkedin} target="_blank" rel="noreferrer"
                  className={buttonVariants({ variant: "default", size: "icon"})}
                >
                  <LinkedinIcon />
                </a>
              </li>
            )}
          </ul>
          <BadgeGroup type="single" className="flex-col">
            {member.roles.map((role, index) => (
              <BadgeGroupItem key={index} value={role} className="justify-center">
                {role}
              </BadgeGroupItem>
            ))}
          </BadgeGroup>
        </div>
        <img src={member.gif} alt={member.name} className="h-40 rounded-sm" />
      </div>
    ));

  return (
    <Fragment>
      <Hero
        title="Team"
        subtitle="Good teams create great work. Behind every idea, every design, every line of code, there's a collective effort—a balance of skill, passion, and vision. Strength comes from collaboration, innovation thrives on diversity, and success is built on trust."
        description="These are the people who shape our brand. Together, we turn ambition into reality."
      />
      <section className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden font-poppins text-foreground">
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
