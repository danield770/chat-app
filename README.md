# Chat App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

* [Next.js (App Router)](https://nextjs.org/) - Front end and backend
* [next-auth](https://next-auth.js.org/) - Authentication and authorization
* [planetscale](https://planetscale.com/) mysql database
* [Prisma](https://www.prisma.io/) ORM for db interactions
* [Pusher](https://pusher.com/) for real-time socket-based functionality
* [tailwind](https://tailwindcss.com/) for CSS

## Some Notes

* Next-auth provides sign-in and sign-out pages out of the box
* I simplified sign-in process by only requiring a name and email.

For existing users: user name and email must match
For new users: if a new email is detected - a new user is created

If the email contains "permit.io" - the user will be registered with an 'admin' role, otherwise their role will be 'user'



