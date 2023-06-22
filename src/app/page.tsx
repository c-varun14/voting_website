import candidatesData from "../candidatesData.json";
import Providers from "@/lib/reactQuery";
import Carousel from "./Carousel";

export default async function Page() {
  return (
    <div className="rounded shadow-black shadow-lg text-center bg-mid relative mx-auto overflow-y-hidden w-1/2 h-3/5">
      <Providers>
        <Carousel candidatesData={candidatesData} />
      </Providers>
    </div>
  );
}
