'use client';

import { pusherClient } from '@/lib/pusher';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function MessagesList(existingMessages: Post[]) {
  const router = useRouter();

  React.useEffect(() => {
    pusherClient.subscribe('chats');

    pusherClient.bind('new-msg', (newMsg: Post) => {
      console.log(newMsg.id);
      console.log(newMsg.content);

      router.refresh();
    });
    return () => {
      pusherClient.unsubscribe('chats');
    };
  }, []);
  console.log({ existingMessages });

  return (
    <div className='p-5 overflow-auto'>
      {Object.values(existingMessages)?.map(
        ({ id, content, author, createdAt }) => (
          <p key={id}>
            <span className='font-bold'>{author}</span>:
            <span className='ml-2'>{content}</span>
            <span className='ml-2 text-gray-400 text-xs'>
              ({createdAt.toLocaleString('he-IL')})
            </span>
          </p>
        )
      )}
    </div>
  );
}

export default MessagesList;
