import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export default function SideBar({small}){
    const arr = [
        'Science',
        'Engineering',
        'Environment',
        'Technology',
        'Mathematics',
        'Health',
        'Art',
        'History',
        'Sports',
        'Music',
        'Business',
        'Politics',
        'Literature',
        'Food',
        'Travel',
        'Film',
        'Fashion',
        'Gaming',
        'Education',
        'Design'
    ];

    const [fieldSearch, setFieldSearch] = useState('');
    const [customSearch, setCustomSearch] = useState(arr);

    const handleSearchChange = (e)=> {
        setFieldSearch(e.target.value);

        if(!e.target.value){
            setCustomSearch(arr)
        } else{
            const filteredSearch = customSearch.filter((item)=> item.toLowerCase().includes(e.target.value.toLowerCase()));
            setCustomSearch(filteredSearch);
        }
    }

    if(small){
        return(
            <div className="w-full h-full lg:hidden">
                {/* <div className="w-full h-32"></div> */}
                <div className='w-full h-full flex flex-col items-center pt-2 pb-8 overflow-auto'>
                    <div className="text-2xl w-full font-bold bg-reddishLight pl-4 pr-4 p-1 text-center text-white shadow-gray1 shadow-md ">PICK A SPECIFIC FIELD</div>
                    <div className="bg-gray-200 rounded-md pl-4 pr-4 p-1 mt-3 flex items-center gap-2">
                        <input
                            className="focus:border-none focus:outline-none bg-gray-200 p-1" 
                            onChange={handleSearchChange}
                            value={fieldSearch}
                            placeholder="Search"/>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </div>
                    <div className=" w-7/12 h-fit flex flex-col items-center gap-1 pt-8 ">
                        {customSearch.map((ele)=><p className="pl-4 pr-4 p-1 w-full text-center rounded-md hover:bg-gray2 hover:font-semibold hover:scale-105">{ele}</p>)}
                    </div>
                </div>
            </div>
        )

    } else{
        return(
            <div className='w-10/12 h-full flex flex-col gap-2 pl-6'>
                <div className='flex justify-start pl-5 font-bold text-xl text-bluishLight p-1 rounded-md'><p>Fields</p></div> 
    
                <hr className='border-gray-600 my-1 w-full '/>
    
                <input 
                    value={fieldSearch}
                    onChange={handleSearchChange}
                    placeholder='Search' 
                    className='focus:border-none focus:outline-none p-1 rounded-sm text-sm'/>
    
                {/* the main list goes here */}
                <div className='w-full h-fit flex flex-col  pl-3 pb-10'>
                    {customSearch.map((ele)=><p className='pl-2 pr-2 p-1 hover:bg-gray2 hover:text-black hover:cursor-pointer rounded-md hover:scale-105 transition-all duration-300 hover:font-semibold'>{ele}</p>)}
                </div>
            </div>
        )
    }
}