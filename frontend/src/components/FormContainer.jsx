import styled from 'styled-components';

const FormContainer = ({ children, onSubmit }) => {
  return (
    <FormContainerWrapper onSubmit={onSubmit}>{children}</FormContainerWrapper>
  );
};

const FormContainerWrapper = styled.form`
  width: 100%;
  max-width: 600px;
`;

export default FormContainer;
