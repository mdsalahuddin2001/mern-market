import styled from 'styled-components';

const Input = ({ label, type, onChange, value }) => {
  let capitalizeLabel = label[0].toUpperCase();
  capitalizeLabel = capitalizeLabel + label.slice(1);
  return (
    <InputWrapper>
      <label htmlFor={label}>{capitalizeLabel}</label>
      <input type={type} value={value} onChange={onChange} />
    </InputWrapper>
  );
};
const InputWrapper = styled.div`
  margin: 2rem 0;
  label {
    display: block;
    font-weight: 400;
    margin-bottom: 0.8rem;
  }
  input {
    width: 100%;
    padding: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-size: 1.6rem;
    &:focus {
      outline: 0;
    }
  }
`;
export default Input;
