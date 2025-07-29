"use strict";
var theme = {
   init: function () {
      theme.progressPageLoad();
      theme.menu();
      theme.otpVarification();
      theme.stickyHeader();
      theme.counterState();
      theme.alertJS();
      theme.popovers();
      theme.tooltip();
      theme.validation();
      theme.toast();
   },

   // ProgressPageLoad
   progressPageLoad: () => {
      var progressWrap = document.querySelector(".btn-scroll-top");
      if (progressWrap != null) {
         var progressPath = document.querySelector(".btn-scroll-top path");
         var pathLength = progressPath.getTotalLength();
         var offset = 50;
         progressPath.style.transition = progressPath.style.WebkitTransition = "none";
         progressPath.style.strokeDasharray = pathLength + " " + pathLength;
         progressPath.style.strokeDashoffset = pathLength;
         progressPath.getBoundingClientRect();
         progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
         window.addEventListener("scroll", function (event) {
            var scroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;
            var scrollElementPos = document.body.scrollTop || document.documentElement.scrollTop;
            if (scrollElementPos >= offset) {
               progressWrap.classList.add("active-progress");
            } else {
               progressWrap.classList.remove("active-progress");
            }
         });
         progressWrap.addEventListener("click", function (e) {
            e.preventDefault();
            window.scroll({
               top: 0,
               left: 0,
               behavior: "smooth",
            });
         });
      }
   },

   // Menu
   menu: () => {
      const dropdownLinks = document.querySelectorAll(".dropdown-menu a.dropdown-toggle");

      dropdownLinks.forEach(function (dropdownLink) {
         dropdownLink.addEventListener("click", function (e) {
            if (!this.nextElementSibling.classList.contains("show")) {
               const parentDropdownMenu = this.closest(".dropdown-menu");
               const currentlyOpenSubMenus = parentDropdownMenu.querySelectorAll(".show");
               currentlyOpenSubMenus.forEach(function (openSubMenu) {
                  openSubMenu.classList.remove("show");
               });
            }

            const subMenu = this.nextElementSibling;
            subMenu.classList.toggle("show");

            const parentDropdown = this.closest("li.nav-item.dropdown.show");
            if (parentDropdown) {
               parentDropdown.addEventListener("hidden.bs.dropdown", function (e) {
                  const dropdownSubMenus = document.querySelectorAll(".dropdown-submenu .show");
                  dropdownSubMenus.forEach(function (dropdownSubMenu) {
                     dropdownSubMenu.classList.remove("show");
                  });
               });
            }

            e.stopPropagation();
         });
      });
   },

   // Sticky Header
   stickyHeader: () => {
      var navbar = document.querySelector(".navbar");
      if (navbar == null) return;
      var options = {
         offset: 400,
         offsetSide: "top",
         classes: {
            clone: "navbar-clone fixed",
            stick: "navbar-stick",
            unstick: "navbar-unstick",
         },
         onStick: function () {
            var navbarClonedClass = this.clonedElem.classList;
            if (navbarClonedClass.contains("transparent") && navbarClonedClass.contains("navbar-dark")) {
               this.clonedElem.className = this.clonedElem.className.replace("navbar-dark", "navbar-light", "navbar-stick");
            }
         },
      };
      var banner = new Headhesive(".navbar", options);
   },

   // Counter State
   counterState: () => {
      var counters = document.querySelectorAll(".counter");
      counters.forEach(function (counter) {
         var countTo = counter.getAttribute("data-count");
         var countNum = parseInt(counter.textContent);
         var duration = 4000;
         var stepDuration = duration / Math.abs(countTo - countNum);
         var increment = countTo > countNum ? 1 : -1;

         var timer = setInterval(function () {
            countNum += increment;
            counter.textContent = countNum;

            if (countNum == countTo) {
               clearInterval(timer);
               //alert('finished');
            }
         }, stepDuration);
      });
   },

   // Alert
   alertJS: () => {
      const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
      const appendAlert = (message, type) => {
         const wrapper = document.createElement("div");
         wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            "</div>",
         ].join("");

         alertPlaceholder.append(wrapper);
      };

      const alertTrigger = document.getElementById("liveAlertBtn");
      if (alertTrigger) {
         alertTrigger.addEventListener("click", () => {
            appendAlert("Nice, you triggered this alert message!", "success");
         });
      }
   },

   // Popovers
   popovers: () => {
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
      const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));
   },

   // Tooltip
   tooltip: () => {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
   },

   // Validation
   validation: () => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll(".needs-validation");
      // Loop over them and prevent submission
      Array.from(forms).forEach((form) => {
         form.addEventListener(
            "submit",
            (event) => {
               if (!form.checkValidity()) {
                  event.preventDefault();
                  event.stopPropagation();
               }

               form.classList.add("was-validated");
            },
            false,
         );
      });
   },

   // Toast
   toast: () => {
      const toastTrigger = document.getElementById("liveToastBtn");
      const toastLiveExample = document.getElementById("liveToast");

      if (toastTrigger) {
         const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
         toastTrigger.addEventListener("click", () => {
            toastBootstrap.show();
         });
      }
   },

   // Otp code
   otpVarification: () => {
      document.moveToNextInput = function (input) {
         if (input.value.length === input.maxLength) {
            // Get the index of the current input field
            const currentIndex = Array.from(input.parentElement.children).indexOf(input);

            // Get the next input field if it exists
            const nextInput = input.parentElement.children[currentIndex + 1];

            // Move focus to the next input field
            if (nextInput) {
               nextInput.focus();
            }
         }
      };
   },
};

