// app/bot/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/authContext';
import Image from 'next/image';
import Link from 'next/link';
import './BotPage.css';

export default function BotPage() {
  const { user } = useAuth();

  // Estado para mostrar/ocultar sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Lista de chats - inicialmente vacía
  const [chats, setChats] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // *** AGREGAR ESTO PARA PANTALLA COMPLETA ***
  useEffect(() => {
    // Crear estilos para sobrescribir el layout global
    const style = document.createElement('style');
    style.id = 'bot-fullscreen-override';
    style.textContent = `
      /* Sobrescribir layout global */
      body { 
        margin: 0 !important; 
        padding: 0 !important; 
        padding-top: 0 !important;
        overflow: hidden !important; 
        height: 100vh !important;
      }
      
      /* Ocultar navbar y footer */
      nav, footer { 
        display: none !important; 
      }
      
      /* Modificar main container */
      main { 
        padding: 0 !important; 
        padding-top: 0 !important;
        height: 100vh !important;
        max-width: none !important;
      }
      
      /* Quitar container de Bootstrap */
      .container { 
        max-width: none !important; 
        padding: 0 !important; 
        width: 100% !important;
        height: 100vh !important;
      }
      
      /* Hacer que el contenedor de la app ocupe todo */
      .app-container {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 9999 !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup al salir de la página
    return () => {
      const existingStyle = document.getElementById('bot-fullscreen-override');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Filtrar chats por búsqueda
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Crear nuevo chat/configuración
  const addNewChat = () => {
    const newId = (chats.length + 1).toString();
    const newChatName = `Nueva Configuración ${newId}`;
    setChats([{ id: newId, name: newChatName }, ...chats]);
    setSelectedChatId(newId);
  };

  // Simular carga inicial de chats
  useEffect(() => {
    // Simular carga de datos después de 500ms
    const timer = setTimeout(() => {
      setChats([
        { id: '1', name: 'Apple Inversión' },
        { id: '2', name: 'Google Trading' },
        { id: '3', name: 'Tesla Estrategia' },
      ]);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
          {/* Sidebar */}
          <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
      <div className="logo-container">
        <Link href="/" className="logo-link">
          <Image
            src="/favicon.ico"
            alt="Logo Inversia"
            width={32}   // tamaño típico de favicon
            height={32}
            className="logo"
          />
        </Link>
        {sidebarOpen && <h2 className="app-title">Inversia TI</h2>}
      </div>

      <button 
        className="toggle-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? 'Ocultar lista' : 'Mostrar lista'}
      >
        {sidebarOpen ? '◀' : '▶'}
      </button>
    </div>


        <div className="sidebar-content">
          {sidebarOpen && (
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          )}

          <div className="chats-section">
            <div className="section-header">
              {sidebarOpen && (
                <>
                  <h4>Mis Configuraciones</h4>
                  <div className="menu-separator"></div>
                </>
              )}
              <button 
                className="new-chat-btn"
                onClick={addNewChat}
              >
                {sidebarOpen ? (
                  <>
                    <span className="plus-icon">＋</span> Nuevo Chat
                  </>
                ) : (
                  <span className="plus-icon">＋</span>
                )}
              </button>
            </div>

            <div className="chats-list">
              {filteredChats.length > 0 ? (
                filteredChats.map(chat => (
                  <div 
                    key={chat.id}
                    className={`chat-item ${chat.id === selectedChatId ? 'active' : ''}`}
                    onClick={() => setSelectedChatId(chat.id)}
                    title={chat.name}
                  >
                    {sidebarOpen ? (
                      <>
                        <span className="chat-icon">💬</span>
                        <span className="chat-name">{chat.name}</span>
                        <div className="chat-actions">
                          <button 
                            className="action-btn edit-btn"
                            onClick={e => {
                              e.stopPropagation();
                              const newName = prompt('Nuevo nombre', chat.name);
                              if (newName && newName.trim() !== '') {
                                setChats(prev =>
                                  prev.map(c => (c.id === chat.id ? { ...c, name: newName } : c))
                                );
                              }
                            }}
                            aria-label="Editar nombre"
                          >
                            ✏️
                          </button>
                          <button 
                            className="action-btn delete-btn"
                            onClick={e => {
                              e.stopPropagation();
                              if (confirm(`¿Eliminar "${chat.name}"?`)) {
                                setChats(prev => prev.filter(c => c.id !== chat.id));
                                if (selectedChatId === chat.id) {
                                  setSelectedChatId(null);
                                }
                              }
                            }}
                            aria-label="Eliminar chat"
                          >
                            🗑️
                          </button>
                        </div>
                      </>
                    ) : (
                      <span className="chat-initial">{chat.name.charAt(0)}</span>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-chats">
                  {sidebarOpen ? (
                    <p>No tienes configuraciones aún</p>
                  ) : (
                    <span>...</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer usuario */}
        <div className="user-account">
          <div className="user-profile">
            <div className="avatar">
              {user?.username?.charAt(0).toUpperCase() || '?'}
            </div>
            {sidebarOpen && (
              <div className="user-detail">
                <h3>{user?.username || 'Usuario'}</h3>
                
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Contenido derecho */}
      <section className="content-area">
        {selectedChatId ? (
          <div className="chat-configuration">
            <h2>Configuración: {chats.find(c => c.id === selectedChatId)?.name}</h2>
            <div className="config-container">
              <div className="config-card">
                <h3>Parámetros de Trading</h3>
                <div className="param-group">
                  <label>Activo</label>
                  <select>
                    <option>AAPL</option>
                    <option>GOOGL</option>
                    <option>TSLA</option>
                    <option>MSFT</option>
                    <option>AMZN</option>
                  </select>
                </div>
                
                <div className="param-group">
                  <label>Estrategia</label>
                  <select>
                    <option>Media Móvil</option>
                    <option>RSI</option>
                    <option>MACD</option>
                    <option>Bollinger Bands</option>
                  </select>
                </div>
                
                <div className="param-group">
                  <label>Horizonte Temporal</label>
                  <select>
                    <option>Intradía</option>
                    <option>Swing Trading</option>
                    <option>Largo Plazo</option>
                  </select>
                </div>
              </div>
              
              <div className="config-card">
                <h3>Parámetros de Riesgo</h3>
                <div className="param-group">
                  <label>Capital Máximo</label>
                  <input type="number" placeholder="$10,000" />
                </div>
                
                <div className="param-group">
                  <label>Stop Loss (%)</label>
                  <input type="number" placeholder="5%" />
                </div>
                
                <div className="param-group">
                  <label>Take Profit (%)</label>
                  <input type="number" placeholder="15%" />
                </div>
              </div>
              
              <div className="actions-container">
                <button className="save-btn">Guardar Configuración</button>
                <button className="test-btn">Probar Estrategia</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="welcome-message">
            <div className="welcome-content">
              <h1>Bienvenido a Inversia TI - Entorno Real </h1>
              <p>Selecciona una configuración existente o crea una nueva para comenzar a operar en los mercados financieros.</p>
              <div className="features">
                <div className="feature-card">
                  <div className="feature-icon">⚙️</div>
                  <h3>Configuraciones Personalizadas</h3>
                  <p>Crea y guarda múltiples configuraciones para diferentes estrategias de trading.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">📊</div>
                  <h3>Análisis en Tiempo Real</h3>
                  <p>Monitorea el rendimiento de tus estrategias con datos de mercado actualizados.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🤖</div>
                  <h3>Automatización Completa</h3>
                  <p>Ejecuta tus operaciones automáticamente según tus parámetros establecidos.</p>
                </div>
              </div>
              <button className="new-config-btn" onClick={addNewChat}>
                ＋ Crear Nueva Configuración
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}