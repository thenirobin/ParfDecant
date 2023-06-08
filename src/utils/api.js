const onResponse  = (res) => {
    return res.ok ? res.json() : Promise.reject("Error")
} 

class Api {
  constructor(data, freshHeaders) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
    this.freshHeaders = freshHeaders;
  }
  getPerfumesList() {
    return fetch(`${this.baseUrl}/products/`, {
        method: "GET",
        ...this.freshHeaders(),
    }).then(onResponse);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      ...this.freshHeaders()
    }).then(onResponse)
  }
  updateUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      ...this.freshHeaders(),
        method: 'PATCH',
        body: JSON.stringify(data)
    }).then(onResponse)
  }
  updateUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      ...this.freshHeaders(),
        method: 'PATCH',
        body: JSON.stringify(data)
    }).then(onResponse)
  }
  searchPerfumes(path) {
    return fetch(`${this.baseUrl}/products/search?query=${path}`, {
      ...this.freshHeaders()
    }).then((e)=>onResponse(e))
  }
  addLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      ...this.freshHeaders(),
      method: "PUT"
    }).then(onResponse)
  }
  deleteLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      ...this.freshHeaders(),
      method: "DELETE"
    }).then(onResponse)
  }
  changePerfumeLike(productId, isLiked) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      ...this.freshHeaders(),
      method:  isLiked ? "DELETE" : 'PUT'
    }).then(onResponse)
  }
  getPerfumeById(productId) {
    return fetch(`${this.baseUrl}/products/${productId}`, {
      ...this.freshHeaders(),
    }).then(onResponse)
  }
  addPerfumeReview(productId, data) {
    return fetch(`${this.baseUrl}/products/review/${productId}`, {
      ...this.freshHeaders(),
      method: "POST",
      body: JSON.stringify(data)
    }).then(onResponse)
  }
  deletePerfumeReview(productId, reviewId) {
    return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
      ...this.freshHeaders(),
      method: "DELETE"
    }).then(onResponse)
  }
  signIn(data) {
    return fetch(`${this.baseUrl}/signin`, {
      ...this.freshHeaders(),
      method: "POST",
      body: JSON.stringify(data)
    }).then(onResponse)
  }
  signUp(data) {
    return fetch(`${this.baseUrl}/signup`, {
      ...this.freshHeaders(),
      method: "POST",
      body: JSON.stringify(data)
    }).then(onResponse)
  }
  resetPassword(data) {
    return fetch(`${this.baseUrl}/forgot-password`, {
      ...this.freshHeaders(),
      method: "POST",
      body: JSON.stringify(data)
    }).then(onResponse)
  }
  resetPasswordWithToken(data, token) {
    return fetch(`${this.baseUrl}/reset-password/${token}`, {
      ...this.freshHeaders(),
      method: "PATCH",
      body: JSON.stringify(data)
    }).then(onResponse)
  }
}

const freshHeaders = () => {
  return { 
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem('token')
    },
  }; 
};

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        "Content-Type": "application/json",
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NjA5ODhmYmM0NzNmYTg5Y2JlOWQiLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMzMzODgyLCJleHAiOjE3MTM4Njk4ODJ9.4-ZxaBwWQOmpgAW10rwZVXfdiNnv7GwWDFo7VG64_ZI'
    },
    freshHeaders
}

export const api = new Api(config,freshHeaders);

export const getPerfumeList = () => {
  return fetch(`${config.baseUrl}/products`, {
      method: "GET",
      headers: config.headers,
  }).then(onResponse);
}

