import React from 'react';
import Header from '../../Components/Header';
import Image from 'next/image';
import { about } from '../images/index'
const About = () => {
  return (
    <section id='about' className='font-Poppins'>
      {/*<hr className="border-t-10 border-green-500" />*/}
      <div className='font-sans gap-4 mx-4 lg:mx-40 mt-6 mb-4 lg:mb-8' style={{ borderTop: '5px solid #ffff00', color: 'white' }}>
        {/* Content of the About section goes here */}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          <div className='col-span-2 text-left text-xl'>
            <h2 className='text-left text-5xl my-4 py-2 font-Merriweather ' style={{ color: '#ffff00' }}>About me</h2>
            <p className='text-left'>
            Many people wonder why I chose a career in development. I strongly believe that if you have the ambition to learn a skill, you can change the world. Driven by this belief, I earned my bachelor's degree and delved into the world of programming, creating numerous web and mobile applications. My mantra, ‘Work makes me real and necessary’, sums up my dedication to my profession in one phrase. After earning my bachelor's degree, I started my journey as a full-stack developer and accumulated five years of valuable experience. Mastering different programming languages wasn't always easy, but I persevered and took on each challenge. Currently, I am proficient in various languages, including C++, Java, Ruby on Rails, Python, JavaScript, TypeScript, C#, and PHP. In full-stack development, he specializes in React, ReactNative, Ionic Framework, Next.js, Node.js, Express.js, Nest.js, PHP, Laravel, Java, MongoDB, Firebase, Vue, and Angular. My skill set goes beyond mere technical proficiency. I am committed to providing excellent service and earning my customers' trust. This dedication allows me to continually hone my skills and keep up with industry trends. Personally, my development journey was sparked by my childhood interest in technology. Growing up, I spent countless hours tinkering with computers and teaching people how to code. This passion eventually blossomed into a fulfilling career that provides new opportunities for growth and innovation every day. In addition to my professional endeavors, I am a passionate advocate for diversity and inclusion in the tech industry. I actively mentor aspiring developers and strive to create a more equitable and welcoming environment for everyone. As I continue my journey, I remain steadfast in my belief that we have an important role to play in shaping the future of technology. I am determined to make my mark and inspire others to do the same through hard work, determination, and love of coding. Thank you for visiting my profile.

            </p>
            <p className='my-2 text-left'>
              <strong className='font-Merriweather' style={{ color: "#ffff00" }}>Core Skills:</strong>
              <br />
              ReactNative, IonicFramework,Angular.js,Android,Java,Flutter,Three.js,WebGL,Web3.js, React.js, Next.js, Node.js, MongoDB,Firebase, Block Chain
            </p>

            <p className='my-2 text-left'>
              <strong className='font-Merriweather' style={{ color: "#ffff00" }}>Hobbies:</strong>
              <br />
              Beyond the world of coding, I find joy in the simplicity of life. In my free time, you'll often find me enjoying the tranquility of swimming, immersing myself in captivating movies and series, and cherishing moments spent with my close circle.
            </p>

            <p className='text-left'>
              Let's connect and explore the possibilities together!
            </p>
          </div>

          <div className='md:col-span-1 lg:col-span-1 flex items-center justify-center my-8'>
            <Image
              src={about}
              width={500}
              height={500}
              alt="About Image"
              layout="fixed"
              objectFit="cover"
              objectPosition="center center"
              className='about-image rounded-full mx-auto md:w-500 md:h-500 lg:w-96 lg:h-96 xl:w-120 xl:h-120'  // Add rounded styling if needed
            />
            {/* Additional content or styling for the image */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;