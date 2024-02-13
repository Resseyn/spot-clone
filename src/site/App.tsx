import Home from "../components/Home";
import Sidebar from "../components/Sidebar";
import MyUserContextProvider from "../providers/userProvider";
import ModalProvider from "../providers/modalProvider";
import ToasterProvider from "../providers/ToasterProvider";
import Player from "../components/Player";


export default function App() {

  return (
        <MyUserContextProvider>
            <ToasterProvider/>
              <ModalProvider/>
                <div className="flex h-full w-full"
                style={{
                  font: "Figtree",
                  fontFamily: "Figtree",
                }}>
                    <Sidebar>Helelo (site)</Sidebar>
                    <Home/>
                </div>
                <Player></Player>
        </MyUserContextProvider>
  )
}

