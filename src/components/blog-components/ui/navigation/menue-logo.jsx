import logoImage from "@/assets/images/blog/ROH.png"
import Image from 'next/image'
import Link from 'next/link';

export default function MenueLogo() {
  return (
    <Link className="flex flex-shrink-0 items-center hover:translate-y-0.5 duration-300" href="/">
    <Image
      className="h-10 w-auto ml-2"
      src={logoImage}
      alt="Reason Of Hope Logo"
    />
  </Link>
  );
}