import './App.css'
import { Scene } from './components/Scene/Scene'
import { Calendar } from './components/Calendar/Calendar'
import { useCalendar } from './hooks/useCalendar'
import { useSeason } from './hooks/useSeason'

function App() {
  const calendar = useCalendar()
  const { season } = useSeason(calendar.month)

  return (
    <Scene season={season}>
      <Calendar {...calendar} />
    </Scene>
  )
}

export default App
