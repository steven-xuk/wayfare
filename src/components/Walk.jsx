// src/components/Walk.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomeNavbarAuth from "./parts/HomeNavbarAuth";
import { supabase } from "../SupabaseClient";
import tip from "../imgs/tip.png";
import help from "../imgs/help.png";
import GoogleTranslate from "./parts/GoogleTranslate";
import TpTripComHotelWidget from "./parts/affiliates/TpTripComHotelWidget";

export default function Walk() {
  const { id } = useParams();               // this is the PK in your "trails" table
  const [trail, setTrail] = useState(null);
  const [images, setImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1)
  const [hasStarted, setHasStarted] = useState(false)
  const navigate = useNavigate()

  function toEmbedUrl(iframeHtml) {
    // 1) Try a simple regex pull
    const match = iframeHtml.match(/<iframe[^>]+src="([^"]+)"/);
    if (match && match[1]) {
      return match[1];
    }
    return iframeHtml;
  }

  useEffect(() => {
    if (!id) return;

    async function loadTrail() {
      // 1) fetch the single trail row by PK
      const { data, error } = await supabase
        .from("trails")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching trail:", error);
        return;
      }

      // 2) parse its metadata
      let meta = {};
      try {
        meta = JSON.parse(data.MetaData || "{}");
      } catch {
        console.warn("Invalid JSON in MetaData for trail", id);
      }

      setTrail({ ...data, ...meta, steps: JSON.parse(data.steps)});

      // 3) list all files under walks/{walkID}
      if (data.walkID) {
        const { data: files, error: listErr } = await supabase
          .storage
          .from("wayfare")
          .list(`walks/${data.walkID}`, {
            limit: 1000,       // adjust or paginate if you have >1000 files
            offset: 0,
            sortBy: { column: "name", order: "asc" },
          });

        if (listErr) {
          console.error("Error listing images for walkID=", data.walkID, listErr);
          setImages([]);
          return;
        }

        // 4) map each filename to your Cloudflare Worker URL
        const workerHost = "https://wayfare-images.xuk.workers.dev";
        const urls = (files || []).map((file) =>
          `${workerHost}/${data.walkID}/${encodeURIComponent(file.name)}`
        );
        setImages(urls);
      }
    }

    loadTrail();
  }, [id]);

  useEffect(() => {
    console.log(trail)
    if (trail) {
        console.log()
    }
  }, [trail])

  if (!trail) {
    return (
      <div className="walk">
        <HomeNavbarAuth shadow />
        <div className="container">
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (hasStarted){
    return (
      <div className="walk">
        <HomeNavbarAuth shadow={true} />
        <div className="container">
          <div className="top">
            <h1>{trail.title}</h1>
            <div className="steps-counter">
              <p>Step {currentStep + '/' + trail.steps.length}</p>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{width: `${(trail ? Math.round((currentStep / trail.steps.length) * 100) : '') + '%'}`}}></div>
             </div>
            </div>
          </div>
          <div className="middle">
            <img src={images[currentStep - 1]} className="wide-layout"/>
            <h2>{trail.steps[currentStep - 1].title}</h2>
            <p>{trail.steps[currentStep - 1].description}</p>
            <GoogleTranslate/>
            <img src={images[currentStep - 1]} className="narrow-layout"/>
            <div className="tip">
              <img src={tip} />
              <p>{trail.steps[currentStep - 1].tip}</p>
            </div>
            <div className="help">
              <img src={help} />
              <p>{trail.steps[currentStep - 1].help}</p>
            </div>
            <button onClick={() => {if (currentStep != 1) {setCurrentStep(currentStep != 1 ? currentStep - 1 : 1)} else {setHasStarted(false)}}}>Back</button>
            <button onClick={() => {if (currentStep != trail.steps.length) {setCurrentStep(currentStep != trail.steps.length ? currentStep + 1 : trail.steps.length)} else {navigate('/explore')}}}>{currentStep != trail.steps.length ? 'Continue' : 'Finish Walk'}</button>
          </div>
          <div className="bottom">
            <h2>Google Map:</h2>
            <div className="map-embed">
              <iframe
                src={toEmbedUrl(trail.steps[currentStep - 1].pin)}
                width="100%"            // or a fixed px value
                height="450"            // whatever height you like
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="walk">
        <HomeNavbarAuth shadow={true} />
        <div className="container">
          <div className="top">
            <h1>{trail.title}</h1>
          </div>
          <div className="middle">
            <img src={images[currentStep - 1]} className="wide-layout"/>
            <h2>{trail.title}</h2>
            <p>{trail.description}</p>
            <GoogleTranslate/>
            <div className="walk-stats">
              <p className="difficulty">{'Difficulty: ' + trail.difficulty + '/10'}</p>
              <p className="difficulty">{'Distance: ' + trail.kilometers + 'km'}</p>
            </div>
            <img src={images[currentStep - 1]} className="narrow-layout"/>
            <button onClick={() => {setHasStarted(true)}} className="start-button">Start</button>
          </div>
          <div className="bottom">
            <h1>Need a Hotel?</h1>
            <div className="affiliates">
              <TpTripComHotelWidget/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
