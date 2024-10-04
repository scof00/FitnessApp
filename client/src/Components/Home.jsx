export const Home = ({currentUser}) => {
    return(
        <div className="main">
            Welcome <b>{currentUser.username}</b>,
            <br></br>
            would you like to begin workout?
        </div>
    )
}