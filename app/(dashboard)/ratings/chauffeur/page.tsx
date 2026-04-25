import { Client } from "./_components/client";
import { getRatings } from "@/actions/ratings";

export default async function RatingsPage() {
  const ratings = await getRatings("CHR")
  return (
    <div className="bg-white min-h-screen p-4">
      <h2 className="text-2xl">Reviews & Ratings Chauffeur</h2>
      {ratings && <Client data={ratings} />}
    </div>
  );
}
