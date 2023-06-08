import { usePluginData } from '@docusaurus/useGlobalData';
import type { DomainMeta, MirrorMeta } from '@site/meta.config';
import meta from '@site/meta.config';

export type DocMeta = {
  id: string;
  path: string;
  sidebar: string;
}

/**
 * Get mirror metas.
 * @returns mirror metas.
 */
export function useMirrorMetas(): MirrorMeta[] {
  return meta.mirrors;
}

/**
 * Get domain metas.
 * @returns domain metas.
 */
export function useDomainMetas(): DomainMeta[] {
  console.log(meta);
  return meta.domains;
}

/**
 * Hook function, to get all docs.
 */
export function useDocMetas() {
  const docPluginData = usePluginData("docusaurus-plugin-content-docs") as any;
  const alldocs: DocMeta[] = docPluginData.versions[0].docs;
  return alldocs;
}
