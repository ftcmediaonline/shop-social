import tengaLogo from '@/assets/tenga-logo.png';
import tengaLogoWhite from '@/assets/tenga-logo-white.png';
import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="border-t border-border py-8 sm:py-12 mt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={theme === 'dark' ? tengaLogoWhite : tengaLogo} alt="Tenga Virtual Mall" className="h-10 sm:h-12 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              Your favorite shops, all in one place.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Shop</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm text-muted-foreground">
              <li><a href="/discover" className="block py-1.5 hover:text-foreground active:text-foreground">Discover</a></li>
              <li><a href="/shops" className="block py-1.5 hover:text-foreground active:text-foreground">All Shops</a></li>
              <li><a href="/categories" className="block py-1.5 hover:text-foreground active:text-foreground">Categories</a></li>
              <li><a href="/trending" className="block py-1.5 hover:text-foreground active:text-foreground">Trending</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Sell</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm text-muted-foreground">
              <li><a href="/open-shop" className="block py-1.5 hover:text-foreground active:text-foreground">Open a Shop</a></li>
              <li><a href="/seller-dashboard" className="block py-1.5 hover:text-foreground active:text-foreground">Seller Dashboard</a></li>
              <li><a href="/pricing" className="block py-1.5 hover:text-foreground active:text-foreground">Pricing</a></li>
              <li><a href="/success-stories" className="block py-1.5 hover:text-foreground active:text-foreground">Success Stories</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm text-muted-foreground">
              <li><a href="/help-center" className="block py-1.5 hover:text-foreground active:text-foreground">Help Center</a></li>
              <li><a href="/contact-us" className="block py-1.5 hover:text-foreground active:text-foreground">Contact Us</a></li>
              <li><a href="/privacy-policy" className="block py-1.5 hover:text-foreground active:text-foreground">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="block py-1.5 hover:text-foreground active:text-foreground">Terms of Service</a></li>
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
