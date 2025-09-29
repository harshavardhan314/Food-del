import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Fooditems from '../../components/Fooddisplay/Fooddisplay'
import Fooddisplay from '../../components/Fooddisplay/Fooddisplay'
const Home = () => {

  const [category, setCategory] = React.useState('All');
  return (
    <div>
        <Header></Header>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <Fooddisplay></Fooddisplay>
        
        
    </div>
  )
}

export default Home