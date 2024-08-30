import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import http from '@/api';
import { useAuth } from '@/provider/authProvider';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

type LoginFields = yup.InferType<typeof schema>;

export default function Login() {
  const { setToken } = useAuth();
  const { toast } = useToast()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFields>({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = async (data: LoginFields) => {
    
    try {
      const response = await http.post('/v1/login', data);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem vindo de volta!",
        variant: "success"
      });
      navigate('/dashboard');
    } catch (error) {
        const errorMessage = error?.response?.data.message;
        toast({
          title: "Login falhou",
          description: errorMessage,
          action: <ToastAction altText="Tente novamente">Try again</ToastAction>,
          variant: "destructive"
        });
      }
    }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <p className="text-center text-sm text-gray-600">Bem vindo de volta! Por favor, realize o login com sua conta.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
                className="border-gray-300 rounded-md"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="p-0 font-normal" onClick={() => navigate('/forgot-password')}>
                  Esqueceu a senha?
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  {...register('password')}
                  className="border-gray-300 rounded-md pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600">
            Você ainda não possui uma conta ?{' '}
            <Button variant="link" className="p-0 font-normal" onClick={() => navigate('/register')}>
            Cadastre-se
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
