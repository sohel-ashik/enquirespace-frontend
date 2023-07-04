import { useState } from "react";

export default function Attachments({picArr= [],vidArr=[]}){
    
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = (imagePath) => {
        setSelectedImage(imagePath);
    }
    const handleCloseModal = () => {
        setSelectedImage(null);
    }


    return(
        <div className="pb-3 grid grid-cols-1 sm:grid-cols-2  gap-4 p-1">
            {picArr.map((img) => (
                <div key={img} className="relative">
                <img
                    onClick={() => handleImageClick(img)}
                    src={img}
                    alt="Image"
                    className="object-cover w-full h-full cursor-pointer hover:scale-105 transition-transform duration-700"
                /></div>))}
            

            {/* image modals */}
            <div onClick={handleCloseModal} className={`fixed inset-0 z-50 flex justify-center items-center transition-colors  ${selectedImage ? "visible bg-black/75" : "invisible"}`}>
                    <img
                        // onClick={(e)=>e.stopPropagation()}
                        src={selectedImage}
                        alt="Selected Image"
                        className="max-w-full max-h-full"
                    />
            </div>
        </div>
    )
}