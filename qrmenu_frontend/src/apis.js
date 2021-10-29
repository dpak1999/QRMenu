/** @format */

import { toast } from 'react-toastify';

const request = (path, { data = null, token = null, method = 'GET' }) => {
  return fetch(path, {
    method,
    headers: {
      Authorization: token ? `Token ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: method !== 'GET' && method !== 'DELETE' ? JSON.stringify(data) : null,
  })
    .then((response) => {
      if (response.ok) {
        if (method === 'DELETE') {
          return true;
        }
        return response.json();
      }

      return response
        .json()
        .then((json) => {
          if (response.status === 400) {
            const error = Object.keys(json).map((k) => `${json[k].join(' ')}`);
            throw new Error(error.join(' '));
          }

          throw new Error(JSON.stringify(json));
        })
        .catch((e) => {
          if (e.name === 'SyntaxError') {
            throw new Error(response.statusText);
          }
          throw new Error(e);
        });
    })
    .catch((e) => {
      toast(e.message, { type: 'error' });
    });
};

export const login = (username, password) => {
  return request('/auth/token/login', {
    data: { username, password },
    method: 'POST',
  });
};

export const register = (username, password) => {
  return request('/auth/users/', {
    data: { username, password },
    method: 'POST',
  });
};

export const fetchPlaces = (token) => {
  return request('/api/places', { token });
};

export const addPlace = (data, token) => {
  return request('/api/places/', { data, token, method: 'POST' });
};

export const uploadImage = (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'qr_menu');

  return fetch('https://api.cloudinary.com/v1_1/snazzycave/image/upload', {
    method: 'POST',
    body: formData,
  }).then((response) => {
    return response.json();
  });
};

export const fetchPlace = (id, token) => {
  return request(`/api/places/${id}`, { token });
};

export const addCategory = (data, token) => {
  return request('/api/categories/', { data, token, method: 'POST' });
};

export const addMenuItems = (data, token) => {
  return request('/api/menu_items/', { data, token, method: 'POST' });
};

export const updateMenuItem = (id, data, token) => {
  return request(`/api/menu_items/${id}`, { data, token, method: 'PATCH' });
};

export const removePlace = (id, token) => {
  return request(`/api/places/${id}`, { token, method: 'DELETE' });
};

export const removeCategory = (id, token) => {
  return request(`/api/categories/${id}`, { token, method: 'DELETE' });
};

export const removeMenuItem = (id, token) => {
  return request(`/api/menu_items/${id}`, { token, method: 'DELETE' });
};

export const updatePlace = (id, data, token) => {
  return request(`/api/places/${id}`, { data, token, method: 'PATCH' });
};

export const createPaymentIntent = (data, token) => {
  return request('/api/create_payment_intent/', {
    data,
    token,
    method: 'POST',
  });
};
