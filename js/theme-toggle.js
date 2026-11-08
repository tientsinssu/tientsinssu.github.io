/* Light/dark toggle button. The initial theme is set by the inline script in <head>; this only handles interaction. */
(function () {
  var root = document.documentElement;
  var btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;
  var system = matchMedia("(prefers-color-scheme: dark)");
  var timer;

  var isDark = function () { return root.classList.contains("dark"); };

  var hasUserChoice = function () {
    try { return !!(localStorage.getItem("theme") || localStorage.getItem("darkMode")); }
    catch (e) { return false; }
  };

  var updateLabel = function () {
    var text = isDark() ? "Switch to light mode" : "Switch to dark mode";
    btn.title = text;
    btn.setAttribute("aria-label", text);
  };

  var apply = function (dark) {
    // Add the transition only while toggling, so the first load has no animation
    root.classList.add("theme-anim");
    clearTimeout(timer);
    timer = setTimeout(function () { root.classList.remove("theme-anim"); }, 250);
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
    updateLabel();
  };

  btn.addEventListener("click", function () {
    var dark = !isDark();
    apply(dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
      localStorage.removeItem("darkMode");   // key from the old theme; remove it once migrated
    } catch (e) {}
  });

  // Follow system changes while the user has never chosen manually
  system.addEventListener("change", function (e) {
    if (!hasUserChoice()) apply(e.matches);
  });

  updateLabel();
  (btn.closest("li") || btn).hidden = false;
})();
