'use client';

interface PrimeiroComponenteProps {
	mensagem: string;
	mensagemBotao?: string;
}
export const PrimeiroComponente = ({ mensagem, mensagemBotao }: PrimeiroComponenteProps) => {
	
	const clique = () => {
		console.log("Clicou no botão")
		alert(mensagemBotao)
	}

	return (
		<div>
			<h1>Primeiro Componente</h1>
			<p>{mensagem}</p>
			<button onClick={clique}>Clique aqui</button>
		</div>
	)
}
