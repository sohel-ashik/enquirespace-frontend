import { useState } from "react";
import x1 from '../../assets/img1.jpg'
import x2 from '../../assets/img2.jpg'
import x3 from '../../assets/img3.jpg'
import x4 from '../../assets/img4.jpg'
import x5 from '../../assets/img5.jpg'

const allImg = [x1,x2,x3,x4,x5];

export default function Attachments(){
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = (imagePath) => {
        setSelectedImage(imagePath);
    }
    const handleCloseModal = () => {
        setSelectedImage(null);
    }


    return(
        <div className="pb-3 grid grid-cols-1 sm:grid-cols-2  gap-4 p-1">
            {allImg.map((img) => (
                <div key={img} className="relative">
                <img
                    onClick={() => handleImageClick(img)}
                    src={img}
                    alt="Image"
                    className="object-cover w-full h-full cursor-pointer hover:scale-105 transition-transform duration-700"
                /></div>))}
            

            {/* image modals */}
            <div onClick={handleCloseModal} className={`fixed inset-0 flex justify-center items-center transition-colors  ${selectedImage ? "visible bg-black/75" : "invisible"}`}>
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