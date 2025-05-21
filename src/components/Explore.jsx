import { useEffect, useId, useState } from "react";
import HomeNavbarAuth from "./parts/HomeNavbarAuth";
import { supabase } from "../SupabaseClient";
import TrialPreview from "./parts/TrailPreview";

export default function Explore() {

    const [trails, setTrails] = useState([])

    const getIMG = (imgID) => {
        //all imgs are stored as IDs, so this function will take an ID and return an img
    }

    async function getAllTrails() {
        const {data, error} = await supabase
        .from('trails')
        .select('*')

        if (data){
            console.log(data)
            setTrails(data.map((trail) => {return {...trail, ...JSON.parse(trail.MetaData)}}))
        }

        if (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getAllTrails()
    }, [])
    
    useEffect(() => {
        console.log(trails)
    }, [trails])

    return (
        <div className="explore">
            <HomeNavbarAuth shadow={true}/>
            <h1>Explore</h1>
            {trails ? trails.map((trail) => {return <TrialPreview title={JSON.parse(trail.MetaData).title} description={JSON.parse(trail.MetaData).description} likes={JSON.parse(trail.MetaData).likes} key={trail.id} />}) : null}
        </div>
    );
}