import Head from 'next/head';
export default function PagesHeader({ children, title, description }) {
  return (
    <>
      {/* SEO Metadata */}
      <Head>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
      </Head>

      {/* Main Content */}
      <main className="page-main" aria-labelledby="page-heading">
        <div className="page-layer-container">
          <section>
            <header>
              {/* Accessible Heading */}
              <h1 id="page-heading" className="sr-only">
                {title}
              </h1>
            </header>
          </section>
          {/* Children Content */}
          {children}
        </div>
      </main>
    </>
  );
}
