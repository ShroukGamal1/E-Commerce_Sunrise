let slideIndex = 0;
var currentPage = window.location.pathname;

window.onload = function() {
 
  if (currentPage === "/home.html") {
      var isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
      signInModal.style.display='block';
  }
      showSlides();
  }
  if(currentPage=="/productDetails.html"){
    getProductDetails();
  }
};

if (currentPage=="/contact.html"){
  function validateForm(event) {
    event.preventDefault(); 

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    document.getElementById('messageError').textContent = '';

    document.getElementById('fullnameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
   

    if (fullname === '') {
      document.getElementById('fullnameError').textContent = 'Full Name is required';
      Swal.fire({
        title: 'Full Name is required',
        icon: 'error',
      });
      return false;
    }
    else if (!validateFullName(fullname)) {
      document.getElementById('fullnameError').textContent = 'Invalid Fullname';
      Swal.fire({
        title: 'Invalid fullname format',
        icon: 'error',
      });
      document.getElementById('fullname').value = '';
    
      return false;
    }
    if (email === '') {
      document.getElementById('emailError').textContent = 'Email is required';
      return false;
    } else if (!validateEmail(email)) {
      document.getElementById('emailError').textContent = 'Invalid email format';
      Swal.fire({
        title: 'Invalid email format',
        icon: 'error',
      });
    
      document.getElementById('email').value = '';
  
      return false;
    }

    if (phone === '') {
      document.getElementById('phoneError').textContent = 'Phone is required';
      return false;
    } else if (!validatePhone(phone)) {
      document.getElementById('phoneError').textContent = 'Invalid phone number format';
      Swal.fire({
        title: ' Invalid phone number format',
        icon: 'error',
      });
      document.getElementById('phone').value = '';
      
      return false;
    }
    if (message === '') {
      document.getElementById('messageError').textContent = 'Message is required';
      Swal.fire({
        title: 'Empty Input !',
        icon: 'error',
      });
    
      document.getElementById('message').value = '';
      return false;
    }
    Swal.fire({
      title: ' Sent Successfully !',
      text: 'We recieved your feedback ',
      icon: 'success',
      confirmButtonText: 'Got it!'
    });
    document.getElementById('fullname').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';

    document.getElementById('message').value = '';
    }
    document.getElementById('messageError').textContent = '';

    document.getElementById('fullnameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function validatePhone(phone) {
    const re = /^(010|011|012)\d{8}$/;
    return re.test(phone);
  }
  function validateFullName(fullname){
    const lettersRegex = /^[A-Za-z]+$/;
    
      return lettersRegex.test(fullname);
    }

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 1500); 
}

/////////////
// Get the modals sign in and sign up 
var signInModal = document.getElementById('signInModal');
var signUpModal = document.getElementById('signUpModal');
var signupInfo = localStorage.getItem('signupInfo');
var users = signupInfo ? JSON.parse(signupInfo) : [];


// Function to open a modal , close modal 
if(currentPage=="/home.html"){
function openModal(modal) {
  modal.style.display = 'block';
}
function closeModal(modal) {
  modal.style.display = 'none';
}

  
}

// Get the form elements in the sign-in modal
var signInForm = document.getElementById('Form');
var signInEmailInput = document.getElementById('Email');
var signInPasswordInput = document.getElementById('password');
var signInButton = document.getElementById('signIn');

// Get the form elements in the sign-up modal
var signUpForm = document.getElementById('signUpForm');
var signUpUsernameInput = document.getElementById('signUpUsername');
var signUpEmailInput = document.getElementById('signUpEmail');
var signUpPasswordInput = document.getElementById('signUpPassword');
var signUpConfirmInput = document.getElementById('signUpConfirm');
var signUpButton = document.getElementById('signUp');
var signUplink = document.getElementById('signup');
//if don't have an account
signUplink.addEventListener("click",function(){
signInPasswordInput.value="";
signInEmailInput.value="";
errorEmail.value="";
errorPassword.value="";
  closeModal(signInModal);
  openModal(signUpModal);
})
// Error message elements
var errorEmail = document.getElementById('erroremail');
var errorUser = document.getElementById('errorUser');
var errorEmailSignUp = document.getElementById('errorEmail');
var errorPassword = document.getElementById('errorPassword');
var errorpassword = document.getElementById('errorpassword');

