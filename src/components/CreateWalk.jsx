import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import { supabase } from '../SupabaseClient';
import HomeNavbarAuth from './parts/HomeNavbarAuth';
import { Link } from 'react-router-dom';
import '../CSS/CreateWalk.css'


function CreateWalk() {

    const [userDataObj, setUserDataObj] = useState()

    async function getTokenData() {   
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          return null;
        }
    
        const { data: userData, error: userError } = await supabase
          .from('Users')      
          .select('*')
          .eq('UID', data.session?.user.user_metadata.display_name)
          .single();
      
        if (userError) {
          console.error('Error fetching row:', userError);
        }
        if (userData){
          // console.log('Fetched row:', userData);
        }
        
        setUserDataObj({
          ...userData,
          date_joined: userData.created_at,
          email: data.session?.user.email,
          isAuthenticated: data.session?.user.email_confirmed_at
        })
      }

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
        getTokenData()
    }, [])


    const [currentStep, setCurrentStep] = useState('finishing')

    const [stepFormData, setStepFormData] = useState({
        title: '',
        description: '',
        tip: '',
        pin: '',
        help: '',
    })

    const [finishingForm, setFinishingForm] = useState({
        kilometers: '',
        description: '',
        difficulty: '',
        title: '',
    })

    const [stepImg, setStepIMG] = useState(null)


    async function addStep(e){
        e.preventDefault()
        const fileExt = stepImg.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}-${ID}`
        const filePath = `walks/${ID}/${fileName}`;

        let path = ''
       
        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('wayfare') // Your bucket name
            .upload(filePath, stepImg);

        if (uploadError) {
            console.error('Upload error:', uploadError.message);
            return;
        }
        if (uploadData){
            console.log('sucsessfully uploaded: ', uploadData.path)
            path = uploadData.path
        }

        console.log(path)

        setWalk(prev => ({
            ...prev,
            steps: [...prev.steps, stepFormData]
        }))
    }


    function startAddingStep(e){    
        e.preventDefault()

        setCurrentStep('making steps')
    }

    function handleChangeSteps(e){
        setStepFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    function handleImgUpload(e){
        setStepIMG(e.target.files[0])
    }

    function handleChangesFinish(e){
        setFinishingForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }


    

    async function finishWalkAndSendItToSupabaseIReallyLikeFunctions(){
        console.log('uploading...')
        const walkDataToUpload = {
            MetaData: {
                ...finishingForm,
                likes: 0,
                comments: [],
            },
            steps: walk.steps,
            walkID: ID,
            userData: userDataObj,
        }

        const { data, error } = await supabase
        .from('trails')
        .insert(walkDataToUpload)
        .select()
        
        if (data){
            console.log(data)
            setCurrentStep('walk uploaded')
            console.log('walk uploaded')
        }
        if (error){
            console.log(error)
        }
    }



    return (
        <>
                <HomeNavbarAuth shadow={true} />
                <p className="title">create a walk!</p>
        
            <div className='create-walk container'>
                {currentStep == 'making steps' && (
                    <div className="steps-section">
                        <h2 className="section-heading">lets get started by making your first step!</h2>
        
                        <form onSubmit={e => addStep(e)} className="form">
                            <input name='title' type="text" className="input" value={stepFormData.title} placeholder='add a title' required onChange={e => handleChangeSteps(e)} />
                            <textarea rows="10" cols="50" name='description' className="textarea" value={stepFormData.description} placeholder='add a description' required onChange={e => handleChangeSteps(e)} />
                            <input name='tip' type="text" className="input" value={stepFormData.tip} placeholder='add a tip' required onChange={e => handleChangeSteps(e)} />
                            <input name='img' type="file" className="file-input" placeholder='add an image' required onChange={e => handleImgUpload(e)} accept="image/*" />
                            <input name='pin' type='text' className="input" value={stepFormData.pin} placeholder='add a link to google maps' required onChange={e => handleChangeSteps(e)} />
                            <input name='help' type="text" className="input" value={stepFormData.help} placeholder="add a some 'help' text" onChange={e => handleChangeSteps(e)} />
                            <button type='submit' className="button primary">create step</button>
                        </form>
        
                        {walk.steps.length > 0 && (
                            <button onClick={() => setCurrentStep('double check')} className="button secondary">
                                finish
                            </button>
                        )}
                    </div>
                )}
        
                {currentStep == 'finishing' && (
                    <div className="finishing-section">
                        <p className="section-subtitle">add some data idk</p>
        
                        <form onSubmit={startAddingStep} className="form">
                            <input placeholder='kilometers (optional)' name='kilometers' type="text" className="input" value={finishingForm.kilometers} onChange={e => handleChangesFinish(e)} />
                            <input placeholder='walk title' name='title' type="text" className="input" value={finishingForm.title} onChange={e => handleChangesFinish(e)} />
                            <textarea rows="10" cols="50" placeholder='description about the trail' name='description' type="text" className="input" value={finishingForm.description} onChange={e => handleChangesFinish(e)} />
                            <label htmlFor="slider" className="label">Difficulty: {finishingForm.difficulty}</label>
                            <input id='slider' placeholder='difficulty' name='difficulty' type='range' min={1} max={10} className="slider" value={finishingForm.difficulty} onChange={e => handleChangesFinish(e)} />
                            <button type='submit' className="button primary">Create some steps for your walk!</button>
                        </form>
                    </div>
                )}
        
                {currentStep == 'double check' && (
                    <div className="double-check-section">
                        <button onClick={() => finishWalkAndSendItToSupabaseIReallyLikeFunctions()} className="button primary">
                            publish walk
                        </button>
                    </div>
                )}
        
                {currentStep == 'walk uploaded' && (
                    <div className="upload-success">
                        <h1 className="success-message">YOU HAVE SUCSESSFULLY UPLOADED YOUR WALK!!!!! YEESSS</h1>
                        <Link to='/home' className="link">Home</Link>
                    </div>
                )}
            </div>
        </>
    );
    
}

export default CreateWalk;