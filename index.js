const productsPerPage = 9;
const allCategoriesName = "All Category";
const cartStorageKey = "tourexCart";
const stickyScrollPosition = 250;

const lightLogoPath = "tourex_image/logo_header.webp";
const darkLogoPath = "tourex_image/logo_dark.webp";

const categoryOrder = [
  "Activity",
  "Destinations",
  "Beach Tour",
  "City Tour",
  "Flight",
  "Lifestyle",
];

let allProducts = [];
let cartItems = [];
let wishlistIds = [];
let currentPage = 1;
let currentView = "grid";
let currentSort = "default";
let selectedCategory = allCategoriesName;
let searchText = "";
let searchTimer;

const productGrid = document.getElementById("productGrid");
const pagination = document.getElementById("pagination");
const resultText = document.getElementById("resultText");
const categoryList = document.getElementById("categoryList");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");

const sortDropdown = document.getElementById("sortDropdown");
const sortButton = document.getElementById("sortButton");
const sortLabel = document.getElementById("sortLabel");
const sortList = document.getElementById("sortList");
const sortOptions = sortList.querySelectorAll("li");

const viewButtons = document.querySelectorAll("[data-view]");

const headerArea = document.getElementById("headerArea");
const headerLogo = document.getElementById("headerLogo");
const backToTopButton = document.getElementById("backToTop");

const mobileMenu = document.getElementById("mobileMenu");
const infoPanel = document.getElementById("infoPanel");
const overlay = document.getElementById("offcanvasOverlay");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const desktopMenuButton = document.getElementById("desktopMenuButton");
const closeButtons = document.querySelectorAll("[data-close]");
const accordionItems = mobileMenu.querySelectorAll("li[data-open]");

const gridClasses = "grid grid-cols-1 gap-[24px] sm:grid-cols-2 xl:grid-cols-3";
const listClasses = "grid grid-cols-1 gap-[24px]";

const categoryItemClasses =
  "flex cursor-pointer justify-between border-b border-[#e6e6e6] pb-2.5 pt-[11px] text-[15px] text-body transition-colors duration-300 last:border-b-0 hover:text-primary";

const iconButtonClasses =
  "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#fffdfd] p-0 text-[15px] leading-none text-[#393939] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:bg-primary hover:text-white active:bg-primary active:text-white [&>svg]:relative [&>svg]:top-px ";

const wishlistButtonClasses =
  iconButtonClasses +
  " group-hover/c:bg-primary group-hover/c:text-white group-data-[show=true]/c:bg-primary";

const hiddenIconButtonClasses =
  iconButtonClasses +
  " invisible translate-x-3 opacity-0 group-hover/c:visible group-hover/c:translate-x-0 group-hover/c:opacity-100";

const pageButtonClasses =
  "h-11 min-w-11 cursor-pointer rounded-lg bg-[#f1f3f5] p-0 text-sm font-medium leading-[44px] text-dark enabled:hover:bg-primary enabled:hover:text-white data-[active=true]:bg-primary data-[active=true]:text-white disabled:cursor-default";

const previousNextExtraClasses =
  " flex items-center justify-center px-[30px] py-[15px] text-sm italic";