var signinbtn=document.getElementById("signin");
// Regular expressions for validation
var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;
var usernamePattern = /^[A-Za-z][A-Za-z]*$/;

// Add event listeners for sign-in form submission
signInButton.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission
  
  
  // Validate email
  if (!signInEmailInput.value.match(validRegex)) {
    signInEmailInput.value="";
    signInEmailInput.focus();
    errorEmail.textContent = 'Invalid email address';
    return;
  } else {
    errorEmail.textContent = "";
  }

  // Validate password 
  if (signInPasswordInput.value.trim() === "") {
    errorPassword.textContent = 'Password cannot be empty';
    signInPasswordInput.focus();
    return;
  } else {
    errorPassword.textContent = "";
  }

  // If all validations pass
  //find if the user have account or not

            var user = users.find(user => user.email === signInEmailInput.value);
            if (user && user.password === signInPasswordInput.value) {
              Swal.fire({
                title: ' Signin successful!',
                icon: 'success',
                confirmButtonText: 'Got it!'
              });
              sessionStorage.setItem('isLoggedIn', true);              
              closeModal(signInModal);
          } else {
            Swal.fire({
              title: " You don't have an account",
              icon: 'error',
            });
          }
            
});
signinbtn.addEventListener("click",function(){
  closeModal(signUpModal);
  openModal(signInModal);
})
// Add event listener for sign-up form submission
signUpButton.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Validate username
  
    if (!usernamePattern.test(signUpUsernameInput.value.trim())) {
        // Handle invalid username pattern
        errorUser.textContent = 'Username must start with a letter and contain only letters';
    return;
    }else{
      errorUser.textContent="";
    }
  

  if (!validRegex.test(signUpEmailInput.value.trim())) {
    errorEmailSignUp.textContent = 'Invalid email address';
    return;
  } else {
    errorEmailSignUp.textContent = "";
  }

  // Validate password
  if (signUpPasswordInput.value.trim() === "") {
    errorpassword.textContent = 'Password cannot be empty';
    return;
  } else if (signUpPasswordInput.value.trim() !== signUpConfirmInput.value.trim()) {
    errorpassword.textContent = 'Passwords do not match';
    return;
  } else {
    errorpassword.textContent = "";
  }
  // If all validations pass, you can proceed with sign-up logic here
  // clear the content and  close the modal
  var existingUser = users.find(user => user.email === signUpEmailInput.value);
            if (existingUser) {
              Swal.fire({
                title:'this email has already account!',
                icon: 'error',
                confirmButtonText: 'Got it!'
              });
                signUpConfirmInput.value='';
                signUpEmailInput.value='';
                signUpPasswordInput.value='';
                signUpUsernameInput.value='';
                closeModal(signUpModal);
                openModal(signInModal);
                return;
            }

            // Add new user to the list
            users.push({ email: signUpEmailInput.value, password: signUpPasswordInput.value });
            localStorage.setItem('signupInfo', JSON.stringify(users));
            Swal.fire({
              title:'Signup successful!',
              icon: 'success',
              confirmButtonText: 'Got it!'
            });
            signUpConfirmInput.value='';
                signUpEmailInput.value='';
                signUpPasswordInput.value='';
                signUpUsernameInput.value='';
