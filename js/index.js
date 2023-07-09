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
}
teesData();

function createItem() {
	let divEle = document.createElement("div");
	divEle.setAttribute("class", "img_1");

	let imgEle = document.createElement("img");
	imgEle.setAttribute("src", "");

	let addToCartDiv = document.createElement("div");
	addToCartDiv.setAttribute("class", "add_to_cart");

	let submitButton = document.createElement("div");
	submitButton.setAttribute("type", "submit");
	submitButton.innerText = "Add to Cart";

	addToCartDiv.innerText = "Rs 300";
	addToCartDiv.appendChild(submitButton);

	divEle.appendChild(imgEle);
	divEle.appendChild(addToCartDiv);

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

		for (let col = 0; col < 3; col++) {
			let colProduct = createItem();

			rowDiv.appendChild(colProduct);
		}

		productGrid.appendChild(rowDiv);
	}

	let containeEle = document.getElementById("container");
	containeEle.appendChild(productGrid);

	// let docBody = document.getElementsByTagName("body")[0];
	// docBody.appendChild(containeEle);
}

// actionCell.classList.add("tableRowCells");
// divEle.style.background = "red";