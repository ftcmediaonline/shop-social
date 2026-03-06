import { Link } from 'react-router-dom';
import tengaLogo from '@/assets/tenga-logo.png';
import tengaLogoWhite from '@/assets/tenga-logo-white.png';
import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const linkClass = 'block py-1.5 hover:text-foreground active:text-foreground';
  return (
    <footer className="border-t border-border py-8 sm:py-12 mt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Link to="/">
                <img src={theme === 'dark' ? tengaLogoWhite : tengaLogo} alt="Tenga Virtual Mall" className="h-10 sm:h-12 w-auto" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Your favorite shops, all in one place.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Shop</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm text-muted-foreground">
              <li><Link to="/discover" className={linkClass}>Discover</Link></li>
              <li><Link to="/shops" className={linkClass}>All Shops</Link></li>
              <li><Link to="/categories" className={linkClass}>Categories</Link></li>
              <li><Link to="/trending" className={linkClass}>Trending</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Sell</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm text-muted-foreground">
              <li><Link to="/open-shop" className={linkClass}>Open a Shop</Link></li>
              <li><Link to="/seller-dashboard" className={linkClass}>Seller Dashboard</Link></li>
              <li><Link to="/pricing" className={linkClass}>Pricing</Link></li>
              <li><Link to="/success-stories" className={linkClass}>Success Stories</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm text-muted-foreground">
              <li><Link to="/help-center" className={linkClass}>Help Center</Link></li>
              <li><Link to="/contact-us" className={linkClass}>Contact Us</Link></li>
              <li><Link to="/privacy-policy" className={linkClass}>Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className={linkClass}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border text-center text-xs sm:text-sm text-muted-foreground">
          <p>© 2026 Tenga Virtual Mall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
