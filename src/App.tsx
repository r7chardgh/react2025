
import './App.css'
import Grid from './components/Grid'
import Section from './components/Section'
import UseActionState from './components/hooks/UseActionState'
import UseCallback from './components/hooks/UseCallback'
import UseContext from './components/hooks/UseContext'
import UseDebugValue from './components/hooks/UseDebugValue'
import UseDeferredValue from './components/hooks/UseDeferredValue'
import UseEffect from './components/hooks/UseEffect'

function App() {
  return (
    <main className='relative w-full flex flex-col gap-9 mb-9 pt-24'>

      <h1>React 2025 (v19.1.0) WIP</h1>
      <p>last updated: Fri JUL 26 2025 00:58:50 GMT+0800</p>
      <Section title='HOOKS'>
        <Grid className='gap-18 sm:gap-6 w-full'>
          <UseActionState />
          <UseCallback />
          <UseContext />
          <UseDebugValue />
          <UseDeferredValue />
          <UseEffect />
        </Grid>
      </Section>
    </main>
  )
}

export default App
