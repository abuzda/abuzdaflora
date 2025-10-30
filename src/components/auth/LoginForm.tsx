import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email').max(255),
  password: z.string().min(6, 'Hasło musi mieć minimum 6 znaków').max(100)
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({ onSwitchToSignUp }: { onSwitchToSignUp: () => void }) {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const { error } = await signIn(data.email, data.password);
    
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        form.setError('root', { message: 'Nieprawidłowy email lub hasło' });
      } else if (error.message.includes('Email not confirmed')) {
        form.setError('root', { message: 'Potwierdź swój adres email' });
      } else {
        form.setError('root', { message: error.message });
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Zaloguj się</h2>
        <p className="text-muted-foreground">Wpisz swoje dane, aby się zalogować</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="twoj@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hasło</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Zaloguj się
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Nie masz konta? </span>
        <Button variant="link" className="p-0 h-auto" onClick={onSwitchToSignUp}>
          Zarejestruj się
        </Button>
      </div>
    </div>
  );
}