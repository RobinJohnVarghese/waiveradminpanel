"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { _links } from "@/config/nav";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Session } from "next-auth";

export interface SidebarLink {
  title: string;
  href: string;
  icon?: string;
}
const obj: any = {
  dashboard: false,
  users: true,
  waiver: true,
  booking: false,
  location: false,
  ride_cost: false,
  role: false,
  promo: false,
  report: false,
  subscription: false,
  review: false,
  push_notification: false,
};

const SidebarItems = ({
  setIsOpen,
  session,
}: {
  setIsOpen: (val: boolean) => void;
  session: Session;
}) => {
  let permissions: any = {};
  permissions = session?.user?.permissions;

  console.log({ permissions });

  const links = _links
    .map((link) => (permissions[link.field] ? link : null))
    .filter((link) => link !== null);

  const fullPathname = usePathname();
  const pathname = "/" + fullPathname?.split("/")[1];
  return (
    <>
      {links.length > 0
        ? links.map((l: any, index) =>
            l.children ? (
              <SidebarLinkGroup
                links={l.children}
                title={l.title}
                icon={l.icon}
                border
                key={l.title}
                setIsOpen={setIsOpen}
              />
            ) : (
              <SidebarLink
                key={index}
                link={{ href: l.href!, title: l.title, icon: l.icon! }}
                active={pathname === l.href}
                setIsOpen={setIsOpen}
              />
            )
          )
        : null}
    </>
  );
};
export default SidebarItems;

const SidebarLinkGroup = ({
  links,
  icon,
  title,
  border,
  setIsOpen,
}: {
  links: SidebarLink[];
  icon?: string;
  title?: string;
  border?: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const fullPathname = usePathname();
  const pathname = "/" + fullPathname?.split("/")[1];
  const path = usePathname();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={border ? "border-border" : ""}>
      {title ? (
        <div
          className={cn(
            "group transition-colors p-2 flex flex-row  hover:bg-popover hover:text-primary text-muted-foreground text-xs hover:shadow rounded-md",
            links.find((link) => link.href === path)
              ? " text-primary font-semibold"
              : ""
          )}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-row w-full">
            <Image
              src={icon!}
              alt={title}
              width={18}
              height={18}
              className=" mr-2"
            />
            <p>{title}</p>
          </div>
          <ChevronDown className="h-4 w-4" />
        </div>
      ) : null}
      {open ? (
        <ul className="ml-6">
          {links.map((link) => (
            <li key={link.title}>
              <SidebarLink
                link={link}
                active={path === link.href}
                setIsOpen={setIsOpen}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

const SidebarLink = ({
  link,
  active,
  setIsOpen,
}: {
  link: SidebarLink;
  active: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  return (
    <Link
      href={link.href}
      className={`group transition-colors p-2 inline-block hover:bg-popover hover:text-primary text-muted-foreground text-xs hover:shadow rounded-md w-full${
        active ? " text-primary font-semibold" : ""
      }`}
      onClick={() => setIsOpen(false)}
    >
      <div className="flex items-center">
        <div
          className={cn(
            "opacity-0 left-0 h-6 w-[4px] absolute items-center rounded-r-lg bg-primary",
            active ? "opacity-100" : ""
          )}
        />
        {link.icon ? (
          <Image
            src={link.icon}
            alt={link.title}
            width={18}
            height={18}
            className=" mr-2"
          />
        ) : null}
        <span className="">{link.title}</span>
      </div>
    </Link>
  );
};
