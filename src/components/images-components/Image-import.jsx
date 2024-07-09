import Image from 'next/image';

export default function DynamicImageComponent({ imageName }) {
  let imagePath = `/src/assets/blog-images/${imageName}`;

  return (
    <Image src={imagePath} alt="Dynamic Image" />
  );
}