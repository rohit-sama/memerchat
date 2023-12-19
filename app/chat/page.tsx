import Chat from "@/app/conponents/chat";
import { auth, clerkClient } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function ChatMain() {
  const { userId } = auth();
  let user;
  if (userId) {
    user = await clerkClient.users.getUser(userId);
    console.log(user);
  }

  return (
    <div>
      {userId && user?.imageUrl && (
        <div className="h-screen bg-black ">
          <div className="flex justify-between fixed top-0 left-0 w-full z-10 items-center bg-[#0a090a] bg-opacity-97  shadow-md shadow-green-900 py-1 px-10">
            <Link href ="/" className="text-green-400 text-md ">
              <Image src="/favicon.ico" alt="imglogo" height={50} width={50} />{" "}
              MemerChat
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
          <Chat user={user?.imageUrl} />
        </div>
      )}
    </div>
  );
}
