## Ecomportal Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Instructions to run the app
1. Make sure that you have npm/yarn installed locally.
2. Run ```yarn``` or ```npm install``` to install all the packages.
3. Run ```yarn db:init``` to create the sqlite database file.
4. Create .env on the root (as a sibling to src/) and paste the contents from .env.example file.
5. Run the app using ```yarn dev```.
6. Use the below curl request to create a new user.
```bash
curl --location 'http://localhost:3000/api/register' \
--header 'Content-Type: application/json' \
--data '{
    "username": "your username",
    "password": "password"
}'
```
7. Make sure that user has been created on the users.db file on the application root.
8. The http://localhost:3000/form is a protected page, so visiting that page will redirect you to the sign-in page where you can try logging in.

## Thoughts on current implementation
1. When an input in the form is updated, I don't want any unrelated inputs to be rendered, so tried react-hook-form which handles the inputs as uncontrolled-components.
2. Used zod to validate the form fields as the schema can be re-used to validate the data both on the front-end and on the back-end.
3. Authentication required a back-end, so to simplify the implementation and to keep the code for this assignment in one place, I've chosen to use Route handlers to handle all the api requests.
4. The authentication type used here is JWT where the tokens will be stored in cookies and passed over along with the back-end requests. I haven't spent a lot of time in thinking about covering all the edge case and of different approaches as the time is limited.
5. To pass the user authentication status, we use React providers. If there were compelling reasons to have global state and if I had more time, I'd have tried Jotai or Zustand.




