import { lazy, Suspense } from "react";
import App from "./App.jsx";
import EntryLoader from "./components/EntryLoader.jsx";

const ImmersivePortfolio = lazy(
  () => import("./experiments/immersive/ImmersivePortfolio.jsx"),
);

const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";

const Root = () => {
  if (normalizedPath !== "/immersive") return <App />;

  return (
    <Suspense fallback={<EntryLoader immersive />}>
      <ImmersivePortfolio />
    </Suspense>
  );
};

export default Root;
