import React from 'react';

const AboutSGSpots = () => {
    return (
        <div className=' min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4'>
            <div className=' bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center'>
                    About <span className='text-red-600'>SG </span>SPOTS
                </h2>

                <div className='text-lg text-customBlack space-y-6'>
                    <p>
                        <strong>
                            <span className='text-red-600'>SG</span> SPOTS
                        </strong>{' '}
                        began as a side project with a simple yet powerful
                        mission: to create a platform where users can share
                        honest and real reviews about attractions, events, and
                        places in Singapore. Unlike many other review platforms,
                        SG SPOTS does not rely on predetermined algorithms that
                        prioritize more popular spots, allowing for a truly
                        unbiased experience. The goal is to give both locals and
                        visitors a space to share their authentic experiences,
                        helping others discover hidden gems or lesser-known
                        places that might otherwise be overlooked. With a
                        commitment to transparency and integrity, SG SPOTS
                        ensures that every review reflects the genuine opinions
                        of its users, fostering a community built on trust and
                        open feedback. All our data is retrieved from the
                        Singapore Tourism Information and Services Hub, ensuring
                        that the information shared on SG SPOTS is accurate and
                        up-to-date.
                    </p>

                    <p>
                        If you have any ideas for improvements, or if you'd like
                        to collaborate on this project or other ventures, feel
                        free to reach out! Drop an email at{' '}
                        <a
                            href='mailto:lauweibin77@gmail.com'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-600 hover:underline'
                        >
                            lauweibin77@gmail.com
                        </a>{' '}
                        or visit my{' '}
                        <a
                            href='https://www.linkedin.com/in/wei-bin-lau-326439239/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-600 hover:underline'
                        >
                            LinkedIn
                        </a>
                        . For collaboration in this project, you can also join
                        me on{' '}
                        <a
                            href='https://github.com/Sprou-t/SG-Spots'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-600 hover:underline'
                        >
                            GitHub
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutSGSpots;
