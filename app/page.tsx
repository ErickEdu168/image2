import {PrimeiroComponente} from "./components/PrimeiroComponente";

export default function Home() {
  return (
    <div>
      <main>
        <PrimeiroComponente mensagem="Esta é uma mensagem passada como propriedade para o PrimeiroComponente." />
      </main>
    </div>
  )
}
