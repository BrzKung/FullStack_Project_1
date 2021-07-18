import React from 'react'
import { Segment, Grid, Divider } from 'semantic-ui-react'
import NormalLogin from '../component/NormalLogin'
import SocialLogin from '../component/SocialLogin'


function Login() {
    return (
        <Segment placeholder >
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Column>
                    <NormalLogin />
                </Grid.Column>

                <Grid.Column verticalAlign='middle'>
                    <SocialLogin />
                </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>
        </Segment>
    )

}

export default Login
