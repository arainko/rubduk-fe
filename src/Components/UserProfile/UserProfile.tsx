import React from 'react';
import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useState } from 'react';
import { UserAPI } from '../../Api/UserAPI';
import ProfileCard from '../ProfleCard/ProfileCard';
import PostArea from '../PostArea/PostArea';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

const UserProfile = () => {
    
    const [user, setUser] = useState<any>([]);

    useEffect(() => {
        trackPromise(
            UserAPI.fetchUserWithId(1)
            .then((downloadedUser) => {
                setUser(downloadedUser)
            })
        )
    }, []);

    return (
        <div id={"user-info"}>
            <div id={"profile-card"}>
                {<ProfileCard name={user.name} lastName={user.lastName} createdOn={user.createdOn}/>}
            </div>
            <div id={"post-area"}>
                {<PostArea userId={user.id} userName={user.name} userLastName={user.lastName}/>}
            </div>
            <LoadingSpinner/>
        </div>
    )
}

export default UserProfile;