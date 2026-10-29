// Paleta: naranja y azul
const ORANGE = '#ff8a1f';
const ORANGE_LIGHT = '#ffa94d';
const ORANGE_HEX = 0xff8a1f;
const BLUE = '#1e6bff';
const BLUE_DARK = '#071a40';
const BLUE_HEX = 0x1e6bff;

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const isMobile = width < 768;

    this.add.image(width / 2, height / 2, 'background')
      .setDisplaySize(width, height);

    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.45);
    overlay.fillRect(0, 0, width, height);

    this.createAmbientGlow(width, height);

    // Secuencia de inicio:
    // 1) Bienvenido elemento de SGS  ->  2) Esto es para ti  ->  3) Instrucción + botón
    this.showMessage(
      [
        { text: 'BIENVENIDO', color: '#ffffff' },
        { text: 'ELEMENTO DE SGS', color: ORANGE }
      ],
      { hold: 2600, big: true },
      () => {
        this.showMessage(
          [{ text: 'ESTO ES PARA TI', color: '#ffffff' }],
          { hold: 2200, big: true },
          () => this.showFinalStep(width, height, isMobile)
        );
      }
    );
  }

  // Muestra uno o varios renglones con entrada imponente, los mantiene y los desvanece.
  showMessage(lines, { hold = 2000, big = false } = {}, onDone) {
    const width = this.scale.width;
    const height = this.scale.height;

    const fontSize = Math.floor(
      Math.min(width * (big ? 0.082 : 0.06), big ? 96 : 56)
    );
    const lineGap = fontSize * 1.25;
    const startY = height * 0.46 - ((lines.length - 1) * lineGap) / 2;

    const texts = lines.map((line, i) =>
      this.add.text(width / 2, startY + i * lineGap, line.text, {
        fontFamily: '"Arial Black", Arial',
        fontSize: `${fontSize}px`,
        fontStyle: 'bold',
        color: line.color,
        stroke: BLUE,
        strokeThickness: Math.max(4, Math.floor(fontSize / 9)),
        align: 'center',
        wordWrap: { width: width * 0.94 },
        shadow: {
          offsetX: 0,
          offsetY: 0,
          color: line.color === '#ffffff' ? BLUE : ORANGE,
          blur: 24,
          fill: true,
          stroke: true
        }
      })
        .setOrigin(0.5)
        .setAlpha(0)
        .setScale(1.6)
    );

    // Entrada: cada renglón cae con zoom desde grande, uno tras otro
    texts.forEach((t, i) => {
      this.tweens.add({
        targets: t,
        alpha: 1,
        scale: 1,
        duration: 700,
        delay: 250 + i * 450,
        ease: 'Expo.Out',
        onStart: () => this.cameras.main.shake(180, 0.004)
      });
    });

    // Salida
    const enterTime = 250 + (texts.length - 1) * 450 + 700;
    this.time.delayedCall(enterTime + hold, () => {
      this.tweens.add({
        targets: texts,
        alpha: 0,
        scale: 0.9,
        duration: 500,
        ease: 'Sine.In',
        onComplete: () => {
          texts.forEach(t => t.destroy());
          if (onDone) onDone();
        }
      });
    });
  }

  showFinalStep(width, height, isMobile) {
    const fontSize = Math.floor(Math.min(width * 0.06, 54));

    const message = this.add.text(
      width / 2,
      height * 0.34,
      'DALE CLICK AL BOTÓN\nPARA EMPEZAR A JUGAR',
      {
        fontFamily: '"Arial Black", Arial',
        fontSize: `${fontSize}px`,
        fontStyle: 'bold',
        color: '#ffffff',
        stroke: BLUE,
        strokeThickness: Math.max(4, Math.floor(fontSize / 9)),
        align: 'center',
        wordWrap: { width: width * 0.9 },
        lineSpacing: 10,
        shadow: { offsetX: 0, offsetY: 0, color: BLUE, blur: 18, fill: true, stroke: true }
      }
    ).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: message,
      alpha: 1,
      y: height * 0.33,
      duration: 600,
      ease: 'Back.Out'
    });

    this.createSmiley(width / 2, height * 0.52, isMobile ? 34 : 50);
    this.createPlayButton(width, height, isMobile);
  }

  // Carita feliz dibujada con gráficos (se ve igual en todos los dispositivos)
  createSmiley(x, y, radius) {
    const face = this.add.container(x, y).setAlpha(0).setScale(0.3);
    const g = this.add.graphics();

    g.fillStyle(ORANGE_HEX, 1);
    g.fillCircle(0, 0, radius);
    g.lineStyle(Math.max(3, radius / 8), 0xffffff, 1);
    g.strokeCircle(0, 0, radius);

    g.fillStyle(0x071a40, 1);
    g.fillCircle(-radius * 0.35, -radius * 0.2, radius * 0.11);
    g.fillCircle(radius * 0.35, -radius * 0.2, radius * 0.11);

    g.lineStyle(Math.max(3, radius / 8), 0x071a40, 1);
    g.beginPath();
    g.arc(0, radius * 0.05, radius * 0.55, Phaser.Math.DegToRad(25), Phaser.Math.DegToRad(155), false);
    g.strokePath();

    face.add(g);

    this.tweens.add({
      targets: face,
      alpha: 1,
      scale: 1,
      duration: 500,
      delay: 300,
      ease: 'Back.Out',
      onComplete: () => {
        this.tweens.add({
          targets: face,
          y: y - 8,
          duration: 700,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.InOut'
        });
      }
    });
  }

  createPlayButton(width, height, isMobile) {
    const buttonY = isMobile ? height * 0.78 : height * 0.76;

    const glow = this.add.graphics().setAlpha(0);
    glow.fillStyle(ORANGE_HEX, 0.25);
    glow.fillRoundedRect(
      width / 2 - (isMobile ? 105 : 150),
      buttonY - (isMobile ? 35 : 45),
      isMobile ? 210 : 300,
      isMobile ? 70 : 90,
      12
    );

    const button = this.add.text(width / 2, buttonY, 'JUGAR!', {
      fontFamily: '"Arial Black", Arial',
      fontSize: isMobile ? '30px' : '48px',
      fontStyle: 'bold',
      color: BLUE_DARK,
      backgroundColor: ORANGE,
      padding: {
        x: isMobile ? 44 : 70,
        y: isMobile ? 14 : 18
      }
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setAlpha(0);

    this.tweens.add({
      targets: [glow, button],
      alpha: 1,
      duration: 500,
      delay: 600
    });

    this.tweens.add({
      targets: button,
      scaleX: 1.035,
      scaleY: 1.035,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.InOut',
      delay: 1100
    });

    button.on('pointerover', () => {
      button.setStyle({ backgroundColor: ORANGE_LIGHT, color: '#000000' });
    });

    button.on('pointerout', () => {
      button.setStyle({ backgroundColor: ORANGE, color: BLUE_DARK });
    });

    button.on('pointerdown', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.94,
        scaleY: 0.94,
        duration: 80,
        yoyo: true,
        onComplete: () => {
          this.scene.start('level1');
        }
      });
    });
  }

  createAmbientGlow(width, height) {
    const topGlow = this.add.graphics();
    topGlow.fillGradientStyle(
      BLUE_HEX, BLUE_HEX, BLUE_HEX, BLUE_HEX,
      0.5, 0.0, 0.0, 0.5
    );
    topGlow.fillRect(width * 0.08, height * 0.07, width * 0.84, 4);

    const orangeAccent = this.add.graphics();
    orangeAccent.fillGradientStyle(
      ORANGE_HEX, ORANGE_HEX, ORANGE_HEX, ORANGE_HEX,
      0.0, 0.5, 0.5, 0.0
    );
    orangeAccent.fillRect(width * 0.16, height * 0.92, width * 0.68, 3);
  }
}
