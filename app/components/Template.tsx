interface TemplateProps {
  children: React.ReactNode;
} 

export const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white"> 
      <Header />
      <div className="flex-1">
        {children}
      </div>
      <Footer />  
    </div>
  );    
} 

const Header: React.FC = () => {
  return (
    <header className="bg-purple-900 text-white py-4 shadow-lg border-b border-purple-800">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-wider text-white hover:text-purple-200 transition-colors cursor-pointer">
          ImageLite
        </h1>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-900 text-white py-3"> 
      <div className="container mx-auto px-4 flex justify-between items-center px-4">
        <h1>Developed by Erick Eduardo</h1>
      </div>   
    </footer>
  );
}