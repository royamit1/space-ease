'use client'

import Script from 'next/script'
import {createClient} from '@/utils/supabase/client'
import {CredentialResponse} from 'google-one-tap'
import {useRouter} from 'next/navigation'

const OneTapComponent = () => {
    const router = useRouter()

    // generate nonce to use for google id token sign-in
    const generateNonce = async (): Promise<string[]> => {
        const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
        const encoder = new TextEncoder()
        const encodedNonce = encoder.encode(nonce)
        const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

        return [nonce, hashedNonce]
    }


    async function initializeGoogleOneTap() {
        const supabase = createClient()

        console.log('Initializing Google One Tap')
        console.log('Google One Tap loaded')
        const [nonce, hashedNonce] = await generateNonce()
        console.log('Nonce: ', nonce, hashedNonce)

        // check if there's already an existing session before initializing the one-tap UI
        const {data, error} = await supabase.auth.getSession()
        console.log('Session data: ', data)
        if (error) {
            console.error('Error getting session', error)
        }
        if (data.session) {
            console.log('connected: ', data.session.user.email)
            router.push('/')
            return
        }

        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
            nonce: hashedNonce,
            // with chrome's removal of third-party cookiesm, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
            use_fedcm_for_prompt: true,
            prompt_parent_id: "oneTap",
            callback: async (response: CredentialResponse) => {
                console.log('Credential received: ', response)
                try {
                    // send id token returned in response.credential to supabase
                    const {data, error} = await supabase.auth.signInWithIdToken({
                        provider: 'google',
                        token: response.credential,
                        nonce,
                    })

                    if (error) throw error
                    console.log('Session data: ', data)
                    console.log('Successfully logged in with Google One Tap')

                    // redirect to protected page
                    router.push('/')
                } catch (error) {
                    console.error('Error logging in with Google One Tap', error)
                }
            },
        })
        google.accounts.id.prompt() // Display the One Tap UI
    }

    return (
        <>
            <Script src="https://accounts.google.com/gsi/client" async defer onLoad={() => initializeGoogleOneTap()}/>
            <div id="oneTap" className="fixed top-0 right-0 z-[100]"/>
        </>
    )
}

export default OneTapComponent
