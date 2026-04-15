<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\AboutmeController;

//Landing
Route::get('/', [LandingController::class, 'index'])->name('landing');

//Search
Route::get('/search', [SearchController::class, 'index'])->name('search');

//About Me
Route::get('/about-me', [AboutmeController::class, 'index'])->name('about-me');