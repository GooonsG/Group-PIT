
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ustp-darkblue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">USTP Student Opportunity System</h3>
            <p className="text-sm text-gray-300">
              Connecting USTP students with marketplace opportunities and job listings.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm text-gray-300 mb-2">
              University of Science and Technology of Southern Philippines
            </p>
            <p className="text-sm text-gray-300">
              Email: RecMarSaluds@ustp.edu.ph
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700">
          <p className="text-center text-sm text-gray-300">
            &copy; {new Date().getFullYear()} USTP Student Opportunity System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
