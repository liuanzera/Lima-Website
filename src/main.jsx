import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import App from './App.jsx'
import './index.css'
import { EASE } from './motion-tokens.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Motion defaults to ignoring the OS setting; "user" is what actually
        honours prefers-reduced-motion across every component. */}
    <MotionConfig reducedMotion="user" transition={{ ease: EASE }}>
      <LazyMotion features={domAnimation} strict>
        <App />
      </LazyMotion>
    </MotionConfig>
  </StrictMode>,
)
