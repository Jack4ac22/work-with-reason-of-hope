
import Link from "next/link";
import { FaApple } from "react-icons/fa";

export default function AppleBooksLink({ resource }) {
  return (
    <Link key={`${resource.title}`}
      className="text-darkShade bg-gray-100 inline-flex py-2 px-1 rounded-lg items-center hover:bg-gray-200 focus:outline-none" href={`publications/${resource.link}`}>
      <FaApple className="" />
      <span className="ml-4 flex items-start flex-col leading-none">
        <span className="text-xs mr-2">متجر أبل</span>
      </span>
    </Link>
  );
}