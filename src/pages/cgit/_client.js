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

