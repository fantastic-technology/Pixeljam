import React, { useState, useEffect } from 'react'
import { searchImages } from '../api'
const Page = () => {

const [query, setQuery] = useState('');
const [images, setImages] = useState([]);
const [search, preload] = useState("Search")


const handleSearch = async () => {
  preload("pls wait..")
  const results = await searchImages(query);
  setImages(results);
  preload("Search")
};
const handleTravel = async () => {
  setQuery('travel');
  const results = await searchImages('travel');
  setImages(results);
};
const handlePicnic = async () => {
  setQuery('picnic');
  const results = await searchImages('picnic');
  setImages(results);
};
const handleForest = async () => {
  setQuery('forest');
  const results = await searchImages('forest');
  setImages(results);
};
const handleCars = async () => {
  setQuery('car');
  const results = await searchImages('car');
  setImages(results);
};
const handleDownload = (url) => {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'image.jpg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => alert('Error downloading image'));
};
useEffect(() => {
  const fetchInitialImages = async () => {
    try {
      const results = await searchImages('Graphics');
      setImages(results);
    } catch (error) {
      console.error('Error fetching initial images:', error);
    }
  };

  fetchInitialImages();
}, []);
  return (
    <div className='font-sans bg-black h-[100vh] max-sm:h-[300vh]'>
      <section className='p-[50px] flex flex-col gap-5'>
      <h1 className='flex items-center justify-center font-bold text-lg text-white'>PIXELJAM</h1>
      <a href="https://github.com/Fantastic-tech"><p className='text-blue-600 flex items-center justify-center'>by Abubakar Jamaldeen</p></a>
          <div className='flex items-center justify-center gap-4'>
          <input type="text"
          className='outline-none border-solid bg-white p-[6px] rounded-md w-[30vw] max-sm:w-[50vw] text-black'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
           required name="text" />
          <button className='bg-blue-400 p-[7px] rounded-md max-sm:w-[20vw]' onClick={handleSearch}>{search}</button>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-20 max-sm:gap-10'>
            <button onClick={handleTravel} className='bg-blue-400 text-white p-[10px] rounded-md w-[10vw] max-sm:w-[25vw]'>Travel</button>
            <button onClick={handlePicnic} className='bg-blue-400 text-white p-[10px] rounded-md w-[10vw] max-sm:w-[25vw]'>Picnic</button>
            <button onClick={handleForest} className='bg-blue-400 text-white p-[10px] rounded-md w-[10vw] max-sm:w-[25vw]'>Forest</button>
            <button onClick={handleCars} className='bg-blue-400 text-white p-[10px] rounded-md w-[10vw] max-sm:w-[25vw]'>Car</button>
          </div>
         <div className='flex items-center justify-center'>
         <p className='text-white w-[50vw] max-sm:w-[100vw] text-center flex items-center justify-center'>PixelJam offers a seamless experience for downloading high-quality images. Discover a 
            vast collection of stunning visuals, perfect for your creative projects. With an intuitive
             interface and fast downloads, 
            PixelJam is your go-to source for premium images that inspire and elevate your work.
            </p>
         </div>
      </section>
          <section>
        <div className="flex flex-wrap gap-5 items-center justify-center p-20 bg-blue-400">
        {images.map((image) => (
            <div className='flex flex-col items-start gap-2 bg-black rounded-md pb-2' key={image.id} >
              <img className='rounded-md' width={250} src={image.urls.small} alt={image.description} />
              <button className='bg-white p-[10px] rounded-md' onClick={() => handleDownload(image.urls.full)}>Download</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

 export default Page
