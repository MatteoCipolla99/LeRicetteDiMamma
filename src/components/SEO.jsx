import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEO = ({ title, description, image, type = "website" }) => {
  const location = useLocation();
  const siteName = "Le Ricette di Mamma Concetta";
  const defaultDesc =
    "Le migliori ricette tradizionali tramandate di generazione in generazione.";
  const currentUrl = window.location.origin + location.pathname;

  useEffect(() => {
    // 1. Titolo Pagina
    document.title = title ? `${title} | ${siteName}` : siteName;

    // 2. Aggiornamento Meta Tags
    const metaTags = [
      { name: "description", content: description || defaultDesc },
      { property: "og:title", content: title || siteName },
      { property: "og:description", content: description || defaultDesc },
      {
        property: "og:image",
        content:
          image ||
          "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=1200",
      },
      { property: "og:url", content: currentUrl },
      { property: "og:type", content: type },
      { name: "twitter:card", content: "summary_large_image" },
    ];

    metaTags.forEach((tag) => {
      let element;
      if (tag.name) {
        element = document.querySelector(`meta[name="${tag.name}"]`);
      } else {
        element = document.querySelector(`meta[property="${tag.property}"]`);
      }

      if (element) {
        element.setAttribute("content", tag.content);
      } else {
        const newMeta = document.createElement("meta");
        Object.keys(tag).forEach((key) => newMeta.setAttribute(key, tag[key]));
        document.head.appendChild(newMeta);
      }
    });
  }, [title, description, image, currentUrl, type]);

  return null;
};

export default SEO;
