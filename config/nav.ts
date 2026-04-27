import { SidebarLink } from "@/components/sidebar-items";
import { Cog, Globe, HomeIcon, LucideIcon, User } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

type Links = {
  title: string;
  href?: string;
  icon?: string;
  children?: SidebarLink[];
  field: string;
};

// export const defaultLinks: SidebarLink[] = [
//   { href: "/", title: "Dashboard", icon: "/images/icons/dashboard.png" },
//   { href: "/users", title: "Users", icon: "/images/icons/dashboard.png" },
//   { href: "/settings", title: "Settings", icon: "/images/icons/dashboard.png" },
// ];

// export const additionalLinks: AdditionalLinks[] = [
//   {
//     title: "waiver",
//     links: [{ href: "/waiver/driver", title: "Driver", icon: "/images/icons/dashboard.png" }],
//   },
// ];

export const _links: Links[] = [
  {
    href: "/",
    title: "Dashboard",
    icon: "/images/icons/dashboard.png",
    field: "dashboard",
  },
  {
    href: "/users",
    title: "Users",
    icon: "/images/icons/users.png",
    field: "users",
  },
  {
    title: "Waiver",
    icon: "/images/icons/waiver.png",
    children: [
      { href: "/waiver/driver", title: "Driver" },
      { href: "/waiver/chauffeur", title: "Chauffeur" },
      { href: "/waiver/fleet", title: "Fleet" },
    ],
    field: "waiver",
  },
  {
    title: "Bookings",
    icon: "/images/icons/bookings.png",
    children: [
      { href: "/bookings", title: "All Bookings" },
      { href: "/bookings/scheduled", title: "Scheduled" },
      { href: "/bookings/pending", title: "Pending" },
      { href: "/bookings/ongoing", title: "Ongoing" },
    ],
    field: "booking",
  },
  {
    title: "Ride cost",
    icon: "/images/icons/ride-cost.png",
    children: [
      { href: "/ride", title: "Cab" },
      { href: "/ride/chauffeur", title: "Chauffeur" },
    ],
    field: "ride_cost",
  },
  {
    href: "/location",
    title: "Location",
    icon: "/images/icons/location.png",
    field: "location",
  },
  {
    href: "/role",
    title: "Role Management",
    icon: "/images/icons/role.png",
    field: "role",
  },
  {
    href: "/promo",
    title: "Promo Management",
    icon: "/images/icons/promo.png",
    field: "promo",
  },
  {
    title: "Reports",
    icon: "/images/icons/reports.png",
    children: [
      { href: "/reports", title: "Waiver" },
      { href: "/reports/driver", title: "Driver" },
      { href: "/reports/chauffeur", title: "Chauffeur" },
    ],
    field: "report",
  },
  {
    href: "/live",
    title: "Live Location",
    icon: "/images/icons/live.png",
    field: "location",
  },
  {
    title: "Reviews & Ratings",
    icon: "/images/icons/rating.png",
    children: [
      { href: "/ratings", title: "Users" },
      { href: "/ratings/driver", title: "Driver" },
      { href: "/ratings/chauffeur", title: "Chauffeur" },
    ],
    field: "review",
  },
  {
    href: "/notification",
    title: "Push Notification",
    icon: "/images/icons/push.png",
    field: "push_notification",
  },
  {
    href: "/subscription",
    title: "Subscription",
    icon: "/images/icons/subscription.png",
    field: "subscription",
  },
];
