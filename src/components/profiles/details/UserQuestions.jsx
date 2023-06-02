import CompactPost from "../../posts/CompactPost";


export default function UserQuestions(){
    const arr = [1,2,1,123,3,1,1,1,1,2,3,4,6,7,2];


    return(
        <div className='w-full h-fit flex flex-col gap-5'>
            {arr.map((ele)=><CompactPost/>)}
        </div>
    )
}