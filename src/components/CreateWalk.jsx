import React, { useState } from 'react';

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
    })

    const [currentStep, setCurrentStep] = useState('making steps')

    const [stepFormData, setStepFormData] = useState({
        title: '',
        description: '',
        tip: '',
        img: '',
        pin: '',
        helpTXT: ''
    })

    function addStep(e){
        e.preventDefault()
    }

    function publishWalk(){

    }

    function handleChange(e){
        setStepFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
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
                    </form>
                
                </div>}
        </div>
    );
}

export default CreateWalk;