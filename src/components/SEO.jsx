import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEO = ({
  title,
  description,
  image,
  type = "website",
  keywords = [],
}) => {
  const location = useLocation();
  const siteName = "Le Ricette di Mamma Concetta";
  const defaultDesc =
    "Le migliori ricette tradizionali tramandate di generazione in generazione. Cucina italiana autentica.";
  const defaultImage =
    "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=1200";
  const currentUrl = window.location.origin + location.pathname;

  useEffect(() => {
    // 1. Titolo
    document.title = title ? `${title} | ${siteName}` : siteName;

    // 2. Meta Tags Base
    const metaTags = [
      { name: "description", content: description || defaultDesc },
      {
        name: "keywords",
        content: keywords.join(", ") || "ricette, cucina italiana, tradizione",
      },
      { name: "author", content: "Mamma Concetta" },

      // Open Graph
      { property: "og:site_name", content: siteName },
      { property: "og:title", content: title || siteName },
      { property: "og:description", content: description || defaultDesc },
      { property: "og:image", content: image || defaultImage },
      { property: "og:url", content: currentUrl },
      { property: "og:type", content: type },
      { property: "og:locale", content: "it_IT" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title || siteName },
      { name: "twitter:description", content: description || defaultDesc },
      { name: "twitter:image", content: image || defaultImage },

      // Mobile
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "theme-color", content: "#f97316" },
    ];

    metaTags.forEach((tag) => {
      let element;
      if (tag.name) {
        element = document.querySelector(`meta[name="${tag.name}"]`);
      } else if (tag.property) {
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

    // 3. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

    // 4. JSON-LD Structured Data (Schema.org)
    const scriptId = "structured-data";
    let existingScript = document.getElementById(scriptId);
    if (existingScript) existingScript.remove();

    const structuredData = {
      "@context": "https://schema.org",
      "@type": type === "article" ? "Recipe" : "WebSite",
      name: title || siteName,
      description: description || defaultDesc,
      image: image || defaultImage,
      url: currentUrl,
    };

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [title, description, image, currentUrl, type, keywords]);

  return null;
};

export default SEO;
