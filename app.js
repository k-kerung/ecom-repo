const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "£" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //assing new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

close.addEventListener("click", () => {
  payment.style.display = "none";
});


// Cart functionality
let cart = [];

// Add to cart function
function addToCart(product, colorIndex, size) {
  const newItem = {
    id: Date.now(),
    productId: product.id,
    title: product.title,
    price: product.price,
    color: product.colors[colorIndex].code,
    img: product.colors[colorIndex].img,
    size: size,
    quantity: 1
  };
  
  cart.push(newItem);
  updateCartCount();
  updateCartDisplay();
}

// Update cart count display
function updateCartCount() {
  const cartCount = document.querySelector(".cartCount");
  cartCount.textContent = cart.length;
}

// Display cart contents
function updateCartDisplay() {
  const cartItems = document.querySelector(".cartItems");
  cartItems.innerHTML = "";
  
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
    return;
  }
  
  // Calculate total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Create cart items
  cart.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.className = "cartItem";
    itemElement.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="cartItemImg">
      <div class="cartItemDetails">
        <h3>${item.title}</h3>
        <p>Size: ${item.size}</p>
        <div class="cartItemColor" style="background-color: ${item.color}"></div>
        <div class="cartItemQuantity">
          <button class="decreaseQuantity" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="increaseQuantity" data-id="${item.id}">+</button>
        </div>
      </div>
      <div class="cartItemPrice">
        <span>£${item.price * item.quantity}</span>
        <button class="removeItem" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartItems.appendChild(itemElement);
  });
  
  // Add total to cart
  const totalElement = document.createElement("div");
  totalElement.className = "cartTotal";
  totalElement.innerHTML = `<span>Total: £${total}</span>`;
  cartItems.appendChild(totalElement);
  
  // Add event listeners for quantity and remove buttons
  document.querySelectorAll(".increaseQuantity").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      const item = cart.find(item => item.id === id);
      if (item) {
        item.quantity++;
        updateCartDisplay();
      }
    });
  });
  
  document.querySelectorAll(".decreaseQuantity").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      const item = cart.find(item => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        updateCartDisplay();
      }
    });
  });
  
  document.querySelectorAll(".removeItem").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      cart = cart.filter(item => item.id !== id);
      updateCartCount();
      updateCartDisplay();
    });
  });
}

// Create cart checkout button
function createCheckoutButton() {
  const checkoutBtn = document.createElement("button");
  checkoutBtn.className = "checkoutButton";
  checkoutBtn.textContent = "Checkout";
  checkoutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      payment.style.display = "flex";
    } else {
      alert("Your cart is empty!");
    }
  });
  document.querySelector(".cartContainer").appendChild(checkoutBtn);
}

// Initialize cart
function initializeCart() {
  // Create cart icon in nav
  const navItem = document.createElement("div");
  navItem.className = "navItem";
  navItem.innerHTML = `
    <div class="cartIconContainer">
      <img src="./img/cart.png" alt="Cart" class="cartIcon">
      <span class="cartCount">0</span>
    </div>
  `;
  document.querySelector(".navTop").appendChild(navItem);
  
  // Create cart container
  const cartContainer = document.createElement("div");
  cartContainer.className = "cartContainer";
  cartContainer.innerHTML = `
    <div class="cartHeader">
      <h2>Your Cart</h2>
      <span class="closeCart">X</span>
    </div>
    <div class="cartItems">
      <p>Your cart is empty</p>
    </div>
  `;
  document.body.appendChild(cartContainer);
  
  // Add checkout button
  createCheckoutButton();
  
  // Add event listeners
  document.querySelector(".cartIconContainer").addEventListener("click", () => {
    cartContainer.classList.toggle("active");
  });
  
  document.querySelector(".closeCart").addEventListener("click", () => {
    cartContainer.classList.remove("active");
  });
  // Update product button to add to cart
  productButton.removeEventListener("click", productButtonClickHandler);
  productButton.addEventListener("click", () => {
    // Check if size is selected
    const selectedSize = Array.from(currentProductSizes).find(size => 
      size.style.backgroundColor === "black");
    
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }
    
    // Get selected color index
    let selectedColorIndex = 0;
    currentProductColors.forEach((color, index) => {
      if (color.classList.contains("selected")) {
        selectedColorIndex = index;
      }
    });
    
    // Add to cart
    addToCart(choosenProduct, selectedColorIndex, selectedSize.textContent);
    
    // Show confirmation
    alert(`${choosenProduct.title} added to cart!`);
  });
}

// Store original product button click handler
const productButtonClickHandler = function() {
  payment.style.display = "flex";
};

// Add class to selected color
currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductColors.forEach(c => c.classList.remove("selected"));
    color.classList.add("selected");
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

// Initialize cart when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeCart);