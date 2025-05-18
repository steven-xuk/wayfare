import { useEffect, useState } from 'react';
import likesIMG from '../../imgs/like.png'
import { Link } from 'react-router-dom';

function TrialPreview({title, description, short_description, image, likes, creatorName, trail_link}) {

    const [shortDescriptionState, setShortDescriptionState] = useState(short_description);

    useEffect(() => {
        const descriptionShortenerFunctionThingy = () => {
            if (window.innerWidth < 462) {
                const newShortDescriptionState = short_description.substring(0, Math.round(short_description.length * (window.innerWidth / 462))) + '... ';
                if (Math.abs(shortDescriptionState.length - newShortDescriptionState.length) > 2) {
                    console.log(newShortDescriptionState);
                    setShortDescriptionState(newShortDescriptionState);
                }
            }
            if (window.innerWidth > 462 && shortDescriptionState !== short_description) {
                setShortDescriptionState(short_description);
            }
        }

        window.addEventListener('resize', descriptionShortenerFunctionThingy);
        descriptionShortenerFunctionThingy();
    }, [])

    return (
        <div className='trail-preview'>
            <div className='preview-top'>
                <div className='preview-content-container'>
                    <h3 className='preview-title'>{title}</h3>
                    <p className='preview-content long'>{description}</p>
                    <p className='preview-content short'>{shortDescriptionState}{shortDescriptionState.slice(-4, -1) === '...' ? <Link to={trail_link}>Read more</Link> : null}</p>
                    {/* <a className='btn btn-primary'>EXPLORE</a> */}
                </div>
                <div className='preview-image-container'>
                    <img className='preview-image' src={image}/>
                </div>
            </div>
            <div className='preview-bottom'>
                <div className='border likes-container'>
                    <img src={likesIMG} className='likes-image'/>
                    <p className='info'>{likes}</p>
                </div>
                <div className='border difficulty-container'>
                    <p className='info advanced'>ADVANCED</p>
                </div>
                <div className='border info-container'>
                    <p className='info'>trail by <strong>{creatorName}</strong></p>
                </div>
            </div>
        </div>
    );
}

export default TrialPreview;