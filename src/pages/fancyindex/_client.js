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
  var metas = MIRROR_METAS; /** Inject Meta Here */
  var meta = metas.find(u => u.id == mirrorid);
  var displayName = meta ? (meta.displayName || meta.id) : mirrorid;

  var titleDoms = document.getElementsByClassName('fancyindex__mirrorname');
  var lastUpdate = document.getElementById('fancyindex__lastUpdate');
  var helpBtn = document.getElementById('fancyindex__helpbutton');

  for (var i = 0; i < titleDoms.length; i++) {
    var title = titleDoms[i];
    title.textContent = mirrorid;
  }
  if (meta) helpBtn.href = "/docs/" + meta.helpID || meta.id;
})();

/** set date string */
(function () {
  document.querySelectorAll("#list tbody tr td:nth-child(3)").forEach((e) => {
    var s = new Date(e.textContent);
    if (!isNaN(s.getTime())) {
      var u = ("000" + s.getFullYear()).substr(-4) + "-" + ("0" + (s.getMonth() + 1)).substr(-2) + "-" + ("0" + s.getDate()).substr(-2) + " " + ("0" + s.getHours()).substr(-2) + ":" + ("0" + s.getMinutes()).substr(-2);
      e.textContent = u;
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
  /** remove nav toggle button */
  document.querySelector(".navbar__toggle").remove()
})()