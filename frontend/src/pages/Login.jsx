import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import FormContainer from '../components/FormContainer';
import Input from '../components/Input';
import { useUserContext } from '../contexts/userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, userInfo } = useUserContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  // Submit Handler for Login
  const submitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('Please provide email and password');
    }
    login({ email, password });
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect ? `/${redirect}` : '/');
    }
  }, [userInfo, navigate, redirect]);

  return (
    <LoginWrapper className="section section-center">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h2>Sign In</h2>
      <FormContainer onSubmit={submitHandler}>
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
          Don't have account?{' '}
          <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
            Create your account
          </Link>
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
