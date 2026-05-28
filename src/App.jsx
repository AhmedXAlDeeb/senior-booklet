import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Mail, 
  Linkedin, 
  Quote, 
  X, 
  Github, 
  GraduationCap,
  Heart
} from 'lucide-react';


const getImageSrc = (src) => {
  if (!src) return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
  if (src.startsWith('http') || src.startsWith('data:')) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`;
};

const getGroupPhotoSrc = (src) => {
  if (!src) return 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&h=900&fit=crop';
  if (src.startsWith('http') || src.startsWith('data:')) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`;
};

const StudentCard = ({ student, onClick }) => (
  <div 
    onClick={() => onClick(student)}
    className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-400 flex flex-col h-full shadow-sm"
  >
    <div className="aspect-square overflow-hidden relative bg-slate-100">
      <img 
        src={getImageSrc(student.image)} 
        alt={student.name}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100 mix-blend-multiply group-hover:mix-blend-normal"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
      <h3 dir="auto" className="absolute bottom-4 left-4 right-4 text-xl font-serif font-bold text-white truncate drop-shadow-md">
        {student.name}
      </h3>
    </div>
    
    <div className="p-5 flex flex-col flex-grow bg-white">
      <div className="flex-grow">
        <p dir="auto" className="text-slate-600 text-sm italic line-clamp-3 leading-relaxed relative">
          <Quote className="inline text-blue-200 w-4 h-4 mr-1 -mt-1" />
          {student.quote}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Read More</span>
        <span>?</span>
      </div>
    </div>
  </div>
);

const Modal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden bg-slate-100">
            <img 
              src={getImageSrc(student.image)} 
              alt={student.name}
              className="w-full h-full object-cover grayscale mix-blend-multiply"
            />
          </div>
          
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-zinc-50">
            <div className="w-12 h-1 bg-blue-600 mb-6" />
            <h2 dir="auto" className="text-3xl font-serif font-black text-slate-900 mb-6 leading-tight">{student.name}</h2>
            
            <div className="relative mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <Quote className="absolute -top-3 -left-3 text-blue-200 bg-white" size={32} />
              <p dir="auto" className="text-slate-700 text-lg italic leading-relaxed relative z-10">
                "{student.quote}"
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${student.email}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all font-semibold text-sm">
                <Mail size={16} /> <span>Email</span>
              </a>
              <a href={student.linkedin} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all font-semibold text-sm">
                <Linkedin size={16} /> <span>LinkedIn</span>
              </a>
              <a href={student.github} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all font-semibold text-sm">
                <Github size={16} /> <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [classData, setClassData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  React.useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/students.json`)
      .then(res => res.json())
      .then(data => setClassData(data))
      .catch(err => console.error("Error loading student data:", err));
  }, []);

  const filteredStudents = useMemo(() => {
    if (!classData) return [];
    return classData.students.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, classData]);

  if (!classData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <GraduationCap size={48} className="text-blue-200 mb-4 animate-bounce" />
          <p className="text-blue-400 font-serif text-xl">Loading Senior Book...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      <header className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <img 
          src={getGroupPhotoSrc(classData.groupPhoto)} 
          alt="Class Group Photo" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/60 to-slate-50" />
        
        <div className="relative z-10 text-center px-6 mt-16 text-slate-800">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/90 text-blue-800 text-xs font-bold uppercase tracking-[0.2em] shadow-sm mb-6">
            <GraduationCap size={16} />
            SENIOR BOOK
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black mb-6 tracking-tight text-white drop-shadow-lg">
            SBME 26 <span className="font-sans font-light italic">Seniors</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-800 bg-white/70 backdrop-blur-md px-6 py-3 rounded-full text-sm md:text-base font-semibold shadow-sm uppercase tracking-widest leading-relaxed">
            Seniors of 2026 in Biomedical Engineering Department
          </p>
        </div>
      </header>

      <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-y border-slate-200 py-4 px-6 shadow-sm">
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            dir="auto"
            placeholder="Search by name (English or Arabic)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-slate-800 placeholder-slate-400 text-sm shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Class of 2026</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto" />
        </div>

        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredStudents.map(student => (
              <StudentCard 
                key={student.id} 
                student={student} 
                onClick={setSelectedStudent} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 border-dashed">
            <Search className="mx-auto w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg font-medium">No classmates found matching "{searchTerm}"</p>
          </div>
        )}
      </main>

      <footer className="py-16 mt-12 bg-white text-center border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-6">
          <Heart className="text-blue-500 mx-auto mb-6" size={24} />
          <p className="text-slate-500 text-sm uppercase tracking-[0.2em] font-semibold mb-2">
            {classData.className}
          </p>
          <p className="text-slate-400 text-xs uppercase tracking-widest">
            {classData.university}
          </p>
        </div>
      </footer>

      <Modal 
        student={selectedStudent} 
        onClose={() => setSelectedStudent(null)} 
      />
    </div>
  );
}
