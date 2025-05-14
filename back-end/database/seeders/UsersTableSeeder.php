<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Emilio',
                'surname1' => 'Moral',
                'surname2' => 'Diaz',
                'email' => 'emilio@gmail.com',
                'password' => Hash::make('usuario'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ana',
                'surname1' => 'López',
                'surname2' => null,
                'email' => 'ana@gmail.com',
                'password' => Hash::make('usuario'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
