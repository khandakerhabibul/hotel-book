# Project Setup

Here are the steps you need to follow to run the project -

1. Clone the repository.
2. Run `npm install` to install node modules.
3. Now create a file and name it `.env.local` and
4. Go to `.env-local-example` file and copy only `NEXT_PUBLIC_Url`, `NEXT_PUBLIC_X_RapidAPI_Host` and `NEXT_PUBLIC_X_RapidAPI_Key` these key value and paste it into `.env.local` file. These are the environment variable for Rapid API server.
5. Now run the command `npm run dev` to see the project live on your machine. It should run on your `localhost:3000` url.

**Note:** In `.env-local-example` file you will find another extra `NEXT_PUBLIC_X_RapidAPI_Key_2` this key. As I am using Rapid API free tier, they are not allowing more than 50 request from one account. So I have created another extra Rapid API free tier account. If you face **Rate Limit Error** from API then you need to replace the **value** from this `NEXT_PUBLIC_X_RapidAPI_Key_2`. Do not copy the ending `_2` from the key.
