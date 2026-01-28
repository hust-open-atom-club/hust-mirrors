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
    ele.textContent = item.label;
    li.appendChild(ele)
    breadcrumbsContainr.appendChild(li);
  }
})();

/** Render Header */
(function () {
  var pathname = window.location.pathname;
  var mirrorid = pathname.split("/")[1];
  var metas = window.MIRROR_METAS;
  var helpmetas = window.HELP_METAS;
  var meta = metas.find(u => u.id == mirrorid);
  var helpmeta = helpmetas.find(u => u.id == mirrorid || u.id == meta?.helpID);
  var displayName = meta ? (meta.displayName || meta.id) : mirrorid;

  var titleDoms = document.getElementsByClassName('fancyindex__mirrorname');
  var descriptionDom = document.getElementById('fancyindex__description');
  // var lastUpdate = document.getElementById('fancyindex__lastUpdate');
  var helpBtn = document.getElementById('fancyindex__helpbutton');
  var cliBlock = document.getElementById('fancyindex__cliblock');

  for (var i = 0; i < titleDoms.length; i++) {
    var title = titleDoms[i];
    title.textContent = displayName;
  }
  
  // 设置镜像描述
  if (meta && meta.description && descriptionDom) {
    descriptionDom.textContent = meta.description;
    descriptionDom.style.display = 'block'; // 显示描述元素
  } else if (descriptionDom) {
    descriptionDom.style.display = 'none'; // 如果没有描述则隐藏元素
  }
  
  if (helpmeta) { helpBtn.href = "/docs/" + helpmeta.id + (meta?.anchorID ? `#${meta.anchorID}` : ""); }
  else { helpBtn.remove(); }
  if (!meta || !meta.supportCli) cliBlock.remove();
})();

/** set date string */
(function () {
  document.querySelectorAll("#list tbody tr td:nth-child(3)").forEach((e) => {
    var s = new Date(e.textContent + " UTC");
    if (!isNaN(s.getTime())) {
      // 使用Intl.DateTimeFormat本地化时间显示
      var formatter = new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
      e.textContent = formatter.format(s);
    }
  })
})();

/** add script for change theme button */
(function () {
  var defaultMode = 'light';
  function setTheme(th) {
    document.documentElement.setAttribute('data-theme', th);
    theme = th;
    try {
      localStorage.setItem('theme', th);
    } catch (err) { }
  }
  function getStoredTheme() {
    var theme = null;
    try {
      theme = localStorage.getItem('theme');
    } catch (err) { }
    return theme;
  }
  var theme = getStoredTheme() || defaultMode;
  var btn = document.querySelector(".navbar__items--right :nth-child(2) button")
  btn.disabled = false;
  btn.style.cursor = "pointer";
  btn.addEventListener('click', () => {
    setTheme(theme == 'dark' ? 'light' : 'dark')
  })
  /** remove nav toggle button */
  document.querySelector(".navbar__toggle").remove()
})();

/** render HEADER.html and FOOTER.html */
(function () {
  var filenames = [];
  document.querySelectorAll("#list tbody tr td:first-child a")
    .forEach((e) => { filenames.push(e.textContent); });

  const list = document.getElementById("list");

  var header = filenames.find(u => /^header.html?$/.test(u.toLocaleLowerCase()));
  var footer = filenames.find(u => /^footer.html?$/.test(u.toLocaleLowerCase()));
  var readme = filenames.find(u => /^readme.html?$/.test(u.toLocaleLowerCase()));

  function generateIframe(src) {
    var iframe = document.createElement("iframe");
    function resizeIFrameToFitContent() {
      iframe.height = 0; // avoid not shrink
      iframe.width = iframe.contentWindow.document.body.scrollWidth;
      iframe.height = iframe.contentWindow.document.body.scrollHeight;
    }
    function transformDocument() {
      iframe.contentDocument.querySelectorAll('a').forEach((e) => {
        e.target = "_top";
      });
    }
    iframe.src = src;
    iframe.sandbox = "allow-top-navigation allow-same-origin";
    iframe.addEventListener('load', resizeIFrameToFitContent);
    iframe.addEventListener('load', transformDocument);
    iframe.style.width = "100%";
    iframe.style.background = "white";
    window.addEventListener('resize', resizeIFrameToFitContent);
    return iframe;
  }

  if (readme) {
    var iframe = generateIframe(readme);
    list.parentElement.prepend(iframe);
  }

  if (header) {
    var iframe = generateIframe(header);
    list.parentElement.prepend(iframe);
  }

  if (footer) {
    var iframe = generateIframe(footer);
    list.parentElement.append(iframe);
  }

  var template = '<div class="theme-admonition theme-admonition-caution alert alert--warning" style="margin-bottom:16px">' +
    '以下页面由上游站点提供，本站不对内容负责。' +
    '</div>';

  if (readme || header || footer)
    list.parentElement.insertAdjacentHTML('afterbegin', template);


})();