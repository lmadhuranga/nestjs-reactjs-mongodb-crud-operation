
async function authorizedFetch(url: string, options?: RequestInit): Promise<Response> {
  // Get the token from cookies
  const token = localStorage.getItem('token')
  
  if (token) {
    options = {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return fetch(url, options);
}

export default authorizedFetch;
