import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';

type Obstacle = { id: number; x: number; label: string; color: string; text: string };
type Game = { running: boolean; over: boolean; y: number; velocity: number; obstacles: Obstacle[]; frame: number; score: number; shownScore: number; speed: number; lastSpawn: number; nextSpawn: number; lastTick: number };

const HEIGHT = 180;
const FLOOR = 160;
const BASE_SPEED = 360;
const GRAVITY = 1680;
const JUMP_FORCE = -620;
const makeGame = (): Game => ({ running: false, over: false, y: FLOOR, velocity: 0, obstacles: [], frame: 0, score: 0, shownScore: 0, speed: BASE_SPEED, lastSpawn: 0, nextSpawn: nextSpawnDelay(BASE_SPEED), lastTick: 0 });

function nextSpawnDelay(speed: number) {
  const progress = Math.min(1, Math.max(0, (speed - BASE_SPEED) / (620 - BASE_SPEED)));
  return 1.26 + Math.random() * (1.7 - progress * 0.78);
}

function drawRunner(ctx: CanvasRenderingContext2D, y: number, frame: number, gameOver = false) {
  const x = 52;
  ctx.save();
  if (gameOver) { ctx.translate(x + 26, y - 22); ctx.rotate(-0.2); ctx.translate(-x - 26, -y + 22); }
  ctx.fillStyle = gameOver ? '#737373' : '#292522';
  ctx.fillRect(x + 9, y - 37, 18, 5);
  ctx.fillRect(x + 5, y - 32, 24, 5);
  ctx.fillStyle = '#efbd91';
  ctx.fillRect(x + 9, y - 27, 21, 13);
  ctx.fillStyle = '#292522';
  ctx.fillRect(x + 25, y - 23, 3, 3);
  ctx.fillStyle = '#426b75';
  ctx.fillRect(x + 10, y - 14, 18, 12);
  ctx.fillStyle = '#efbd91';
  ctx.fillRect(x + 4, y - 12, 7, 4);
  ctx.fillStyle = '#292522';
  if (Math.floor(frame / 6) % 2 === 0) {
    ctx.fillRect(x + 11, y - 2, 6, 2); ctx.fillRect(x + 21, y - 3, 7, 3);
    ctx.fillRect(x + 8, y, 9, 2); ctx.fillRect(x + 23, y, 11, 2);
  } else {
    ctx.fillRect(x + 10, y - 3, 7, 3); ctx.fillRect(x + 22, y - 2, 6, 2);
    ctx.fillRect(x + 4, y, 11, 2); ctx.fillRect(x + 23, y, 9, 2);
  }
  ctx.restore();
}

function FooterRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game>(makeGame());
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);

  const start = () => {
    game.current = { ...makeGame(), running: true, lastSpawn: performance.now() / 1000 };
    setScore(0); setOver(false); setRunning(true);
    window.requestAnimationFrame(() => document.querySelector('[data-footer-border]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  };
  const close = () => { game.current = makeGame(); setScore(0); setOver(false); setRunning(false); };
  const jump = () => {
    const current = game.current;
    if (!current.running) { start(); return; }
    if (current.over) { start(); return; }
    if (current.y >= FLOOR) current.velocity = JUMP_FORCE;
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || event.repeat || (!running && !over)) return;
      if (event.target instanceof HTMLElement && ['BUTTON', 'A', 'INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
      const bounds = canvasRef.current?.getBoundingClientRect();
      if (!bounds || bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      event.preventDefault(); jump();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [running, over]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const resize = () => { canvas.width = Math.max(320, Math.floor(canvas.getBoundingClientRect().width)); };
    resize();
    window.addEventListener('resize', resize);
    if (!running && !over) { ctx.clearRect(0, 0, canvas.width, HEIGHT); return () => window.removeEventListener('resize', resize); }
    let raf = 0;
    const draw = () => {
      const current = game.current;
      const fg = getComputedStyle(document.body).color;
      const now = performance.now() / 1000;
      const dt = current.lastTick ? Math.min(now - current.lastTick, 0.05) : 1 / 60;
      current.lastTick = now;
      ctx.clearRect(0, 0, canvas.width, HEIGHT);
      ctx.strokeStyle = fg; ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.moveTo(0, FLOOR + 1); ctx.lineTo(canvas.width, FLOOR + 1); ctx.stroke(); ctx.globalAlpha = 1;

      if (current.running && !current.over) {
        current.frame += dt * 60;
        current.velocity += GRAVITY * dt;
        current.y = Math.min(FLOOR, current.y + current.velocity * dt);
        if (current.y === FLOOR) current.velocity = 0;
        if (now - current.lastSpawn > current.nextSpawn) {
          const logos = [
            { label: 'JS', color: '#f7df1e', text: '#171717' },
            { label: 'R', color: '#20232a', text: '#61dafb' },
            { label: 'N', color: '#417e38', text: '#ffffff' },
            { label: 'DB', color: '#00684a', text: '#ffffff' },
            { label: 'Py', color: '#3776ab', text: '#ffd343' },
            { label: 'TS', color: '#3178c6', text: '#ffffff' },
            { label: 'AWS', color: '#232f3e', text: '#ff9900' },
          ];
          const logo = logos[Math.floor(Math.random() * logos.length)];
          current.obstacles.push({ id: current.frame, x: canvas.width + 46, ...logo });
          current.lastSpawn = now; current.nextSpawn = nextSpawnDelay(current.speed);
        }
        current.obstacles.forEach((obstacle) => { obstacle.x -= current.speed * dt; });
        current.obstacles = current.obstacles.filter((obstacle) => obstacle.x > -50);
        current.speed = Math.min(620, current.speed + 3.2 * dt);
        current.score += dt * 60 * (current.speed / BASE_SPEED);
      const shownScore = Math.floor(current.score / 20);
        if (shownScore !== current.shownScore) { current.shownScore = shownScore; setScore(shownScore); }
        if (current.obstacles.some((obstacle) => 98 > obstacle.x + 5 && 61 < obstacle.x + 41 && current.y > FLOOR - 46 + 8)) {
          current.running = false; current.over = true; setRunning(false); setOver(true);
        }
      }

      drawRunner(ctx, current.y, current.running ? current.frame : 0, current.over);
      current.obstacles.forEach((obstacle) => {
        const size = 46;
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, FLOOR - size, size, size);
        ctx.fillStyle = obstacle.text; ctx.font = `bold ${obstacle.label.length > 2 ? 9 : 12}px ui-monospace, SFMono-Regular, Menlo, monospace`; ctx.textAlign = 'center';
        ctx.fillText(obstacle.label, obstacle.x + size / 2, FLOOR - size / 2 + 4);
      });
      if (current.over) { ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace'; ctx.textAlign = 'center'; ctx.fillStyle = fg; ctx.fillText('GAME OVER', canvas.width / 2, 22); }
      if (current.running) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [running, over]);

  const stop = () => close();

  return (
    <>
      <div className="footer-runner-controls">
        <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
          {!running && !over && <button type="button" onClick={start} className="inline-flex items-center gap-2 underline decoration-neutral-400 underline-offset-4 hover:decoration-neutral-800 dark:hover:decoration-neutral-200"><span aria-hidden="true">▷</span> play dinosaur game</button>}
          {(running || over) && <div className="footer-runner-hud"><p className="text-xs">Score</p><p className="text-lg leading-5">{score}</p><button type="button" onClick={over ? close : stop} className="mt-1 underline underline-offset-4">{over ? 'close' : 'stop'}</button></div>}
        </div>
        {!running && !over && <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">space to jump</p>}
        {over && <button type="button" onClick={start} className="mt-2 inline-flex underline underline-offset-4">play again</button>}
      </div>
      <div className="footer-runner-stage">
        <canvas ref={canvasRef} width={960} height={HEIGHT} onPointerDown={running || over ? jump : undefined} className="footer-runner-canvas" aria-label="Pixel runner game" />
      </div>
    </>
  );
}

export default function Footer() {
  return (
    <footer className="portfolio-footer">
      <div className="footer-art-wrap">
        <img src="/footer-portrait.png" alt="Pixel outline portrait of Rohit Gupta" className="footer-portrait" />
        <div className="footer-art-meta">
          <FooterRunner />
        </div>
        <div className="footer-game-anchor" data-footer-border aria-hidden="true" />
      </div>
      <div className="footer-copyright">
        <svg aria-hidden="true" className="footer-copyright-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M14.8 14.8a4 4 0 1 1 0-5.6" /></svg>
        <p>{profile.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
