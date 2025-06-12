import { useEffect, useState } from 'react';
import likesIMG from '../../imgs/like.png'
import { Link } from 'react-router-dom';

function TrialPreview({title, description, image, likes, creatorName, trail_link}) {

    const [descriptionState, setDescriptionState] = useState(description);

    useEffect(() => {
        const descriptionShortenerFunctionThingy = () => {
            if (window.innerWidth <= 500) {
                console.log(description.length)
                const num = Math.round(320 * (Math.round(100*((5*Math.E**((window.innerWidth-448)/30))/(8*(1+Math.E**((window.innerWidth-448)/30)))+0.36))/100))
                const newDescriptionState = description.substring(0, num) + '... ';
                console.log(newDescriptionState);
                if (Math.abs(descriptionState.length - newDescriptionState.length) > 2) {
                    setDescriptionState(newDescriptionState);
                }
            }

            if (window.innerWidth > 500) {
                setDescriptionState(description);
            }
        }

        window.addEventListener('resize', descriptionShortenerFunctionThingy);
        descriptionShortenerFunctionThingy();

        return () => {
            window.removeEventListener('resize', descriptionShortenerFunctionThingy);
        };
    }, [])

    return (
        <div className='trail-preview'>
            <Link to={trail_link}>
                <div className='trail-preview-content'>
                    <div className='preview-top'>
                        <div className='preview-content-container'>
                            <h3 className='preview-title'>{title}</h3>
                            <p className='preview-content'>{descriptionState}{descriptionState.slice(-4, -1) === '...' ? <Link to={trail_link} className='no-color-change'>Read more</Link> : null}</p>
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
            </Link>
        </div>
    );
}

export default TrialPreview;