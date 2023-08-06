import { prisma } from '@/lib/prisma';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import MessageInput from '../components/MessageInput';
import MessagesList from '../components/MessagesList';

export default async function Chat() {
  const session = await getServerSession(options);

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
  //   console.log({ filteredMessages });
  console.log(`number of existing messages: ${existingMessages.length}`);
  //   console.log(`number of filtered messages: ${filteredMessages.length}`);
  //   const messagesWithUserNames = await getMessagesWithUserNames(
  //     existingMessages
  //   );
  //   console.log({ messagesWithUserNames });

  // fetch a list of users from the database, via an API call.
  return (
    <main className='max-w-[1200px] relative'>
      <div
        className='h-[100dvh] grid grid-rows-[1fr_auto] border border-solid'
        // style={{
        //   height: '100dvh',
        //   display: 'grid',
        //   gridTemplateRows: '1fr auto',
        //   border: '1px solid',
        // }}
      >
        <MessagesList {...existingMessages} />
        <MessageInput />
        <Link href='/api/auth/signout' className='absolute top-5 right-5'>
          Log out
        </Link>
      </div>
    </main>
  );
}
