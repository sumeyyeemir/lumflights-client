// src/app/page.tsx
import Link from 'next/link';
import { ArrowRightIcon, ClockIcon, CpuChipIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-900 to-blue-900">
  <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        LuminFlight<sup className="text-xs">®</sup> ile
        <span className="block bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mt-3">
          Uçuş Deneyiminizi Yeniden Keşfedin
        </span>
      </h1>
      
      <p className="mt-6 text-lg leading-8 text-gray-300">
        AI destekli öneriler ve 50+ havayolu partneriyle uçuş planlamanın geleceğini yaşayın.
      </p>

      <div className="mt-10 flex justify-center gap-x-6">
        <Link
          href="/login"
          className="group flex items-center rounded-full bg-white/10 px-8 py-4 text-white 
                   shadow-sm hover:bg-white/20 transition-all duration-300 ring-1 ring-white/20 
                   hover:ring-white/40"
        >
          Yönetim Paneline Giriş
          <ArrowRightIcon className="h-5 w-5 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* Features Grid */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Neden LuminFlights?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Anlık Rezervasyon',
                desc: 'Gerçek zamanlı koltuk seçimi ve anlık onay sistemi'
              },
              {
                icon: '🤖',
                title: 'AI Destek',
                desc: 'Yapay zeka ile optimize edilmiş uçuş önerileri'
              },
              {
                icon: '🔒',
                title: 'Güvenli Ödeme',
                desc: '256-bit SSL şifreleme ile güvenli işlemler'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow
                         border border-gray-100 hover:border-blue-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold mb-2">1M+</div>
            <div className="text-sm opacity-90">Memnun Müşteri</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold mb-2">150+</div>
            <div className="text-sm opacity-90">Global Partner</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-sm opacity-90">Destek Hattı</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold mb-2">99.9%</div>
            <div className="text-sm opacity-90">Sistem Uptime</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4">
            © {new Date().getFullYear()} LuminFlights. Tüm hakları saklıdır.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-white transition-colors">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
  );
}