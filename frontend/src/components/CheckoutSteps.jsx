import styled from 'styled-components';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <StepWrapper>
      <div className={step1 ? 'active' : ''}>Sign In</div>
      <div className={step2 ? 'active' : ''}>Shipping</div>
      <div className={step3 ? 'active' : ''}>Payment</div>
      <div className={step4 ? 'active' : ''}>Place Order</div>
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  margin-bottom: 4rem;
  div {
    border-bottom: 5px solid gray;
    flex: 1;
    font-size: 2rem;
    padding-bottom: 1rem;
  }
  .active {
    color: orangered;
    border-color: orangered;
  }
`;
export default CheckoutSteps;
