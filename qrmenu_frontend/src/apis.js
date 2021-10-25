/** @format */

import { toast } from 'react-toastify';

export const login = (username, password) => {
  return fetch('/auth/token/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      console.log(response);

      if (response.ok) {
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
