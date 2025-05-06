import { useEffect, useId, useState } from "react";
import HomeNavbarAuth from "./parts/HomeNavbarAuth";
import { supabase } from "../SupabaseClient";
import TrialPreview from "./parts/TrailPreview";

export default function Explore() {

    const [trails, setTrails] = useState()

    const getIMG = (imgID) => {
        //all imgs are stored as IDs, so this function will take an ID and return an img
    }

    async function getAllTrails() {
        const {data, error} = await supabase
        .from('trails')
        .select('*')

        if (data){
            console.log(data)
            setTrails(data)

            //here you go, this is the data. do what you want idk what i did
            console.log(data.map(item => JSON.parse(item.MetaData)))
        }

        if (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getAllTrails()
    }, [])
    

    return (
        <div className="explore">
            <HomeNavbarAuth shadow={true}/>
            {/* {trails && (trails.map(item => <TrialPreview props={JSON.parse(item.MetaData)} key={useId}/>))}  */}
            <h1>Explore</h1>
        </div>
    );
}