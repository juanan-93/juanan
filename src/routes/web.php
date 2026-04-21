<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\AboutmeController;
use App\Http\Controllers\MyProjectsController;
use App\Http\Controllers\GameController;

//Landing
Route::get('/', [LandingController::class, 'index'])->name('landing');

//Search
Route::get('/search', [SearchController::class, 'index'])->name('search');

//About Me
Route::get('/about-me', [AboutmeController::class, 'index'])->name('about-me');

//My projects
Route::get('/my-projects', [MyProjectsController::class, 'index'])->name('my-projects');

//Game
Route::get('/game', [GameController::class, 'index'])->name('game');
//Game - Store score
Route::post('/game/scores', [GameController::class, 'store'])->name('game.scores.store');