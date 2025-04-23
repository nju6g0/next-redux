import { HighlightText } from "@/components/common";

export default function PostCard({ id, title, body, keyword }) {
  return (
    <div className="border-amber-100 border-2 rounded-md p-4 mb-4">
      <h1>PostCard: {id}</h1>
      <h3 className="font-semibold text-lg underline tracking-wide">
        <HighlightText text={title} keyword={keyword} />
      </h3>
      <p className="text-gray-700 break-keep line-clamp-3">
        <HighlightText text={body} keyword={keyword} />
      </p>
      {/* <button onClick={handleDelete}>Delete</button> */}
    </div>
  );
}
