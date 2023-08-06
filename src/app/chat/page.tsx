import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Chat() {
  const session = await getServerSession(options);

  console.log({ session });

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/chat');
  }
  return (
    <>
      <p>Logged in as: {JSON.stringify(session, null, 2)}</p>
      <Link href='/api/auth/signout' className='absolute top-5 right-5'>
        Log out
      </Link>
    </>
  );
}
