export function addProductToBug(Item) {
    return { type: 'ADD_PRODUCT_TO_BUG', payload: Item }
}

export function clearProducts(item) {
    return {type: 'CLEAR_PRODUCTS'}
}

export function updateProductCount(Item) {
    return { type: 'UPDATE_PRODUCT_COUNT', payload: Item }
}

export function deleteProductFromBug(Item) {
    return { type: 'DELETE_PRODUCT_FROM_BUG', payload: Item }
}
export function updateUser(Item) {
    return { type: 'UPDATE_USER', payload: Item }
}
