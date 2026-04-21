import React, { useEffect, useMemo, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import "@css/pages/game.css";

type TopScore = {
  nickname: string;
  best_score: number;
};

type Props = {
  topScores: TopScore[];
};

const GROUND_Y = 220;
const DINO_SIZE = 40;
const OBSTACLE_WIDTH = 25;
const OBSTACLE_HEIGHT = 45;
const GRAVITY = 0.6;
const JUMP_FORCE = -11;
const BASE_GAME_SPEED = 5;
const SPEED_INCREMENT = 0.3; // Incremento de velocidad cada 100 puntos

// Obstáculos posibles (sprites pixel por CSS)
const OBSTACLES = [
  { variant: "" },
  { variant: "variant-big" },
  { variant: "variant-small" },
];

export default function Game({ topScores }: Props) {
  const [nickname, setNickname] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [currentObstacle, setCurrentObstacle] = useState(OBSTACLES[0]);

  // Físicas usando refs para no saturar los re-renders de React
  const stateRef = useRef({
    dinoY: 0,
    velocityY: 0,
    obstacleX: 600,
    score: 0,
    currentSpeed: BASE_GAME_SPEED,
  });

  const rafRef = useRef<number | null>(null);

  // Referencias al DOM para animar a 60FPS sin re-renderizar
  const dinoRef = useRef<HTMLDivElement>(null);
  const obstacleRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  const canStart = useMemo(() => nickname.trim().length >= 2, [nickname]);

  const resetGame = () => {
    stateRef.current = { dinoY: 0, velocityY: 0, obstacleX: 600, score: 0, currentSpeed: BASE_GAME_SPEED };
    setFinalScore(0);
    setIsGameOver(false);
    setIsJumping(false);
    setCurrentObstacle(OBSTACLES[0]);
    updateDOM();
  };

  const jump = () => {
    if (!hasStarted || isGameOver) return;
    if (stateRef.current.dinoY === 0) {
      stateRef.current.velocityY = JUMP_FORCE;
      setIsJumping(true);
    }
  };

  const handleStart = () => {
    if (!canStart) return;
    resetGame();
    setHasStarted(true);
  };

  const handleRestart = () => {
    resetGame();
    setHasStarted(true);
  };

  const handleSaveScore = () => {
    if (isSaving) return;
    setIsSaving(true);
    router.post(
      "/game/scores",
      { nickname: nickname.trim(), score: finalScore },
      { preserveScroll: true, onFinish: () => setIsSaving(false) }
    );
  };

  const updateDOM = () => {
    if (dinoRef.current) {
      dinoRef.current.style.transform = `translateY(${stateRef.current.dinoY}px)`;
    }
    if (obstacleRef.current) {
      obstacleRef.current.style.transform = `translateX(${stateRef.current.obstacleX}px)`;
    }
    if (scoreRef.current) {
      const speedMultiplier = ((stateRef.current.currentSpeed / BASE_GAME_SPEED) * 100).toFixed(0);
      const score = Math.floor(stateRef.current.score).toString().padStart(5, "0");
      scoreRef.current.innerHTML = `
        SCORE ${score}
        <span class="speed-badge">SPD ×${speedMultiplier}%</span>
      `;
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (!hasStarted) {
          if (canStart) handleStart();
          return;
        }
        jump();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasStarted, canStart, isGameOver, nickname]);

  useEffect(() => {
    if (!hasStarted || isGameOver) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min(32, time - lastTime);
      lastTime = time;
      const factor = delta / 16.67;

      const s = stateRef.current;

      // Gravedad
      s.velocityY += GRAVITY * factor;
      s.dinoY += s.velocityY * factor;

      if (s.dinoY > 0) {
        s.dinoY = 0;
        s.velocityY = 0;
        setIsJumping(false);
      }

      // Dificultad progresiva: aumentar velocidad cada 100 puntos
      const speedLevel = Math.floor(s.score / 100);
      s.currentSpeed = BASE_GAME_SPEED + (speedLevel * SPEED_INCREMENT);

      // Mover obstáculo con velocidad progresiva
      s.obstacleX -= s.currentSpeed * factor;
      if (s.obstacleX < -OBSTACLE_WIDTH) {
        // Reducir espacio entre obstáculos conforme aumenta la dificultad
        const minGap = Math.max(160, 400 - (speedLevel * 25));
        s.obstacleX = 600 + Math.random() * minGap;

        // Variación de obstáculos: desde el nivel 2 pueden aparecer otros tipos
        if (speedLevel >= 2) {
          const next = OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)];
          setCurrentObstacle(next);
        }
      }

      // Puntos (más rápido = más puntos por segundo)
      s.score += (0.2 + speedLevel * 0.05) * factor;

      // Colisión (Cálculos simples basados en posiciones reales)
      const dinoLeft = 80;
      const dinoRight = dinoLeft + DINO_SIZE;
      const dinoBottom = GROUND_Y + s.dinoY;
      const dinoTop = dinoBottom - DINO_SIZE;

      const obsLeft = s.obstacleX;
      const obsRight = s.obstacleX + OBSTACLE_WIDTH;
      const obsBottom = GROUND_Y;
      const obsTop = GROUND_Y - OBSTACLE_HEIGHT;

      // Reducimos un poco la "caja de colisión" (hitbox) del dino para que sea más justo
      const margin = 8;
      
      const hitX = (dinoRight - margin) > obsLeft && (dinoLeft + margin) < obsRight;
      const hitY = dinoBottom > obsTop && (dinoTop + margin) < obsBottom;

      updateDOM();

      if (hitX && hitY) {
        setFinalScore(Math.floor(s.score));
        setIsGameOver(true);
      } else {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hasStarted, isGameOver]);

  return (
    <div className="game-page">
      <div className="game-header">
        <h1 className="game-title">Mini Dino Arcade</h1>
        <p className="game-subtitle">¿ Aceptas el reto de la máquina ?</p>
      </div>

      <div className="game-container">
        {/* Panel izquierdo: El juego */}
        <div className="game-main-panel">
          <div className="game-topbar">
            <div className="input-group">
              <span className="input-icon">ID</span>
              <input
                id="nickname"
                className="game-input"
                type="text"
                value={nickname}
                maxLength={20}
                placeholder="NICKNAME"
                onChange={(e) => setNickname(e.target.value.replace(/\s+/g, ""))}
                disabled={hasStarted}
              />
            </div>
            {!hasStarted && (
              <button className="btn-primary" onClick={handleStart} disabled={!canStart}>
                {isGameOver ? "Reintentar" : "Jugar"}
              </button>
            )}
          </div>

          <div className="game-score-display" ref={scoreRef}>SCORE 00000</div>

          <div
            className="game-world"
            onClick={jump}
            role="button"
            tabIndex={0}
          >
            <div className="sky-elements">
              <div className="cloud cloud-1" />
              <div className="cloud cloud-2" />
            </div>

            {/* Objetos con posición base definida en CSS, transform animado por Ref */}
            <div ref={dinoRef} className={`dino ${isJumping ? 'jumping' : ''}`} />
            
            <div ref={obstacleRef} className={`obstacle ${currentObstacle.variant}`} />

            <div className="ground" />

            {!hasStarted && !isGameOver && (
              <div className="overlay-blur">
                <div className="start-prompt">
                  <h3>Insert Coin</h3>
                  <p>Escribe tu nick y pulsa Jugar</p>
                </div>
              </div>
            )}

            {isGameOver && (
              <div className="overlay-blur danger">
                <div className="game-over-box">
                  <h2>Game Over</h2>
                  <p className="final-score">
                    Puntuación final <strong>{finalScore}</strong>
                  </p>
                  <div className="overlay-actions">
                    <button className="btn-secondary" onClick={handleRestart}>
                      Reintentar
                    </button>
                    <button className="btn-primary" onClick={handleSaveScore} disabled={isSaving}>
                      {isSaving ? "Guardando..." : "Guardar Récord"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {hasStarted && !isGameOver && (
            <p className="controls-hint">[ Espacio ] [ ↑ ] [ Click ] para saltar</p>
          )}
        </div>

        {/* Panel derecho: Ranking */}
        <div className="game-side-panel">
          <div className="ranking-card">
            <h2 className="ranking-title">Top Records</h2>
            {topScores.length === 0 ? (
              <div className="empty-state">
                <p>Sin récords</p>
                <span>¡Sé el primero!</span>
              </div>
            ) : (
              <ol className="ranking-list">
                {topScores.map((row, index) => (
                  <li key={row.nickname + index} className="ranking-item">
                    <div className="rank-badge">#{index + 1}</div>
                    <span className="ranking-name">{row.nickname}</span>
                    <span className="ranking-score">{row.best_score}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}