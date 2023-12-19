import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return(
    <div className="flex justify-center h-screen items-center bg-[url('/1281259.jpg')] bg-auto">
         <SignUp />;
    </div>
  )
   
}