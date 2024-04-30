import Auth from "./Auth/auth"
import { Routes, Route } from 'react-router-dom'
import Messenger from "./Messenger/messenger"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="mess" element={<Messenger />} >
      </Route>
    </Routes>
  )
}

export default App
