import gardensByTheBay from '../assets/landingImages/pexels-nextvoyage-3881761.jpg';
import { FaStar } from 'react-icons/fa';
const AttractionCard = () => {
    return (
        <div
            className='h-96 w-[340px] flex flex-col rounded-lg bg-white'
        >
            <div className='overflow-hidden'>
                <img
                    className='w-full bg-gray-400 h-72 object-cover rounded-lg transition-transform transform hover:scale-105 cursor-pointer'
                    src={gardensByTheBay}
                    loading='lazy'
                />
            </div>
            <div className='flex flex-col flex-grow'>
                <h2 className='font-semibold text-lg truncate'>name</h2>
                <div className='flex flex-col mt-auto text-gray-500'>
                    <p>Type: attraction</p>
                    <p>
                        Price:{' '}
                        <span className='font-semibold text-black'>$$$</span>
                    </p>
                    <div className=' flex gap-2 items-center'>
                        <FaStar className='text-yellow-400 item' />
                        <p>5</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TestHomepage = () => {
    return (
        <div className=' mb-20 xs:mt-56 md:mt-32 mx-auto xl:translate-x-4 flex flex-wrap justify-center gap-10'>
            {[...Array(80)].map((_, index) => (
                <AttractionCard key={index} />
            ))}
        </div>
    );
};

export default TestHomepage;
