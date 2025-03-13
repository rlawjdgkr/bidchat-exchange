
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from '@/components/Layout';
import { useToast } from "@/hooks/use-toast";

interface User {
  userId: string;
  nickname: string;
  password: string;
  email: string;
}

const Signup = () => {
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: User = {
      userId,
      nickname,
      password,
      email
    };

    // 기존 사용자 목록 가져오기
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // 아이디 중복 체크
    if (existingUsers.some((user: User) => user.userId === userId)) {
      toast({
        title: "회원가입 실패",
        description: "이미 존재하는 아이디입니다.",
        variant: "destructive"
      });
      return;
    }

    // 새 사용자 추가
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
    
    toast({
      title: "회원가입 성공",
      description: "로그인 페이지로 이동합니다.",
    });

    navigate('/login');
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[80vh]">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl text-center">회원가입</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">아이디</Label>
                <Input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nickname">닉네임</Label>
                <Input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">회원가입</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;
