'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button, Input, Spinner } from '@nextui-org/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = (email: string, password: string) => {
    const newErrors: typeof errors = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Geçersiz email formatı';
    }
    if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalı';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const validationErrors = validateForm(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Giriş başarılı! Yönlendiriliyorsunuz...');
      router.push('/app/dashboard');
    } catch (error: any) {
      toast.error(hataMesaji(error.code));
    } finally {
      setLoading(false);
    }
  };

  const hataMesaji = (code: string) => {
    switch (code) {
      case 'auth/invalid-credential':
        return 'Geçersiz kimlik bilgileri';
      case 'auth/too-many-requests':
        return 'Çok fazla deneme yaptınız. Lütfen daha sonra tekrar deneyin';
      default:
        return 'Giriş sırasında bir hata oluştu';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Hoş Geldiniz</h1>
          <p className="mt-2 text-gray-600">Lütfen hesabınıza giriş yapın</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              name="email"
              type="email"
              label="Email"
              variant="bordered"
              isInvalid={!!errors.email}
              errorMessage={errors.email}
            />
            
            <Input
              name="password"
              type="password"
              label="Şifre"
              variant="bordered"
              isInvalid={!!errors.password}
              errorMessage={errors.password}
            />
          </div>

          <Button 
            type="submit" 
            color="primary" 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" color="white" />
                Giriş Yapılıyor...
              </div>
            ) : (
              'Giriş Yap'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}