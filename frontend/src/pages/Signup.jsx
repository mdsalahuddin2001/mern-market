import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Input from '../components/Input';
import { useUserContext } from '../contexts/userContext';
const Signup = () => {
  const { userInfo, signup } = useUserContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  // Submit handler for signup
  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return toast.error('Please provide all the informations');
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords don't matched");
    }
    signup({ name, email, password });
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect ? `/${redirect}` : '/');
    }
  }, [userInfo, navigate, redirect]);
  return (
    <section className="section section-center">
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <h2>Sign Up</h2>
      <FormContainer onSubmit={submitHandler}>
        <Input
          label="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="btn" type="submit" style={{ marginBottom: '2rem' }}>
          Sign Up
        </button>
      </FormContainer>
      <p>
        Already have an account? <Link to="/login">Sign in instead</Link>{' '}
      </p>
    </section>
  );
};

export default Signup;
