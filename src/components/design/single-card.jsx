import Link from 'next/link'
import Image from 'next/image'
export default function SingleCard() {
  return (
    <>
      <div className=" bg-lightShade dark:bg-darkShade dark:text-lightShade text-darkAccent m-2 w-96 rounded-xl">

        {/* upper container  */}
        <div className='relative '>
          <div className='absolute top-0  w-full rounded-t-xl p-4 text-center  bg-lightShade dark:bg-darkShade dark:text-lightShade text-darkAccent group opacity-0 hover:opacity-100 transform duration-2000 -translate-y-10 hover:-translate-y-0'>
            <p className="text-lg1 text-left font-bold select-none pt-3">
              الديانات-والطوائف
            </p>
            <p className="text-lg1 text-left font-bold select-none pt-2">
              2022-03-16
            </p>
            <p className="text-lg1 text-right pt-4 pb-6 ">
              لمحة مُختصرة عن تاريخ ونشأة البوذية الكلاسيكية بالإضافة إلى نظرة عامة تُظهر التباين بين تعاليمها وبين التعاليم المسيحية المبنية على الكتاب المقدس.
            </p>
            <Link href='#' className='bg-darkAccent text-lightAccent dark:bg-lightAccent dark:text-darkAccent p-2 rounded-xl shadow-xl border border-lightShade border-opacity-20 hover:border-opacity-40 hover:bg-mainBrand dark:hover:bg-mainBrand transform duration-1000 hover:text-lightShade'>
              Read more
            </Link>
          </div>
          <Image src='/blog_images/sc12.jpg' alt="image" width='600' height={400} className='rounded-t-xl' />
          {/* <img src="https://source.unsplash.com/random/600*900/?2" alt="" className="object-cover object-center w-full rounded-t-md h-72" /> */}
        </div>
        {/* lower container */}
        <div className="container text-center h-12 p-2">
          <h3 className="text-center font-bold text-2xl text-wrap">
            البوذية الكلاسيكيّة
          </h3>
        </div>
      </div>
    </>
  )
}