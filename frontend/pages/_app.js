import '../styles/globals.css';
import { ExpenseProvider } from '../context/ExpenseContext';

function MyApp({ Component, pageProps }) {
  return (
    <ExpenseProvider>
      <Component {...pageProps} />
    </ExpenseProvider>
  );
}

export default MyApp;