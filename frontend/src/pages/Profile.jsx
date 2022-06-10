import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';
import FormContainer from '../components/FormContainer';
import Input from '../components/Input';
import { toast } from 'react-toastify';
import MessageBox from '../components/MessageBox';
const Profile = () => {
  const { userInfo, updateProfile, loading, error } = useUserContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return toast.error('Please provide all the informations');
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords don't matched");
    }
    updateProfile({ name, email, password });
  };
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
  }, [userInfo, navigate]);
  if (loading) {
    return <div className="loading"></div>;
  }
  if (error) {
    return (
      <section className="section section-center">
        <MessageBox>{error}</MessageBox>
      </section>
    );
  }
  return (
    <section className="section section-center">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h2>User Profile</h2>
      <FormContainer onSubmit={submitHandler}>
        <Input
          label="name"
          type="name"
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
        <div className="form-group">
          <button type="submit" className="btn">
            Update
          </button>
        </div>
      </FormContainer>
    </section>
  );
};

export default Profile;
