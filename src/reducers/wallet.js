import {
  SET_EXCHANGE_RATES_SUCCES,
  GET_CURRENCY_SUCCESS,
  UPDATE_EXPENSES_SUCCESS,
  EDIT_EXPENSES,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  editExpenses: {
    edit: {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
    index: 0,
    status: false,
  },
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EXCHANGE_RATES_SUCCES:
    return { ...state,
      expenses: action.payload,
    };
  case UPDATE_EXPENSES_SUCCESS:
    return { ...state,
      expenses: state.expenses.filter((e) => e.id !== action.payload.id),
    };
  case EDIT_EXPENSES:
    return { ...state,
      editExpenses: action.payload,
    };
  case GET_CURRENCY_SUCCESS:
    return { ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
