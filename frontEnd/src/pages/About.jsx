import React from 'react'

const About = () => {
  return (
    <div className='py-10 md:py-20 px-4'>
      <div className='max-w-screen-md mx-auto'>
        <h1 className='font-bold text-3xl md:text-4xl text-center md:text-start pt-10 text-blue-950 underline'>About Us</h1>
        <div className='flex flex-col text-start'>
          <p className='my-4 md:mx-0'>
            BlogLink is a website dedicated to those who create and maintain websites: web developers, web designers, webmasters, and so on.
          </p>
          <p className='my-4 md:mx-0'>
            Our aim is to make web development easier and more fun by providing high-quality resources and useful tutorials to our readers. The website has been founded in June 2008. The name "BlogLink" came from the founder’s immoderate love for these sweet, friendly, and funny animals.
          </p>
          <p className='my-4 md:mx-0'>
            BlogLink provides free guides, tutorials, and articles about web development, WordPress, and web design. All content on the site is free of charge for our readers.
          </p>
          <p className='my-4 md:mx-0'>
            In addition to articles, we also provide exclusive deals, coupons, and discounts on hosting, WordPress Themes, and everything else that can be useful to bloggers, web developers, and designers.
          </p>
        </div>
      </div>
    </div>

  )
}

export default About