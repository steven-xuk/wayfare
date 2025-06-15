import React, { useEffect, useRef } from "react";

const GoogleTranslate = () => {
  const googleTranslateRef = useRef(null);

  useEffect(() => {
    // define the global callback that Google’s script will call
    window.googleTranslateElementInit = () => {
      try {
        if (
          googleTranslateRef.current &&
          window.google &&
          window.google.translate
        ) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages:
                "af,ach,ak,am,ar,az,be,bem,bg,bh,bn,br,bs,ca,chr,ckb,co,crs,cs,cy,da,de,ee,el,en,eo,es,es-419,et,eu,fa,fi,fo,fr,fy,ga,gaa,gd,gl,gn,gu,ha,haw,hi,hr,ht,hu,hy,ia,id,ig,is,it,iw,ja,jw,ka,kg,kk,km,kn,ko,kri,ku,ky,la,lg,ln,lo,loz,lt,lua,lv,mfe,mg,mi,mk,ml,mn,mo,mr,ms,mt,ne,nl,nn,no,nso,ny,nyn,oc,om,or,pa,pcm,pl,ps,pt-BR,pt-PT,qu,rm,rn,ro,ru,rw,sd,sh,si,sk,sl,sn,so,sq,sr,sr-ME,st,su,sv,sw,ta,te,tg,th,ti,tk,tl,tn,to,tr,tt,tum,tw,ug,uk,ur,uz,vi,wo,xh,yi,yo,zh-CN,zh-TW,zu",
              layout:
                window.google.translate.TranslateElement.InlineLayout.VERTICAL,
            },
            googleTranslateRef.current
          );
        }
      } catch (err) {
        console.warn("Google Translate init failed:", err);
      }
    };

    // inject the script normally—no CORS flag, so it actually executes
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      ref={googleTranslateRef}
      style={{ minHeight: "1em" }}
    />
  );
};

export default GoogleTranslate;
