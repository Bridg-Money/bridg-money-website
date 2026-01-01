import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";

const Meta = ({ metas }) => {
  const loaction = useLocation();
  const { title, desc, ogTitle, ogDesc } = metas;
  return (
    <>
      <Helmet>
        {title && (
          <>
            <title>{title}</title>
            <meta name="twitter:title" content={title} />
          </>
        )}
        {desc && (
          <>
            <meta name="description" content={desc} />
            <meta name="twitter:description" content={desc} />
          </>
        )}
        <link
          rel="canonical"
          href={`https://bridg.money${loaction.pathname}`}
        />
        {(ogTitle || title) && (
          <meta property="og:title" content={ogTitle || title} />
        )}
        {(ogDesc || desc) && (
          <meta property="og:description" content={ogDesc || desc} />
        )}
        {(ogDesc || desc) && (
          <meta property="og:description" content={ogDesc || desc} />
        )}
        {(ogDesc || desc) && (
          <meta property="og:description" content={ogDesc || desc} />
        )}
        <meta
          property="og:url"
          content={`https://bridg.money${loaction.pathname}`}
        />
      </Helmet>
    </>
  );
};

export default Meta;
