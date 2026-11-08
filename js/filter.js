/* Category filter + tag sorting. Without JS the buttons stay hidden and every post is listed. */
(function () {
  // ---------- Category filter (/post/ and /tags/<tag>/) ----------
  var bar = document.querySelector("[data-cat-filter]");
  var list = document.querySelector("[data-filter-list]");
  if (bar && list) {
    var buttons = bar.querySelectorAll("button[data-cat]");
    var countEl = document.querySelector("[data-count]");
    var countLabel = document.querySelector("[data-count-label]");

    var apply = function (cat, updateHash) {
      var total = 0;
      buttons.forEach(function (b) {
        var on = b.dataset.cat === cat;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on);
      });
      list.querySelectorAll(".year-group").forEach(function (group) {
        var n = 0;
        group.querySelectorAll(".post-row").forEach(function (row) {
          var show = !cat || row.dataset.category === cat;
          row.hidden = !show;
          if (show) n++;
        });
        group.hidden = n === 0;
        total += n;
      });
      if (countEl) countEl.textContent = total;
      if (countLabel) countLabel.textContent = total === 1 ? countLabel.dataset.one : countLabel.dataset.other;
      if (updateHash) {
        history.replaceState(null, "", cat ? "#" + encodeURIComponent(cat) : location.pathname + location.search);
      }
    };

    // Preselect from the URL's #category (a post's category link points to /post/#Notes)
    var fromHash = function () {
      var cat = "";
      try { cat = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
      var exists = Array.prototype.some.call(buttons, function (b) { return b.dataset.cat === cat; });
      apply(exists ? cat : "", false);
    };

    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-cat]");
      if (b) apply(b.dataset.cat, true);
    });
    window.addEventListener("hashchange", fromHash);
    bar.hidden = false;
    fromHash();
  }

  // ---------- Tag sorting (/tags/) ----------
  var tagList = document.querySelector("[data-tag-list]");
  var sortBtn = document.querySelector("[data-tag-sort]");
  if (tagList && sortBtn) {
    var collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });
    var items = Array.prototype.slice.call(tagList.children);
    var byName = false;
    sortBtn.addEventListener("click", function () {
      byName = !byName;
      items.sort(byName
        ? function (a, b) { return collator.compare(a.dataset.name, b.dataset.name); }
        : function (a, b) { return a.dataset.order - b.dataset.order; });
      items.forEach(function (li) { tagList.appendChild(li); });
      sortBtn.textContent = byName ? "By name ⇅" : "By count ⇅";
    });
    sortBtn.hidden = false;
  }
})();
