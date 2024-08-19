import { usePluginData } from '@docusaurus/useGlobalData';
import type { DomainMeta, MirrorMeta, ReleaseMeta } from '@site/meta.config';
import meta from '@site/meta.config';

export type DocMeta = {
  id: string;
  path: string;
  sidebar: string;
}

export type NewsMeta = {
  title: string;
  date: string;
  link: string;
  id: string;
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
 * Hook function, to get all docs.
 */
export function useDocMetas() {
  const docPluginData = usePluginData("docusaurus-plugin-content-docs") as any;
  const alldocs: DocMeta[] = docPluginData.versions[0].docs;
  return alldocs;
}

/**
 * Hook function, to get all news.
 */
export function useNewsList(): NewsMeta[] {
  return usePluginData("news-meta") as NewsMeta[];
}
