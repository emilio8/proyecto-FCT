<?php

namespace App\Http\Controllers;

use App\Models\Songs;
use App\Models\User;
use Illuminate\Http\Request;

class SongsController extends Controller
{
    public function index()
    {
        $songs = Songs::with('user')->get();

        return response()->json($songs);
    }

    public function store(Request $request)
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required',
            'file' => 'required',
            'description' => 'nullable|string',
        ]);
        // Guardar la imagen en el directorio 'public/images'
        $imagePath = $request->file('image')->store('images', 'public');
        $validated['image'] = $imagePath;

        // Guardar el archivo de audio en el directorio 'public/audio'
        $filePath = $request->file('file')->store('audio', 'public');
        $validated['file'] = $filePath;    // Guardar la imagen en el directorio 'public/images'
        $imagePath = $request->file('image')->store('images', 'public');
        $validated['image'] = $imagePath;

        // Guardar el archivo de audio en el directorio 'public/audio'
        $filePath = $request->file('file')->store('audio', 'public');
        $validated['file'] = $filePath;

        // Asignar el ID del usuario autenticado
        $validated['user_id'] = auth()->id();

        $song = Songs::create($validated);

        return response()->json($song, 201);
    }

    public function show($id)
    {
        $song = Songs::with('user')->findOrFail($id);

        // Agregar la URL completa para la imagen y el archivo
        $song->image = url('storage/' . $song->image);
        $song->file = url('storage/' . $song->file);

        return response()->json($song);
    }

    public function update(Request $request, $id)
    {
        $song = Songs::with('user')->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|file|mimes:jpg,jpeg,png|max:2048', // Validación para imágenes
            'file' => 'nullable|file|mimes:mp3,wav|max:10240', // Validación para archivos de audio
            'description' => 'nullable|string',
        ]);

        // Si se envía una nueva imagen, reemplazar la existente
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $validated['image'] = $imagePath;
        }

        // Si se envía un nuevo archivo de audio, reemplazar el existente
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('audio', 'public');
            $validated['file'] = $filePath;
        }

        // Actualizar los datos de la canción
        $song->update($validated);
            return response()->json($song);
    }

    public function destroy($id)
    {
        $song = Songs::findOrFail($id);
        $song->delete();
        return response()->json(null, 204);
    }
}