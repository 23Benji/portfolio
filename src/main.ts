import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { createIcons, ArrowUpRight, Plus } from 'lucide';

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   DATA INJECTION (Skills, Projects, FAQ)
   ========================================= */
const skills = ["Python", "Java", "JavaScript", "React", "Arduino", "Raspberry Pi", "Flask", "Game Dev", "UI Design", "Prototyping"];
const projects = [
  { title: "Desk Jarvis", status: "Prototype", tags: ["React", "Raspberry Pi", "IoT"], desc: "“Something intelligent is about to illuminate your workspace.” A smart desk assistant bridging hardware and software.", visual: "radar", link: "#" },
  { title: "Lexipal", status: "Beta", tags: ["Python", "JavaScript", "AI / NLP"], desc: "A personal AI assistant built using Python and Flask-SocketIO. Focuses on learning new languages and having natural conversations.", visual: "blocks", link: "https://github.com/mp3skater/LexiPal" },
  { title: "Jumping Squared", status: "Top Game", tags: ["Java", "Game Design"], desc: "A rage-platformer game where a square jumps over deadly traps to reach the goal. Focused on precise timing and level design.", visual: "wireframe", link: "https://github.com/mp3skater/Jumping-squared" },
  { title: "Tunnel Sim", status: "Simulation", tags: ["Java", "Networking", "Concurrency"], desc: "Simulates visitor flow for a capacity-limited resource (archaeological tunnel) using a client-server architecture and multi-threading.", visual: "nodes", link: "https://github.com/23Benji/TunnelSim" },
  { title: "Vocab Trainer", status: "App", tags: ["Java", "GUI Application"], desc: "A Java-based vocabulary trainer for learning and managing word pairs. Includes a user-friendly GUI tailored for language learners.", visual: "data", link: "https://github.com/23Benji/Vokabeltrainer" },
  { title: "Chat Server", status: "Network", tags: ["Java", "Multi-client"], desc: "A multi-client chat server implementing threads to handle concurrent connections, allowing real-time text communication over a network.", visual: "grid", link: "https://github.com/23Benji/ChatServer" }
];
const faqs = [
  { q: "What kinds of projects do you enjoy?", a: "Things that mix creativity and tech — stuff that moves, reacts, or just makes people say 'wait, how does that work?'" },
  { q: "What are you currently working on?", a: "Secret... 🤫" },
  { q: "How do you approach learning new tools?", a: "Jump straight into a project and learn as I go. Breaking things (and fixing them again) is the best teacher." },
  { q: "What kinds of challenges do you enjoy solving?", a: "Making hardware and software talk to each other — especially when it ends up doing something useful or just plain cool." }
];

// Marquee
const marqueeContent = skills.map(skill => `<span class="flex items-center mx-4 text-[10px] uppercase tracking-[0.3em] text-white/30">${skill} <span class="mx-8 text-white/10">✦</span></span>`).join("");
document.querySelectorAll('.marquee-content').forEach(el => el.innerHTML = marqueeContent.repeat(3));

const footerWords = ["Code", "Design", "Build", "Create", "Explore", "Prototype", "Innovate", "Ship"];
const footerMarqueeContent = footerWords.map(word => `<span class="flex items-center mx-4 text-[10px] uppercase tracking-[0.3em] text-white/30">${word} <span class="mx-8 text-white/10">✦</span></span>`).join("");
document.getElementById('footer-marquee')!.innerHTML = `<div class="marquee-content flex">${footerMarqueeContent.repeat(3)}</div>`;

// Skills
document.getElementById('skill-pills')!.innerHTML = skills.map(s => `<span class="px-4 py-2 rounded-full border border-white/15 text-[12px] text-white/50 hover:border-white/40 hover:text-white/80 transition-colors">${s}</span>`).join("");

// Projects
const getVisualHTML = (type: string) => {
  if (type === 'radar') return `<div class="absolute inset-0 flex items-center justify-center"><div class="absolute h-8 w-8 rounded-full border border-white/20 animate-radar"></div><div class="absolute h-8 w-8 rounded-full border border-white/20 animate-radar delay-1"></div></div>`;
  if (type === 'blocks') return `<div class="absolute inset-0 flex flex-col justify-center gap-2 px-8 opacity-40"><div class="h-1 rounded-full bg-white animate-block" style="width: 40%"></div><div class="h-1 rounded-full bg-white animate-block" style="width: 80%; animation-delay: 0.2s"></div><div class="h-1 rounded-full bg-white animate-block" style="width: 60%; animation-delay: 0.4s"></div></div>`;
  if (type === 'wireframe') return `<div class="absolute inset-0 flex items-center justify-center [perspective:400px]"><div class="h-16 w-16 border border-white/30 animate-wireframe"></div></div>`;
  if (type === 'nodes') return `<div class="absolute inset-0 flex items-center justify-center"><svg class="absolute h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M20,50 L50,20 L80,50 L50,80 Z" stroke="white" stroke-width="0.5" fill="none"/></svg><div class="h-2 w-2 rounded-full bg-white/50"></div></div>`;
  if (type === 'data') return `<div class="absolute inset-0 flex items-end justify-center gap-1 pb-8 opacity-40"><div class="w-1.5 bg-white animate-data" style="--h: 40px"></div><div class="w-1.5 bg-white animate-data" style="--h: 20px; animation-delay: 0.1s"></div><div class="w-1.5 bg-white animate-data" style="--h: 50px; animation-delay: 0.2s"></div></div>`;
  return `<div class="absolute inset-0 flex items-center justify-center opacity-30"><div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div><div class="h-[2px] w-full bg-white/50 blur-[2px]"></div></div>`; 
};

