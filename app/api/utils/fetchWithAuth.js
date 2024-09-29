// utils/fetchWithAuth.js

async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    console.error('No refresh token found, redirecting to login');
    window.location.href = '/login';
    return null;
  }

  try {
    const response = await fetch('/api/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('authToken', data.accessToken);
      return data.accessToken;
    } else {
      const errorData = await response.json();
      console.error('Token refresh failed:', errorData.message);
      window.location.href = '/login';
      return null;
    }
  } catch (error) {
    console.error('Error during token refresh:', error);
    window.location.href = '/login';
    return null;
  }
}

export async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem('authToken');

  const fetchWithToken = async (authToken) => {
    return await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${authToken}`,
      },
    });
  };

  let response = await fetchWithToken(token);

  if (response.status === 401) {
    console.warn('Access token expired or unauthorized, attempting to refresh token');
    
    const newToken = await refreshToken();

    if (newToken) {
      response = await fetchWithToken(newToken);
    } else {
      return null;
    }
  }

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error(`Error during fetch: ${response.statusText} - ${errorMessage}`);
    throw new Error(`Fetch failed with status ${response.status}`);
  }

  return response;
}
