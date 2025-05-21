<?php

namespace App\Http\Controllers;

use App\Models\Songs;
use Illuminate\Http\Request;

class SongsController extends Controller
{
    public function index()
    {
        return response()->json(Songs::all());
    }

    public function store(Request $request)
    {
        $song = Songs::create($request->only([
            'title',
            'image',
            'file',
            'description',
            'user_id'
        ]));
        return response()->json($song, 201);
    }

    public function show($id)
    {
        $song = Songs::findOrFail($id);
        return response()->json($song);
    }

    public function update(Request $request, $id)
    {
        $song = Songs::findOrFail($id);
        $song->update($request->only([
            'title',
            'image',
            'file',
            'description',
            'user_id'
        ]));
        return response()->json($song);
    }

    public function destroy($id)
    {
        $song = Songs::findOrFail($id);
        $song->delete();
        return response()->json(null, 204);
    }
}