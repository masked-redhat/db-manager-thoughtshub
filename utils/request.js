const requestWithoutBody = ["GET", "HEAD", "DELETE"];

export const post = (url, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const requestAuth = (url, method, token, body = {}) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      auth_token: token,
    },
    ...(requestWithoutBody.includes(method)
      ? {}
      : { body: JSON.stringify(body) }),
  });
};

export const uploadAuth = (url, body) => {
  return fetch(url, {
    method: "POST",
    body,
  });
};
