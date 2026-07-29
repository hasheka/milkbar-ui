/* LOGIN PAGE */

function handleLogin() {

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;

    if(name === "" || phone === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    alert("Welcome to MilkBar!");
    window.location.href = "product.html";
}


/* PRODUCT PAGE */

function addToCart(name, price){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateProductTotal();

    alert(name + " added to cart");
}

function getCartTotal(){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    return total;
}

function updateProductTotal(){

    let totalElement =
    document.getElementById("total");

    if(totalElement){

        totalElement.innerText =
        "$" + getCartTotal().toFixed(2);

    }
}

function goCart(){

    window.location.href = "orders.html";
}


/* ORDERS PAGE */

function loadOrders(){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let container =
    document.getElementById("ordersContainer");

    if(!container) return;

    container.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price;

        container.innerHTML += `

        <div class="order-card">

            <div class="order-img">🥤</div>

            <div class="order-meta">

                <div class="order-name">
                    ${item.name}
                </div>

                <div class="order-price">
                    $${item.price.toFixed(2)}
                </div>

            </div>

        </div>

        `;
    });

    let delivery = 10;
    let total = subtotal + delivery;

    if(document.getElementById("subtotal")){
        document.getElementById("subtotal").innerText =
        "$" + subtotal.toFixed(2);
    }

    if(document.getElementById("delivery")){
        document.getElementById("delivery").innerText =
        "$" + delivery.toFixed(2);
    }

    if(document.getElementById("totalAmount")){
        document.getElementById("totalAmount").innerText =
        "$" + total.toFixed(2);
    }
}

function changeQty(btn, change){

    let qty =
    btn.parentElement.querySelector(".qty-num");

    if(!qty) return;

    let value =
    parseInt(qty.innerText);

    value += change;

    if(value < 1){
        value = 1;
    }

    qty.innerText = value;
}

function goCheckout(){

    window.location.href =
    "checkout.html";
}


/* CHECKOUT PAGE */

function loadCheckout(){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let container =
    document.getElementById("checkoutItems");

    if(!container) return;

    container.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price;

        container.innerHTML += `

        <div class="row">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        </div>

        `;
    });

    let delivery = 10;
    let total = subtotal + delivery;

    if(document.getElementById("checkoutTotal")){
        document.getElementById("checkoutTotal").innerText =
        "$" + total.toFixed(2);
    }
}

function placeOrder(){

    let toast =
    document.getElementById("toast");

    if(toast){
        toast.style.display = "block";
    }

    setTimeout(function(){

        if(toast){
            toast.style.display = "none";
        }

        window.location.href =
        "confirmation.html";

    },2000);
}


/* CONFIRMATION PAGE */

function trackOrder(){

    let toast =
    document.getElementById("toast");

    if(toast){
        toast.style.display = "block";
    }

    setTimeout(function(){

        if(toast){
            toast.style.display = "none";
        }

        localStorage.removeItem("cart");

        window.location.href =
        "product.html";

    },2000);
}


/* TOAST */

function showToast(message){

    let toast =
    document.getElementById("toast");

    if(!toast) return;

    let msg =
    document.getElementById("toastMsg");

    if(msg){
        msg.innerText = message;
    }

    toast.classList.add("show");

    setTimeout(function(){
        toast.classList.remove("show");
    },2000);
}


/* PAGE LOAD */

window.onload = function(){

    updateProductTotal();

    loadOrders();

    loadCheckout();

};