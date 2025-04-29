import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLatestRates } from '../ReduxState/currency/currOperations';
import { selectBaseCurrency, selectRates, selectIsLoading, selectIsError } from '../ReduxState/selectors';
import Loader from '../components/Loader/Loader';
import RatesList from '../components/RatesList/RatesList';
import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import { Wave } from 'react-animated-text';

const Rates = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(selectBaseCurrency);
  const rates = useSelector(selectRates);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    if (baseCurrency) {
      dispatch(fetchLatestRates(baseCurrency));
    }
  }, [dispatch, baseCurrency]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />

        {isLoading && <Loader />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}

        {rates.length > 0 && <RatesList rates={rates.map(([key, value]) => ({ key, value }))} />}
      </Container>
    </Section>
  );
};

export default Rates;