import lmsProject from "../assets/lms-home.jpg";
import ecommerceHome from "../assets/project-ecom-home.jpg";
import ecommerceProducts from "../assets/project-ecom-products.jpg";
import ticketingHome from "../assets/clearqueue-home.jpg";
import ticketingDashboard from "../assets/clearqueue-dashboard.jpg";
import financeProject from "../assets/finance-tracker-home.jpg";
import calculatorProject from "../assets/Project4.png";

export const projects = [
  {
    image: lmsProject,
    imageAlt: "Library Management System homepage and book catalogue",
    title: "Library Management System",
    type: "Featured full-stack platform",
    focus: "Role-aware circulation",
    description:
      "A deployed MERN library platform with catalogue search, member borrowing and returns, reviews, admin inventory workflows, JWT session renewal, and Google authentication.",
    tech: ["React 19", "Redux Toolkit", "Express 5", "MongoDB"],
    sourceLinks: [
      {
        label: "Frontend source",
        href: "https://github.com/SudanBasnet/Frontend-LMS",
      },
      {
        label: "Backend source",
        href: "https://github.com/SudanBasnet/Backend-LMS",
      },
    ],
    liveLinks: [
      {
        label: "Live app",
        href: "https://frontend-lms-7220.onrender.com/",
      },
    ],
  },
  {
    image: ecommerceHome,
    imageAlt: "Broadway Store ecommerce homepage",
    screenshots: [
      {
        src: ecommerceHome,
        alt: "Broadway Store editorial ecommerce homepage",
      },
      {
        src: ecommerceProducts,
        alt: "Broadway Store live product catalogue",
      },
    ],
    screenshotHint: "Hover for catalogue",
    title: "Broadway Store",
    type: "Full-stack ecommerce platform",
    focus: "Real-data commerce",
    description:
      "A deployed ecommerce platform with a server-fed catalogue, authentication, cart and wishlist workflows, role-aware administration, Cloudinary media, editorial content, and theme-aware motion.",
    tech: ["Next.js 16", "TypeScript", "Express 5", "MongoDB"],
    sourceLinks: [
      {
        label: "Frontend source",
        href: "https://github.com/SudanBasnet/Project-Ecom-TS-Frontend",
      },
      {
        label: "Backend source",
        href: "https://github.com/SudanBasnet/Project-Ecom-TS",
      },
    ],
    liveLinks: [
      {
        label: "Live store",
        href: "https://project-ecom-ts-frontend.onrender.com/",
      },
    ],
  },
  {
    image: ticketingHome,
    imageAlt: "ClearQueue IT service-management platform landing page",
    screenshots: [
      {
        src: ticketingHome,
        alt: "ClearQueue public IT service-management landing page",
      },
      {
        src: ticketingDashboard,
        alt: "ClearQueue role-aware service desk dashboard with SLA insights",
      },
    ],
    screenshotHint: "Hover for dashboard",
    title: "ClearQueue Ticketing System",
    type: "Full-stack ITSM platform",
    focus: "Incident and SLA operations",
    description:
      "A production-oriented MERN service-management platform with role-aware dashboards, incident assignment and SLA tracking, public and internal work notes, and connected request, problem, change, CMDB, and knowledge workflows.",
    tech: ["React 19", "TypeScript", "Express 5", "MongoDB"],
    sourceLinks: [
      {
        label: "Frontend source",
        href: "https://github.com/SudanBasnet/Ticketing-System-Frontend",
      },
      {
        label: "Backend source",
        href: "https://github.com/SudanBasnet/Ticketing-System-Backend",
      },
    ],
    liveLinks: [
      {
        label: "Live app",
        href: "https://ticketing-system-frontend-eta.vercel.app/",
      },
    ],
  },
  {
    image: financeProject,
    imageAlt: "Finance Tracker landing page and dashboard preview",
    title: "Finance Tracker",
    type: "Full-stack application",
    focus: "Expense visibility",
    description:
      "An authenticated finance tracker with dashboard charts, transaction CRUD, search, pagination, and protected routes.",
    tech: ["MongoDB", "Express", "React", "Recharts"],
    sourceLinks: [
      {
        label: "Frontend source",
        href: "https://github.com/SudanBasnet/FT-Client",
      },
      {
        label: "Backend source",
        href: "https://github.com/SudanBasnet/FT-API",
      },
    ],
    liveLinks: [
      {
        label: "Live demo",
        href: "https://ft-client-six-delta.vercel.app/",
      },
    ],
  },
  {
    image: calculatorProject,
    imageAlt: "Prank Calculator interface preview",
    title: "Prank Calculator",
    type: "Interactive frontend",
    focus: "Playful UI states",
    description:
      "A playful React interface with polished interaction states and Tailwind-powered styling.",
    tech: ["React", "Tailwind CSS", "HTML"],
    sourceLinks: [
      {
        label: "Source code",
        href: "https://github.com/SudanBasnet/react-prank-calculator-project",
      },
    ],
    liveLinks: [
      {
        label: "Live demo",
        href: "https://react-prank-calculator-project-41sykfis0-sudanbasnets-projects.vercel.app/",
      },
    ],
  },
];
