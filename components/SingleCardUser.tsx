'use client';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '@/lib/getAllUsers';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addFollower } from '@/features/user/slice';

const SingleCardUser = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();
  const { following } = useAppSelector((store) => store.userState);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    setIsFollow(following.includes(user._id));
  }, [following, user._id]);

  const handleFollow = async () => {
    if (isFollow) return;
    setIsFollow(true);
    try {
      await axios.patch(`/api/user/follow/${user._id}`);
      dispatch(addFollower(user._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className='pt-4' key={String(user._id)}>
      <CardContent className='flex gap-6 items-center '>
        <Avatar className='w-20 h-20 border bg-muted border-secondary'>
          <AvatarImage
            src={
              user.avatar ||
              'https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png'
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className='md:flex items-center w-full md:justify-between space-y-2'>
          <div>
            <p className='text-zinc-500 font-semibold capitalize tracking-wider text-xl'>
              {user.userName}
            </p>
            <p className='md:hidden text-muted-foreground'>{user.email}</p>
          </div>

          <Button
            disabled={isFollow}
            onClick={handleFollow}
            variant={isFollow ? 'outline' : 'default'}
          >
            {isFollow ? 'following' : 'follow'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleCardUser;
