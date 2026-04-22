import React, { useEffect, useMemo, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import GameEngine from "./engine/GameEngine";
import "@css/pages/game.css";

type TopScore = {
  nickname: string;
  best_score: number;
};

type Props = {
  topScores: TopScore[];
};

export default function Game({ topScores }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const rafRef = useRef<number | null>(null);
  const frameTimeRef = useRef(0);

  const [nickname, setNickname] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const canStartRef = useRef(false);
  const hasStartedRef = useRef(false);
  const isGameOverRef = useRef(false);

  const canSave = useMemo(() => nickname.trim().length >= 2, [nickname]);

  // El juego arranca sin requerir nickname — se pide al finalizar
  const canStart = true;

  useEffect(() => {
    canStartRef.current = true; // inicio no requiere nickname
  }, [canStart]);

  useEffect(() => {
    hasStartedRef.current = hasStarted;
  }, [hasStarted]);

  useEffect(() => {
    isGameOverRef.current = isGameOver;
  }, [isGameOver]);

  const syncStartedState = () => {
    if (!hasStartedRef.current) {
      setHasStarted(true);
    }
  };

  const clearGameOverState = () => {
    if (isGameOverRef.current) {
      setIsGameOver(false);
    }
    setFinalScore(0);
  };

  const handleStartOrRestartFromInput = () => {
    const engine = engineRef.current;
    if (!engine) return;

    if (engine.isWaitingToStart()) {
      if (!canStartRef.current) return;
      engine.start();
      syncStartedState();
      clearGameOverState();
      return;
    }

    if (engine.isGameOver() && engine.canRestart(frameTimeRef.current || performance.now())) {
      engine.start();
      clearGameOverState();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new GameEngine({
      canvas,
      onGameOver: (score) => {
        setFinalScore(score);
        setIsGameOver(true);
      },
    });

    engineRef.current = engine;

    const loop = (time: number) => {
      frameTimeRef.current = time;
      engine.update(time);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      setTimeout(() => {
        engineRef.current?.resize();
      }, 500);
    };

    window.addEventListener("resize", onResize);

    const orientation = screen.orientation;
    if (orientation) {
      orientation.addEventListener("change", onResize);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (orientation) {
        orientation.removeEventListener("change", onResize);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        const engine = engineRef.current;
        if (!engine) return;
        engine.setJumpPressed(true);
        return;
      }

      if (event.code === "ArrowDown") {
        event.preventDefault();
        engineRef.current?.setDuckPressed(true);
        return;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        const engine = engineRef.current;
        if (!engine) return;
        engine.setJumpPressed(false);
        handleStartOrRestartFromInput();
        return;
      }

      if (event.code === "ArrowDown") {
        event.preventDefault();
        engineRef.current?.setDuckPressed(false);
        return;
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      const engine = engineRef.current;
      if (!engine) return;

      engine.setJumpPressed(true);
      handleStartOrRestartFromInput();
    };

    const onTouchEnd = () => {
      engineRef.current?.setJumpPressed(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [canStart]);

  const handleStart = () => {
    if (!canStart) return;

    engineRef.current?.start();
    setHasStarted(true);
    clearGameOverState();
  };

  const handleRestart = () => {
    engineRef.current?.start();
    clearGameOverState();
  };

  const handleSaveScore = () => {
    if (isSaving || !canSave) return;
    setIsSaving(true);
    router.post(
      "/game/scores",
      { nickname: nickname.trim(), score: finalScore },
      { preserveScroll: true, onFinish: () => setIsSaving(false) }
    );
  };

  return (
    <div className="game-page">
      <div className="game-container">
        <div className="game-main-panel">

          <div
            className="game-world"
            onClick={handleStartOrRestartFromInput}
          >
            <canvas ref={canvasRef} className="game-canvas" id="game" />
          </div>

          {isGameOver && (
            <div className="overlay-blur danger" onClick={(e) => e.stopPropagation()}>
              <div className="game-over-box">
                <h2>Game Over</h2>
                <p className="final-score">
                  Puntuación final <strong>{finalScore}</strong>
                </p>

                <label className="modal-nick-label" htmlFor="modal-nickname">
                  Tu nickname
                </label>
                <input
                  id="modal-nickname"
                  className="modal-nick-input"
                  type="text"
                  value={nickname}
                  maxLength={20}
                  placeholder="Escribe tu nick"
                  autoFocus
                  onChange={(e) => setNickname(e.target.value.replace(/[^A-Za-z0-9_]/g, ""))}
                />

                <div className="modal-ranking">
                  <h3 className="modal-ranking-title">Top Records</h3>
                  {topScores.length === 0 ? (
                    <p className="modal-empty-state">Sin récords todavía</p>
                  ) : (
                    <ol className="modal-ranking-list">
                      {topScores.map((row, index) => (
                        <li key={row.nickname + index} className="modal-ranking-item">
                          <span className="modal-rank">#{index + 1}</span>
                          <span className="modal-name">{row.nickname}</span>
                          <span className="modal-score">{row.best_score}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>

                <div className="overlay-actions">
                  <button className="btn-secondary" onClick={handleRestart}>
                    Reintentar
                  </button>
                  <button className="btn-primary" onClick={handleSaveScore} disabled={isSaving || !canSave}>
                    {isSaving ? "Guardando..." : "Guardar Récord"}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {hasStarted && !isGameOver && (
            <p className="controls-hint">[ Espacio ] saltar &nbsp;·&nbsp; [ ↓ ] agacharse &nbsp;·&nbsp; toque en pantalla para saltar</p>
          )}
        </div>
      </div>
    </div>
  );
}