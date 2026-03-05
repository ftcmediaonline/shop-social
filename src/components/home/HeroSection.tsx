import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-10 sm:py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-4 top-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-96 w-96 rounded-full bg-coral-light blur-3xl" />
      </div>

      <div className="container relative px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 sm:px-4 sm:py-2"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-accent-foreground">
              Discover 500+ unique shops
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight xs:text-4xl sm:text-5xl md:text-6xl"
          >
            Your favorite shops,{' '}
            <span className="text-gradient">all in one place</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground md:text-xl px-1"
          >
            Browse, discover, and shop from hundreds of independent stores. 
            Find unique products you won't see anywhere else.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
          >
            <Button asChild size="lg" className="h-12 min-h-[48px] px-6 sm:px-8 bg-gradient-primary text-base font-medium w-full sm:w-auto">
              <Link to="/discover">
                Explore Shops
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 min-h-[48px] px-6 sm:px-8 text-base font-medium w-full sm:w-auto">
              <Link to="/open-shop">
                Open Your Shop
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8"
          >
            {[
              { value: '500+', label: 'Unique Shops' },
              { value: '50K+', label: 'Products' },
              { value: '100K+', label: 'Happy Customers' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
