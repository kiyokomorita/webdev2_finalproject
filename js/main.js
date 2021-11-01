// 'use strict';
// {

    function play(){
        setTimeout(()=> {
            images[currentIndex].classList.remove('current');
            currentIndex++;
            if(currentIndex >images.length -1){
                currentIndex =0;
            }
            images[currentIndex].classList.add('current');
            play();
    
        },5000);

    }
    const images = document.querySelectorAll('.hero img');
    let currentIndex = 0;

    play();
// }
// {
    let carts = document.querySelectorAll('.add-cart');

    let products = [
        {
            name:"Lipstick",
            tag:"Lipstick",
            price:25.00,
            inCart: 0

        },
        {
            name:"Mascara",
            tag:"Mascara",
            price:34.00,
            inCart: 0

        },
        {
            name:"Makeup Foundation",
            tag:"Foundation",
            price:40.00,
            inCart: 0

        },
        {
            name:"Advanced Night Repair Eye",
            tag:"Eye",
            price:87.00,
            inCart: 0

        },
        {
            name:"Crème de la Mer Moisturizer",
            tag:"Moistrizer",
            price:125.00,
            inCart: 0

        },
        {
            name:"Eyeshadow Palette",
            tag:"Eyeshadow",
            price:72.00,
            inCart: 0

        }
    ];

    for(let i=0; i<carts.length; i++){
        carts[i].addEventListener('click',()=>{
            cartNumbers(products[i]);
            totalCost(products[i])

        })
    }

    function onLoadCartNumbers(){
        let productNumbers = localStorage.getItem('cartNumbers');

        if(productNumbers){
            document.querySelector('.cart span').textContent = productNumbers;

        }

    }
        function cartNumbers(product){
            
            let productNumbers = localStorage.getItem('cartNumbers');
            

            productNumbers = parseInt(productNumbers);

            if(productNumbers ){
                localStorage.setItem('cartNumbers', productNumbers + 1);
                document.querySelector('.cart span').textContent = productNumbers + 1 ;
            }else{
                localStorage.setItem('cartNumbers', 1);
                document.querySelector('.cart span').textContent = 1 ;
            }

            setItems(product);

            
        }

        function setItems(product){
           
            let cartItems = localStorage.getItem('productsInCart');
            cartItems = JSON.parse(cartItems);
            

             if(cartItems != null){

                if(cartItems[product.tag]== undefined){
                    cartItems = {
                        ...cartItems,
                        [product.tag]:product
                    }
                }
                cartItems[product.tag].inCart += 1;
             
             }else{
                product.inCart = 1;

                cartItems = {
                    [product.tag]: product
            }
            
         }
            
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        }
        function totalCost(product){
            let cartCost = localStorage.getItem('totalCost');
            console.log("the product price is", product.price);
            console.log(typeof cartCost) ;

            
            
            // let cartCost = localStorage.getItem('totalCost');
            

            if(cartCost != null){
                cartCost = parseInt(cartCost);
                localStorage.setItem("totalCost", cartCost + product.price);
            }else {
                localStorage.setItem("totalCost", product.price);
            }
            
        }

        function displayCart(){
            let cartItems = localStorage.getItem("productsInCart");
            cartItems = JSON.parse(cartItems);
            let productContainer = document.querySelector('product-container');


            if(cartItems && productContainer ){
                productContainer.innerHTML = '';
                Object.values(cartItems).map(item =>{
                    productContainer.innerHTML +=　`
                    <div class="product">
                    <ion-icon name="close-circle-outline"></ion-icon>
                    <img src="./images/${item.tag}.jpg">
                    <span>${item.name}</span>
                    </div>
                    `
                });

            }

        }


        onLoadCartNumbers();
        displayCart();

    
