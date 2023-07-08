let data = []

async function teesData() {
	const res = await fetch("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json", {
		method: "GET",
	});

	data = await res.json();
	console.log(data);
}
teesData();