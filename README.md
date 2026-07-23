# Sudan Basnet Portfolio

A modern personal portfolio for **Sudan Basnet**, an Enterprise Desktop Support Engineer in Sydney with hands-on experience across Microsoft 365, Intune, Active Directory, Autopilot, ServiceNow, ITSM workflows, Windows endpoints, and React/MERN projects.

The site presents both sides of the profile clearly: enterprise-level end-user computing support and practical full-stack development work. Visitors can choose between a polished classic portfolio and a separate, scroll-driven 3D experience.

## Live Portfolios

### Classic Portfolio

[Open the classic portfolio](https://www.sudanbasnet.com/)

[![Sudan Basnet classic portfolio preview](docs/screenshots/classic-portfolio.jpg)](https://www.sudanbasnet.com/)

The main experience uses a responsive editorial layout, theme controls, motion effects, professional experience, skills, project case studies, and contact details.

### Immersive 3D Portfolio

[Enter the immersive portfolio](https://www.sudanbasnet.com/immersive/)

[![Sudan Basnet immersive 3D portfolio preview](docs/screenshots/immersive-portfolio.jpg)](https://www.sudanbasnet.com/immersive/)

The immersive route reinterprets the same portfolio content with Three.js skill planets, scroll-driven camera movement, layered parallax, sticky storytelling sections, and a reduced-motion fallback.

## Highlights

- Dark-first modern UI with a polished light theme toggle
- Tailwind CSS v4 styling with reusable glass and LED border effects
- Responsive navigation with mobile menu support
- Enterprise experience section based on real resume content
- Project showcase with live links, GitHub links, screenshots, and tech tags
- Separate `/immersive/` experience with a lazy-loaded Three.js scene
- Shared project data across the classic and immersive presentations
- Reduced-motion support across interface and 3D animation
- SEO-ready metadata, Open Graph tags, structured data, favicon, manifest, and robots file
- Resume download integration
- Production build and ESLint verification

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Three.js
- JavaScript
- Font Awesome
- Devicon
- ESLint

## Portfolio Sections

- Hero introduction
- Professional highlights
- Skills and support strengths
- Enterprise experience
- Selected projects
- About profile
- Contact call-to-action
- Footer navigation

## Enterprise Experience Represented

The content highlights experience across:

- Microsoft 365, Exchange Online, Teams, SharePoint, OneDrive
- Active Directory, Azure AD, MFA, access management
- Microsoft Intune, Windows Autopilot, endpoint enrolment
- ServiceNow, ITSM, SLA tracking, escalation, documentation
- IMACD, hardware deployment, device lifecycle, secure decommissioning
- Windows 10/11, macOS, VPN, printers, AV, and meeting room support

Client environments represented include JLL, CHEP / Brambles, DIAGEO, Corteva Agriscience, PERRIGO, AMD, and Thomson Reuters.

## Getting Started

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Project Structure

```text
docs/
  screenshots/
    classic-portfolio.jpg
    immersive-portfolio.jpg
immersive/
  index.html
public/
  favicon.svg
  robots.txt
  site.webmanifest
src/
  assets/
  components/
  data/
    projects.js
  experiments/
    immersive/
  hooks/
  lib/
  App.jsx
  Root.jsx
  index.css
  main.jsx
```

## Contact

Sudan Basnet  
Email: `sdnbasnet5@gmail.com`  
LinkedIn: [linkedin.com/in/sudan-basnet](https://www.linkedin.com/in/sudan-basnet/)  
GitHub: [github.com/SudanBasnet](https://github.com/SudanBasnet)

## License

This portfolio is a personal project for Sudan Basnet. All personal content, resume details, and images are owned by Sudan Basnet.
