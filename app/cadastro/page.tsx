'use client'

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Template } from '@/components';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess(false);

    // Validações dos campos
    if (!name.trim()) {
      setError('Por favor, informe o seu nome.');
      return;
    }

    if (!email.trim()) {
      setError('Por favor, informe o seu e-mail.');
      return;
    }

    if (password.length < 6) {
      setError('A palavra-passe deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As palavras-passes não coincidem.');
      return;
    }

    setIsLoading(true);

    try {
      // Exemplo: Chamar o serviço de envio dos dados do novo utilizador
      console.log('Registo submetido com sucesso:', { name, email, password });

      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Erro ao registar conta:', err);
      setError('Erro ao criar a conta. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Template>
      <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-md border border-gray-700">
          <h1 className="text-2xl font-bold text-white mb-6 text-center uppercase tracking-wider">
            Criar Conta
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-950/60 border border-red-800 text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-950/60 border border-green-800 text-green-200 rounded-lg text-sm">
              Conta criada com sucesso! Já pode iniciar sessão.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-700 bg-gray-900 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                placeholder="Ex: Maria Silva"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-700 bg-gray-900 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                placeholder="seu.email@exemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Palavra-passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-700 bg-gray-900 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Repetir Palavra-passe
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-700 bg-gray-900 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                'Cadastrar'
              )}
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-2 text-sm">
            <Link
              href="/login"
              className="font-medium text-gray-400 hover:text-white transition-colors"
            >
              Já tem uma conta? <span className="text-purple-400 hover:underline">Iniciar sessão</span>
            </Link>

            <Link
              href="/galeria"
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 underline transition-colors mt-2"
            >
              Voltar para a galeria
            </Link>
          </div>
        </div>
      </section>
    </Template>
  );
}