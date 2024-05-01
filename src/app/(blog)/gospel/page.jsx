import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getArticleDataWithBody } from "@/util/articles-functions";
import gfm from "remark-gfm";
import remarkRehype from "remark-rehype";

export default function GospelPage() {
  const article = getArticleDataWithBody("gospel", "/src/content/pages-content");
  const customRenderers = {
    table(table) {
      return (
        <div className="table-responsive">
          <table className="table table-striped">{table.children}</table>
        </div>
      );
    },
    ul(list) {
      return <ul className="">{list.children}</ul>;
    },
    ol(list) {
      return <ol className="">{list.children}</ol>;
    },
    li(listItem) {
      return <li className="text-break">{listItem.children}</li>;
    },
    a(anchor) {
      return (
        <>
          <a href={anchor.href} target="_blank">
            {anchor.children[0]}
          </a>
        </>
      );
    },
    hr() {
      return <hr className="m-6" />;
    },
    blockquote(quote) {
      return (
        <div className="card m-1">
          <div className="card-body">
            <blockquote className="blockquote h5">{quote.children}</blockquote>
          </div>
        </div>
      );
    },

    img(image) {
      console.log(image);
      return (
        <Link href={`/blog_images/${image.src}`} key={image.src}>
          <Image
            className={`col-md-2 float-md-end mb-4 ms-md-3 img-fluid rounded float-end ${isFullWidth ? "w-100" : "" // Add w-100 class for full width if caption contains 'full'
              }`}
            src={`/blog_images/${image.src}`}
            alt={image.alt}
            width={400}
            height={300}
          />
        </Link>
      );
    },
    // TODO: add a custom render for the images which are in a link to be link images not to use the ModalImage.
    p: (paragraph) => {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = {
          src: `${node.children[0].properties.src}`,
          alt: node.children[0].properties.alt,
        };
        return <Link href={`/blog_images/${image.src}`} key={image.src}>
          <Image
            className={`col-md-2 float-md-end mb-4 ms-md-3 img-fluid rounded float-end $`}
            src={`/blog_images/${image.src}`}
            alt={image.alt}
            width={400}
            height={300}
          />
        </Link>;
      }
      return <p>{paragraph.children}</p>;
    },
  };
  return (
    <>
      <ReactMarkdown
        remarkPlugins={[gfm]}
        rehypePlugins={[remarkRehype]}
        components={customRenderers}>
        {article.content}
      </ReactMarkdown>
      <h1 className="text-xl ">

      </h1>
    </>
  )
}