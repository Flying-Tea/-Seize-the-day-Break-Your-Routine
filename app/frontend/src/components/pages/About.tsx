import CustomFooter from "../layouts/CustomFooter";
import { HomeNavBar } from "../ui/HomeNav";

export default function About() {
    return (
    <div className="min-h-screen text-white select-none">
        <div className="relative h-[800px] bg-fixed bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYXIlMjBza3klMjBtb3VudGFpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60')` }}>
            
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10">
            <HomeNavBar />

            <div className="flex flex-col items-center justify-center h-full px-8">
                <div className="bg-blue-200 p-10 rounded-lg shadow-md max-w-6xl mx-auto text-black text-center">
                    <h1 className="text-4xl font-bold mb-6 mt-10">About OsmondSolutions</h1>
                    <p className="max-w-3xl mx-auto mb-4">
                        OsmondSolutions is a software development company dedicated to creating innovative solutions that empower individuals and businesses to break free from routine and seize the day.
                    </p>
                    <p className="max-w-3xl mx-auto mb-4">
                        Our mission is to provide tools and platforms that inspire creativity, foster personal growth, and enhance productivity. With a team of passionate developers, designers, and visionaries, we strive to deliver exceptional products that make a positive impact on our users' lives. Whether it's through our cutting-edge applications or our commitment to customer satisfaction, OsmondSolutions is here to help you unlock your full potential and embrace the extraordinary in everyday life.
                    </p>
                </div>
            </div>
        </div>
        </div>

        {/* Footer */}
        <CustomFooter />
    </div>
    );
}
