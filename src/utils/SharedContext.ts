import React from "react";

export type SharedState = {
  https: boolean;
  domain: string;
  setHttps: (v: boolean) => void;
  setDomain: (v: string) => void;
}

const SharedContext = React.createContext<SharedState | undefined>(undefined);

export function useSharedContext(): SharedState {
  const context = React.useContext(SharedContext);
  if (!context) throw new Error('SharedContext provider is missing');
  return context;
}

export default SharedContext;
