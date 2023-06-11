import CompactPost from "./CompactPost";



export default function Unsolved(){

    return(
        <div className="w-full h-full flex justify-center overflow-auto">
            <div className='lg:w-4/5 h-fit w-full flex flex-col gap-5 p-5 pb-10'>
                <CompactPost/>
                <CompactPost/>
                <CompactPost/>
                <CompactPost/>
                <CompactPost/>
                <CompactPost/>
            </div>
        </div>
    )
}