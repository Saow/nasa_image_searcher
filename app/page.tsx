import ImageGet from "../components/api/data";
export default function LandingPage() {
  return (
    <div className="p-3">
      <div className="flex flex-col items-center my-6">
        <h1 className="text-2xl font-bold">NASA Image Search</h1>
      </div>
      <ImageGet />
    </div>
  );
}
