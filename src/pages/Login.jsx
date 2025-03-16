
import React from 'react';
import Layout from '@/components/Layout';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[80vh]">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
