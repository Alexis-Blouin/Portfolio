document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0,
  );

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button",
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
});

class BulmaAccordion {
  constructor(node) {
    this.accordion = node;
    this.button = this.accordion.querySelector(".toggle");
    this.init();
  }
  init() {
    if (this.button)
      this.button.addEventListener("click", () => this.togglePanel());
  }
  togglePanel() {
    this.accordion.classList.toggle("is-active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".accordion").forEach((n) => new BulmaAccordion(n));
});

class BulmaCarousel {
  constructor(node) {
    this.element = node;
    this.container = this.element.querySelector(".slider-container");
    this.items = this.element.querySelectorAll(".slider-item");
    this.prev = this.element.querySelector(".slider-navigation-previous");
    this.next = this.element.querySelector(".slider-navigation-next");
    this.pagination = this.element.querySelectorAll(".slider-page");
    this.isVertical = this.container.classList.contains("is-vertical");
    this.currentIndex = 0;
    this.init();
  }
  init() {
    if (this.prev) this.prev.addEventListener("click", () => this.move(-1));
    if (this.next) this.next.addEventListener("click", () => this.move(1));
    this.pagination.forEach((page) => {
      page.addEventListener("click", () => {
        this.currentIndex = parseInt(page.dataset.index);
        this.update();
      });
    });
    window.addEventListener("resize", () => this.update());
  }
  move(delta) {
    this.currentIndex =
      (this.currentIndex + delta + this.items.length) % this.items.length;
    this.update();
  }
  update() {
    this.items.forEach((e) => this.transition(e));
    this.pagination.forEach((page, i) => {
      page.classList.toggle("is-active", i === this.currentIndex);
    });
  }
  transition(item) {
    var dir = "X";
    if (this.isVertical) {
      dir = "Y";
    }
    item.style.transform = `translate${dir}(${this.currentIndex * -100}%)`;
    if (this.isVertical) {
      for (let i = 0; i < Math.min(this.items.length, this.currentIndex); i++) {
        this.items[i].style.transform =
          `translate${dir}(${(this.items.length - this.currentIndex) * 100}%)`;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slider").forEach((n) => new BulmaCarousel(n));
});
