import React from 'react'
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="ExploreMenu">
        <h2>Explore Our Menu</h2>
         <p className='explore-menu-text'>Choose from a diverse menu of restaurants and cuisines, delivered straight to your doorstep
        our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <div className="ExploreMenu-list">
                      {
                      menu_list.map((item, idx) => (
                        
            
                        <div  onClick={()=> setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}       key={idx} className="menu-item">
                          <img className={category===item.menu_name? "active":""} src={item.menu_image} alt={item.menu_name} />
                          <p>{item.menu_name}</p>
                        </div>
                    ))}
        </div>
        <hr></hr>
    </div>
  )
}

export default ExploreMenu