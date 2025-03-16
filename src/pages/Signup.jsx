
import React from 'react';
import Layout from '@/components/Layout';
import SignupForm from '@/components/SignupForm';

const Signup = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[80vh]">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default Signup;
