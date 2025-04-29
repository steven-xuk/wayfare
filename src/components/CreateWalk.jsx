import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import { supabase } from '../SupabaseClient';


function CreateWalk() {

    const [walk, setWalk] = useState({
        steps: [],
        MetaData: {
            kilometers: '',
            description: '',
            difficulty: '',
            likes: 0,
            comments: [],
        },
        userData: {},
        walkID: ''
    })

    const ID = uuidv4()

    useEffect(() => {
        setWalk(prev => ({
            ...prev,
            walkID: ID
        }))
    }, [])


    const [currentStep, setCurrentStep] = useState('making steps')

    const [stepFormData, setStepFormData] = useState({
        title: '',
        description: '',
        tip: '',
        pin: '',
        help: '',
        img: '',
    })

    const [stepImg, setStepIMG] = useState(null)


    function addStep(e){
        e.preventDefault()

        const fileExt = stepImg.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}-${ID}`
        const filePath = `walks/${ID}/${fileName}`;

        supabase
            .storage
            .from('wayfare') // replace with your bucket name
            .upload(filePath, stepImg)
            .then(({ data, error }) => {
                if (error) {
                    console.error('Upload error:', error.message);
                } else {
                    console.log('Uploaded to:', data.path);
                }
            });


        

    
    }

    function publishWalk(){

    }

    function handleChange(e){
        setStepFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    function handleImgUpload(e){
        setStepIMG(e.target.files[0])
    }

    return (
        <div>
            <p>create a walk!</p>

            {currentStep == 'making steps' && <div>
                    <h2>lets get started by making your first step!</h2>

                    <form onSubmit={e => addStep(e)}>
                        <input name='title' type="text" value={stepFormData.title} placeholder='add a title' required onChange={e => handleChange(e)}/>
                        <textarea rows="10" cols="50" name='description' type='tel' value={stepFormData.description} placeholder='add a description' required onChange={e => handleChange(e)}/>
                        <input name='tip' type="text" value={stepFormData.tip} placeholder='add a tip' required onChange={e => handleChange(e)}/>
                        <input name='img' type="file" placeholder='add an image' required onChange={e => handleImgUpload(e)} accept="image/*"/>
                        <input name='pin' type='text'  value={stepFormData.pin} placeholder='add a link to google maps' required onChange={e => handleChange(e)}/>
                        <input name='help' type="text" value={stepFormData.help} placeholder="add a some 'help' text" onChange={e => handleChange(e)}/>
                        <button type='submit'>create step</button>
                        <button type='submit'>create step and finish</button>
                    </form>
                
                </div>}
        </div>
    );
}

export default CreateWalk;