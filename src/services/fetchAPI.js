import axios from 'axios';

export default async function fetchFromApi(endpoint, options = {}) {
  const url = `https://66437f986c6a6565870755ab.mockapi.io/${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const settings = {
    method: options.method || 'get',
    headers: { ...defaultHeaders, ...options.headers },
    ...options,
  };

  if (options.body) settings.data = options.body;

  try {
    const response = await axios(url, settings);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to fetch data from the API, status code: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error;
  }
}
