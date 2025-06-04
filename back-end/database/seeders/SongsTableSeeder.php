<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SongsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
                DB::table('songs')->insert([
            [
                'title' => 'Pokenon',
                'image' => 'images/pokemon_hazte_con_todos.jpg',
                'file' => 'audio/pokemon.mp3',
                'description' => 'Opening de Pokémon en Castellano',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Mandaga Style',
                'image' => 'images/mandaga.webp',
                'file' => 'audio/mandaga.mp3',
                'description' => 'Canción Mandanga Style de Amador Rivas',
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Crazy Frog',
                'image' => 'images/crazy.png',
                'file' => 'audio/crazy.mp3',
                'description' => 'Canción de Crazy Frog',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Pedro Pedro Pedro',
                'image' => 'images/pedro.gif',
                'file' => 'audio/pedro.mp3',
                'description' => 'Canción Pedro Pedro Pedro en Italiano',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'La Reina',
                'image' => 'images/la_reina.jpeg',
                'file' => 'audio/la_reina.mp3',
                'description' => 'Canción La Reina de Lola Indigo',
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Espresso Macchiato - Version Española "Gazpacho"',
                'image' => 'images/gazpacho.jpg',
                'file' => 'audio/gazpacho.mp3',
                'description' => 'Canción Espresso Macchiato en versión Española "Gazpacho"',
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
