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
                'title' => 'Canción 1',
                'image' => 'song1.jpg',
                'file' => 'song1.mp3',
                'description' => 'Primera canción de prueba',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Canción 2',
                'image' => 'song2.jpg',
                'file' => 'song2.mp3',
                'description' => 'Segunda canción de prueba',
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
