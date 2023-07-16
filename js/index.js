//funtion to get the json data from the Geektrust website API
let data = [];
async function teesData() {
	const res = await fetch(
		"https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json",
		{
			method: "GET",
		}
	);
	data = await res.json();
	console.log(data);
	createProductGrid();
	// get_imgage(data);
}
teesData();

function createItem(itemDetail) {
	// console.log(itemDetail);
	let divEle = document.createElement("div"); //create a new div
	divEle.setAttribute("class", "img_1"); // assigning class to the newly created div

	let imgEle = document.createElement("img");
	imgEle.setAttribute("src", itemDetail.imageURL);

	let lowerDiv = document.createElement("div");
	lowerDiv.setAttribute("class", "lowerDiv");

	let getPrice = document.createElement("div");
	getPrice.setAttribute("class", "getPrice");
	getPrice.innerText = itemDetail.price;

	let submitButton = document.createElement("div");
	submitButton.setAttribute("type", "submit");
	submitButton.setAttribute("class", "add_to_cart");
	submitButton.innerText = "Add to Cart";

	// addToCartDiv.innerText = "Rs 300";

	getPrice.appendChild(submitButton);

	lowerDiv.appendChild(getPrice);
	lowerDiv.appendChild(submitButton);
	// lowerDiv.appendChild(submitButton);
	
	divEle.appendChild(imgEle);
	divEle.appendChild(submitButton);
	divEle.appendChild(getPrice);
	divEle.appendChild(lowerDiv);

	return divEle;
}

function createProductGrid() {
	let noOfRows = data.length / 3;

	let productGrid = document.createElement("div");

	for (let i = 0; i < noOfRows; i++) {

		let rowDiv = document.createElement("div");
		rowDiv.style.display = "flex";
		rowDiv.style.flexDirection = "row";
		rowDiv.style.justifyContent = "space-evenly";
		
		// arr = [0,1,2 : 3,4,5 : 6,7,8 : 9,10,11 : 12,13,14 : 15,16,17]
		for (let col = 0; col < 3; col++) {
			let itemDetail = data[3*i+col]
			let colProduct = createItem(itemDetail);

			rowDiv.appendChild(colProduct);
		}

		productGrid.appendChild(rowDiv);
	}

	let containeEle = document.getElementById("container");
	containeEle.appendChild(productGrid);

	// let docBody = document.getElementsByTagName("body")[0];
	// docBody.appendChild(containeEle);
}

// function get_imgage (data){
// 	for (i = 0 ; i < data.length; i++){
// 		// console.log(data);
// 		let imageURL =[]
// 		imageURL = data[i].imageURL;
// 		// console.log(imageURL);
// 		return imageURL;
// 	}
// }

// actionCell.classList.add("tableRowCells");
// divEle.style.background = "red";