import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';
import ExchangeInfo from '../components/ExchangeInfo/ExchangeInfo';
import Loader from '../components/Loader/Loader'
import { useSelector } from 'react-redux';
const Home = () => {
  const { exchangeInfo, isError, isLoading } = useSelector(state => state.currency);

  return (
    <Section>
      <Container>
        <Heading info title="What currencies do you want to exchange?🙂" />

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}

        <ExchangeForm />

        {isLoading && <Loader />}
        {exchangeInfo?.result && !isLoading && <ExchangeInfo {...exchangeInfo} />}
      </Container>
    </Section>
  );
};

export default Home;
