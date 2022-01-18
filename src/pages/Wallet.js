import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  /* handleSubmit(event) {
    event.preventDefault();
    const { dispatchSetThunk, expenses } = this.props;
    const { id } = this.state;
    this.setState((state) => ({
      id: state.id + 1,
    }));
    const newExense = { ...this.state, id };
    const currentExpenses = { expenses, newExense };
    dispatchSetThunk(currentExpenses);
  } */

  render() {
    const { editExpenses } = this.props;
    const { status } = editExpenses;
    console.log(editExpenses);
    return (
      <main>
        <Header />
        {/* <ExpenseForm /> */}
        {!status && <ExpenseForm />}
        {status && <ExpenseForm />}
        <ExpenseTable />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  editExpenses: state.wallet.editExpenses,
});

/* export default Wallet; */
export default connect(mapStateToProps)(Wallet);
