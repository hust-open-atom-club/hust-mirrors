import Layout from "@theme/Layout";
import clsx from "clsx";
import React, { useEffect } from "react";
import styles from './index.module.css'
import { useMirrorMetas } from "@site/src/utils/mirrorUtils";

function Breadcrumb() {
  return <nav className={clsx("theme-doc-breadcrumbs", styles.breadcrumbs)} aria-label="Breadcrumbs">
    <ul className="breadcrumbs" id='fancyindex__breadcrumbs'>
    </ul>
  </nav>
}

const mirrorMeta = JSON.stringify(useMirrorMetas());

const clientScript = `
/** Render BreadCrumbs */
(function () {
  var pathname = window.location.pathname;
  var items = pathname.split("/").map((curr, index, list) => {
    if (!curr) return undefined;
    var prev = list.slice(0, index).join("/");
    return {
      label: curr,
      href: prev + '/' + curr
    }
  }).filter(u => !!u);
  if (items.length < 2) return;
  var breadcrumbsContainr = document.getElementById('fancyindex__breadcrumbs');
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var li = document.createElement('li');
    li.className = 'breadcrumbs__item';
    var ele;
    if (i !== items.length - 1) {
      ele = document.createElement('a');
      ele.href = item.href;
    }
    else ele = document.createElement('span');

    ele.ariaLabel = "Link to " + item.label;
    ele.className = "breadcrumbs__link";
    // cautious about XSS
    ele.innerText = item.label;
    li.appendChild(ele)
    breadcrumbsContainr.appendChild(li);
  }
})();

/** Render Header */
(function () {
  var pathname = window.location.pathname;
  var mirrorid = pathname.split("/")[1];
  var metas = ${ mirrorMeta } /** Inject Meta Here */
  var meta = metas.find(u => u.id == mirrorid);
  var displayName = meta ? (meta.displayName || meta.id) : mirrorid;

  var titleDoms = document.getElementsByClassName('fancyindex__mirrorname');
  var lastUpdate = document.getElementById('fancyindex__lastUpdate');
  var helpBtn = document.getElementById('fancyindex__helpbutton');

  for (var i = 0; i < titleDoms.length; i++) {
    var title = titleDoms[i];
    title.innerText = mirrorid;
  }
  if (meta) helpBtn.href = "/docs/" + meta.helpID || meta.id;
})();

/** set date string */
(function () {
  document.querySelectorAll("#list tbody tr td:nth-child(3)").forEach((e) => {
    var s = new Date(e.innerText);
    if (!isNaN(s.getTime())) {
      var u = ("000" + s.getFullYear()).substr(-4) + "-" + ("0" + (s.getMonth() + 1)).substr(-2) + "-" + ("0" + s.getDate()).substr(-2) + " " + ("0" + s.getHours()).substr(-2) + ":" + ("0" + s.getMinutes()).substr(-2);
      e.innerText = u;
    }
  })
})();

/** add script for change theme button */
(function() {
  var defaultMode = 'light';
  function setTheme(th) {
    document.documentElement.setAttribute('data-theme', th);
    theme = th;
    try {
      localStorage.setItem('theme', th);
    } catch (err) {}
  }
  function getStoredTheme() {
    var theme = null;
    try {
      theme = localStorage.getItem('theme');
    } catch (err) {}
    return theme;
  }
  var theme = getStoredTheme() || defaultMode;
  var btn = document.querySelector(".navbar__items--right :nth-child(2) button")
  btn.disabled = false;
  btn.style.cursor = "pointer";
  btn.addEventListener('click', () => {
    setTheme(theme == 'dark' ? 'light' : 'dark')
  })
})()
`;

function FancyIndexInjectionContainer() {
  return <div className='mirror__table' dangerouslySetInnerHTML={
    {
      __html: `<h1 style="display:none"/><!-- fancyindex -->`
    }
  }>
    {/* fancy index content */}
  </div>

}

function Header() {
  return <header className={clsx('hero hero--primary', styles.header)}>
    <div className={styles['title-container']}>
      <div className={styles.title}>
        <h1>
          <span className='fancyindex__mirrorname'></span>
          <span>的文件索引</span>
        </h1>
        <p id='fancyindex__lastUpdate'>上次同步时间：N/A</p>
      </div>
      <div className={styles.blist}>
        <a className="button button--secondary" id="fancyindex__helpbutton">
          查看帮助
        </a>
        <div className={styles.cliBlock}>
          hustmirror deploy <span className="fancyindex__mirrorname"></span>
        </div>
      </div>
    </div>
  </header >
}

export default function FileIndexPage() {
  return <Layout
    description="Index of /">
    <Header />
    <div className={styles.content}>
      <Breadcrumb />
      <FancyIndexInjectionContainer />
    </div>
    <script dangerouslySetInnerHTML={{
      __html: clientScript
    }}></script>
  </Layout>

}