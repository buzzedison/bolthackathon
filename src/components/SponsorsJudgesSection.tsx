import { sponsors, judges } from '../data/sections';
import { Rocket, ArrowRight, Zap, Code, Sparkle, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { useState } from 'react';

// Type definitions
interface Judge {
  id: number;
  name: string;
  photo?: string;
  bio: string;
  title?: string;
}

export default function SponsorsJudgesSection() {
  return (
    <div className="bg-black text-white">
      {/* Sponsors Section */}
      <section id="sponsors" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9f0] to-[#4361ee] animate-gradient-x">OUR SPONSORS</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {sponsors.map((sponsor, index) => {
              const colors = ["4cc9f0", "4361ee", "3a0ca3", "7209b7", "f72585", "480ca8"];
              const color = colors[index % colors.length];
              
              return (
                <a 
                  key={sponsor.id}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-900 hover:bg-gray-800 rounded-xl p-5 flex items-center justify-center transition-all duration-300 border border-gray-800 hover:border-[#4cc9f0]/40 shadow-lg hover:shadow-[#4cc9f0]/20 hover:-translate-y-1"
                >
                  <div 
                    className="h-24 w-full flex items-center justify-center rounded-lg relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, #${color}20, transparent)` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
                    <span className="font-bold text-xl text-center group-hover:scale-105 transition-transform duration-300" style={{ color: `#${color}` }}>
                      {sponsor.name}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Judges Section - Enhanced with real images and interactivity */}
      <section id="judges" className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#f72585] to-[#4361ee] animate-gradient-x">MEET THE JUDGES</h2>
          
          <EnhancedJudgesGrid judges={judges} />
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section id="cta" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="relative py-20 px-6 md:px-12 rounded-3xl overflow-hidden border border-white/10 max-w-5xl mx-auto bg-gradient-to-br from-black/80 to-[#120128]/80 backdrop-blur-sm">
            {/* Background gradients */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-r from-[#f72585]/30 to-purple-500/30 blur-3xl rounded-full animate-pulse-slow"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-[#4cc9f0]/30 to-blue-500/30 blur-3xl rounded-full animate-pulse-slow animation-delay-2000"></div>
            
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-white/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${3 + Math.random() * 7}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 animate-bounce-slow">
                <Sparkle className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm text-gray-300">Limited spots available</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#4cc9f0] via-[#f72585] to-[#4361ee] animate-gradient-x">
                Ready to Code, Create & Conquer?
              </h2>
              
              <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                Join thousands of developers pushing the boundaries of innovation. 
                Build mind-blowing projects, win incredible prizes, and launch your next big idea.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center">
                <a 
                  href="#register" 
                  className="relative group bg-gradient-to-r from-[#f72585] to-[#4361ee] text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg shadow-pink-600/20 flex items-center space-x-3 transition-all duration-300 overflow-hidden hover:shadow-xl hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  <Rocket className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Register Now - It's Free</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transition-all duration-300 group-hover:translate-x-1" />
                </a>
                
                <a 
                  href="#faq" 
                  className="bg-white/5 backdrop-blur-sm border border-white/10 text-white px-6 py-4 rounded-full font-medium flex items-center space-x-2 hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  <Code className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">View Challenges</span>
                </a>
              </div>
              
              <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-[#f72585]" />
                  <span>Registration closes in 7 days</span>
                </div>
                <div className="hidden md:block">•</div>
                <div>48 hour competition window</div>
                <div className="hidden md:block">•</div>
                <div>Global, virtual participation</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Enhanced Judges component with interactive cards and real images
function EnhancedJudgesGrid({ judges }: { judges: Judge[] }) {
  const [activeJudge, setActiveJudge] = useState<number | null>(null);
  
  // Real professional images from Unsplash for judges
  const judgeImages = [
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=1000&auto=format&fit=crop",
  ];
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {judges.map((judge, index) => {
          const colors = ["4cc9f0", "4361ee", "7209b7", "f72585"];
          const bgColor = colors[index % colors.length];
          const isActive = activeJudge === judge.id;
          
          return (
            <div 
              key={judge.id}
              className={`judge-card group bg-gray-900 rounded-xl overflow-hidden border transition-all duration-500 ${
                isActive 
                  ? `scale-[1.02] border-[#${bgColor}]/60 shadow-lg shadow-[#${bgColor}]/20` 
                  : 'border-gray-800 hover:border-[#f72585]/40 hover:shadow-lg'
              }`}
              onMouseEnter={() => setActiveJudge(judge.id)}
              onMouseLeave={() => setActiveJudge(null)}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image section */}
                <div className="md:w-2/5 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#${bgColor}] to-transparent opacity-50 transition-opacity duration-300 ${isActive ? 'opacity-70' : 'opacity-50'}`}></div>
                  <img 
                    src={judgeImages[index % judgeImages.length]}
                    alt={judge.name}
                    className="w-full h-60 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Social icons overlay */}
                  <div className={`absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-3 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                      <Linkedin size={16} className="text-white" />
                    </a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                      <Twitter size={16} className="text-white" />
                    </a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                      <ExternalLink size={16} className="text-white" />
                    </a>
                  </div>
                </div>
                
                {/* Content section */}
                <div className="p-6 md:w-3/5 flex flex-col">
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${isActive ? `text-[#${bgColor}]` : 'text-white'}`}>
                      {judge.name}
                    </h3>
                    {judge.title && (
                      <h4 className="text-lg text-[#4cc9f0] mb-4">{judge.title}</h4>
                    )}
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {judge.bio}
                    </p>
                  </div>
                  
                  {/* Expertise tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {getExpertiseTags(judge.name, index).map((tag, i) => (
                      <span 
                        key={i} 
                        className={`text-xs py-1 px-2 rounded-full bg-[#${bgColor}]/10 text-[#${bgColor}] border border-[#${bgColor}]/20`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper function to generate realistic expertise tags for judges
function getExpertiseTags(_name: string, index: number): string[] {
  const expertiseSets = [
    ["AI/ML", "Software Architecture", "Cloud Computing"],
    ["UX Design", "Product Strategy", "Entrepreneurship"],
    ["Blockchain", "Cybersecurity", "Data Science"],
    ["Full Stack", "Mobile Dev", "IoT"]
  ];
  
  return expertiseSets[index % expertiseSets.length];
} 