<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Songs extends Model
{
    protected $table = 'songs';

    protected $fillable = [
        'title',
        'image',
        'file',
        'description',
        'user_id',
    ];

    // Relación con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Obtener todas las canciones
    public static function getAllSongs()
    {
        return self::all();
    }

    // Obtener una canción por ID
    public static function getSongById($id)
    {
        return self::find($id);
    }

    // Crear una nueva canción
    public static function createSong($data)
    {
        return self::create($data);
    }

    // Actualizar una canción existente
    public static function updateSong($id, $data)
    {
        $song = self::find($id);
        if ($song) {
            $song->update($data);
            return $song;
        }
        return null;
    }

    // Eliminar una canción
    public static function deleteSong($id)
    {
        $song = self::find($id);
        if ($song) {
            return $song->delete();
        }
        return false;
    }
}
