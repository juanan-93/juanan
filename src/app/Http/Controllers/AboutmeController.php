<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AboutmeController extends Controller
{
    public function index()
    {
        return inertia('about-me/about-me');
    }
}
