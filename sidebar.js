// sidebar.js
const SpurtLinksSidebar = {
  navItems: [
    { icon: "fas fa-compass", label: "Discover", path: "/discover.html" },
    { icon: "fas fa-heart", label: "Matches", path: "/matches.html" },
    { icon: "fas fa-comment", label: "Chat", path: "/chat-list.html" },
    { icon: "fas fa-wallet", label: "Wallet", path: "/wallet.html" },
    { icon: "fas fa-user", label: "Profile", path: "/profile.html" },
    { icon: "fas fa-cog", label: "Settings", path: "/settings.html" },
  ],

  init: function () {
    this.sidebar = document.getElementById("spurtlinksSidebar");
    this.sidebarNav = document.getElementById("sidebarNav");
    this.mobileBtn = document.getElementById("mobileMenuBtn");
    this.closeBtn = document.getElementById("sidebarCloseBtn");
    this.themeToggle = document.getElementById("themeToggle");
    this.sunIcon = this.themeToggle?.querySelector(".fa-sun");
    this.moonIcon = this.themeToggle?.querySelector(".fa-moon");
    this.themeLabel = this.themeToggle?.querySelector(".nav-label");
    this.isCollapsed = false;
    this.isMobile = window.innerWidth < 1024;

    if (!this.sidebar) return;

    this.renderNav();
    this.loadTheme();
    this.bindEvents();
    this.checkScreenSize();
  },

  renderNav: function () {
    const currentPage = this.getCurrentPage();
    this.sidebarNav.innerHTML = this.navItems
      .map((item) => {
        const isActive = currentPage === item.path;
        return `
                <a href="${item.path}" class="nav-item ${isActive ? "active" : ""}">
                    <i class="${item.icon}"></i>
                    <span class="nav-label">${item.label}</span>
                </a>
            `;
      })
      .join("");
  },

  getCurrentPage: function () {
    const path = window.location.pathname.split("/").pop() || "discover.html";
    for (const item of this.navItems) {
      if (item.path.includes(path)) {
        return item.path;
      }
    }
    return "/discover.html";
  },

  closeSidebar: function () {
    this.sidebar.classList.add("collapsed");
    this.isCollapsed = true;
    this.showHamburgerMenu();
  },

  openSidebar: function () {
    this.sidebar.classList.remove("collapsed");
    this.isCollapsed = false;
    this.hideHamburgerMenu();
  },

  toggleSidebar: function () {
    if (this.sidebar.classList.contains("collapsed")) {
      this.openSidebar();
    } else {
      this.closeSidebar();
    }
  },

  showHamburgerMenu: function () {
    if (this.mobileBtn) {
      this.mobileBtn.style.display = "flex";
    }
  },

  hideHamburgerMenu: function () {
    if (this.mobileBtn) {
      this.mobileBtn.style.display = "none";
    }
  },

  openMobileSidebar: function () {
    this.sidebar.classList.add("mobile-open");
    document.body.style.overflow = "hidden";
  },

  closeMobileSidebar: function () {
    this.sidebar.classList.remove("mobile-open");
    document.body.style.overflow = "";
  },

  toggleTheme: function () {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");

    if (isDark) {
      this.sunIcon.style.display = "none";
      this.moonIcon.style.display = "inline-block";
      this.themeLabel.textContent = "Light mode";
    } else {
      this.sunIcon.style.display = "inline-block";
      this.moonIcon.style.display = "none";
      this.themeLabel.textContent = "Dark mode";
    }

    localStorage.setItem("spurtlinks-theme", isDark ? "dark" : "light");
  },

  loadTheme: function () {
    const savedTheme = localStorage.getItem("spurtlinks-theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      this.sunIcon.style.display = "none";
      this.moonIcon.style.display = "inline-block";
      this.themeLabel.textContent = "Light mode";
    }
  },

  checkScreenSize: function () {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 1024;

    if (this.isMobile) {
      this.closeMobileSidebar();
      this.sidebar.classList.add("collapsed");
      this.isCollapsed = true;
      this.hideHamburgerMenu();
    } else {
      this.sidebar.classList.remove("collapsed");
      this.isCollapsed = false;
      this.hideHamburgerMenu();
      this.closeMobileSidebar();
    }

    if (wasMobile !== this.isMobile) {
      this.renderNav();
    }
  },

  bindEvents: function () {
    this.mobileBtn?.addEventListener("click", () => this.openSidebar());

    this.closeBtn?.addEventListener("click", () => {
      if (this.isMobile) {
        this.closeMobileSidebar();
      } else {
        this.closeSidebar();
      }
    });

    this.themeToggle?.addEventListener("click", () => this.toggleTheme());

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.checkScreenSize(), 100);
    });

    document.addEventListener("click", (e) => {
      if (this.isMobile) {
        if (
          this.sidebar.classList.contains("mobile-open") &&
          !this.sidebar.contains(e.target) &&
          !this.mobileBtn?.contains(e.target)
        ) {
          this.closeMobileSidebar();
        }
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", () => SpurtLinksSidebar.init());
