// Explore.jsx
import { useEffect, useState } from "react";
import HomeNavbarAuth from "./parts/HomeNavbarAuth";
import { supabase } from "../SupabaseClient";
import TrialPreview from "./parts/TrailPreview";

export default function Explore() {
  const [trails, setTrails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  // helper to map numeric difficulty to level string
  const getLevel = (diff) => {
    if (diff <= 3) return "easy";
    if (diff <= 6) return "medium";
    return "advanced";
  };

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
        let meta = {};
        try {
          meta = JSON.parse(trail.MetaData);
        } catch {
          console.warn("Invalid JSON in MetaData for trail", trail.id);
        }
        let userData = {};
        try {
          userData = JSON.parse(trail.userData);
        } catch {
          console.warn("Invalid JSON in userData for trail", trail.id);
        }
        const { data: files, error: listErr } = await supabase
          .storage
          .from("wayfare")
          .list(`walks/${trail.walkID}`, { limit: 1 });
        if (listErr || !files?.length) {
          console.warn(`No files for walkID=${trail.walkID}`, listErr);
          return { ...trail, ...meta, image: null };
        }
        const publicUrl = `${workerHost}/${trail.walkID}/${files[0].name}`;
        return {
          ...meta,
          ...userData,
          ...trail,
          image: publicUrl,
        };
      })
    );
    setTrails(enriched);
  }

  useEffect(() => {
    getAllTrails();
  }, []);

  // derive the filtered + searched list
  const filteredTrails = trails.filter((trail) => {
    const level = getLevel(Number(trail.difficulty));
    const matchesFilter =
      !filterDifficulty || level === filterDifficulty;
    const text = `${trail.title} ${trail.description}`.toLowerCase();
    const matchesSearch =
      !searchTerm || text.includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="explore">
      <HomeNavbarAuth shadow={true} />

      <div className="container">
        <h1>Explore Walks</h1>

        {/* --- New search & filter controls --- */}
        <div className="controls">
          <input
            className="search-input"
            type="text"
            placeholder="Search trails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="filter-select"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
          >
            <option value="">All difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="trails">
          {filteredTrails.length > 0 ? (
            filteredTrails.map((trail) => (
              <TrialPreview
                key={trail.id}
                title={trail.title}
                description={trail.description}
                likes={trail.likes}
                image={trail.image}
                difficulty={Number(trail.difficulty)}
                creatorName={trail.username}
                trail_link={`/walk/${trail.id}`}
              />
            ))
          ) : (
            <p>No trails match your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}
