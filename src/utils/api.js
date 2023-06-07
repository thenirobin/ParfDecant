const onResponse  = (res) => {
    return res.ok ? res.json() : Promise.reject("Error")
} 

class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
  }
  getPerfumesList() {
    return fetch(`${this.baseUrl}/products/`, {
        method: "GET",
        headers: this.headers,
    }).then(onResponse);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers
    }).then(onResponse)
  }
  updateUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
        method: 'PATCH',
        body: JSON.stringify(data)
    }).then(onResponse)
  }
  updateUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
        headers: this.headers,
        method: 'PATCH',
        body: JSON.stringify(data)
    }).then(onResponse)
  }
  searchPerfumes(path) {
    return fetch(`${this.baseUrl}/products/search?query=${path}`, {
        headers: this.headers
    }).then((e)=>onResponse(e))
  }
  addLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      headers: this.headers,
      method: "PUT"
    }).then(onResponse)
  }
  deleteLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      headers: this.headers,
      method: "DELETE"
    }).then(onResponse)
  }
  changePerfumeLike(productId, isLiked) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      headers: this.headers,
      method:  isLiked ? "DELETE" : 'PUT'
    }).then(onResponse)
  }
  getPerfumeById(productId) {
    return fetch(`${this.baseUrl}/products/${productId}`, {
      headers: this.headers,
    }).then(onResponse)
  }
  addPerfumeReview(productId, data) {
    return fetch(`${this.baseUrl}/products/review/${productId}`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data)
    }).then(onResponse)
  }
  deletePerfumeReview(productId, reviewId) {
    return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
      headers: this.headers,
      method: "DELETE"
    }).then(onResponse)
  }
  signIn(data) {
    return fetch(`${this.baseUrl}/signin`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data)
    }).then(onResponse)
  }
  signUp(data) {
    return fetch(`${this.baseUrl}/signup`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data)
    }).then(onResponse)
  }
  resetPassword(data) {
    return fetch(`${this.baseUrl}/forgot-password`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data)
    }).then(onResponse)
  }
  resetPasswordWithToken(data, token) {
    return fetch(`${this.baseUrl}/reset-password/${token}`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify(data)
    }).then(onResponse)
  }
  
}

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        "Content-Type": "application/json",
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NjA5ODhmYmM0NzNmYTg5Y2JlOWQiLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMzMzODgyLCJleHAiOjE3MTM4Njk4ODJ9.4-ZxaBwWQOmpgAW10rwZVXfdiNnv7GwWDFo7VG64_ZI'
    }
}

export const api = new Api(config);

export const getPerfumeList = () => {
  return fetch(`${config.baseUrl}/products`, {
      method: "GET",
      headers: config.headers,
  }).then(onResponse);
}

