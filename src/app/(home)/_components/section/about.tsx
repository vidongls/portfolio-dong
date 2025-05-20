import React from 'react'
import { SectionWrapper } from './section-wrapper'
import Link from 'next/link'
import Image from 'next/image'

export const AboutSection = () => {
  return (
    <SectionWrapper
      title='About me'
      id='about'
      className='flex items-end justify-between gap-8'
    >
      <div className='space-y-32'>
        <p className='text-cod-gray-950 text-3xl leading-12 font-medium'>
          Hi, I'm Dong. My objective is to become a skilled developer proficient
          in both client-side and server-side JavaScript. In the short term, I
          aim to enhance my skills and gain valuable experience within my
          current company.
        </p>
        <ul className='flex gap-12'>
          <li className='text-secondary text-base leading-6 font-medium'>
            Front-end <br />
            Developer
          </li>
          {/* <li>
            <li className='text-secondary text-base leading-6 font-medium'>
              Say hello <br />
              <Link href='mailto:vidongls12345@gmail.com' className='flat-btn'>
                vidongls12345@gmail.com
              </Link>
            </li>
          </li> */}

          <li>
            <br />
            <Link
              href='https://t.me/ivgnod'
              target='_blank'
              rel='noopener noreferrer'
              className='text-secondary flat-btn-full flex items-center gap-2 text-base leading-6 font-medium'
            >
              Telegram{' '}
              <Image
                src='/icons/explore.svg'
                alt='explore'
                width={10}
                height={10}
              />
            </Link>
          </li>

          <li>
            <br />
            <Link
              href='https://www.linkedin.com/in/ivgnod'
              target='_blank'
              rel='noopener noreferrer'
              className='text-secondary flat-btn-full flex items-center gap-2 text-base leading-6 font-medium'
            >
              Explore LinkedIn{' '}
              <Image
                src='/icons/explore.svg'
                alt='explore'
                width={10}
                height={10}
              />
            </Link>
          </li>
        </ul>
      </div>

      <p className='text-secondary flex-shrink-0 pr-24 text-[22px] leading-9 font-medium'>
        “Code Hard, Bugs Run Away!”
      </p>
    </SectionWrapper>
  )
}
