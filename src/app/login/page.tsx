import logo from "../../../public/logo.png";
import Image from "next/image";
import LoginForm from "./LoginForm";
import Providers from "@/lib/reactQuery";

export default function Page() {
  return (
    <div className="min-h-full flex justify-center">
      <div className="flex w-50 justify-center items-center rounder ">
        <div className="sm:w-full rounded-l py-4 flex justify-center flex-col align-middle h-96 bg-lightest flex-1 sm:max-w-2xl">
          <Image
            src={logo}
            className=" bg-cover h-72 object-contain"
            alt="Your Company"
          />
          <p className="text-center bg-brand text-lightest font-medium ">
            Bridge to the future
          </p>
        </div>

        <div className="sm:w-full rounder-r bg-mid h-96 sm:max-w-2xl flex-1">
          <Providers>
            <LoginForm />
          </Providers>
        </div>
      </div>
    </div>
  );
}
