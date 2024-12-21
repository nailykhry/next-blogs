'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 text-white">
        <div className="max-w-6xl px-6 py-12 mx-auto">
          {/* Header Section */}
          <section className="text-center">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-[#4c24e5]">
              About InkSpire
            </h1>
            <p className="mt-4 text-black text-md">
              Empowering creativity, inspiring minds, and shaping the future of
              innovation.
            </p>
          </section>

          {/* Mission Section */}
          <section className="grid grid-cols-1 gap-12 mt-16 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              <p className="mt-4 leading-relaxed text-black">
                InkSpire is a platform dedicated to nurturing creativity and
                innovation. We believe in the power of ideas and aim to provide
                tools, resources, and a community that empowers individuals to
                turn their visions into reality.
              </p>
            </div>
            <Image
              src="/image/creative.png"
              alt="Our Mission"
              layout="intrinsic"
              width={400}
              height={300}
            />
          </section>

          {/* Vision Section */}
          <section className="grid grid-cols-1 gap-12 mt-16 md:grid-cols-2">
            <Image
              src="/image/creative2.png"
              alt="Our Vision"
              layout="intrinsic"
              width={400}
              height={300}
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              <p className="mt-4 leading-relaxed text-black">
                We envision a world where creativity knows no bounds. Our goal
                is to become the go-to platform for creators, innovators, and
                dreamers, helping them unlock their potential and shape a
                brighter, more creative future.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-center text-purple-300">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl">
                <h3 className="text-xl font-semibold text-[#4c24e5]">
                  Creativity
                </h3>
                <p className="mt-2 text-black">
                  Encouraging unique ideas and innovative thinking in everything
                  we do.
                </p>
              </div>
              <div className="p-6 transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl">
                <h3 className="text-xl font-semibold text-[#4c24e5]">
                  Collaboration
                </h3>
                <p className="mt-2 text-black">
                  Building a strong community by fostering teamwork and mutual
                  growth.
                </p>
              </div>
              <div className="p-6 transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl">
                <h3 className="text-xl font-semibold text-[#4c24e5]">
                  Integrity
                </h3>
                <p className="mt-2 text-black">
                  Acting with honesty, transparency, and a commitment to our
                  values.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-16 text-center">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
              Join Us in Inspiring the Future
            </h2>
            <p className="mt-4 text-black text-md">
              Be part of a global movement to inspire creativity and innovation.
            </p>
            <a
              href="/auth/register"
              className="inline-block px-6 py-3 mt-6 text-md font-medium text-white transition-opacity rounded-lg shadow-lg bg-gradient-to-r hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5] bg-[#4c24e5]"
            >
              Join Now
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
