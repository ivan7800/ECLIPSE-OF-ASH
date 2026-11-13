export const markup=`
  <canvas id="scene" aria-label="Escenario del juego"></canvas>
  <div id="vignette" aria-hidden="true"></div><div id="numbers" aria-hidden="true"></div>
  <div id="transition" aria-hidden="true"></div>
  <main id="menu" class="menu">
    <div class="menu-atmosphere" aria-hidden="true"></div>
    <div class="menu-content">
      <span class="brand-mark" aria-hidden="true"></span>
      <p class="eyebrow">Una aventura en Vaeloria</p>
      <h1>ECLIPSE <em>OF</em><br>ASH <small>404</small></h1>
      <p class="tagline">El sol se quebró. La noche recuerda.</p>
      <nav aria-label="Menú principal">
        <button class="primary" data-main="new"><span>Nueva partida</span><span aria-hidden="true">→</span></button>
        <button data-main="continue"><span>Continuar</span><span aria-hidden="true">→</span></button>
        <button data-main="settings"><span>Configuración</span><span aria-hidden="true">→</span></button>
        <button data-main="credits"><span>Créditos</span><span aria-hidden="true">→</span></button>
      </nav>
    </div>
    <footer class="menu-footer"><span>TECLADO · MANDO · TÁCTIL</span><span>v0.3.0</span></footer>
  </main>
  <section id="hud" hidden aria-label="Estado de la partida">
    <div class="hud-vital">
      <div class="hud-label"><b id="hero-name">VIAJERA</b><span id="hp-text"></span></div>
      <div class="meter hp"><i id="hp"></i></div>
      <div class="meter stamina" aria-label="Resistencia"><i id="stamina"></i></div>
      <div class="meter magic" aria-label="Resonancia"><i id="magic"></i></div>
      <div class="hud-gold"><span id="gold"></span><span id="tonics"></span></div>
    </div>
    <div class="hud-location">
      <span id="realm" class="eyebrow"></span>
      <strong id="location"></strong>
      <button type="button" id="pause-button" aria-label="Pausa">Ⅱ</button>
    </div>
    <div class="hud-objective">
      <span class="eyebrow">Objetivo</span><span id="objective"></span>
    </div>
    <div id="boss" class="hud-boss" hidden><strong></strong><div class="meter hp"><i></i></div></div>
    <div id="hint" class="hud-hint" hidden><kbd></kbd><span></span></div>
    <div id="save-indicator" class="save-indicator" aria-live="polite"></div>
    <div id="quickbar" class="quickbar"></div>
    <div id="toast" class="toast" role="status" hidden></div>
  </section>
  <div id="touch" class="touch" hidden aria-label="Controles táctiles">
    <div class="joystick" aria-label="Movimiento"><span></span></div>
    <div class="touch-actions">
      <button type="button" data-touch="shift" aria-label="Cambiar de realidad">Reverso</button>
      <button type="button" data-touch="heal" aria-label="Usar tónico">Curar</button>
      <button type="button" data-touch="block" aria-label="Bloquear">Guardia</button>
      <button type="button" data-touch="tool" aria-label="Usar herramienta">Objeto</button>
      <button type="button" data-touch="dodge" aria-label="Esquivar">Esquiva</button>
      <button type="button" data-touch="attack" aria-label="Atacar">Espada</button>
      <button type="button" data-touch="use" aria-label="Interactuar">Acción</button>
    </div>
  </div>
  <dialog id="panel" aria-labelledby="panel-title"><div id="panel-body"></div></dialog>
`;
