import Link from "next/link";

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p className="text-sm">Developed by <span className="font-semibold">Hamid Ali</span></p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link
            href="https://github.com/mdhamid786"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub
          </Link>
          <span>|</span>
          <Link
            href="https://www.linkedin.com/in/mdhamidali1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            LinkedIn
          </Link>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  