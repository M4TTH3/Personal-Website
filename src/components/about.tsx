'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function About() {
    const photos = [
        '/photo.jpg',
        '/photo1.jpg',
        '/photo2.jpg',
        '/photo3.jpg',
        '/photo4.jpg',
    ];

    return (
        <section
            id="About"
            className="container mt-8 sm:mt-24 p-2 backdrop-blur-sm"
        >
            <h1 className="text-5xl font-bold text-gradient">About</h1>
            <div className="mt-5 py-5 pr-3 sm:px-5 rounded-xl bg-opacity-5 bg-gray-400">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Photo Carousel */}
                    <div className="w-full">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            className="rounded-lg overflow-hidden shadow-lg"
                        >
                            {photos.map((photo, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative w-full h-[400px] sm:h-[500px]">
                                        <Image
                                            src={photo}
                                            alt={`Photo ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* About Text */}
                    <div className="flex flex-col justify-center">
                        <div className="p-6 rounded-xl bg-opacity-10 bg-gray-400 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-gradient mb-4">About Me</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Hi, I'm Matthew, a 4th year Computer Science student at the University of Waterloo.
                                I love to learn new things, and I'm always looking for new challenges
                                I'm interested in distributed systems, languages & compilers, and AI.
                                <br /> <br />
                                I'm currently an intern at Mechanical Orchard, working on creating tools
                                and a platform for quickly and safely modernizing mainframes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );
}