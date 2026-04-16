let cartCount = 0;
const cartDisplay = document.getElementById("cart-count");
const buttons = document.querySelectorAll(".add-cart");
const toast = document.getElementById("toast");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    cartCount++;
    cartDisplay.textContent = cartCount;
    showToast();
  });
});

function showToast() {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
