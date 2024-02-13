import ListItem from "./ListItem";

export default function Header(){
    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-semibold">Good evening!</h1>
            <div className="grid grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4">
                <ListItem name="Liked Songs" image="/images/liked.png" href="/liked"></ListItem>
                <ListItem name="Liked Songs" image="/images/liked.png" href="/liked"></ListItem>
            </div>
        </div>
    )
}