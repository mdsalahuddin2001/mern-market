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
    props.variant === 'success' ? 'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.3)'};
  color: ${(props) =>
    props.variant === 'success' ? 'rba(0,255,0,.5)' : 'rgba(255,0,0,.5)'};
  width: 100%;
  max-width: 800px;
  padding: 2rem 3rem;
  border-radius: 5px;
  margin: 30px 0;
`;
export default MessageBox;
