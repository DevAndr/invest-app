import {getProfile} from "@/actions";

interface ProfilePageProps {
    params: {
        id: string
    }
}
export default async function ProfilePage({params}: ProfilePageProps) {
    const profileData = await getProfile(params.id)
    console.log(profileData)
    console.log(params)

    return (
        <>
            <h1>Profile</h1>
            <div>
                <ul>
                    <li>{profileData?.id}</li>
                    <li>{profileData.name}</li>
                    <li>{profileData?.company.name}</li>
                </ul>
            </div>
            <p>This page are for profile</p>
        </>
    )
}

