import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrencyThunk } from '../actions/index';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.editExpenses,
    };
    this.renderValue = this.renderValue.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderPayment = this.renderPayment.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.renderCurrency = this.renderCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // FAZ A REQUISIÇÃO DA API PELA FUNÇÃO "dispatchSetThunk" QUE É PUXADA DO STATE GLOBAL VIA FUNCÃO "mapDispatchToProps"
  componentDidMount() {
    const { dispatchSetThunk } = this.props;
    dispatchSetThunk();
  }

  // PREENCHE OS "VALUES" DO STATE DE ACORDO COM CADA "NAME" DENTRO DOS INPUTS
  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  // DISPARA O EVENTO "onSubmit" DO FORM
  handleSubmit(event) {
    event.preventDefault();
    const { dispatchSetThunk, expenses } = this.props;
    const { id } = this.state;
    this.setState((state) => ({
      id: state.id + 1,
    }));
    const newExense = { ...this.state, id };
    const currentExpenses = { expenses, newExense };
    dispatchSetThunk(currentExpenses);
  }

  // RENDERIZA O INPUT DO "valor"
  renderValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor
        <input
          required
          id="value"
          value={ value || '' }
          type="number"
          /* name="value" */
          onChange={ ({ target }) => this.handleChange('value', target.value) }
        />
      </label>
    );
  }

  // RENDERIZA O INPUT DA "Descrição"
  renderDescription() {
    return (
      <label htmlFor="description">
        Descrição
        <input
          id="description"
          type="text"
          /* name="description"
          onChange={ this.handleChange } */
          onChange={ ({ target }) => this.handleChange('description', target.value) }

        />
      </label>
    );
  }

  // RENDERIZA O SELECT QUE CONTÉM AS OPÇÃO DAS "Moeda"
  renderCurrency() {
    const { currencies } = this.props;
    const { currency } = this.state;

    if (Object.keys(currencies).length !== 0) {
      const arrayCurrency = Object.keys(currencies);
      arrayCurrency.splice(arrayCurrency.indexOf('USDT'), 1);

      return (
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            valor={ currency || '' }
            /* name="currency"
            onChange={ this.handleChange } */
            onChange={ ({ target }) => this.handleChange('currency', target.value) }
          >
            {arrayCurrency.map((element, index) => (
              <option key={ index } value={ element }>{ element }</option>
            ))}
          </select>
        </label>
      );
    }
  }

  // RENDERIZA O SELECT QUE CONTÉM AS OPÇÃO DOS "Método de pagamento"
  renderPayment() {
    return (
      <label htmlFor="method">
        Método de pagamento
        <select
          id="method"
          /* name="method"
          onChange={ this.handleChange } */
          onChange={ ({ target }) => this.handleChange('method', target.value) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  // RENDERIZA O SELECT QUE CONTÉM AS OPÇÃO DAS "Tag"
  renderTag() {
    return (
      <label htmlFor="tag">
        Tag
        <select
          id="tag"
          /* name="tag"
          onChange={ this.handleChange } */
          onChange={ ({ target }) => this.handleChange('tag', target.value) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <section>
        <form onSubmit={ this.handleSubmit }>
          { this.renderValue() }
          { this.renderDescription() }
          { this.renderCurrency() }
          { this.renderPayment() }
          { this.renderTag() }
          <button type="submit">Adicionar despesa</button>
        </form>
      </section>
    );
  }
}

ExpenseForm.propTypes = {
  dispatchSetThunk: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetThunk: (value) => dispatch(getCurrencyThunk(value)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  loading: state.wallet.loading,
  editExpenses: state.wallet.editExpenses.edit,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
