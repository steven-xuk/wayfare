// src/components/Walk.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeNavbarAuth from "./parts/HomeNavbarAuth";
import { supabase } from "../SupabaseClient";

export default function Walk() {
  const { id } = useParams();               // this is the PK in your "trails" table
  const [trail, setTrail] = useState(null);
  const [images, setImages] = useState([]);

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

      setTrail({ ...data, ...meta });

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

  return (
    <div className="walk">
      <HomeNavbarAuth shadow={true} />
      <div className="container">
        <h1>{trail.title}</h1>
        <p>{trail.description}</p>
        <p><strong>Likes:</strong> {trail.likes}</p>

        <div className="walk-gallery">
          {images.length > 0 ? (
            images.map((src) => (
              <img
                key={src}
                src={src}
                alt={trail.title}
                loading="lazy"
                style={{ maxWidth: "100%", marginBottom: "1rem" }}
              />
            ))
          ) : (
            <p>No images for this walk yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
