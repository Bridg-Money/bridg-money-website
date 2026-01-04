import { Title, Meta as HeadMeta, Link as HeadLink } from "react-head";
import { useLocation } from "react-router";

const MetaData = ({ metas = {} }) => {
  const location = useLocation();
  const { title, desc, ogTitle, ogDesc } = metas;
  const url = `${import.meta.env.VITE_DOMAIN}${location.pathname}`;

  return (
    <>
      {title && (
        <>
          <Title key="title">{title}</Title>
          <HeadMeta key="twitter-title" name="twitter:title" content={title} />
          <HeadMeta
            key="og-title"
            property="og:title"
            content={ogTitle || title}
          />
        </>
      )}

      {desc && (
        <>
          <HeadMeta key="description" name="description" content={desc} />
          <HeadMeta
            key="twitter-description"
            name="twitter:description"
            content={desc}
          />
          <HeadMeta
            key="og-description"
            property="og:description"
            content={ogDesc || desc}
          />
        </>
      )}

      <HeadLink key="canonical" rel="canonical" href={url} />
      <HeadMeta key="og-url" property="og:url" content={url} />
    </>
  );
};

export default MetaData;
