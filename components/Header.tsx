'use client';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import UserAvatar from './UserAvatar';
import { useAppSelector } from '@/lib/hooks';
import LogoutBtn from './LogoutBtn';

const Header = () => {
  const user = useAppSelector((store) => store.userState);

  return (
    <header className='bg-muted'>
      <nav className='align-element flex justify-center items-center py-4 '>
        <div className=' w-full flex items-center justify-between'>
          <h4 className='font-bold uppercase tracking-widest text-2xl'>
            {user.userName}
          </h4>
          <div className='flex gap-3'>
            <ModeToggle />
            <UserAvatar />
            <LogoutBtn />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
