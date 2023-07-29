// debugger
let cartItems = [];
let itemsInCart = 0;

function setCartDetailsAndRedirect() {
  localStorage.setItem("cart_detail", JSON.stringify(cartItems));
  localStorage.setItem("counter_detail", JSON.stringify(itemsInCart));
  window.location = "./../html/cart.html";
}

let addToCart = (e) => {
  let id = e.target.id;

  for (let i = 0; i < filteredData.length; i++) {
    let item = filteredData[i];
    // console.log(item);
    // console.log(item.quantity + "item quantity outside condition");
    // if (item.quantity < 1) {
    //   let addToCartButton = document.getElementById(`add-to-cart-button-${i}`);
    //   addToCartButton.setAttribute("disabled", "");
    //   addToCartButton.textContent = "Out Of Stock";
    //   addToCartButton.style.backgroundColor = "Red";
    //   console.log(addToCartButton);
    // alert("No quantity left for this item.");
    // }
    //     else {
    //   let itemsInCart = parseInt(document.getElementById("counter").innerText);
    //   itemsInCart++;
    //   // Update the counter value in the DOM
    //   document.getElementById("counter").innerText = itemsInCart;
    //   console.log(itemsInCart + "items in cart");
    //   cartItems.push(item);
    //   item.quantity = item.quantity - 1;
    //   if (item.quantity === 0) {
    //     let addToCartButton = document.getElementById(
    //       `add-to-cart-button-${i}`
    //     );
    //     addToCartButton.setAttribute("disabled", "");
    //     addToCartButton.textContent = "Out Of Stock";
    //     addToCartButton.style.backgroundColor = "Red";
    //     console.log(addToCartButton);
    //   }
    //   console.log(item.quantity + "Items quantity inside condition ");
    //   createCartGrid(item);
    //   console.log(cartItems);
    //   // break;
    //   i = filteredData.length + 1;
    // }
    if (item.quantity < 1) {
      let addToCartButton = document.getElementById(`add-to-cart-button-${i+1}`);
      addToCartButton.setAttribute("disabled", "");
      addToCartButton.textContent = "Out Of Stock";
      addToCartButton.style.backgroundColor = "Red";
      console.log(addToCartButton);
      // alert("No quantity left for this item.");
    } else {
      if (item.id == parseInt(id.split("-")[id.split("-").length - 1])) {
        let cartItemObj = {};
        cartItemObj = { ...item }; // copying value
        cartItemObj.quantity = 1;
        if (cartItems.length) {
          let isItemPresent = false;
          for (let j = 0; j < cartItems.length; j++) {
            if (cartItems[j].id == cartItemObj.id) {
              isItemPresent = true;
              cartItems[j].quantity += 1;
              console.log(item.quantity + " when quantity getting updated ");
              item.quantity = (item.quantity) - 1;
              // Update the counter value in the DOM
              itemsInCart = parseInt(
                document.getElementById("counter").innerText
              );
              itemsInCart++;
              document.getElementById("counter").innerText = itemsInCart;
              i = filteredData.length + 1;
              j = cartItems.length + 1;
            }
          }
          if (!isItemPresent) {
            cartItems.push(cartItemObj);
            item.quantity = (item.quantity) -1;
            console.log(item.quantity + " inside the")
            // Update the counter value in the DOM
            itemsInCart = parseInt(
              document.getElementById("counter").innerText
            );
            itemsInCart++;
            document.getElementById("counter").innerText = itemsInCart;
            i = filteredData.length + 1;
          }
          // console.log(count + "count");
        } else {
          cartItems.push(cartItemObj);
          item.quantity = item.quantity - 1;
          console.log(item.quantity + " For the first time");
          // Update the counter value in the DOM
          itemsInCart = parseInt(document.getElementById("counter").innerText);
          itemsInCart++;
          document.getElementById("counter").innerText = itemsInCart;
          i = filteredData.length + 1;
        }
      }
    }
    // createCartGrid(cartItems);
  }
};
// console.log(cartItems);

// function createCartItem(itemDetail) {
//   if (itemDetail) {
//     let divEle = document.createElement("div");
//     divEle.setAttribute("class", "mainDiv");

//     let imgDiv = document.createElement("div");
//     let imgEle = document.createElement("img");
//     imgEle.setAttribute(
//       "src",
//       (itemDetail &&
//         itemDetail.hasOwnProperty("imageURL") &&
//         itemDetail.imageURL) ||
//         ""
//     );
//     let infoDiv = document.createElement("div");
//     infoDiv.setAttribute("class", "infoDiv");
//     let nameDiv = document.createElement("div");
//     nameDiv.innerText = itemDetail.name;

//     let priceDiv = document.createElement("div");
//     priceDiv.innerText = itemDetail.price;

//     let qtyDiv = document.createElement("div");
//     let qtyText = document.createElement("label");
//     qtyText.innerText = "Qty";
//     let qtyDropdown = document.createElement("select");
//     qtyDropdown.setAttribute("id", "quantity");

//     let quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8];
//     // quantityOptions = itemDetail.quantity;

//     let selectOption = document.createElement("option");
//     selectOption.setAttribute("value", "0");
//     selectOption.textContent = "Select";
//     quantityOptions.forEach((quantity) => {
//       let option = document.createElement("option");
//       option.setAttribute("value", quantity);
//       option.textContent = quantity;
//       qtyDropdown.appendChild(option);
//     });

//     let submitDiv = document.createElement("div");
//     let deleteButton = document.createElement("button");
//     deleteButton.type = "submit";
//     deleteButton.setAttribute("class", "deleteButton");
//     deleteButton.setAttribute("id", `delete-button-${itemDetail.id}`);
//     deleteButton.textContent = "Delete";
//     // deleteButton.addEventListener("click", deleteContent);

//     divEle.appendChild(imgDiv);
//     divEle.appendChild(infoDiv);
//     divEle.appendChild(qtyDiv);
//     divEle.appendChild(submitDiv);
//     imgDiv.appendChild(imgEle);
//     infoDiv.appendChild(nameDiv);
//     infoDiv.appendChild(priceDiv);
//     qtyDiv.appendChild(qtyText);
//     qtyDiv.appendChild(qtyDropdown);
//     qtyDropdown.appendChild(selectOption);
//     submitDiv.appendChild(deleteButton);
//   }
// }

// function createCartGrid(item) {
//   let productCartGrid = document.createElement("div");
//   productCartGrid.setAttribute("id", "cartContainer");
//   productCartGrid.setAttribute("class", "mainpage");
//   // console.log(item);
//   // for(let i = 0; i < item.length; i++){
//   let rowDiv = document.createElement("div");
//   rowDiv.style.display = "flex";
//   rowDiv.style.flexDirection = "row";
//   rowDiv.style.width = "100%";
//   rowDiv.style.rowGap = "10px";

//   if (item) {
//     createCartItem(item);
//   }
//   productCartGrid.appendChild(rowDiv);
// }
// let containeCartEle = document.getElementById("cartContainer");
// containeCartEle.appendChild(productCartGrid);
// }
