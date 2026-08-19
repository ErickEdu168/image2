interface TemplateProps {
    children: React.ReactNode;
}
export const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
}
    
const Header: React.FC = () => {
    return (
        <header className="bg-orange-950 text-white py-3">
            <div className="container mx-auto px-4 flex justify-between items-center">
            <h1>ImageLite</h1>
            </div>
        </header>
    );
}

const Footer: React.FC = () => {
    return (
        <footer className="bg-orange-400 text-white py-3">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1>2026 ImageLite. All rights reserved.</h1>
            </div>
        </footer>
    );
}