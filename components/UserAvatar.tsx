'use client';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { X } from 'lucide-react';
import { ChangeEventHandler, useRef, useState } from 'react';
import { Input } from './ui/input';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { updateAvatar } from '@/features/user/slice';

const UserAvatar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { following, avatar } = useAppSelector((store) => store.userState);
  const [selectedFile, setSelectedFile] = useState<string | undefined>(avatar);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (file && file.size > 500000) {
      toast.error('Image size is more than 0.5MB');
      return null;
    }

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      toast('Invalid file type.');
      setSelectedFile(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      return toast.error('Select image to upload.');
    }
    setIsLoading(true);

    try {
      const { data } = await axios.patch('/api/user/update-user', {
        imgUrl: selectedFile,
      });
      toast.success('Profile updated.');
      dispatch(updateAvatar(data.avatar));
      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data;
        toast.error(errorMessage);
      } else {
        toast.error('Something went wrong.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger>
        <Button
          asChild
          variant={'ghost'}
          size={'icon'}
          className='flex justify-center items-center relative'
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <div className='cursor-pointer'>
            <Avatar className='w-10 h-10 border border-secondary-foreground'>
              <AvatarImage src={avatar} className='object-cover' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <span className='absolute -top-3 -right-3 bg-primary text-secondary rounded-full h-6 w-6 flex items-center justify-center text-xs'>
              {following.length}
            </span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Customize your profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='grid place-items-center gap-4'>
            <label htmlFor='imgUrl'>Select image file (max 0.5 MB)</label>
            <Input
              ref={fileRef}
              hidden={true}
              type='file'
              id='imgUrl'
              className='hidden'
              accept='image/*'
              onChange={handleFileChange}
            />

            <div className='relative'>
              <Button
                disabled={isLoading}
                onClick={() => fileRef.current?.click()}
                className='relative overflow-hidden h-24 w-24 rounded-full'
                variant={'ghost'}
                type='button'
              >
                <Image
                  fill
                  src={
                    selectedFile ||
                    avatar ||
                    'https://tse2.explicit.bing.net/th?id=OIP.IQqAakFVSW2T6n9Kibpe2AAAAA&pid=Api&P=0&h=180'
                  }
                  alt='image upload'
                  className='object-cover'
                />
              </Button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(undefined);
                }}
                className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
                type='button'
              >
                <X className='h-4 w-4' />
              </button>
            </div>
          </div>

          <DialogFooter className='px-6 py-4'>
            <Button disabled={isLoading} type='submit'>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserAvatar;
