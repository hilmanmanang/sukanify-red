import React from 'react'
import { useSelector } from 'react-redux';

function Profile() {
    const profileData = useSelector((state: any) => state.profile.profile);
    console.log(profileData)

    return (
        <div className='m-8'>
            <div className='font-semibold text-2xl'>
                Welcome {profileData?.display_name}
            </div>
        </div>
    )
}

export default Profile
