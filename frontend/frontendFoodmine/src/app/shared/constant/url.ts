const BASE_URL = 'http://localhost:8080';

// food page usls
export const FOOD_URL = BASE_URL + '/api/foods';
export const FOOD_TAG_URL = FOOD_URL + '/tags';
export const FOOD_BY_SEARCH_ID_URL = FOOD_URL + '/search/';
export const FOOD_BY_TAG_ID_URL = FOOD_URL + '/tag/';
export const FOOD_BY_ID_URL = FOOD_URL + '/';

// login urls
export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
// register url
export const USER_REGISTER_URL =  BASE_URL + '/api/users/register';
// order url
export const ORDER_URL =  BASE_URL + '/api/orders';
export const ORDER_CREATE_URL =  ORDER_URL + '/create';
