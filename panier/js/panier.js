function getCart() {
    let cart = localStorage.getItem('cart');

    return cart ? JSON.parse(cart) : [];
}

function addProductToCart(product) {
    if (!product) {
        throw new ProductUndifiendError();    
    }
    if (product.quantity <= 0) {
        throw new ProductQuantityNegativeError();
    }
    if (product.price <= 0) {
        throw new ProductPriceNegativeError();
    }
    
    let cart = getCart();

    let productInCart = cart.find(p => p.name === product.name);

    if (productInCart) {
        productInCart.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function modifyProductQuantity(name, newQuantity) {

    if (newQuantity <= 0) {
        throw new ProductQuantityNegativeError();
    }

    let cart = getCart();
    let product = cart.find(product => product.name === name);

    if (!product) {
        throw new ProductUndifiendError();
    }
    
    product.quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    
}

function deleteProductFromCart(name) {
    let cart = getCart();

    productFoundIndex = cart.findIndex(product => product.name === name);

    if (productFoundIndex === -1) {
        throw new ProductNotFoundError();
    }

    cart.splice(productFoundIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
}


function printCart() {
    let cart = getCart();
    console.log(cart);
}

addProductToCart({name: 'product1', price: 10, quantity: 10});
addProductToCart({name: 'product2', price: 20, quantity: 1});
addProductToCart({name: 'product3', price: 30, quantity: 1});
printCart();

modifyProductQuantity('product3', 2);
printCart();

deleteProductFromCart('product3');
printCart();