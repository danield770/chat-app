import React from 'react';

function MessagesList(existingMessages: Post[]) {
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
