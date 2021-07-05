
class GameLoop
{
  static TPS = 60;  /// Frames per Second
  static SLEEP = 5; /// Tactical sleep delay
  static FT = 1.0 / GameLoop.TPS;      /// Each Frame Time
  static FTK = 1000.0 / GameLoop.TPS;      /// Each Frame Time in milliseconds

  constructor(game) {
    this.game = game;
    this.running = false;
    this.time = 0;
  }

  start() {
    this.running = true;
    
    this.delta = 0;

    this.lastTime = this.timeMilisec();
    this.timer = this.lastTime;
    this.frames = 0;

    this.shouldRender = false;

    const rn = this.run
    this.id = setInterval(() => {
      this.run();
    }, Math.floor(GameLoop.FTK));
    console.log(GameLoop.FTK)
  }

  stop() {
    if(this.id)
      clearInterval(this.id);
    this.running = false;
    this.id = null;
  }

  timeMilisec() {
    return new Date().getTime();
  }

  isRunning() {
    return this.running;
  }

  getTime() {
    return time;
  }


  run() {

    var now = this.timeMilisec();
    this.delta += (now - this.lastTime) / GameLoop.FTK;
    this.lastTime = now;

    while (this.delta >= 1)
    {
      this.tick();
      this.shouldRender = true;
      this.time++;
      this.delta--;
    }

    if (this.shouldRender && this.running)
    {
      this.render();
      this.shouldRender = false;
      this.frames++;
    }

    if (now - this.timer > 1000)
    {
      this.timer += 1000;
      this.fps(this.frames);
      this.frames = 0;
    }
  }
  
  r2un() {


    var render = false;
    this.
    while (this.running)
    {
      var now = this.timeMilisec();
      delta += (now - lastTime) / ms;
      lastTime = now;

      while (delta >= 1)
      {
        this.tick();
        render = true;
        time++;
        delta--;
      }

      if (render && running)
      {
        this.render();
        render = false;
        frames++;
      }

      if (now - timer > 1000)
      {
        timer += 1000;
        this.fps(frames);
        frames = 0;
      }
    }
  }
    
  tick() {
    this.game.tick();
  }

  render() {
    this.game.render();
  }

  fps(fps) {
    this.game.setFps(fps);
  }


}

export default GameLoop