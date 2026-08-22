import { lazy, Suspense } from "react";
import App from "./App.jsx";
import EntryLoader from "./components/EntryLoader.jsx";

const ImmersivePortfolio = lazy(
  () => import("./experiments/immersive/ImmersivePortfolio.jsx"),
);

const KineticPortfolio = lazy(
  () => import("./experiments/kinetic/KineticPortfolio.jsx"),
);

const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";

const Root = () => {
  if (normalizedPath === "/kinetic") {
    return (
      <Suspense fallback={<EntryLoader immersive />}>
        <KineticPortfolio />
      </Suspense>
    );
  }

  if (normalizedPath !== "/immersive") return <App />;

  return (
    <Suspense fallback={<EntryLoader immersive />}>
      <ImmersivePortfolio />
    </Suspense>
  );
};

export default Root;
