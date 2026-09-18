'use client'

//import { Template } from '../components/Template';
//import { ImageCard } from '../components/Image';
import { Template, ImageCard, } from '@/components';
import { ImageService, useImageService } from '@/resource/service';
import { Image } from '@/resource/service';
import { useState } from 'react';




export default function Galeria() {

  const useService = useImageService()
  const [images, setImages] = useState<Image[]>([])
  const[query, setQuery] = useState<string>('')
  const[extension, setExtension] = useState<string> ('')
  
  async function searchImages() {
    const result = await useService.buscar();
    setImages(result);
    console.table(result)
  }

  /*renderizando a imagem na tela*/
  function renderImageCard(image: Image ) {
    return (
      <ImageCard imageName = {image.name} 
                 imageUrl={image.url}
                 imageSize = {image.size}
                 uploadDate={image.uploadDate} />
    )
  }

  function renderImageCards() {
    //return images.map((image) => renderImageCard(image));
    return images.map(renderImageCard);
  }

  return (

    <Template>
      <section className="flex flex-col items-center justify-center my-5">
            <div className="flex space-x-4">
              <input type="text" 
              // 
              className="border px-4 py-2 rounded-lg text-gray-900" placeholder="Buscar imagens..." />
              <select className="border px-4 py-2 rounded-lg text-gray-900">
                <option value="">All formats</option>
                <option value="">PNG</option>
                <option value="">JPG</option>
                <option value="">GIF</option>
                <option value="">JPEG</option>
              </select>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={searchImages}>Search </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Add New </button>
            </div>
        </section>
    </Template>

  )
}