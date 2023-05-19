export const filteredCards = (cards) => {
    return cards.filter(e => e.author._id  === '644660988fbc473fa89cbe9d')
}
export const findFav = (product, id) => {
    return product.likes.some(e => e === id)
}

export const getEnding = (numb, field = 'товар') => {
    const tmp = numb % 10;
    if ((numb > 10 && numb < 15) || (tmp > 5) || (!numb) || (tmp === 0)) {
        return `${field}ов`
    }
    if (tmp === 1) {
        return `${field}`
    }
    if (tmp > 1 && tmp < 5) {
        return `${field}а`
    }
}

  // Сортировка с условиями
  // const onSort = (sortId) => {
  //   if (sortId === POPULAR) {
  //     const newCards = cards.sort((a,b) => b.likes.length - a.likes.length);
  //     setCards([...newCards]);
  //     return
  //   }
  //   if (sortId === NEWEST) {
  //     const newCards = cards.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  //     setCards([...newCards]);
  //     return
  //   }
  //   if (sortId === CHEAPEST) {
  //     const newCards = cards.sort((a,b) => a.price - b.price);
  //     setCards([...newCards]);
  //     return
  //   }
  //   if (sortId === EXPENSIVE) {
  //     const newCards = cards.sort((a,b) => b.price - a.price);
  //     setCards([...newCards]);
  //     return
  //   }
  //   if (sortId === SALE) {
  //     const newCards = cards.sort((a,b) => b.discount - a.discount);
  //     setCards([...newCards]);
  //     return
  //   }
  //   if (sortId === RATE) {
  //     const newCards = cards.sort((a,b) => perfumeRating(b.reviews) - perfumeRating(a.reviews));
  //     setCards([...newCards]);
  //     return
  //   }
  // }