import { prisma } from '@/lib/prisma';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import MessageInput from '../components/MessageInput';
import MessagesList from '../components/MessagesList';

export default async function Chat() {
  const session = await getServerSession(options);
  console.log('pusher app id', process.env.PUSHER_APP_ID as string);
  console.log('pusher key', process.env.PUSHER_KEY as string);
  console.log('pusher secret', process.env.PUSHER_SECRET as string);

  console.log({ session });

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/chat');
  }
  const existingMessages: Post[] = await prisma.post.findMany({
    orderBy: [
      {
        createdAt: 'asc',
      },
    ],
  });

  //   console.log({ existingMessages });
  console.log(`number of existing messages: ${existingMessages.length}`);

  return (
    <main className='max-w-[1200px] relative'>
      <div className='h-[100dvh] grid grid-rows-[1fr_auto] border border-solid'>
        <MessagesList {...existingMessages} />
        <MessageInput />
        <Link href='/api/auth/signout' className='absolute top-5 right-5'>
          Log out
        </Link>
      </div>
    </main>
  );
}
