import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { useAuth } from '@/contexts/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🌿 AbuzdaFlora</h1>
          <p className="text-muted-foreground">Twój inteligentny asystent pielęgnacji roślin</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {isLogin ? (
              <LoginForm onSwitchToSignUp={() => setIsLogin(false)} />
            ) : (
              <SignUpForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}