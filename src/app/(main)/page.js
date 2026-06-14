import Banner from "../../components/Banner";
import Status from "../../components/status";

export default function Home() {
  return (
    <main>
      <div className=" bg-[url('/images/globe.png')] bg-no-repeat bg-cover  bg-center w-full min-h-screen mx-auto">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start space-y-20 lg:space-y-130 md:space-y-30 
        "
        >
          <Banner />
          <Status />
        </div>
      </div>
    </main>
  );
}
