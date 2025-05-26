
import { Navbar } from '@/components/Navbar';
import { CustomServiceForm } from '@/components/CustomServiceForm';
import { Footer } from '@/components/Footer';

const CustomService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          שירות התאמה אישית
        </h1>
        <CustomServiceForm />
      </div>
      <Footer />
    </div>
  );
};

export default CustomService;
