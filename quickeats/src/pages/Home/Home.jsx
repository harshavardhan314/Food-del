import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Fooditems from '../../components/Fooddisplay/Fooddisplay'
import Footer from '../../components/Footer/Footer'
import Fooddisplay from '../../components/Fooddisplay/Fooddisplay'
import Appdownload from '../../components/Appdownload/Appdownload'
const Home = () => {

  const [category, setCategory] = React.useState('All');
  return (
    <div>
        <Header></Header>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <Fooddisplay category={category}></Fooddisplay>
        <Appdownload></Appdownload>
        
        
    </div>
  )
}

export default Home