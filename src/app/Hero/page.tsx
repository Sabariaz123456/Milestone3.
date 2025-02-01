import Image from 'next/image'
import React from 'react'
import image from '../../../Public/Images/maleoutfit.jpg'

const Hero = () => {
  return (
    <div className='border-2 rounded-xl'>

<section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Shopping
      </h1>
      <p className="mb-8 leading-relaxed">A male outfit typically combines style, comfort, and functionality. It can range from formal attire like suits, <br></br>dress shirts, and trousers to casual wear such as jeans, t-shirts, and jackets. Accessories like belts, shoes, and watches often complement the look, adding a touch of personality..</p>
      <div className="flex justify-center">
        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-400 rounded text-lg">Shop Now</button>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <Image height={600} width={1400} className="object-cover object-center rounded" src={image} alt={'iamge'} />
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero