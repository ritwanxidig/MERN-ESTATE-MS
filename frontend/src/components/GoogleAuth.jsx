import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useSignWithGoogleMutation } from '../app/services/api';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../app/reducers/auth.slice.js'
import { useNavigate } from 'react-router';

const GoogleAuth = () => {
    const [signWithGoogle] = useSignWithGoogleMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const { displayName, email, photoURL } = result.user;
            await signWithGoogle({ name: displayName, email, photo: photoURL }).unwrap().then(res => {
                console.log(res);
                signInSuccess(res);
                // navigate('/')
            }).catch(er => { console.log(res); signInFailure(er) })

        } catch (error) {
            console.log("could not sign in with google", error)
        }
    }
    return (
        <button type='button' onClick={handleGoogleClick} className='button-design bg-green-500 text-white'> Continue with Google </button>
    )
}

export default GoogleAuth