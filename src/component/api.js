const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = 'TWYj__W1WGNgXwOZa6ptRxgZK4E0lOHlNE94P7K3WC8';

export const searchImages = async (query) => {
  const response = await fetch(`${API_URL}?query=${query}&client_id=${API_KEY}`);
  const data = await response.json();
  return data.results;
};
