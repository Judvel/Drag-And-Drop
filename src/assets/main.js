
const buttonEnter = document.querySelector('#button-product');
const inputName = document.querySelector('#product-name');
const inputPrice = document.querySelector('#produc-price');
const myProducts = document.querySelector('#myproducts');
const buttonClear = document.querySelector('#clear-list');

let dragIndex = 0;
let dropIndex = 0;
let clone = "";

/* const productApi = document.querySelector('#productapi'); */

const emptyList = document.querySelector('#empty-list');

let productList = [];

if (!getLocalStorage()){
    productList = [];
} else{
    for(let i = 0; i < getLocalStorage().length; i++){
        productList.push({
            id: getLocalStorage()[i].id,
            name: getLocalStorage()[i].name,
            price: getLocalStorage()[i].price,
        })
    }
}

for (element of productList){
    renderProductList(element);
}

emptyListFn(productList);

buttonEnter.addEventListener('click', enterProductList);

function renderProductList(arr){
    const productDiv = document.createElement('div')
    productDiv.classList.add('main-product--card')
    productDiv.classList.add('dropzone')

    productDiv.setAttribute('id', `product-${arr.id}`)
    productDiv.setAttribute('draggable', `true`)
    productDiv.setAttribute('ondragstart', `drag(event)`)
    productDiv.setAttribute('ondrop', `drop(event)`)
    productDiv.setAttribute('ondragover', `allowDrop(event)`)
    

    const productpId = document.createElement('p'); 
    
    productpId.innerText = `ID: ${arr.id}`;
    const productpName = document.createElement('p'); 
    productpName.innerText = `${arr.name}`;
    const productpPrice = document.createElement('p');
    productpPrice.innerText = `$ ${arr.price}`;

    myProducts.appendChild(productDiv);
    productDiv.appendChild(productpId);
    productDiv.appendChild(productpName);
    productDiv.appendChild(productpPrice);
    
    
}

function enterProductList(event){
    event.preventDefault();
    if ((inputName.value) && (inputPrice.value > 0)){
        productList.push({
            id: productList.length,
            name: inputName.value,
            price: inputPrice.value,
        })
       
        renderProductList(productList[productList.length - 1]);
        window.localStorage.setItem("local", JSON.stringify(productList));
    } else {
        console.log('Los inputs estan vacias')
    }
    emptyListFn(productList)
    console.log(productList);
}

function emptyListFn(arr){
    if (arr.length == 0){
        emptyList.classList.remove('inactive');
    } else {
        emptyList.classList.add('inactive');
        
    }
}

/* Drag, Drop and swap section */



function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}
function drop(event){
    event.preventDefault();
    clone = event.target.cloneNode(true);
    let idProduct = event.dataTransfer.getData('text');

    if (clone.id != idProduct){
        let nodeList = myProducts.childNodes;
        for (let i = 0; i < nodeList.length; i++){
            if (nodeList[i].id == idProduct) {
                dragIndex = i;
            }
        }

        myProducts.replaceChild(document.querySelector(`#${idProduct}`), event.target);
        myProducts.insertBefore(clone, myProducts.childNodes[dragIndex]);
    }
}

function allowDrop(event) {
    event.preventDefault();
}


buttonClear.addEventListener('click', clearList)

function clearList(){
    let child = myProducts.lastElementChild;
    while (child) {
        myProducts.removeChild(child);
        child = myProducts.lastElementChild;
    }
    renderListEmpty();
    clearLocalStorage();

}

function renderListEmpty(){
    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('main-product--empty-list');
    emptyDiv.setAttribute('id', 'empty-list');

    const emptyImg = document.createElement('img');
    emptyImg.setAttribute('src', './img/cart-is-empty.png');
    const emptyH2 = document.createElement('h2');
    emptyH2.innerText = 'Tu lista esta vacia :('
    emptyDiv.appendChild(emptyImg);
    emptyDiv.appendChild(emptyH2);

    myProducts.appendChild(emptyDiv);
}

function getLocalStorage() {
    let obj = JSON.parse(window.localStorage.getItem("local"));
    console.log(obj);
    return obj;
  }
  
function clearLocalStorage() {
    window.localStorage.clear();
}


console.log(productListApi[0])
console.log(productListApi);
