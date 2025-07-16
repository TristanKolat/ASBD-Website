// Offcanvas

var navbar = document.querySelector(".navbar");

const navOffCanvasBtn = document.querySelectorAll(".offcanvas-nav-btn");
const navOffCanvas = document.querySelector(".navbar:not(.navbar-clone) .offcanvas-nav");

// Declare bsOffCanvas outside the if block
let bsOffCanvas;

// Check if the navOffCanvas element exists before creating the Offcanvas instance
if (navOffCanvas) {
    bsOffCanvas = new bootstrap.Offcanvas(navOffCanvas, { scroll: true });

    // Event listeners
    navOffCanvasBtn.forEach((e) => {
        e.addEventListener("click", (event) => {
            toggleOffCanvas();
        });
    });
}

// Function to toggle the Offcanvas
function toggleOffCanvas() {
    if (bsOffCanvas && bsOffCanvas._isShown) {
        bsOffCanvas.hide();
    } else if (bsOffCanvas) {
        bsOffCanvas.show();
    }
}

//function to make sure all clones of off canvas are dismissed when pressing 'x'
document.querySelectorAll('.btn-close[data-bs-dismiss="offcanvas"]').forEach(button => {
  button.addEventListener('click', () => {
    const offcanvasElements = document.querySelectorAll('.offcanvas');

    offcanvasElements.forEach(el => {
      const instance = bootstrap.Offcanvas.getInstance(el);
      if (instance) {
        instance.hide(); // cleanly closes
      } else {
        const newInstance = new bootstrap.Offcanvas(el);
        newInstance.hide();
      }
    });
  });
});

//function to make sure all clones of off canvas are dismissed when tapping outside pane
document.querySelectorAll('.offcanvas').forEach(el => {
  el.addEventListener('hide.bs.offcanvas', () => {
    // Close ALL offcanvas instances cleanly
    document.querySelectorAll('.offcanvas').forEach(otherEl => {
      const instance = bootstrap.Offcanvas.getInstance(otherEl);
      if (instance && instance._isShown) {
        instance.hide();
      }
    });
  });
});


