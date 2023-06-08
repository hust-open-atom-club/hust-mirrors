import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';

export type MirrorMeta = {
  id: string;
  type?: 'normal' | 'git';
  displayName?: string;
  description?: string;
  forceShown?: boolean;
  link?: string;
  helpID?: string;
};

export type DocMeta = {
  id: string;
  path: string;
  sidebar: string;
}


export type DomainMeta = {
  domain: string;
  desc: string;
}

/**
 * Hook function, to get mirror metas.
 * @returns mirror metas.
 */
export function useMirrorMetas(): MirrorMeta[] {
  const {
    siteConfig: {
      customFields: fields
    }
  } = useDocusaurusContext();
  return fields.mirrors as MirrorMeta[];
}


/**
 * Hook function, to get domain metas.
 * @returns domain metas.
 */
export function useDomainMetas(): DomainMeta[] {
  const {
    siteConfig: {
      customFields: fields
    }
  } = useDocusaurusContext();
  return fields.domains as DomainMeta[];
}


/**
 * Hook function, to get all docs.
 */
export function useDocMetas() {
  const docPluginData = usePluginData("docusaurus-plugin-content-docs") as any;
  const alldocs: DocMeta[] = docPluginData.versions[0].docs;
  return alldocs;
}
