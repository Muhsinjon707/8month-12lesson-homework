import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";

const Header = async () => {
  const session = await auth();

  return (
    <header className="mx-auto bg-white text-black py-3 px-16 shadow-lg">
      <nav className="flex w-full justify-between items-center">
        <Link href="/" title="My website" className="flex items-center gap-2">
          <Image
            className=" w-auto h-auto"
            src="/unsplash-logo.jpg"
            alt="Unsplash Logo"
            width={40}
            height={30}
          />
          <span className="font-extrabold text-3xl">Muhsinjon.</span>
        </Link>
        <div className="">
          <input type="text" name="" id="" />
        </div>
        <ul className="flex items-center space-x-8 font-extralight">
          <li>
            <Link href="">Photos</Link>
          </li>
          <li>
            <Link href="">Collections</Link>
          </li>
          <li className="flex items-center gap-4">
            {session && session?.user ? (
              <>
                <form
                  action={async () => {
                    "use server";

                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button className="cursor-pointer" type="submit">Logout</button>
                </form>

                <Link className="avatar" href={`/`}>
                  <span className="bg-slate-800 text-white py-2 px-3 rounded-md">
                    {session?.user?.name}
                  </span>
                  <div className="inner-avatar">
                    <div className="flex justify-between items-center">
                      <Image
                        className="rounded-full"
                        src={session?.user?.image}
                        alt="GitHub Avatar"
                        width={30}
                        height={30}
                      />
                      <span className="underline">{session?.user?.name}</span>
                    </div>
                    <h3>{session?.user?.email}</h3>
                  </div>
                </Link>
              </>
            ) : (
              <form
                action={async () => {
                  "use server";

                  await signIn("github");
                }}
              >
                <button className="cursor-pointer" type="submit">Login</button>
              </form>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
