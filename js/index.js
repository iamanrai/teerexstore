let filter = {
  Red: false,
  Blue: false,
  Green: false,
  Men: false,
  Women: false,
  250: false,
  "251-450": false,
  "Above 450": false,
};

let filterCategeory = ["type", "price", "color", "gender"];

//funtion to get the json data from the Geektrust website API

let data = [];
let filteredData = [];
async function teesData() {
  const res = await fetch(
    "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json",
    {
      method: "GET",
    }
  );
  data = await res.json();
  //   console.log(data);
  filteredData = filterDataWithQuantityMoreThanZero(data);
  createProductGrid(filteredData);
  // console.log(filteredData);
}
teesData();

// By this we will get the data which has quantity more than 0.

function filterDataWithQuantityMoreThanZero(data) {
  return data.filter((item) => item.quantity > 0);
}

// Function for creating single Item

function createItem(itemDetail) {
  // console.log(itemDetail);
  if (itemDetail) {
    let divEle = document.createElement("div"); //create a new div
    divEle.setAttribute("class", "img_1"); // assigning class to the newly created div
    // divEle.style.flexGrow = "2";
    // divEle.style.flexBasis = "300px";

    let imgEle = document.createElement("img");
    imgEle.setAttribute(
      "src",
      (itemDetail &&
        itemDetail.hasOwnProperty("imageURL") &&
        itemDetail.imageURL) ||
        ""
    );

    let lowerDiv = document.createElement("div");
    lowerDiv.setAttribute("class", "lowerDiv");

    let getPrice = document.createElement("div");
    getPrice.setAttribute("class", "getPrice");
    getPrice.innerText = "₹" + itemDetail.price;

    let submitDiv = document.createElement("div");
    let submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.setAttribute("class", "add_to_cart");
    submitButton.setAttribute("id", `add-to-cart-button-${itemDetail.id}`); // Here we are using string literals
    submitButton.textContent = "Add to Cart";
    submitButton.addEventListener("click", addToCart);

    //lowerDiv.appendChild(submitButton);
    lowerDiv.appendChild(getPrice);
    lowerDiv.appendChild(submitDiv);
    submitDiv.appendChild(submitButton);

    divEle.appendChild(imgEle);
    divEle.appendChild(lowerDiv);

    return divEle;
  }
}

// Function for creating layout of the mainpage

function createProductGrid(filteredData, isFilter) {
  let noOfRows = filteredData.length / 3;
  //   console.log(noOfRows);
  let productGrid = document.createElement("div");

  productGrid.setAttribute("id", "parent_code");

  for (let i = 0; i < Math.ceil(noOfRows); i++) {
    let rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";
    rowDiv.style.flexDirection = "row";
    // rowDiv.style.justifyContent = "flex-start";
    rowDiv.style.width = "100%";
    rowDiv.style.rowGap = "10px";
    rowDiv.style.columnGap = "300px";
    rowDiv.style.flexWrap = "wrap";
    rowDiv.style.marginLeft = "10px";
    for (let col = 0; col < 3; col++) {
      let itemDetail = filteredData[3 * i + col];

      if (itemDetail) {
        let colProduct = createItem(itemDetail);
        rowDiv.appendChild(colProduct);
      }
    }
    productGrid.appendChild(rowDiv);
  }
  let containeEle = document.getElementById("container");
  containeEle.appendChild(productGrid);
}
// actionCell.classList.add("tableRowCells");
// divEle.style.background = "red";
function applyFilter(id, filterValue) {
  let arr = [];
  filter[filterValue] = !filter[filterValue]; // invert the value of the key.
  let keysWithTrueValue = [];

  for (let key in filter) {
    if (filter[key] === true) {
      // Get all the keys whose value is true.
      keysWithTrueValue.push(key); // push the key in the array.
    }
  }
  console.log(keysWithTrueValue);
  for (let k = 0; k < filteredData.length; k++) {
    let item = filteredData[k];
    // console.log(item);
    for (let i = 0; i < keysWithTrueValue.length; i++) {
      let filterVal = keysWithTrueValue[i]; // store the key in filterVal
      let allValuesofItem = Object.values(item); // store the value of the key which is store in "item" key.

      for (let j = 0; j < allValuesofItem.length; j++) {
        if (allValuesofItem[j] === filterVal) {
          // Checking for all the values of JSON data with the filtervalue.
          arr.push(item); // Pushing the item in new array
          j = allValuesofItem.length + 1; // this is for breaking the loop
          i = keysWithTrueValue.length + 1; // this is for breaking the loop
        } else if (filterVal === "250") {
          if (allValuesofItem[4] <= 250) {
            arr.push(item);
            j = allValuesofItem.length + 1;
            i = keysWithTrueValue.length + 1;
          }
        } else if (filterVal === "251-450") {
          if (allValuesofItem[4] > 250 && allValuesofItem[4] < 451) {
            arr.push(item);
            j = allValuesofItem.length + 1;
            i = keysWithTrueValue.length + 1;
          }
        } else if (filterVal === "Above 450") {
          if (allValuesofItem[4] > 450) {
            arr.push(item);
            j = allValuesofItem.length + 1;
            i = keysWithTrueValue.length + 1;
          }
        }
      }
    }
  }
  console.log(arr);

  if (keysWithTrueValue.length === 0) {
    let removeEle = document.getElementById("parent_code");
    if (removeEle) {
      removeEle.parentNode.removeChild(removeEle);
    }
    console.log(data);
    createProductGrid(filteredData, true);
  } else {
    let removeEle = document.getElementById("parent_code"); // remove all the items inside the container.
    if (removeEle) {
      removeEle.parentNode.removeChild(removeEle);
      createProductGrid(arr, true);
    } else {
      createProductGrid(filteredData, true);
    }
  }
}

let searchInput = document.getElementById("searchInput");
let resultsContainer = document.getElementById("container");

// Function to perform the search
function performSearch() {
  let searchQuery = searchInput.value.trim().toLowerCase();

  // Filter the JSON data based on the search query
  let searchResults = filteredData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.type.toLowerCase().includes(searchQuery) ||
      item.gender.toLowerCase().includes(searchQuery)
  );

  console.log(searchResults);

  // Clear previous results from the container
  resultsContainer.innerHTML = "";

  // Display the search results in the container
  if (searchResults.length > 0) {
    createProductGrid(searchResults, true);
  } else {
    // Display a message when no results are found
    container.innerHTML = "<p>No results found.</p>";
  }
}
// Add event listener to the search input
searchInput.addEventListener("input", performSearch);
