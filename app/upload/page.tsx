'use client'

import Link from 'next/link';
import { FormEvent, useRef, useState } from 'react';
import { Template } from '@/components';
import { useImageService } from '@/resource/service';

export default function UploadPage() {
  const imageService = useImageService();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tagsText, setTagsText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleFileChange(selectedFile: File | null) {
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess(false);

    const imageName = name.trim();
    const tags = tagsText
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!imageName) {
      setError('Informe o nome da imagem.');
      return;
    }

    if (!file) {
      setError('Selecione um arquivo de imagem.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 20 MB.');
      return;
    }

    if (tags.length === 0) {
      setError('Informe pelo menos uma tag.');
      return;
    }

    setIsLoading(true);

    try {
      await imageService.enviar(file, imageName, tags);

      setSuccess(true);
      setName('');
      setFile(null);
      setPreview(null);
      setTagsText('');
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (err) {
      console.error('Erro ao enviar imagem:', err);
      setError('Erro ao enviar a imagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Template>
      <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
        <div className="w-full max-w-lg p-6 bg-gray-800 rounded-xl shadow-md border border-gray-700">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Enviar imagem
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-950/60 border border-red-800 text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-950/60 border border-green-800 text-green-200 rounded-lg text-sm">
              Imagem enviada com sucesso!
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Nome da imagem
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-700 bg-gray-900 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                placeholder="Ex: Fotos antigas"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Arquivo (PNG, JPG, JPEG ou GIF; máximo de 20 MB)
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                className="w-full border border-gray-700 bg-gray-900 rounded-lg p-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
              />
            </div>

            
            {preview && (
              <div className="mt-3 flex flex-col items-center justify-center p-3 bg-gray-900/60 border border-gray-700 rounded-lg">
                <p className="text-xs font-medium text-gray-400 mb-2">Pré-visualização:</p>
                <img
                  src={preview}
                  alt="Pré-visualização da imagem"
                  className="max-h-56 w-auto object-contain rounded-md border border-gray-700 shadow"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Tags separadas por vírgula
              </label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                className="w-full border border-gray-700 bg-gray-900 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                placeholder="natureza, viagem"
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
                'Enviar imagem'
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