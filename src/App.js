import Home from './components/routes/home/Home'
import Authorization from './components/Authorization/Authorization'
import Navigation from './components/navigation/Navigation'
import { Routes, Route } from 'react-router-dom'
import Shop from './components/routes/shop/Shop'
import CheckOut from './components/check-out/CheckOut'


const Isusu = () => {
  return (
    <div>I am a isusu!</div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route element={<Shop />} path='shop/*' />
        <Route element={<Isusu />} path='i' />
        <Route element={<Authorization />} path='auth' />
        <Route element={<CheckOut />} path='checkout' />
      </Route>
    </Routes>
  );
}

export default App;
