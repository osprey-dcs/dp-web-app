import QueryItems from "./queryitems/QueryItems";

function Home() {

    return (
        <div className="h-full flex flex-col" data-testid="home">
            <QueryItems />
            <main className="flex-grow bg-green-200">
                Hello World
            </main>
        </div>
    );
}

export default Home;