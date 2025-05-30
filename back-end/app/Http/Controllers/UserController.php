<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    // Mostrar los datos de un usuario
    public function show($id)
    {
        $user = $this->userService->getUserById($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function store(Request $request)
    {
        $request->headers->set('Accept', 'application/json');


        // Validar los datos de entrada
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname1' => 'required|string|max:255',
            'surname2' => 'nullable|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8', // Confirmación de contraseña
        ]);

        // Crear el usuario
        $user = User::create([
            'name' => $validated['name'],
            'surname1' => $validated['surname1'],
            'surname2' => $validated['surname2'] ?? null,
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']), // Encriptar la contraseña
        ]);

        // Retornar la respuesta con el usuario creado
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ], 201);
    }

    // Editar los datos de un usuario
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'surname1' => 'nullable|string|max:255',
            'surname2' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
        ]);

        $user = $this->userService->updateUser($id, $validated);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }
}