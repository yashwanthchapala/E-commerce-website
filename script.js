let products = [
 {name:"Apple",price:120,cat:"fruits",img:"https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"},
 {name:"Banana",price:100,cat:"fruits",img:"bananna.jpg"},
 {name:"Watermelon",price:120,cat:"fruits",img:"watwermwlon.webp"},
 {name:"Pine Apple",price:128,cat:"fruits",img:"pine apple.webp"},
 {name:"chocolate",price:220,cat:"snacks",img:"chocolate.webp"},
 {name:"Mango",price:520,cat:"fruits",img:"mango.webp"},
 {name:"Kikat",price:120,cat:"snacks",img:"kitkat.webp"},
 {name:"nutelld",price:820,cat:"snacks",img:"nutellled.webp"},
 {name:"Sprite",price:120,cat:"drinks",img:"sprite.webp"},
 {name:"Bingo",price:120,cat:"snacks",img:"bingoo.webp"},
 {name:"5-Star",price:120,cat:"snacks",img:"5 star.webp"},
 {name:"Kurukure",price:120,cat:"snacks",img:"kurukure.webp"},
 {name:"Mad angles",price:120,cat:"snacks",img:"814-dZ4dfmL._SL1500_.jpg"},
 {name:"Lays",price:120,cat:"snacks",img:"lays.webp"},
 {name:"Banana",price:60,cat:"fruits",img:"bananna.jpg"},
 {name:"Coconut",price:20,cat:"fruits",img:"coucunt.jpg"},
  {name:"Mini Orange",price:20,cat:"snacks",img:"mini.webp"},
   {name:"Crunchex",price:20,cat:"snacks",img:"churnck.webp"},
    {name:"Thums Up",price:20,cat:"drinks",img:"thumps.jpg"},
     {name:"Fizz",price:20,cat:"drinks",img:"fizz.webp"},
      {name:"Pepsi",price:20,cat:"drinks",img:"pesi.webp"},
       
        {name:"Moondal",price:20,cat:"snacks",img:"moondal.webp"},
         {name:"orange",price:20,cat:"snacks",img:"mini.webp"},
          {name:"chocolate",price:20,cat:"snacks",img:"chocolate.webp"},
 {name:"Coke",price:40,cat:"drinks",img:"coke.webp"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SHOW PRODUCTS
function show(data){
  let html="";
  data.forEach(p=>{
    html+=`
    <div class="card">
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="add('${p.name}')">Add</button>
    </div>`;
  });
  document.getElementById("products").innerHTML=html;
}
show(products);

// FILTER
function filter(cat){
  if(cat=="all") show(products);
  else show(products.filter(p=>p.cat==cat));
}

// SEARCH
function searchProduct(val){
  show(products.filter(p=>p.name.toLowerCase().includes(val.toLowerCase())));
}

// ADD
function add(name){
  let item = cart.find(p=>p.name===name);
  if(item){
    item.qty++;
  } else {
    let prod = products.find(p=>p.name===name);
    cart.push({...prod, qty:1});
  }
  save();
}

// REMOVE
function removeItem(name){
  cart = cart.filter(p=>p.name!==name);
  save();
}

// QTY
function changeQty(name,val){
  let item = cart.find(p=>p.name===name);
  if(item){
    item.qty += val;
    if(item.qty<=0) removeItem(name);
  }
  save();
}

// CART UPDATE
function updateCart(){
  let html="";
  let total=0;

  cart.forEach(p=>{
    html+=`
    <li>
      ${p.name} ₹${p.price}
      <div>
        <button onclick="changeQty('${p.name}',-1)">-</button>
        ${p.qty}
        <button onclick="changeQty('${p.name}',1)">+</button>
        <button onclick="removeItem('${p.name}')">x</button>
      </div>
    </li>`;
    total += p.price * p.qty;
  });

  document.getElementById("cartItems").innerHTML = html || "Empty Cart";
  document.getElementById("total").innerText = total;
  document.getElementById("count").innerText = cart.length;
}

function save(){
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCart();
}

updateCart();

// CART TOGGLE
function toggleCart(){
  let c=document.getElementById("cart");
  c.style.right = (c.style.right=="0px") ? "-380px":"0px";
}

// HOME
function goHome(){
  toggleCart();
  window.scrollTo({top:0,behavior:"smooth"});
}

// CLEAR
function clearCart(){
  cart=[];
  save();
}

// CHECKOUT
function openCheckout(){
  if(cart.length==0) return alert("Cart empty");
  document.getElementById("checkout").style.display="block";
}

function closeCheckout(){
  document.getElementById("checkout").style.display="none";
}

// ORDER
function placeOrder(){
  alert("Order Placed 🎉");
  cart=[];
  save();
  closeCheckout();
  toggleCart();
}

// LOGIN
function openAuth(){
  document.getElementById("auth").style.display="block";
}
function closeAuth(){
  document.getElementById("auth").style.display="none";
}