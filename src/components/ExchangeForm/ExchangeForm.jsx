import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchExchange } from '../../ReduxState/currency/currOperations';

const ExchangeForm = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = query.match(/^(\d+(?:\.\d+)?)\s+([A-Z]{3})\s+in\s+([A-Z]{3})$/i);

    if (!match) {
      alert('Please enter in format: "15 USD in UAH"');
      return;
    }

    const [, amount, from, to] = match;
    dispatch(fetchExchange({ amount, from: from.toUpperCase(), to: to.toUpperCase() }));
    setQuery('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>
      <input
        title="Request format 15 USD in UAH"
        className={styles.input}
        value={query}
        onChange={handleChange}
      />
    </form>
  );
};

export default ExchangeForm;
