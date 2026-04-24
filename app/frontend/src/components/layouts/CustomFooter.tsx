import { User } from "lucide-react"
import { ReuseButton } from "../ui/MyButton"

const CustomFooter = () => {
    return (
        <footer className="w-full p-6 bg-slate-800 mt-5 text-white justify-between items-center border-t backdrop-blur-2xl">
            <ReuseButton intent="primaryButton" href="/about" className="flex items-center gap-2 border-2 p-2 rounded-lg hover:bg-teal-500">
                <User />
                <span>About Us</span>
            </ReuseButton>

            <div className="max-w-10xl mx-auto flex flex-col md:flex-row justify-between items-start">
                <div>
                    <h2 className="text-lg font-bold mt-4">Any Inquirys? Contact Us At:</h2>
                    <p className="text-sm opacity-60 select-all">Email: RealEmail@OsmondSolutions.com</p>
                    <p className="text-sm opacity-60 select-all">Phone: +1 (555) 123-4567</p>
                </div>
                <div className="text-right mt-8">
                    <h2 className="text-lg font-bold">OsmondSolutions © 2025. All rights reserved.</h2>
                    <p className="text-sm opacity-60">Your trusted partner in software solutions.</p>
                </div>
            </div>
        </footer>
    );
}
export default CustomFooter;