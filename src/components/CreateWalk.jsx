import React, { useEffect, useState } from 'react';
import { updateUser } from '../redux/slices/UserSlice.js';
import { v4 as uuidv4 } from 'uuid'; 
import { supabase } from '../SupabaseClient';
import HomeNavbarAuth from './parts/HomeNavbarAuth';
import { Link } from 'react-router-dom';
import '../CSS/CreateWalk.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import close from '../imgs/close.png'

function CreateWalk() {

    const [WALKID, SETWALKID] = useState('')
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector((state) => state.user);

    function openNewTab(path) {
        window.open(path, "_blank", "noopener");
    }

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
        
        dispatch(updateUser({
            ...userData,
            date_joined: userData.created_at,
            email: data.session?.user.email,
            isAuthenticated: data.session?.user.email_confirmed_at
        }))
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


    useEffect(() => {
        SETWALKID(uuidv4())
        getTokenData()
    }, [])

    const [currentStep, setCurrentStep] = useState('finishing')
    const [stepsCompleted, setStepsCompleted] = useState(0)

    useEffect(() => {

    }, [])

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
        difficulty: 5,
        title: '',
    })

    const [stepImg, setStepIMG] = useState(null)


    async function addStep(e){
        e.preventDefault()
        const fileExt = stepImg.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}-${WALKID}`
        const filePath = `walks/${WALKID}/${fileName}`;

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

        setStepFormData({
            title: '',
            description: '',
            tip: '',
            pin: '',
            help: '',
        })

        // setStepIMG(null)
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
            steps: JSON.stringify(walk.steps),
            walkID: WALKID,
            userData: userState,
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
        <div className="create-walk">
            <HomeNavbarAuth shadow={true} />
            <div className='container-container'>
                <div className='container'>
                    <div className='tabs'>
                        <div className='tab'>
                            <button><p>1</p></button>
                            <p>Details</p>
                        </div>
                        <div className='tab'>
                            <button><p>2</p></button>
                            <p>Steps</p>
                        </div>
                        <div className='tab'>
                            <button><p>3</p></button>
                            <p>Publish</p>
                        </div>
                        <div className='tab'>
                            <button><p>4</p></button>
                            <p>Finish</p>
                        </div>
                    </div>
                    {currentStep == 'making steps' && (
                        <div className="steps section">
                            <h2 className="section-subtitle">Add Steps</h2>
            
                            <form onSubmit={e => addStep(e)} className="form">
                                <div className='inputs'>
                                    <input name='title' type="text" className="input" value={stepFormData.title} placeholder='add a title' required onChange={e => handleChangeSteps(e)} />
                                    <textarea rows="10" cols="50" name='description' className="textarea" value={stepFormData.description} placeholder='add a description' required onChange={e => handleChangeSteps(e)} />
                                    <input name='tip' type="text" className="input" value={stepFormData.tip} placeholder='add a tip' required onChange={e => handleChangeSteps(e)} />
                                    <input name='img' type="file" className="file-input" placeholder='add an image' required onChange={e => handleImgUpload(e)} accept="image/*" />
                                    <div className='google-maps-embed'>
                                        <input name='pin' type='text' className="input" value={stepFormData.pin} placeholder='add the google maps embed info' required onChange={e => handleChangeSteps(e)} />
                                        <button type="button" onClick={() => {setIsPopupOpen(true)}}>How?</button>
                                    </div>
                                    <input name='help' type="text" className="input" value={stepFormData.help} placeholder="add a some 'help' text" onChange={e => handleChangeSteps(e)} />
                                </div>
                                <div className='buttons'>
                                    <button type='submit' className="button primary">create step</button>
                                    {walk.steps.length > 0 && (
                                        <button onClick={() => setCurrentStep('double check')} className="button secondary">
                                            finish
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}
            
                    {currentStep == 'finishing' && (
                        <div className="finishing section">
            
                            <form onSubmit={startAddingStep} className="form">
                                <h2 className="section-subtitle">Walk Details</h2>
                                <div className='inputs'>
                                    <input placeholder='walk title' name='title' type="text" className="input" value={finishingForm.title} onChange={e => handleChangesFinish(e)} />
                                    <textarea rows="10" cols="50" placeholder='description about the trail' name='description' type="text" className="input" value={finishingForm.description} onChange={e => handleChangesFinish(e)} />
                                    <input placeholder='kilometers (optional)' name='kilometers' type="text" className="input" value={finishingForm.kilometers} onChange={e => handleChangesFinish(e)} />
                                    <div className='difficulty'>
                                        <label htmlFor="slider" className="label">Difficulty: {finishingForm.difficulty}</label>
                                        <input placeholder='difficulty' name='difficulty' type='range' min={1} max={10} className="slider" value={finishingForm.difficulty} onChange={e => handleChangesFinish(e)} />
                                    </div>
                                </div>
                                <div className='buttons'>
                                    <button type='submit' className="button primary">Next</button>
                                </div>
                            </form>
                        </div>
                    )}
            
                    {currentStep === 'double check' && (
                        <div className="double-check section">
                            {/* title bar */}

                            {/* form with pinned button */}
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                finishWalkAndSendItToSupabaseIReallyLikeFunctions();
                            }}
                            className="form"
                            >
                            {/* scrollable area (you can put a summary or leave it blank) */}
                            <h2 className="section-subtitle">Publish Walk</h2>
                            <div className="inputs">
                                <h3>Almost there!</h3>
                                <p>
                                    You’re about to publish <span>{finishingForm.title}</span>. Take a final look at your details, and when you’re happy, click “Publish Walk” below to share your route.
                                </p>

                            </div>

                            {/* pinned publish button */}
                            <div className="buttons">
                                <button type="submit" className="button primary">
                                Publish Walk
                                </button>
                            </div>
                            </form>
                        </div>
                    )}

            
                    {currentStep === 'walk uploaded' && (
                        <div className="upload-success section">
                            {/* title bar */}
                            <h2 className="section-subtitle">Walk Published!</h2>

                            {/* form wrapper to match other steps */}
                            <form className="form">
                            {/* scrollable message area */}
                            <div className="inputs">
                                <p style={{ fontSize: '20px', color: '#555', textAlign: 'center' }}>
                                🎉 Your walk <span>{finishingForm.title}</span> has been successfully published! Thanks for sharing your route.
                                </p>
                            </div>

                            {/* pinned button */}
                            <div className="buttons">
                                <Link to="/home" className="button primary">
                                Back to Home
                                </Link>
                            </div>
                            </form>
                        </div>
                    )}
                    {isPopupOpen === true && (
                        <div className='popup-container'>
                            <div className='popup'>
                                <div className='close-container'>
                                    <img src={close} onClick={() => {setIsPopupOpen(false)}}/>
                                </div>
                                <p>
                                    Go to https://maps.google.com and search for your step location.<br/><br/>
                                    Click the Share button (three dots connected with lines) in the sidebar.<br/><br/>
                                    Switch to the “Embed a map” tab.<br/><br/>
                                    Click “Copy HTML” to copy the iframe code.<br/><br/>
                                    Paste the iframe snippet into the box.
                                </p>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
}

export default CreateWalk;