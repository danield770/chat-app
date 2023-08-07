# Chat App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Tech Stack

* [Next.js (App Router)](https://nextjs.org/) - Front end and backend
* [next-auth](https://next-auth.js.org/) - Authentication and authorization
* [planetscale](https://planetscale.com/) mysql database
* [Prisma](https://www.prisma.io/) ORM for db interactions
* [Pusher](https://pusher.com/) for real-time socket-based functionality
* [tailwind](https://tailwindcss.com/) for CSS

## Some Notes

### Running the App

I have deployed the app on Vercel at https://chat-app-iota-eosin.vercel.app
It currently has an issue that real-time functionality is not working.... I think it has someting to do with Next.js differences in rendering strategies between dev and prod

In order to see the app working correctly, please

* clone the repo with: https://github.com/danield770/chat-app.git
* cd chat-app
* npm i
* create .env file in outer directory (next to .gitignore) and add the environment variables that I'll send you via email
* npm run dev
* Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### next-auth authentication and authorization

* Next-auth provides sign-in and sign-out pages out of the box
* I simplified sign-in process by only requiring a name and email.

* For existing users: user name and email must match
* For new users: if a new email is detected - a new user is created

* If the email contains "permit.io" - the user will be registered with an 'admin' role, otherwise their role will be 'user'
* I created an AuthProvider to be used to get the session in the MessageInput client component for the user name to be displayed in the textarea...
  tbh, I could have (probably should have) omited it and passed the session from the server component to the MessageInput via props

### Pusher flow
(0) After login, the user is presented with all of the posts/messages in the Pusher 'chats' channel. (Since in the context of the assignment there is only one channel I have hard-coded the channel name to 'chats')

(1) In the MessagesList client component the is a useEffect hook which subscribes to the 'chats' channel and listens for 'new-msg' events. 

(2) When a user posts a message, a post request to /api/posts is sent, and in the post request 2 things happen:
  (a) the post is saved to the db via prisma.post.create
  (b) The pusher server triggers a 'new-msg' event in the 'chats' channel. 

(3) In the above-mentioned useEffect, when a new-msg is received, it evokes a refresh, so the fresh message that was saved to the db is sent to all the clients.
tbh. this is not exactly what I wanted, I would have preferred to display the new messages in state in addition to the original messages sent from the server render, and not force a server re-render... but I wasn't sure how to implement the secret_word functionality using that method.

## secret word

* The secret word in the app is 'banana' and is defined in the .env file.
* admin users have `session.user.role === 'admin'` so in order to refrain from sending messages which contain the secret word to non-admin users I only fetch the messages without the secret word.

```
await prisma.post.findMany({
          where: {
            NOT: { content: { contains: process.env.SECRET_WORD } },
          },
          ...
});
```

* At no stage is the secret word sent to the client



  



