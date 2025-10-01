import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Fooddisplay from '../../components/Fooddisplay/Fooddisplay'
import Appdownload from '../../components/Appdownload/Appdownload'

const Home = () => {
  const [category, setCategory] = React.useState('All');

  return (
    <div id="top">
      <Header />

      {/* Menu Section */}
      <section id="menu">
        <ExploreMenu category={category} setCategory={setCategory}/>
        <Fooddisplay category={category} />
      </section>

      {/* Mobile App Section */}
      <section id="mobile-app">
        <Appdownload />
      </section>
    </div>
  )
}

export default Home
