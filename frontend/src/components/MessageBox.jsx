import styled from 'styled-components';
const MessageBox = ({ children, variant }) => {
  return (
    <MessageWrapper variant={variant} className="section-center">
      {children}
    </MessageWrapper>
  );
};
const MessageWrapper = styled.div`
  background-color: ${(props) =>
    props.variant === 'success' ? 'green' : 'red'};
  color: #fff;
  min-width: 400px;
  padding: 2rem 3rem;
  border-radius: 5px;
`;
export default MessageBox;
