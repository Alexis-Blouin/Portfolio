function setLanguage(lang) {
  fetch("./lang/" + lang + ".json")
    .then((response) => response.json())
    .then((data) => {
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        element.textContent = data[key];
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));

  localStorage.setItem("language", lang);
}

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

  // Loads the html files
  fetch("intro.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("introSection").innerHTML = data;
    })
    .catch((error) => console.error("Error loading HTML:", error));

  fetch("aboutMe.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("aboutMeSection").innerHTML = data;
    })
    .catch((error) => console.error("Error loading HTML:", error));

  fetch("myProjects.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("myProjectsSection").innerHTML = data;

      // Loading the projects content
      const projects = {
        spotRobotProject: "spotRobot.html",
        weatherStationProject: "weatherStation.html",
        chineseLearningAppProject: "chineseLearningApp.html",
        wallpaperApplicationProject: "wallpaperApplication.html",
        dungeonCrawlerProject: "dungeonCrawler.html",
        tetrisGameProject: "tetrisGame.html",
        cncMachineSoftwareProject: "cncMachineSoftware.html",
        roboticPlatformProject: "roboticPlatform.html",
      };
      for (const key in projects) {
        fetch("projects/" + projects[key])
          .then((response) => response.text())
          .then((data) => {
            const container = document.getElementById(key);
            container.innerHTML = data;

            // Adding the accordion and carousel listeners after the import
            new BulmaAccordion(container);
            container
              .querySelectorAll(".slider")
              .forEach((n) => new BulmaCarousel(n));
          })
          .catch((error) => console.error("Error loading HTML:", error));
      }
    })
    .catch((error) => console.error("Error loading HTML:", error));

  fetch("myOffer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("myOfferSection").innerHTML = data;
    })
    .catch((error) => console.error("Error loading HTML:", error));

  fetch("links.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("linksSection").innerHTML = data;
    })
    .catch((error) => console.error("Error loading HTML:", error));

  // Loads the saved language after all the content is loaded
  const savedLanguage = localStorage.getItem("language") || "en";
  setLanguage(savedLanguage);
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
