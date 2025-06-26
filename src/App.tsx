import './App.css'
import Grid from './components/Grid'
import UseActionState from './components/UseActionState'
import UseCallback from './components/UseCallback'
import UseContext from './components/UseContext'
import UseDebugValue from './components/UseDebugValue'

function App() {
  return (
    <main className='w-full flex flex-col gap-9 mb-9'>
      <h1>React 2025 (v19.1.0)</h1>
      <Grid className='gap-6 w-full'>
        <UseActionState />
        <UseCallback/>
        <UseContext/>
        <UseDebugValue/>
      </Grid>
    </main>
  )
}

export default App
