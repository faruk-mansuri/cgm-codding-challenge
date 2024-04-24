import Component from '@/components/Component';
import { currentProfile } from '@/lib/currentProfile';
import { IAllUserResponse, getAllUsers } from '@/lib/getAllUsers';
import { getDataFromToken } from '@/lib/getDataFromToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const DashboardPage = async ({ searchParams }: Props) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  const profileId = await getDataFromToken(token);
  const profile = await currentProfile(profileId);

  if (!profile) {
    cookieStore.delete('token');
    return redirect('/login');
  }

  const users = await getAllUsers({
    userId: profile._id,
    page: Number(searchParams.page),
  });

  return (
    <div>
      <Component profile={profile} allUsers={users} />
    </div>
  );
};

export default DashboardPage;
