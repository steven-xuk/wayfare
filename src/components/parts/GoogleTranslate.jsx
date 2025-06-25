import React, { useEffect, useRef } from "react";

const GoogleTranslate = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1) Define the global init callback
    window.googleTranslateElementInit = () => {
      console.log("🏁 googleTranslateElementInit called");
      if (
        containerRef.current &&
        window.google &&
        window.google.translate &&
        typeof window.google.translate.TranslateElement === "function"
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "af,ar,be,ca,cs,da,de,el,en,es,et,fi,fr,he,hi,hr,hu,id,it,ja,ko,lt,lv,ms,nl,no,pl,pt,ro,ru,sk,sl,sr,sv,th,tl,tr,uk,vi,zh-CN,zh-TW",
            layout:
              window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          },
          containerRef.current
        );
      } else {
        console.error(
          "⚠️ Google Translate globals not ready:",
          window.google,
          window.google?.translate
        );
      }
    };

    // 2) Only inject once
    const existing = document.querySelector(
      'script[src*="translate_a/element.js"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      // Listen for load & error
      script.onload = () => console.log("✅ Translate script loaded");
      script.onerror = () =>
        console.error("❌ Failed to load Google Translate script");

      document.body.appendChild(script);

      // Cleanup on unmount
      return () => {
        document.body.removeChild(script);
        delete window.googleTranslateElementInit;
        if (containerRef.current) containerRef.current.innerHTML = "";
      };
    } else {
      console.log("ℹ️ Translate script already present, skipping injection");
    }

    // No cleanup needed if we didn’t inject
    return undefined;
  }, []);

  return (
    <div
      id="google_translate_element"
      ref={containerRef}
      style={{ minHeight: "1em" }}
    />
  );
};

export default GoogleTranslate;
