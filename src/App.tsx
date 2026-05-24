import './App.css'
import CalculatorDisplay from './components/CalculatorDisplay'
import CalculatorKeypad from './components/CalculatorKeypad'
import { BUTTONS } from './constants/calculator'
import { useCalculator } from './hooks/useCalculator'
function App() {
  const { displayValue, pendingOperator, handleButtonPress } = useCalculator()
  return (
    <main className="app-shell">
      <section className="calculator" aria-label="Calculadora estilo iOS">
        <CalculatorDisplay displayValue={displayValue} />
        <CalculatorKeypad buttons={BUTTONS} activeOperator={pendingOperator} onButtonPress={handleButtonPress} />
      </section>
    </main>
  )
}
export default App
