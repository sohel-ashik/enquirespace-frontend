
function AnswerLink(){
    return(
        <div className="flex gap-3 items-center border-b-2 pb-3 p-1 pl-2">
            <div className="border border-gray-500 h-fit p-2 pt-1 pb-1 rounded-md">
                75
            </div>
            <div className="font-semibold text-bluishLight hover:cursor-pointer">
                Do I care if the housing market has gone up or down, if I'm moving from one house to another?
            </div>

        </div>
    )
}



export default function UserAnswers(){
    return(
        <div className='w-full h-fit pt-3 flex flex-col gap-4 border border-gray-500 rounded-md'>
            <AnswerLink/>
            <AnswerLink/>
            <AnswerLink/>
            <AnswerLink/>
            <AnswerLink/>
            <AnswerLink/>
            <AnswerLink/>
            <AnswerLink/>
        </div>
    )
}