export async function getCategories() {
  const urlCategories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(urlCategories);
  const result = await response.json();
  return result;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlCategoryAndQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  const response = await fetch(urlCategoryAndQuery);
  const result = await response.json();
  return result;
}

export async function getItemsFromQuery(query) {
  const queryURL = ` https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(queryURL);
  const result = await response.json();
  return result;
}

export async function getItemsFromCategory(categoryId) {
  const categoryIdURL = ` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(categoryIdURL);
  const result = await response.json();
  return result;
}

export async function getProductsDetails(productId) {
  const detailsIdURL = ` https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(detailsIdURL);
  const result = await response.json();
  return result;
}
