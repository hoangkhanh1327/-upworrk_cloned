import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { ClientPost } from "@/app/types/client.types";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

dayjs.extend(relativeTime).locale("vi");

interface IPostItem {
  post: ClientPost;
}
const PostItem: React.FC<IPostItem> = ({ post }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-3">
      <Link
        href={`/client/post/${post.id}`}
        className="block p-6 group border-b border-solid border-[#d5e0d5] hover:bg-[#f2f7f2] last-of-type:border-transparent"
      >
        <small className="text-sm mb-3 font-normal text-[#5e6d55]">
          {dayjs(post.updated_at).fromNow()}
        </small>
        <h4 className="mb-1 text-2xl leading-7 tracking-[0.03px] font-medium text-black group-hover:text-[#14a800] group-hover:underline">
          {post.title}
        </h4>
        <p className="text-sm text-[#5e6d55] mb-2">{post.desc}</p>
        <div className="text-sm text-[#5e6d55] mb-3 flex items-center">
          <p>
            <BadgeCheck
              className="w-5 h-5 inline-flex -mt-[3px] text-white"
              fill="#5e6d55"
            />{" "}
            Payment verified
          </p>
          <span className="ml-4">{`${post.bids}$`}</span>
        </div>
        {/* <p className="text-[12px] text-[#5e6d55] font-medium">
          Proposals: <span>{`${post.min_proposals}+`}</span>
        </p> */}
      </Link>
    </div>
  );
};

export default PostItem;
