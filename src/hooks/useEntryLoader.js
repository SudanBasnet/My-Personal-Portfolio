import { useEffect, useState } from "react";

const useEntryLoader = (ready = true, minimumDuration = 700) => {
  const [minimumElapsed, setMinimumElapsed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setMinimumElapsed(true),
      minimumDuration,
    );
    return () => window.clearTimeout(timer);
  }, [minimumDuration]);

  return !ready || !minimumElapsed;
};

export default useEntryLoader;
