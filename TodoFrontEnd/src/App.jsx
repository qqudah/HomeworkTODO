import { useState } from 'react'
import './App.css'
import ListTodoComponents from './components/ListTodoComponents'
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  const [count, setCount] = useState([])

  return (
    <>
    <BrowserRouter>
    <HeaderComponent />
    <Routes>
      <Route path="/" element={<ListTodoComponents />} />
      <Route path="/todos" element={<ListTodoComponents />} />
      
    </Routes>
  
   <FooterComponent />
    </BrowserRouter>

    </>
  )
}

export default App