const projectGrid = document.getElementById('project-grid')!;
projects.forEach((proj, i) => {
  const isComingSoon = proj.link === "#";
  projectGrid.innerHTML += `
    <div class="project-card group relative flex flex-col gap-4" style="perspective: 800px; transform-style: preserve-3d;">
      <div class="card-inner relative h-56 w-full overflow-hidden bg-white/5 border border-white/5 transition-colors group-hover:border-white/15">
        ${getVisualHTML(proj.visual)}
        <div class="glare pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-overlay transition-opacity duration-300"></div>
        <div class="absolute top-4 left-4 z-20 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1"><span class="text-[9px] uppercase tracking-widest text-white/70">${proj.status}</span></div>
        <div class="absolute top-4 right-4 z-20"><span class="font-space font-black text-[12px] text-white/20">0${i + 1}</span></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0 opacity-80"></div>
      </div>
      <div class="pt-2">
        <div class="flex items-center justify-between">
          <h3 class="font-space font-black text-2xl text-white tracking-tight">${proj.title}</h3>
          <a href="${proj.link}" target="${isComingSoon ? '_self' : '_blank'}" class="h-10 w-10 rounded-full border flex items-center justify-center transition-colors ${isComingSoon ? 'border-white/10 opacity-50 cursor-not-allowed' : 'border-white/20 hover:bg-white text-white hover:text-black'}">
            <i data-lucide="arrow-up-right" class="h-5 w-5 transition-transform ${isComingSoon ? '' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}"></i>
          </a>
        </div>
        <p class="mt-3 text-[12px] leading-relaxed text-white/50">${proj.desc}</p>
        <div class="mt-5 flex flex-wrap gap-2">
          ${proj.tags.map(t => `<span class="rounded-full bg-white/10 px-3 py-1 text-[9px] uppercase tracking-widest text-white/60">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
});

// FAQs
const faqContainer = document.getElementById('faq-container')!;
faqs.forEach((faq, i) => {
  faqContainer.innerHTML += `
    <div class="cinematic-text border-b border-white/10 py-6">
      <button class="faq-btn flex w-full items-center justify-between group">
        <span class="text-[14px] md:text-[18px] text-left transition-colors text-white/60 group-hover:text-white font-inter">${faq.q}</span>
        <i data-lucide="plus" class="faq-icon h-[20px] w-[20px] text-white/40 group-hover:text-white transition-all duration-300"></i>
      </button>
      <div class="faq-answer overflow-hidden h-0 opacity-0">
        <p class="pt-6 text-[14px] text-white/50 leading-relaxed pr-12 font-inter">${faq.a}</p>
      </div>
    </div>
  `;
});

// Initialize Icons
createIcons({ icons: { ArrowUpRight, Plus } });

/* =========================================
   FAQ ACCORDION LOGIC
   ========================================= */
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = e.currentTarget as HTMLElement;
    const answer = target.nextElementSibling as HTMLElement;
    const icon = target.querySelector('.faq-icon') as HTMLElement;
    const text = target.querySelector('span') as HTMLElement;
    
    const isOpen = answer.classList.contains('is-open');
    
    if (isOpen) {
      gsap.to(answer, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(icon, { rotate: 0, duration: 0.3 });
      text.classList.remove('text-white', 'font-bold');
      text.classList.add('text-white/60');
      answer.classList.remove('is-open');
    } else {
      gsap.to(answer, { height: "auto", opacity: 1, duration: 0.3, ease: "power2.inOut" });
      gsap.to(icon, { rotate: 45, duration: 0.3 });
      text.classList.add('text-white', 'font-bold');
      text.classList.remove('text-white/60');
      answer.classList.add('is-open');
    }
  });
});

/* =========================================
   THREE.JS BACKGROUND
   ========================================= */
const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 15;

