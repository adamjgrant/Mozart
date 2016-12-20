(function() {
  window.smoothtocer = function($toc_container, $content) {
    var $headingLevel, $link, $menuItem, $newSubmenu, $stepsUp, $targetNode, $thisHeadingLevel, $toc, heading, k$, _i, _len, _ref;
    k$ = new Object();
    k$.$$ = function(el) {
      return document.querySelectorAll(el);
    };
    k$.$ = function(el) {
      return k$.$$(el)[0];
    };
    k$.slugify = function(str) {
      return str.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    };
    if ($toc_container) {
      $toc = document.createElement('ul');
      $link = document.createElement('li');
      $link.innerHTML = '<a></a>';
      $headingLevel = 1;
      $targetNode = $toc;
      _ref = $content.querySelectorAll('h1, h2, h3, h4, h5, h6');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        heading = _ref[_i];
        if (!heading.classList.contains('toc-exempt')) {
          heading.id = k$.slugify(heading.innerHTML);
          $thisHeadingLevel = parseInt(heading.tagName.substr(1, 2));
          if ($thisHeadingLevel > $headingLevel) {
            $newSubmenu = document.createElement('ul');
            $targetNode.children[$targetNode.children.length - 1].appendChild($newSubmenu);
            $targetNode = $newSubmenu;
            $headingLevel = $thisHeadingLevel;
          }
          if ($thisHeadingLevel < $headingLevel) {
            $stepsUp = $headingLevel - $thisHeadingLevel;
            while ($stepsUp > 0) {
              $targetNode = $targetNode.parentNode.parentNode;
              $stepsUp--;
            }
            $headingLevel = $thisHeadingLevel;
          }
          $menuItem = $link.cloneNode(true);
          $menuItem.querySelector('a').href = "#" + heading.id;
          $menuItem.querySelector('a').innerHTML = heading.innerHTML;
          $targetNode.appendChild($menuItem);
        }
      }
      return $toc_container.appendChild($toc);
    } else {
      return console.error('Did not find a Table of Contents container. Found: ' + $toc_container);
    }
  };

}).call(this);

