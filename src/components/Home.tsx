
import Box from "./Box";
import Header from "./Header";
import HomeNavBar from "./NavBar";
import SongList from "./SongList";

export default function Home(){
    return (
        <div className="flex h-full w-full">
            <div className="
                overflow-hidden
                rounded-md
                w-full
                h-full
                py-2
                px-1
                ">
                <Box className="overflow-y-auto h-full">
                    <div className="px-5
                        flex
                        flex-col
                        py-6
                        bg-gradient-to-b
                        gap-y-5
                        from-emerald-950">
                        <HomeNavBar/>   
                        <Header/>
                    </div>
                    <SongList/>
                </Box>
            </div>
        </div>
    )
}