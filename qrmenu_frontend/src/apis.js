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
