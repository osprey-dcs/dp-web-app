import DataPlatformApi from "../../domain/grpc-client/DataPlatformApi";

function Home() {

    function testApi() {
        const testApi = new DataPlatformApi();
        testApi.queryMetadata();
    }

    return (
        <div className="h-full flex flex-col" data-testid="home">
            <div className="py-3 flex items-center justify-between">
                <div className="flex flex-row">
                    <div>Time Range</div>
                    <div>Data Sources</div>
                    <div>Attributes</div>
                </div>
                <button className="btn-std px-5 py-2 rounded text-sm font-medium text-white bg-[#19191B]" onClick={testApi}>Run Query</button>
            </div>
            <main className="flex-grow bg-green-200">
                Hello World
            </main>
        </div>
    );
}

export default Home;