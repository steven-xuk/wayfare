import React from 'react';

import likesIMG from '../../imgs/like.png'

function TrialPreview({kilometers}) {

    console.log(kilometers)
    return (
        <div className='preview'>
            {/* <div className='preview-top'>
                <div className='preview-content-container'>
                    <h3 className='preview-title'>{title}</h3>
                    <p className='preview-content'>{description}</p>
                    <a className='btn btn-primary'>EXPLORE</a>
                </div>
                <div className='preview-image-container'>
                    <img className='preview-image' src={image}/>
                </div>
            </div>
            <div className='preview-bottom'>
                <div className='border'>
                    <p className='info'>trail by <strong>{creatorName}</strong></p>
                </div>
                <div className='border likes-container'>
                    <img src={likesIMG} className='likes-image'/>
                    <p className='info'>{likes}</p>
                </div>
            </div> */}
        </div>
    );
}

export default TrialPreview;