const dotsGroup = new THREE.Group();
const dotsData: any[] = [];
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
const geometry = new THREE.CircleGeometry(0.04, 16);

for (let x = 0; x < 18; x++) {
  for (let y = 0; y < 12; y++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((x - 9) * 2, (y - 6) * 2, 0);
    dotsGroup.add(mesh);
    dotsData.push({ mesh, offset: Math.random() * 100 });
  }
}

// Lines
for (let i = 0; i < 12; i++) {
  const d1 = dotsData[Math.floor(Math.random() * dotsData.length)].mesh.position;
  const d2 = dotsData[Math.floor(Math.random() * dotsData.length)].mesh.position;
  const lineGeo = new THREE.BufferGeometry().setFromPoints([d1, d2]);
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 });
  scene.add(new THREE.Line(lineGeo, lineMat));
}

scene.add(dotsGroup);

let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();
  
  camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
  camera.position.y += (mouseY * 2 - camera.position.y) * 0.03;
  
  dotsData.forEach(d => {
    const scale = 1 + Math.sin(time * 2 + d.offset) * 0.4;
    d.mesh.scale.setScalar(scale);
  });
  
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* =========================================
   GSAP ANIMATIONS
   ========================================= */
// 1. Custom Cursor
const cursorRing = document.getElementById('cursor-ring')!;
const cursorDot = document.getElementById('cursor-dot')!;
const xTo = gsap.quickTo(cursorRing, "x", { duration: 0.6, ease: "power3" });
const yTo = gsap.quickTo(cursorRing, "y", { duration: 0.6, ease: "power3" });

window.addEventListener('mousemove', (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
  gsap.set(cursorDot, { x: e.clientX, y: e.clientY });
});

document.querySelectorAll('a, button, input, textarea, .faq-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursorRing, { scale: 2.2, opacity: 0.5, duration: 0.3 });
    gsap.to(cursorDot, { opacity: 0, duration: 0.1 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursorRing, { scale: 1, opacity: 1, duration: 0.3 });
    gsap.to(cursorDot, { opacity: 1, duration: 0.1 });
  });
});

// 2. Initial Load Sequence
const tl = gsap.timeline();
tl.to("#navbar", { opacity: 1, duration: 1, delay: 0.5 })
  .fromTo(".hero-word", { y: "110%" }, { y: "0%", duration: 0.8, stagger: 0.13, ease: "power4.out" }, "-=0.5")
  .to(".hero-fade", { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }, "-=0.2")
  .to("#scroll-line", { scaleY: 1, duration: 1.4, ease: "power3.inOut" }, "-=1")
  .to("#scroll-dot", { y: 8, duration: 0.8, repeat: -1, yoyo: true, ease: "power1.inOut" });

// 3. Cinematic Blur Reveals
gsap.utils.toArray('.cinematic-text').forEach((el: any) => {
  gsap.fromTo(el, 
    { opacity: 0, y: 80, filter: 'blur(10px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: "power3.out", 
      scrollTrigger: { trigger: el, start: "top 85%" }
    }
  );
});

// 4. Project Card Scrub & 3D Hover
gsap.utils.toArray('.project-card').forEach((card: any) => {
  gsap.fromTo(card,
    { y: 150, scale: 0.8, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, ease: "none",
      scrollTrigger: { trigger: card, start: "top 110%", end: "top 60%", scrub: 1 }
    }
  );

  const inner = card.querySelector('.card-inner');
  const glare = card.querySelector('.glare');
  
  card.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    
    gsap.to(card, { rotateX: (py - 0.5) * -20, rotateY: (px - 0.5) * 20, duration: 0.5, ease: "power2.out" });
    gsap.set(glare, { opacity: 1, background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.4) 0%, transparent 60%)` });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
    gsap.to(glare, { opacity: 0, duration: 0.3 });
  });
});

/* =========================================
   FORMSPREE FETCH
   ========================================= */
const form = document.getElementById('contact-form') as HTMLFormElement;
const submitBtn = document.getElementById('submit-btn')!;
const submitText = document.getElementById('submit-text')!;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitText.innerText = "Sending...";
  submitBtn.style.opacity = "0.5";
  submitBtn.style.pointerEvents = "none";
  
  try {
    const res = await fetch("https://formspree.io/f/xqapvagk", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });
    
    if (res.ok) {
      submitText.innerText = "Message Sent!";
      form.reset();
    } else {
      submitText.innerText = "Error! Try Again";
    }
  } catch (err) {
    submitText.innerText = "Error! Try Again";
  }
  
  setTimeout(() => {
    submitText.innerText = "Send Message";
    submitBtn.style.opacity = "1";
    submitBtn.style.pointerEvents = "auto";
  }, 5000);
});