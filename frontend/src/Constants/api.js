export const Fetch = async (url, methods, body) => {
  const Object = {
    method: methods,

    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  if (methods !== 'GET') Object.body = JSON.stringify(body);
  try {
    const api = await fetch(
      'https://myways-views.herokuapp.com/api' + url,
      Object
    );

    if (!api.ok) {
      throw new Error(api.status);
    }
    const response = await api.json();

    return response;
  } catch (error) {
    throw {
      message: 'Something went wrong',
      status: 400,
    };
  }
};
