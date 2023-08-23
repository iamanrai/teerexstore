let cartDetails = [];
let quantityOptions = 0;

let deleteContent = (e) => {
  let id = e.target.id;
  console.log(id);
  let itemId = parseInt(id.split("-")[id.split("-").length - 1]);
  for (let i = 0; i < cartDetails.length; i++) {
    let item = cartDetails[i];
    if (item.id === itemId) {
      if (item.quantity === 1) {
        // Remove the whole div from cart.html
        let parentDiv = document.getElementById(`parent_cart_code-${itemId}`);
        if (parentDiv) {
          parentDiv.remove();
        }
        // Remove the item from cartDetails array
        cartDetails.splice(i, 1);
      } else {
        // Decrease the cartItemObj quantity by 1
        item.quantity -= 1;

        // Update the quantity displayed in qtyDiv
        let qtyDiv = document.getElementById(`qtyDiv-${itemId}`);
        qtyDiv.textContent = "Qty: " + item.quantity;
      }

      // Decrease cartCounter by 1
      let cartCounter = document.getElementById("cartCounter");
      cartCounter.innerText = parseInt(cartCounter.innerText) - 1;

      // Update the cart_detail in localStorage with the updated cartDetails
      localStorage.setItem("cart_detail", JSON.stringify(cartDetails));

      // Update the counterDetails in localStorage with the updated cartCounter
      localStorage.setItem("counter_detail", cartCounter.innerText);

      // Update the total price after each change
      updateTotalPrice();

      // Break out of the loop
      break;
    }
  }
};
function updateTotalPrice() {
  let totalPrice = calculateTotalPrice();
  let totalEle = document.getElementById("totalPrice");
  totalEle.innerText = "Total Price: ₹ " + totalPrice;
}

function pageLoadSetup() {
  cartDetails = JSON.parse(localStorage.getItem("cart_detail")) || [];
  counterDetails = JSON.parse(localStorage.getItem("counter_detail"));
  console.log(cartDetails);

  let cartCounter = 0;
  for (let i = 0; i < cartDetails.length; i++) {
    cartCounter += cartDetails[i].quantity;
  }

  //   console.log(counterDetails);

  itemsInCart = parseInt(document.getElementById("cartCounter").innerText);
  document.getElementById("cartCounter").innerText = counterDetails;
  createCartGrid(cartDetails);
}
pageLoadSetup();

function calculateTotalPrice() {
  let totalPrice = 0;
  for (let i = 0; i < cartDetails.length; i++) {
    let item = cartDetails[i];
    totalPrice += item.quantity * item.price;
  }
  return totalPrice;
}

function createCartItem(itemDetail) {
  if (itemDetail) {
    // console.log(itemDetail);
    let divEle = document.createElement("div");
    divEle.setAttribute("class", "mainDiv");
    divEle.setAttribute("id", `parent_cart_code-${itemDetail.id}`);
    // divEle.setAttribute("id", "parent_cart_code");

    let imgDiv = document.createElement("div");
    let imgEle = document.createElement("img");
    imgEle.setAttribute(
      "src",
      (itemDetail &&
        itemDetail.hasOwnProperty("imageURL") &&
        itemDetail.imageURL) ||
        ""
    );
    let infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "infoDiv");
    let nameDiv = document.createElement("div");
    nameDiv.innerText = itemDetail.name;
    let priceDiv = document.createElement("div");
    priceDiv.innerText = "₹ " + itemDetail.price;

    let qtyDiv = document.createElement("div");
    qtyDiv.setAttribute("id", `qtyDiv-${itemDetail.id}`);
    let qtyText = document.createElement("label");
    qtyText.innerText = "Qty";
    let qtyDropdown = document.createElement("select");
    qtyDropdown.setAttribute("id", "quantity");

    // let quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8];
    quantityOptions = itemDetail.quantity;
    let selectOption = document.createElement("option");
    selectOption.setAttribute("value", "0");

    let option = document.createElement("option");
    option.textContent = quantityOptions;
    qtyDropdown.appendChild(option);
    // // selectOption.textContent = "Select";
    // quantityOptions.forEach((quantity) => {
    //   let option = document.createElement("option");
    // //   option.setAttribute("value", quantity);
    //   option.textContent = quantity;
    //   qtyDropdown.appendChild(option);
    // });

    let submitDiv = document.createElement("div");
    let deleteButton = document.createElement("button");
    deleteButton.type = "submit";
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.setAttribute("id", `delete-button-${itemDetail.id}`);
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteContent);

    imgDiv.appendChild(imgEle);
    infoDiv.appendChild(nameDiv);
    infoDiv.appendChild(priceDiv);
    qtyDropdown.appendChild(selectOption);
    qtyDiv.appendChild(qtyText);
    qtyDiv.appendChild(qtyDropdown);
    submitDiv.appendChild(deleteButton);
    divEle.appendChild(imgDiv);
    divEle.appendChild(infoDiv);
    divEle.appendChild(qtyDiv);
    divEle.appendChild(submitDiv);
    // divEle.appendChild(totalPriceDiv);

    return divEle;
  }
}

function createCartGrid(item) {
  let productCartGrid = document.createElement("div");
  productCartGrid.setAttribute("id", "cartContainer");
  productCartGrid.setAttribute("class", "mainpage");

  // Variables to keep track of total price
  let totalPrice = 0;

  for (let i = 0; i < item.length; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";
    rowDiv.style.flexDirection = "row";
    rowDiv.style.width = "100%";
    rowDiv.style.rowGap = "10px";

    let itemDetail = item[i];

    if (itemDetail) {
      let colProducts = createCartItem(itemDetail);
      // Add the item price to the total price
      totalPrice += itemDetail.quantity * itemDetail.price;

      rowDiv.appendChild(colProducts);
    }
    productCartGrid.appendChild(rowDiv);
  }

  let containeCartEle = document.getElementById("mainCartContainer");
  containeCartEle.appendChild(productCartGrid);

  // Create and display the total price div
  let totalPriceDiv = createCartPrice(totalPrice);
  containeCartEle.appendChild(totalPriceDiv); // Move this line here to display total price at the bottom
}

function createCartPrice(totalPrice) {
  let totalPriceDiv = document.createElement("div");
  let hrElement = document.createElement("hr");

  totalPriceDiv.setAttribute("id", "totalPrice");
  totalPriceDiv.setAttribute("class", "totalPrice");
  totalPriceDiv.innerText = "Total Price: ₹ " + totalPrice;
  totalPriceDiv.appendChild(hrElement)
  return totalPriceDiv;
}
