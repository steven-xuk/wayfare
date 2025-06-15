import { useEffect, useState } from "react";
import HomeNavbarAuth from "./parts/HomeNavbarAuth";
import { supabase } from "../SupabaseClient";
import TrialPreview from "./parts/TrailPreview";

export default function Explore() {
  const [trails, setTrails] = useState([]);

  // Load all trails and their first image URL
    async function getAllTrails() {
        const { data, error } = await supabase.from("trails").select("*");
        if (error) {
            console.error("Error fetching trails:", error);
            return;
        }

        const workerHost = "https://wayfare-images.xuk.workers.dev";

        const enriched = await Promise.all(
            data.map(async (trail) => {
            // parse metadata
            let meta = {};
            try {
                meta = JSON.parse(trail.MetaData);
            } catch (e) {
                console.warn("Invalid JSON in MetaData for trail", trail.id);
            }

            let userData = {};
            try {
                userData = JSON.parse(trail.userData);
            } catch (e) {
                console.warn("Invalid JSON in userData for trail", trail.id);
            }

            // list the first file name under walks/{walkID}
            const { data: files, error: listErr } = await supabase
                .storage
                .from("wayfare")
                .list(`walks/${trail.walkID}`, { limit: 1 });
            if (listErr) {
                console.warn(`Error listing files for walkID=${trail.walkID}:`, listErr);
            }
            if (!files || files.length === 0) {
                console.warn(`No files found for walkID=${trail.walkID}`);
                return { ...trail, ...meta, image: null };
            }

            // build your Worker-backed public URL
            const firstFile = files[0].name;
            const publicUrl = `${workerHost}/${trail.walkID}/${firstFile}`;

            return {
                ...trail,
                ...meta,
                ...userData,
                image: publicUrl,
            };
            })
        );

        setTrails(enriched);
    }


  useEffect(() => {
    getAllTrails();
  }, []);

  useEffect(() => {
    console.log(trails);
  }, [trails]);

  return (
    <div className="explore">
      <HomeNavbarAuth shadow={true} />
      <div className="container">
        <h1>Explore</h1>
        <div className="trails">
          {trails.map((trail) => (
            <TrialPreview
              key={trail.id}
              title={trail.title}
              description={trail.description}
              likes={trail.likes}
              image={trail.image}
              difficulty={Number(trail.difficulty)}
              creatorName={trail.username}
              trail_link={'/walk/' + trail.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}