// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
	
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
	  const btn=li.querySelector(".add-to-cart-btn")
	  btn.addEventListener("click",()=>{
		  addToCart(product.id);
	  })
  });
}


// Render cart list
function renderCart() {
  const cartList=document.querySelector("#cart-list")
	cartList.innerHTML=""
	let cart=JSON.parse(sessionStorage.getItem("cart"))||[]
	cart.forEach((product)=>{
		let li=document.createElement("li")
		li.innerHTML=`${product.name} - ${product.price}`
			
		
		let removeBtn=document.createElement("button")
		removeBtn.innerText="remove"
			removeBtn.addEventListener("click",()=>{
				removeFromCart(product.id)
			})
		li.append(removeBtn)
		cartList.append(li)
		
	})
}


 

// Add item to cart
function addToCart(productId) {
let cart=JSON.parse(sessionStorage.getItem("cart"))||[]
	let product=products.find(p=>p.id===productId)
	if(product){
		let exist=cart.some(p=>p.id===productId)
		if(!exist){
		cart.push(product)
		sessionStorage.setItem("cart",JSON.stringify(cart))
			renderCart()
	} else {
      alert("Product is already in the cart!");
    }
  }
}



// Remove item from cart
function removeFromCart(productId) {
 let cart=JSON.parse(sessionStorage.getItem("cart"))||[]
	cart=cart.filter(p=>p.id!==productId)
	sessionStorage.setItem("cart", JSON.stringify(cart))
		renderCart()
  }

 
// Clear cart
function clearCart() {
	const cartList=document.querySelector("#cart-list")
 sessionStorage.removeItem("cart")
	 cartList.innerHTML=""
	renderCart()
};
const clearCartBtn = document.querySelector("#clear-cart-btn"); // Ensure the button exists in HTML
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
