import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateExpensesSuccess, editExpenses } from '../actions/index';

class ExpenseTable extends Component {
  renderDescription(description) {
    return (
      <td>{description}</td>
    );
  }

  renderTag(tag) {
    return (
      <td>{tag}</td>
    );
  }

  renderMethod(method) {
    return (
      <td>{method}</td>
    );
  }

  renderValue(value) {
    return (
      <td>{value}</td>
    );
  }

  renderCurrency(exchangeRates, currency) {
    return (
      <td>{exchangeRates[currency].name.split('/')[0]}</td>
    );
  }

  renderExchange(exchangeRates, currency) {
    return (
      <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
    );
  }

  renderConvertedValue(exchangeRates, currency, value) {
    return (
      <td>{Number(exchangeRates[currency].ask * value).toFixed(2)}</td>
    );
  }

  renderConversionCurrency(expenses) {
    if (expenses) return <td>Real</td>;
  }

  renderButton(index1) {
    const { expenses, dispatchSetExpenses } = this.props;
    return (
      <th>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => {
            const newExpenses = expenses.filter((__, index2) => index2 === index1);
            dispatchSetExpenses(...newExpenses);
          } }
        >
          Deletar
        </button>
      </th>
    );
  }

  renderr(index1) {
    const { expenses, dispatchSetEditExpenses } = this.props;
    return (
      <th>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => {
            let newExpenses = expenses.filter((__, index2) => index2 === index1);
            newExpenses = { edit: newExpenses[0], index: index1, status: true };
            dispatchSetEditExpenses(newExpenses);
          } }
        >
          editar
        </button>
      </th>
    );
  }

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <thead>
          {expenses.map(({
            description,
            tag,
            method,
            value,
            currency,
            exchangeRates,
          }, index) => (
            <tr key={ index }>
              {this.renderDescription(description)}
              {this.renderTag(tag)}
              {this.renderMethod(method)}
              {this.renderValue(value)}
              {this.renderCurrency(exchangeRates, currency)}
              {this.renderExchange(exchangeRates, currency)}
              {this.renderConvertedValue(exchangeRates, currency, value)}
              {this.renderConversionCurrency(expenses)}
              {this.renderButton(index)}
              {this.renderr(index)}
            </tr>
          ))}
        </thead>
      </table>
    );
  }
}

ExpenseTable.propTypes = {
  dispatchSetExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetExpenses: (value) => dispatch(updateExpensesSuccess(value)),
  dispatchSetEditExpenses: (value) => dispatch(editExpenses(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
