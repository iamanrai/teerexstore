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
              // console.log(item.quantity + " when quantity getting updated ");
              item.quantity = (item.quantity) - 1;
              if (item.quantity === 0) {
                let addToCartButton = document.getElementById(`add-to-cart-button-${i+1}`);
                addToCartButton.setAttribute("disabled", "");
                addToCartButton.textContent = "Out Of Stock";
                addToCartButton.style.backgroundColor = "Red";
                console.log(addToCartButton);
                // alert("No quantity left for this item.");
              } 
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
            if (item.quantity === 0) {
              let addToCartButton = document.getElementById(`add-to-cart-button-${i+1}`);
              addToCartButton.setAttribute("disabled", "");
              addToCartButton.textContent = "Out Of Stock";
              addToCartButton.style.backgroundColor = "Red";
              console.log(addToCartButton);
              // alert("No quantity left for this item.");
            } 
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
          if (item.quantity === 0) {
            let addToCartButton = document.getElementById(`add-to-cart-button-${i+1}`);
            addToCartButton.setAttribute("disabled", "");
            addToCartButton.textContent = "Out Of Stock";
            addToCartButton.style.backgroundColor = "Red";
            console.log(addToCartButton);
            // alert("No quantity left for this item.");
          } 
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

  // let deleteContent = (e) => {
  //   let id = e.target.id;
  //   console.log(id);
  //   console.log(parseInt(id.split("-")[id.split("-").length - 1]));
  //   console.log(cartItems);
  //   for (let i = 0; i < cartItems.length; i++) {
  //     let item = cartItems[i];
  //     console.log(item);
  //     if (item.id == parseInt(id.split("-")[id.split("-").length - 1])) {
  //       let cartItemObj = {};
  //       cartItemObj = { ...item }; // copying value
  //       cartItemObj.quantity = 1;
  //       if (cartItems.length) {
  //         let isItemPresent = false;
  //         for (let j = 0; j < cartItems.length; j++) {
  //           if (cartItems[j].id == cartItemObj.id) {
  //             isItemPresent = true;
  //             cartItems[j].quantity -= 1;
  //             // console.log(item.quantity + " when quantity getting updated ");
  //             item.quantity = item.quantity + 1;
  //             // Update the counter value in the DOM
  //             // itemsInCart = parseInt(
  //             //   document.getElementById("counter").innerText
  //             // );
  //             // itemsInCart--;
  //             // document.getElementById("counter").innerText = itemsInCart;
  //             i = filteredData.length + 1;
  //             j = cartItems.length + 1;
  //           }
  //         }
  //         if (!isItemPresent) {
  //           cartItems.push(cartItemObj);
  //           item.quantity = item.quantity - 1;
  //           console.log(item.quantity + " inside the");
  //           // Update the counter value in the DOM
  //           itemsInCart = parseInt(document.getElementById("counter").innerText);
  //           itemsInCart++;
  //           document.getElementById("counter").innerText = itemsInCart;
  //           i = filteredData.length + 1;
  //         }
  //         // console.log(count + "count");
  //       }
  //     }
  //   }
  // };

