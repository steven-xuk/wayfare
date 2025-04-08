import React from 'react';

import likesIMG from '../../imgs/like.png'

function TrialPreview({title, description, image, likes, creatorName}) {
    return (
        <div className='preview'>
            <div className='preview-top'>
                <div>
                    <div className='preview-content-container'>
                        <h3 className='preview-title'>{title}</h3>
                        <p className='preview-content'>{description}</p>
                        <a className='btn btn-primary'>EXPLORE</a>
                    </div>
                </div>
                <div className='preview-image-container'>
                    <img className='preview-image' src={image}/>
                </div>
            </div>
            <div className='preview-bottom'>
                <div className='border'>
                    <p>trail by <bold>{creatorName}</bold></p>
                </div>
                <div className='border likes-container'>
                    <img src={likesIMG} className='likes-image'/>
                    <p>{likes}</p>
                </div>
            </div>
        </div>
    );
}

export default TrialPreview;