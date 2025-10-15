"use client";

import { useState } from "react";
import { useAuth } from "@/utils/authContext";

export default function LoginForm() {
  const { login } = useAuth(); 
  const { user, isLoggedIn, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);


  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string; username?: string }>({});

  // Sanitiza input
  const sanitizeInput = (value: string) => {
    return value.replace(/<[^>]*>?/gm, "").replace(/["'`;]/g, "");
  };

  const validateForm = () => {
    let tempErrors: typeof errors = {};

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      tempErrors.email = "Email inválido";
    }
    if (!isLogin) {
      const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!strongPassword.test(formData.password)) {
        tempErrors.password = "Debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, número y símbolo";
      }
    } else {
      if (formData.password.trim().length === 0) {
        tempErrors.password = "Ingrese su contraseña";
      }
    }
    if (!isLogin && formData.username.trim().length < 3) {
      tempErrors.username = "El nombre de usuario debe tener mínimo 3 caracteres";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const safeValue = sanitizeInput(e.target.value);
    setFormData({ ...formData, [e.target.name]: safeValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  const endpoint = isLogin ? "/api/login" : "/api/signup";

  // Filtramos campos según el tipo de acción
  const payload = isLogin
    ? { email: formData.email, password: formData.password }
    : formData;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = {};
    }

    alert(data.message || "Respuesta inesperada");

    if (res.ok && isLogin && data.user) {
      login(data.user);
      setFormData({ email: "", password: "", username: "" });
      setErrors({});
    }

    if (res.ok && !isLogin) {
      // Si el registro fue exitoso, cambiamos a login
      setIsLogin(true);
      setFormData({ email: "", password: "", username: "" });
      setErrors({});
    }
  } catch (err) {
    console.error("Error en la solicitud:", err);
  }
};



  if (isLoggedIn && user) {
    // Mostrar bienvenida y botón cerrar sesión
    return (
      <div className="card p-4 shadow-lg text-center" style={{ backgroundColor: "#1C1C1C", border: "none", maxWidth: "400px", margin: "auto" }}>
        <h3 className="mb-3" style={{ color: "#DBDBDB" }}>Bienvenido, {user.username}!</h3>
        <button
          className="btn btn-danger w-100"
          onClick={() => logout()}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  // Si no está logueado, mostrar formulario normal
  return (
    <div
      className="card p-4 shadow-lg"
      style={{
        backgroundColor: "#1C1C1C",
        border: "none",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <h3 className="text-center mb-3 text-light">
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </h3>

      <form onSubmit={handleSubmit} autoComplete="off">
        {!isLogin && (
          <div className="mb-3">
            <label className="form-label text-light">Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label text-light">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Campo contraseña con botón para mostrar/ocultar */}
        <div className="mb-3 position-relative">
          <label className="form-label text-light">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-sm btn-outline-secondary position-absolute"
            style={{
              top: "73%",
              right: "2px",
              transform: "translateY(-50%)",
            }}
          >
            {showPassword ? "𓁺" : "◠"}
          </button>
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {isLogin ? "Entrar" : "Registrarse"}
        </button>
      </form>

      <div className="text-center mt-3">
        <button
          type="button"
          className="btn btn-link text-light"
          onClick={() => {
            setIsLogin(!isLogin);
            setFormData({ email: "", password: "", username: "" });
            setErrors({});
          }}
        >
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
}
