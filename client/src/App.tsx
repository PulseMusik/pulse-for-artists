import { Routes, Route } from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Layout from './components/layout/Layout'
import Home from './pages/dashboard/Home'

const App = () => {
    return (
        <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    )
}

export default App