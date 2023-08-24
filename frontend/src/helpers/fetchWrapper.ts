
async function authorizedFetch(url: string, options?: RequestInit): Promise<{ response: Response, status: number }> {
  // Get the token from cookies
  const token = localStorage.getItem('token')

  if (token) {
    options = {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  }

  const response: any = await fetch(url, options);
  return { response, status: response.status };
}

export default authorizedFetch;
