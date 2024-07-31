
let http = new XMLHttpRequest();
http.open("GET", "json/book.json", true);
http.send();
http.onload = function() {
  if (this.readyState == 4 && this.status == 200) {
    let books = JSON.parse(this.responseText);
    let output = "";
    for (let item of books) {
      output += `
        <div class="book">
          <img src="${item.image}" alt="${item.name}">
          <p class="name">${item.name}</p>
          <p class="author">${item.author}</p>
           <button class="buybtn" data-book='${JSON.stringify(item)}'>Buy Now</button>
         </div>
      `;
    }
    document.querySelector(".books").innerHTML = output;

    const buyBtns = document.querySelectorAll('.buybtn');
    buyBtns.forEach(btn => {
      btn.addEventListener('click', showOrderPopup);
    });
  }
};
function showOrderPopup(event) {
    const book = JSON.parse(event.currentTarget.dataset.book);
  
    // Create the popup div and its content
    const popup = document.createElement('div');
    popup.classList.add('popup');
  
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
  
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
  
    const orderDetails = `
      <h2>Order Details</h2>
      <p>Book Name: ${book.name}</p>
      <p>Author: ${book.author}</p>
       <p>Quantity: 1</p>
     `;
    popupContent.innerHTML = orderDetails;
  
    // Create Razorpay payment button script element
    const razorpayScript = document.createElement('script');
    razorpayScript.src = "https://checkout.razorpay.com/v1/payment-button.js";
    razorpayScript.setAttribute("data-payment_button_id", "pl_NtYzEt3tu5sS2K");
    razorpayScript.async = true;
  
    popupContent.appendChild(closeBtn);
    popupContent.appendChild(razorpayScript); // Append the Razorpay payment button script
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
  
    // Close the popup when the close button or outside the popup is clicked
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
      document.body.removeChild(popup);
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === popup) {
        popup.style.display = 'none';
        document.body.removeChild(popup);
      }
    });
  }
  