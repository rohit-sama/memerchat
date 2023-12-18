import Chat from "./conponents/chat";
import { auth, clerkClient } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";



export default async function Home() {
  const { userId } = auth();
  let user;
  if(userId) {
    user = await clerkClient.users.getUser(userId);
    console.log(user)
  }



  return (
    <div>
    {userId && user?.imageUrl && <div className="h-screen bg-black ">   
    <div className="flex justify-between fixed top-0 left-0 w-full z-10 items-center bg-black bg-opacity-97 border-b-2 border-gray-400 py-1 px-10">
      <h1 className="text-green-400 text-md "><Image src="/favicon.ico" alt="imglogo" height={50} width={50} /> MemerChat</h1>
       <UserButton  afterSignOutUrl="/"/>
       </div>
      <Chat user = {user?.imageUrl} />
    </div>}
    </div>
  );
}
