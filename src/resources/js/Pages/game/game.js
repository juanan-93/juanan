import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import GameEngine from "./engine/GameEngine";
import "@css/pages/game.css";
export default function Game({ topScores }) {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const rafRef = useRef(null);
    const frameTimeRef = useRef(0);
    const [nickname, setNickname] = useState("");
    const [hasStarted, setHasStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const canStartRef = useRef(false);
    const hasStartedRef = useRef(false);
    const isGameOverRef = useRef(false);
    const canStart = useMemo(() => nickname.trim().length >= 2, [nickname]);
    useEffect(() => {
        canStartRef.current = canStart;
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
        if (!engine)
            return;
        if (engine.isWaitingToStart()) {
            if (!canStartRef.current)
                return;
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
        if (!canvas)
            return;
        const engine = new GameEngine({
            canvas,
            onGameOver: (score) => {
                setFinalScore(score);
                setIsGameOver(true);
            },
        });
        engineRef.current = engine;
        const loop = (time) => {
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
        const onKeyDown = (event) => {
            if (event.code !== "Space")
                return;
            event.preventDefault();
            const engine = engineRef.current;
            if (!engine)
                return;
            engine.setJumpPressed(true);
        };
        const onKeyUp = (event) => {
            if (event.code !== "Space")
                return;
            event.preventDefault();
            const engine = engineRef.current;
            if (!engine)
                return;
            engine.setJumpPressed(false);
            handleStartOrRestartFromInput();
        };
        const onTouchStart = (event) => {
            event.preventDefault();
            const engine = engineRef.current;
            if (!engine)
                return;
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
        if (!canStart)
            return;
        engineRef.current?.start();
        setHasStarted(true);
        clearGameOverState();
    };
    const handleRestart = () => {
        engineRef.current?.start();
        clearGameOverState();
    };
    const handleSaveScore = () => {
        if (isSaving)
            return;
        setIsSaving(true);
        router.post("/game/scores", { nickname: nickname.trim(), score: finalScore }, { preserveScroll: true, onFinish: () => setIsSaving(false) });
    };
    return (_jsxs("div", { className: "game-page", children: [_jsxs("div", { className: "game-header", children: [_jsx("h1", { className: "game-title", children: "Mini Dino Arcade" }), _jsx("p", { className: "game-subtitle", children: "\u00BF Aceptas el reto de la m\u00E1quina ?" })] }), _jsxs("div", { className: "game-container", children: [_jsxs("div", { className: "game-main-panel", children: [_jsxs("div", { className: "game-topbar", children: [_jsxs("div", { className: "input-group", children: [_jsx("span", { className: "input-icon", children: "ID" }), _jsx("input", { id: "nickname", className: "game-input", type: "text", value: nickname, maxLength: 20, placeholder: "NICKNAME", onChange: (e) => setNickname(e.target.value.replace(/\s+/g, "")), disabled: hasStarted })] }), !hasStarted && (_jsx("button", { className: "btn-primary", onClick: handleStart, disabled: !canStart, children: "Jugar" }))] }), _jsxs("div", { className: "game-world", children: [_jsx("canvas", { ref: canvasRef, className: "game-canvas", id: "game" }), isGameOver && (_jsx("div", { className: "overlay-blur danger", children: _jsxs("div", { className: "game-over-box", children: [_jsx("h2", { children: "Game Over" }), _jsxs("p", { className: "final-score", children: ["Puntuaci\u00F3n final ", _jsx("strong", { children: finalScore })] }), _jsxs("div", { className: "overlay-actions", children: [_jsx("button", { className: "btn-secondary", onClick: handleRestart, children: "Reintentar" }), _jsx("button", { className: "btn-primary", onClick: handleSaveScore, disabled: isSaving, children: isSaving ? "Guardando..." : "Guardar Récord" })] })] }) }))] }), hasStarted && !isGameOver && (_jsx("p", { className: "controls-hint", children: "[ Espacio ] o toque en pantalla para saltar" }))] }), _jsx("div", { className: "game-side-panel", children: _jsxs("div", { className: "ranking-card", children: [_jsx("h2", { className: "ranking-title", children: "Top Records" }), topScores.length === 0 ? (_jsxs("div", { className: "empty-state", children: [_jsx("p", { children: "Sin r\u00E9cords" }), _jsx("span", { children: "\u00A1S\u00E9 el primero!" })] })) : (_jsx("ol", { className: "ranking-list", children: topScores.map((row, index) => (_jsxs("li", { className: "ranking-item", children: [_jsxs("div", { className: "rank-badge", children: ["#", index + 1] }), _jsx("span", { className: "ranking-name", children: row.nickname }), _jsx("span", { className: "ranking-score", children: row.best_score })] }, row.nickname + index))) }))] }) })] })] }));
}
