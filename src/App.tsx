/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, MotionValue, useMotionValueEvent } from 'motion/react';
import { useRef } from 'react';

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number], key?: string | number }) => {
  const opacity = useTransform(progress, range, [0.3, 1]);
  const color = useTransform(progress, range, ["#ffffff", "#141414"]);
  return (
    <motion.span style={{ opacity, color }}>
      {children}
    </motion.span>
  );
};

const phrases = [
  { text: "Mar khaoge", count: "7" },
  { text: "Bye", count: "5" },
  { text: "Sorry", count: "5" },
  { text: "Sent good\ncats videos", count: "∞" },
  { text: "Acha", count: "50" },
  { text: "Pata nhi", count: "8" },
  { text: "Kuch nhi", count: "12" },
  { text: "Koi ni", count: "9" },
  { text: "Ghanta", count: "15" },
  { text: "Bolo na\nkya hua", count: "2" },
  { text: "Good night", count: "27" },
  { text: "Good meowrning", count: "29" },
  { text: "Kider ho", count: "6" }
];

const PinnedBox = ({ item, index }: { item: { text: string, count: string }, index: number, key?: string | number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const mult = index % 2 === 0 ? 1 : -1;
  const rotateRaw = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [0, 4 * mult, -4 * mult, 3 * mult, -2 * mult, 0]
  );
  
  const smoothRotate = useSpring(rotateRaw, { damping: 12, stiffness: 80, mass: 0.8 });

  const initialX = index % 2 === 0 ? 150 : -150;

  return (
    <div ref={ref} className="w-full max-w-[280px] sm:max-w-[300px] mx-auto flex justify-center relative perspective-[1000px]">
      <motion.div 
        initial={{ x: initialX, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        viewport={{ once: true, margin: "-10%" }}
        style={{ 
          rotateZ: smoothRotate, 
          transformOrigin: "50% 12px" 
        }}
        className="bg-[#1c1c1c] text-white p-6 relative w-full min-h-[200px] flex flex-col justify-between shadow-2xl origin-top"
      >
        {/* The Pin */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#f0f0f0] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.9)] border border-[#a0a0a0] z-20" />
        
        <h3 className="font-mono text-2xl md:text-3xl uppercase font-bold mt-6 leading-[1.1] whitespace-pre-wrap">
          {item.text}
        </h3>
        
        <div className="mt-8 pt-4 border-t border-white/20">
          <span className="font-mono text-4xl sm:text-5xl font-bold text-white">
            {item.count}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

const ChatToMusicSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const msg1Opacity = useTransform(scrollYProgress, [0.05, 0.1, 0.65, 0.7], [0, 1, 1, 0]);
  const msg1Y = useTransform(scrollYProgress, [0.05, 0.1], [50, 0]);

  const msg2Opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.65, 0.7], [0, 1, 1, 0]);
  const msg2Y = useTransform(scrollYProgress, [0.15, 0.2], [50, 0]);

  const msg3Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.65, 0.7], [0, 1, 1, 0]);
  const msg3Y = useTransform(scrollYProgress, [0.25, 0.3], [50, 0]);

  const msg4Opacity = useTransform(scrollYProgress, [0.35, 0.4, 0.65, 0.7], [0, 1, 1, 0]);
  const msg4Y = useTransform(scrollYProgress, [0.35, 0.4], [50, 0]);

  const chatOpacity = useTransform(scrollYProgress, [0.65, 0.7], [1, 0]);

  const musicOpacity = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);
  const musicY = useTransform(scrollYProgress, [0.75, 0.8], [50, 0]);

  return (
    <div ref={containerRef} className="h-[600vh] bg-[#f4ebd0] relative w-full font-sans text-[#141414]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4">
        
        {/* Chat Section */}
        <motion.div 
          style={{ opacity: chatOpacity }}
          className="absolute w-full max-w-3xl flex flex-col gap-4 sm:gap-6 font-mono"
        >
          {/* Billota 1 */}
          <motion.div style={{ opacity: msg1Opacity, y: msg1Y }} className="self-end flex flex-col items-end max-w-[85%]">
            <span className="text-xs sm:text-sm text-gray-500 opacity-80 mb-1 mr-4 font-bold uppercase tracking-widest">Billota</span>
            <div className="bg-[#005cff] text-white px-6 py-4 sm:px-8 sm:py-5 rounded-[2rem] rounded-br-sm text-xl sm:text-3xl shadow-lg">
              oiii
            </div>
          </motion.div>
          
          {/* Billota 2 */}
          <motion.div style={{ opacity: msg2Opacity, y: msg2Y }} className="self-end bg-[#005cff] text-white px-6 py-4 sm:px-8 sm:py-5 rounded-[2rem] rounded-br-xl rounded-tr-sm text-xl sm:text-3xl max-w-[85%] shadow-lg">
            jam?
          </motion.div>
          
          {/* Billoti */}
          <motion.div style={{ opacity: msg3Opacity, y: msg3Y }} className="self-start flex flex-col items-start max-w-[85%] mt-6 sm:mt-8">
            <span className="text-xs sm:text-sm text-gray-500 opacity-80 mb-1 ml-4 font-bold uppercase tracking-widest">Billoti</span>
            <div className="bg-white text-[#141414] px-6 py-4 sm:px-8 sm:py-5 rounded-[2rem] rounded-bl-sm text-xl sm:text-3xl shadow-md border border-gray-100">
              okay room banao
            </div>
          </motion.div>

          {/* Billota 3 */}
          <motion.div style={{ opacity: msg4Opacity, y: msg4Y }} className="self-end flex flex-col items-end max-w-[85%] mt-6 sm:mt-8">
            <span className="text-xs sm:text-sm text-gray-500 opacity-80 mb-1 mr-4 font-bold uppercase tracking-widest">Billota</span>
            <div className="bg-[#005cff] text-white px-6 py-4 sm:px-8 sm:py-5 rounded-[2rem] rounded-br-sm text-xl sm:text-3xl shadow-lg">
              XHSHEN room code
            </div>
          </motion.div>
        </motion.div>

        {/* Music Player Section */}
        <motion.div 
          style={{ opacity: musicOpacity, y: musicY }}
          className="absolute w-full max-w-[320px] flex flex-col items-center bg-white p-5 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
        >
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#005cff] mb-4 font-bold w-full text-center">90s Playlist</div>
          
          <div className="w-full aspect-square bg-[#141414] rounded-2xl overflow-hidden mb-5 relative shadow-inner">
             <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-90" alt="Album Cover" />
          </div>

          <div className="w-full mb-4 font-mono text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-1 tracking-tight">XYZ</h3>
            <p className="text-gray-400 text-sm">Various Artists</p>
          </div>

          <div className="w-full mb-5">
            <div className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden">
              <div className="h-full bg-[#005cff] rounded-full w-1/3" />
            </div>
            <div className="flex justify-between text-[10px] mt-2 text-gray-400 font-mono font-bold">
              <span>1:24</span>
              <span>4:05</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between px-4 mb-5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
            <div className="w-14 h-14 bg-[#141414] text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="5" width="4" height="14" rx="2"></rect><rect x="14" y="5" width="4" height="14" rx="2"></rect></svg>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
          </div>

          <div className="w-full bg-[#f4ebd0] rounded-xl p-3 flex items-center gap-3">
             <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-[2px] border-[#f4ebd0] object-cover object-center bg-gray-200" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="User 1" />
                <img className="w-8 h-8 rounded-full border-[2px] border-[#f4ebd0] object-cover object-center bg-gray-200" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" alt="User 2"/>
             </div>
             <div className="font-mono">
               <div className="text-[9px] sm:text-[10px] text-[#005cff] uppercase tracking-wider font-bold mb-0.5">Listening together</div>
               <div className="text-xs sm:text-sm font-bold text-[#141414]">Disrupt n3zuko</div>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

const SingleScreenshotSection = () => {
  return (
    <div className="bg-[#61b865] pt-24 sm:pt-32 pb-32 sm:pb-48 w-full relative overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 xl:px-16 flex flex-col md:flex-row justify-between gap-16 md:gap-24">
        
        <div className="w-full md:w-1/2 flex flex-col relative">
          <div className="absolute -left-4 sm:-left-8 top-2 bottom-0 w-[2px] sm:w-[3px] bg-[#141414]" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sans font-black text-[#fce454] text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter leading-[0.95]"
          >
            THE DAY IT<br />STARTED
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-10 font-sans font-bold text-white tracking-widest text-sm sm:text-base lg:text-lg uppercase"
          >
            A memory captured
          </motion.p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            viewport={{ once: true, margin: "-10%" }}
            className="w-full max-w-[320px] sm:max-w-[400px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative"
          >
            <img 
              src="/assets/d1.jpg" 
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1000&auto=format&fit=crop" }}
              alt="d1" 
              className="w-full aspect-[9/16] object-cover bg-black/5"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
};

const EndedHereSection = () => {
  return (
    <div className="bg-[#222222] pt-32 sm:pt-48 pb-32 sm:pb-48 w-full relative overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 xl:px-16 flex flex-col items-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-sans font-black text-white text-center text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] uppercase tracking-tighter leading-[0.95] mb-16 sm:mb-24"
        >
          I THOUGHT EVERYTHING<br />ENDED HERE
        </motion.h2>

        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            viewport={{ once: true, margin: "-10%" }}
            className="w-full max-w-[320px] sm:max-w-[400px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative"
        >
          <img 
            src="/assets/d2.jpg" 
            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1518155317743-a8ff43ca6a5f?q=80&w=1000&auto=format&fit=crop" }}
            alt="d2" 
            className="w-full aspect-[9/16] object-cover bg-[#1c1c1c]"
          />
        </motion.div>
        
      </div>
    </div>
  );
};

const ListenSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const box1Scale = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const box1Opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const box2Scale = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const box2Opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  const box3Scale = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const box3Opacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);

  const w1Op = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const w1Scale = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.8], [0.5, 1, 1, 1.2]);

  const w2Op = useTransform(scrollYProgress, [0.75, 0.85, 1, 1], [0, 1, 1, 1]);
  const w2Scale = useTransform(scrollYProgress, [0.75, 0.85], [0.5, 1]);

  return (
    <div ref={containerRef} className="h-[300vh] bg-[#222222] relative w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <motion.div style={{ scale: box1Scale, opacity: box1Opacity }} className="absolute w-[100vw] h-[100vh] sm:w-[95vw] sm:h-[95vh] bg-[#5ba5ef]" />
        
        <motion.div style={{ scale: box2Scale, opacity: box2Opacity }} className="absolute w-[90vw] h-[85vh] sm:w-[80vw] sm:h-[80vh] bg-[#f46542]" />
        
        <motion.div style={{ scale: box3Scale, opacity: box3Opacity }} className="absolute w-[80vw] h-[70vh] sm:w-[65vw] sm:h-[65vh] bg-[#fdda33] flex items-center justify-center overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          
          <motion.div style={{ opacity: w1Op, scale: w1Scale }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-sans font-black text-[5.5rem] sm:text-8xl md:text-[10rem] lg:text-[12rem] text-[#141414] tracking-tighter">Listen</span>
          </motion.div>

          <motion.div style={{ opacity: w2Op, scale: w2Scale }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-sans font-black text-[5.5rem] sm:text-8xl md:text-[10rem] lg:text-[12rem] text-[#141414] tracking-tighter italic">listen</span>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
};



const SlidingCurveSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const curveX = useTransform(scrollYProgress, [0, 1], ["40vw", "-100%"]);

  return (
    <div ref={containerRef} className="h-[800vh] bg-[#f46542] relative w-full">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div 
          style={{ x: curveX }} 
          className="absolute left-0 flex items-center w-[5000px] lg:w-[7000px] h-[800px]"
        >
           <svg 
             className="w-full h-full overflow-visible"
             viewBox="0 0 7000 800"
           >
             <path 
               id="sliding-curve"
               d="M 0 400 Q 1750 0 3500 400 T 7000 400" 
               fill="transparent" 
               stroke="#141414" 
               strokeWidth="10" 
             />
             <text className="font-sans font-black text-[3.5rem] sm:text-[5rem] lg:text-[7rem] fill-[#fdda33] uppercase tracking-normal" dy="-30" style={{ wordSpacing: '0.3em' }}>
               <textPath href="#sliding-curve" startOffset="10%" textAnchor="start">
                 I know you got too much from everyone even from me
               </textPath>
             </text>
           </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default function App() {
  const apologyRef = useRef<HTMLDivElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: apologyProgress } = useScroll({
    target: apologyRef,
    offset: ["start 95%", "end center"]
  });

  const smoothApologyProgress = useSpring(apologyProgress, {
    damping: 30,
    stiffness: 80,
    mass: 1
  });

  const x1 = useTransform(smoothApologyProgress, [0, 1], ["80%", "0%"]);
  const x2 = useTransform(smoothApologyProgress, [0, 1], ["120%", "0%"]);
  const x3 = useTransform(smoothApologyProgress, [0, 1], ["160%", "0%"]);
  const transforms = [x1, x2, x3];
  
  const textOpacity = useTransform(smoothApologyProgress, [0.1, 0.9], [0, 1]);

  const { scrollYProgress: lyricsProgress } = useScroll({
    target: lyricsContainerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: sliderProgress } = useScroll({
    target: sliderRef,
    offset: ["start start", "end end"]
  });

  const sliderX = useTransform(sliderProgress, [0, 0.2, 0.8, 1], ["0%", "0%", "-50%", "-50%"]);

  const lyricsText = `We don't talk anymore, we don't talk
anymore
We don't talk anymore like we used to do
We don't love anymore, what was all of it
for?
Oh, we don't talk anymore like we used to do`;

  const lyricsTokens = lyricsText.split(/(\s+)/);
  const wordsCount = lyricsTokens.filter(t => !t.match(/\s+/)).length;
  const wordStep = 1 / wordsCount;
  let wordIndex = 0;

  return (
    <div className="bg-[#f3eee5] text-[#141414] font-mono selection:bg-[#fe652f] selection:text-white">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col pt-16 md:pt-28 px-4 sm:px-8 pb-32">
        <div className="w-full max-w-6xl mx-auto flex flex-col">
          <h1 className="font-mono text-[17vw] sm:text-[14vw] md:text-[8rem] lg:text-[11rem] font-bold uppercase leading-[0.85] tracking-tighter sm:tracking-tight mb-4 md:mb-8 whitespace-nowrap">
            <div className="overflow-hidden pb-1 sm:pb-2">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, ease: [0.25, 1, 0.3, 1] }}
              >
                HOUSE OF
              </motion.div>
            </div>
            <div className="overflow-hidden pb-1 sm:pb-2">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, ease: [0.25, 1, 0.3, 1], delay: 0.15 }}
              >
                MEMORIES
              </motion.div>
            </div>
          </h1>

          <div className="overflow-hidden mt-4 md:mt-8 w-full">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 2.2, ease: [0.25, 1, 0.3, 1], delay: 0.3 }}
            >
              <img 
                src="/assets/f1.jpg" 
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2000&auto=format&fit=crop" }}
                alt="House of Memories" 
                className="w-full h-auto max-h-[70vh] object-cover aspect-square md:aspect-video"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Apology Section */}
      <div className="bg-[#fe652f] text-[#141414] pt-24 sm:pt-32 lg:pt-48 flex flex-col overflow-hidden relative">
        <div ref={apologyRef} className="w-full max-w-[100vw] mx-auto px-4 sm:px-8 xl:px-16 mb-24 sm:mb-40 relative z-10 overflow-hidden">
          <h2 className="font-mono text-[14vw] sm:text-[13vw] md:text-[12rem] lg:text-[15rem] xl:text-[19rem] font-bold uppercase leading-[0.85] tracking-tighter mb-12 sm:mb-16 whitespace-nowrap">
            {["I APOLOGISE", "FOR MY", "BEHAVIOUR."].map((line, index) => (
              <div key={index} className="pb-2">
                <motion.div style={{ x: transforms[index], opacity: textOpacity }}>
                  {line}
                </motion.div>
              </div>
            ))}
          </h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-10%" }}
            className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase max-w-7xl mx-auto w-full font-bold opacity-90 leading-[1.1]"
          >
            (Hurting you was never my intention.)
          </motion.p>
        </div>

        {/* Marquee Banner */}
        <div className="mt-8 mb-20 sm:mb-32 flex whitespace-nowrap overflow-hidden">
          <motion.div 
            className="flex flex-nowrap font-mono text-5xl sm:text-7xl md:text-[6rem] font-bold uppercase tracking-tighter text-[#141414]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear"
            }}
          >
            <div className="flex shrink-0">
              {[...Array(15)].map((_, i) => (
                <span key={`a-${i}`} className="mx-6 sm:mx-10 opacity-90">SORRY</span>
              ))}
            </div>
            <div className="flex shrink-0">
              {[...Array(15)].map((_, i) => (
                <span key={`b-${i}`} className="mx-6 sm:mx-10 opacity-90">SORRY</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lyrics Reveal Section */}
      <div ref={lyricsContainerRef} className="h-[300vh] bg-[#52a8f2] relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center px-4 sm:px-8 xl:px-16 overflow-hidden">
          <div className="w-full max-w-7xl mx-auto">
            <p className="font-mono text-4xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] font-bold uppercase leading-[1.05] tracking-tighter whitespace-pre-wrap">
              {lyricsTokens.map((token, i) => {
                if (token.match(/\s+/)) {
                  return token;
                }
                const start = wordIndex * wordStep;
                const end = start + (wordStep * 0.8); // smaller than 1 to have some overlapping/quick transition
                wordIndex++;
                return (
                  <Word key={i} progress={lyricsProgress} range={[start, end]}>
                    {token}
                  </Word>
                );
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Yellow Screenshot Canvas Section */}
      <div ref={sliderRef} className="h-[300vh] bg-[#fad335] text-[#141414] relative w-full">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden w-full">
          <motion.div 
            className="flex w-[200vw]"
            style={{ x: sliderX }}
          >
            {/* s1.jpg container */}
            <div className="w-screen shrink-0 flex justify-center items-center px-4">
              <div className="w-full max-w-[320px] sm:max-w-[400px]">
                <img 
                  src="/assets/s1.jpg" 
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop" }}
                  alt="s1" 
                  className="w-full aspect-[9/16] object-cover bg-black/5 shadow-2xl"
                />
              </div>
            </div>

            {/* s2.jpg container */}
            <div className="w-screen shrink-0 flex justify-center items-center px-4">
              <div className="w-full max-w-[320px] sm:max-w-[400px]">
                <img 
                  src="/assets/s2.jpg" 
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1551651639-927b595f815c?q=80&w=1000&auto=format&fit=crop" }}
                  alt="s2" 
                  className="w-full aspect-[9/16] object-cover bg-black/5 shadow-2xl"
                />
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Pinned Stats Section */}
      <div className="bg-[#ccabf7] text-[#141414] pt-24 sm:pt-32 pb-32 sm:pb-48 w-full relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 sm:gap-x-12">
            {phrases.map((item, index) => (
              <PinnedBox key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      <ChatToMusicSection />
      
      <SingleScreenshotSection />

      <EndedHereSection />

      <ListenSection />

      <SlidingCurveSection />
    </div>
  );
}
