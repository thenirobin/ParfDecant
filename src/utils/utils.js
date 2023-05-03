export const filteredCards = (cards) => {
    return cards.filter(e => e.author._id)
    // === '644660988fbc473fa89cbe9d'
}

export const findFav = (product, id) => {
    return product.likes.some(e => e === id)
}