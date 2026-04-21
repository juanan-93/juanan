<?php

namespace App\Http\Controllers;

use App\Models\GameScore;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    public function index(): Response
    {
        $topScores = GameScore::query()
            ->select('nickname')
            ->selectRaw('MAX(score) as best_score')
            ->groupBy('nickname')
            ->orderByDesc('best_score')
            ->limit(10)
            ->get();

        return Inertia::render('game/game', [
            'topScores' => $topScores,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nickname' => ['required', 'string', 'min:2', 'max:20', 'regex:/^[A-Za-z0-9_]+$/'],
            'score' => ['required', 'integer', 'min:0', 'max:999999'],
        ]);

        GameScore::create($validated);

        return redirect()->route('game');
    }
}