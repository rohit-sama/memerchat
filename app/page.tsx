
import Chat from "./conponents/chat";
import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";



export default async function Home() {
  const { userId } = auth();

  return (
    <div>
    {userId && <div className="h-screen bg-black ">   
    <div className="flex justify-between fixed top-0 left-0 w-full z-10 items-center bg-transparent backdrop-blur-md border-b-2 border-gray-400 py-1 px-10">
      <h1 className="text-green-400 text-lg "><Image src="/favicon.ico" alt="imglogo" height={50} width={50} /> MemerChat</h1>
       <UserButton  afterSignOutUrl="/"/>
       </div>
      <Chat />
    </div>}
    </div>
  );
}
