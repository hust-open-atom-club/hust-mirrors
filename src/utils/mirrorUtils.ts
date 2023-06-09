import { usePluginData } from '@docusaurus/useGlobalData';
import type { DomainMeta, MirrorMeta, ReleaseMeta } from '@site/meta.config';
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
  return meta.domains;
}

/**
 * Get release metas.
 * @returns release metas.
 */
export function useReleaseMetas(): ReleaseMeta[] {
  return meta.releases;
}

/**
 * Hook function, to get all docs.
 */
export function useDocMetas() {
  const docPluginData = usePluginData("docusaurus-plugin-content-docs") as any;
  const alldocs: DocMeta[] = docPluginData.versions[0].docs;
  return alldocs;
}
