'use client';
import { IAllUserResponse } from '@/lib/getAllUsers';
import { useAppDispatch } from '@/lib/hooks';
import { IUserResponse } from '@/model/userModel';
import { setProfile } from '@/features/user/slice';
import { useEffect } from 'react';
import SingleCardUser from './SingleCardUser';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ComponentType {
  profile: IUserResponse;
  allUsers: IAllUserResponse | null;
}
const Component = ({ profile, allUsers }: ComponentType) => {
  const router = useRouter();

  const handlePageClick = (page: number) => {
    const query = { page };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setProfile({
        userName: profile.userName,
        email: profile.email,
        following: profile.following,
        avatar: profile.avatar,
      })
    );
  }, [dispatch]);

  if (!allUsers) {
    return <h1>No User found!</h1>;
  }

  const { data: users, metaData } = allUsers;
  const { page: currentPage, totalNumberOfPages, usersPerPage } = metaData;

  return (
    <div>
      <div className='align-element px-4 py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-4'>
        {users?.map((user) => {
          return <SingleCardUser key={user._id} user={user} />;
        })}
      </div>

      <div className='align-element py-8'>
        <div className='flex gap-2 justify-center flex-wrap'>
          {/* PREV BUTTON */}
          <Button
            variant={'outline'}
            onClick={() => {
              if (currentPage === 1) {
                handlePageClick(totalNumberOfPages);
              } else {
                handlePageClick(currentPage - 1);
              }
            }}
          >
            <ChevronLeft />
          </Button>

          {Array.from(
            { length: totalNumberOfPages },
            (_, index) => index + 1
          ).map((page) => {
            return (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                variant={page === currentPage ? 'default' : 'outline'}
              >
                {page}
              </Button>
            );
          })}

          {/* NEXT BUTTON */}
          <Button
            variant={'outline'}
            onClick={() => {
              if (currentPage === totalNumberOfPages) {
                handlePageClick(1);
              } else {
                handlePageClick(currentPage + 1);
              }
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Component;
