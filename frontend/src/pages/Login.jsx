import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FormContainer from '../components/FormContainer';
import Input from '../components/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <LoginWrapper className="section section-center">
      <h2>Sign In</h2>
      <FormContainer>
        <Input
          label="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-group">
          <button className="btn">Sign In</button>
        </div>
        <p>
          Don't have account? <Link to="signup">Create your account</Link>
        </p>
      </FormContainer>
    </LoginWrapper>
  );
};
const LoginWrapper = styled.section`
  .btn {
    margin-bottom: 2rem;
  }
`;
export default Login;
