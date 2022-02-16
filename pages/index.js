import Layout from '../components/Layout/layout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Particles from 'react-tsparticles';
import PARTICLES from '../utils/particles';

// export async function getStaticProps(context) {
//   return {
//   };
// }

const Home = (props) => {
  return (
    <Layout>
      <div className="w-full relative">
        <Particles id="tsparticles" options={PARTICLES.STARTS} />
        {/* <Particles id="tsparticles" options={PARTICLES.TWINKLE} /> */}
      </div>
    </Layout>
  );
};

export default Home;
