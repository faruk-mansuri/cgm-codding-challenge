'use client';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LogoutBtn = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      toast.success('Logout successfully.');
      router.push('/login');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong.';
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <Button onClick={handleLogout} variant={'ghost'} size={'icon'}>
        <LogOut />
      </Button>
    </div>
  );
};

export default LogoutBtn;
