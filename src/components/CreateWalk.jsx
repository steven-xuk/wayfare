import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import { supabase } from '../SupabaseClient';
import HomeNavbarAuth from './parts/HomeNavbarAuth';


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

        console.log(walk)

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
    
        if (data){
            console.log(data)
        }
        if (error){
            console.log(error)
        }
    }



    return (
        <div className='create-walk'>
            <HomeNavbarAuth shadow={true}/>
            <p>create a walk!</p>

            {currentStep == 'making steps' && <div>
                    <h2>lets get started by making your first step!</h2>

                    <form onSubmit={e => addStep(e)}>
                        <input name='title' type="text" value={stepFormData.title} placeholder='add a title' required onChange={e => handleChangeSteps(e)}/>
                        <textarea rows="10" cols="50" name='description' type='tel' value={stepFormData.description} placeholder='add a description' required onChange={e => handleChangeSteps(e)}/>
                        <input name='tip' type="text" value={stepFormData.tip} placeholder='add a tip' required onChange={e => handleChangeSteps(e)}/>
                        <input name='img' type="file" placeholder='add an image' required onChange={e => handleImgUpload(e)} accept="image/*"/>
                        <input name='pin' type='text'  value={stepFormData.pin} placeholder='add a link to google maps' required onChange={e => handleChangeSteps(e)}/>
                        <input name='help' type="text" value={stepFormData.help} placeholder="add a some 'help' text" onChange={e => handleChangeSteps(e)}/>
                        <button type='submit'>create step</button>
                    </form>
                    <button onClick={() => setCurrentStep('double check')}>finish</button>
                
                </div>}

            {currentStep == 'finishing' && <div>
                    <p>add some data idk</p>                    
                
                    <form onSubmit={startAddingStep}>
                        <input placeholder='kilometers (optional)' name='kilometers' type="text" value={finishingForm.kilometers} onChange={e => handleChangesFinish(e)}/>
                        <input placeholder='walk title' name='title' type="text" value={finishingForm.title} onChange={e => handleChangesFinish(e)}/>
                        <input placeholder='description about the trail' name='description' type="text" value={finishingForm.description} onChange={e => handleChangesFinish(e)}/>
                        <label htmlFor="slider">
                            Difficulty: {finishingForm.difficulty}
                        </label>
                        <input id='slider' placeholder='difficulty' name='difficulty' type='range' min={1} max={10} value={finishingForm.difficulty} onChange={e => handleChangesFinish(e)}/>
                        <button type='submit'>Create some steps for your walk!</button>
                    </form>
                </div>}

            {currentStep == 'double check' && <div>
                    <button onClick={() => finishWalkAndSendItToSupabaseIReallyLikeFunctions()}>publish walk</button>
                
                </div>}
        </div>
    );
}

export default CreateWalk;