const heartIcon = `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
<path d="M15.96 2.2377C15.5678 1.84531 15.1022 1.53404 14.5896 1.32168C14.0771 1.10931 13.5277 1 12.973 1C12.4182 1 11.8688 1.10931 11.3563 1.32168C10.8437 1.53404 10.3781 1.84531 9.98587 2.2377L9.17191 3.05166L8.35794 2.2377C7.56572 1.44548 6.49123 1.00041 5.37086 1.00041C4.25049 1.00041 3.176 1.44548 2.38378 2.2377C1.59155 3.02993 1.14648 4.10441 1.14648 5.22479C1.14648 6.34516 1.59155 7.41965 2.38378 8.21187L9.17191 15L15.96 8.21187C16.3524 7.81967 16.6637 7.354 16.8761 6.84146C17.0884 6.32893 17.1977 5.77958 17.1977 5.22479C17.1977 4.67 17.0884 4.12064 16.8761 3.60811C16.6637 3.09558 16.3521 2.6299 15.96 2.2377Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const cartIcon = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
<path d="M0.799805 4.2L3.1998 1H12.7998L15.1998 4.2M0.799805 4.2V15.4C0.799805 15.8243 0.968376 16.2313 1.26843 16.5314C1.56849 16.8314 1.97546 17 2.3998 17H13.5998C14.0242 17 14.4311 16.8314 14.7312 16.5314C15.0312 16.2313 15.1998 15.8243 15.1998 15.4V4.2M0.799805 4.2H15.1998M11.1998 7.4C11.1998 8.24869 10.8627 9.06263 10.2625 9.66274C9.66243 10.2629 8.8485 10.6 7.9998 10.6C7.15111 10.6 6.33718 10.2629 5.73706 9.66274C5.13695 9.06263 4.7998 8.24869 4.7998 7.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const compareIcon = `<svg width="15" height="16" viewBox="0 0 15 16" fill="none" aria-hidden="true">
<path d="M10.222 1H14.1109M14.1109 1V4.88889M14.1109 1L0.888672 14.2222M14.1109 11.1111V15M14.1109 15H10.222M14.1109 15L9.44423 10.3333M0.888672 1.77778L4.77756 5.66667" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const starIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" width="16" height="16" class="block h-4 w-4" aria-hidden="true">
<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
</svg>`;

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(cartStorageKey));

    if (Array.isArray(savedCart)) {
      cartItems = savedCart;
    }
  } catch (error) {
    console.error("Could not read the saved cart:", error);
  }
}

function saveCart() {
  try {
    localStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Could not save the cart:", error);
  }
}

function updateCartCount() {
  let totalItems = 0;

  for (const item of cartItems) {
    totalItems = totalItems + item.quantity;
  }

  cartCount.textContent = totalItems;
}

function addToCart(productId) {
  let foundItem = null;

  for (const item of cartItems) {
    if (item.id === productId) {
      foundItem = item;
    }
  }

  if (foundItem) {
    foundItem.quantity = foundItem.quantity + 1;
  } else {
    cartItems.push({ id: productId, quantity: 1 });
  }

  saveCart();
  updateCartCount();
}

async function loadProducts() {
  try {
    const response = await fetch("products.json");

    if (!response.ok) {
      throw new Error("Failed to load products");
    }

    allProducts = await response.json();

    showCategories();
    showProducts();
  } catch (error) {
    console.error(error);

    const errorMessage = document.createElement("p");
    errorMessage.className = "col-span-full py-10 text-center";
    errorMessage.textContent = "Failed to load products";

    productGrid.replaceChildren(errorMessage);
    resultText.textContent = "No Results Found";
  }
}

function addCategoryItem(categoryName, productCount) {
  const categoryItem = document.createElement("li");
  categoryItem.className = categoryItemClasses;

  const nameSpan = document.createElement("span");
  nameSpan.textContent = categoryName;

  const countSpan = document.createElement("span");
  countSpan.textContent = "(" + productCount + ")";

  categoryItem.append(nameSpan, countSpan);
  categoryList.append(categoryItem);

  categoryItem.addEventListener("click", chooseCategory);

  categoryItem.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      chooseCategory();
    }
  });

  function chooseCategory() {
    selectedCategory = categoryName;
    currentPage = 1;

    const allCategoryItems = categoryList.querySelectorAll("li");

    for (const item of allCategoryItems) {
      item.classList.remove("text-primary");
    }

    categoryItem.classList.add("text-primary");

    showProducts();
  }
}

function showCategories() {
  const categoryCounts = {};

  for (const product of allProducts) {
    if (categoryCounts[product.category]) {
      categoryCounts[product.category] = categoryCounts[product.category] + 1;
    } else {
      categoryCounts[product.category] = 1;
    }
  }

  const categoryNames = Object.keys(categoryCounts);

  categoryNames.sort(function (firstName, secondName) {
    return categoryOrder.indexOf(firstName) - categoryOrder.indexOf(secondName);
  });

  categoryList.replaceChildren();

  addCategoryItem(allCategoriesName, allProducts.length);

  for (const categoryName of categoryNames) {
    addCategoryItem(categoryName, categoryCounts[categoryName]);
  }
}
searchInput.addEventListener("input", function () {
  clearTimeout(searchTimer);

  searchTimer = setTimeout(function () {
    searchText = searchInput.value.trim().toLowerCase();
    currentPage = 1;
    showProducts();
  }, 500);
});

function createStars(rating) {
  const starsBox = document.createElement("div");
  starsBox.className = "relative ml-[9px] flex flex-none pt-[3px]";

  for (let starNumber = 1; starNumber <= 5; starNumber++) {
    const star = document.createElement("span");
    star.className = "block h-4 w-4 flex-[0_0_16px] leading-[0]";

    if (starNumber <= Math.round(rating)) {
      star.classList.add("text-[#ffbc0b]");
    } else {
      star.classList.add("text-[#ccc]");
    }

    star.innerHTML = starIcon;
    starsBox.appendChild(star);
  }

  return starsBox;
}

function createProductCard(product, isListView) {
  const card = document.createElement("div");
  card.className = "group/c bg-transparent";
  card.dataset.show = "false";

  if (isListView) {
    card.classList.add(
      "flex",
      "flex-col",
      "gap-5",
      "md:flex-row",
      "md:items-center",
      "md:gap-[30px]",
      "xl:gap-[40px]",
    );
  }
  const imageBox = document.createElement("div");
  imageBox.className =
    "relative h-[270px] w-full overflow-hidden rounded-[15px] bg-[#f6f6f8]";
  imageBox.dataset.imageBox = "true";

  if (isListView) {
    imageBox.classList.add("md:w-[50%]", "xl:w-[60%]");
  }

  const productImage = document.createElement("img");
  productImage.className =
    "block h-[270px] w-full max-w-full rounded-[15px] transition-transform duration-500 ease-out group-hover/c:scale-105 group-data-[show=true]/c:scale-105 cursor-pointer";
  productImage.src = product.image;
  productImage.alt = product.title;

  if (isListView) {
    productImage.classList.add("xl:w-[60%]", "xl:ml-[110px]", "xl:shrink-0");
  }

  const iconButtonsBox = document.createElement("div");
  iconButtonsBox.className =
    "absolute right-[15px] top-[13px] flex flex-col gap-[6px]";

  const wishlistButton = document.createElement("button");
  wishlistButton.className = wishlistButtonClasses;
  wishlistButton.type = "button";
  wishlistButton.innerHTML = heartIcon;

  const cartButton = document.createElement("button");
  cartButton.className = hiddenIconButtonClasses;
  cartButton.type = "button";
  cartButton.setAttribute("aria-label", "Add to cart");
  cartButton.innerHTML = cartIcon;

  const compareButton = document.createElement("button");
  compareButton.className = hiddenIconButtonClasses;
  compareButton.type = "button";
  compareButton.innerHTML = compareIcon;

  iconButtonsBox.append(wishlistButton, cartButton, compareButton);
  imageBox.append(productImage, iconButtonsBox);

  wishlistButton.addEventListener("click", function () {
    if (wishlistIds.includes(product.id)) {
      wishlistIds = wishlistIds.filter(function (id) {
        return id !== product.id;
      });
    } else {
      wishlistIds.push(product.id);
    }

    wishlistButton.dataset.active = String(wishlistIds.includes(product.id));
  });

  cartButton.addEventListener("click", function () {
    addToCart(product.id);
  });

  compareButton.addEventListener("click", function () {
    console.log("Compare product:", product.id);
  });

  const details = document.createElement("div");
  details.className = "pb-0.5 pt-[14px]";

  if (isListView) {
    details.classList.add("md:p-0");
  }

  const title = document.createElement("h3");
  title.className =
    "relative mb-2 text-base font-medium capitalize leading-[1.2] text-dark";
  title.textContent = product.title;

  const ratingBox = document.createElement("div");
  ratingBox.className =
    "mb-1 flex h-[26px] flex-nowrap items-center whitespace-nowrap";

  const reviewCount = document.createElement("span");
  reviewCount.className =
    "relative -top-px ml-[3px] mt-[1px] flex-none pt-[1px] text-sm leading-[26px] text-body";
  reviewCount.textContent = "(" + product.review + ")";

  ratingBox.append(createStars(product.rating), reviewCount);

  const priceBox = document.createElement("div");
  priceBox.className =
    "relative flex h-[26px] items-center whitespace-nowrap leading-[26px]";

  const price = document.createElement("span");
  price.className =
    "flex-none text-[18px] font-semibold leading-[26px] text-primary mt-[-1px]";
  price.textContent = "$" + Number(product.price).toFixed(2);

  priceBox.appendChild(price);
  details.append(title, ratingBox, priceBox);

  card.append(imageBox, details);
  return card;
}

function getVisibleProducts() {
  const visibleProducts = allProducts.filter(function (product) {
    const categoryMatches =
      selectedCategory === allCategoriesName ||
      product.category === selectedCategory;

    const searchMatches = product.title.toLowerCase().includes(searchText);

    return categoryMatches && searchMatches;
  });

  if (currentSort === "price") {
    visibleProducts.sort(function (first, second) {
      return first.price - second.price;
    });
  }

  if (currentSort === "rating") {
    visibleProducts.sort(function (first, second) {
      return second.rating - first.rating;
    });
  }

  return visibleProducts;
}

function showProducts() {
  const visibleProducts = getVisibleProducts();
  const totalProducts = visibleProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const isListView = currentView === "list";

  if (currentPage > totalPages) {
    currentPage = Math.max(totalPages, 1);
  }

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, totalProducts);

  if (totalProducts === 0) {
    resultText.textContent = "No Results Found";
  } else {
    resultText.textContent =
      "Showing " +
      (startIndex + 1) +
      "-" +
      endIndex +
      " of " +
      totalProducts +
      " Results";
  }

  productGrid.className = isListView ? listClasses : gridClasses;
  productGrid.replaceChildren();

  if (totalProducts === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "col-span-full py-10 text-center";
    emptyMessage.textContent = "No products found";

    productGrid.appendChild(emptyMessage);
  }

  const productsOnThisPage = visibleProducts.slice(startIndex, endIndex);

  for (const product of productsOnThisPage) {
    productGrid.appendChild(createProductCard(product, isListView));
  }

  showPagination(totalPages);
}

function createPageButton(
  labelText,
  pageNumber,
  isActive,
  isDisabled,
  extraClasses,
) {
  const listItem = document.createElement("li");

  const button = document.createElement("button");
  button.className = pageButtonClasses + extraClasses;
  button.type = "button";
  button.textContent = labelText;
  button.dataset.active = String(isActive);
  button.disabled = isDisabled;

  button.addEventListener("click", function () {
    currentPage = pageNumber;
    showProducts();
  });

  listItem.appendChild(button);
  return listItem;
}

function showPagination(totalPages) {
  pagination.replaceChildren();

  if (totalPages <= 1) return;

  const previousItem = createPageButton(
    "Previous Page",
    currentPage - 1,
    false,
    currentPage === 1,
    previousNextExtraClasses,
  );
  previousItem.className = "mb-[5px] mr-[25px]";
  pagination.appendChild(previousItem);

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    const pageItem = createPageButton(
      String(pageNumber),
      pageNumber,
      pageNumber === currentPage,
      false,
      "",
    );
    pageItem.className = "mb-[5px] mr-[5px]";
    pagination.appendChild(pageItem);
  }

  const nextItem = createPageButton(
    "Next Page",
    currentPage + 1,
    false,
    currentPage === totalPages,
    previousNextExtraClasses,
  );
  nextItem.className = "mb-[5px] ml-[25px] mr-[5px]";
  pagination.appendChild(nextItem);
}

function setSortDropdownOpen(isOpen) {
  sortDropdown.dataset.open = String(isOpen);
}

sortButton.addEventListener("click", function (event) {
  event.stopPropagation();

  const isOpen = sortDropdown.dataset.open === "true";
  setSortDropdownOpen(!isOpen);
});

for (const chosenOption of sortOptions) {
  chosenOption.addEventListener("click", function () {
    currentSort = chosenOption.dataset.value;
    currentPage = 1;
    sortLabel.textContent = chosenOption.textContent;

    for (const option of sortOptions) {
      option.dataset.selected = String(option === chosenOption);
    }

    setSortDropdownOpen(false);
    showProducts();
  });
}

document.addEventListener("click", function () {
  setSortDropdownOpen(false);
});

// Grid view and List view

for (const clickedViewButton of viewButtons) {
  clickedViewButton.addEventListener("click", function () {
    currentView = clickedViewButton.dataset.view;
    showProducts();
  });
}

// header Scroll section and backToTopButton

new Image().src = darkLogoPath;

function updateHeaderOnScroll() {
  const isScrolledDown = window.scrollY > stickyScrollPosition;

  headerArea.dataset.sticky = String(isScrolledDown);
  backToTopButton.dataset.show = String(isScrolledDown);

  if (isScrolledDown) {
    headerLogo.src = darkLogoPath;
  } else {
    headerLogo.src = lightLogoPath;
  }
}

window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });

backToTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ClosePanel

function closePanels() {
  mobileMenu.dataset.open = "false";
  infoPanel.dataset.open = "false";

  overlay.dataset.show = "false";
}

// OpenPanel

function openPanel(panel) {
  closePanels();

  panel.dataset.open = "true";
  overlay.dataset.show = "true";
}

mobileMenuButton.addEventListener("click", function () {
  openPanel(mobileMenu);
});

desktopMenuButton.addEventListener("click", function () {
  openPanel(infoPanel);
});

overlay.addEventListener("click", closePanels);

for (const closeButton of closeButtons) {
  closeButton.addEventListener("click", closePanels);
}

for (const clickedItem of accordionItems) {
  const menuRow = clickedItem.querySelector("div");
  const clickedSubmenu = clickedItem.querySelector("ul");

  menuRow.addEventListener("click", function (event) {
    event.preventDefault();

    const shouldOpen = clickedItem.dataset.open !== "true";

    for (const item of accordionItems) {
      item.dataset.open = "false";
      item.querySelector("ul").style.maxHeight = null;
    }

    if (shouldOpen) {
      clickedItem.dataset.open = "true";
      clickedSubmenu.style.maxHeight = clickedSubmenu.scrollHeight + "px";
    }
  });
}

loadCart();
updateCartCount();
loadProducts();