closeModal(signUpModal);
openModal(signInModal);});

          
////////////////////////////////////////////////
if(currentPage=="/home.html"){
fetch("assets/js/product.json")
 	.then((response) => response.json())
 	.then((data) => {
    var container=document.getElementById("card-container");
    var cartCount=document.getElementById("cartCount");
    products = data;
        data.forEach(item => {
            var card =document.createElement("div");
            card.className="card";
            var cardContent =document.createElement("div");
            cardContent.className="cardContent";
            cardContent.classList.add('item');
            cardContent.dataset.id=item.id;
            const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        const content = document.createElement('div');
        content.className = 'card-content';
        content.innerHTML = `
          <h4> ${item.title}</h4>
          <p><h5>price: </h5>${item.price} $</p>
          <p class="rating">${getStarRating(item.rating.rate)}</p>
          `;

        const addToCartButton = document.createElement('button');
        const moredetails = document.createElement('button');
        moredetails.className='moredetails';
        moredetails.innerHTML='Details';
        addToCartButton.className = 'add-to-cart';
        addToCartButton.innerText = '+';
        addToCartButton.addEventListener('click', () => {
          //cartCount.innerText=++(cartCount.innerText);
        });
          moredetails.addEventListener('click', () => {
              window.location.href = `productDetails.html?id=${item.id}`;
          
      });
        cardContent.appendChild(image);
        cardContent.appendChild(addToCartButton);
        cardContent.appendChild(content);
        cardContent.appendChild(moredetails);
        card.appendChild(cardContent);
        container.appendChild(card);
        })
        if(localStorage.getItem('cart')){
          cart = JSON.parse(localStorage.getItem('cart'));
          addCartToHTML();
      }})
 	.catch((error) => {
 		console.log(error);
 	});
}
   function getStarRating(rating) {
    const roundedRating = Math.round(rating * 2) / 2; 
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (roundedRating - i >= 1) {
        stars += '★'; // Full star
      } else if (roundedRating - i === 0.5) {
        stars += '½'; // Half star
      } else {
        stars += '☆'; // Empty star
      }
    }
    return stars;
  }
  if(currentPage=="/home.html"){
//categories
var menCategory=document.getElementById("men");
var womenCategory=document.getElementById("women");
var shoesCategory=document.getElementById("shoes");
var bagsCategory=document.getElementById("bags");
var jewleryCategory=document.getElementById("jewlery");

menCategory.addEventListener('click',()=>{
  getCategory("men's clothing");
});
womenCategory.addEventListener('click',()=>{
  getCategory("women's clothing");
});
shoesCategory.addEventListener('click',()=>{
  getCategory("Shoes");
});
bagsCategory.addEventListener('click',()=>{
  getCategory("Bags");
});
jewleryCategory.addEventListener('click',()=>{
  getCategory("jewelery");
});
  }
// 
 function getCategory(category){
  fetch("assets/js/product.json")
  .then((response) => response.json())
  .then((data) => {
    var cartCount=document.getElementById("cartCount");
    //clear cart container
    while(container.firstChild) { 
      container.removeChild(container.firstChild); 
  } 
        data.forEach(item => {
          
          if(item.category==category){
            products.push(item);
            var card =document.createElement("div");
            card.className="card";
            var cardContent =document.createElement("div");
            cardContent.className="cardContent";
            cardContent.dataset.id=item.id;
            const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;

        const content = document.createElement('div');
        content.className = 'card-content';
        content.innerHTML = `
          <h4> ${item.title}</h4>
          <p><h5>price: </h5>${item.price} $</p>
          <p class="rating">${getStarRating(item.rating.rate)}</p>
          `;
          card.dataset.id = item.id;
          card.classList.add('item');
        const addToCartButton = document.createElement('button');
        const moredetails = document.createElement('button');
        moredetails.className='moredetails';
        moredetails.innerHTML='Details';
        addToCartButton.className = 'add-to-cart';
        addToCartButton.id=item.id;
        addToCartButton.innerText = '+';
        addToCartButton.addEventListener('click', () => {
          //cartCount.textContent=++cartCount.value;

          });
          moredetails.addEventListener('click', () => {
            window.location.href = `productDetails.html?id=${item.id}`;
        
    });
        cardContent.appendChild(image);
        cardContent.appendChild(addToCartButton);
        cardContent.appendChild(content);
        cardContent.appendChild(moredetails);
        card.appendChild(cardContent);
        container.appendChild(card);
        
          }
        });
        if(localStorage.getItem('cart')){
          cart = JSON.parse(localStorage.getItem('cart'));
          addCartToHTML();
      }  
  })
  .catch((error) => {
    console.log(error);
  });

 }
 var container=document.querySelector('.card-container');

 let listCartHTML = document.querySelector('.listCart');
