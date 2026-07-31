// 'use client';

// import { motion } from 'framer-motion';
// import { FlaskConical, Database, Cpu, TrendingUp, FileText, ArrowUpRight } from 'lucide-react';
// import { RESEARCH } from '@/lib/portfolio-data';

// export default function ResearchSection() {
//   return (
//     <section
//       id="research"
//       className="relative py-24 md:py-32 bg-white overflow-hidden"
//     >
//       <div className="grid-pattern absolute inset-0 opacity-30" />

//       <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="mb-16"
//         >
//           <span className="section-label mb-4">Publications</span>
//           <h2 className="heading-lg mt-4">
//             <span className="text-brand-blue">Research</span> & Papers
//           </h2>
//           <p className="body-base max-w-xl mt-4">
//             Where AI meets real-world problems — peer-reviewed research and
//             experiments.
//           </p>
//         </motion.div>

//         {/* Magazine layout */}
//         <div className="grid lg:grid-cols-12 gap-6">
//           {/* Featured research */}
//           <motion.article
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="lg:col-span-7"
//           >
//             <div className="brutal-card shadow-brutal-lg overflow-hidden h-full flex flex-col">
//               <div className={`h-56 ${RESEARCH[0].color} border-b-2 border-black relative overflow-hidden`}>
//                 <div className="absolute inset-0 grid-pattern-dark opacity-30" />
//                 <div className="absolute inset-0 flex flex-col justify-center p-8">
//                   <span className="font-heading text-sm font-bold text-black/60 mb-2">
//                     FEATURED PAPER
//                   </span>
//                   <h3 className="font-heading text-2xl md:text-3xl font-bold leading-tight">
//                     {RESEARCH[0].title}
//                   </h3>
//                 </div>
//                 <div className="absolute top-4 right-4 border-2 border-black bg-white rounded-2xl px-4 py-2">
//                   <div className="font-heading text-3xl font-bold">
//                     {RESEARCH[0].accuracy}
//                   </div>
//                   <div className="font-body text-xs text-black/60">Accuracy</div>
//                 </div>
//               </div>
//               <div className="p-6 flex flex-col flex-1">
//                 <p className="body-base mb-6">{RESEARCH[0].abstract}</p>

//                 <div className="grid grid-cols-2 gap-3 mt-auto">
//                   <div className="border-2 border-black rounded-xl p-3">
//                     <div className="flex items-center gap-2 mb-1">
//                       <Database size={14} />
//                       <span className="font-heading text-xs font-bold">
//                         Dataset
//                       </span>
//                     </div>
//                     <p className="font-body text-xs text-black/70">
//                       {RESEARCH[0].dataset}
//                     </p>
//                   </div>
//                   <div className="border-2 border-black rounded-xl p-3">
//                     <div className="flex items-center gap-2 mb-1">
//                       <Cpu size={14} />
//                       <span className="font-heading text-xs font-bold">
//                         Method
//                       </span>
//                     </div>
//                     <p className="font-body text-xs text-black/70">
//                       {RESEARCH[0].method}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 mt-4 p-3 border-2 border-black rounded-xl bg-brand-green/10">
//                   <TrendingUp size={18} className="text-brand-green" />
//                   <span className="font-body text-sm font-medium">
//                     {RESEARCH[0].result}
//                   </span>
//                 </div>

//                 <a
//                   href="#"
//                   className="brutal-btn mt-4 w-full"
//                 >
//                   <FileText size={18} />
//                   Read Full Paper
//                 </a>
//               </div>
//             </div>
//           </motion.article>

//           {/* Side research cards */}
//           <div className="lg:col-span-5 flex flex-col gap-6">
//             {RESEARCH.slice(1).map((paper, i) => (
//               <motion.article
//                 key={paper.id}
//                 initial={{ opacity: 0, x: 30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: i * 0.15 }}
//                 className="brutal-card shadow-brutal overflow-hidden flex-1"
//               >
//                 <div className={`h-2 ${paper.color} border-b-2 border-black`} />
//                 <div className="p-5">
//                   <div className="flex items-start justify-between gap-3 mb-3">
//                     <div className="flex items-center gap-2">
//                       <div className={`border-2 border-black rounded-lg p-1.5 ${paper.color}`}>
//                         <FlaskConical size={16} />
//                       </div>
//                       <span className="font-heading text-xs font-bold text-black/50">
//                         {paper.field}
//                       </span>
//                     </div>
//                     <div className="border-2 border-black rounded-lg px-2 py-1 bg-brand-yellow">
//                       <span className="font-heading text-sm font-bold">
//                         {paper.accuracy}
//                       </span>
//                     </div>
//                   </div>
//                   <h3 className="font-heading text-lg font-bold mb-2 leading-tight">
//                     {paper.title}
//                   </h3>
//                   <p className="font-body text-sm text-black/70 mb-3 line-clamp-2">
//                     {paper.abstract}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mb-3">
//                     <span className="border-2 border-black rounded-md px-2 py-0.5 bg-brand-blue/10 font-heading text-xs font-bold">
//                       {paper.method}
//                     </span>
//                   </div>
//                   <a
//                     href="#"
//                     className="inline-flex items-center gap-1 font-heading text-sm font-bold hover:text-brand-blue transition-colors"
//                   >
//                     Preview Paper
//                     <ArrowUpRight size={14} />
//                   </a>
//                 </div>
//               </motion.article>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
