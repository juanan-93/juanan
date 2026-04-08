<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\SearchController;

//Landing
Route::get('/', [LandingController::class, 'index'])->name('landing');

//Search
Route::get('/search', [SearchController::class, 'index'])->name('search');