let iconCart = document.getElementById('carti');
let iconCartSpan = document.getElementById('cartCount');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let carttap=document.getElementsByClassName("cartTab");
let products = [];
let cart = [];
iconCart.addEventListener('click', () => {
  body.classList.toggle("showCart");

})
closeCart.addEventListener('click', () => {
  body.classList.toggle("showCart");
addCartToHTML();
})
 //
 if(currentPage==="/home.html"){
  container.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains("add-to-cart")){
        let id_product = positionClick.parentElement.dataset.id;
        console.log(id_product);
        addToCart(id_product);
    }
});
 }
 const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
  if(cart.length <= 0){
      cart = [{
          product_id: product_id,
          quantity: 1
      }];
  }else if(positionThisProductInCart < 0){
      cart.push({
          product_id: product_id,
          quantity: 1
      });
  }else{
      cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
}
const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

const addCartToHTML = () => {
  let totalQuantity=0;
  listCartHTML.innerHTML = '';
  if(cart.length > 0){
      cart.forEach(item => {
          totalQuantity = totalQuantity +  item.quantity;
          let newItem = document.createElement('div');
          newItem.classList.add('item');

          newItem.dataset.id = item.product_id;

          let positionProduct = products.findIndex((value) => value.id == item.product_id);
          let info = products[positionProduct];
          listCartHTML.appendChild(newItem);
          newItem.innerHTML = `
          <div class="image">
                  <img src="${info.image}">
              </div>
              <div class="name">
              ${info.title}
              </div>
              <div class="totalPrice">$${info.price * item.quantity}</div>
              <div class="quantity">
                 <span class="minus">-</span>
                  <span>${item.quantity}</span>
                  <span class="plus">+</span>
              </div>
          `;
      })

      iconCartSpan.innerText = totalQuantity;

  }
 
}

listCartHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
      let product_id = positionClick.parentElement.parentElement.dataset.id;
      let type = 'minus';
      if(positionClick.classList.contains('plus')){
          type = 'plus';
      }
      changeQuantityCart(product_id, type);
  }
})
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
  if(positionItemInCart >= 0){
      let info = cart[positionItemInCart];
      switch (type) {
          case 'plus':
              cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
              break;
      
          default:
              let changeQuantity = cart[positionItemInCart].quantity - 1;
              if (changeQuantity > 0) {
                  cart[positionItemInCart].quantity = changeQuantity;
              }else{
                  cart.splice(positionItemInCart, 1);
              }
              break;
      }
  }
  addCartToHTML();
  addCartToMemory();
}

 
 
 
 
 //pro details
 function getProductDetails(){
  fetch('assets/js/product.json')
            .then(response => response.json())
            .then(data => {
                const urlParams = new URLSearchParams(window.location.search);
                const productId = parseInt(urlParams.get('id'));
                const product = data.find(item => item.id === productId);
                const prodImg=document.getElementById("aboutImg");
                const productDetailsContainer = document.getElementById('aboutText');
                if (product) {
                  const image = document.createElement('img');
                  image.id="det";
                  image.src = product.image;
                  prodImg.append(image);
                    productDetailsContainer.innerHTML = `
                        <h2>${product.title}</h2>
                        <br><br>
                        <h3><b>Description:</b> ${product.description}</h3>
                        <br>
                        <p> <b>Rate : </b>${product.rating.rate}<p>
                        
                        <p class="rating">${getStarRating(product.rating.rate)}</p>
                        
                        <p><b>Price: </b>${product.price}$</p>
                    `;
                   
                
                  } else {
                    productDetailsContainer.innerHTML = '<p>Product not found</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                const productDetailsContainer = document.getElementById('aboutText');
                productDetailsContainer.innerHTML = '<p>Error fetching data</p>';
            });
 }
 window.onscroll = function() {scrollFunction()};

 function scrollFunction() {
     var scrollToTopButton = document.getElementById("scrollToTop");
     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
         scrollToTopButton.style.display = "block";
     } else {
         scrollToTopButton.style.display = "none";
     }
 }

 document.getElementById("scrollToTop").onclick = function() {
     scrollToTop();
 };

 function scrollToTop() {
     document.body.scrollTop = 0; 
     document.documentElement.scrollTop = 0; 
 }




