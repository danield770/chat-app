'use client';

import axios from 'axios';
import React from 'react';
import { useSession } from 'next-auth/react';

function MessageInput() {
  const { data: session } = useSession();
  const author = session?.user.name;

  const sendMessage = async (msg: string) => {
    await axios.post('/api/posts', {
      content: msg,
      author,
    });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    console.log(target.message.value);
    const message = target.message.value;
    message && sendMessage(message);
    target.message.value = '';
  }

  return (
    <form
      className='p-5 flex items-center border-t border-solid'
      onSubmit={handleSubmit}
      action=''
      //   style={{
      //     padding: '20px',
      //     display: 'flex',
      //     alignItems: 'center',
      //     borderTop: '1px solid',
      //   }}
    >
      <textarea
        // type='text'
        id='postInput'
        name='message'
        placeholder={`What's on your mind, ${author}?`}
        className='border border-solid w-full p-2 min-h-[40px]'
        // style={{
        //   border: '1px solid',
        //   minHeight: '40px',
        //   //   lineHeight: '40px',
        //   padding: '8px',
        //   width: '100%',
        // }}
      />
      <button
        className='ml-1 border border-solid h-10 px-1'
        // style={{
        //   marginLeft: 5,
        //   border: '1px solid',
        //   height: '40px',
        //   padding: '0 5px',
        // }}
      >
        Post
      </button>
    </form>
  );
}

export default MessageInput;
