class MobileNavbar {
  constructor(mobileMenu, itensMenu, ItensMenuLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.itensMenu = document.querySelector(itensMenu);
    this.itensMenuLinks = document.querySelectorAll(ItensMenuLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

   animateLinks() {
    this.itensMenuLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `itensMenuLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }



  handleClick() {
    this.itensMenu.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".itens-menu",
  ".itens-menu a",
);
mobileNavbar.init();


  