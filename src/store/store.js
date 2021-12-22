import produce from 'immer';
import { createStore,  } from 'redux'

const state = {
    products: [],
    totalPayment: 0,
    user: {
        id: '',
        userName: '',
        password: ''
    }
};

const reducer = produce((state, action) => {
    
    switch (action.type) {
        case 'CLEAR_PRODUCTS':
            state.products = [];
            state.totalPayment = 0;
            break;
        case 'ADD_PRODUCT_TO_BUG':
            state.products.push(action.payload)
            state.totalPayment += action.payload.count * action.payload.price;
            break;

        case 'UPDATE_PRODUCT_COUNT':
            state.totalPayment = 0;
            state.products.forEach(element => {
                if (element._id == action.payload._id) {
                    element.count = action.payload.count
                }
                state.totalPayment += element.count * element.price;
            })
            break
        case 'DELETE_PRODUCT_FROM_BUG':
           state.totalPayment = 0;
            state.products.forEach(element => {
                if (element._id == action.payload._id) {
                    element.count = 0;

                }
                state.totalPayment += element.count * element.price;
            })
            let newproducts = state.products.filter(product => product.count !== 0);
            state.products = newproducts;
            
            break
        case 'UPDATE_USER': {
            state.user.id = action.payload._id
            state.user.userName = action.payload.userName
            state.user.password = action.payload.password
            break
        }

    }
}, state);

const store = createStore(reducer);
window.store = store;
export default store;



