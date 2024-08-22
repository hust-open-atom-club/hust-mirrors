import Layout from "@theme/Layout";
import clsx from "clsx";
import React, { useEffect } from "react";
import styles from './index.module.css'
import { useDocMetas, useMirrorMetas } from "@site/src/utils/mirrorUtils";

export default function FileIndexPage() {
  const mirrorMeta = JSON.stringify(useMirrorMetas());
  const helpMeta = JSON.stringify(useDocMetas());

  const clientScript = `
  window.MIRROR_METAS = ${mirrorMeta};
  window.HELP_METAS = ${helpMeta};
  `;

  return <Layout description="cgit page">
    <script id="site-meta-script" dangerouslySetInnerHTML={{
      __html: clientScript
    }}></script>
  </Layout>

}
