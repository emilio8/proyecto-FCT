<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    // Obtener un usuario por ID
    public function getUserById($id)
    {
        return User::find($id);
    }

    // Actualizar los datos de un usuario
    public function updateUser($id, $data)
    {
        $user = User::find($id);

        if (!$user) {
            return null;
        }

        // Si se envía una nueva contraseña, encriptarla
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return $user;
    }
}