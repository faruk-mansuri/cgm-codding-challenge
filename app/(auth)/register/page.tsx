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

const registerSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'Minimum 3 characters are required.' }),
  lastName: z
    .string()
    .min(3, { message: 'Minimum 3 characters are required.' }),
  email: z.string().email({ message: 'Email is required.' }),
  password: z
    .string()
    .min(8, { message: 'Minimum 8 characters are required.' }),
  phoneNumber: z.string().regex(/^[6-9]\d{9}$/, {
    message: 'Invalid phone number.',
  }),
  userName: z
    .string()
    .min(3, { message: 'Minimum 3 characters are required.' }),
});

const RegisterPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      userName: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await axios.post('/api/auth/register', values);
      toast.success('Register successfully.');
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
      <div className='w-full mx-auto max-w-[450px]'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='dark:bg-zinc-600/30 bg-white rounded-lg border w-full py-10 px-8 md:px-6 focus-within:shadow-md space-y-4 shadow-md'
          >
            <h1 className='text-3xl font-bold text-center'>Register</h1>
            <div className='space-y-2'>
              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          className='focus-visible:ring-0'
                          type='text'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          className='focus-visible:ring-0'
                          type='text'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name='userName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          className='focus-visible:ring-0'
                          type='text'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          className='focus-visible:ring-0'
                          type='text'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className='focus-visible:ring-0'
                        type='email'
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
                        className='focus-visible:ring-0'
                        type='password'
                        {...field}
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
              Register
            </Button>
          </form>
        </Form>

        {!isLoading && (
          <div className='flex justify-center items-center mt-3'>
            <p>Already have an account ?</p>
            <Button variant={'link'} asChild>
              <Link href='/login'>Login</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
