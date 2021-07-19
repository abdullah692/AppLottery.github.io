import React from 'react'

const Home=({handleLogout})=>{


return(
    <div>

<nav>
            <h2>Welcome</h2>
            <button onClick={handleLogout}>Logout</button>
            </nav>
    </div>
)
}

export default Home
