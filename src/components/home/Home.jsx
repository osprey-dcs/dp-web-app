import QueryActions from "./queryactions/QueryActions";

function Home() {

    return (
        <div className="h-full flex flex-col" data-testid="home">
            <QueryActions />
            <main className="flex-grow bg-green-200">
                Hello World
            </main>
        </div>
    );
}

export default Home;