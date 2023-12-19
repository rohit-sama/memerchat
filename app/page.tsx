import Chat from "./conponents/chat";
import { SignUp, auth, clerkClient } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Youtube from "./conponents/youtube";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();
  let user;
  if (userId) {
    user = await clerkClient.users.getUser(userId);
    console.log(user);
  }

  return (
    <div>
      {userId && user?.imageUrl ? (
        <div className="h-screen bg-black ">
          <div className="flex justify-between fixed top-0 left-0 w-full z-10 items-center bg-black bg-opacity-97  shadow-md shadow-green-900 py-1 px-10">
            <Link href="/" className="text-green-400 text-md ">
              <Image src="/favicon.ico" alt="imglogo" height={50} width={50} />{" "}
              MemerChat
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="xl:flex justify-between lg:p-20 p-3 items-center h-screen ">
            <div className="h-screen flex flex-col justify-center">
              <h1 className="md:text-8xl  text-7xl pb-2 mb-5 text-gray-500">
                Welcome,
              </h1>
              <h1 className="text-gray-400 text-5xl">
                AI Chat bot Which talks with you in gifs/memes
              </h1>
             
            </div>
            <div className=" justify-center my-20 pb-10">
              <Youtube />
              <Link href="/chat" className="text-white bg-purple-900 p-2 flex justify-center mt-5 rouded-md">Start Chatting</Link >
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-black ">
          <div className="flex justify-between fixed top-0 left-0 w-full z-10 items-center bg-black bg-opacity-97  shadow-md shadow-gray-700  py-1 px-10">
            <h1 className="text-green-400 text-md ">
              <Image src="/favicon.ico" alt="imglogo" height={50} width={50} />{" "}
              MemerChat
            </h1>
          </div>
          <div className="xl:flex justify-between lg:p-20 p-3 items-center h-screen ">
            <div className="flex flex-col justify-center">
              <h1 className="md:text-8xl max-sm:mt-40 text-7xl pb-2 mb-5 text-gray-500">
                Welcome,
              </h1>
              <h1 className="text-gray-400 max-sm:text-3xl text-5xl">
                AI Chat bot Which talks with you in gifs/memes
              </h1>
              <Link href="/sign-up" className="text-white mt-5 bg-purple-900 p-2 flex justify-center w-[20%] rouded-md">Sign up</Link >
            </div>
            <div className=" justify-center bg-black mt-10">
           
              <Youtube />
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
