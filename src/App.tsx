import { lazy, Suspense, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import reactLogo from './assets/svgs/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'antd'

const Home = lazy(() => import('./views/Home'))
const Detail = lazy(() => import('./views/Detail'))
const Introduction = lazy(() => import('./views/Introduction'))
const routerLinks = ['/', 'detail', 'introduction']

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  const handleClick = () => {
    setCount((count) => count + 1)
    routerLinks[count] && navigate(routerLinks[count])
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button type="primary" onClick={handleClick}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

      <Suspense>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="detail" Component={Detail} />
          <Route path="introduction" Component={Introduction}>
            <Route path="messages/:id" Component={Detail} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
