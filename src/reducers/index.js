
let basket, user;
const myBasket = localStorage.getItem('basket');
if (myBasket === null) basket = [];
else basket = JSON.parse(myBasket);

const defaultUser = { id: "", first_name: "", last_name: "", role: "", token: "", email: "", address: "", country: "", zip: "", phone: "" };
const myUser = localStorage.getItem('user');
if (!myUser) user = defaultUser;
else user = JSON.parse(myUser);


const initState = {
    user: user,
    basket: basket,
    categories: [],
    products: [],
    searchResult: [],
    paymentStatus: "not started",
    lastOrder: [],
}

const rootReducer = (state = initState, action) => {

    switch (action.type) {

        case 'USER_LOGGED_IN':
            return { ...state, user: action.data };

        case 'USER_ADDRESS_ADDED':
            return { ...state, user: { ...state.user, ...action.data } };

        case "LOGOUT_USER":
            return { ...state, user: defaultUser }
        case 'GET_CATEGORIES':
            return { ...state, categories: action.data };
        case 'GET_PROD_BY_CAT_ID':
            return { ...state, products: action.data };
        case 'ADD_TO_BASKET':

            let tmpBasket = state.basket.slice();
            const product = action.product;
            const quantityToAdd = action.quantityToAdd
            let matchFound = false;

            if (tmpBasket.length === 0) {
                product.quantity += quantityToAdd
                tmpBasket.push(product);
                return { ...state, basket: [...state.basket, ...tmpBasket] }
            }

            tmpBasket.forEach(basketProduct => {
                if (basketProduct.id === product.id) {
                    basketProduct.quantity += quantityToAdd;
                    matchFound = true;
                    return;
                }
            })
            if (matchFound) {
                return { ...state, basket: tmpBasket }
            }
            product.quantity += quantityToAdd

            return { ...state, basket: [...state.basket, product] }

        case 'CLEAR_BASKET':
            return { ...state, basket: [] }


        case 'DELETE_FROM_BASKET':
            return { ...state, basket: state.basket.filter(el => el.id !== action.id) }
        // let tmpDelBasket = state.basket.slice();

        // let inx = -1;
        // tmpDelBasket.forEach(basketProductEl => {
        //     if (basketProductEl.id === action.id)
        //     inx = tmpDelBasket.indexOf(basketProductEl)
        //     return inx;
        // })
        // tmpDelBasket.splice(inx,1);
        // return {...state, basket: tmpDelBasket};

        case 'CHANGE_PRODUCT_QTY_IN_BASKET':
            let tmpChngBasket = state.basket.slice();
            tmpChngBasket.forEach(basketProductEl => {
                if (basketProductEl.id === action.id)
                    basketProductEl.quantity += action.qty;
            });
            return { ...state, basket: tmpChngBasket };

        case 'SAVE_SEARCH_RESULT':
            return { ...state, searchResult: action.listOfProducts };


        case 'TOGGLE_PAYMENT_STATUS':
            return {...state, paymentStatus: action.status};

        case 'SHOW_LAST_ORDER':
            return {...state, lastOrder: action.data};

        default:
            return state;
    }
}

export default rootReducer;

