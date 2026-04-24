import heroImg from './assets/hero.png'
import './App.css'
import { HomeNavBar } from './components/ui/HomeNav'
import CustomFooter from './components/layouts/CustomFooter'

// Use school colours

function App() {

  return (
    <div className="min-h-screen bg-amber-600 text-white select-none">
      <div>
        <HomeNavBar></HomeNavBar>
      </div>
        
      <div className="pt-20 px-2">
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-10 gap-10 bg-yellow-500 rounded-lg shadow-lg">
          <div className="text-center lg:text-left text-gray-800 ">
            <p className="text-6xl font-bold mb-6 text-shadow-emerald-200 text-shadow-md">Break Your Routine, Seize the Day!</p>
            <p className="text-2xl mb-8">Discover new activities, connect with like-minded people, and make every day an adventure.</p>
            <a href="/Demo" className="bg-purple-500 hover:bg-teal-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">Explore Now I NEED A LINK</a>
          </div>
          <div>
            <img src={heroImg} alt="Hero" className="w-full max-w-md rounded-lg shadow-lg bg-amber-400" />
          </div>
        </div>
        <div className="mt-5 text-center bg-yellow-500 rounded-lg shadow-lg p-10">
          <h2 className="text-4xl font-bold mb-2 text-gray-800"><b>"Carpe diem. Seize the Day, [...]. Make your lives extraordinary!"</b></h2>
          <p className='text-lg font-semibold mb-4 text-gray-600'><i>- John Keatings played by Robin Williams</i></p>
          <p className="text-xl mb-8 text-gray-700">This phrase is from the movie "Dead Poets Society" directed by Peter Weir, where it represents the idea of seizing opportunities and living life to the fullest.</p>
          <a href="/Demo" className="bg-purple-500 hover:bg-teal-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">Explore Now I NEED A LINK</a>
          <img src={heroImg} alt="Hero" className="w-full max-w-md rounded-lg shadow-lg bg-amber-400 mt-10 mx-auto" />
          <p className="text-lg mt-2 text-gray-600"><b>Image of John Keatings saying "Seize the Day!"</b></p>
        </div>
        <div className="mt-5 text-center bg-yellow-500 rounded-lg shadow-lg p-10">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Why Choose Us?</h2>
          <p className="text-xl mb-8 text-gray-700">We provide a platform that encourages you to step out of your comfort zone and try new things. Whether it's a new hobby, a local event, or a unique experience, we've got you covered.</p>
          <a href="/about" className="bg-green-500 hover:bg-teal-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">Learn More I NEED A LINK</a>
        </div>
      </div>
      <div>
        <CustomFooter></CustomFooter>
      </div>
    </div>
  )
}


export default App
