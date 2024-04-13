// Get important items from the DOM
let count = document.getElementById("count")
let cart = document.querySelectorAll(".add")
let qnty = document.getElementById("qnty")

//create products objects
let products = [
    {
        name: "Joystick",
        tittle: "Pair of controllers.",
        price: 25,
        incart: 0
      
    },

    {
        name: "Chair",
        tittle: "adjustable",
        price: 75,
        incart: 0,
       
    },

    {
        name: "Headphones",
        tittle: "Super Bass",
        price: 20,
        incart: 0,
      
    },

    {
        name: "Keyboard",
        tittle: "Prodigy.",
        price: 30,
        incart: 0
       
    },

    {
        name: "PlayStation-4",
        tittle: "500gb",
        price: 200,
        incart: 0,
        
    },
    
    {
        name: "Steering",
        tittle: "Ferrari",
        price: 150,
        incart: 0,
       
    },

    {
        name: "Mouse",
        tittle: "wireless",
        price: 10,
        incart: 0,
       
    },

    {
        name: "Slezeger",
        tittle: "Playing table",
        price: 120,
        incart: 0,
        
    }

] 

// loop over each product
for(let i = 0; i < cart.length; i++){
    cart[i].addEventListener("click", function() {
        cartNumber(products[i])
        total(products[i])
})
}

// function to count quantity of products in the cart.
function cartNumber(product){
    let cartNumbers = localStorage.getItem("cartNumbers")
    
    cartNumbers = parseInt(cartNumbers)
    
    if(cartNumbers){
        localStorage.setItem("cartNumbers", cartNumbers + 1)
        count.textContent = cartNumbers + 1
    }else {
        localStorage.setItem("cartNumbers", 1)
        count.textContent = 1
    }
    setProducts(product)
    
}

// update onCart items when the page get loaded
function onLoad(){
    count.textContent = localStorage.getItem("cartNumbers")
}

//Function to set products in localstorage 
function setProducts(product){
    let cartItems = localStorage.getItem('itemsInCart')
    cartItems = JSON.parse(cartItems)
   
   if( cartItems != null){
    if(cartItems[product.name] == undefined){
        cartItems = { ...cartItems,[product.name]: product}
     }
     cartItems[product.name].incart += 1
   }else {
    product.incart = 1
    cartItems = {
    [product.name]: product
    }
   }
   localStorage.setItem('itemsInCart', JSON.stringify(cartItems))
   
}

// Function to calculate total price of all items
function total(product){
    let cartCost = localStorage.getItem("totalCost")
    if(cartCost != null){
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price)
    }else{      
        localStorage.setItem("totalCost",  product.price)
    }
}

// fuction to get items from local storage and display them on cart Html
function displayItems(){
let cartItems = localStorage.getItem('itemsInCart')
cartItems = JSON.parse(cartItems)
let cartContainer = document.querySelector('.cart-container')
let cartCost = localStorage.getItem("totalCost")

if(cartItems && cartContainer){
    cartContainer.innerHTML = ""

    Object.values(cartItems).map(item => {
        cartContainer.innerHTML += 
        `
        <div class="cart-products">
        <div class="item-tittle">
            <i class="fa-solid fa-circle-xmark fa-lg" style="color: red;" onclick="deleteItem('${item.name}')"></i>
            <img src="./images/${item.name}.jpeg" alt="" class="cart-img">
            <p>${item.name}</p>
            </div>
            <div class="cart-price">$ ${item.price}.00</div>
            <div class="cart-qnty">
            <i class="fa-solid fa-circle-minus fa-lg" style="color: #4d0f0f;" onclick="decrementItem('${item.name}')"></i>
            <span>${item.incart}</span>
            <i class="fa-solid fa-circle-plus fa-lg" style="color: #14550c;" onclick="incrementItem('${item.name}')"></i>
            </div>
           
           <div class="total"></div> <h5 class="cart-total">$ ${item.price * item.incart}.00</h5>
        </div>
    `
    })

    cartContainer.innerHTML += `
    <div class="cart-cost">
    <div class="totalcost-text">Total: </div>
    <div class="totalcost-price" >$ ${cartCost}.00</div>
    <button>Checkout</button>
    </div>
    `
}
}

        // Delete an item from the cart
        function deleteItem(itemName) {
            let cartItems = JSON.parse(localStorage.getItem('itemsInCart'));
            
            if (cartItems && cartItems[itemName]) {
                let item = cartItems[itemName]
                let cartCost = localStorage.getItem("totalCost")
                cartCost = parseInt(cartCost) || 0

                localStorage.setItem("cartNumbers", parseInt(localStorage.getItem("cartNumbers")) - item.incart)
                localStorage.setItem("totalCost", cartCost - (item.price * item.incart))
                delete cartItems[itemName]

                console.log(item.qnty)
                localStorage.setItem('itemsInCart', JSON.stringify(cartItems))
                displayItems() // Refresh the cart display
                onLoad() // update cart numbers 
            }
        }

        // Increase the quantity of an item in the cart
        function incrementItem(itemName) {
            let cartItems = JSON.parse(localStorage.getItem('itemsInCart'));
            let  cartNumber = JSON.parse(localStorage.getItem('cartNumbers'));

            if (cartItems && cartItems[itemName]) {
                cartItems[itemName].incart += 1
                let item = cartItems[itemName]
                let cartCost = localStorage.getItem("totalCost")
                cartCost = parseInt(cartCost)
                cartNumber += 1

                localStorage.setItem("totalCost", cartCost + item.price);
                localStorage.setItem('cartNumbers', JSON.stringify(cartNumber));
                localStorage.setItem('itemsInCart', JSON.stringify(cartItems));
                
                displayItems() // Refresh the cart Display
                onLoad() // update the cart numbers 
            }
        }

        // Decrease the quantity of an item in the cart
        function decrementItem(itemName) {
            let cartItems = JSON.parse(localStorage.getItem('itemsInCart')) 
            let  cartNumber = JSON.parse(localStorage.getItem('cartNumbers')) 

            if (cartItems && cartItems[itemName] && cartItems[itemName].incart > 1) {
                cartItems[itemName].incart -= 1
                cartNumber -= 1
                let item = cartItems[itemName]
                let cartCost = localStorage.getItem("totalCost")
                cartCost = parseInt(cartCost)

                localStorage.setItem("totalCost", cartCost - item.price)
                localStorage.setItem('itemsInCart', JSON.stringify(cartItems))
                localStorage.setItem('cartNumbers', JSON.stringify(cartNumber))
                displayItems(); // Refresh the cart display
                onLoad() // update CART numbers
            }
        }


// call onload & display items fuction whenever the page is loaded
displayItems()
onLoad()  
