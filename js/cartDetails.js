let cartDetails = [];
// let itemInCart = [];

function pageLoadSetup() {
  cartDetails = JSON.parse(localStorage.getItem("cart_detail"));
  counterDetails = JSON.parse(localStorage.getItem("counter_detail"));
  console.log(cartDetails);
  console.log(counterDetails);

  itemsInCart = parseInt(document.getElementById("cartCounter").innerText);
  document.getElementById("cartCounter").innerText = counterDetails;
  createCartItem(cartDetails);
}
pageLoadSetup();

function createCartItem(itemDetail) {
  if (itemDetail) {
    let divEle = document.createElement("div");
    divEle.setAttribute("class", "mainDiv");

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
    priceDiv.innerText = itemDetail.price;

    let qtyDiv = document.createElement("div");
    let qtyText = document.createElement("label");
    qtyText.innerText = "Qty";
    let qtyDropdown = document.createElement("select");
    qtyDropdown.setAttribute("id", "quantity");

    let quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8];
    // quantityOptions = itemDetail.quantity;

    let selectOption = document.createElement("option");
    selectOption.setAttribute("value", "0");
    selectOption.textContent = "Select";
    quantityOptions.forEach((quantity) => {
      let option = document.createElement("option");
      option.setAttribute("value", quantity);
      option.textContent = quantity;
      qtyDropdown.appendChild(option);
    });

    let submitDiv = document.createElement("div");
    let deleteButton = document.createElement("button");
    deleteButton.type = "submit";
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.setAttribute("id", `delete-button-${itemDetail.id}`);
    deleteButton.textContent = "Delete";
    // deleteButton.addEventListener("click", deleteContent);

    divEle.appendChild(imgDiv);
    divEle.appendChild(infoDiv);
    divEle.appendChild(qtyDiv);
    divEle.appendChild(submitDiv);
    imgDiv.appendChild(imgEle);
    infoDiv.appendChild(nameDiv);
    infoDiv.appendChild(priceDiv);
    qtyDiv.appendChild(qtyText);
    qtyDiv.appendChild(qtyDropdown);
    qtyDropdown.appendChild(selectOption);
    submitDiv.appendChild(deleteButton);
  }
}

function createCartGrid(item) {
  let productCartGrid = document.createElement("div");
  productCartGrid.setAttribute("id", "cartContainer");
  productCartGrid.setAttribute("class", "mainpage");
  // console.log(item);
  // for(let i = 0; i < item.length; i++){
  let rowDiv = document.createElement("div");
  rowDiv.style.display = "flex";
  rowDiv.style.flexDirection = "row";
  rowDiv.style.width = "100%";
  rowDiv.style.rowGap = "10px";

  if (item) {
    createCartItem(item);
  }
  productCartGrid.appendChild(rowDiv);
  let containeCartEle = document.getElementById("cartContainer");
  containeCartEle.appendChild(productCartGrid);
}

