import fetchEndPoint from '../service/API';

export const SET_USERS = 'SET_USERS';

export const SET_EXCHANGE_RATES_SUCCES = 'SET_EXCHANGE_RATES_SUCCES';

export const GET_CURRENCY_SUCCESS = 'GET_CURRENCY_SUCCESS';

export const setUserValue = (payload) => (
  {
    type: SET_USERS,
    payload,
  }
);

export const setExchangeRatesSucces = (payload) => (
  {
    type: SET_EXCHANGE_RATES_SUCCES,
    payload,
  }
);

export const getCurrencySuccess = (payload) => ({
  type: GET_CURRENCY_SUCCESS,
  payload,
});

export const getCurrencyThunk = (expenses) => async (dispatch) => {
  const response = await fetchEndPoint();
  if (expenses !== undefined) {
    const payload = { ...expenses, exchangeRates: response };
    dispatch(setExchangeRatesSucces(payload));
  } else {
    dispatch(getCurrencySuccess(response));
  }
};
