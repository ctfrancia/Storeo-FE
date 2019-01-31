const initState = {
    user: { first_name: "", last_name: "", email: "", isAdmin: false, password: "" },
    basket: [],
    categories: [],
    products: []
}

const rootReducer = (state = initState, action) => {

    switch (action.type) {
        case 'GET_CATEGORIES':
        return {...state, categories: action.data};
        case 'GET_PROD_BY_CAT_ID':
        return {...state, products: action.data};

        default:
            return state;

    }
}


export default rootReducer;

