/* import fetch from "node-fetch"; */

const productApi = document.querySelector('#productapi');
const buttonApi = document.querySelector('#more-items');

const API = 'https://api.escuelajs.co/api/v1';


async function fetchData(urlApi){
    const response = await window.fetch(urlApi);
    const data = await response.json();
    return data;
}

let productsApi;
let indexPag = -5;
buttonApi.addEventListener('click', moreItems);
let productListApi = [];
const dataProducts = async(urlApi) => {
    try{
        const product = await fetchData(`${urlApi}/products?offset=${indexPag = indexPag + 5}&limit=5`);
        for (let i = 0; i < product.length; i++){
            productListApi.push({
                id: `FS-${product[i].id}`,
                name: product[i].title,
                price: product[i].price,
            })
        }
        renderProductApi(productListApi);
        
    } catch (error){
        console.log(error);
    }
}

function renderProductApi(arr) {
    for (product of arr){
        const productDiv = document.createElement('div')
        productDiv.classList.add('main-product--card')
        
        productDiv.setAttribute('id', `productApi-${product.id}`)
        productDiv.setAttribute('draggable', `true`)
        productDiv.setAttribute('ondragstart', `dragApi(event)`)
        productDiv.setAttribute('ondrop', `dropApi(event)`)
        productDiv.setAttribute('ondragover', `allowDropApi(event)`)
        
        const productpId = document.createElement('p'); 
        
        productpId.innerText = `ID: ${product.id}`;
        const productpName = document.createElement('p'); 
        productpName.innerText = product.name;
        const productpPrice = document.createElement('p');
        productpPrice.innerText = `$ ${product.price}`;
        
        productDiv.appendChild(productpId);
        productDiv.appendChild(productpName);
        productDiv.appendChild(productpPrice);
        
        productApi.appendChild(productDiv);
        
    }
    
}

let dragIndexApi = 0;
let dropIndexApi = 0;
let cloneApi = "";

function dragApi(event) {
    event.dataTransfer.setData('Text', event.target.id);
}

function allowDropApi(event) {
    event.preventDefault();
}

function dropApi(event){
    event.preventDefault();
    cloneApi = event.target.cloneNode(true);
    let idProduct = event.dataTransfer.getData('text');
    
    if (cloneApi.id != idProduct){
        let nodeList = productApi.childNodes;
        for (let i = 0; i < nodeList.length; i++){
            if (nodeList[i].id == idProduct) {
                dragIndexApi = i;
            }
        }
        
        productApi.replaceChild(document.querySelector(`#${idProduct}`), event.target);
        productApi.insertBefore(cloneApi, productApi.childNodes[dragIndexApi]);
    }
}


function moreItems(){
    dataProducts(API);
    productListApi = [];
}

dataProducts(API);
/* dataProducts(API); */
/* console.log(productListApi); */

