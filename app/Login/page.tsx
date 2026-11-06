'use client'

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Template } from '@/components';

export default function LoginPage() {
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

    if (!name.trim()) {
      setError('Informe o seu nome.');
      return;
    }

    if (!email.trim()) {
      setError('Informe o seu e-mail.');
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
      console.log('Dados submetidos:', { name, email, password });
      
      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Erro ao registar:', err);
      setError('Ocorreu um erro ao criar a conta. Tente novamente.');
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
              Conta criada com sucesso!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-700 bg-gray-900 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                placeholder="Seu nome completo"
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
                Palavra-passe (Senha)
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

          <div className="mt-6 text-center">
            <Link
              href="/galeria"
              className="text-sm font-semibold text-purple-400 hover:text-purple-300 underline transition-colors"
            >
              Voltar para a galeria
            </Link>
          </div>
        </div>
      </section>
    </Template>
  );
}