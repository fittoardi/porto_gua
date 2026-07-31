// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Award, ExternalLink, RefreshCw } from 'lucide-react';
// import { CERTIFICATES } from '@/lib/portfolio-data';

// export default function CertificatesSection() {
//   const [flipped, setFlipped] = useState<Set<string>>(new Set());

//   const toggleFlip = (id: string) => {
//     setFlipped((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id);
//       else next.add(id);
//       return next;
//     });
//   };

//   return (
//     <section
//       id="certificates"
//       className="relative py-24 md:py-32 bg-brand-bg overflow-hidden"
//     >
//       <div className="dots-pattern absolute inset-0 opacity-40" />

//       <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, rotateX: 90 }}
//           whileInView={{ opacity: 1, rotateX: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="mb-16 text-center"
//         >
//           <span className="section-label mb-4">Credentials</span>
//           <h2 className="heading-lg mt-4">
//             <span className="text-brand-pink">Certificates</span> & Awards
//           </h2>
//           <p className="body-base max-w-xl mx-auto mt-4">
//             Click a card to flip it and see the details.
//           </p>
//         </motion.div>

//         {/* Flip cards */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {CERTIFICATES.map((cert, i) => (
//             <motion.div
//               key={cert.id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: i * 0.1 }}
//               className="flip-card h-72 cursor-pointer"
//               data-flipped={flipped.has(cert.id)}
//               onClick={() => toggleFlip(cert.id)}
//             >
//               <div
//                 className={`flip-card-inner relative w-full h-full ${
//                   flipped.has(cert.id) ? 'flipped' : ''
//                 }`}
//               >
//                 {/* Front */}
//                 <div className="flip-card-front absolute inset-0 brutal-card shadow-brutal-lg overflow-hidden">
//                   <div
//                     className={`h-full flex flex-col items-center justify-center p-6 ${cert.color}`}
//                   >
//                     <div className="border-2 border-black rounded-2xl bg-white p-4 mb-4">
//                       <Award size={48} className="text-black" />
//                     </div>
//                     <h3 className="font-heading text-lg font-bold text-center mb-2">
//                       {cert.title}
//                     </h3>
//                     <p className="font-body text-sm text-black/70 text-center">
//                       {cert.issuer}
//                     </p>
//                     <div className="mt-4 flex items-center gap-1 border-2 border-black rounded-full bg-white px-3 py-1">
//                       <RefreshCw size={12} />
//                       <span className="font-heading text-xs font-bold">
//                         Flip
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Back */}
//                 <div className="flip-card-back absolute inset-0 brutal-card shadow-brutal-lg overflow-hidden bg-white">
//                   <div className="h-full flex flex-col justify-between p-6">
//                     <div>
//                       <div className="flex items-center gap-2 mb-3">
//                         <div className={`border-2 border-black rounded-lg p-1 ${cert.color}`}>
//                           <Award size={16} />
//                         </div>
//                         <span className="font-heading text-xs font-bold">
//                           {cert.date}
//                         </span>
//                       </div>
//                       <h3 className="font-heading text-base font-bold mb-2">
//                         {cert.title}
//                       </h3>
//                       <p className="font-body text-sm text-black/70 leading-relaxed">
//                         {cert.description}
//                       </p>
//                     </div>
//                     <a
//                       href={cert.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       onClick={(e) => e.stopPropagation()}
//                       className="brutal-btn-primary text-sm w-full"
//                     >
//                       <ExternalLink size={16} />
//                       View Certificate
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
