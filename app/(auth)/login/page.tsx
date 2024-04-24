'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const LoginPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await axios.post('/api/auth/login', values);
      toast.success('User logged in successfully');
      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data;
        toast.error(errorMessage);
      } else {
        toast.error('Something went wrong.');
      }
    }
  };

  return (
    <div className='dark:bg-zinc-900 bg-muted p-8 grid place-items-center h-svh'>
      <div className='w-full mx-auto  max-w-[450px]'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='dark:bg-zinc-600/30 bg-white rounded-lg border py-10 px-8 md:px-6 focus-within:shadow-md space-y-4 shadow-md'
          >
            <h1 className='text-3xl font-bold text-center'>Login</h1>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        className='focus-visible:ring-0'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        {...field}
                        className=' focus-visible:ring-0'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={isLoading}
              type='submit'
              className='w-full uppercase'
            >
              Login
            </Button>
          </form>
        </Form>

        {!isLoading && (
          <div className='flex justify-center items-center mt-3'>
            <p>Don&#39;t have an account ?</p>
            <Button variant={'link'} asChild>
              <Link href='/register'>Register</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
