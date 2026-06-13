<template>
  <div style="min-height: 100vh; background-color: #0f172a; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: sans-serif; color: white; position: relative;">
    
    <div style="position: absolute; top: 30px; width: 90%; max-width: 420px; background-color: #ef4444; color: white; padding: 16px; border-radius: 8px; box-shadow: 0 4px 12px rgba(239,68,68,0.3); display: flex; align-items: center; gap: 12px; z-index: 999;">
      <span style="font-size: 20px;">⚠️</span>
      <div>
        <strong style="display: block;">Error de autenticaci\u00f3n</strong>
        <span style="font-size: 14px; color: #fee2e2;">Las credenciales ingresadas son inv\u00e1lidas.</span>
      </div>
    </div>

    <div style="background-color: #1e293b; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.4); width: 100%; max-width: 400px; border: 1px solid #334155;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h2 style="margin: 0; font-size: 26px; font-weight: 700; color: #f8fafc;">Sign in to your account</h2>
        <p style="margin: 8px 0 0 0; color: #64748b; font-size: 14px;">Ingresa tus datos de acceso</p>
      </div>
      
      <div style="margin-bottom: 18px;">
        <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #94a3b8; font-weight: 500;">Email address</label>
        <input type="text" value="usuario@falso.com" disabled style="width: 100%; padding: 12px; border-radius: 6px; border: 1px solid #475569; background-color: #0f172a; color: #cbd5e1; box-sizing: border-box;" />
      </div>

      <div style="margin-bottom: 28px;">
        <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #94a3b8; font-weight: 500;">Password</label>
        <input type="password" value="123456" disabled style="width: 100%; padding: 12px; border-radius: 6px; border: 1px solid #475569; background-color: #0f172a; color: #cbd5e1; box-sizing: border-box;" />
      </div>

      <button style="width: 100%; padding: 12px; background-color: #2563eb; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Sign in</button>
    </div>

  </div>
</template>
