import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='bg-dark border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='lien self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              Mon
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Projet
              </span>

            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='/about'
                  target='_self'
                  rel='noopener noreferrer'
                >
                  About Us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/AGOURRAMSihame'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='https://discord.com/'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Copyright"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://web.facebook.com' icon={BsFacebook} />
            <Footer.Icon href='https://www.instagram.com/' icon={BsInstagram} />
            <Footer.Icon href='https://twitter.com/' icon={BsTwitter} />
            <Footer.Icon href='https://github.com/AGOURRAMSihame' icon={BsGithub} />


          </div>
        </div>
        <div className='mt-6'>
        <iframe
    title='Entreprise location'
    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.842153990221!2d-9.604494784785093!3d30.406250381763786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa57f26ed4e378c4!2sAmicales%20Agadir!5e0!3m2!1sen!2suk!4v1620050931867!5m2!1sen!2suk'
    className='w-full h-[150px]'
></iframe>

        </div>
      </div>
    </Footer>
  );
}