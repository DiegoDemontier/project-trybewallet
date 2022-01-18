import fetchEndPoint from '../service/API';

export const SET_USERS = 'SET_USERS';

export const SET_EXCHANGE_RATES_SUCCES = 'SET_EXCHANGE_RATES_SUCCES';

export const GET_CURRENCY_SUCCESS = 'GET_CURRENCY_SUCCESS';

export const UPDATE_EXPENSES_SUCCESS = 'UPDATE_EXPENSES_SUCCESS';

export const EDIT_EXPENSES = 'EDIT_EXPENSES';

export const editExpenses = (payload) => (
  {
    type: EDIT_EXPENSES,
    payload,
  }
);

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

export const updateExpensesSuccess = (payload) => ({
  type: UPDATE_EXPENSES_SUCCESS,
  payload,
});

export const getCurrencyThunk = (expense) => async (dispatch) => {
  const response = await fetchEndPoint();
  if (expense !== undefined) {
    const { expenses, newExense } = expense;
    let totalExpenses = expenses;
    const currentExpenses = { ...newExense, exchangeRates: response };
    totalExpenses = [...totalExpenses, currentExpenses];
    dispatch(setExchangeRatesSucces(totalExpenses));
  } else {
    dispatch(getCurrencySuccess(response));
  }
};
