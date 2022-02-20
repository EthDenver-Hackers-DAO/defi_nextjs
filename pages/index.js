import Layout from '../components/Layout/layout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Particles from 'react-tsparticles';
import PARTICLES from '../utils/particles';
import { useResizeDetector } from 'react-resize-detector';

// export async function getStaticProps(context) {
//   return {
//   };
// }

const Home = (props) => {
  const innerPadding = 10 * 2;
  const { width, ref } = useResizeDetector({
    handleHeight: false
  });

  const padding = 10;

  return (
    <Layout>
      <Particles id="tsparticles" options={PARTICLES.STARTS} />
      <div className="h-[30px]" />
      <section
        className="taurus_inner min-h-[100px] z-10 flex  justify-between"
        ref={ref}
      >
        <ValueItem
          width={(width - padding * 3) / 4}
          title={'Total Value Locked'}
          content={'$ 129,330,770'}
        />
        <ValueItem
          width={(width - padding * 3) / 4}
          title={'Total Suplied'}
          content={'$ 129,330,770'}
        />
        <ValueItem
          width={(width - padding * 3) / 4}
          title={'Total Borrowed'}
          content={'$ 129,330,770'}
        />
        <ValueItem
          width={(width - padding * 3) / 4}
          title={'Taurus'}
          content={'$ 2'}
        />
      </section>
    </Layout>
  );
};

const ValueItem = (props) => {
  const { width, title, content } = props;
  return (
    <div
      className={`flex flex-col h-full p-[15px] justify-between color_sub2_bg rounded-md transition-all hover:scale-105`}
      style={{
        width
      }}
    >
      <p className="color_gray lg:text-[20px] md:text-[18px] text-[16px]">
        {title}
      </p>
      <p className="color_main_c lg:text-[25px] md:text-[23px] text-[20px] lg:font-semibold font-medium">
        {content}
      </p>
    </div>
  );
};

export default Home;
