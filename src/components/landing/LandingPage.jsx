import Navigation from "../navigation/Navigation";
import {Outlet} from 'react-router-dom';

export default function LandingPage(){

    return(
            <div className="w-full h-screen">
                <Navigation/>

                <div className="w-full h-full pt-28 lg:pt-14">
                    <Outlet/>
                </div>

            </div>
    )
}