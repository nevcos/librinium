import React, { useEffect, useState } from "react";

export const useDataSource = (sourceFn: () => any, deps: React.DependencyList | undefined = undefined) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await sourceFn();
      setResource(result);
    })();
  }, deps);

  return resource;
};
