
import { Navbar } from '@/components/Navbar';
import { GuidesList } from '@/components/GuidesList';
import { Footer } from '@/components/Footer';

const Guides = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          מדריכי התקנה
        </h1>
        <GuidesList />
      </div>
      <Footer />
    </div>
  );
};

export default Guides;
