import { getServerSession } from 'next-auth/next';
import { options } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(options);

  console.log({ session });

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/chat');
  } else {
    redirect('/chat');
  }

  return <main style={{ maxWidth: 1200 }}></main>;
}
