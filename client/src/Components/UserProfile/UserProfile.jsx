import { useEffect, useState } from "react"
import { GetBiometricsByUserId } from "../../Managers/BiometricManager";
import { useNavigate } from "react-router-dom";

export const UserProfile = ({currentUser}) => {
    const [biometrics, setBiometrics] = useState({});
    const navigate = useNavigate();

    console.log(currentUser)

    useEffect(() => {
        GetBiometricsByUserId(currentUser.id).then((data) => setBiometrics(data))
    }, [])
    return (
        <div className="coreComponent">
            <b>{currentUser.username}</b>
            <div>
                <p><b>Age: </b>{biometrics.age}</p>
                <p><b>Height: </b>{biometrics.height}</p>
                <p><b>Weight: </b>{biometrics.weight}</p>
            </div>
            <button className="exerciseButton" onClick={(event) => navigate(`/userprofile/${biometrics.id}`)}>Edit</button>
        </div>
    )
}