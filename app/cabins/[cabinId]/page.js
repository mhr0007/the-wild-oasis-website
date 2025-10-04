import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import { Suspense } from "react";

// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({ params }) {
  const resolvedParams = await params; // 👈 await here
  const { name } = await getCabin(resolvedParams.cabinId);
  return {
    title: `Cabin ${name}`,
  };
}

//way to tell nextjs which pages should be pre-rendered
//in this case we are telling it to pre-render every single page
//as we have limited number of cabins this is a lot better
//for performance
export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
}

export default async function Page({ params }) {
  const resolvedParams = await params; // 👈 await here
  const cabin = await getCabin(resolvedParams.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl mb-10 text-accent-400 font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
