import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            cartTotal: 0,
            cart: {},
            sale: false,
            selectedPaymentMethod: null,
            paymentSubmitted: false,
            authorizingPayment: false,
            paymentResult: null,
            bankHasBeenSelected: false,
            selectedBank: null,
            authorizingBank: false,
            bankAuthorizationResult: null,
            products: [
                {
                    name: 'Khaki Suede Polish Work Boots',
                    price: 149.99,
                    category: 'women',
                    sale: true,
                    article: 'shoe',
                    img: 'shoe1.png'
                },
                {
                    name: 'Green Fang Jacket Jungle',
                    price: 39.99,
                    category: 'women',
                    sale: false,
                    article: 'jacket',
                    img: 'jacket1.png'
                },
                {
                    name: 'Parka and Quilted Liner Jacket',
                    price: 49.99,
                    category: 'men',
                    sale: true,
                    article: 'jacket',
                    img: 'jacket2.png'
                },
                {
                    name: 'Cotton Black Cap',
                    price: 12.99,
                    category: 'men',
                    sale: true,
                    article: 'hats',
                    img: 'hat1.png'
                },
                {
                    name: 'Knit Sweater with Zips',
                    price: 29.99,
                    category: 'women',
                    sale: false,
                    article: 'sweater',
                    img: 'sweater1.png'
                },
                {
                    name: 'Long Linen-blend Shirt',
                    price: 18.99,
                    category: 'men',
                    sale: false,
                    article: 'shirt',
                    img: 'shirt1.png'
                },
                {
                    name: 'Knit Orange Sweater',
                    price: 28.99,
                    category: 'men',
                    sale: false,
                    article: 'sweater',
                    img: 'sweater2.png'
                },
                {
                    name: 'Cotton Band-collar Blouse',
                    price: 49.99,
                    category: 'men',
                    sale: false,
                    article: 'shirt',
                    img: 'shirt2.png'
                },
                {
                    name: 'Camo Fang Jacket Jungle',
                    price: 59.99,
                    category: 'women',
                    sale: true,
                    article: 'jacket',
                    img: 'jacket3.png'
                },
                {
                    name: 'Golden Pilot Jacket',
                    price: 129.99,
                    category: 'women',
                    sale: false,
                    article: 'jacket',
                    img: 'jacket4.png'
                },
                {
                    name: 'Spotted Patterned Sweater',
                    price: 80.99,
                    category: 'women',
                    sale: false,
                    article: 'jacket',
                    img: 'sweater4.png'
                },
                {
                    name: 'Double Knit Sweater',
                    price: 59.99,
                    category: 'men',
                    sale: true,
                    article: 'jacket',
                    img: 'sweater5.png'
                }
            ]
        },
        getters: {
            women: state => filter(state.products, 'category', 'women'),
            men: state => filter(state.products, 'category', 'men'),
            sale: state => filter(state.products, 'sale', true)
        },
        mutations: {
            switchSale: (state) => {
                state.sale = !state.sale
            },
            clearCartCount: (state) => {
                state.cartTotal = 0
            },
            clearCartContents: (state) => {
                state.cart = {}
            },
            addItem: (state, item) => {
                state.cartTotal++
                if (item.name in state.cart) {
                    state.cart[item.name].count++
                } else {
                    const stateItem = Object.assign({}, item)
                    stateItem.count = 1
                    state.cart[item.name] = stateItem
                }
            },
            addSelectedPaymentMethod: (state, item) => {
                state.selectedPaymentMethod = item
            },
            setPaymentSubmitted: (state, value) => {
                state.paymentSubmitted = value
            },
            setAuthorizingPayment: (state, value) => {
                state.authorizingPayment = value
            },
            setPaymentResult: (state, value) => {
                state.paymentResult = value
            },
            setBankHasBeenSelected: (state, value) => {
                state.bankHasBeenSelected = value
            },
            setSelectedBank: (state, value) => {
                state.selectedBank = value
            },
            setAuthorizingBank: (state, value) => {
                state.authorizingBank = value
            },
            setBankAuthorizationResult: (state, value) => {
                state.bankAuthorizationResult = value
            }
        }
    })
}

export default createStore

// helper
const filter = (array, key, value) => array.filter(item => item[key] === value)