theme.init();

  //<!-- === Shuffle Home Marquee Images === -->
  async function loadMarqueeImages() {
    const res = await fetch('./assets/data/images.json');
    const data = await res.json();

    // Shuffle home_priority
    const homePriority = (data["home_priority"] || [])
      .map(file => `./assets/images/home_priority/${file}`)
      .sort(() => Math.random() - 0.5);

    // Shuffle all other images
    const otherImages = Object.entries(data)
      .filter(([key]) => key !== "home_priority")
      .flatMap(([folder, files]) =>
        files.map(file => `./assets/images/${folder.charAt(0).toUpperCase() + folder.slice(1)}/${file}`)
      ).sort(() => Math.random() - 0.5);

    const used = new Set();
    const topTrack = document.querySelector('.track');
    const bottomTrack = document.querySelector('.track-2');

    function getUnique(pool) {
      while (pool.length) {
        const img = pool.pop();
        if (!used.has(img)) {
          used.add(img);
          return img;
        }
      }
      return null;
    }

    function createImgBox(src, parent, fallbackPool) {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight;
        if (ratio < 0.8 || ratio > 1.8) {
          const fallback = getUnique(fallbackPool);
          if (fallback) createImgBox(fallback, parent, fallbackPool);
          return;
        }

        const box = document.createElement('div');
        box.className = 'custom-img-box';
        img.alt = 'Image';
        img.className = 'img-cover border';
        box.appendChild(img);
        parent.appendChild(box);
      };

      img.onerror = () => {
        const fallback = getUnique(fallbackPool);
        if (fallback) createImgBox(fallback, parent, fallbackPool);
      };
    }

    const total = 20;
    let track = [topTrack, bottomTrack];
    let trackIndex = 0;

    for (let i = 0; i < total / 2; i++) {
      const prioritySrc = getUnique(homePriority);
      const fallbackSrc = getUnique(otherImages);

      if (prioritySrc) createImgBox(prioritySrc, track[trackIndex % 2], otherImages);
      trackIndex++;

      if (fallbackSrc) createImgBox(fallbackSrc, track[trackIndex % 2], otherImages);
      trackIndex++;
    }
  }

  document.addEventListener("DOMContentLoaded", loadMarqueeImages);

  //<!-- === Email Validation for All Forms === -->

    document.addEventListener("DOMContentLoaded", function () {
      const forms = document.querySelectorAll("form");

      forms.forEach(form => {
        form.addEventListener("submit", function (e) {
          const emailInput = form.querySelector("input[type='email']");
          const email = emailInput?.value.trim();
          const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
          const feedback = emailInput?.closest('div')?.querySelector('.invalid-feedback');

          if (!isValid) {
            e.preventDefault();
            emailInput.classList.add("is-invalid");
            if (feedback) feedback.textContent = "Please enter a valid email address.";
            emailInput.focus();
          } else {
            emailInput.classList.remove("is-invalid");
          }
        });
      });
    });



 // <!-- === Gallery Tab Reset Fix === -->
    document.querySelectorAll('a.dropdown-item[href^="gallery.html#"]').forEach(link => {
      link.addEventListener('click', function () {
        this.blur();
        setTimeout(() => {
          if (window.location.pathname.includes('index.html')) {
            history.replaceState(null, "", window.location.pathname);
          }
        }, 1000);
      });
    });

