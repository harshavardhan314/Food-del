import React from 'react'
import './appdownload.css'
import { assets } from '../../assets/assets'
const Appdownload = () => {
  return (
    <div className="appdownload">
        
            <p>For better Exprience Download <br></br>Tomato App</p>
            <div className="app-images">
                
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
     
    </div>
  )
}

export default Appdownload