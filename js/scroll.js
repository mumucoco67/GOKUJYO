(function () {
  document.addEventListener("DOMContentLoaded", function (event) {
    let scrollFadeInEffectEls = document.querySelectorAll(
      ".scroll-fade-in-effect"
    );

    scrollFadeInInit(scrollFadeInEffectEls);

    window.addEventListener("scroll", function () {
      scrollFadeInEffect(scrollFadeInEffectEls);
    });
  });

  function scrollFadeInInit(currentElements) {
    let windowHeight = window.innerHeight;
    for (let i = 0; i < currentElements.length; i++) {
      let posFromTop = currentElements[i].getBoundingClientRect().top;
      if (posFromTop - windowHeight > 0) {
        currentElements[i].classList.add("is-hidden");
      }
    }
  }

  function scrollFadeInEffect(currentElements) {
    let windowHeight = window.innerHeight;
    for (let i = 0; i < currentElements.length; i++) {
      let posFromTop = currentElements[i].getBoundingClientRect().top;
      if (posFromTop - windowHeight <= 0) {
        currentElements[i].classList.remove("is-hidden");
      }
    }
  }
})();
