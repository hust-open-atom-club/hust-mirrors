import React from "react";

export type SharedState = {
  https: boolean;
  domain: string;
  setHttps: (v: boolean) => void;
  setDomain: (v: string) => void;
}

export default React.createContext<SharedState>(undefined);
