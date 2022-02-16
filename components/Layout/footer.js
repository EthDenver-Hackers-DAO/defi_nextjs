import React from 'react';
import Image from 'next/image';
import TwitterLogo from '../../public/assets/home-twitter-logo.png';
import MediumLogo from '../../public/assets/home-medium-logo.png';

const Footer = ({ children }) => {
  return (
    <footer className="">
      <section className="w-full color_main_bg flex justify-center">
        <div className="tart_inner sm:my-[90px] my-[45px] flex justify-between">
          <div className="flex flex-col justify-between">
            <p className="sm:font-extrabold font-bold sm:text-[34px] text-[20px] text-white whitespace-pre-line sm:leading-10 leading-7">
              {`[Project Description]`}
            </p>
            <p className="font-medium sm:text-[18px] text-[15px] text-white whitespace-pre-line mt-[40px]">
              ©2022 [Project Name]
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              <p className="font-bold sm:text-[18px] text-[15px] text-white">
                Follow Us
              </p>
              <div className="flex items-center">
                <div className="w-[25px] h-[25px] transition-all hover:scale-105 cursor-pointer flex justify-center items-center">
                  <Image src={TwitterLogo} alt="sms" />
                </div>
                <a
                  className="w-[25px] h-[25px] ml-[10px] transition-all hover:scale-105 cursor-pointer flex justify-center items-center"
                  href="https://medium.com/@contact_38668"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image src={MediumLogo} alt="sms" />
                </a>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="font-bold sm:text-[18px] text-[15px] text-white">
                Contact Us
              </p>
              <a
                className="font-medium sm:text-[16px] text-[14px] text-white transition-all hover:scale-105"
                href="mailto:contact@tart.cafe"
              >
                contact@tart.cafe
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
