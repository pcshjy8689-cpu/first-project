const coffeeMenu = [
    { name: '아메리카노', price: 4500, image: 'https://images.unsplash.com/photo-1589409044994-3e0136e75525?q=80&w=2832&auto=format&fit=crop' },
    { name: '카페라떼', price: 5000, image: 'https://images.unsplash.com/photo-1563882945281-92b204593325?q=80&w=2787&auto=format&fit=crop' },
    { name: '바닐라라떼', price: 5500, image: 'https://images.unsplash.com/photo-1576192306992-074147321543?q=80&w=2835&auto=format&fit=crop' },
];

class CoffeeItem extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'coffee-item');

        const image = document.createElement('img');
        image.setAttribute('src', this.getAttribute('image'));
        image.setAttribute('alt', this.getAttribute('name'));

        const infoWrapper = document.createElement('div');
        infoWrapper.setAttribute('class', 'info');

        const name = document.createElement('h3');
        name.textContent = this.getAttribute('name');

        const price = document.createElement('p');
        const priceValue = parseInt(this.getAttribute('price'), 10);
        price.textContent = `${priceValue.toLocaleString('ko-KR')}원`;

        const addButton = document.createElement('button');
        addButton.textContent = '담기';

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
            }
            .coffee-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                background-color: var(--card-bg);
                padding: 1rem;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                transition: transform 0.2s ease-in-out;
            }
            .coffee-item:hover {
                transform: translateY(-5px);
            }
            img {
                width: 70px;
                height: 70px;
                border-radius: 8px;
                object-fit: cover;
            }
            .info {
                flex-grow: 1;
            }
            h3 {
                margin: 0 0 0.25rem 0;
                font-size: 1.1rem;
                font-weight: 700;
                color: var(--primary-text);
            }
            p {
                margin: 0;
                font-size: 1rem;
                color: #555;
            }
            button {
                background-color: var(--accent-color);
                color: var(--primary-text);
                border: none;
                padding: 0.6rem 1.2rem;
                border-radius: 20px;
                cursor: pointer;
                font-weight: 700;
                font-size: 0.9rem;
                transition: background-color 0.3s;
            }
            button:hover {
                background-color: #D4B69A;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(image);
        wrapper.appendChild(infoWrapper);
        infoWrapper.appendChild(name);
        infoWrapper.appendChild(price);
        wrapper.appendChild(addButton);
    }
}
customElements.define('coffee-item', CoffeeItem);

const menuElement = document.getElementById('menu');
const orderSummaryElement = document.getElementById('order-summary');
const orderButton = document.getElementById('order-button');

let cart = [];

function renderMenu() {
    if (!menuElement) return;
    menuElement.innerHTML = ''; // Clear previous items
    coffeeMenu.forEach(item => {
        const coffeeItem = document.createElement('coffee-item');
        coffeeItem.setAttribute('name', item.name);
        coffeeItem.setAttribute('price', item.price);
        coffeeItem.setAttribute('image', item.image);
        menuElement.appendChild(coffeeItem);

        coffeeItem.shadowRoot.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(item);
        });
    });
}

function addToCart(item) {
    cart.push(item);
    updateOrderSummary();
}

function updateOrderSummary() {
    const totalItems = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    
    if (orderSummaryElement) {
        orderSummaryElement.innerHTML = `
            <span>총 ${totalItems}개</span>
            <span>${totalPrice.toLocaleString('ko-KR')}원</span>
        `;
    }
}

if (orderButton) {
    orderButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`${cart.length}개의 상품을 주문합니다.`);
            cart = [];
            updateOrderSummary();
        } else {
            alert('장바구니가 비어 있습니다.');
        }
    });
}

// Initial render
renderMenu();
updateOrderSummary();
