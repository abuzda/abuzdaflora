import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const signUpSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email').max(255),
  password: z.string().min(6, 'Hasło musi mieć minimum 6 znaków').max(100),
  confirmPassword: z.string(),
  displayName: z.string().min(2, 'Imię musi mieć minimum 2 znaki').max(100).optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Hasła muszą być identyczne',
  path: ['confirmPassword']
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    }
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    const { error } = await signUp(data.email, data.password, data.displayName);
    
    if (error) {
      if (error.message.includes('already registered')) {
        form.setError('root', { message: 'Ten email jest już zarejestrowany' });
      } else if (error.message.includes('Password should be at least')) {
        form.setError('password', { message: 'Hasło jest za słabe' });
      } else {
        form.setError('root', { message: error.message });
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Utwórz konto</h2>
        <p className="text-muted-foreground">Wprowadź dane, aby się zarejestrować</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imię (opcjonalne)</FormLabel>
                <FormControl>
                  <Input placeholder="Jan Kowalski" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potwierdź hasło</FormLabel>
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
            Zarejestruj się
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Masz już konto? </span>
        <Button variant="link" className="p-0 h-auto" onClick={onSwitchToLogin}>
          Zaloguj się
        </Button>
      </div>
    </div>
  );
}