import React from 'react'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios'

// 454311245670-0in22j1hu72nkl2qrvjdna4i8qhnq7oo.apps.googleusercontent.com
// mU0JhXdIM7B0proyz0Jyw_R9

// 866939400587532
// 2fbb43305a9fa06ed9f993f375a188c5

function SocialLogin() {

    const responseGoogle = async (response) => {
        console.log(response)
        // try {
        //     const { data } = await axios.post('http://localhost:4000/api/googlelogin', { tokenId: response.tokenId })

        // consol.log(data)

        // } catch (error) {
        //     if (error) {
        //         console.log(error)
        //     }
        // }
    }

    const responseFacebook = async (response) => {
        console.log(response)
        try {
            const { data } = await axios.post('http://localhost:4000/api/facebooklogin', { accessToken: response.accessToken, userID: response.userID })

            consol.log(data)
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <div>
                <h1>Social Login</h1>
                <GoogleLogin
                    clientId="454311245670-0in22j1hu72nkl2qrvjdna4i8qhnq7oo.apps.googleusercontent.com"
                    buttonText="Login With Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
            <div>
                <FacebookLogin
                    appId="866939400587532"
                    autoLoad={false}
                    callback={responseFacebook}
                />
            </div>
        </div>

    )
}

export default SocialLogin
