import React from 'react'
import axios from 'axios';

const TransactionsContext = React.createContext();


export function TransactionsProvider({ children }) {

  const [transactions, setTransactions] = React.useState([]);

  const getApi = () => {
    axios.get('http://localhost:3000/api/transactions')
    .then((response) => {
      const { transactions } = response.data;
      setTransactions(transactions);
    });
  }

  React.useEffect(() => {
    // TO DO - Implemente aqui um get para quando carregar a tela, trazer a listagem de transacoes
    getApi();
  }, []);


  async function createTransaction(transactionInput) {
    // TO DO - Implemente aqui o post para salvar transacao, endpoint POST /transactions
    const { title, type, category, amount, createdAt } = transactionInput;
    axios.post('http://localhost:3000/api/transactions', { title, type, category, amount, createdAt })
    getApi();
  }

/*   setTransactions([...transactions, res.data]) */

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );


}

export function useTransactions() {
  const context = React.useContext(TransactionsContext);

  return context;
}